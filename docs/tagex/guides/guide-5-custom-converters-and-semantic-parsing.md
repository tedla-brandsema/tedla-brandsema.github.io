---
layout: default
title: Tagex Guide 5 — Custom converters and semantic parsing
---

 {% include nav-tagex.html %}

<main>
  <h1>Custom converters and semantic parsing</h1>

  <p>
    Tagex includes default parameter converters for <code>string</code>,
    <code>int</code>, <code>float64</code>, and <code>bool</code>.
    These defaults are intentionally small and unsurprising.
  </p>

  <p>
    But real tag languages often want <strong>domain literals</strong> instead of
    programmer literals.
  </p>

  <section class="divider">
    <h2>Why override converters?</h2>

    <p>
      The default <code>int</code> converter uses <code>strconv.Atoi</code>.
      That means tag parameters must look like this:
    </p>

<pre><code class="language-go">
`net:"timeout_ms, value=250"`
`net:"max_bytes, value=10485760"`
</code></pre>

    <p>
      This is precise, but it is not readable.
      Humans naturally write:
    </p>

<pre><code class="language-go">
`net:"timeout, value=250ms"`
`net:"max_bytes, value=10MiB"`
</code></pre>

    <p>
      That’s the core motivation for custom converters:
      <strong>make tags express meaning directly</strong>.
    </p>
  </section>

  <section class="divider">
    <h2>Example: durations as parameters</h2>

    <p>
      Let’s build a directive that configures a timeout.
      The directive wants an <code>int</code> representing milliseconds.
      Without a custom converter, you must encode milliseconds manually.
    </p>

<pre><code class="language-go">
type TimeoutDirective struct {
    // milliseconds
    Value int `param:"value"`
}

func (d *TimeoutDirective) Name() string { return "timeout" }
func (d *TimeoutDirective) Mode() tagex.DirectiveMode { return tagex.EvalMode }

// This directive is intentionally trivial: it just demonstrates parameter meaning.
func (d *TimeoutDirective) Handle(_ string) (string, error) {
    return "", nil
}
</code></pre>

    <p>
      We want tags like:
    </p>

<blockquote>
  <code>`net:"timeout, value=250ms"`</code>
</blockquote>

    <p>
      But <code>strconv.Atoi("250ms")</code> fails.
      So we override the <code>int</code> converter for this tag.
    </p>
  </section>

  <section class="divider">
    <h2>Implementing a duration-aware int converter</h2>

<pre><code class="language-go">
netTag := tagex.NewTag("net")

// Override int parsing for THIS tag only.
// Interpret integers as either:
//   - plain numbers: "250" (milliseconds)
//   - durations: "250ms", "2s", "1m"
netTag.SetConverter(reflect.Int, func(v reflect.Value, raw string) error {
    raw = strings.TrimSpace(raw)

    // Fast path: plain integer means milliseconds.
    if isPlainInt(raw) {
        n, err := strconv.Atoi(raw)
        if err != nil {
            return tagex.ConversionError{Msg: fmt.Sprintf("unable to convert value %q to int", raw)}
        }
        v.SetInt(int64(n))
        return nil
    }

    // Duration path: parse "250ms", "2s", "1m", etc.
    d, err := time.ParseDuration(raw)
    if err != nil {
        return tagex.ConversionError{Msg: fmt.Sprintf("unable to convert value %q to duration", raw)}
    }

    ms := int(d / time.Millisecond)
    v.SetInt(int64(ms))
    return nil
})

tagex.RegisterDirective(&netTag, &TimeoutDirective{})
</code></pre>

    <p>
      Helper used above:
    </p>

<pre><code class="language-go">
func isPlainInt(s string) bool {
    if s == "" {
        return false
    }
    for _, r := range s {
        if r &lt; '0' || r &gt; '9' {
            return false
        }
    }
    return true
}
</code></pre>
  </section>

  <section class="divider">
    <h2>Using the improved tag language</h2>

<pre><code class="language-go">
type ClientConfig struct {
    // We don't care about the field type in this example; we just want the directive to run.
    Endpoint string `net:"timeout, value=250ms"`
}
</code></pre>

    <p>
      When Tagex processes the struct:
    </p>

    <ul>
      <li>The tag parser extracts <code>value=250ms</code></li>
      <li>The custom int converter parses it as a duration</li>
      <li><code>TimeoutDirective.Value</code> becomes <code>250</code> (milliseconds)</li>
    </ul>

    <p>
      The directive implementation stays simple.
      The semantic complexity lives in the conversion layer,
      where it belongs.
    </p>
  </section>

  <section class="divider">
    <h2>Why this is a good use of converters</h2>

    <p>
      This pattern is valuable because:
    </p>

    <ul>
      <li><strong>Tags become readable</strong> (<code>250ms</code> is clearer than <code>250</code> with an implicit unit)</li>
      <li><strong>Directives stay focused</strong> (they receive already-interpreted values)</li>
      <li><strong>Meaning is tag-local</strong> (overrides apply only to <code>net</code>, not the rest of your program)</li>
      <li><strong>No boilerplate at call sites</strong> (the parsing happens automatically when processing)</li>
    </ul>
  </section>

  <section class="divider">
    <h2>Other realistic converter overrides</h2>

    <p>
      The same approach works for other domain literals:
    </p>

    <ul>
      <li><strong>Sizes:</strong> <code>10MiB</code>, <code>512KiB</code> → int bytes</li>
      <li><strong>Percentages:</strong> <code>12.5%</code> → float64 fraction</li>
      <li><strong>Environment indirection:</strong> <code>$TIMEOUT</code> → resolve and parse</li>
      <li><strong>Lenient booleans:</strong> <code>yes/no</code>, <code>on/off</code> → bool</li>
    </ul>

    <p>
      The point is not “custom parsing”.
      The point is: <strong>tags should be able to speak the language of your domain</strong>.
    </p>
  </section>
</main>
