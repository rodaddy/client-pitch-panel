# Synthesis and Scoring

## 1. Separation is the whole design

Seat execution closes completely before synthesis begins. The synthesizer sees
the reactions, the frozen roster, the scoring weights, and the studio's own
context - and the seats saw none of that.

If the same pass writes a reaction and then scores it, the score is not
independent evidence, it is the same judgment written twice.

## 2. Synthesis

Drop every persona first. The synthesizer is not a panelist and does not speak in
anyone's voice.

Required level-two headings, exactly:

- `## Decision table`
- `## Agreement clusters`
- `## Consequential dissent`
- `## What landed and what resisted`
- `## What was missing`
- `## Integrity check`
- `## Limitations`

And exactly once, on its own line:

```text
SYNTHESIS_CONFIDENCE: <LOW|MEDIUM|HIGH>
```

**Rules that bind the synthesizer:**

- Cite exact reaction text as evidence, by seat id and field. A claim about what
  the panel thought, with no quote, is the synthesizer's opinion.
- **Never average dissent away.** A 10-3 split is not "broad agreement" if one of
  the three holds a veto.
- **Never turn a hard-no into a target.** `builds-it-in-house` objecting is the
  seat working. Converting her is not an improvement goal.
- Preserve a minority objection whenever the seat has authority, names a
  substantiation problem, or represents a declared gate. Frequency is not truth.
- Name every failed seat and every degraded condition. A limitation left out of
  the synthesis is a limitation the studio will not know it acted under.

`SYNTHESIS_CONFIDENCE` is LOW by default. MEDIUM requires a roster genuinely
fitted to the real client. HIGH additionally requires isolated execution, no
failed seats, and several seats grounded in first-hand knowledge of the actual
people. A panel of shipped composites is never HIGH.

## 3. Scoring

Use only the dimensions and weights in `panel-snapshot.json`. For each dimension:

1. a 0-100 raw score;
2. cited reaction evidence - `<seat-id>`, and which field it came from;
3. `raw x weight / 100 = contribution`, written out as arithmetic;
4. the total as the sum of contributions.

Exactly once, on its own line:

```text
SCORECARD_TOTAL: <number>
```

Required headings: `## Dimension arithmetic` and `## Total`.

**Show the arithmetic.** A total with no visible per-dimension math is a number
the studio cannot check, and an unverifiable number is worse than no number
because it carries unearned authority.

**Gates override the score:**

- a `legal-reviewer` `FLAG` **caps the total at 60**, and the cap is stated as a
  cap. Sixty is a fixed number, not a judgement call - if the arithmetic totals
  above it, report `SCORECARD_TOTAL: 60 (capped from <computed total> by
  legal-reviewer FLAG)`. If the arithmetic totals at or below 60, report the
  computed total and say the cap did not bind. A cap the AI picks per run is not
  a cap, because two runs of the same pitch would then be scored on different
  instruments;
- a `builds-it-in-house` `YES`, or a `YES` from any seat whose `fit` is
  `hard-no`, suspends the score pending an integrity check;
- any integrity warning is reported alongside the total, never after it.

**Every dimension must be owned by an active seat, or it is not scored.** Before
any arithmetic, check each dimension in the snapshot against the active roster
and name at least one active seat whose reaction speaks to it. A dimension with
no active owner - the usual cause is deactivating the seat it was written for -
is handled mechanically, never by substitution:

1. do NOT score it from a seat that does not own it. Reading `defensibility` off
   a `hard-no` seat's reaction produces a number that is the opposite of what the
   dimension measures;
2. drop the dimension from this run, redistribute its weight across the remaining
   dimensions in proportion to their existing weights so the total is still
   exactly 100, and state the redistribution in `## Dimension arithmetic` as
   arithmetic;
3. name the orphaned dimension and its original weight in `## Limitations`.

An orphaned dimension is a setup finding, not a scoring problem. Say so, and
point the studio back at `workflows/setup-committee.md` step 4.

Report it as a directional panel score. Never as a probability of winning.

## 4. Result

Required headings: `## Evidence`, `## Dissent`, `## Limitations`, `## Next step`.
Exactly once:

```text
RESULT_DECISION: <AWARD-READY|REVISE|STOP>
RESULT_CONFIDENCE: <LOW|MEDIUM|HIGH>
```

- **`AWARD-READY`** - no objection surfaced that would sink this in the room. Not
  a prediction of winning.
- **`REVISE`** - named objections must be answered, then retest.
- **`STOP`** - the pitch is aimed at the wrong committee, failed a legal gate,
  rests on an unsupportable claim, or is missing a foundation. Fix the
  foundation; do not rewrite the copy.

Include the strongest evidence, the strongest dissent, the limitations, and the
smallest real-world step that could prove the panel wrong - usually one direct
question to the actual client.

## 5. Integrity warnings - report them every run, including when clean

Flag:

- every active buyer seat said yes;
- `builds-it-in-house` converted, or any `hard-no` seat returned `YES`;
- `budget-was-never-real` is the most positive seat;
- wrong-fit seats more positive than core seats;
- two or more near-identical reactions (isolation probably failed);
- a seat gave generic consultant advice instead of a personal reaction;
- degraded shared-context execution;
- any missing reaction;
- weights changed after results were visible;
- **the same real person is behind two or more active seats** (roster capture -
  see below);
- **a dimension was scored with no active seat owning it** - that is a setup
  break reaching the scorecard.

**Reading the wrong-fit warning correctly.** "`budget-was-never-real` is the most
positive seat" means one of two different things and the synthesis must say
which, because the studio's next move is opposite in each case:

- **The pitch is winning a room that cannot buy.** The enthusiastic seat has no
  authority and no influence over the person who does. The pitch is aimed at the
  wrong committee; that is the original warning and it usually means `STOP`.
- **The enthusiastic seat is the internal sponsor.** At small and owner-run
  clients the person driving the review often has zero budget authority and is
  still the reason the pitch exists. Their enthusiasm is real signal, not a
  false positive, and the actual finding is a different one: *this pitch has a
  champion and no path from the champion to the signer.* That is a `REVISE`,
  and the revision is arming the champion rather than rewriting the concept.

Decide between them mechanically: look at `panel.signer` from the manifest
(recorded in `workflows/setup-committee.md` step 3b). If the enthusiastic
wrong-fit seat has a stated route to the signer - reports to them, is related to
them, sits in the room when it is decided - it is a sponsor, not a false
positive. If no such route was recorded, treat it as the original warning. Say
which reading you applied and why.

**Roster capture.** If the same human occupies two or more active seats, every
count in the decision table is inflated and the tally is not evidence. Name every
collision, count the affected seats as ONE vote in any tally, and say plainly how
many real people the panel actually represents: "eight active seats, five real
people." Then send the studio back to `workflows/setup-committee.md` step 2b
before the next run. Do not silently proceed on an inflated count - a 6-2 that is
really a 4-2 reads as a mandate that does not exist.

State a clean check as clean. Silence is not a result - a studio reading a
synthesis with no integrity section cannot tell whether the check passed or was
skipped.

## 6. What this output is not

It is not a prediction of the award. It is not customer research. It is not legal
review. It is not a substitute for asking the actual client a direct question.

It is a structured, auditable read on which objections the pitch invites, from
composites whose assumptions are written down. Say that, in the studio's own
language, every time the result is handed over.
