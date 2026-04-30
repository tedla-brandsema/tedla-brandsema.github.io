---
layout: article
type: article
published: 2026-04-27T22:00:00+02:00
author: Tedla Brandsema
heading: EML as a Candidate Substrate for Symbolic Regression
intro: An empirical toolchain for evaluating whether the Exp-Minus-Log representation offers a useful search space for symbolic regression.
---

<h1>{{ page.heading }}</h1>
<h2><em>An empirical toolchain for evaluating the Exp-Minus-Log representation</em></h2>

{% include published.html %}

When I first read *[All elementary functions from a single operator](https://arxiv.org/html/2603.21852v2)* by Andrzej Odrzywołek, I had the reaction that elegant technical ideas sometimes provoke: I wanted to play with it immediately.

The paper proposes an unusual claim. A single binary operator,

$$
\operatorname{eml}(x,y)=\exp(x)-\ln(y)
$$

together with the constant `1`, is sufficient to generate the ordinary repertoire of elementary mathematics. Arithmetic operations, exponentials, logarithms, trigonometric functions, algebraic functions, and constants such as $e$, $\pi$, and $i$ are all claimed to be reachable through repeated composition of the same node type.

That is a remarkable result.

It is also, in my view, easy to underestimate.

Single-author papers that present elegant unifications are often dismissed as clever curiosities: mathematically neat, conceptually amusing, but ultimately peripheral. That may yet prove to be the consensus here. But I suspect the underlying idea deserves more serious attention than that reflex allows.

Whether Exp-Minus-Log (<abbr title="Exp-Minus-Log">EML</abbr>) ultimately becomes important is for time to decide. What is already clear is that Andrzej Odrzywołek has identified something conceptually striking: a surprising compression of a function family many people implicitly assume must remain structurally plural.

I opened a new repository and started writing a `goyacc` parser.

That parser became [eml-parser](https://github.com/tedla-brandsema/eml-parser).

What began as curiosity quickly turned into a larger question: if EML is structurally this simple, can it also be computationally useful?

## Why This Matters Beyond Novelty

The immediate temptation is to treat EML as a mathematical curiosity. A neat reduction. A surprising universality result. Something to admire and move on from.

What interested me more was the computational shape of it.

Symbolic regression (<abbr title="Symbolic Regression">SR</abbr>) attempts to recover interpretable mathematical formulas directly from data. Instead of fitting parameters to a predefined model family, it searches for formulas themselves. In practical terms, symbolic regression systems try to answer questions such as:

* what equation generated this dataset,
* which expression best balances simplicity and fit,
* can an underlying law be recovered rather than merely approximated?

That search depends heavily on representation.

Traditional symbolic regression systems often operate over heterogeneous operator sets: addition, subtraction, multiplication, division, powers, exponentials, logarithms, trigonometric functions, and so on. Candidate expressions are built from many unrelated primitives with different arities, identities, and simplification rules.

EML suggests a different possibility.

If many familiar functions can be represented inside a uniform binary grammar, then symbolic regression may be able to search a more regular expression family.

That does **not** automatically make the problem easier. Uniformity can conceal depth, redundancy, and severe combinatorial growth. But it transforms the question from speculation into something testable.

Can EML function as a useful substrate for symbolic regression?

That is the purpose of this repository.

## From Paper to Toolchain

The project began with a deliberately narrow scope.

I did not want to build a grand symbolic-regression system on top of untested assumptions. I wanted a controlled foundation:

* a parser,
* a typed AST,
* evaluation backends,
* normalization,
* reproducible experiments,
* and a clean path for future search strategies.

The raw language remains intentionally small. It accepts only:

* the constant `1`,
* variables,
* `eml(left,right)`.

That is enough. Every larger expression in the paper still reduces to repeated compositions of those atomic forms.

Named mathematical concepts such as $\sin$, $\cos$, $\tan$, $\sqrt{x}$, or $\operatorname{pow}$ do not belong in the grammar itself. They live in a separate concept dictionary.

This split matters.

The parser owns the atomic language. The dictionary owns named mathematics. Concepts can expand recursively until only raw EML remains. That keeps the language small while allowing richer constructions above it.

In practice, $\exp(x)$ may reduce directly to a raw EML tree. $\tan(x)$ may reduce first to lower-level concepts such as $\sin(x)$ and $\cos(x)$. Those lower-level concepts may reduce further through additional definitions until only raw EML remains. The result of full expansion is always a raw EML tree.

That architectural boundary has proven valuable.

## Why I Chose Go

The implementation is currently written in Go for practical reasons.

Go is excellent for building typed internal representations, parser tooling, deterministic experiment harnesses, and CLI-oriented development loops quickly. `goyacc` made it straightforward to own the grammar fully rather than treat parsing as an incidental detail.

At the current stage, the dominant unknowns are not systems-level bottlenecks. They are representational and empirical questions:

* does the search space behave reasonably,
* can formulas be recovered reproducibly,
* where do current methods fail,
* which normalizations help,
* how much does numeric precision matter?

Go is more than sufficient for answering those questions quickly.

## Why Zig Is A Plausible Later Target

If the repository continues to mature, Zig is a plausible future runtime for some layers of the system.

The likely pressure points are already visible:

* high-precision arithmetic,
* native interop with mature numeric libraries such as GMP, MPFR, or MPC,
* tighter memory control for search-heavy workloads,
* lower-overhead runtime behavior for large candidate-generation loops.

That would not imply that Go was the wrong starting point. It would simply reflect a change in constraints.

Right now, velocity matters most.

Later, numeric control and systems-level efficiency may matter more.

If that moment comes, Zig is a serious candidate.

## Current Experimental Direction

The repository is presently an empirical research vehicle rather than a polished end-user tool.

Its core methodology is intentionally conservative.

Every symbolic-regression experiment starts from a known target law and asks a limited question:

Can the current system recover the intended structure from data under explicit search bounds?

That is controlled recovery, not open-ended discovery.

This distinction matters because symbolic regression is full of exaggerated claims. Numeric approximation is often presented as formula recovery. Selective successes are shown without negative controls. Search limits are hidden. Failure is reframed as progress.

I wanted the opposite posture.

Experiments are reproducible. Targets are explicit. Search bounds are named. Outcomes are classified. Approximate fits are separated from structural recovery.

That discipline is more valuable than inflated early wins.

## What The Current Results Actually Show

So far, the evidence is modest but useful.

Under the present bounded enumerative search regime, small targets such as $\exp$ and $\log$ can be recovered exactly. At least one small nested composite target is also recoverable.

Larger-library targets such as $\sin$, sigmoid, and broader additive composites currently fail honestly under present limits.

That should not be read as a verdict on EML itself, nor as a verdict on Odrzywołek’s paper.

It is primarily a statement about the current implementation:

* present search strategy,
* present search budget,
* present normalization strength,
* present evaluator limits,
* present absence of constant fitting or optimizer-guided refinement.

Those boundaries are exactly what I wanted to expose.

## Why I Keep Working On It

There are many interesting ideas that remain interesting only at a distance.

EML has not felt like one of them.

The more I work on it, the more directions it seems to open:

* symbolic regression over a uniform grammar,
* compiler-style rewriting and canonicalization,
* multiple evaluator backends,
* proof-oriented export,
* empirical study of representational search spaces,
* comparisons against heterogeneous operator vocabularies.

Some projects are useful.

Some projects are fun.

The dangerous ones are both.

This repository has become distracting precisely because it keeps suggesting new experiments.

## What Would Count As Real Progress

The standard for success should remain high.

Meaningful progress, at least in my view, will come from repeated evidence that the representation provides practical leverage under controlled conditions. That would include developments such as:

* broader reproducible recovery suites,
* honest comparison against other SR representations,
* improved normalization reducing search waste,
* fitted constants and hybrid search methods,
* stronger high-precision validation,
* formal export into proof systems,
* evidence that the EML representation provides measurable advantages rather than aesthetic ones.

The bar is appropriately high, and EML does not yet meet it.

*Yet.*

Just as importantly, I do not currently see evidence that rules it out either. There is still substantial work to be done before a decisive answer can be reached in either direction.

## Closing Thought

The strongest claim I am comfortable making today is a narrow one.

Andrzej Odrzywołek’s paper presents an idea serious enough to test rather than merely admire.

A minimal one-operator language, paired with concept expansion and reproducible experiments, is already sufficient to ask meaningful questions about symbolic regression. Whether it becomes a practically strong route is still unresolved.

That uncertainty is not a weakness.

It is the reason the project exists.

And for the moment, it remains interesting enough to keep distracting me from other work.

I will keep you apprised.

{% include math-jax-script.html %}
