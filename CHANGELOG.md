# Changelog

All notable changes to the Client-Pitch Panel kit are recorded here. This file
follows Keep a Changelog and Semantic Versioning.

Entries before the public release refer to an internal kit standard
("KIT-STANDARD", with section numbers) and an internal kit quality review
("the tribunal"). Neither ships in this repository. The rules from them that
matter to this kit are restated in `README.md` and `ACCEPTANCE.md`.

## [Unreleased]

### Changed

- Public export: `README.md` rewritten for outside readers, `ACCEPTANCE.md`
  and this file stripped of internal paths and process references, MIT
  `LICENSE` added. No kit behaviour changed; `VERSION` stays 0.2.2.

## [0.2.2] - 2026-08-17

Cross-family review fixes (Opus + Terra kit-hardening pass).

### Fixed

- `room.sh seat bounce` printed a shell syntax error instead of its post-bounce
  guidance. The verifier command was wrapped in backticks inside a double-quoted
  string, so bash ran it as a command substitution and swallowed the sentence
  telling the buyer to re-check the room's minimum active seat count. The line
  now prints plainly and names the room it actually acted on.
- `--room`, `--criteria`, and `--from` hung forever when given without a value.
  `shift 2` with one argument remaining fails on bash 3.2 and shifts nothing, so
  the parse loop spun on the same flag. Each site now refuses with exit 1 per the
  kit standard's bad-input rule, instead of wedging the buyer's terminal.
- `rooms/DEFAULT` was trusted without validation, so a DEFAULT holding a `..`
  path let `clean`, `seat bounce`, and `seat refresh` archive-move directories
  outside `rooms/`. The resolved room name is now validated wherever it comes
  from, and every command refuses a traversing DEFAULT with exit 1.
- `verify-kit.mjs` exited 3 (harness error) with an opaque `EISDIR` when an
  active seat's dossier path pointed at a directory or other unreadable
  non-file. That is an invalid room, not a broken machine, so it now reports the
  offending seat and exits 1.

### Verification

- Reproduced each defect on Apple bash 3.2 before fixing, then re-ran the same
  commands after: dangling `--room`/`--criteria`/`--from` each exit 1 rather
  than timing out; `seat bounce` prints clean guidance; a `../` DEFAULT is
  refused by `seat list`, `seat bounce`, `seat refresh`, `room list`, and
  `clean`, with the out-of-tree file left untouched; a valid DEFAULT still
  works.
- `verify-kit.mjs` exit 0 on the shipped package; exit 1 (was 3) on a room whose
  active seat points at a directory.
- `bash -n` clean on Apple bash 3.2; positioning-law scan passes over all 43
  kit markdown files.

## [0.2.1] - 2026-08-13

Plain-Node buyer-path hardening and deterministic install verification.

### Added

- `kit.json` declaring the T2 Node 22.6.0+ runtime floor.
- `skills/pitch-panel/scripts/verify-kit.mjs`, a dependency-free Node verifier for
  package/install shape, version agreement, roster validity, contained active
  dossier paths, dossier length, core/dissent floors, and scoring weights.
- `skills/pitch-panel/VERSION`, so an installed skill carries its own upgrade
  version instead of depending on package-root files that are not installed.

### Fixed

- Corrected the verifier to read the roster's actual top-level `seats` and
  `scoring` fields; the inherited draft exited 3 against the shipped panel.
- Made install verification target the installed skill folder rather than
  accidentally rechecking the unzipped source package.
- Preserved customer state during upgrades by copying the existing skill to a
  backup and updating only instructions, scripts, references, and version in
  place; the previous rename-first sequence left no installed folder to update.
- Replaced archive-entry-order assumptions with a path-prefix check, included all
  four workflows and the installed `VERSION`, and removed stale three-workflow
  wording.
- Added `room new --from shipped`, refused unusable empty rooms, corrected the
  refresh authoring reference, and routed room checks to the deterministic Node
  verifier.
- Removed the last `rm` path from `room.sh`; lifecycle removals remain archive
  moves only.

### Verification

- Plain Node package verification, installed-copy verification, refusal checks,
  room lifecycle smoke tests, bash 3.2 syntax, and portability/positioning scans
  are recorded in the PR receipts.

## [0.2.0] - 2026-08-12

Room lifecycle. A committee is now a named, reusable ROOM, so one client's
right-sizing never bleeds into another's and five concepts can be washed at once.

