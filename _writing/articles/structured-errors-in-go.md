---
layout: article
type: article
date: 2026-07-28T00:00:00+02:00
author: Tedla Brandsema
title: "Structured Errors in Go"
intro: "Go gives you errors as values and, since 1.21, structured logging in the standard library. The two do not meet: context is known deep in the call stack, and the decision to write a log record belongs at the boundary. A small type closes the distance. Enough Go developers have built that type independently that it starts to look like something missing from the standard library, which is what I thought until I read their implementations."
hero: /static/images/hero/generated/structured-errors-in-go
hero_alt: "Placeholder."
hero_caption: "Placeholder."
hero_ai: true
---

<h1>{{ page.title }}</h1>
<h2><em>Why so many Go developers end up building the same small thing</em></h2>

{% include published.html %}

{% include hero.html %}

{% include ai-disclosure.html %}

A query fails near the bottom of a request. The function that ran it knows a great deal about the failure: which user was being looked up, which statement was executed, whether this was the first attempt or the third, which connection pool it came from, and what the driver said. It knows almost nothing about whether any of that matters. Whether this failure is an incident or an ordinary miss depends on who called it, and it cannot see who called it.

The handler at the top of the request has the opposite problem. It knows the request ID, the tenant, the route, the trace, and whether a failure here should page somebody at three in the morning. It has no idea which user the query was for, because everything the database layer knew arrived as a sentence.

Nearly every Go service resolves this in one of two ways, and both of them cost something.

## Errors as values

Go's error handling is famously plain. You create an error with `errors.New` or `fmt.Errorf`, or you define a type with an `Error() string` method, and then you return it like any other value. Since Go 1.13 you can wrap: `fmt.Errorf("findUser: %w", err)` keeps the original reachable, and `errors.Is` and `errors.As` walk the chain to find it.[^1]

The value being returned is a string with a type attached. That is the whole payload. So when `findUser` wants the caller to know it was user 42, it writes user 42 into the sentence:

```go
return fmt.Errorf("findUser user_id=%d: %w", userID, err)
```

By the time this reaches the handler, four layers up, it reads something like `getUserProfile: profile store: findUser user_id=42: sql: no rows in result set`. The information survived. It just stopped being information and became prose. Nothing downstream can ask that string which user it was about without a regular expression and a guess, and a log pipeline cannot index it at all.

The alternative is to log where the failure happens, while the context is still structured and still in scope. That works, and it produces a service where one failed request emits four log records at four different levels of the stack, none of which knows the request ID, and an on-call rotation that has learned to ignore all of them.

## Structured logs

The other half of this arrived in Go 1.21 with `log/slog`, which put structured logging in the standard library.[^2] A log record is a message plus a set of typed key-value pairs, and a handler decides what to do with them. `slog.JSONHandler` writes line-delimited JSON, which is what a log pipeline actually wants:

```go
logger.Error("request failed", slog.Int("user_id", 42), slog.String("op", "findUser"))
```

```json
{"level":"ERROR","msg":"request failed","user_id":42,"op":"findUser"}
```

Rich, queryable, machine-readable, and emitted from exactly one place in the program: the line where you called `Error`. That is the property that matters here and the one that is easy to miss. A log record is fixed in place. An error is mobile and lossy. Put those two facts next to each other and the problem stops being about formatting.

The context is known where the record cannot be written, and the record is written where the context is gone.

## Closing the distance

The fix is to make the error carry its context as data instead of as prose, and to hand that data to `slog` at the boundary. Go gives you everything needed for this, and it does not require a single new idea.

```go
type StructuredError struct {
	Msg    string
	Op     string
	Err    error
	Fields []slog.Attr
}

func (e *StructuredError) Error() string       { /* ... */ }
func (e *StructuredError) Unwrap() error       { return e.Err }
func (e *StructuredError) LogValue() slog.Value { /* ... */ }
```

