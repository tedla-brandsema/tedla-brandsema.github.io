---
layout: article
type: article
date: 2026-05-09T08:58:00+02:00
author: Tedla Brandsema
title: "The Cybersecurity Fire Hose"
intro: "Vulnerability discovery is becoming a function of targeted AI compute, turning software security into a fire hose problem of spend, access, and remediation capacity."
hero: /static/images/hero/generated/the-cybersecurity-fire-hose
hero_alt: "A massive fire hose blasting vulnerability reports toward a defensive wall staffed by security responders."
hero_caption: "The bottleneck shifts from finding vulnerabilities to absorbing, validating, and remediating them."
hero_ai: true
---

<h1>{{ page.title }}</h1>
<h2><em>When vulnerability discovery becomes a function of targeted AI compute</em></h2>

{% include published.html %}

{% include hero.html %}

{% include ai-disclosure.html %}

Vulnerability discovery has long been limited by scarce human attention. A serious vulnerability researcher needed time, expertise, intuition, tooling, and a reason to inspect a particular target. Many systems were not secure because every defect had been removed. They were secure because only a small number of capable people could afford to look closely enough.

Cyber-capable AI weakens that constraint. Point it at a codebase and it can search for vulnerabilities. The objective can be defensive or offensive. The same process can harden software or help exploit it. A model can inspect source, reason through control flow, identify dangerous patterns, build test cases, and, in stronger systems, turn findings into working exploits.

This changes what security means. A system is no longer protected mainly by the scarcity of elite human attention. It is protected, or exposed, by the balance of model attention aimed for and against it. Security becomes a function of how much cyber-capable AI compute is allocated to a target, how capable that compute is, and how quickly the resulting findings can be absorbed.

Software security is becoming a token-spend arms race.

## The New Security Equation

From first principles, software security in this regime is a competition between two uses of the same capability. One side points AI compute at software to harden it. The other points AI compute at software to break it.

This is the shift Thomas Ptacek described in "Vulnerability research is cooked": scarce expert attention is losing its place as the binding constraint in vulnerability discovery. If the old constraint was finding enough capable people with enough time to inspect enough code, the new constraint is how much capable model attention can be aimed at the target. ([Sockpuppet][1])

A request to "find vulnerabilities in this code" is structurally ambiguous. It can be defensive research, exploit preparation, internal audit, bug bounty work, or preparation for intrusion. OpenAI has acknowledged this ambiguity in its trusted-access cyber work, noting that vulnerability-finding tasks can be legitimate defensive work or misuse depending on context. OpenAI has also described GPT-5.5 and GPT-5.5-Cyber as part of a trusted-access system for cybersecurity capability rather than a uniformly available product surface. ([OpenAI][2])

Researchers, audit firms, and red teams can now scale their search through targeted model attention.

Both the amount of inference allocated to the target and the model’s capability shape the results. A small amount of weak model attention may produce noise. A large amount of frontier cyber-capable model attention may produce validated, reproducible, high-severity findings. The practical security of a codebase is increasingly shaped by the volume and quality of that attention.

Money has always mattered in security. Organizations with larger budgets could hire better researchers, pay for audits, build fuzzing infrastructure, fund red teams, and maintain faster patch pipelines. What is new is the directness of the conversion. Before, money bought human capacity indirectly. Now it buys automated search pressure more directly.

## The Fire Hose Problem

In the short term, defenders may struggle to keep up.

The current asymmetry is that discovery scales faster than remediation. AI-assisted vulnerability discovery can produce findings at machine speed. Mitigation still runs through human and institutional bottlenecks: triage, reproduction, severity assessment, patch design, code review, regression testing, release management, disclosure, deployment, and monitoring.

Attackers need one useful vulnerability. Defenders have to process all of them.

Mozilla's recent work with Anthropic shows the scale shift. In March, Mozilla described an Anthropic-assisted effort that produced 14 high-severity bugs, 22 CVEs, and 90 additional bugs in Firefox. ([Mozilla Blog][3]) A few weeks later, Mozilla reported that Firefox 150 included fixes for 271 vulnerabilities identified during an initial evaluation with Claude Mythos Preview. Mozilla later clarified that it fixed 423 security bugs in April releases, with the 271 Mythos-attributed bugs forming only part of a broader AI-assisted and traditional security pipeline. ([Mozilla Blog][4])

An organization has to absorb that rate of discovery: validate the findings, design patches, and deploy them.

## Zero-Days Are Not Numbered

Mozilla titled one of its pieces "The zero-days are numbered." The optimism is understandable. If defenders can cheaply discover the same classes of vulnerabilities that elite attackers once found through scarce human effort, then the attacker's advantage should erode. Mozilla argues that the gap between machine-discoverable and human-discoverable bugs is closing, and that this may let defenders find defects before attackers do.

