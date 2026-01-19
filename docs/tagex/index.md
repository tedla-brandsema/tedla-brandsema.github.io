---
layout: default
title: Tagex — Overview
---

{% include nav-tagex.html %}

<main>
  <h1>Tagex</h1>

  <p>
    Tagex is a Go library for executing behavior defined by struct tags.
    It lets you attach <strong>evaluation</strong>, <strong>mutation</strong>,
    and side effects directly to data structures in a controlled and reusable way.
  </p>

  <p>
    Instead of treating struct tags as passive metadata,
    Tagex treats them as instructions:
    tags select <em>what should run</em>,
    directives define <em>what it does</em>,
    and the struct defines <em>what success means</em>.
  </p>

  <section class="divider">
    <h2>What problem does Tagex solve?</h2>

    <p>
      In many Go codebases, structs represent more than just data.
      They describe inputs, configuration, requests, and operational boundaries.
    </p>

    <p>
      The logic associated with those structs is often scattered:
    </p>

    <ul>
      <li>Fields are checked in one place</li>
      <li>Values are modified in another</li>
      <li>Side effects are triggered manually</li>
      <li>Control flow is enforced with ad-hoc conditionals</li>
    </ul>

    <p>
      Tagex provides a way to bring this logic back to where it belongs:
      <strong>next to the data it applies to</strong>,
      without turning structs into active objects or introducing a framework.
    </p>
  </section>

  <section class="divider">
    <h2>The core model</h2>

    <h3>Tags</h3>
    <p>
      A <strong>tag</strong> defines an execution context.
      It groups related directives and determines when they apply.
    </p>

    <p>
      Tags are reusable across structs and intentionally lightweight.
      They do not define behavior on their own.
    </p>

    <h3>Directives</h3>
    <p>
      A <strong>directive</strong> is a unit of behavior.
      It may evaluate a field, mutate it, or interpret parameters attached to it.
    </p>

    <p>
      Directives are reusable, composable, and explicitly scoped.
      They define their own semantics, including how their parameters are parsed.
    </p>

    <h3>Structs</h3>
    <p>
      The struct being processed defines intent.
    </p>

    <p>
      By optionally implementing pre- and post-processing hooks,
      a struct can define what must happen before execution
      and what constitutes successful completion.
    </p>

    <p>
      This allows the same tags and directives to be reused
      while expressing different outcomes and side effects.
    </p>

    <figure class="diagram">
      <img
        src="/static/images/tagex-lifecycle.png"
        alt="Tagex execution model showing struct-owned lifecycle with optional Before and After hooks around ProcessStruct"
      />
      <figcaption>
        Tagex execution model: struct-owned lifecycle hooks surround directive execution
        performed by <code>ProcessStruct</code>.
      </figcaption>
    </figure>
  </section>

  <section class="divider">
    <h2>Execution, not interpretation</h2>

    <p>
      Tagex does not build an abstract rule tree or expression graph.
      It executes directives directly against struct fields.
    </p>

    <p>
      Execution is:
    </p>

    <ul>
      <li>Explicit</li>
      <li>Deterministic</li>
      <li>Locally scoped</li>
    </ul>

    <p>
      There is no global state, no hidden lifecycle,
      and no implicit ordering beyond what is declared.
    </p>
  </section>

  <section class="divider">
    <h2>What Tagex is not</h2>

    <p>
      Tagex is not a validation framework, although evaluation-only use cases
      fit naturally.
      It is not a rule engine, and it does not attempt to be a DSL.
    </p>

    <p>
      Its goal is narrower and more deliberate:
      to provide a small execution model that makes
      struct-attached behavior explicit, reusable, and predictable.
    </p>
  </section>

  <section class="divider">
    <h2>Next steps</h2>

    <p>
      To see Tagex in action, start with the
      <a href="getting-started.html">Getting started</a> guide.
    </p>

    <p>
      The <a href="guides/">Guides</a> section explores the model in depth,
      including evaluation, mutation,
      pre- and post-processing, and directive-owned parsing.
    </p>
  </section>
</main>