Three methods. `Error` makes it an error, so it returns and propagates like any other value. `Unwrap` keeps `errors.Is` and `errors.As` working through it, so control flow is untouched: you can still test for `sql.ErrNoRows` at the top of a chain that has been wrapped four times. `LogValue` is the interesting one. When a handler meets a value implementing `slog.LogValuer` it calls that method instead of formatting the value itself, and it only calls it if the record is actually going to be emitted, so accumulating context on a path where the log level drops everything costs nothing at all.

Attach fields at each layer and the handler gets one record with everything the stack knew:

```json
{"level":"ERROR","msg":"request failed","method":"GET","path":"/users/42",
 "error":{"component":"user-service","op":"getUserProfile",
   "cause":{"via":"profile store","user_id":42,"op":"findUser",
     "cause":"sql: no rows in result set"}}}
```

`user_id` was known in the repository. `component` was added by the service layer. `via` is what an ordinary `fmt.Errorf` in the middle contributed, because real chains have those and the structure has to survive them. `method` and `path` were added by the handler, which is also the only place that decided anything should be written down.

The second thing this buys you is the reason I started building it. A field has a key, and a key can be matched. Give the handler a `ReplaceAttr` function and you can hash, drop, or replace any attribute in any record the process emits, centrally, without a single call site knowing about it:

```json
{"built_with":"fmt.Errorf","error":"createAccount: address ada@example.com already registered"}
{"built_with":"serrors","error":{"email":"sha256:b5fc85e5","op":"createAccount","cause":"address already registered"}}
```

Same failure, same redactor, one record it can reach and one it cannot. Once a value is inside a message string, nothing downstream finds it again without guessing at its shape, and a redactor that guesses is a redactor that misses.

Both of the drafts I abandoned last year mention this. Both mention it in a single bullet, under a heading about things to consider when taking the pattern into production, sitting between a note on required fields and a note on key naming. I had the argument and filed it as housekeeping.

## Everyone else's bridge

I built this, wrote most of an article about it, and then found out I was late by about eighteen months.

There is a Medium post from January 2024 presenting an experimental package for structured errors on exactly this premise, that a structured error is an error with attributes which get added to the record when it is logged.[^3] The package is called `serrors`. So is mine. That was a bad morning.

It is not one prior instance, either. Once I went looking, the field turned out to be busy, and busy in a way I did not expect. One library attaches arguments to an error and then hydrates a logger from that error at the boundary, so the error enriches the logger. Another runs it the other way, deriving an error's context from an `slog.Logger` on the grounds that the logging package is already assembling that context. A third converts an error into an `slog.Record` outright. A fourth folds structured attributes in alongside a single stack trace preserved across wraps. In the standard library's own proposal threads, one commenter pastes the helper he carries into every project, a one-line function returning `slog.Any("error", err)`, and another pastes his, which builds a group in OpenTelemetry's exception semantic conventions with a message and a stack trace.[^4] Mine puts a `LogValuer` on the error and lets the handler pull.

Six or so directions of travel between exactly two objects. Everybody agrees an error and a log record need to exchange context. Nobody agrees which way the arrow points, what the key is called, or whether the thing you hand the logger is a value, a record, or another logger.

## The obvious conclusion

When a lot of competent people independently build the same thing, the usual reading is that something is missing from the platform. That was my reading, and there is evidence for it.

The Go team has been asked to standardise this twice. In April 2023 a proposal asked for an `Err` field on `slog.Record`, so that handlers could decide how errors are keyed rather than every library picking its own. It came with a mock log showing three libraries in one application emitting `error`, `err`, and `_ERROR` for the same concept. Jonathan Amsterdam, who wrote `slog`, objected that the package should not take a position, because there are too many ways to log errors, and then asked the question the thread never answered cleanly: what happens when a log call has two errors. Russ Cox closed it for no change in consensus.[^5] In October the same year a second proposal asked for a `slog.Err` helper and a dedicated error kind, and was told it was sugar for `slog.Any(key, err)` that anyone can write themselves, and that the kinds exist so `Value` can avoid boxing rather than to mark semantic categories.[^6]

