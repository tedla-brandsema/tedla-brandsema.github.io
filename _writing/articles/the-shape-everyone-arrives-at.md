---
layout: article
type: article
date: 2026-07-28T00:00:00+02:00
author: Tedla Brandsema
title: "The Shape Everyone Arrives At"
intro: "A year ago I wrote a small Go package for structured errors and an article explaining it, and abandoned both. Opening them again, I found the article contained a log record the package could not produce, and a test suite that passed anyway. Everyone who tries this arrives at roughly the same place, the Go team has declined to put it in the standard library twice, and the reasons they gave are better than the pattern deserves."
hero: /static/images/hero/generated/the-shape-everyone-arrives-at
hero_alt: "Placeholder."
hero_caption: "Placeholder."
hero_ai: true
---

<h1>{{ page.title }}</h1>
<h2><em>What I found in a package I stopped writing a year ago</em></h2>

{% include published.html %}

{% include hero.html %}

{% include ai-disclosure.html %}

I opened a repository last week that I had not touched since I made the second of its two commits. One Go file, one test file, a licence, and next to it, in a different folder, two unfinished drafts of an article explaining what the file was for. The last commit landed on 28 July 2025. I opened it on 28 July 2026, which is the sort of coincidence that makes you feel briefly that a year was a deliberate interval rather than a thing that happened to you.

The package is called `serrors`. It does one thing: it lets an error carry structured context up the call stack and hand that context to `log/slog` at the top, instead of flattening it into a string on the way. I had written the code and the article in parallel, because I wanted to see whether the intuition survived contact with a compiler, which is a habit I would recommend to anyone.

It did not survive. I just failed to notice, because I never looked.

One of the drafts contains a JSON log record, presented as the output of the code printed twelve lines above it. It shows an error object with an operation, a component, a cause, and a user ID that had been attached three layers down. It is a good demonstration of the argument. I copied the package into a Go toolchain, ran exactly that example, and got this instead:

```json
{
  "level": "ERROR",
  "msg": "failed to get user profile",
  "error": {
    "component": "user-service",
    "op": "getUserProfile",
    "cause": "readUserFromDB: sql: no rows in result set"
  }
}
```

The user ID is gone. Everything below the outermost layer has collapsed back into a string, which is the precise failure the package exists to prevent. The record in my draft was not a paste. It was a description of what I believed the code did, written in the format the code would have used if it had done it.

The tests passed the whole time. I will come back to why.

## The gap the package was meant to close

Go errors are values, and the good consequence of that is they travel. You return one from the bottom of a call stack and it arrives at the top with whatever you attached to it along the way. The bad consequence is that what you can attach is a string, so by the time it arrives, the fact that the failure concerned user 42 is stored in the same place and the same format as the prose around it.[^1]

Structured logging, which arrived in the standard library as `log/slog` in Go 1.21, is the opposite. A log record holds typed key-value pairs, machine-readable, queryable, and it is emitted from exactly one place in the code: wherever you called `Error`.[^2]

Put those two properties side by side and you get a placement problem rather than a formatting one. The function that knows the context is not the function that should decide to emit. `readUserFromDB` knows the user ID, the query, the retry count. It has no idea whether this failure is a paged alert or an expected miss on a cache lookup, and it cannot know, because that depends on who called it. The handler at the top knows exactly that, and knows the request ID and the trace and the tenant, and by the time the error reaches it, everything the database layer knew has been concatenated into one line of prose.

So you pick. Log at the point of failure and you get rich records with no request context, emitted again at every layer as the error climbs, which is how you end up with four log lines for one failure and a paging rule nobody trusts. Or propagate and log once at the boundary, which is correct, and lose the structure.

The pattern closes that by making context accumulate as data and emit once. Three methods, all of them interfaces the standard library already defines:

```go
type StructuredError struct {
	Msg    string
	Op     string
	Err    error
	Fields []slog.Attr
}

func (e *StructuredError) Error() string { /* ... */ }
func (e *StructuredError) Unwrap() error { return e.Err }
func (e *StructuredError) LogValue() slog.Value { /* ... */ }
```

`Error` makes it an error. `Unwrap` keeps `errors.Is` and `errors.As` working through it, so control flow is unaffected. `LogValue` is the interesting one: when a handler encounters a value implementing `slog.LogValuer`, it calls that method instead of formatting the value itself, and it does so lazily, only if the record is actually going to be emitted.[^2] Attach context at every layer, pay nothing when the log level suppresses it, and get one structured record at the boundary containing everything the stack knew.