### Added

- `skills/pitch-panel/scripts/room.sh` — room lifecycle tooling. Bash and coreutils
  only; no Bun, no jq, no install step. Parses on Apple's stock bash 3.2.
  - `clean [--room X]` — the five-minute rerun path. Archives runs and inputs to
    `_archive/<stamp>/`, leaves the roster and every dossier untouched, then
    asserts the room is rerun-ready.
  - `seat list | bounce <ids> | refresh <ids> --criteria "..."` — seat-level
    ops. `refresh` archives the old dossier, deactivates the seat, and stages a
    filled authoring prompt per seat; the dossier itself is written through the
    existing seat-authoring workflow and gated by the kit's validation.
  - `room new <name> --from shipped|<room> | room list | room archive <name>` —
    named rooms that run in parallel without sharing state.
  - `--list` dry run on every mutating command; exit `0` pass / `1` failed /
    `3` harness error; refuses to run outside a kit root; idempotent.
- `skills/pitch-panel/workflows/room-lifecycle.md` — the workflow, including running
  N rooms concurrently and a migration note for the older layout (rooms are
  additive; the existing layout keeps working).
- README section on why a studio runs this instead of skipping the step, with the cost and turnaround comparison marked as an
  unmeasured estimate.

### Changed

- `SKILL.md` routes rerun/seat-swap/parallel requests to the new workflow.

### Notes

- Nothing is ever deleted. Every removal is a move into `_archive/<stamp>/`,
  and a bounced seat keeps its roster entry with `"active": false`.
- The script performs zero dossier authoring. It stages; the AI writes; the
  existing validation decides.
- Validation and right-sizing are per room. A correct room proves nothing about
  the room next door.

## [0.1.1] - 2026-08-12

Workout pass. Three agent rounds ran the kit's own workflows literally against
three invented-but-realistic Long Island studios and their clients: a Huntington
branding studio pitching a Bohemia specialty-food distributor, a Patchogue PR
shop pitching a six-physician orthopedic practice, and a Riverhead creative shop
pitching a Riverhead hospitality group owned 50/50 by two brothers who disagree.
Nine defects found and closed. **State is still WRITTEN** - no real studio, no
real pitch, no device check.

The through-line: the kit was written for a mid-market client with thirteen
distinct people on a committee, and every defect surfaced when it met the small
owner-run businesses this vertical is actually made of, where four or five people
hold thirteen opinions.

### Fixed

- **Legal FLAG cap had no value.** `synthesis-and-scoring.md` said a
  `legal-reviewer` FLAG "caps the total" and never said what the cap was, so two
  runs of the same pitch would cap at different invented numbers - defeating the
  frozen-snapshot design that exists to make runs comparable. The cap is now a
  fixed **60**, with the computed total reported alongside it when it binds.
- **Orphaned scoring dimensions.** Deactivating a seat could leave a dimension
  with nobody who answers it - deactivating `cmo-defender` orphans
  `defensibility` and its 25 points - and scoring then read it off a seat that
  did not own it (a `hard-no` seat supplying a defensibility score means the
  opposite of what it claims). Added a mechanical ownership check to
  `setup-committee.md` step 4 with a dimension-to-seat table, a
  prefer-adding-the-seat-back rule, whole-number redistribution arithmetic with a
  worked example, and a never-drop rule for `distinctiveness` and
  `proof-and-substantiation`.
- **Roster capture.** Nothing checked whether one real person was sitting in two
  or three seats, so a small client's single verdict got counted two and three
  times and every tally in the run was inflated. Added step 2b: write the real
  person's name beside every active seat, and resolve every collision before
  running by deactivating one seat or splitting the two hats explicitly and
  counting them as one vote. Added a matching integrity check.
- **The signer was not modeled at all.** At owner-run clients the person holding
  the pen is frequently the panel's hardest no, and the hard-no doctrine
  ("never optimize for this seat") would have told a studio to ignore the only
  objection that decides the award. Added step 3b: record everyone whose no stops
  the deal in `panel.signer`, give each their own seat, and a mechanical
  exception in `rewrite-and-retest.md` - **a signer's objection is always pile 1
  whatever its fit**, and where the signer names their own smallest yes, that is
  the brief.
