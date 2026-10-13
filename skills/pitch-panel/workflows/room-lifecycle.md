# Room Lifecycle

A **room** is a named committee instance: its own roster, its own seats, its own
runs. Rooms never share state, so several can run at the same time — five pitch
variants in front of five separate committees, at once.

This workflow covers four things studios actually ask for:

1. "Run it again on the revised deck, right now." → **clean**
2. "This client has no procurement lead — swap the room." → **seat bounce /
   seat refresh**
3. "Give me a second committee for the other client." → **room new**
4. "Wash all five concepts at once." → **parallel rooms**

The script owns every file operation. The AI owns dossier CONTENT and nothing
else. Nothing is ever deleted - every removal is a move into `_archive/`.

Run `room.sh` from the kit folder. It uses bash and the standard command-line
tools that ship with every Mac and Linux box. Run `verify-kit.mjs` with plain
Node 22.6.0+; there is no package install or build step.

---

## This kit ships its committee inside the skill folder

Read this before running anything, because this kit's layout differs from the
workspace-style panel kits.

The shipped 13-seat committee lives at `panel/panel.json` and
`panel/dossiers/` **inside this skill folder**, and it is the neutral starting
roster. A ROOM is a per-client copy of that committee plus that client's runs.

There are two honest ways to work, and the kit supports both:

- **One client, no rooms.** Keep using `panel/panel.json` in the skill folder
  exactly as `workflows/setup-committee.md` describes, with runs under the
  `pitch folder:` from `USER-CONFIG.md`. Nothing changes. Rooms are additive.
- **Several clients, or several concurrent washes.** Give each its own room, so
  one client's deactivations never bleed into another's committee.

**Run every command below from the KIT ROOT** — the folder holding `README.md`,
`START-HERE.md`, and `skills/`. `rooms/` is created there, not inside the skill
folder. `room.sh` walks up to find the kit root and will tell you plainly if you
are somewhere else.

To create the first room from the shipped committee, from the kit root:

```bash
bash skills/pitch-panel/scripts/room.sh room new acme-rebrand --from shipped
node skills/pitch-panel/scripts/verify-kit.mjs --room acme-rebrand
```

Then, still from the kit root:

```bash
bash skills/pitch-panel/scripts/room.sh room list
```

`room.sh` reads both layouts: a roster at the room root (`panel.json`) or nested
(`panel/panel.json`), which is the shape above. Seat dossier paths resolve
relative to whichever folder holds the roster.

---

## Where a room lives

```
rooms/
├── DEFAULT                  # optional: one line, the default room's name
├── acme-rebrand/            # one client's committee
│   ├── panel/panel.json     # the roster — SEATS (kept by clean)
│   ├── panel/dossiers/      # the seats themselves (kept by clean)
│   ├── runs/                # KNOWLEDGE (wiped by clean)
│   ├── inputs/              # KNOWLEDGE (wiped by clean)
│   ├── _staging/            # authoring prompts waiting for the AI
│   └── _archive/            # everything clean/bounce/refresh moved out
└── northwind-pitch/         # another client, fully independent
```

**Knowledge vs seats is the distinction this whole workflow exists to make.**
Knowledge is what the room LEARNED: runs, reactions, verdicts, scorecards, the
decks it already read. Seats are WHO IS IN IT: the roster and the dossiers.
`clean` wipes the first and never touches the second.

---

## 1. Rerun five minutes later — same committee, revised deck

The most common request. The committee is right for this client; it just needs
to forget the version it already read, so the revision gets a genuinely fresh
verdict rather than a reaction coloured by the previous draft.

```bash
bash skills/pitch-panel/scripts/room.sh clean --room acme-rebrand
```

What happens: `runs/` and `inputs/` move to `_archive/<timestamp>/`. The roster
and every dossier stay exactly where they were. Then the script checks the room
is rerun-ready and says so.

Always look first if you are unsure:

```bash
bash skills/pitch-panel/scripts/room.sh clean --room acme-rebrand --list
```

`--list` prints what WOULD move and changes nothing.

**Why clean instead of a new room:** the same committee reading v1 and then v2
is the only way the two verdicts are comparable. A different roster is a
different committee, and comparing its score to the old one is comparing two
different experiments.

**What clean does NOT do:** it does not relax the refusal gate. A revised deck
still has to carry a named client, a stated ask, real pitch content, and a
budget or term shape before any seat runs. See the refusal rules in `SKILL.md`.

---

## 2. Seat operations — change who is in the room

### See who is in it

```bash
bash skills/pitch-panel/scripts/room.sh seat list --room acme-rebrand
```

### Bounce seats (take them out)

The right-sizing move from `workflows/setup-committee.md`, done mechanically.
A four-person client has no procurement lead and no finance partner:

```bash
bash skills/pitch-panel/scripts/room.sh seat bounce procurement-lead finance-partner --room acme-rebrand
```