That is the whole idea, and I still think it is right.

## The one line that undoes it

Here is what my `LogValue` did:

```go
if e.Err != nil {
	attrs = append(attrs, slog.String("cause", e.Err.Error()))
}
```

Calling `Error()` on the wrapped error asks it for its string. If the wrapped error is itself a `StructuredError` carrying six attributes, those six attributes are not in its string, and they never will be. The structure survives exactly one level of wrapping and dies at the second, which in a real service is the first one that matters, because a one-layer error chain does not need any of this.

The fix is a branch:

```go
if _, ok := e.Err.(slog.LogValuer); ok {
	attrs = append(attrs, slog.Any("cause", e.Err))
} else {
	attrs = append(attrs, slog.String("cause", e.Err.Error()))
}
```

Attach the cause as a value rather than a string and `slog` resolves it, recursively, including inside groups, with no traversal code on my side at all:[^3]

```json
"error": {
  "component": "user-service",
  "op": "getUserProfile",
  "cause": {
    "user_id": 42,
    "op": "readUserFromDB",
    "cause": "sql: no rows in result set"
  }
}
```

One line. Two if you count the `else`.

Now, why the tests passed. My test table had two cases, both single-layer errors, and both asserted against `LogValue()` called directly on the error rather than against what a handler produced. At one layer the design works, so the assertions were true. Underneath sat a helper I had named `loggingIntegration`, which built a logger, wrote a record into a buffer, and called `t.Log` on the result. It printed the output. It checked nothing. I had written a test that renders evidence for a human to look at, and then never looked, for a year.

That is a more interesting failure than the bug. The bug is one line. The test is a whole posture: I had built an apparatus for observing the thing rather than for contradicting it, at the exact moment I was telling myself I was validating the idea empirically. The article and the test suite have the same defect, which is that both of them describe the design instead of running it.

## Everybody agrees on the problem and nobody agrees on the shape

I had assumed, in the way you do when you have not looked, that I was writing something reasonably novel. I was not. The pattern had been arrived at repeatedly before I started, and the record of it is easy to find once you go looking.

The closest is a Medium piece from January 2024 presenting an experimental package for structured error support in Go, on the argument that a structured error is simply an error with attributes which get added to the log record when it is logged.[^4] Same premise, same reasoning, eighteen months before my first commit. The package is called `serrors`. So is mine.

Beyond that the field is fuller than I expected, and the interesting part is not that it exists but how little of it agrees. One library attaches arguments to an error and then hydrates a logger from that error at the boundary, so the error enriches the logger. Another runs it the other way and derives the error's context from an `slog.Logger`, so the logger enriches the error. A third converts an error into an `slog.Record` outright. A fourth folds structured attributes in alongside a single stack trace preserved across wraps.[^5] In the proposal threads, one commenter pastes the helper he carries into every project, a function returning `slog.Any("error", err)`, and another pastes his, which builds a group in OpenTelemetry's exception semantic-convention shape with a message and a stack trace.[^6]

Five or six directions of travel between exactly two objects. Everyone agrees that an error and a log record need to exchange context. Nobody agrees which way the arrow points, what the key is called, or whether the thing you hand the logger is a value, a record, or another logger.

There is a detail in there I enjoyed more than I should have. One of those commenters calls his helper `ErrAttr`. In my package, `ErrAttr` is the name of a type. Different construct entirely, mine is an enumeration of reserved key names, but the vocabulary landed in the same place without either of us seeing the other.

## The arguments for leaving it out

The Go team has been asked to standardise this twice, and the discussions are worth reading in full, because the objections are sharper than the requests.

The first proposal, in April 2023, asked for an `Err` field on `slog.Record`, so that handlers could decide how errors are keyed and displayed rather than every library picking its own convention. The proposer illustrated the problem with a mock log showing three libraries in one application emitting `error`, `err`, and `_ERROR` for the same concept. Jonathan Amsterdam, who wrote `slog`, objected that a `Record.Err` field takes a position the package should not take, because there are too many ways to log errors, unlike time and level and message where there is only one sensible reading. He then asked the question nobody in the thread answered cleanly: what happens when a log call has two errors. The proposal was declined for no change in consensus.[^7]

