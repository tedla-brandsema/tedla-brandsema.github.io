---
layout: article
type: article
date: 2026-04-18T00:00:00+02:00
author: Tedla Brandsema
title: "Mythos"
intro: "Anthropic's Mythos may be too dangerous for public release. Project Glasswing raises the harder question: when defensive access is scarce, who gets protected first, and who waits outside the perimeter?"
hero: /static/images/hero/generated/mythos
hero_alt: "A cracked glass security perimeter protecting privileged institutions while a darker shared software base remains outside."
hero_caption: "Selective defense creates a perimeter. The perimeter decides who receives strategic capability first."
hero_ai: true
redirect_from:
  - /writing/essays/mythos.html
---

<h1>{{ page.title }}</h1>
<h2><em>When Defensive Scarcity Sets the Boundary</em></h2>

{% include published.html %}

{% include hero.html %}

{% include ai-disclosure.html %}

The important fact about Mythos is not only Anthropic's claim that the model is dangerous. The important fact is what Anthropic is doing because it believes that claim.

Anthropic is treating access to Mythos as something that has to be governed. The company says Claude Mythos Preview is an unreleased general-purpose frontier model that can outperform all but the most skilled humans at finding and exploiting software vulnerabilities. It says Mythos has already found thousands of high-severity vulnerabilities across major operating systems and browsers. It also says Mythos Preview will not be made generally available.

If that description is accurate, a normal public release would be hard to defend. A model that materially accelerates offensive cyber operations is not just another productivity product with an edgy demo. It changes the release question from product safety to allocation.

## The Safety Case

Anthropic's public argument is coherent on its own terms. It is not presenting Mythos as a narrow cyber tool. It is presenting it as a general frontier model whose gains in coding, reasoning, and autonomy produce a downstream cyber capability large enough to change the relationship between defenders and attackers.

The claimed mechanism is compression. Vulnerabilities exist before anyone finds them. Once found, they can be patched, studied, sold, hoarded, or used. A model like Mythos may shorten the distance between existence, discovery, and exploitation. Anthropic treats that compression as the reason broad release would be irresponsible.

That is a serious argument. A company that genuinely believes it has trained such a model would face a worse objection if it simply shipped the model as a normal public product and hoped policy would catch up later.

## Project Glasswing

Project Glasswing is Anthropic's answer to that release problem. The initiative includes Amazon Web Services, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorganChase, the Linux Foundation, Microsoft, NVIDIA, and Palo Alto Networks. Anthropic also says it has extended access to more than 40 additional organizations that build or maintain critical software infrastructure. It has committed up to $100 million in usage credits and direct donations to open-source security organizations.

That matters. Anthropic is not merely withholding a powerful model from the public and selling it to the highest bidder under a safety label. There is an actual defensive architecture here, and there is explicit recognition that the open-source layer matters. The Linux Foundation is inside the initiative. Additional maintainers of critical infrastructure are inside it too. Anthropic is trying to frame this as more than an elite enterprise preview.

That strengthens the case for Project Glasswing. It also exposes the harder problem.

## Selective Defense

The central issue is whether selective defense remains purely defensive once access itself becomes a source of asymmetry.

If Mythos improves vulnerability discovery and remediation, the institutions that receive it first gain an advantage over the wider digital environment. Their systems can be hardened earlier. Their visibility can improve sooner. Their response cycles can tighten while other maintainers, companies, and users wait for access, approval, partnership, or eventual diffusion. Anthropic may call that responsible prioritization. The effect is still a selective redistribution of security capability.

That redistribution may be justified. It is not neutral.

The phrase defense first hides a choice about which defenders count first. Someone decides which systems are critical enough. Someone decides which organizations are trusted enough. Someone decides which institutions sit inside the perimeter and which remain outside it.

That allocative power is part of the story.

## The Open-Source Layer

The tension is clearer from the bottom of the stack.

Modern digital society is not sustained only by hyperscalers, banks, operating system vendors, and cybersecurity firms. It also depends on shared open-source infrastructure, underfunded foundations, and maintainers whose work sits close to the base of the software supply chain. Anthropic's own materials make that point hard to miss. The company says Mythos found vulnerabilities in widely shared infrastructure, including OpenBSD, FFmpeg, and the Linux kernel. It says those vulnerabilities were reported and patched, and it presents those results as evidence of defensive value.

