---
layout: article
type: article
date: 2026-05-09T08:58:00+02:00
author: Tedla Brandsema
title: The Cybersecurity Fire Hose
intro: Vulnerability discovery is becoming a function of targeted AI compute, turning software security into a fire hose problem of spend, access, and remediation capacity.
hero: /static/images/hero/generated/the-cybersecurity-fire-hose
hero_alt: A massive fire hose blasting vulnerability reports toward a defensive wall staffed by security responders.
hero_caption: The bottleneck shifts from finding vulnerabilities to absorbing, validating, and remediating them.
hero_ai: true
---

<h1>{{ page.title }}</h1>
<h2><em>When vulnerability discovery becomes a function of targeted AI compute</em></h2>

{% include published.html %}

{% include hero.html %}

{% include ai-disclosure.html %}

Software security is entering a new regime.

The old regime was constrained by scarce human attention. A serious vulnerability researcher needed time, expertise, intuition, tooling, and a reason to inspect a particular target. Many systems were not secure because every defect had been eliminated. They were secure because only a limited number of capable people could afford to look closely enough.

That constraint is weakening.

The new primitive is simple: point cyber-capable AI compute at a codebase. The objective can be defensive or offensive. The same process can be used to harden software or to exploit it. A model can inspect source, reason through control flow, identify dangerous patterns, construct test cases, and in increasingly capable systems, turn findings into working exploits.

This changes the meaning of software security. A system is no longer protected mainly by the scarcity of elite human attention. It is protected, or exposed, by the balance of model attention directed for and against it. Security becomes a function of how much cyber-capable AI compute is allocated to a target, how capable that compute is, and how quickly the resulting findings can be absorbed.

Software security is becoming a token-spend arms race.

## The New Security Equation

From first principles, software security in this regime becomes a competition between two uses of the same capability. One side points AI compute at software to harden it. The other points AI compute at software to break it.

The distinction is not technical. It is intentional.

This is the shift Thomas Ptacek described in “Vulnerability research is cooked”: the collapse of scarce expert attention as the limiting factor in vulnerability discovery. If the old constraint was finding enough capable people with enough time to inspect enough code, the new constraint is increasingly how much capable model attention can be aimed at the target. ([Sockpuppet][1])

A request to “find vulnerabilities in this code” is structurally ambiguous. It can be defensive research, exploit preparation, internal audit, bug bounty work, or prelude to intrusion. OpenAI has acknowledged this ambiguity directly in its trusted-access cyber work, noting that vulnerability-finding tasks can be either legitimate defensive work or misuse depending on context. OpenAI has also described GPT-5.5 and GPT-5.5-Cyber as part of a trusted-access system for cybersecurity capability rather than a uniformly available product surface. ([OpenAI][2])

The relevant unit of security competition is therefore no longer just the researcher, the audit firm, or the internal red team. It is targeted model attention.

The quantity side is straightforward: how much inference is allocated to the target? The quality side is equally important: how capable is the model being applied? A small amount of weak model attention may produce noise. A large amount of frontier cyber-capable model attention may produce validated, reproducible, high-severity findings. The practical security of a codebase is increasingly shaped by the volume and quality of that attention.

Money has always mattered in security. Organizations with larger budgets could hire better researchers, pay for audits, build fuzzing infrastructure, fund red teams, and maintain faster patch pipelines. What is new is the directness of the conversion. Before, money bought human capacity indirectly. Now it buys automated search pressure more directly.

Tokens become security pressure.

## The Fire Hose Problem

This does not mean defense automatically wins. In the short term, it may mean the opposite.

The current asymmetry is that discovery scales faster than remediation. AI-assisted vulnerability discovery can produce findings at machine speed. Mitigation still flows through human and institutional bottlenecks: triage, reproduction, severity assessment, patch design, code review, regression testing, release management, disclosure, deployment, and monitoring.

Attackers need one useful vulnerability. Defenders must process all of them.

Mozilla’s recent work with Anthropic illustrates the scale shift. In March, Mozilla described an Anthropic-assisted effort that produced 14 high-severity bugs, 22 CVEs, and 90 additional bugs in Firefox. ([Mozilla Blog][3]) A few weeks later, Mozilla reported that Firefox 150 included fixes for 271 vulnerabilities identified during an initial evaluation with Claude Mythos Preview. Mozilla later clarified that it fixed 423 security bugs in April releases, with the 271 Mythos-attributed bugs forming only part of a broader AI-assisted and traditional security pipeline. ([Mozilla Blog][4])

