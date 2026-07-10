---
layout: article
type: article
date: 2026-04-27T22:00:00+02:00
author: Tedla Brandsema
title: EML as a Candidate Substrate for Symbolic Regression
intro: A toolchain for testing whether the Exp-Minus-Log representation gives symbolic regression a useful search space.
hero: /static/images/hero/generated/eml-as-a-candidate-substrate-for-symbolic-regression
hero_alt: A glowing mathematical expression lattice transforming data into symbolic expression trees.
hero_caption: EML turns symbolic regression into a search over a compact expression space.
hero_ai: true
---

<h1>{{ page.title }}</h1>
<h2><em>An empirical toolchain for evaluating the Exp-Minus-Log representation</em></h2>

{% include published.html %}

{% include hero.html %}

{% include ai-disclosure.html %}

When I first read *[All elementary functions from a single operator](https://arxiv.org/html/2603.21852v2)* by Andrzej Odrzywo&#322;ek, I wanted to play with it immediately.

The paper makes an unusual claim. A single binary operator,

$$
\operatorname{eml}(x,y)=\exp(x)-\ln(y)
$$

together with the constant `1`, is enough to generate the ordinary repertoire of elementary mathematics. Arithmetic operations, exponentials, logarithms, trigonometric functions, algebraic functions, and constants such as $e$, $\pi$, and $i$ are all claimed to be reachable by repeated composition of the same node type.

That is easy to underestimate. A one-operator representation is not merely a cute compression trick if it gives us a different way to search the space of expressions.

Single-author papers that present elegant unifications often get filed away as curiosities: mathematically neat, probably peripheral. That may still be the right verdict here. But the reflex is too quick. Odrzywo&#322;ek has identified a surprising compression of a function family many people assume has to remain structurally plural.

I opened a new repository and started writing a `goyacc` parser. That parser became [eml-parser](https://github.com/tedla-brandsema/eml-parser).

The question changed almost immediately. If Exp-Minus-Log (<abbr title="Exp-Minus-Log">EML</abbr>) is structurally this small, can it also be computationally useful?

## Beyond Novelty

Symbolic regression (<abbr title="Symbolic Regression">SR</abbr>) tries to recover interpretable mathematical formulas directly from data. Instead of fitting parameters inside a predefined model family, it searches for the formula itself. In practical terms, an SR system asks whether a dataset came from a recoverable equation, which expression gives the best tradeoff between simplicity and fit, and whether an underlying law can be found rather than approximated.

That search depends heavily on representation.

Most symbolic regression systems operate over heterogeneous operator sets: addition, subtraction, multiplication, division, powers, exponentials, logarithms, trigonometric functions, and whatever else the system exposes. Candidate expressions are built from primitives with different arities, identities, domains, and simplification rules.

EML suggests a narrower experiment. If familiar functions can be represented inside a uniform binary grammar, then SR may be able to search a more regular expression family.

That does not make the problem easy. Uniformity can hide depth and redundancy, plus brutal combinatorial growth. But it turns the question into something testable: can EML function as a useful substrate for symbolic regression?

## From Paper To Toolchain

The project began with a narrow scope. I did not want to build a symbolic regression system on top of untested assumptions. I wanted a controlled foundation: a parser, a typed AST, evaluation backends, normalization, reproducible experiments, and a clean path for later search strategies.

The raw language stays intentionally small. It accepts only:

* the constant `1`,
* variables,
* `eml(left,right)`.

That is enough for the representation described in the paper. Larger expressions still reduce to repeated compositions of those atomic forms.

Named mathematical concepts such as $\sin$, $\cos$, $\tan$, $\sqrt{x}$, or $\operatorname{pow}$ do not belong in the grammar. They live in a separate concept dictionary.

This split is the main architectural boundary in the repository. The parser owns the atomic language. The dictionary owns named mathematics. Concepts can expand recursively until only raw EML remains, so the language stays small while richer constructions sit above it.

In practice, $\exp(x)$ may reduce directly to a raw EML tree. $\tan(x)$ may reduce first to lower-level concepts such as $\sin(x)$ and $\cos(x)$. Those concepts may reduce further through additional definitions. Full expansion always ends as a raw EML tree.

That boundary has held up well.

## Why Go

The implementation is currently written in Go for practical reasons.

Go is good at typed internal representations, parser tooling, deterministic experiment harnesses, and CLI-oriented development loops. `goyacc` also made it straightforward to own the grammar instead of treating parsing as a side concern.

At this stage, the main unknowns are not systems bottlenecks. They are representational and empirical questions:

* does the search space behave reasonably,
* can formulas be recovered reproducibly,
* where do present methods fail,
* which normalizations help,
* how much does numeric precision matter?

Go is enough to answer those questions quickly.

## A Possible Zig Layer

If the repository keeps maturing, Zig is a plausible runtime for some layers of the system.

The pressure points are already visible:

* high-precision arithmetic,
* native interop with mature numeric libraries such as GMP, MPFR, or MPC,
* tighter memory control for search-heavy workloads,
* lower-overhead runtime behavior for large candidate-generation loops.

That would not mean Go was the wrong starting point. It would mean the constraints changed.

Right now, velocity matters most. Later, numeric control and systems-level efficiency may matter more. If that point arrives, Zig is a serious candidate.

## Experimental Posture

The repository is an empirical research vehicle, not a polished end-user tool.

Every symbolic regression experiment starts from a known target law and asks a limited question: can the present system recover the intended structure from data under explicit search bounds?

That is controlled recovery, not open-ended discovery.

The distinction matters because symbolic regression is full of overclaiming. Numeric approximation is presented as formula recovery. Selective successes are shown without negative controls. Search limits disappear from the story. Failure gets reframed as progress.

I wanted the opposite posture: reproducible experiments, explicit targets, named search bounds, classified outcomes, and a clear separation between approximate fits and structural recovery.

That discipline is more useful than inflated early wins.

## Current Results

So far, the evidence is modest but useful.

Under the present bounded enumerative search regime, small targets such as $\exp$ and $\log$ can be recovered exactly. At least one small nested composite target is also recoverable.

Larger-library targets such as $\sin$, sigmoid, and broader additive composites fail honestly under present limits.

That is not a verdict on EML. It is not a verdict on Odrzywo&#322;ek's paper either. It is a statement about the present implementation:

* present search strategy,
* present search budget,
* present normalization strength,
* present evaluator limits,
* present lack of constant fitting or optimizer-guided refinement.

Those boundaries are what the repository is meant to expose.

## Why I Keep Working On It

Some interesting ideas remain interesting only at a distance.

EML has not felt like that. The more I work on it, the more experiments it suggests: symbolic regression over a uniform grammar, compiler-style rewriting and canonicalization, multiple evaluator backends, proof-oriented export, empirical study of representational search spaces, and comparisons against heterogeneous operator vocabularies.

The appeal is the combination: the project is useful enough to justify the time and fun enough to keep stealing attention. This repository has become distracting because it keeps producing one more reasonable test.

## What Would Count As Progress

The standard for success should stay high.

Meaningful progress would require repeated evidence that the representation provides practical advantages under controlled conditions. That means broader reproducible recovery suites, honest comparison against other SR representations, normalization that cuts search waste, fitted constants and hybrid search methods, stronger high-precision validation, formal export into proof systems, and evidence that EML is useful for reasons beyond aesthetics.

EML does not meet that bar yet.

I also do not see evidence that rules it out. There is still too much work to do before the answer is decisive in either direction.

The narrow claim I am comfortable making today is this: Odrzywo&#322;ek's paper presents an idea serious enough to test rather than merely admire. A minimal one-operator language, paired with concept expansion and reproducible experiments, is already enough to ask useful questions about symbolic regression.

{% include math-jax-script.html %}
