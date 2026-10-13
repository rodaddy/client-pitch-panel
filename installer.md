# Client-Pitch Panel - Installer

> You are reading the Client-Pitch Panel installer.

**Version:** 0.2.2
**Created by:** Rico Rojas / rTech Digital Consulting
**Package contents:** `START-HERE.md` (read that first if you're the user),
this file, `skills/pitch-panel/` - which holds `SKILL.md`, a `workflows/`
folder, a `references/` folder, `USER-CONFIG.md`, the `panel/` folder (the
roster `panel.json`, thirteen dossiers, and `EVIDENCE-NOTES.md`), and
`owner/OWNER-CONTEXT.md` - plus `OPERATIONS-MANUAL.md`, `README.md`, and
`examples/` (two complete worked runs).

---

## What This File Does

You are an AI assistant (Claude, ChatGPT, Gemini, Codex, or any LLM reading
this). This file tells you how to:

1. Detect what runtime you are and what your host platform requires
2. **Transform this package into whatever your host needs** - never declare it
   incompatible
3. Confirm you can run seats in separate contexts, and record what you can
   actually do
4. Install the Pitch Panel skill with its full thirteen-seat roster
5. Run a short branding interview
6. Fit the committee to the studio's real client
7. Verify the install by washing **the studio's own real pitch** - never a demo

**Do not summarize this file. Do not explain what you are about to do. Begin
with Section 1 now.**

---

## Section 1: Installation Trigger

When the user shares this file or says "install client pitch panel," begin
immediately. Greet them with one line: "Let's set up the Client-Pitch Panel -
I'll handle the setup and ask you a few questions about a real pitch you're
working on. Takes about fifteen minutes." Then proceed to Section 2.

Say "a real pitch you're working on" in that first line. The verify step needs
one, and mentioning it now means they are not surprised later.

---

## Section 2: Detect Your Runtime

Determine which of these you are. Do not ask the user technical questions you
can answer yourself by testing your own capabilities.

| You are... | Signs | Go to |
| --- | --- | --- |
| **A coding agent with filesystem access** (Claude Code, Codex CLI, or similar) | you can run shell commands and write files to the user's disk | 3A |
| **A chat app that supports uploaded skills** (Claude app: web, desktop, mobile) | no filesystem access, but your platform accepts **zip uploads** as skills | 3B |
| **A chat app with projects/custom instructions but no skills feature** (ChatGPT Projects, Gemini Gems, or similar) | no filesystem, no skill uploads, but persistent instructions exist | 3C |
| **A plain chat session** - none of the above | no filesystem, no skills, no persistent instructions | 3D |

If genuinely unsure between two rows, ask ONE question: "Are we in the Claude
app, ChatGPT, or a terminal?" and map the answer to the closest row.

**The rule that governs everything below: this package is ONE canonical set of
folders and markdown files. If your host needs a different shape - a zip,
pasted instructions, anything - YOU produce that shape from the canonical
files, right now, yourself. "This package doesn't work here" is never the
answer. Adapt the package to the host.**

---

## Section 3A: Coding agent with filesystem access

1. Locate your skills directory: `~/.claude/skills/` (Claude Code),
   `~/.codex/skills/` (Codex CLI), or your platform's equivalent. Create it if
   missing.
2. **Collision check first - and if it's THIS kit, offer an upgrade.** Before
   copying anything, check whether a `pitch-panel` skill folder already exists
   in the skills directory.
- **Same kit already installed (an upgrade).** If the existing
     `pitch-panel/` is a previous Client-Pitch Panel, read its `VERSION` file;
     **if you can't determine the version, treat the installed copy as older.**
     Then ask ONE question: *"You have v<old>; this is v<new> - upgrade keeping
     all your data, or skip?"*
- **On upgrade:** first back up the old skill folder by recursively copying the
       existing `pitch-panel/` to `pitch-panel.backup-<old-version>` (e.g.
       `pitch-panel.backup-0.1.0`; if the version is unknown, use
       `pitch-panel.backup-YYYYMMDD`). Keep the installed folder in place, then
       replace ONLY the instruction and deterministic tooling that ships in this
       package: `SKILL.md`, `VERSION`, and everything under `workflows/`,
       `references/`, and `scripts/`. **NEVER overwrite the user's own data.**
       The protected files and folders that carry over untouched are:
       `pitch-panel/USER-CONFIG.md`, the entire `pitch-panel/branding/` folder,
       the entire `pitch-panel/panel/` folder (the roster and dossiers the
       studio has fitted to their clients, plus `EVIDENCE-NOTES.md` with its
       calibration ledger), and `pitch-panel/owner/OWNER-CONTEXT.md`. The
       studio's pitch folder (`pitches/`, `runs/`, recorded as `pitch folder:`
       in `USER-CONFIG.md`) is outside the skill folder and is untouched by
       definition. Do NOT re-run the branding interview, re-run the committee
       setup, or re-seed the roster: an upgrade keeps every fitted dossier and
       every calibration entry.
