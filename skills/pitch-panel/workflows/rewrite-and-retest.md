# Rewrite and Retest

Start from a completed wash. Read `references/synthesis-and-scoring.md` before
starting.

Trigger phrases: "rewrite and retest", "fix it and run it again", "give me three
versions".

---

## 1. Diagnose before writing anything

Sort the panel's objections into four piles. This is the step that gets skipped
and it is the step that makes the rewrite worth doing.

1. **Fix it** - objections raised by two or more core seats for the same reason.
   These are real and the rewrite must address them.
2. **Fix it, one seat** - a single objection from a seat with authority, or any
   specialist FLAG. A `legal-reviewer` FLAG is always in this pile, regardless of
   how many seats agreed.
3. **Do NOT optimize for this** - objections from `wrong-fit` and `hard-no`
   seats. Their dissent is information about who the pitch attracts, not a
   change list. Writing a version that converts `builds-it-in-house` is how a
   studio ends up overpromising.

   **The one exception, and it is mechanical: the signer.** Check
   `panel.signer` and any seat marked `"signer": true` in the run snapshot. **A
   signer's objection is ALWAYS pile 1, whatever its `fit` is.** At owner-run
   clients the hardest no and the person holding the pen are routinely the same
   human, and the do-not-optimize rule exists to stop a studio overpromising to
   someone who was never going to buy - not to tell it to ignore the buyer.

   When the signer sits in a `hard-no` seat, the rewrite goal is not converting
   them with a better argument. It is finding **the smallest version they would
   actually sign** - usually the paid pilot, the single SKU, the one season, the
   phase-one they named themselves in their own `CHANGE` field. Read that field
   literally; a signer who names their own smallest yes has handed the studio
   the brief.
4. **Not a copy problem** - objections that need evidence, a different scope, a
   different price, or a conversation with the client. No rewrite fixes a missing
   case study or an unfunded coordination burden. Say so plainly instead of
   wording around it.

Show the studio the four piles before writing. If pile 4 is the biggest, the
honest recommendation is to stop rewriting and go get the missing thing.

---

## 2. Write three materially different angles

Three versions, not three synonym swaps. Each must be recognizably a different
pitch:

1. **The smallest correction.** The original pitch with pile 1 and pile 2
   objections answered and nothing else changed. This is the control.
2. **A different frame.** Built around the strongest thing that landed, or the
   deepest pain the committee revealed - a different way in to the same work.
3. **A different proof or structure.** Same idea, different case for it: lead
   with evidence instead of concept, or restructure the commercial ask, or change
   what is asked for first.

Rules that hold across all three:

- Every claim stays truthful and substantiable. A version that wins by claiming
  more is a failure, and `legal-reviewer` will catch it on the retest anyway.
- Do not remove the brave version to satisfy the cautious seats. `cmo-defender`
  needs it legible, not smaller.
- Use the studio's voice, from `branding/brand.md`. Do not flatten it toward a
  house style.
- Nothing in any version may position the studio as doing the client's people's
  jobs for them. The pitch takes work off the committee's plate and makes their
  team more capable - that is what `internal-champion` responds to and it is what
  makes `builds-it-in-house` engage rather than dismiss.

---

## 3. Retest each version cleanly

Prepare a **fresh run for each version**, using:

- the same `panel-snapshot.json` - same roster, same weights, same seats;
- the same execution mode;
- the same seat protocol.

Seats must not be told which version this is, that a previous version exists,
what the previous verdict was, or which version the studio prefers. A seat that
knows it is judging "version 2" is judging a revision, not a pitch.

Three versions across a thirteen-seat panel is thirty-nine reactions. If that is
too much to run, say so and run the two most different versions rather than
running all three badly.

---

## 4. Compare like with like

Report:

- score movement per version, with the dimension that moved;
- **which core seats changed their verdict, and what changed their mind** - this
  matters more than the score;
- whether `budget-was-never-real` or `builds-it-in-house` moved, and treat any
  movement there as a warning, not an improvement;
- objections that survived all three versions - these are the real problem;
- whether confidence went up, and honestly whether it should have.

**When there is more than one required signer, report them separately.** Check
`panel.signer`. If it holds two or more names, a single score movement hides the
thing that decides the award: a version that moves one signer can move the other
one backwards, and the average reads as progress while the deal gets further
away. So for every version, state each signer's verdict and intensity in its own
row, and answer one question in words:

> Is there a version that BOTH required signers would sign, or is there not?

Three outcomes, and say which one plainly:

- **A version exists that both would sign.** Name it and stop rewriting.
- **Every version that moves one moves the other backwards.** The pitch is not
  the problem - it has landed inside a disagreement the signers already had, and
  no rewrite settles somebody else's argument. Say that directly. The real next
  step is a conversation with both of them in the same room about what each one
  needs, not a fourth version.
- **Both are moving the same way but neither is there yet.** Normal. Keep going
  within the three-cycle limit.

The smallest-version move usually works here: when co-signers disagree about
scope, the version that starts where the reluctant one already agrees - one
location, one season, one SKU family - is frequently the only version both would
sign, and one of them has usually already named it in their own `CHANGE` field.

**Prefer a version because the evidence improved, not because the number went
up.** A version scoring three points higher with the same unanswered core
objection has not improved.

---

## 5. Know when to stop

**Stop after three unsuccessful rewrite cycles.** If the same objection survives
three rounds, the problem is not the wording. Say so directly and recommend the
real fix: talk to the actual client, change the scope, get the missing proof, or
walk away from a pitch that was never winnable.

A panel run repeatedly against the same fixed synthetic judge stops being
research and becomes an exercise in learning to please thirteen fictional
people. Say that out loud when it starts happening.
