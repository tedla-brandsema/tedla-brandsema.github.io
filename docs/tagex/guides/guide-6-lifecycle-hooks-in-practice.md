---
layout: default
title: Tagex Guide 6 — Lifecycle hooks in practice
---

{% include nav-tagex.html %}

<main>
  <h1>Lifecycle hooks in practice</h1>

  <p>
    Tagex lets a struct define optional lifecycle hooks that run
    around directive execution.
    This guide shows how to use <code>Before</code>, <code>Success</code>,
    and <code>Failure</code> together to model real, production workflows.
  </p>

  <section class="divider">
    <h2>The problem: success is implicit</h2>

    <p>
      In most Go code, success is inferred by the absence of errors.
      That makes it hard to centralize side effects, commit work,
      or emit events only when all tagged behavior has succeeded.
    </p>

    <p>
      Lifecycle hooks make the success path explicit and structured.
    </p>
  </section>

  <section class="divider">
    <h2>The hooks</h2>

    <ul>
      <li><strong>Before() error</strong> runs before any directives execute</li>
      <li><strong>Success()</strong> runs only if all directives succeed</li>
      <li><strong>Failure(err)</strong> runs if any directive fails</li>
    </ul>

    <p>
      Tagex does not interpret these hooks.
      They are owned by the struct and can do anything:
      initialize resources, write logs, persist data, or roll back.
    </p>
  </section>

  <section class="divider">
    <h2>Example: importing a row with a commit on success</h2>

<pre><code class="language-go">
type ImportRow struct {
    SKU   string `norm:"upper"`
    Price string `norm:"currency, locale=nl_NL"`
    Notes string `audit:"log, event=import"`
}

type ImportJob struct {
    Row   ImportRow
    LogID string
}

func (j *ImportJob) Before() error {
    logID, err := startAuditLog()
    if err != nil {
        return err
    }
    j.LogID = logID
    return nil
}

func (j *ImportJob) Success() {
    persistRow(j.Row)
    finalizeAuditLog(j.LogID, "success")
}

func (j *ImportJob) Failure(err error) {
    finalizeAuditLog(j.LogID, "failure")
    recordFailure(err)
}
</code></pre>

    <p>
      The directives handle normalization and audit tagging.
      The hooks handle orchestration and side effects.
    </p>
  </section>

  <section class="divider">
    <h2>Execution flow</h2>

    <ol>
      <li><code>Before()</code> runs</li>
      <li>Tagged directives execute in order</li>
      <li>If all succeed, <code>Success()</code> runs</li>
      <li>If any fail, <code>Failure(err)</code> runs</li>
    </ol>

    <p>
      This makes the success path explicit and reliable.
      If <code>Success()</code> runs, you know all directives completed.
    </p>

    <figure class="diagram">
      <img
        src="/static/images/tagex-lifecycle.png"
        alt="Lifecycle flow with Before running first, directives executed inside ProcessStruct, then Success or Failure based on error"
      />
      <figcaption>
        Lifecycle sequence: <code>Before()</code> gates execution, directives run inside
        <code>ProcessStruct</code>, resulting in either <code>Success()</code> or <code>Failure(err)</code>.
      </figcaption>
    </figure>
  </section>

  <section class="divider">
    <h2>When to use each hook</h2>

    <ul>
      <li><strong>Before()</strong>: allocate resources, start timers, load context</li>
      <li><strong>Success()</strong>: commit work, emit events, persist outcomes</li>
      <li><strong>Failure(err)</strong>: log errors, roll back, update metrics</li>
    </ul>

    <p>
      Hooks are a boundary between <em>semantic behavior</em>
      (directives) and <em>orchestration</em> (side effects).
    </p>
  </section>

  <section class="divider">
    <h2>Common pitfalls</h2>

    <ul>
      <li>Doing heavy work in directives that belongs in <code>Success()</code></li>
      <li>Duplicating error handling in directives and <code>Failure(err)</code></li>
      <li>Using <code>Before()</code> for semantic validation instead of setup and gating</li>
    </ul>

    <p>
      Keep directives focused on field-level semantics.
      Use hooks to coordinate the wider operation.
      If <code>Before()</code> returns an error, execution halts and the struct
      is not processed, making it a clean place to enforce preconditions.
    </p>
  </section>
</main>