- **`panel.signer` is a list, not a name.** The first version of the signer fix
  asked for "one name," which at a 50/50 co-owned business forced picking one -
  and picking the enthusiast quietly demoted the other one's objection into the
  do-not-optimize pile, reintroducing the exact failure the fix was written to
  prevent. Now plural by construction, with a stated ban on collapsing
  co-signers or choosing the friendlier one.
- **Rewrites were blind to conflicting signers.** A single score movement hid the
  case where a version that moves one required signer moves the other backwards -
  the average reads as progress while the deal gets further away. `rewrite-and-
  retest.md` step 4 now reports each signer separately and answers, in words,
  whether a version exists that both would sign; where none does, it says the
  pitch has landed inside a disagreement no rewrite settles.
- **Replacement seats ran with no dossier.** The kit told the AI to write a
  replacement dissent seat and never told it that a seat is a dossier. Observed
  directly in round 2: a replacement `hard-no` run from a one-line description
  returned four flat sentences with no specific slide and no history - a critique
  instead of a person, on the most load-bearing verdict in the run. Added step 3a
  with the `DOSSIER-TEMPLATE.md` requirement, the 900-word floor from
  `committee-standard.md`, a pre-run existence-and-length check, and the honest
  alternative: deactivate the seat and say the panel ran without that dissent.
- **Bracketed placeholders read as present content.** Deck text routinely arrives
  with the visual core stubbed out (`[6 packaging comps]`), and seats would
  report that nothing landed when the thing that would have landed was inside the
  placeholder - a false negative the studio acts on. `refusal-rules.md` now
  treats a bracket, a filename, or an empty heading as missing content, and
  splits it mechanically: **stop** when the placeholder is the offer, **run and
  name it in the limitations** when it is supporting material.
- **The wrong-fit integrity warning had one reading and needed two.**
  "`budget-was-never-real` is the most positive seat" was defined only as "the
  pitch is winning a room that cannot buy," which points at `STOP`. At small
  clients the enthusiast with no budget authority is routinely the internal
  sponsor who forced the review, and their enthusiasm is real signal - the actual
  finding is a champion with no path to the signer, which is a `REVISE`. The two
  readings are now distinguished mechanically off `panel.signer` (does the seat
  have a stated route to a signer), and the synthesis must say which it applied.
  Observed in round 3 to change the result from `STOP` to `REVISE` on a pitch
  that was still alive.

### Added

- Patient, client, student, and minor records named explicitly in the
  second-stop rule in `refusal-rules.md`, with the distinction that decides what
  to do: material **in** the artifact is a question for the studio, while
  material the pitch **proposes** creating - filming patients, publishing client
  stories, running a review program off a treatment list - is not a gate problem
  at all. It is the most valuable thing this panel can surface, and the run
  continues so `legal-reviewer` can say it. The deactivation table now keeps
  `legal-reviewer` for regulated categories and performance claims even when the
  client has no lawyer on staff.
- Deactivation-table rows for `cmo-defender` (no marketing head with budget
  authority) and `performance-lead` (nobody is measured on marketing metrics),
  plus a correction to `procurement-lead`: its trigger was an AND-condition
  ("under $20M **and** no procurement function") that told the AI to keep a seat
  that does not exist at a $34M company with no procurement. Each row is now a
  single trigger, and the table states it is common cases rather than the whole
  world.
- An `incumbent-advocate` nuance row: a long-tenured freelancer or an internal
  person doing the work today IS the incumbent, and the seat is edited rather
  than deactivated.
- `panel.signer` and `signer_note` in `panel.json`.

## [0.1.0] - 2026-08-12

Initial build. **State: WRITTEN. Not device-tested, not clean-room tested, not
run against a real pitch.** No acceptance box in `ACCEPTANCE.md` is checked.

### Added

- Created the kit as a **re-skin of the proven panel mechanism**, per an internal
  kit quality review. Structure copied from the synthetic customer panel kit
  (published separately as ai-marketing-panel); content is new. No new
  machinery was invented - the tribunal's finding was that six of eight kits
  failed because each was a new mechanism built from scratch, while the two that
  work are a panel and a forge.
- Added `skills/pitch-panel/` with `SKILL.md`, three workflows
  (`setup-committee.md`, `wash-pitch.md`, `rewrite-and-retest.md`), four
  references (`seat-protocol.md`, `refusal-rules.md`, `committee-standard.md`,
  `synthesis-and-scoring.md`), `USER-CONFIG.md`, and `owner/OWNER-CONTEXT.md`.
