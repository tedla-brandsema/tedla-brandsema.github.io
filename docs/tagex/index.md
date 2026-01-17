---
layout: default
title: Tagex — Overview
---

<nav>
  <h2>Tagex</h2>
  <ul>
    <li><strong>Overview</strong></li>
    <li><a href="getting-started.html">Getting started</a></li>
    <li><a href="guides/">Guides</a></li>
  </ul>

  <div class="nav-divider">
    <ul>
      <li><a href="https://github.com/tedla-brandsema/tagex">GitHub</a></li>
      <li><a href="https://pkg.go.dev/github.com/tedla-brandsema/tagex">GoDoc</a></li>
    </ul>
  </div>
</nav>

<main>
  <h1>Tagex</h1>

  <p>
    Tagex is a small, focused Go library for <strong>tag-based expression matching</strong>.
    It lets you describe conditions such as <em>“must have A, must not have B, and optionally C”</em>
    and evaluate them efficiently against sets of tags.
  </p>

  <p>
    The design goal of Tagex is clarity and correctness: expressions are explicit,
    evaluation is deterministic, and the underlying model is simple enough to reason
    about without surprises.
  </p>

  <section class="divider">
    <h2>What problem does Tagex solve?</h2>

    <p>
      Many systems need to make decisions based on tags or labels:
    </p>

    <ul>
      <li>Feature flags and capability checks</li>
      <li>Routing, filtering, or selection logic</li>
      <li>Policy or permission evaluation</li>
      <li>Build, deployment, or environment constraints</li>
    </ul>

    <p>
      These conditions are often encoded as ad-hoc boolean logic, which quickly becomes
      hard to read, hard to test, and hard to extend.
    </p>

    <p>
      Tagex provides a compact expression language and an evaluator that turns these
      conditions into a first-class concept.
    </p>
  </section>

  <section class="divider">
    <h2>Core concepts</h2>

    <h3>Tags</h3>
    <p>
      A <strong>tag</strong> is a simple identifier — usually a string — representing
      a property, capability, or classification. Tagex treats tags as atomic values;
      there is no hierarchy or implicit meaning.
    </p>

    <h3>Expressions</h3>
    <p>
      An <strong>expression</strong> describes a condition over tags. At a minimum,
      an expression can:
    </p>

    <ul>
      <li>Require the presence of one or more tags</li>
      <li>Forbid the presence of specific tags</li>
      <li>Combine conditions using clear logical rules</li>
    </ul>

    <p>
      Expressions are parsed once and can then be evaluated repeatedly against
      different tag sets.
    </p>

    <h3>Evaluation</h3>
    <p>
      Evaluating an expression answers a single question:
      <em>does this set of tags satisfy the expression?</em>
    </p>

    <p>
      Evaluation is side-effect free and does not depend on external state, which makes
      it suitable for use in hot paths, tests, and deterministic systems.
    </p>
  </section>

  <section class="divider">
    <h2>Design principles</h2>

    <ul>
      <li><strong>Explicit over implicit</strong> — no hidden rules or magic defaults</li>
      <li><strong>Small surface area</strong> — easy to understand and audit</li>
      <li><strong>Deterministic behavior</strong> — same input, same result</li>
      <li><strong>Go-native</strong> — designed to feel natural in Go code</li>
    </ul>

    <p>
      Tagex is intentionally not a general rule engine. It focuses narrowly on
      tag-based matching and does that one thing well.
    </p>
  </section>

  <section class="divider">
    <h2>Next steps</h2>

    <p>
      If you want to try Tagex immediately, continue with the
      <a href="getting-started.html">Getting started</a> guide.
      It walks through defining your first expression and evaluating it in Go.
    </p>

    <p>
      For deeper explanations and real-world usage patterns, see the
      <a href="guides/">Guides</a> section.
    </p>
  </section>
</main>
