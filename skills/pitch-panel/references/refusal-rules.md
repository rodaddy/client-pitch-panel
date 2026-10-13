# Refusal Rules

The panel refuses a pitch it cannot judge. This file is the whole rule, and it
runs BEFORE any seat, on every wash, with no exceptions.

## Why this exists

A synthetic committee handed a thin artifact will produce thirteen confident
verdicts anyway. Those verdicts read exactly like real ones - same table, same
score, same tone - and a studio will act on them. That is worse than returning
nothing, because it converts a gap in the input into a false result in the
output, silently.

Every kit that always produces something is a formatter. A formatter cannot save
a pitch. The refusal is the product.

## The four non-negotiables

Check all four before running. If any is missing: **STOP. ASK.**

### 1. A named or described client

A real company, or at minimum: the category, roughly the size, and what business
they are in. "A brand" is not a client. "A DTC skincare company doing about $40M,
founder-led" is.

Without it, every seat is generic and produces generic marketing feedback the
studio could have written themselves.

### 2. A stated ask

What the committee is being asked to approve: a scope, a retainer, a project, a
campaign, a concept direction. Specific enough that `DECISION: YES` means
something concrete.

Without it, "would you award this?" has no object, and thirteen people answer
thirteen different questions.

### 3. The actual pitch content

The real deck text, the concept as written, the proposal as it stands. **A
summary of a deck is not a deck.** The panel reacts to language, structure,
order, and specific slides - a paraphrase strips out exactly the things being
judged.

If the studio has a PDF or a deck the AI cannot read directly, ask for the text.
Do not judge a description of the work.

**Placeholders where the work is.** Deck text routinely arrives with the visual
core stubbed out - `[6 packaging comps]`, `[campaign films]`, `[identity
system]`, an empty slide, a slide that is only a filename. Mechanical rule: if a
slide is a bracket, a filename, or an empty heading, **it is missing content, not
present content.** What happens next depends on whether that slide is the pitch:

- **The placeholder IS the offer** - a packaging system pitched as six comps, an
  identity pitched as the identity, a film pitched as the film. **STOP.** Several
  seats have nothing to react to and would invent a reaction to the work's
  central object. Say which slide and ask for a description of what is on it,
  slide by slide, in the studio's own words. A written description of a comp is
  not the comp, and it is enough for a seat to react to; a bracket is not.
- **The placeholder is supporting material** - a team photo, a logo wall, a
  timeline graphic. Run the panel and **name every placeholder slide in
  `## Limitations`**, with the sentence that no seat saw it.

Never let a bracketed slide pass silently. A seat that says nothing landed, when
the thing that would have landed was inside a placeholder, produces a false
negative the studio will act on.

### 4. A budget or term shape

A number, a range, a model (retainer, project fee, media commitment) - or an
explicit "we deliberately left money out of this deck," which is a real and
judgeable choice.

`procurement-lead` and `finance-partner` are seats on this panel. With nothing
commercial to react to, their reactions are invented, and an invented reaction
from a seat that exists is worse than a deactivated seat.

## How to say it

Name the missing thing, say why it blocks the panel specifically, ask for it,
and stop. Do not soften it into an optional suggestion.

> "I'm going to stop before running the panel. I have the concept and the
> client, but there's no budget or term shape anywhere in this deck - and
> procurement is one of the thirteen seats. If I run it, I'd be inventing that
> seat's reaction, and you'd get a number that looks real. Add the fee
> structure, even as a range, and I'll run it."

> "Stopping here. What you've given me is a summary of the deck, not the deck.
> This panel reacts to your actual slides - the order, the headline wording, what
> comes first. On a summary I'd be judging your description of the work, and I'd
> hand you back thirteen verdicts about a thing that doesn't exist. Paste the
> real content and we'll go."

**Never offer to run it anyway with assumptions.** The whole failure this
prevents is a plausible-looking result built on an invented input.

## The second stop: material the studio may not be authorized to process

Stop and ask if the artifact contains the client's confidential material the
studio may not have the right to put into an AI tool - an NDA'd brief, a
competitor's pricing, personal data about client employees, unreleased financial
information.

The panel does not need it. Ask whether it should be removed before continuing.
This is a question, not a refusal: the studio decides.

**Identifiable people are the sharp edge of this, and a studio pitching a
regulated client will hit it.** Any of the following in the artifact gets named
before the panel runs:

- **patient information** - a named patient, a described case, a before-and-after
  photograph, a discharge list, a testimonial with a condition attached. A
  medical, dental, or behavioural-health client's patient material is protected
  whether or not the studio thinks of it that way, and a pitch that proposes
  filming patients or soliciting reviews from a treatment list is proposing that
  the client disclose it;
- **client records** at a law firm, an accounting practice, or a financial
  adviser - a named matter, a described client situation, holdings;
- **student records**, employee medical or disciplinary records, and anything
  about a minor.

Two different things happen with these, and the kit does both:

1. **If the material is IN the artifact** - ask whether it should come out before
   the panel sees it. That is the question above, and the studio decides.
2. **If the material is what the pitch PROPOSES** - filming patients, publishing
   client stories, running a review program off a treatment list - **do not stop.
   Run the panel.** That is not a gate problem, it is the single most valuable
   thing this panel can tell the studio, and `legal-reviewer` is the seat that
   says it. Make sure `legal-reviewer` is active before running: the deactivation
   table in `workflows/setup-committee.md` keeps it for exactly these categories
   even when the client has no lawyer on staff, because the exposure exists
   whether or not a reviewer does.

A studio that finds out at the pitch that its patient-story program needs a
signed authorization per patient has lost a slide. A studio that finds out in
month three has lost the client.

## What is NOT a reason to refuse

Do not stop for these. Run the panel and note the limit in the result:

- an early or rough concept - half-formed work is exactly what this is for;
- a pitch the AI thinks is weak - that is a verdict, not a gate;
- a client the studio knows little about - run it, and record the thinness in
  `panel/EVIDENCE-NOTES.md`;
- an unusual format - a one-page concept, a video script, an email. If it has all
  four non-negotiables, it can be judged.

The gate is about whether the panel CAN judge, never about whether the AI thinks
the pitch is any good.