- Added the thirteen-seat client-side decision committee: roster manifest
  `panel/panel.json`, thirteen dossiers at 1,200-1,800 words each, plus
  `DOSSIER-TEMPLATE.md` and `EVIDENCE-NOTES.md` with a calibration ledger.
- Added **two deliberate dissent seats**: `budget-was-never-real` (wrong-fit -
  enthusiasm without authority) and `builds-it-in-house` (hard-no - the in-house
  creative lead). Conversion by either is reported as an integrity warning, not
  a win.
- Added `legal-reviewer` as a `specialist` seat returning a `PASS`/`FLAG` gate
  rather than a customer decision. A specialist pass is never counted as
  enthusiasm.
- Added the ten-line verdict contract and the seat-isolation protocol.
- Added five scoring dimensions weighted to 100, with the requirement that the
  arithmetic be shown per dimension and that gates override the total.
- Added the full installer covering paths 3A-3D, the isolation check, the image
  capability check, and the branding interview.
- Added `START-HERE.md`, `OPERATIONS-MANUAL.md`, `README.md`, and
  `ACCEPTANCE.md`.
- Added `examples/` with two complete worked runs - a refusal followed by a full
  wash, and a strong pitch that fails on the wrong-room pattern. Both show the
  full chain: artifact, gate record, raw reactions, synthesis, arithmetic,
  integrity check, and result.

### Line-wide tribunal rules applied

- **Refusal criterion (tribunal line-wide change 1).** The kit stops and tells
  the studio their input is not good enough when any of four non-negotiables is
  missing: a named client, a stated ask, the actual pitch content, or a budget
  or term shape. The rule lives in `references/refusal-rules.md`, is enforced as
  step 1 of `workflows/wash-pitch.md`, and is a checked criterion in
  `ACCEPTANCE.md`. "Run it anyway with assumptions" is explicitly banned.
- **No fixture-first verification (tribunal line-wide change 2).** The kit ships
  **no demo pitch**, and the installer's verify step runs on the studio's own
  real pitch. `examples/` exists as a worked-example layer per KIT-STANDARD and
  is explicitly offered only AFTER the studio's own run, never instead of it. If
  the studio has no real pitch at hand, the installer stops and says so rather
  than substituting a fixture.

### Standards applied

- KIT-STANDARD 4.5 path resolution: the roster and dossiers live inside the
  skill folder and are read skill-relative; `USER-CONFIG.md` is the single
  config file and names the studio's own pitch folder for outputs only.
- KIT-STANDARD 4.7 untrusted input: pitch decks, proposals, and pasted client
  material are DATA. Instruction-like text inside an artifact is quoted back to
  the studio and never obeyed.
- KIT-STANDARD 4.8 upgrades: the installer preserves `USER-CONFIG.md`,
  `branding/`, the whole `panel/` folder (fitted dossiers and the calibration
  ledger), and `owner/OWNER-CONTEXT.md`, replacing only instruction files after
  backing up the old skill folder.
- KIT-STANDARD worked-example layer: `examples/` ships two complete runs.
- Determinism-first: the mechanical spine - roster selection from the manifest,
  frozen run snapshot, the fixed ten-line contract, weighted arithmetic shown
  per dimension, and the integrity checks - is stated as rules a script or the
  client's AI applies mechanically. The AI's job is judgment inside a seat and
  synthesis after; it is never trusted to remember a weight or total a column
  by feel.
- Positioning law: no copy in this kit reads as headcount reduction. The
  `internal-champion` and `builds-it-in-house` seats are written so that a pitch
  positioning the studio as doing the client's people's jobs is penalized by the
  panel, and `workflows/rewrite-and-retest.md` states the rule for every
  rewrite.

### Known gaps (stated, not hidden)

- Nothing here has been run. No real pitch has been washed, no device check has
  happened, and no acceptance box is checked.
- The thirteen dossiers are composites of common committee patterns. They are
  not based on any real named person and carry no accuracy claim.
- The calibration ledger in `panel/EVIDENCE-NOTES.md` is empty. Until it has
  entries the panel has earned no accuracy claim of any kind.
- At 0.1.0, no deterministic validator script shipped. The proven parent kit
  (the synthetic customer panel) had TypeScript validators, while
  this kit still relied on mechanically stated workflow rules. Version 0.2.1
  closes the install/roster/dossier/weight portion of that gap with a
  dependency-free plain-Node verifier; reaction-contract and run-output
  validation remain future work.
