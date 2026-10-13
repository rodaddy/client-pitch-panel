# basic

The only tier of the Client-Pitch Panel. Everything in the kit ships here.

## What ships

The whole package: `START-HERE.md` (how to get `installer.md` to your AI),
`installer.md` (the self-adapting installer, paths 3A-3D), the plain-language
`OPERATIONS-MANUAL.md`, `README.md`, `ACCEPTANCE.md`, `VERSION`,
`CHANGELOG.md`, `examples/` (two complete worked runs), and
`skills/pitch-panel/` - `SKILL.md`, its own `VERSION`, `USER-CONFIG.md`, four
`workflows/` (setup-committee, wash-pitch, rewrite-and-retest, room-lifecycle),
four `references/` (seat-protocol, refusal-rules, committee-standard,
synthesis-and-scoring), `scripts/` (`room.sh` plus the dependency-free
`verify-kit.mjs`), `panel/` (`panel.json`, thirteen seat dossiers, the dossier
template, and `EVIDENCE-NOTES.md`), and `owner/OWNER-CONTEXT.md`.

What it does: a studio's pitch deck, creative concept, or proposal goes in
front of thirteen client-side decision-committee composites before it goes to
the client. Each seat reads it alone, from its own written dossier, and answers
one binary question - would you award this? Two of the thirteen are built to say
no, and their no is the product. Output is a decision table, the dissent in each
person's own voice, a weighted scorecard with the arithmetic shown, an integrity
check on the run itself, an award-ready / revise / stop call, and three
rewritten pitch angles on request.

`branding/` is created at install from the branding interview.

Capability tiers inside the run are a property of the harness, not of this
package tier: T1 full (subagents plus workflow orchestration, seats isolated and
parallel), T2 shell-only (same gates, runs sequential), T3 chat-only (the
deterministic steps become a manual checklist and the run is labeled degraded).

## Who it is for

Marketing agencies, PR and creative studios. A studio that wants
to hear which objections a pitch invites while there is still time to answer
them, instead of learning three weeks later that the client went another
direction.

It is for the people doing the pitching: the same team walks into the same room
better prepared, with the objections already worked through.

## What it refuses to do

The panel stops before running a single seat when the pitch is missing any of
four non-negotiables:

1. a named or described client;
2. a stated ask - what exactly the client is being asked to approve;
3. the actual pitch content, not a summary;
4. a budget or term shape, or an explicit "we left money out deliberately."

It names what is missing, says why the panel cannot judge without it, and asks.
It does not offer to run with assumptions, because an invented input produces a
result indistinguishable from a real one and the studio would act on it. The
rule is `skills/pitch-panel/references/refusal-rules.md`, enforced as step 1 of
`workflows/wash-pitch.md`.

Setup refuses too: the committee must keep at least one seat that should say no.

It ships no demo pitch, deliberately - the install verifies on the studio's own
real pitch, and if they have none at hand the installer stops rather than
substituting a fixture.

Beyond that it does not send, publish, price, approve, or submit anything. It is
not a prediction of the award and not client research; it does not stand in for
talking to the actual client. It is not legal review - the `legal-reviewer` seat
is a modeled gate and a real claim still goes to a real lawyer. The calibration
ledger in `panel/EVIDENCE-NOTES.md` is empty, so the panel has earned no
accuracy claim of any kind.

## Install

From `START-HERE.md`: unzip the kit (double-click on Mac, right-click ->
Extract All on Windows, tap the zip in Files on iPhone or iPad), find
`installer.md`, drag or paste it into your AI, and say **install client pitch
panel**.

The installer then runs itself:

1. Detects its runtime and picks a path - 3A coding agent with filesystem
   access, 3B chat app that accepts skill zips, 3C projects / custom
   instructions, 3D plain chat. If a host needs a different shape, the installer
   produces that shape from the canonical files rather than declaring the
   package incompatible.
2. **3A:** collision-check the skills directory (an existing `pitch-panel`
   offers an upgrade that backs up the old folder and preserves
   `USER-CONFIG.md`, `branding/`, `panel/`, and `owner/`), copy
   `skills/pitch-panel/` in recursively - every nested file - then create the
   user-facing pitch folder (default `~/Documents/pitch-panel/`) with
   `pitches/` and `runs/` inside it, copy `OPERATIONS-MANUAL.md` and
   `examples/` there, and record the path in the installed `USER-CONFIG.md`.
   **3B:** build one zip of `skills/pitch-panel/` with every archive path
   starting at `pitch-panel/`, all dossiers included and no OS junk, hand it to
   the user, and pause while they upload and toggle it on.
   **3C:** have the user add the named source files to the Project or Gem
   first, say plainly that condensed dossiers give thinner reactions, then
   install the condensed form. **3D:** load the skill into the conversation.
3. Run the isolation check (Section 3.5) and record honestly what the harness
   can do, the image capability check (3.6), and the short branding interview
   (Section 4), which writes `branding/brand.md` and sets `studio name:`.
4. Assert the install and run the verifier:
   `node skills/pitch-panel/scripts/verify-kit.mjs --skill-root ~/.claude/skills/pitch-panel`
   Confirm exit code 0 and 13 of 13 dossiers present.
5. Verify on the studio's own real pitch (Section 5): ask for a real one, run
   the refusal gate out loud, do a quick committee setup against the real
   client, then a full wash showing the decision table, a quoted dissent, the
   arithmetic, the integrity check, and the call. About fifteen minutes.

Runtime floor: plain Node 22.6.0+ for the verifier, declared in `kit.json`. No
`npm install`, build step, package manager, jq, or Python. `room.sh` is
bash/coreutils and parses on stock bash 3.2.

## Current version

`VERSION`: 0.2.2

State: WRITTEN. Built and put through three agent workout rounds against
invented studios (2026-08-12) that found and closed nine defects. No
box in `ACCEPTANCE.md` is checked, no real studio's real pitch has been washed,
and no device check has happened. Do not describe this kit as tested, proven, or
ready.
