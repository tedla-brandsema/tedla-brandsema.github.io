---
layout: article
type: essay
published: 2026-04-18T00:00:00+02:00
author: Tedla Brandsema
heading: Mythos
intro: Anthropic’s Mythos is not just a dangerous model. Its selective release through Project Glasswing turns model access into a strategic perimeter, raising harder questions about who gets defensive advantage first and why.
---

<h1>{{ page.heading }}</h1>
<h2><em>When Defensive Scarcity Creates a Strategic Perimeter</em></h2>

{% include published.html %}

The significance of Mythos does not lie primarily in Anthropic’s claim that the model is dangerous.

It lies in what Anthropic is doing because of that claim.

Anthropic is not treating Mythos as an ordinary frontier release. It is treating access to Mythos as something that must itself be selectively governed. The company says Claude Mythos Preview is a general-purpose unreleased frontier model that can surpass all but the most skilled humans at finding and exploiting software vulnerabilities, that it has already found thousands of high-severity vulnerabilities across major operating systems and browsers, and that it does not plan to make Mythos Preview generally available.

If that characterization is accurate, then caution is understandable.

But caution alone does not settle the question.

It changes it.

## The Safety Argument

Anthropic’s public case is coherent on its own terms.

The company is not describing Mythos as a narrow cyber tool. It is describing it as a general frontier model whose gains in coding, reasoning, and autonomy have produced a downstream cyber capability severe enough to alter the balance between defenders and attackers. In that framing, the danger is not only that the model knows more. It is that it may compress the distance between vulnerability existence, vulnerability discovery, and vulnerability exploitation. Anthropic presents that compression as the reason broad release would be irresponsible.

That argument deserves to be taken seriously.

A company that genuinely believes it has trained a model capable of materially accelerating offensive cyber operations would be difficult to defend if it released that model as a normal public product.

## Project Glasswing

Project Glasswing is Anthropic’s answer to the release problem. The initiative brings together Amazon Web Services, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorganChase, the Linux Foundation, Microsoft, NVIDIA, and Palo Alto Networks, while Anthropic also says it has extended access to more than 40 additional organizations that build or maintain critical software infrastructure. It has committed up to $100 million in usage credits and direct donations to open-source security organizations. Anthropic presents this as an urgent attempt to put Mythos-class capability to work for defensive purposes before similar capabilities proliferate more broadly. 

That matters because it rules out the simplest criticism.

This is not a case in which Anthropic merely withheld a powerful model from the public and sold it to the highest bidder under a safety slogan. There is an actual defensive architecture here. There is also explicit recognition that the open-source layer matters. The Linux Foundation is included. Additional maintainers of critical infrastructure are included. Anthropic is at least attempting to frame this as more than an elite enterprise preview.

That strengthens Anthropic’s case.

It also makes the deeper problem harder to avoid.

## Selective Defense

The central issue is not whether Anthropic has a public-interest rationale.

It is whether selective defense remains purely defensive once access itself becomes a source of asymmetry.

If Mythos materially improves vulnerability discovery and remediation, then the institutions that receive it first gain a real advantage over the digital environment they inhabit. Their systems can be hardened earlier. Their internal visibility can improve sooner. Their response cycles can compress faster. Others remain outside that perimeter, waiting for access, approval, partnership, or eventual diffusion. Anthropic may describe that as responsible prioritization. It is also a selective redistribution of security capability.

That may be justified.

It is still asymmetry.

This is where the release logic becomes more complicated than the phrase “defense first” suggests. Defense is not a universal category. Someone decides which defenders count first. Someone decides which systems are critical enough. Someone decides which institutions are inside the perimeter and which remain outside it.

That allocative power is not incidental to the story.

It is part of the story.

## The Open-Source Layer

The tension becomes clearer once the software ecosystem is viewed from below rather than above.

Modern digital society is not sustained only by hyperscalers, banks, operating system vendors, and cybersecurity firms. It is also sustained by shared open-source infrastructure, underfunded foundations, and maintainers whose work sits much closer to the base of the stack. Anthropic’s own materials make that impossible to ignore. The company says Mythos has found vulnerabilities in widely shared infrastructure including OpenBSD, FFmpeg, and the Linux kernel. It says those vulnerabilities were reported and patched, and it presents this as evidence of defensive value.

That point cuts both ways.

It strengthens Anthropic’s case because it shows that the company is not wrong about the stakes. If a model can uncover flaws that survived decades of review in software like that, then the security problem is real. But it also sharpens the contradiction. If the strongest justification for selective release is that shared infrastructure must be hardened before comparable offensive capability proliferates, then the maintainers of that shared infrastructure should not appear as a secondary moral afterthought. They should be central to the governing logic of access.