That evidence cuts in both directions. It shows why Anthropic is right to treat the capability as serious. If a model can find flaws that survived years of review in software like that, the security problem is real. It also sharpens the allocation problem. If shared infrastructure is the reason selective release is justified, then the maintainers of that infrastructure should sit at the center of the access model, not at its moral edge.

Anthropic has publicly acknowledged that layer. It has not publicly shown that this layer governs allocation. That is a narrower criticism than saying open source has been ignored. It is also the more important one.

## Interests Inside the Perimeter

Project Glasswing is described as a defensive coalition, but that phrase is too tidy.

Software companies, infrastructure firms, open-source institutions, and governments may all care about cybersecurity. They do not necessarily optimize for the same outcome.

For a software vendor, the preferred outcome is usually straightforward: find vulnerabilities, patch them quickly, and reduce exposure across the installed base. For a national security state, a vulnerability can also be a source of access. The United States formally recognizes this tension through the Vulnerabilities Equities Process, which exists because agencies may have to choose between disclosure for remediation and restriction for intelligence or law-enforcement use. The conflict is institutional, not speculative.

So the category Anthropic calls defenders is not internally coherent. Some members of the perimeter may want the world's software hardened as quickly as possible. Others may have reasons to preserve selective asymmetry. These goals can overlap. They do not become the same goal.

This is an old conflict in a new form. Governments have repeatedly pushed technology companies on lawful access and encryption, while those companies have argued that deliberately weakened protections create broader systemic risk. Apple made that case in its public dispute with the FBI, arguing that a mechanism to bypass security protections would not remain safely contained. The Five Eyes governments have also urged technology providers to create lawful access solutions and warned that legislative or other measures could follow if voluntary cooperation failed.

A defensive perimeter can contain conflicting incentives. Naming the coalition defensive does not resolve those incentives.

## Government Access

Anthropic places governments and companies inside the same broad defensive narrative. It also already maintains a separate line of Claude Gov models for U.S. national security customers, designed for classified environments and tailored to government use. Differentiated access by customer class already exists.

That fact raises questions even where the public evidence is incomplete. Government users might receive the same Mythos as corporate users, or a modified version. State customers might receive deeper capability, different constraints, or more operational latitude. If a government user values retained access in some cases while a software company values immediate remediation, the public record does not tell us whose priority governs the perimeter.

Once a frontier lab grants selective access to a model it says is too dangerous for the public, and once part of that perimeter includes state actors whose interests may diverge from broad software hardening, access control stops being a narrow product decision. It becomes a geopolitical allocation problem.

## Frontier Labs as Allocators

A frontier model withheld from general release but distributed to chosen institutions places the lab in a different role. The lab is no longer operating only as a product company. It is allocating strategic capability.

That role may be unavoidable. If Anthropic's characterization of Mythos is broadly correct, general release would be difficult to justify. Project Glasswing may be a genuine attempt to give defenders a head start before similar capabilities spread more widely. Anthropic's case should be taken seriously.

Necessity, though, increases the need for scrutiny. A private company deciding which institutions receive early access to a capability that may affect the security of shared digital infrastructure is making more than a customer-access decision. Public safety and strategic customer formation become hard to separate. Anthropic may be trying to reduce systemic risk while also constructing a privileged perimeter of institutions that can pay, partner, and persist as long-term users of Mythos-class capability. Both can be true.

That is the uncomfortable structure: a safety argument can be real and still produce a new concentration of power.

## Risk Allocation

The question is not whether Anthropic should have released Mythos openly. If Anthropic's own description is accepted, it should not have.

The question is whether Mythos reduces systemic risk by giving defenders a head start, or redistributes that risk by hardening one selected perimeter faster than the shared software base beneath it. Project Glasswing makes Anthropic's case more credible because it is a structured defensive rollout rather than a normal premium release. It also makes the asymmetry visible.

That tension should stay visible. Mythos matters because of what it can do, but it may matter more because of who gets to use it first.
