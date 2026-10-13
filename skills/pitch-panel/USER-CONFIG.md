# User Config - Client-Pitch Panel

The installer fills this in. Every workflow reads THIS file to find the user's
folders. Do not create a second config file, and do not guess these values.

Keys are spelled out in full. Leave a key's value exactly as written below if it
was not set.

---

pitch folder: chat only

studio name: Your Studio

execution mode: not yet recorded

image lane: not yet recorded

---

## What each key means

**`pitch folder:`** - where the studio's own pitches and finished runs live.
This is OUTSIDE the skill folder, in the user's documents. It holds:

- `pitches/` - where the studio drops the deck, concept, or proposal text;
- `runs/` - one dated folder per wash, each holding the frozen artifact, the
  frozen roster, the reactions, and the result.

Set by the installer to whatever the user chose, written out in full (for example
`~/Documents/pitch-panel/`). Write the path even when the user takes the default.

If the install is in a chat app with no filesystem, this stays exactly
`chat only`, and every workflow keeps the pitch and the run in the conversation
instead of writing files.

**`studio name:`** - the studio's business name, used on anything a human reads.
Also recorded in `branding/brand.md`; this key is the one the workflows read.

**`execution mode:`** - what seat isolation this AI can actually provide,
recorded during install (installer Section 3.5). One of `isolated-parallel`,
`isolated-sequential`, or `sequential-shared-context`. Every wash reads this and
labels its run accordingly. A `sequential-shared-context` run is **degraded** and
must be labeled as such in the result - never claim isolation the runtime did not
provide.

**`image lane:`** - how this AI makes pictures, recorded during install (see
`branding/image-setup.md`). Only used if the studio asks for a rendered report.
Never hardcode an image tool anywhere; read the recorded lane.

## What is NOT in this file

The roster and the dossiers. They live at `panel/panel.json` and
`panel/dossiers/` **inside this skill folder** and are always read
skill-relative. They travel with the skill and are never looked for in the user's
documents.