Those numbers are not merely impressive. They reveal the fire hose.

The limiting factor is no longer whether high-quality vulnerabilities can be found. The limiting factor becomes whether an organization can absorb the rate at which they become visible. This is not a bug-finding problem anymore. It is a throughput problem.

## Why “Zero-Days Are Numbered” Is the Wrong Conclusion

Mozilla titled one of its pieces “The zero-days are numbered.” The optimism is understandable. If defenders can cheaply discover the same classes of vulnerabilities that elite attackers once found through scarce human effort, then the attacker’s advantage should erode. Mozilla argues that the gap between machine-discoverable and human-discoverable bugs is closing, and that this may allow defenders to find defects before attackers do.

But the conclusion is too clean.

It treats software vulnerability as if it were mostly a finite stock of latent defects waiting to be drained. Once the stock is discovered and patched, the argument implies, the system moves toward a much safer equilibrium.

That framing misunderstands the domain.

Software is not a fixed object. It is a moving production system. New vulnerabilities are created by new features, new dependencies, new integrations, new generated code, new deployment patterns, new permissions, new protocols, new agent workflows, and new assumptions about how systems will be used.

Even that understates the problem. A piece of software does not operate in isolation. Even if its own codebase were frozen, it would still run on hardware, operating systems, drivers, runtimes, browsers, libraries, package managers, build systems, deployment platforms, identity providers, observability tools, and third-party services that continue to change outside the producer’s direct control.

The attack surface is not bounded by the repository.

Third-party dependencies are especially important here. They are part of the effective software system, but they sit outside the producer’s direct span of control. A project may harden its own code while remaining exposed through an upstream library, a transitive dependency, a compiler bug, a container image, a kernel issue, or a cloud platform behavior it does not control.

Declaring that bugs are finite is therefore not merely optimistic. It is a gross misunderstanding of the domain. Software security is not the exhaustion of a static defect inventory. It is the management of a changing system embedded inside other changing systems.

That misunderstanding is serious. Incumbents that interpret AI-assisted vulnerability discovery as the beginning of the end of zero-days may underinvest precisely when the scope of the security landscape is expanding. Organizations that fail to grasp this shift will do so to their own detriment.

The stock of old vulnerabilities can shrink. The frontier does not disappear.

In heavily hardened software, AI-assisted review may reduce the inventory of existing human-discoverable defects. That would be a real improvement. But it does not imply the end of zero-days. It implies a repricing of vulnerability discovery. The cost of finding certain classes of bugs rises, the volume of findings falls, and the race shifts toward continuous hardening.

Mozilla itself gestures at the caveat: if AI-generated development causes codebases to exceed human comprehension, bug complexity may scale alongside discovery capability. That point matters more than the optimistic headline. If AI accelerates both software production and vulnerability discovery, then the long-term equilibrium depends on whether defensive automation, review, and deployment can keep pace with churn.

The zero-days are not numbered.

The old discovery bottleneck is.

## The Cumulative Attacker

The deepest asymmetry is not that attackers have AI and defenders do not. The asymmetry is aggregation.

A software producer is usually a singular entity. It has one security team, one backlog, one release process, one set of priorities, and one budget. Even when the organization is large, remediation is internally coordinated.

Offense is plural. Many independent actors can point compute at the same target. Their efforts do not need to be coordinated to accumulate pressure. One criminal group, one state-linked team, one bug bounty hunter, one curious researcher, one competitor, and one opportunistic attacker can all inspect the same codebase or exposed surface. Their compute is separate, but the pressure on the target is cumulative.

The defender faces the aggregate.

This matters especially for smaller software producers. A startup or small open-source project may not be able to match the total amount of hostile or opportunistic model attention directed at it once it becomes interesting. Its security posture is no longer determined only by its own practices. It is determined by the ratio between its defensive capacity and the cumulative offensive search pressure it attracts.

That ratio can become brutal.

A large company can buy model access, hire security engineers, maintain internal red teams, run continuous scanning, pay for external audits, and absorb high-volume disclosure. A small team cannot replicate that machinery. It may ship high-quality software and still be structurally exposed if enough external compute is aimed at it.