- **On skip:** leave the installed kit exactly as-is and stop.
- **A different, unrelated skill happens to be named `pitch-panel`.** Do NOT
     silently overwrite: tell the user it collides and ask "replace, keep yours,
     or back yours up first?" For "back up," rename the existing folder to
     `pitch-panel.backup-YYYYMMDD` before copying.
3. Copy `skills/pitch-panel/` into it **recursively - the ENTIRE folder, every
   nested file**: `SKILL.md`, `VERSION`, `USER-CONFIG.md`, all four files under
   `workflows/` (`setup-committee.md`, `wash-pitch.md`,
   `rewrite-and-retest.md`, `room-lifecycle.md`), all four files under
   `references/` (`seat-protocol.md`, `refusal-rules.md`,
   `committee-standard.md`, `synthesis-and-scoring.md`), both files under
   `scripts/` (`room.sh`, `verify-kit.mjs`), the whole `panel/` folder (`panel.json`,
   `EVIDENCE-NOTES.md`, and all fourteen files under `panel/dossiers/` - the
   thirteen seats plus `DOSSIER-TEMPLATE.md`), and `owner/OWNER-CONTEXT.md`.
   Never copy just `SKILL.md`. **A panel folder missing dossiers installs as a
   silently broken skill** - the roster names files that are not there and every
   wash fails at the first seat.

   **The roster and dossiers stay INSIDE the skill folder** - that is where the
   skill reads them, skill-relative, and that is correct by construction. Do not
   move them out to the pitch folder.
4. **Set up the user-facing pitch folder (pitches in, runs out).** Ask the user
   where it should live (default: `~/Documents/pitch-panel/`). Create that
   folder and, inside it, create two subfolders:
- `pitches/` - the studio drops deck text, concepts, and proposals here;
- `runs/` - one dated folder per wash, holding the frozen artifact, the
     frozen roster, the reactions, and the result.

   Copy `OPERATIONS-MANUAL.md` and the `examples/` folder into the pitch folder
   too, so both survive after the unzipped package is deleted.
5. **Record the pitch folder path - ALWAYS, default or custom.** Open the
   installed `skills/pitch-panel/USER-CONFIG.md` and set the `pitch folder:` key
   to the path the user chose (write `~/Documents/pitch-panel/` even when they
   took the default). Every workflow reads this file to find `pitches/` and
   `runs/`. The roster and dossiers are NOT in this file - they live in the
   skill folder and are read skill-relative.
6. Do the **Isolation check (Section 3.5)**, the **Image capability check
   (Section 3.6)**, and the **Branding interview (Section 4)**.
7. Assert the install from the unzipped kit root. Confirm the installed
   `pitch-panel` folder has `SKILL.md` (frontmatter `name:` is `pitch-panel`),
   `VERSION`, `USER-CONFIG.md` (with a filled-in `pitch folder:` value), all four
   workflow files, all four reference files, `scripts/room.sh`,
   `scripts/verify-kit.mjs`, `panel/panel.json`, and **all thirteen seat
   dossiers**. Run the installed verifier, pointing it at the installed folder:

   ```text
   node skills/pitch-panel/scripts/verify-kit.mjs --skill-root ~/.claude/skills/pitch-panel
   ```

   Replace that example path with the platform's installed `pitch-panel` folder
   when it is not Claude Code.

   Confirm exit code 0 and report "13 of 13 dossiers
   present." Then confirm the pitch folder holds `pitches/` and `runs/` and go
   to Section 5.

## Section 3B: Chat app with skill uploads (zip required)

Your platform accepts skills only as zip archives. The zip is not in this
package - **you create it:**

1. Using your code-execution / file-creation capability, create ONE zip of the
   `skills/pitch-panel/` folder. Exact layout:
- every archive path must start with `pitch-panel/` - nothing above it. NOT
     `skills/pitch-panel/`, NOT a wrapping package folder, NOT a bare `SKILL.md`
     at the root. Do not rely on archive-entry order; some zip tools omit an
     explicit directory entry.
