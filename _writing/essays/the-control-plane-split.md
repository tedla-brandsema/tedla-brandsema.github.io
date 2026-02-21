---
layout: article
type: essay
published: 2026-02-21T01:38:00+01:00
author: Tedla Brandsema
heading: The Control Plane Split
intro: "Large language models are evolving along two economic trajectories: attention capture and intent execution."
dossier_url: /writing/dossiers/economics-of-the-llm-industry.html
dossier_headding: The Economics of the LLM Industry
dossier_order: 6
---

<h1>{{ page.heading }}</h1>
<h2><em>Attention Markets and Intent Compilers</em></h2>

{% include published.html %}

{% include dossier-ref.html %}

Large language models are often discussed as if they were progressing along a single axis: larger, faster, more intelligent. Yet as their deployment expands, a structural divergence is becoming visible.

The divergence is not about scale.

It is about function.

LLMs are beginning to evolve in two different economic directions:

1. As systems that capture and retain human attention.  
2. As systems that execute human intent.

These roles are not identical. They do not optimize for the same variables. Over time, they are likely to separate.

## From Interface to Control Plane

Traditional computing relies on unidirectional interfaces. A keyboard transmits signals from human to machine. A monitor transmits output from machine to human. The interface itself does not interpret intent; it merely conveys it.

An LLM operating as an agent alters that structure.

On the human side, it is bidirectional. It can clarify ambiguous instructions, ask follow-up questions, negotiate constraints, and confirm irreversible actions. It does not merely receive commands; it refines them.

On the system side, it is multidirectional. A single instruction can trigger multiple tools, services, and workflows. The user does not manually orchestrate the execution graph. The model does.

In this role, the LLM becomes something closer to a compiler for intent.

Instead of:

Human → Interface → Application → API

the sequence becomes:

Human → LLM → Tool Graph → Execution

The interface thins. The model becomes a control plane.

This transformation carries economic consequences.

## The Compiler Threshold

Early programmers distrusted compilers and inspected assembly output directly. Over time, that practice became rare—not because abstraction eliminated error, but because it reduced friction while maintaining reliability.

A similar threshold is emerging with LLM-mediated execution.

As long as models remain unpredictable, users prefer visible steps and manual control. But if reliability, logging, and auditability improve sufficiently, direct interface management becomes unnecessary ceremony.

Once trust crosses a threshold, abstraction accelerates adoption.

In enterprise contexts especially, the decisive variable is not raw intelligence but operational dependability. When intent compilers become measurably faster and sufficiently reliable, they compress interaction time.

That compression changes the basis of competition.

## The Attention Economy

At the same time, LLMs increasingly power systems optimized for engagement.

Platforms such as TikTok and YouTube are explicitly designed to maximize time spent. Even productive systems such as Google, ChatGPT, and Claude operate within an attention market in which session length, interaction frequency, and cognitive immersion carry economic weight.

In this configuration, the LLM is not a control plane.

It is a gravity well.

The system benefits from sustained engagement. Open-ended dialogue increases token usage, strengthens retention, and reinforces subscription value.

The incentive is to keep the human in the loop.

## Opposing Optimization Targets

These two trajectories optimize for different outcomes.

An attention-optimized system benefits from:

- Extended sessions  
- Broad, exploratory interaction  
- High token throughput  

An intent-optimized system benefits from:

- Short execution loops  
- Minimal clarification cycles  
- Deterministic tool routing  
- Reduced interaction time  

One maximizes human presence.  
The other minimizes it.

This distinction matters because inference cost remains structurally significant. Attention-heavy systems burn tokens continuously. Intent compilers, once stable, reduce token consumption by narrowing scope and delegating execution to tools.

As performance differences fall below practical perception, deployment flexibility becomes decisive. Narrow, tool-bound models that can operate locally become economically viable. When local execution achieves parity within a defined workflow, centralized control weakens.

The result is a tension between engagement-driven scale and execution-driven efficiency.

## Transitional Convergence

At present, both trajectories are served by the same frontier models. The same providers offer conversational assistants, coding agents, and tool-using APIs. This convergence resembles early stages in other technological domains, when production, infrastructure, and interface layers remained vertically integrated.

Historically, such convergence rarely persists.

Infrastructure built for one cost regime can become constraining when efficiency improves rapidly. If smaller models achieve workflow reliability within bounded domains, the compiler layer diffuses. Once diffused, it behaves more like infrastructure than like product.

Infrastructure resists monopolization.

## The Control Plane Split

The likely outcome is not the disappearance of either trajectory, but their separation.

The attention layer may remain centralized, driven by scale economics and continual frontier training. It rewards concentration and capital intensity.

The intent compiler layer, by contrast, trends toward embedding: inside enterprises, inside operating systems, inside workflow engines. Its economic value derives from integration, reliability, and autonomy rather than from breadth of knowledge.

Both begin from the same technological base.

They do not share the same incentive structure.

## The Reallocation of the Human Hour

Every technological shift reallocates time.

Search reorganized discovery.  
Social platforms reorganized consumption.  
Cloud infrastructure reorganized deployment.

LLM-mediated control reorganizes execution.

The core economic variable is not model size.

It is human attention time.

Attention systems monetize it by extending interaction.  
Intent compilers create value by compressing it.

As these trajectories mature, they will no longer appear as variations of the same product category. They will represent different positions in the value chain.

The question for the industry is no longer who trains the largest model.

It is which systems capture human hours, and which systems eliminate them.