The protection of obscurity weakens when inspection becomes cheap.

## The Security Budget Reallocation

This changes resource allocation.

If vulnerability discovery becomes cheaper, faster, and more scalable, then software producers cannot treat security as a fixed overhead category. The amount of revenue allocated to software hardening will have to rise. Not only in headcount, but in compute, tooling, triage systems, patch validation, dependency monitoring, red-team automation, and release infrastructure.

The old security budget was sized for a world in which high-quality vulnerability discovery was constrained by scarce human attention. That world is disappearing. A producer that maintains the same defensive posture while external model attention increases against its software is not standing still. It is falling behind.

The shift will not be evenly distributed. Large firms will absorb it through dedicated security teams, privileged model access, internal red-team infrastructure, continuous AI-assisted auditing, and more aggressive dependency management. Smaller firms will feel it as margin pressure. Security will consume a larger share of engineering capacity and a larger percentage of revenue, even when the product itself has not changed.

This is the economic consequence of the fire hose. Once vulnerability discovery scales, hardening must scale with it. The alternative is an expanding gap between the rate at which vulnerabilities become visible and the rate at which they can be fixed.

Security spend therefore becomes less discretionary. It becomes a structural cost of operating software in a world where targeted AI compute can be aimed at any sufficiently valuable codebase.

## The Access Gate

Token spend is only one side of the arms race. The other side is permission.

The most capable cyber models are not simply sitting behind an ordinary price page. They are increasingly governed through access programs, trust tiers, evaluations, and selection processes. Anthropic launched Project Glasswing around Claude Mythos Preview, explicitly framing the model as unusually capable at computer security tasks and describing controlled efforts to use it to secure critical software. Anthropic also reported that Mythos Preview was dramatically more capable than Opus 4.6 at turning vulnerabilities into working exploits in their Firefox benchmark. ([Red Anthropic][5])

OpenAI is moving in the same structural direction. Its trusted-access cyber program describes cybersecurity capability as something to be scaled across vetted defenders, not simply exposed uniformly to all users. ([OpenAI][2]) Public reporting on GPT-5.5-Cyber similarly describes access expanding to vetted cyber defenders, especially those protecting critical infrastructure. ([Axios][6])

This creates a two-gate system.

First, can you afford enough cyber-capable inference?

Second, are you allowed to use the model class that matters?

Security capability becomes not only capital-intensive, but permissioned. The selection committee becomes part of the security stack. A firm with sufficient money but insufficient trust may not receive access. A small open-source maintainer may be defending widely deployed software but still lack the institutional standing required to use the strongest defensive tools. A state actor may not care about token cost at all, but may be constrained by whether it has access to frontier models, domestic equivalents, stolen access, or open-weight substitutes.

The resource is not just compute.

It is admitted compute.

## The Mythos Boundary

This is why the Mythos pattern matters.

The release of a cyber-capable model under selective access does not merely introduce a new tool. It creates a capability perimeter. Some actors are inside the perimeter. Others are outside it. Those inside can apply advanced model attention to their codebases and infrastructure. Those outside must rely on weaker models, commercial substitutes, community access, or traditional methods.

That perimeter may be justified. These models are dual-use. If a system can find and exploit vulnerabilities at a high level, unrestricted access would create obvious risks.

But the security consequence remains. Permissioned access means defensive advantage is unevenly distributed.

The question is not whether AI helps defenders. It clearly can. The question is which defenders.

A large browser vendor with early access to Claude Mythos Preview can direct frontier model attention at one of the most hardened codebases in the world and patch hundreds of vulnerabilities. A small project maintaining critical but underfunded infrastructure may not get that same access. Yet attackers may still direct whatever model capability they can obtain at the project.

That is not a level playing field. It is a stratified security market.

## Open Source as Defensive Aggregation

This creates a counterintuitive implication.

For smaller players, open source may become more important, not less.

The naive view is that open source increases exposure because attackers can inspect the code. In the AI-security regime, that concern does not disappear, but it becomes incomplete. Attackers can often inspect enough anyway: through published packages, binaries, APIs, dependency graphs, behavior, leaked code, or black-box probing. If a target is valuable, model attention will find a path toward it.

The question becomes who can aggregate defensive attention.