- include the folder's ENTIRE contents recursively: `SKILL.md`, `VERSION`,
     `USER-CONFIG.md`, all four files under `workflows/`, all four under
     `references/`, both files under `scripts/`, the whole `panel/` folder including all fourteen files under
     `panel/dossiers/`, and `owner/OWNER-CONTEXT.md`. **A zip missing
     `panel/dossiers/` installs as a silently broken skill** - verify the
     archive listing shows all thirteen seat files before handing it over.
- exclude OS junk: no `__MACOSX/`, no `.DS_Store`.
- sanity-check the archive's listing against these rules before handing it
     over, and say the dossier count out loud.
2. Give the user the zip as a downloadable file. If you built it but your
   platform cannot deliver files to the user, fall through to Section 3C - do
   not stop.
3. Tell the user the upload steps. Current Claude app labels: "Settings ->
   Capabilities -> turn ON Code execution and file creation (one-time), then
   Settings -> Customize -> Skills -> upload this zip -> toggle it on." Add: menu
   labels change between versions - look for the Skills and Capabilities
   sections in Settings.
4. If you cannot create zip files here at all, fall through to Section 3C and
   install the condensed form instead - do not stop.
5. There are no folders on the user's disk here, so the shipped `USER-CONFIG.md`
   already reads `pitch folder: chat only` - leave it. Pitches are pasted into
   the chat and runs come back as text in the conversation.
6. Do the **Isolation check (3.5)**, the **Image capability check (3.6)**, and
   the **Branding interview (4)** now - they need no upload round trip.
7. **PAUSE here.** The user must leave the chat, upload, and toggle - that
   happens outside this conversation. Say: "Tell me when it's uploaded and
   toggled on, and we'll run your real pitch through it." Only when the user
   confirms, go to Section 5.

## Section 3C: Projects / custom instructions, no skills feature

Your platform holds persistent instructions but not skill files. Condense the
package yourself.

**Be honest with the user about what this path costs.** Thirteen dossiers at
1,200-1,800 words each will not fit in a custom-instructions field. Condensing
them into one-paragraph summaries produces thinner, more generic reactions - the
dossier detail is what makes a seat react as a person rather than as a critic.
Say this plainly, then do the best available version, and tell them the full
version is available in the Claude app or a coding agent.

1. **Get the source files in front of you FIRST - you cannot condense what you
   cannot see.** The user handed you only `installer.md`, so the rest of the kit
   is not yet visible to you. Before reading or condensing anything, tell the
   user exactly which files from the unzipped kit folder to add to the
   Project/Gem as sources, then STOP and wait for them to confirm. Name them
   fully, spelled out from the kit root:
- `skills/pitch-panel/SKILL.md`
- `skills/pitch-panel/references/refusal-rules.md`
- `skills/pitch-panel/references/seat-protocol.md`
- `skills/pitch-panel/workflows/wash-pitch.md`
- `skills/pitch-panel/panel/panel.json`
- all thirteen files in `skills/pitch-panel/panel/dossiers/`
- `OPERATIONS-MANUAL.md`

   Say: "Add those to this Project/Gem as sources, then tell me when they're in
   and I'll build your condensed instructions."

   **Fallback if the platform caps Project files** (free plans often cap around
   five): ask the user to paste the contents in the chat one at a time - same
   read-set, different transport. Prioritize in this order if they can only
   supply some: the thirteen dossiers first (they ARE the panel), then
   `refusal-rules.md`, then `seat-protocol.md`, then `SKILL.md`. "I can't see
   those files" is never a dead end.
2. Only once the sources are in front of you, read the WHOLE package.
3. Write a single instruction document (~2 pages) that preserves, in priority
   order:
   1. **THE REFUSAL GATE** - first and loudest. The four non-negotiables
      (named client, stated ask, actual pitch content, budget or term shape),
      and the instruction to STOP and ask rather than run with assumptions.
   2. the thirteen seats by id, name, kind, fit, and their one-line decision
      signal - **including which two should say no and why their conversion is
      a warning**;
   3. the ten-line verdict contract, exactly;
   4. the rule that seats run one at a time, alone, never seeing each other or
      the scoring weights;
   5. the five scoring dimensions with their weights, and the requirement to
      show the arithmetic;
   6. the integrity checks (all-yes panel, hard-no converting, wrong-fit most
      positive);
   7. the award-ready / revise / stop grammar;
   8. the honest disclaimer (composites, not the client; objections, not a
      prediction).
   Then attach the thirteen dossiers as Project sources so seats can read them
   in full at run time even though they are not in the instruction field. State
   plainly what a chat platform cannot do: no true parallel isolation, so seats
   run sequentially in one context and the run is **labeled degraded**.
