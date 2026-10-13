# Wash a Pitch

This is the main move. Read `references/seat-protocol.md`,
`references/refusal-rules.md`, and `references/synthesis-and-scoring.md`
completely before running.

Trigger phrases: "wash this pitch", "run the panel", "test this deck", "would
they buy this".

---

## 1. THE REFUSAL GATE - run this before anything else

Read the artifact and check the four non-negotiables from
`references/refusal-rules.md`:

1. a named or described client;
2. a stated ask;
3. the actual pitch content, not a summary of it;
4. a budget or term shape, or an explicit statement that money was deliberately
   left out.

**If any is missing, STOP. Do not run a single seat.** Say which one is missing,
say why the panel cannot judge without it, and ask for it. Do not offer to "run
it anyway with assumptions" - inventing the missing piece produces a result that
looks real and is not, and the user will act on it.

Also stop and ask if the artifact contains confidential client material the
studio may not be authorized to process.

Only when the gate passes do you continue.

---

## 2. Set up the run folder

Read `USER-CONFIG.md` for the `pitch folder:` key.

**If a pitch folder exists on disk:** create
`<pitch folder>/runs/<YYYY-MM-DD>-<short-pitch-name>/` and inside it:

- `artifact.md` - a copy of the pitch content exactly as supplied. Every seat
  reads THIS copy. If the source file changes mid-run, the run is still bound to
  what was actually judged.
- `panel-snapshot.json` - a copy of `panel/panel.json` as it stands right now.
  This freezes the roster and the scoring weights for this run.
- `reactions/` - one file per seat, written as they come in.
- `RUN.md` - the run record (see step 5).

**If `USER-CONFIG.md` says `pitch folder: chat only`:** keep all of it in the
conversation. State the frozen roster and weights out loud at the start so they
cannot drift mid-run, and show each reaction as it completes.

Do not edit `panel-snapshot.json` after this point. If the roster needs to
change, that is a new run.

---

## 3. Run every active seat, alone

Use only the seats where `active` is `true` in `panel-snapshot.json`. A dossier
file in the folder that is not in the snapshot does not run.

For each seat, assemble a task packet containing exactly:

- the seat protocol (`references/seat-protocol.md`);
- that seat's dossier, in full;
- that seat's own `decision_signal` from the snapshot;
- the panel objective from the snapshot;
- `artifact.md`.

**What a seat must NOT receive:** any other seat's dossier or reaction, the
scoring dimensions or weights, the studio's own framing of why the pitch is
good, `owner/OWNER-CONTEXT.md`, or any indication of what answer is wanted.

Execution follows the capability tier of the harness you are in. Never invoke
`claude -p` or any harness-specific CLI — that hard-codes one vendor into a kit
meant to run everywhere.

**T1 (subagents + workflow orchestration) — isolated parallel.** Run the seats
as **subagents running workflows**: one subagent per seat, at most seven seats
per wave, each given exactly one task file and returning only the reaction
contract. Save each reaction before the synthesizer sees any of them.

**T2 (shell-only, no subagents) — isolated sequential.** Separate fresh
contexts, one seat at a time. Slower, same independence, full fidelity. Record
the mode as `isolated-sequential`, never as parallel.

**T3 (chat-only, no shell) — degraded shared context.** Only when isolation is
genuinely impossible. Finish
and freeze each reaction completely before loading the next dossier, never revise
an earlier reaction after seeing a later one, and **label the whole run degraded
in `RUN.md` and in the result.** Later seats may be contaminated by earlier ones.
Never present a degraded run as equivalent to an isolated one.

Save each response as `reactions/<seat-id>.md`. Each must be exactly the ten
labeled lines from the seat protocol, nothing before or after.

**If a seat returns malformed output:** retry it once with the same packet. If it
fails twice, record the failure with the seat id and the reason, and continue -
never invent a missing reaction. Continue to synthesis only if fewer than 20
percent of active seats failed, and name every failure in the limitations.

---

