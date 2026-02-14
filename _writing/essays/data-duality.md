---
layout: article
type: essay

heading: Data Duality
published: 2026-01-29T16:05:00+02:00
author: Tedla Brandsema
intro: Skill-forming and fact-forming data drive different kinds of model progress and are often mistaken for one another.
dossier: economics-of-the-llm-industry
---

<h1>{{ page.heading }}</h1>
<h2><em>Why Newer Models Are Not Always Smarter</em></h2>

{% include published.html %}

<div class="dossier">
    This article is part of a Dossier on <a href="/writing/dossiers/economics-of-the-llm-industry.html">The Economics of the LLM Industry</a>.

    This dossier examines the economic and structural forces shaping the large-language-model sector in particular, not artificial intelligence as a whole.
</div>

In contemporary machine learning, data is treated as the primary driver of improvement. Larger datasets are assumed to produce better models, and newer datasets are assumed to produce more capable ones. The prevailing intuition is simple: more data yields more intelligence.

But that intuition rests on a hidden assumption.

It assumes that all data contributes in the same way.

In practice, training data operates along two distinct dimensions. Some data is *skill-forming*. It shapes how a system reasons, generalizes, and composes responses. Exposure to diverse structures, patterns, and problem types strengthens abstraction and inference. This kind of data expands what the system can do. Its effects accumulate slowly, are costly to obtain, and tend to persist once integrated.

Other data is *fact-forming*. It updates what the system knows about the world. Recent events, evolving terminology, and newly available information increase temporal relevance—the model’s alignment with the present state of reality. This kind of data refreshes situational awareness rather than structural ability. It can be incorporated quickly, but it also ages quickly. What is current today becomes outdated tomorrow.

Skill-forming data and fact-forming data obey different scaling laws. Skill formation is gradual and compounding. Fact formation is immediate and perishable. One builds durable capability. The other maintains temporal relevance.

These differences are not merely conceptual. They imply distinct mathematical behaviors.

Skill-forming data appears to follow a pattern of diminishing returns. Early exposure to large and diverse corpora produces substantial gains in abstraction and generalization. Later additions tend to refine rather than transform. Improvements become incremental rather than structural. In simplified terms, capability growth resembles a logarithmic curve: large early gains followed by progressively smaller marginal improvements.

Fact-forming data behaves differently. Knowledge does not saturate because reality does not stop changing. New information continuously enters the system: events occur, terminology evolves, institutions shift, discoveries are made. The value of fact-forming data therefore scales not with total size but with recency. Its contribution is tied to temporal alignment rather than cumulative depth.

This asymmetry has direct competitive consequences. Structural capability may approach perceptual limits as returns diminish, while temporal relevance remains perpetually renewable. One axis bends toward saturation. The other resets continuously.

This divergence defines data duality.

Data duality changes how model updates must be interpreted.

When a new system is released, it may reflect an increase in skill-forming data, an increase in fact-forming data, or both. Yet external observers rarely distinguish between these contributions. Improvements in temporal relevance are often perceived as improvements in intelligence. A model that answers more recent questions correctly may appear “smarter,” even if its underlying reasoning capacity has not materially changed.

This creates a persistent misreading in competitive markets. Capability growth and knowledge refresh are conflated, even though they arise from different inputs and follow different trajectories. Skill-forming improvements tend to be slow, structural, and compounding. Fact-forming improvements tend to be rapid, visible, and perishable. The latter often generates more immediate recognition.

The interaction with the perception threshold is direct. Once structural capability improvements approach perceptual limits, further skill-forming gains may become difficult to detect. Fact-forming updates, however, remain visible because they affect concrete answers and current events. As a result, market attention can shift toward recency rather than depth.

Competition then fragments along two axes. One race concerns durable capability: how well a system reasons and generalizes. The other concerns temporal relevance: how well it reflects the present state of knowledge. These races are not identical, and leadership in one does not guarantee leadership in the other.

Understanding this distinction clarifies why model releases can appear dramatic while underlying capability remains stable, and why systems that feel up to date are not necessarily more advanced.

A model’s intelligence and its recency are not the same variable. When they are treated as one, both progress and competition become easy to misunderstand.