Anthropic has publicly acknowledged that layer.

It has not publicly shown that this layer governs the allocation.

That is a narrower claim than saying open source has been ignored.

It is also the more serious one.

## Divergent Interests Inside the Defensive Perimeter

Project Glasswing is presented as a defensive coalition.

That description is incomplete.

A coalition of software companies, infrastructure firms, open-source institutions, and governments does not automatically imply a unified objective. These actors may all care about cybersecurity, but they do not necessarily optimize for the same outcome.

For a software vendor, the preferred outcome is usually straightforward: identify vulnerabilities, patch them quickly, and reduce exposure across the installed base.

For a national security state, the calculus can be different. A vulnerability is not only a flaw to be removed. It can also be a source of strategic access. The United States formally recognizes this tension through the Vulnerabilities Equities Process, which exists because agencies may face a choice between disclosing vulnerabilities so they can be fixed and restricting disclosure for intelligence or law-enforcement purposes. That conflict is therefore not speculative. It is institutionalized.

This means the category Anthropic calls defenders is not internally coherent.

Some members of the perimeter may want the world’s software hardened as quickly as possible. Others may have reasons to preserve selective asymmetry. These goals can overlap in part. They do not collapse into one another.

That tension is not new. Governments have repeatedly pushed technology companies on lawful access and encryption, while those companies have argued that deliberately weakened protections create broader systemic risk. Apple made that case explicitly in its public dispute with the FBI, arguing that creating a mechanism to bypass security protections would not remain safely contained. The Five Eyes governments have also openly urged technology providers to create lawful access solutions and warned that legislative or other measures could follow if voluntary cooperation proves insufficient.

The outward projection of unity therefore does not resolve the deeper conflict.

It may conceal it.

## Government Access and Commercial Access

This is where the structure becomes especially difficult to read cleanly.

Anthropic places governments and companies within the same broad defensive narrative. But Anthropic also already maintains a separate line of **Claude Gov** models for U.S. national security customers, designed for classified environments and tailored to government use. That means differentiated access by customer class is not hypothetical. It already exists. 

That fact raises obvious questions even where public evidence remains incomplete.

Will government users receive the same Mythos as corporate users, or a modified version?
Will state customers gain deeper capability, less constrained tooling, or more sensitive operational latitude?
If a government user values retained access in some cases while a software company values immediate remediation, whose priority governs the perimeter?

The public record does not answer those questions.

But it does make them reasonable questions.

Once a frontier lab grants selective access to a model it says is too dangerous for the public, and once part of that selective perimeter includes state actors whose interests may diverge from broad software hardening, access control ceases to be a narrow product decision. It becomes a geopolitical allocation problem.

## A New Role for Frontier Labs

Once a frontier model is withheld from general release but distributed selectively to chosen institutions, the lab that controls it is no longer operating only as a product company.

It is operating as an allocator of strategic capability.

That role may be unavoidable. If Anthropic’s characterization of Mythos is broadly correct, then general release would be difficult to justify. Project Glasswing may therefore represent a genuine attempt to create a defensive head start before the wider diffusion of similar capabilities. Anthropic’s case should not be dismissed out of hand. 

But necessity does not eliminate the need for scrutiny.

It increases it.

Because once a private company begins deciding which institutions receive early access to capabilities that may materially affect the security of shared digital infrastructure, public safety and strategic customer formation become difficult to separate cleanly. Anthropic may be trying to reduce systemic risk. It may also be constructing a bespoke perimeter of institutions that can pay, partner, and persist as long-term privileged users of Mythos-class capability. Those two things are not mutually exclusive.

That is what makes the situation structurally uncomfortable.

## The Question Mythos Raises

The most important question is therefore not whether Anthropic should have released Mythos openly.

It should not have, if Anthropic’s own characterization is accepted.

The more difficult question is whether Mythos reduces systemic risk by giving defenders a head start, or whether it redistributes that risk by hardening one selected perimeter faster than the shared software substrate beneath it while leaving unresolved conflicts inside that perimeter itself.

Project Glasswing makes Anthropic’s case more credible because it shows that the company is attempting a structured defensive rollout rather than a normal premium release. 

Project Glasswing also makes the tension harder to ignore because it reveals who gets first access, and therefore reveals the asymmetry Anthropic is deliberately creating. 

That tension should not be flattened.

Anthropic may be acting responsibly.

Anthropic may also be normalizing a regime in which the most strategically significant frontier models are neither public tools nor ordinary enterprise products, but selectively allocated instruments whose first beneficiaries include institutions that do not fully share the same interest in universal hardening.

If so, Mythos matters not only because of what it can do.

It matters because of who gets to do it first.