The second, in October 2023, asked for a `slog.Err` helper and a dedicated error kind. The response was that the helper is syntactic sugar for `slog.Any(key, err)` and you can write it yourself in one line, and that a new kind would do nothing, because kinds exist so that `Value` can avoid boxing for performance reasons, not to mark semantic categories, and a value of error kind would be indistinguishable in layout from one of any kind. There is also a remark in that thread which I think is the most quietly damning thing said in either: even if the proposal were adopted, it would not include a stack trace, so you would end up writing your own function regardless.[^8]

I want to be careful here, because there is an easy and wrong version of this article in which the community keeps building the same thing and the stewards keep refusing it, and the refusal is the story. That version is available and I do not believe it. The objections are correct. The multiplicity question has no clean answer. The kind argument is a straightforward statement of what `Value` is for. And the alternative, a canonical error shape frozen into the standard library in 2021, would have been fixed before anyone in the ecosystem had spent a year discovering that they wanted to log errors as nested groups rather than as strings.

## What Go shipped instead

What makes the decline defensible is not the reasoning in the threads. It is what the package already contains.

Take the fragmentation problem, the three libraries with three key conventions. That is fixable by the only party who actually knows what the log pipeline wants, which is the application, using `HandlerOptions.ReplaceAttr`. Five lines:

```
--- as emitted ---
{"level":"ERROR","msg":"library1","error":"db: bad connection"}
{"level":"ERROR","msg":"library2","err":"duplicate login detected"}
{"level":"ERROR","msg":"library3","_ERROR":"divide by zero"}

--- normalized at the handler ---
{"level":"ERROR","msg":"library1","err":"db: bad connection"}
{"level":"ERROR","msg":"library2","err":"duplicate login detected"}
{"level":"ERROR","msg":"library3","err":"divide by zero"}
```

Three libraries that never agreed on anything, speaking one vocabulary, without patching any of them. The standard library declined to impose a convention and shipped the mechanism that makes the absence of one survivable, one layer up, at the place where the decision belongs. That is a coherent position and I think it is the right one.

It has a seam, though, and the seam falls in an unlucky place. `ReplaceAttr` is documented as running for non-group attributes. I instrumented it to see what that means in practice for a `StructuredError` logged under a non-standard key, and it is invoked for `level`, for `msg`, and then once for each attribute inside the resolved group, with the group name in the `groups` argument. It is never invoked for the group's own key at all. Rename a child and it works. The outer key is unreachable.[^9]

So the normalisation trick repairs fragmentation for errors logged as scalars, and cannot repair it for errors logged as structured groups, which is to say it works everywhere except on the errors produced by the pattern this entire article is about. Nobody noticed in either proposal thread, and I do not think anyone was being careless. In 2023 almost nobody was logging errors as groups yet. The question was still whether the key should be `err` or `error`.

## What the year was worth

I set out to write a small library and an article about it, and what I actually produced was a demonstration of something I had not intended to demonstrate. The pattern is sound and it is not mine. The standard library gives you every handhold you need to build it, in about sixty lines, in a single file, with no dependencies, which is a real achievement of interface design and the reason a dozen people have built it a dozen ways without anyone needing permission. And the cost of that freedom is that each of us rediscovers the same subtleties in private, and some of us ship the same bug, and write an article containing output our own code cannot produce, and pass our own tests while doing it.

I do not think that trade is wrong. I think it is the trade, stated plainly, and it is worth stating plainly by someone who paid the cheaper half of it in public.

The package is being repaired now, this time with tests that assert instead of tests that print. What I will keep from the year is not the pattern, which the ecosystem already had, and not the bug, which was one line. It is the shape of the mistake underneath both: I built an instrument for observing my idea at exactly the moment I needed one for attacking it, and the instrument told me, accurately and for twelve months, precisely what I already believed.

---

