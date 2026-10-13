# Client-Pitch Panel

Put a pitch in front of a simulated client-side buying committee before it goes
in front of the real one.

**State: written, not field-proven.** Version 0.2.2. The kit has been run by AI
agents against invented studios and clients: the 0.1.1 workout pass found and
fixed nine defects, and later review passes fixed more (see `CHANGELOG.md`).
No real studio has washed a real pitch through it, no box in `ACCEPTANCE.md` is checked, and no human has done a
device install check. Treat it as a careful draft, not a tested product.

## What it is

You are a studio, agency, or freelancer with a pitch deck, a creative concept,
or a proposal. The kit hands it to thirteen client-side decision-maker
composites: the CMO who has to defend the choice, the procurement lead who
reads price and terms first, the finance partner, the legal reviewer, the
in-house creative lead who thinks they could build it themselves, and so on.
Each seat has a long written dossier. Each one reads the pitch alone, in its
own context, without seeing what the others said, and answers one question:
**would you award this?**

Two of the thirteen are built to say no. One is enthusiastic but has no real
budget authority; one is the in-house team that would rather do it themselves.
A pitch that wins them over on polish is flagged as an integrity warning, not
counted as a win.

You get back:

- a decision table, one row per seat;
- the dissent, quoted in each seat's own voice;
- a weighted scorecard with the arithmetic shown per dimension;
- an integrity check on the run itself, reported even when clean;
- an award-ready / revise / stop call;
- on request, three rewritten pitch angles and a retest.

## Why it exists

Gathering real client-side reactions before a pitch is a research project:
recruit decision-makers in the client's category, schedule them, moderate,
write it up. Studios do not do that, so the objection shows up in the room
instead, or three weeks later as "we went another direction."

| | Commissioned decision-maker research | This kit |
| --- | --- | --- |
| Cost | roughly $20,000 and up | a few dollars of model usage |
| Turnaround | weeks | about ten minutes |
| What you get | real people | researched composites |

Both figures are unmeasured estimates. The research figure is an order of
magnitude and moves a lot by scope and market. The per-run cost depends on the
model, the number of active seats, and the length of the deck. Price your own
run before you quote it to anyone.

The last row is the honest part, and it does not favour the kit. These are
composites, not the client's actual committee. What the kit buys is a chance to
hear an objection while there is still time to answer it. It does not replace
talking to the client.

## How it is built

The structure is copied from an earlier synthetic customer panel kit
([ai-marketing-panel](https://github.com/rodaddy/ai-marketing-panel)), re-pointed
from "would you buy this" to "would you award this":

- the roster comes from `panel/panel.json` and nothing else, never a folder scan;
- the roster and weights are frozen into the run before any seat runs;
- every seat runs isolated and returns the same fixed ten-line reaction;
- synthesis and scoring happen only after every reaction is closed;
- the score is per-dimension arithmetic, shown, and the total is its sum.

The AI's judgment is used in two places only: inside a seat, reacting as that
person, and in synthesis afterwards. It is never trusted to total a column or
remember a weight.

## It refuses bad input

Before running any seat, the panel checks for four things:

1. a named or described client;
2. a stated ask;
3. the actual pitch content, not a summary of it;
4. a budget or term shape, or an explicit "we left money out on purpose."

If one is missing, it stops, says what is missing and why the panel cannot
judge without it, and asks. It does not offer to run on assumptions, because
an invented input produces a result that looks exactly like a real one. Rule:
`skills/pitch-panel/references/refusal-rules.md`.

## How to run it

The kit is markdown plus one bash script and one dependency-free Node script.
It does not need a server, an account, or a package install.

1. Download or clone this repo (or zip it).
2. Open `START-HERE.md` for device-by-device steps. The short version: give
   `installer.md` to your AI (Claude app, Claude Code, Codex, ChatGPT, Gemini)
   and say **install client pitch panel**.
3. The installer detects what your AI can do and picks a path: a coding agent
   with file access copies the skill into place; a chat app that takes skill
   zips gets a zip; a Projects/Gems setup gets a condensed form; a plain chat
   loads it into the conversation.
4. It verifies the install by running your own real pitch through the panel.
   The kit ships no demo pitch on purpose. If you have no real pitch to hand,
   the installer stops and tells you to come back.

Optional local checks, from the repo root:

```text
node skills/pitch-panel/scripts/verify-kit.mjs
bash skills/pitch-panel/scripts/room.sh --help
```

`verify-kit.mjs` checks the roster, dossier paths, the 900-word dossier floor,
seat counts, and that scoring weights are integers totalling 100. It needs
plain Node 22.6.0 or newer, no `npm install`. `room.sh` manages named "rooms"
(a fitted committee you can reset between decks, archive, or run in parallel)
and needs only bash 3.2 and coreutils.

### What you lose on weaker hosts

- **Coding agent with subagents** (Claude Code today): seats run isolated and in
  parallel. This is what the kit is written against.
- **Shell but no subagents**: same gates, seats run one at a time in fresh
  contexts. Slower, otherwise equivalent.
- **Chat only** (no shell): `room.sh` and the verifier cannot run, the refusal
  gate and arithmetic become self-report, and all seats share one context. The
  run is labelled degraded and later seats may be influenced by earlier ones.

| Harness | Status |
| --- | --- |
| Claude app (zip upload) | install path verified 2026-08-12 on a sibling kit, not this one |
| Codex (folder) | install path verified 2026-08-12 on a sibling kit, not this one |
| claude.ai web | unverified, never tested |

## What it does not do

- It does not predict the award and is not client research.
- It does not send, publish, price, approve, or submit anything.
- The `legal-reviewer` seat is a modelled gate, not legal review.
- The thirteen seats are composites of common committee patterns. None is a
  real named person and none is based on a particular client.
- The calibration ledger in `skills/pitch-panel/panel/EVIDENCE-NOTES.md` is
  empty, so the panel has earned no accuracy claim of any kind.
- Reaction-contract and score-arithmetic checks are still workflow rules, not
  code.

## Layout

```
START-HERE.md          how to get installer.md to your AI
installer.md           self-adapting installer
OPERATIONS-MANUAL.md   plain-language driving manual
ACCEPTANCE.md          what has to be true before you rely on it (nothing checked)
CHANGELOG.md
examples/              two complete worked runs, invented studios and clients
skills/pitch-panel/
  SKILL.md
  USER-CONFIG.md       the one settings file
  workflows/           setup, wash, rewrite, room lifecycle
  references/          seat protocol, refusal rules, committee standard, scoring
  scripts/             room.sh, verify-kit.mjs
  panel/               panel.json, 13 dossiers, template, evidence notes
  owner/               owner context, read by synthesis only, never by seats
tiers/basic/           notes on the single shipped tier
```

## License

MIT. See `LICENSE`.

Built by Rico Rojas at rTech Digital Consulting (https://rtech-consulting.com).