4. Deliver it the way your platform allows: paste the FULL text inline for the
   user to copy if you cannot attach files. If the instruction field is too
   small, put the refusal gate + the thirteen seats + the verdict contract in
   the field and tell them to post the rest as the first message in the Project.
5. Tell the user where it goes: ChatGPT -> new Project -> Instructions, name it
   "Client-Pitch Panel." Gemini -> new Gem -> Instructions. Similar platforms ->
   the closest persistent-instructions slot.
6. Do the **Isolation check (3.5)**, the **Image capability check (3.6)**, and
   the **Branding interview (4)** now.
7. **PAUSE here.** The paste-and-save happens outside this conversation. Say:
   "Once it's saved, start a NEW chat inside the Project/Gem, paste in a real
   pitch you're working on, and say 'wash this pitch.'" Section 5 runs in that
   new chat.

## Section 3D: Plain chat session

No persistence exists here, so install into the conversation:

1. Read `skills/pitch-panel/SKILL.md`, the four workflow files, the four
   reference files, and as many of the thirteen dossiers as the user can paste
   (ask them to paste any you cannot see).
2. Say: "I've loaded the Client-Pitch Panel for this conversation. For a
   permanent install, open this same file with the Claude app, a Claude Code or
   Codex terminal, or a ChatGPT Project and I'll install it there."
3. Do the **Isolation check (3.5)** - in a plain chat the honest answer is
   sequential-shared-context, which is degraded; say so. Do a quick **Branding
   interview (4)** in-conversation, then go to Section 5 in-conversation.

---

## Section 3.5: Isolation Check (MANDATORY - this is how the panel stays honest)

The panel's whole design is that thirteen seats judge the same pitch **without
seeing each other.** If they share a context, later seats drift toward earlier
ones, dissent collapses, and the panel produces agreement it did not earn. So
determine, honestly, what you can actually do - and record it.

1. **Test yourself first.** Can you run genuinely separate contexts - parallel
   subagents, isolated workers, or fresh sessions per seat?

   | Your AI | Isolation available? |
   | --- | --- |
   | Claude Code / Codex CLI with subagents | Yes - parallel isolated workers, up to seven per wave. |
   | Claude app with skills | Partial - no parallel workers; run seats sequentially and freeze each reaction before loading the next dossier. |
   | ChatGPT Project / Gemini Gem | Partial - same sequential approach, in one context. |
   | Plain chat | No - everything shares one context. Degraded. |

2. **Record it** in the installed `USER-CONFIG.md` by adding a line:
   `execution mode: isolated-parallel` / `isolated-sequential` /
   `sequential-shared-context`. Every wash reads this and labels its run
   accordingly.

3. **Say it plainly to the user.** If you have real isolation: "Good - I can run
   each of the thirteen seats in its own separate context, so they genuinely
   won't influence each other." If you do not: don't pretend. "Heads up: in this
   setup the seats share one conversation, so I'll run them one at a time and
   freeze each verdict before loading the next. It works, but later seats can be
   nudged by earlier ones, and I'll label every run degraded so you know. If you
   ever want the clean version, running this in Claude Code gives real
   isolation."

**Never claim isolated execution when the runtime shared context.** A degraded
run honestly labeled is useful. A degraded run presented as isolated is a lie
about the evidence.

---

## Section 3.6: Image Capability Check

This kit's output is mostly text - tables, verdicts, arithmetic. Images only
matter if the studio wants a rendered report to hand around internally. Do the
check quickly and record it:

| User's AI | Image path |
| --- | --- |
| ChatGPT / Codex | native image generation - usable for a report cover or a logo mark |
| Gemini | native image generation - same uses |
| Claude (app or Code) | NO native raster generation - do NOT pretend. Default to designed SVG/CSS artwork, which is crisp and brandable and often sharper for business collateral than raster generation. |
| Unknown/none | SVG/CSS artwork only; say so plainly |

Record the answer in TWO places, using the same value: as one line in
`branding/image-setup.md` (create `branding/` if it does not exist yet), and in
the `image lane:` key of the installed `USER-CONFIG.md`. That key is what the
workflows read. If the user mentioned having more than one AI, note which of
theirs can generate rasters.

Verify before recording: even on ChatGPT or Gemini, a Business/Enterprise/Edu
workspace can disable image generation. Confirm the tool actually responds
rather than trusting the brand name, and fall back to designed SVG/CSS if it
does not.

