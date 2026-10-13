# Committee Standard

What makes this roster an instrument rather than a cast of characters. Read
before editing seats or writing a new one.

## 1. The roster file is the roster

`panel/panel.json` decides who runs. A dossier in `panel/dossiers/` that no
active manifest entry points at does not run, ever. A folder listing never
decides the roster.

This is what makes two runs comparable. If the roster is whatever happened to be
on disk that day, a score movement between runs means nothing.

## 2. Every seat must differ for a substantive reason

Add or keep a seat only when its reaction should differ because of something
real: different authority, different exposure, different history, different thing
it is measured on, different reason to say no.

Two seats that would react the same way for the same reason are one seat with two
names, and they double-count that reaction in the synthesis. Merge them.

Variety without behavioral consequence - different titles, different backgrounds,
same verdict logic - is decoration.

## 3. Five to fifteen active seats

Thirteen is where this panel ships because a client-side decision committee
usually has that many opinions in it. It is not a magic number and it is not a
target. Right-size to the actual client.

Below five, it is not a committee. Above fifteen, seats stop differing for
substantive reasons and start being variations.

## 4. Always at least one core seat and at least one seat that should say no

This is the rule that gets broken during setup, and breaking it is what turns the
panel back into a formatter.

If a `wrong-fit` or `hard-no` seat is deactivated because it does not exist at
this client, **it must be replaced with a different one, not dropped.** A panel
with nobody who should say no will say yes, and it tells the studio nothing it
did not already believe.

## 5. Kinds and fits mean specific things

**Kind** - what this person can do:

- `buyer` - can vote to award, or can block one.
- `user` - lives with the work; no vote, real influence.
- `influencer` - shapes the room's view; no vote.
- `specialist` - applies a gate, not a customer judgment. Returns `PASS` or
  `FLAG`, never `YES` or `NO`. **A specialist PASS is never counted as
  enthusiasm**, and a specialist never substitutes for a dissenting customer.

**Fit** - how this person relates to the pitch:

- `core` - the pitch is genuinely for them.
- `adjacent` - plausible, not the primary target.
- `wrong-fit` - should usually not convert; enthusiasm here is a warning.
- `hard-no` - principled non-converter whose dissent tests panel integrity.

## 6. What a dossier must contain

Every dossier uses every heading in `DOSSIER-TEMPLATE.md`, in order. Target
1,200-1,800 words. Below about 900 words a dossier stops carrying enough specific
contradictory context to produce a reaction rather than a critique.

Length is not quality. Detail with no source and no decision consequence is not
research.

**Keep three things visibly separate:**

- observed or source-backed behavior - what is actually known;
- composite synthesis - a reasonable combination of known patterns;
- modeled assumptions - useful invented choices, labeled as such, in the
  `## Modeled assumptions` section with a note on what real outcome would confirm
  or disprove each.

That labeling is what makes a dossier auditable. It does not make the composite a
real person, and nothing in this kit should be described as though it does.

Do not invent precise age, income, ethnicity, disability, or legal status to make
a persona feel real. Include a trait only when it materially changes the decision
and something supports it.

## 7. Reject or rewrite a dossier when

- another dossier could use it with only the name changed;
- the evidence section has no basis at all;
- assumptions are written as facts;
- every pain point maps neatly onto what the studio happens to sell;
- the seat has no plausible way to say no;
- the voice notes sound like an AI consultant rather than a person;
- it is long because it repeats itself.

## 8. Writing a new seat

Give it a human name and a composite history, not a caricature. Tie every section
to the decision the panel is answering. Give it a credible reason to ignore or
reject the pitch. Write phrases it would actually say, without turning voice into
parody. Never write "wants the studio to succeed" into a seat - no real committee
member is on the studio's side by construction.

For a hard-no: state what a healthy no looks like, and make it capable of
rejecting excellent work.
For a wrong-fit: state what mistakenly attracts it.
For a specialist: state its gate explicitly and require `NOT-APPLICABLE` on the
customer decision.

## 9. Scoring

Three to eight dimensions, weights totaling exactly 100, each tied to the stated
decision. Set before any seat runs and frozen into the run snapshot. Never
changed after seeing reactions - a weight adjusted post-hoc is the panel telling
the studio what it wanted to hear.

A score never overrides a declared gate. Explain every override in words.

## 10. Anti-patterns

- Thirteen seats because the shipped roster had thirteen.
- One generic buyer copied into different job titles.
- Every seat wanting the same outcome.
- A specialist gate counted as a buyer's enthusiasm.
- A folder scan choosing the roster.
- The studio's own framing reaching the seats.
- Weights changed after results.
- Treating synthetic agreement as measured client truth.