That treats software vulnerability as if it were mostly a finite stock of latent defects waiting to be drained. Once that stock is found and patched, the argument implies, the system moves toward a much safer equilibrium.

Software keeps changing. New vulnerabilities are created by new features, dependencies, integrations, generated code, deployment patterns, permissions, protocols, agent workflows, and assumptions about how systems will be used.

Even that understates the problem. A piece of software does not operate in isolation. Even if its own codebase were frozen, it would still run on hardware, operating systems, drivers, runtimes, browsers, libraries, package managers, build systems, deployment platforms, identity providers, observability tools, and third-party services that keep changing outside the producer's direct control.

The attack surface is not bounded by the repository.

Third-party dependencies are especially important. They are part of the effective software system, but they sit outside the producer's direct span of control. A project may harden its own code while remaining exposed through an upstream library, a transitive dependency, a compiler bug, a container image, a kernel issue, or a cloud platform behavior it does not control.

Software security requires managing a changing system embedded inside other changing systems. Draining the existing defect inventory cannot finish that job.

Incumbents that interpret AI-assisted vulnerability discovery as the beginning of the end of zero-days may underinvest exactly when the scope of the problem is expanding. Organizations that miss the shift will pay for it.

In heavily hardened software, AI-assisted review may reduce the inventory of existing human-discoverable defects. That would be a real improvement. But it does not imply the end of zero-days. It implies a repricing of vulnerability discovery. The cost of finding certain classes of bugs rises, the volume of findings falls, and the race shifts toward continuous hardening.

Mozilla itself acknowledges a caveat: if AI-generated development causes codebases to exceed human comprehension, bug complexity may scale alongside discovery capability. If AI accelerates both software production and vulnerability discovery, then the long-term equilibrium depends on whether defensive automation, review, and deployment can keep pace with churn.

## The Cumulative Attacker

Attackers can aggregate their efforts in ways a single defender cannot.

A software producer is usually a singular entity. It has one security team, one backlog, one release process, one set of priorities, and one budget. Even when the organization is large, remediation is internally coordinated.

Offense is plural. Many independent actors can point compute at the same target. Their efforts do not need to be coordinated to accumulate pressure. One criminal group, one state-linked team, one bug bounty hunter, one curious researcher, one competitor, and one opportunistic attacker can all inspect the same codebase or exposed surface. Their compute is separate, but the pressure on the target is cumulative.

The defender faces the aggregate.

A startup or small open-source project may not be able to match the total amount of hostile or opportunistic model attention directed at it once it becomes interesting. Its security posture depends on the ratio between its defensive capacity and the cumulative offensive search pressure it attracts.

A large company can buy model access, hire security engineers, maintain internal red teams, run continuous scanning, pay for external audits, and absorb high-volume disclosure. A small team cannot replicate that machinery. It may ship high-quality software and still be structurally exposed if enough external compute is aimed at it.

The protection of obscurity weakens when inspection becomes cheap.

## Security Budget Reallocation

If vulnerability discovery becomes cheaper, faster, and more scalable, software producers cannot treat security as a fixed overhead category. The amount of revenue allocated to software hardening will have to rise. That includes headcount, compute, tooling, triage systems, patch validation, dependency monitoring, red-team automation, and release infrastructure.

The old security budget was sized for a world in which high-quality vulnerability discovery was limited by scarce human attention. That world is disappearing. A producer that keeps the same defensive posture while external model attention increases against its software falls behind.

The shift will not be evenly distributed. Large firms will absorb it through dedicated security teams, privileged model access, internal red-team infrastructure, continuous AI-assisted auditing, and more aggressive dependency management. Smaller firms will feel it as margin pressure. Security will consume a larger share of engineering capacity and a larger percentage of revenue, even when the product itself has not changed.

Hardening must scale with vulnerability discovery. The alternative is an expanding gap between the rate at which vulnerabilities become visible and the rate at which they can be fixed.

Security spend becomes less discretionary. It becomes a structural cost of operating software in a world where targeted AI compute can be aimed at any sufficiently valuable codebase.

## The Access Gate

Token spend is only one side of the arms race. Permission is the other.

Providers increasingly restrict the most capable cyber models through access programs, trust tiers, evaluations, and selection processes. Anthropic launched Project Glasswing around Claude Mythos Preview, explicitly framing the model as unusually capable at computer security tasks and describing controlled efforts to use it to secure critical software. Anthropic also reported that Mythos Preview was dramatically more capable than Opus 4.6 at turning vulnerabilities into working exploits in their Firefox benchmark. ([Red Anthropic][5])

OpenAI is moving in the same structural direction. Its trusted-access cyber program describes cybersecurity capability as something to be scaled across vetted defenders. ([OpenAI][2]) Public reporting on GPT-5.5-Cyber similarly describes access expanding to vetted cyber defenders, especially those protecting critical infrastructure. ([Axios][6])