## 4. Synthesize, after every reaction is closed

Drop every persona. Read all completed reactions. Now - and only now - you may
read `owner/OWNER-CONTEXT.md` if the studio supplied one.

Write the synthesis with these exact level-two headings:

- `## Decision table` - every seat: id, name, kind, fit, DECISION, INTENSITY,
  GATE, CONFIDENCE. One row each.
- `## Agreement clusters` - where seats converged, quoting the exact reaction
  text as evidence. Cite by seat id and field.
- `## Consequential dissent` - every NO from a seat with authority, every
  specialist FLAG, and every objection that would change the work. Do not
  average dissent away. Do not turn a hard-no into a target.
- `## What landed and what resisted` - specific lines, slides, claims, numbers.
- `## What was missing` - the proof or information seats needed and did not get.
- `## Integrity check` - run the checks in step 6 and state the result plainly.
- `## Limitations` - failed seats, degraded execution, what this panel cannot
  know, and the fact that these are composites and not the actual client.

Include this line exactly once:

```text
SYNTHESIS_CONFIDENCE: <LOW|MEDIUM|HIGH>
```

Confidence is LOW by default. It is only MEDIUM or HIGH when the roster was
genuinely fitted to this client, execution was isolated, and no seat failed.

---

## 5. Score separately, and show the arithmetic

Use only the dimensions and weights frozen in `panel-snapshot.json`. Never
introduce a new dimension mid-run, and never adjust a weight after seeing the
reactions.

For every dimension, show:

1. the 0-100 raw score;
2. the reaction evidence it comes from, cited as `<seat-id>` and which field
   (`REACTION`, `LANDS`, `RESISTS`, `MISSING`, `CHANGE`);
3. `raw score x weight / 100 = weighted contribution`, written out.

Then the total as the sum of the contributions. Include this line exactly once:

```text
SCORECARD_TOTAL: <number>
```

**Gates override the score.** A `legal-reviewer` FLAG caps the total and is
stated as a cap. A `builds-it-in-house` YES suspends the score entirely pending
an integrity check. Explain every override in words; never let a number quietly
outrank a gate.

Then write the result, with these exact level-two headings - `## Evidence`,
`## Dissent`, `## Limitations`, `## Next step` - and this line exactly once:

```text
RESULT_DECISION: <AWARD-READY|REVISE|STOP>
RESULT_CONFIDENCE: <LOW|MEDIUM|HIGH>
```

- `AWARD-READY` - the panel found no objection that would sink this in the room.
- `REVISE` - named objections must be answered, then retest.
- `STOP` - wrong audience, a failed legal gate, an unsupportable claim, or a
  missing foundation. Fix the foundation, do not rewrite the copy.

`AWARD-READY` is a directional read on the panel's evidence. It is never a
prediction that the pitch wins.

---

## 6. Integrity check (run it every time, report it even when clean)

Flag, out loud, any of:

- **every active buyer seat said yes** - an all-yes panel is an integrity
  warning, not a victory;
- **`builds-it-in-house` returned YES** - check the pitch for an overclaim and
  the reaction for character drift;
- **`budget-was-never-real` is the most positive seat** - the pitch is winning
  the room that cannot buy;
- **wrong-fit seats are more positive than core seats** - same problem, worse;
- **two or more reactions are near-identical** - seat isolation probably failed;
- **a seat gave generic marketing advice** instead of a personal reaction - it
  dropped character;
- **the run was degraded** - shared context, or failed seats.

A clean integrity check is stated as clean. Silence is not a result.

---

## 7. Hand it back

Present, in this order: the result decision and confidence, the decision table,
the consequential dissent, the score with its arithmetic, the integrity check,
and the run folder path.

Then say the disclaimer plainly: **these are researched composites, not the
client. The panel tells the studio which objections the pitch invites; it does
not tell them who wins.**

Offer the next move: "Say **rewrite and retest** and I'll build three different
pitch angles from these objections and run each one back through the same panel."