Closed source concentrates defense inside the producer. That can work for large firms with large security budgets and privileged model access. It is harder for small teams. If only the producer can inspect and harden the code, then the producer must match the cumulative external search pressure alone.

Open source allows defense to become cumulative.

Maintainers, users, downstream vendors, researchers, foundations, security teams, and interested companies can all point defensive attention at the same shared artifact. That does not eliminate maintainer overload. In fact, it may worsen it unless triage and patch workflows also improve. But structurally, open source gives smaller projects a path to pooled defense.

If offense becomes cumulative, defense must become cumulative too.

That may be the only viable path for software whose importance exceeds the security budget of its producer.

## The Plateau

The token-spend arms race will not produce infinite vulnerabilities forever.

The relationship between spend and findings will likely have phases. In the first phase, returns are high. AI-assisted systems discover latent vulnerabilities that were previously too expensive, too obscure, or too time-consuming to find. This is the fire hose moment.

In the second phase, the obvious and semi-obvious defects are removed from heavily examined software. Returns diminish. More compute is required to find fewer useful issues. The codebase becomes harder.

In the third phase, vulnerability discovery becomes tied more closely to churn. New code, new dependencies, new refactors, new generated components, and new integration surfaces create fresh search space. The race does not end, but the frontier moves from backlog discovery to continuous hardening.

Established software that receives enough defensive model attention may become substantially more secure. That is the optimistic case, and it is real. But the transition is not free. It requires spend, access, triage capacity, and organizational discipline. Without those, the fire hose simply reveals more than the defender can fix.

## The State Actor Exception

For corporations and individuals, the binding constraint is often currency. More money buys more tokens, more audits, more tooling, and more security staff.

For states, the constraint is different. A state actor may not be limited by token spend in the ordinary sense. It may be limited by access to frontier cyber-capable models, domestic capability, procurement channels, stolen credentials, or the ability to develop equivalent systems. At that level, cyber-capable model access becomes strategic infrastructure.

This makes the access layer politically significant.

If advanced cyber models materially improve both exploitation and hardening, then control over those models becomes part of national security policy. Trusted access programs, export controls, model evaluations, critical-infrastructure partnerships, and government stress tests are not peripheral. They are part of the emerging cyber balance.

The arms race is not only between attackers and defenders. It is between institutions with different levels of access to automated vulnerability discovery.

## Conclusion

Software security has become a token-spend arms race, but tokens are only the visible unit. The deeper resource is targeted AI attention.

A codebase can now be subjected to continuous automated scrutiny by defenders, attackers, researchers, vendors, and states. The outcome depends on how much compute is applied, how capable the model is, how much access the actor has, and how quickly the resulting findings can be turned into patches.

This does not mean software security is doomed. It means the old equilibrium is over.

The scarcity of elite human attention once limited both offense and defense. Cyber-capable AI weakens that scarcity. Vulnerability discovery becomes cheaper, faster, and more scalable. Remediation does not automatically follow. The result is a fire hose: high-quality findings arriving faster than many organizations can absorb.

Large institutions may adapt by buying compute, securing privileged access, and rebuilding security operations around continuous AI-assisted hardening. Smaller players will need another path. For many of them, the only viable answer may be defensive aggregation: open code, shared scrutiny, pooled tooling, and communities capable of matching cumulative offensive attention with cumulative defensive effort.

The question “How secure is this software?” is therefore changing.

It no longer asks only whether the code was well written.

It asks how much capable model attention has been directed at it.

And how much more is being directed against it.

[1]: https://sockpuppet.org/blog/2026/03/30/vulnerability-research-is-cooked/ "Vulnerability research is cooked"
[2]: https://openai.com/index/gpt-5-5-with-trusted-access-for-cyber/ "Scaling Trusted Access for Cyber with GPT-5.5 and GPT-5.5-Cyber | OpenAI"
[3]: https://blog.mozilla.org/en/firefox/hardening-firefox-anthropic-red-team/ "Hardening Firefox with Anthropic’s Red Team"
[4]: https://blog.mozilla.org/en/firefox/ai-security-zero-day-vulnerabilities/ "The zero-days are numbered"
[5]: https://red.anthropic.com/2026/mythos-preview/ "Claude Mythos Preview"
[6]: https://www.axios.com/2026/05/07/openai-gpt-55-cybersecurity-model "OpenAI makes its Mythos rival more widely available to cyber defenders"
