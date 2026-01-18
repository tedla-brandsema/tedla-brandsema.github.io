---
layout: default
title: Tagex Guide 1 — Tag-driven behavior
---

 {% include nav-tagex.html %}

<main>
  <h1>Tag-driven behavior</h1>

  <p>
    This guide introduces the core idea behind Tagex:
    <strong>struct tags select behavior, directives implement meaning</strong>.
  </p>

  <p>
    We will not validate forms, return error messages to users,
    or talk about “constraints”.
    Instead, we will use tags to <em>normalize and transform data</em>
    as it flows through a system.
  </p>

  <section class="divider">
    <h2>The problem: inconsistent external input</h2>

    <p>
      Many systems ingest data that is <em>structurally correct</em>
      but <em>semantically inconsistent</em>:
    </p>

    <ul>
      <li>User input</li>
      <li>CSV or JSON imports</li>
      <li>Third-party APIs</li>
      <li>Legacy systems</li>
    </ul>

    <p>
      The data fits your structs, but not your expectations.
      Normalization logic is usually scattered across constructors,
      helper functions, or ad-hoc cleanup code.
    </p>
  </section>

  <section class="divider">
    <h2>Declaring semantics with tags</h2>

    <p>
      With Tagex, you declare <em>what a field means</em>
      using struct tags.
    </p>

<pre><code class="language-go">
type ImportRow struct {
    SKU   string `norm:"upper"`
    Price string `norm:"currency, locale=nl_NL"`
}
</code></pre>

    <p>
      These tags do not describe constraints.
      They describe <strong>behavior</strong>.
    </p>

    <ul>
      <li><code>upper</code> means “normalize identifiers”</li>
      <li><code>currency</code> means “parse locale-aware money values”</li>
    </ul>
  </section>

  <section class="divider">
    <h2>Implementing a directive</h2>

    <p>
      A directive is a small, typed piece of Go code
      that implements a specific semantic operation.
    </p>

<pre><code class="language-go">
type UpperDirective struct{}

func (d *UpperDirective) Name() string {
    return "upper"
}

func (d *UpperDirective) Mode() tagex.DirectiveMode {
    return tagex.MutMode
}

func (d *UpperDirective) Handle(val string) (string, error) {
    return strings.ToUpper(val), nil
}
</code></pre>

    <p>
      This directive:
    </p>

    <ul>
      <li>Operates on <code>string</code> fields</li>
      <li>Transforms the value</li>
      <li>Writes the result back (<code>MutMode</code>)</li>
    </ul>
  </section>

  <section class="divider">
    <h2>Directives with parameters</h2>

    <p>
      Directives can receive parameters via their own struct fields.
    </p>

<pre><code class="language-go">
type CurrencyDirective struct {
    Locale string `param:"locale"`
}

func (d *CurrencyDirective) Name() string {
    return "currency"
}

func (d *CurrencyDirective) Mode() tagex.DirectiveMode {
    return tagex.MutMode
}

func (d *CurrencyDirective) Handle(val string) (string, error) {
    cents, err := parseCurrency(val, d.Locale)
    if err != nil {
        return val, err
    }
    return strconv.FormatInt(cents, 10), nil
}
</code></pre>

    <p>
      Parameters are mapped automatically from the struct tag:
    </p>

<blockquote>
  <code>`norm:"currency, locale=nl_NL"`</code>
</blockquote>
  </section>

  <section class="divider">
    <h2>Creating a tag context</h2>

    <p>
      A <code>Tag</code> represents a processing context
      for a single struct tag key.
    </p>

<pre><code class="language-go">
normTag := tagex.NewTag("norm")

tagex.RegisterDirective(&normTag, &UpperDirective{})
tagex.RegisterDirective(&normTag, &CurrencyDirective{})
</code></pre>

    <p>
      Directives are registered explicitly.
      Nothing is global and nothing is implicit.
    </p>
  </section>

  <section class="divider">
    <h2>Processing a struct</h2>

<pre><code class="language-go">
row := ImportRow{
    SKU:   "ab-123",
    Price: "€ 1.234,50",
}

_, err := normTag.ProcessStruct(&row)
</code></pre>

    <p>
      After processing:
    </p>

<pre><code class="language-go">
row.SKU   == "AB-123"
row.Price == "123450"
</code></pre>

    <p>
      The struct is now normalized and ready for use
      by the rest of your system.
    </p>
  </section>

  <section class="divider">
    <h2>What this is (and is not)</h2>

    <p>
      In this guide, Tagex:
    </p>

    <ul>
      <li>Did not validate user input</li>
      <li>Did not know about databases or HTTP</li>
      <li>Did not enforce business rules</li>
    </ul>

    <p>
      It executed <strong>semantic behavior</strong>
      selected by tags and implemented in Go.
    </p>
  </section>

  <section class="divider">
    <h2>Why this matters</h2>

    <p>
      By attaching semantics directly to struct fields:
    </p>

    <ul>
      <li>Normalization logic is no longer scattered</li>
      <li>Meaning travels with the data</li>
      <li>Behavior is reusable and explicit</li>
    </ul>

    <p>
      The struct becomes a semantic unit —
      not just a bag of values.
    </p>
  </section>

  <section class="divider">
    <h2>Next guide</h2>

    <p>
      In the next guide, we will look at how tags can be used
      to <em>select behavior conditionally</em>,
      allowing the same struct to mean different things
      in different contexts.
    </p>
  </section>
</main>