There is a third thread, still open, which nobody has closed in over three years: `slog.JSONHandler` will happily emit an object with duplicate keys, because nothing deduplicates a caller's attribute against a key the handler reserves.[^7] I hit that one myself without knowing the issue existed. My package produced `{"op":"caller-supplied","cause":"caller-supplied","op":"getUserProfile","cause":"..."}` for a year, which is valid JSON in the sense that a parser will accept it and invalid in the sense that which value you get depends on whose parser you are running.

Two declined proposals and a three-year-old open bug, against a field full of people building the same bridge by hand. It reads like a gap.

## Why I stopped thinking that

Then I read the implementations properly, and the shape of the disagreement changed my mind.

If everyone had built the same thing, the case for standardising it would be strong. Everyone has not built the same thing. They have built one thing for each set of constraints they happened to be under, and each one is defensible on its own terms. If you already have a logger in scope at every layer, deriving the error's context from the logger is the smaller change. If you are exporting to OpenTelemetry, the semantic conventions decide your shape and you build to them. If your team's existing schema keys errors under `exception`, a library that hardcodes `error` is worse than no library. If you want a stack trace, none of the proposals would have given you one and you were always going to write your own helper.

Amsterdam's objection is not an evasion, in other words. It is a correct description of the situation. There are too many ways to log an error for the standard library to take a position, and the reason there are too many is not that Go failed to pick one.

What Go did instead was define the interfaces and get out of the way. `error` is an interface. `Unwrap` is a method shape that `errors.Is` and `errors.As` know how to walk. `LogValuer` lets any type decide how it appears in a record, lazily. `Handler` and `ReplaceAttr` let the application, which is the only party that knows what its log pipeline wants, impose a vocabulary on libraries that never agreed on one. Every piece of the bridge is already in the standard library. What is missing is the assembly, and the assembly is the part that should be yours, because it is the part that depends on facts about your system that Go cannot know.

My whole shim is a single file of a few hundred lines with no dependencies. It is small enough to read in a sitting, and small enough that you should not use mine. Write your own. It will take an afternoon and it will fit your logging schema instead of my guesses about it.

## The shape that held

I stopped work on this package in July 2025 and came back to it a year later, almost to the day. What happened next is the reason I am writing this rather than just publishing the code.

The type is unchanged. Four fields, three methods, exactly as I first committed them. Everything behind those methods was wrong. `LogValue` called `Error()` on the wrapped error, which flattened every layer below the outermost back into the string this whole design exists to avoid, so the structure survived one level of wrapping and died at the second. The bounds check on an internal enum was off by one and panicked. The constructor conflated wrapping an error with creating one, so half its parameters were always zero. A cyclic chain exhausted the stack. When I fixed the flattening, it turned out an ordinary `fmt.Errorf` between two layers reintroduced the same collapse, through the single most common idiom in Go error handling.

None of that ever produced an error. That is the part worth sitting with. Because the type really did satisfy `error` and `Unwrap` and `LogValuer`, everything compiled and every record came out as well-formed structured JSON. My draft of this article contained a sample record with a `user_id` in it that the code could not have produced, and my test suite passed the entire time, because the one test that touched a real handler built a record, wrote it to a buffer, and called `t.Log` on the result. It printed the evidence for a human to look at. Nobody looked, for a year.

So the intuition was right and nearly every line implementing it was wrong, which is the opposite of how this usually goes. Satisfying an interface tells you the shape is right. It tells you nothing about what is inside.

The type now carries its guarantees explicitly:

```go
var (
	_ error                       = (*StructuredError)(nil)
	_ slog.LogValuer              = (*StructuredError)(nil)
	_ interface{ Unwrap() error } = (*StructuredError)(nil)
)
```

Two of those three have names. The third does not, and cannot, because there is no `errors.Wrapper` interface anywhere in the standard library and there never was: `errors.Unwrap`, `errors.Is`, and `errors.As` each assert on an anonymous interface literal at their own call site.[^8] The contract this entire package rests on was never given a name to implement, and it still works, in every error package written since 2019, without one.

That is as good a description of the arrangement as I can give. The standard library handed out the pieces, declined to specify the object, and did not even bother to name the most load-bearing piece it handed out. Four hundred lines later, the thing assembles anyway.

---