Their dossiers move to `_archive/<timestamp>/bounced-seats/` and their roster
entries flip to `"active": false`. The entries stay in the roster, so a later
reader can see the committee changed shape and why the tallies differ.

Two checks from `setup-committee.md` still apply after any bounce. Run
`node skills/pitch-panel/scripts/verify-kit.mjs --room acme-rebrand`; it enforces
the active-seat and dissent floor. The dimension-to-seat ownership review remains
a manual setup checklist:

- **Five to fifteen active seats**, always keeping at least one core seat and
  at least one seat built to say no. Bouncing both `budget-was-never-real` and
  `builds-it-in-house` leaves a committee that cannot tell you anything.
- **No orphaned dimensions.** Bouncing `cmo-defender` orphans `defensibility`
  and its 25 points. Either add the seat back in the form this client actually
  has, or drop the dimension and redistribute its weight.

### Refresh seats (bounce, then rebuild from new criteria)

This is the "make new ones based on new criteria" move — the same seat slot,
rebuilt for who this client actually has in the room.

```bash
bash skills/pitch-panel/scripts/room.sh seat refresh procurement-lead \
  --criteria "Owner-operator who does their own procurement, signs personally, and has never run an agency RFP" \
  --room acme-rebrand
```

The script does the mechanical half, 100% of the time:

- archives each old dossier to `_archive/<timestamp>/refreshed-seats/`;
- sets each seat `"active": false`;
- writes one filled authoring prompt per seat into `_staging/<timestamp>/`,
  naming the exact dossier path to write and carrying the new criteria.

Then the AI does the half only it can do: write the dossier the prompt asks
for, following `references/committee-standard.md`, and set the seat back to
`"active": true`.

`--criteria` is required. Without new criteria there is nothing to rebuild
from, and the script refuses rather than regenerating the same person.

**The script never writes dossier content.** Every dossier still separates what
it is based on from what is modeled, and is still materially different from
every other seat in the room. A refresh that produces a near-copy of the seat it
replaced has not refreshed anything.

---

## 3. Room operations

```bash
# a second client's committee, same seats, none of the first client's history
bash skills/pitch-panel/scripts/room.sh room new northwind-pitch --from acme-rebrand

# every room, its active seat count, its run count
bash skills/pitch-panel/scripts/room.sh room list

# put a finished client's room away (a move, not a delete)
bash skills/pitch-panel/scripts/room.sh room archive acme-rebrand
```

`room new --from` clones the seats and takes none of the knowledge. The clone
gets its own roster file, so deactivating a seat for one client leaves every
other client's committee untouched.

---

## 4. Running several rooms at once

Rooms are independent directories and no command writes outside the room it was
given, so five or six full committees can run at the same time — **on a harness
that can orchestrate subagents (T1)**. This is what makes washing five concept
directions in one sitting practical. Concurrency here means **subagents running
workflows**, one subagent per room, each owning that room end to end. It does
NOT mean `claude -p`, and it does NOT mean backgrounding shell commands with
`&`.

Staging the rooms is cheap and sequential either way:

```bash
for name in concept-a concept-b concept-c concept-d control; do
  bash skills/pitch-panel/scripts/room.sh room new "$name" --from acme-rebrand
done
```

Then run each room's wash per `workflows/wash-pitch.md`, one artifact per room:

- **T1** — dispatch one subagent per room, each running the full wash workflow.
- **T2 (shell-only)** — run the rooms one after another. Identical results,
  longer wall clock.
- **T3 (chat-only)** — one room at a time, by hand, from the templates.

Rules that make parallel rooms safe:

- **Right-sizing is per room.** Every room must independently satisfy the seat
  count, the keep-a-dissenter rule, and the no-orphaned-dimension check. A
  correct committee next door proves nothing about this one.
- **One deck per room.** Comparing concepts is only meaningful when every room
  has the same seats; if you cloned with `--from`, they do.
- **Never point two concurrent commands at the same room.**
- **Isolation between rooms is structural** (separate directories), while
  isolation between SEATS is still whatever the runtime provides. A
  `sequential-shared-context` run is still degraded and still labeled as such.

---

## The default room

A studio with one client never types `--room`. Commands fall back to the name in
`rooms/DEFAULT`, or to `default`.

```bash
echo "acme-rebrand" > rooms/DEFAULT
```

---

## Migration from the flat layout

If you have been running the shipped committee directly out of `panel/` in the
skill folder, nothing is broken and nothing has to change. To adopt rooms, run
`room new <name> --from shipped` as shown at the top of this file. The original
`panel/` stays as the neutral shipped roster that new rooms are cloned from.

---

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | the command did what it said |
| `1` | the thing under test failed — room not ready, seat not found, bad input |
| `3` | harness error — not in a kit, cannot write, missing directory |

`room.sh` refuses to run outside a kit folder, refuses room names containing
slashes or spaces, and never deletes anything.
