---
layout: article
type: essay
date: 2026-01-29T16:05:00+02:00
author: Tedla Brandsema
title: "Data Duality"
intro: "Skill-forming and fact-forming data produce different kinds of model progress, but release cycles often blur them together."
dossier: /writing/dossiers/the-structural-forces-shaping-the-llm-industry.html
hero: /static/images/hero/generated/data-duality
hero_alt: "Two different streams of data flowing into a central model core."
hero_caption: "Skill-forming data and fact-forming data improve models in different ways."
hero_ai: true
---

<h1>{{ page.title }}</h1>
<h2><em>Why Newer Models Are Not Always Smarter</em></h2>

{% include published.html %}

{% include hero.html %}

{% include ai-disclosure.html %}

{% include dossier-ref.html %}

Model progress is usually narrated as a data story. Larger datasets are expected to produce better systems. Newer datasets are expected to produce more capable ones. The hidden premise is that data is one substance, so any addition improves the model in roughly the same way.

That premise is too clean.

Training data does at least two different jobs. Some data is *skill-forming*. It changes how a system reasons, generalizes, and composes answers. Exposure to different structures, problem shapes, languages, domains, and failure cases can improve abstraction and inference. This kind of data expands what the system can do. Its effects are slow and expensive. Once absorbed, they tend to stick.

Other data is *fact-forming*. It changes what the system knows about the world. Recent events, new names, changed institutions, fresh documentation, new laws, product releases, scientific papers, and shifting terminology all make a model more current. This data improves temporal fit, not necessarily structural ability. It can be added quickly. It also decays quickly. What is fresh today becomes stale without any deeper failure in the model.

## Two Forms of Model Growth

Skill-forming data and fact-forming data obey different curves. Skill formation is gradual and compounding. Fact formation is immediate and perishable.

The difference matters because the two inputs age differently. Skill-forming data appears to face diminishing returns. Early exposure to broad, varied material can produce large gains in abstraction and generalization. Later additions usually refine the model rather than remake it. In simplified terms, capability growth starts to resemble a logarithmic curve: large early gains followed by smaller marginal gains.

Fact-forming data does not behave that way. Knowledge does not saturate, because reality keeps moving. Events happen. Terminology changes. Institutions shift. New discoveries appear. The value of fact-forming data is therefore tied less to total volume than to recency. Its contribution is temporal alignment, not cumulative depth.

## Divergent Scaling Behaviors

This asymmetry has direct competitive consequences. Structural capability can approach perceptual limits as returns diminish. Temporal relevance keeps resetting.

This divergence defines **data duality**.

It also changes how model releases should be read.

When a new system ships, the improvement may come from skill-forming data, fact-forming data, or some mixture of the two. Outside observers rarely separate those inputs. A model that answers newer questions correctly may look smarter, even if its underlying reasoning capacity has not changed much. The visible gain is real. The interpretation may be wrong.

## When Recency Is Mistaken for Intelligence

That misreading becomes more likely as models get better. Once structural gains approach the perception threshold, additional skill-forming progress may be hard to see from normal use. Fact-forming updates remain visible because they affect concrete answers: who won, what shipped, what changed, which API is current, which law passed, which paper displaced the older result. Recency gives users an easy signal.

Market attention then drifts toward the signal it can see. Capability growth and knowledge refresh get folded into one story, even though they come from different inputs and follow different trajectories. Skill-forming gains tend to be slow and structural; when they stick, they last. Fact-forming gains are easier to see and easier to lose.

Competition splits along two axes. One race is about durable capability: how well a system reasons and generalizes. The other is about temporal relevance: how well it reflects the present state of knowledge. Leadership in one does not guarantee leadership in the other.

A model's intelligence and its recency are not the same variable.