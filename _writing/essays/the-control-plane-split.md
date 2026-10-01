---
layout: article
type: essay
date: 2026-02-21T01:38:00+01:00
author: Tedla Brandsema
title: "The Control Plane Split"
intro: "Large language models are splitting into two economic roles: attention capture and intent execution."
dossier: /writing/dossiers/the-structural-forces-shaping-the-llm-industry.html
hero: /static/images/hero/generated/the-control-plane-split
hero_alt: "A visual split between attention systems and intent execution systems."
hero_caption: "Attention systems extend interaction. Intent compilers compress it."
hero_ai: true
---

<h1>{{ page.title }}</h1>
<h2><em>Attention Systems and Intent Compilers</em></h2>

{% include published.html %}

{% include hero.html %}

{% include ai-disclosure.html %}

{% include dossier-ref.html %}

Bigger models, faster inference, and better answers describe only part of the progress in large language models. One class of system captures attention and keeps the user present. Another executes intent and tries to make the user disappear from the process as quickly as the task allows.

Those roles can start from the same model family. They do not share the same economics.

## From Interface to Control Plane

Traditional computing puts the interface between the person and the machine. A keyboard carries input. A monitor returns output. The interface does not interpret intent; it passes signals along.

An LLM agent changes that arrangement.

On the human side, it can clarify ambiguous instructions, ask for missing constraints, and confirm actions that cannot be easily undone. It shapes those commands into something executable.

On the system side, one instruction can move through tools and services across a workflow. The user does not assemble the execution path by hand. The model does that work.

It acts as a compiler for intent.

Instead of:

Human -> Interface -> Application -> API

The sequence becomes:

Human -> LLM -> Tool Graph -> Execution

The visible interface gets thinner. The model becomes the control plane.

## The Compiler Threshold

Early programmers distrusted compilers and inspected assembly directly. That habit faded as compilers became reliable enough to trust and saved enough work to justify the abstraction.

LLM-mediated execution is approaching a similar threshold.

When models are erratic, users want visible steps and manual control. If reliability and audit trails improve far enough, direct interface management starts to look like ceremony. The trust threshold is the point where abstraction stops feeling risky and starts feeling wasteful to avoid.

In enterprise settings, operational dependability matters more than raw intelligence. An intent compiler that is faster, observable, and reliable enough compresses interaction time.

## The Attention Economy

At the same time, LLMs are being folded into systems built around engagement.

TikTok and YouTube are direct cases: the product improves when the user stays. Google, ChatGPT, and Claude are more complicated, but they still live inside an attention market. Long sessions, frequent returns, and the feeling that the system is worth lingering with all have value.

The system benefits from sustained interaction. Open-ended dialogue increases token use, strengthens retention, and supports subscription value. The incentive is to keep the human in the loop.

## Opposing Optimization Targets

The two trajectories optimize for opposite outcomes.

An attention system wants longer sessions, broader exploration, and more conversation. An intent system wants short execution loops, fewer clarification cycles, deterministic tool routing, and less time spent talking to the machine.

The economic pressure is sharper because inference cost remains material. Attention-heavy systems burn tokens continuously. Intent compilers, once stable, reduce token use by narrowing the task and delegating execution to tools.

As model quality differences fall below practical perception, deployment flexibility becomes more important. Narrow, tool-bound models that can run locally become viable. When local execution reaches parity inside a defined workflow, centralized control weakens.

## Transitional Convergence

For now, both trajectories are served by the same frontier models. The same companies sell conversational assistants, coding agents, and tool-using APIs. This is typical early convergence: production, infrastructure, and interface layers remain vertically integrated because the category is still forming.

Infrastructure built for one cost regime becomes a constraint when efficiency improves. If smaller models reach workflow reliability inside bounded domains, the compiler layer diffuses. Once it diffuses, it behaves more like infrastructure than product.

Infrastructure is difficult to monopolize once it can be embedded.

## The Control Plane Split

The two layers are likely to separate.

The attention layer can remain centralized. It rewards scale economics, capital intensity, and continual frontier training.

The intent compiler layer points in another direction: inside enterprises, operating systems, workflow engines, and local toolchains. Its value comes from integration, reliability, and autonomy more than breadth of knowledge.

## The Reallocation of the Human Hour

Large platform shifts reallocate time. Search changed discovery. Social platforms changed consumption. Cloud infrastructure changed deployment.

LLM-mediated control changes execution.

Attention systems monetize human time by extending interaction. Intent compilers create value by compressing it.

As the split matures, these systems will stop looking like variants of one product category. They will occupy different positions in the value chain.