Defenders need both the budget for enough cyber-capable inference and permission to use the most capable models. The selection committee becomes part of the security stack. A firm with enough money but insufficient trust may not receive access. A small open-source maintainer may be defending widely deployed software but still lack the institutional standing required to use the strongest defensive tools. A state actor may not care about token cost at all, but may be constrained by whether it has access to frontier models, domestic equivalents, stolen access, or open-weight substitutes.

## The Mythos Boundary

Selective access to a cyber-capable model creates a capability perimeter. Those inside can apply advanced model attention to their codebases and infrastructure. Those outside must rely on weaker models, commercial substitutes, community access, or traditional methods.

That perimeter may be justified. These models are dual-use. If a system can find and exploit vulnerabilities at a high level, unrestricted access would create obvious risks.

But the security consequence remains. Permissioned access means defensive advantage is unevenly distributed.

A large browser vendor with early access to Claude Mythos Preview can direct frontier model attention at one of the most hardened codebases in the world and patch hundreds of vulnerabilities. A small project maintaining critical but underfunded infrastructure may not get that same access. Yet attackers may still direct whatever model capability they can obtain at the project.

The small project has fewer defensive options even if its software is widely used.

## Open Source as Defensive Aggregation

For smaller players, open source may become more important.

The naive view is that open source increases exposure because attackers can inspect the code. In the AI-security regime, that concern does not disappear, but it is incomplete. Attackers can often inspect enough anyway: through published packages, binaries, APIs, dependency graphs, behavior, leaked code, or black-box probing. If a target is valuable, model attention will find a path toward it.

The question becomes who can aggregate defensive attention.

Closed source concentrates defense inside the producer. That can work for large firms with large security budgets and privileged model access. It is harder for small teams. If only the producer can inspect and harden the code, then the producer must match the cumulative external search pressure alone.

Open source allows defense to become cumulative.

Maintainers, users, downstream vendors, researchers, foundations, security teams, and interested companies can all point defensive attention at the same shared artifact. That does not eliminate maintainer overload. In fact, it may worsen it unless triage and patch workflows also improve. But structurally, open source gives smaller projects a path to pooled defense.

If offense becomes cumulative, defense has to become cumulative too.

That may be the only viable path for software whose importance exceeds the security budget of its producer.

## The Plateau

The token-spend arms race will not produce infinite vulnerabilities forever.

The relationship between spend and findings will likely have phases. In the first phase, returns are high. AI-assisted systems discover latent vulnerabilities that were previously too expensive, too obscure, or too time-consuming to find. This is the fire hose moment.

In the second phase, the obvious and semi-obvious defects are removed from heavily examined software. Returns diminish. More compute is required to find fewer useful issues. The codebase becomes harder.

In the third phase, vulnerability discovery becomes tied more closely to churn. New code, dependencies, refactors, generated components, and integration surfaces create fresh search space. The race does not end, but the frontier moves from backlog discovery to continuous hardening.

Established software that receives enough defensive model attention may become substantially more secure. That requires spend, access, triage capacity, and organizational discipline. Without those, the fire hose reveals more than the defender can fix.

## The State Actor Exception

For corporations and individuals, the binding constraint is often currency. More money buys more tokens, more audits, more tooling, and more security staff.

For states, the constraint is different. A state actor may not be limited by token spend in the ordinary sense. It may be limited by access to frontier cyber-capable models, domestic capability, procurement channels, stolen credentials, or the ability to develop equivalent systems. At that level, cyber-capable model access becomes strategic infrastructure.

If advanced cyber models materially improve both exploitation and hardening, control over those models becomes part of national security policy. Trusted access programs, export controls, model evaluations, critical-infrastructure partnerships, and government stress tests help determine that balance.

Institutions compete with different levels of access to automated vulnerability discovery.

A security assessment now has to account for how much capable model attention defenders can apply, how much attackers can direct against the software, and how quickly the organization can turn findings into deployed patches.

[1]: https://sockpuppet.org/blog/2026/03/30/vulnerability-research-is-cooked/ "Vulnerability research is cooked"
[2]: https://openai.com/index/gpt-5-5-with-trusted-access-for-cyber/ "Scaling Trusted Access for Cyber with GPT-5.5 and GPT-5.5-Cyber | OpenAI"
[3]: https://blog.mozilla.org/en/firefox/hardening-firefox-anthropic-red-team/ "Hardening Firefox with Anthropic's Red Team"
[4]: https://blog.mozilla.org/en/firefox/ai-security-zero-day-vulnerabilities/ "The zero-days are numbered"
[5]: https://red.anthropic.com/2026/mythos-preview/ "Claude Mythos Preview"
[6]: https://www.axios.com/2026/05/07/openai-gpt-55-cybersecurity-model "OpenAI makes its Mythos rival more widely available to cyber defenders"