Every output that a human will see reads the recorded lane. Never hardcode an
image tool.

---

## Section 4: Branding Interview

Keep it brief. Here `brand.md` mainly puts the studio's name and voice on
anything they show internally or hand to a client. Ask, in plain language:

> "What's your studio's name, and do you have brand colors or a logo you'd want
> on a report? If not, just the name is fine - you can add the rest later."

Then create `branding/brand.md`:

- studio name (required - used on every human-facing output);
- optional tagline;
- optional colors, fully spelled out (`primary color:`, `accent color:`);
- optional voice note (formal / direct / warm) for how summaries are worded;
- a pointer to the image lane recorded in `branding/image-setup.md`.

Also set the `studio name:` key in `USER-CONFIG.md` to the same value.

If the user gives only a name, that's enough. If they give nothing, use
`Your Studio` and tell them they can edit `branding/brand.md` any time.

---

## Section 5: Verify - wash the studio's OWN real pitch

Never end the install by listing what you installed. **Prove it works on their
actual work.**

**This kit does not ship a demo pitch, and that is deliberate.** A shipped
fixture would let you produce a clean-looking verify run without the studio ever
seeing their own material judged - which is the moment that tells them whether
this is worth anything. The first verdict a studio reads must be about their own
pitch, with their own client's name in it.

1. Ask for it directly: "Bring me a real pitch. The one you're working on now,
   or the last one you sent - a deck, a creative concept, a proposal. Paste the
   text or point me at the file. Half-finished is fine; rough is fine. It just
   has to be real."

2. **Then run the refusal gate on it, out loud.** This is the most important
   thing the studio will see during install, because it is the behavior that
   makes the kit different from a prompt. Check the four non-negotiables from
   `references/refusal-rules.md`:
- a named or described client;
- a stated ask;
- the actual pitch content, not a summary;
- a budget or term shape.

   **If anything is missing, STOP and say so** - do not quietly fill it in. Show
   them the refusal working:

   > "Before I run anything: I've got your concept and the client, but there's
   > no fee or term shape in here - and procurement is one of the thirteen
   > seats. If I run it now I'd be inventing that seat's reaction and handing
   > you a number that looks real. Give me the fee structure, even as a range,
   > and we'll go."

   Then wait for it. The user experiencing the refusal IS the verify step. A
   kit that always produces something is a formatter, and this is the moment
   they learn this one is not.

3. Once the gate passes, run `workflows/setup-committee.md` quickly against
   their real client - walk the thirteen seats, deactivate the ones that do not
   exist there, and confirm at least one seat that should say no is still
   active. Two minutes, not twenty.

4. Then run `workflows/wash-pitch.md` for real. Full run. Show them:
- the decision table with all active seats;
- at least one dissent quoted in the seat's own voice;
- the scorecard with the arithmetic visible;
- the integrity check;
- the award-ready / revise / stop call.

5. Point out the two things they should look at first: **what
   `builds-it-in-house` said**, and **whether `budget-was-never-real` was more
   enthusiastic than the core buyers.** Those two readings are the ones studios
   have never had access to before.

6. Point them to `OPERATIONS-MANUAL.md` for the routine and `examples/` for two
   complete worked runs on other pitches - **offer the examples AFTER their own
   run, as a comparison, never instead of it.**

7. Remind them plainly: these are researched composites, not their client. The
   panel says which objections the pitch invites. It does not say who wins.

**If the studio genuinely has no pitch to hand you right now**, do not
substitute a demo. Say: "Then let's stop here - the install is done and the
skill is loaded. Come back when you have a real pitch and say 'wash this pitch.'
Running it on made-up material would tell you nothing about whether this is
useful." Then stop. An honest incomplete verify beats a fixture-run that proves
nothing.

## Section 6: If Anything Fails

Diagnose and adapt - do not bounce the problem to the user or the vendor. State
what the host rejected, produce the alternative shape from the canonical files,
and continue. Only if you have exhausted every path in Section 3 may you tell
the user the one concrete step you need from them (e.g., "enable code execution
in Settings -> Capabilities, then say 'continue install'").

Specific failures worth naming:

- **Dossiers missing after copy** - the most common broken install. Re-copy
  `panel/dossiers/` recursively and re-run the 13-of-13 count.
- **A seat returns prose instead of the ten-line contract** - retry once with
  the same packet. Twice failed, record the failure and continue; never invent
  a reaction.
- **No isolation available** - that is not a failure, it is a degraded mode.
  Run sequentially, label it, continue.