[^1]: Error wrapping landed in Go 1.13 with the `%w` verb, the `Unwrap() error` convention, and `errors.Is` and `errors.As` for walking a chain. Go 1.20 added `errors.Join` and the `Unwrap() []error` form, turning linear chains into trees traversed depth first, and allowed more than one `%w` in a single `fmt.Errorf`. See the Go blog, ["Working with Errors in Go 1.13"](https://go.dev/blog/go1.13-errors). Worth knowing if you write traversal code yourself: `errors.Is` and `errors.As` were both taught to walk the tree, and `errors.Unwrap`, the function, was not. Its documentation says so outright, that it only calls a method of the form `Unwrap() error` and does not unwrap errors returned by `Join`. The singular accessor stayed singular.

[^2]: [`log/slog`](https://pkg.go.dev/log/slog), Go 1.21. The package documentation motivates `LogValuer` on laziness rather than on structure: a type whose `LogValue` does expensive work pays only when a record is actually emitted. I checked rather than assumed, with a type that increments a counter inside `LogValue`. Logged at `Debug` against a handler set to `Error`, the counter stays at zero.

[^3]: Oren Rose, ["Structured Errors in Go (Thought Experiment)"](https://orenrose.medium.com/thought-experiment-golang-structured-errors-1cb662f7e0cf), January 2024. His implementation differs from mine in where the attributes end up: his `Wrap` collects them across the whole chain and the record carries them flat alongside the message, with `err.Error()` concatenated onto `msg`.

[^4]: [suzuki-shunsuke/slog-error](https://github.com/suzuki-shunsuke/slog-error) exposes `With(err, args...)` to attach arguments to an error and `WithError(logger, err)` to produce a logger carrying them. [williammoran/slogerror](https://github.com/williammoran/slogerror) runs the relationship in the opposite direction, deriving the error's context from an `slog.Logger`. [gregwebs/errors/slogerr](https://blog.gregweber.info/blog/go-errors-library/) converts a structured error into an `slog.Record` via `GetSlogRecord()`. [stackprune/errors](https://github.com/stackprune/errors) combines `slog` integration with a stack captured once at the origin and preserved across wraps. The two commenters are in the threads at footnotes 5 and 6; the second follows [OpenTelemetry's semantic conventions for exceptions in logs](https://opentelemetry.io/docs/specs/semconv/exceptions/exceptions-logs/#attributes).

[^5]: golang/go [#59364](https://github.com/golang/go/issues/59364), "proposal: log/slog: add an 'error' field to 'Record'", opened April 2023, declined. Amsterdam's objection in substance: a `Record.Err` field is too limiting because there are too many ways to log errors for `slog` to take a position, which is not the case for the other built-in fields. He also observes that the field is not strictly necessary, since a handler or `ReplaceAttr` function could find errors by looking for values of type `error` and rewrite their keys for uniformity. The thread defers repeatedly to the original `slog` design discussion, [#56345](https://github.com/golang/go/issues/56345), where the question was settled the first time.

[^6]: golang/go [#63547](https://github.com/golang/go/issues/63547), "proposal: log/slog: Add 'slog.KindErr' and 'slog.Err' Attrs Helper Function", opened October 2023. The stack trace remark is Amsterdam's: even with the proposal implemented you would be writing your own helper anyway, because a stack trace is not in scope for it either.

[^7]: golang/go [#59365](https://github.com/golang/go/issues/59365), "log/slog: JSONHandler should deduplicate keys", opened April 2023 and still open. The remedies floated in the thread are a nested `fields` group and a suffixing scheme rendered as `msg#01`, which are the same two options you end up weighing if you hit this yourself. I landed on suffixing, with a caller's colliding attribute re-keyed rather than dropped.

[^8]: `errors.Unwrap` at `wrap.go:17`, and the type switches inside `errors.Is` and `errors.As`, all spell the shape as `interface{ Unwrap() error }` inline. No named interface for it appears anywhere in `$GOROOT/api/go1*.txt`, which is the authoritative record of exported API across every Go release. The one named interface in the standard library source containing an `Unwrap() error` method is `testing.fuzzCrashError`, which is unexported and is a larger interface than this shape.