[^1]: Error wrapping arrived in Go 1.13, which introduced the `%w` verb for `fmt.Errorf`, the `Unwrap() error` convention, and `errors.Is` and `errors.As` for inspecting a chain. Go 1.20 added `errors.Join` and the `Unwrap() []error` form, turning linear chains into trees traversed depth-first. See the Go blog, ["Working with Errors in Go 1.13"](https://go.dev/blog/go1.13-errors). What none of this changed is the payload: what travels between the layers is still a string plus a type.

[^2]: [`log/slog`](https://pkg.go.dev/log/slog), Go 1.21. The `LogValuer` interface is the relevant part here. The package documentation gives the canonical motivation for it as laziness rather than structure: a type whose `LogValue` performs expensive work pays that cost only when a record is actually emitted. I verified the behaviour rather than trusting it, with a type that increments a counter inside `LogValue`: logged at `Debug` against a handler set to `Error`, the counter stays at zero; logged at `Error`, it reaches one. This matters more than it first appears, because it means accumulating context at every layer of a call stack is free on the path where nothing is emitted.

[^3]: All output in this article is pasted from runs of the package on Go 1.22. `slog` resolves a `LogValuer` held in an `Attr`, including when that `Attr` sits inside a group, which is what makes the nesting work with no recursion in my own code. It does not resolve `LogValuer`s inside a `[]any` passed to `slog.Any`, which matters for the `errors.Join` case: doing the obvious thing there hands raw structs to the JSON encoder and produces `{"Op":"readUserFromDB","Err":{},"Fields":[{"Key":"user_id","Value":{}}]}`. Each child has to be resolved explicitly. I found this the same way I found everything else here, which is by running it.

[^4]: Oren Rose, ["Structured Errors in Go (Thought Experiment)"](https://orenrose.medium.com/thought-experiment-golang-structured-errors-1cb662f7e0cf), January 2024. The implementation differs from mine in where the attributes end up: his `Wrap` collects attributes across the whole chain and the resulting record carries them flat alongside the message, with `err.Error()` concatenated onto `msg`. The premise is identical.

[^5]: [suzuki-shunsuke/slog-error](https://github.com/suzuki-shunsuke/slog-error) exposes two functions, `With(err, args...)` to attach arguments to an error and `WithError(logger, err)` to produce a logger carrying them. [williammoran/slogerror](https://github.com/williammoran/slogerror) runs the relationship in the opposite direction, deriving an error's context from an `slog.Logger` on the grounds that the logging package is already building that context. [gregwebs/errors/slogerr](https://blog.gregweber.info/blog/go-errors-library/) converts a structured error into an `slog.Record` via `GetSlogRecord()`. [stackprune/errors](https://github.com/stackprune/errors) combines `slog` integration with a stack captured once at the origin and preserved across wraps. Four libraries, four different answers to the question of which object hands context to which.

[^6]: Both in the comment threads of the proposals below. The first: `func ErrAttr(err error) slog.Attr { return slog.Any("error", err) }`, described by its author as something he has in every project using `slog`. The second builds `slog.Group("error", ...)` with `exception.message` and `exception.stacktrace`, following [OpenTelemetry's semantic conventions for exceptions in logs](https://opentelemetry.io/docs/specs/semconv/exceptions/exceptions-logs/#attributes).

[^7]: golang/go [#59364](https://github.com/golang/go/issues/59364), "proposal: log/slog: add an 'error' field to 'Record'", opened April 2023. Amsterdam's objection, verbatim in substance: a `Record.Err` field is too limiting, because there are too many ways to log errors for `slog` to take a position, which is not the case for the other built-in fields. He also notes that the field is not strictly necessary, since a handler or `ReplaceAttr` function could find errors by looking for values of type `error` and rewrite their keys to `err`, `err2`, `err3` for uniformity, an observation that anticipates the normalisation section above. Russ Cox closed it with the standard formula for no change in consensus. The thread defers repeatedly to the original `slog` design discussion, [#56345](https://github.com/golang/go/issues/56345), where the question was settled the first time.

[^8]: golang/go [#63547](https://github.com/golang/go/issues/63547), "proposal: log/slog: Add 'slog.KindErr' and 'slog.Err' Attrs Helper Function", opened October 2023. The stack-trace remark is Amsterdam's: even with the proposal implemented, you would still be writing your own helper, because a stack trace is not in scope for it either.

[^9]: [`HandlerOptions.ReplaceAttr`](https://pkg.go.dev/log/slog#HandlerOptions) is documented as being called for each non-group attribute. Logging a two-layer `StructuredError` under the key `_ERROR` and instrumenting the callback, the invocations are: `groups=[] key=level`, `groups=[] key=msg`, then `groups=[_ERROR]` for each of `component`, `op` and `cause`. Renaming `cause` from inside the callback works and shows up in the output. The key `_ERROR` is never presented to the callback in any form. The workaround is a wrapping handler that rewrites attributes before they reach the underlying one, which is more machinery than five lines, and is available, and is not the point: the point is that the seam exists exactly where structured errors attach.