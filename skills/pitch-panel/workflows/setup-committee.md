# Set Up the Committee

Run this once per client, before the first wash for that client. It takes about
ten minutes and it is what turns a shipped roster into a panel about a real
decision.

Trigger phrases: "set up the committee", "fit the panel to this client",
"adjust the panel".

Read `references/committee-standard.md` before starting.

---

## 1. Name the decision this pitch has to win

Ask the studio, in plain language:

> "Who is this pitch going to, and what exactly are you asking them to approve?"

Write the answer into `panel/panel.json` under `panel.objective` and
`panel.decision_signal`. Replace the shipped text - the shipped version is
generic on purpose and a generic objective produces generic verdicts.

"Do they like it?" is not a decision. "Would this committee vote to award a
twelve-month brand and campaign retainer to this studio?" is.

If the studio cannot answer this, that is the same failure the refusal gate
catches later. Sort it out now.

---

## 2. Walk the thirteen seats against the real client

Show the shipped roster and ask, seat by seat, only the question that matters:

> "Does this person exist at this client?"

Three outcomes per seat:

- **Exists, close enough** - leave it active and note anything the studio knows
  that contradicts the dossier.
- **Does not exist** - set `active` to `false`. Do NOT reassign the seat to
  someone else; a procurement seat repurposed as a finance seat produces a
  reaction that belongs to neither.
- **Exists and is materially different** - edit that dossier. Keep every heading,
  change the content, and keep the evidence-versus-assumption labeling honest.
  If the studio knows the real person, that knowledge belongs in
  `## Evidence basis`, marked as first-hand observation.

Common deactivations, so nobody feels obliged to keep thirteen. **Each row is a
single trigger, not a list of conditions that must all hold** - if the function
does not exist at this client, deactivate the seat regardless of the client's
size or anything else in the row:

| Client shape | Deactivate |
| --- | --- |
| No procurement function (whatever the revenue) | `procurement-lead` |
| No CMO or marketing head with budget authority | `cmo-defender` - **and add a replacement seat for whoever actually defends the spend upward**, usually the owner or a GM. Never leave the defender seat empty; see step 3b |
| No founder present or no override authority | `founder-wants-weirder` |
| Nobody is measured on marketing metrics | `performance-lead` |
| No in-house or outside counsel touching marketing claims | `legal-reviewer` - **only if nothing in the category is regulated.** Food, health, finance, cannabis, childcare, and anything making a performance or origin claim keep this seat even with no lawyer on staff, because the exposure exists whether or not a reviewer does |
| Greenfield pitch, no incumbent agency | `incumbent-advocate` - **unless a long-tenured freelancer or internal person does the work today.** That person is the incumbent; edit the dossier rather than deactivating |
| No in-house creative team | `builds-it-in-house` - **and add a replacement dissent seat** |
| Comms folded into marketing | `comms-pr-lead` |
| Marketing budget released unconditionally | `finance-partner` |

This table is common cases, not the whole world. A seat whose function genuinely
does not exist at this client is deactivated whether or not it has a row here -
and every deactivation that is not on this table is written into
`panel/EVIDENCE-NOTES.md` with the reason, because it is a fitting decision
somebody will want to check later.

### 2b. The same-person check (run it before you move on)

Small and owner-run clients do not have thirteen people. They have four or five
people holding thirteen opinions, and the shipped roster will quietly put the
same human in two or three seats. When that happens the panel double-counts one
person's verdict, and the tally stops meaning anything.

Mechanical rule: **write the real person's name next to every active seat. If a
name appears twice, that is a collision and it must be resolved before any seat
runs.** Two seats, one human, is one vote wearing two hats.

Resolve each collision one of two ways, and record which in `EVIDENCE-NOTES.md`:

- **Deactivate one of the two seats** when the person really would react the same
  way in both roles - keep the seat closer to how they will actually encounter
  the pitch; or
- **Keep both and split them explicitly** when the person genuinely holds two
  separable positions - Gina-as-brand-owner protecting the label and
  Gina-as-operator who has to run the monthly cadence are different reactions.
  Edit both dossiers so each states which hat it is wearing and what it does NOT
  cover, and **mark both seats as one person in the run record so the decision
  table shows them as a single vote counted once.**

Never resolve a collision by leaving both seats untouched and hoping the
reactions differ. They will differ in wording and agree in verdict, which is the
worst of both: no new information and an inflated count.

---

## 3. Check the two rules the roster must always satisfy

After deactivations, verify both:

1. **Five to fifteen active seats.** Below five and it is not a committee; above
   fifteen and the seats stop differing for substantive reasons.
2. **At least one core seat AND at least one seat that should say no** - a
   `wrong-fit` or a `hard-no`.

Rule 2 is the one that gets broken. If `builds-it-in-house` was deactivated
because the client has no in-house team, **the dissent must be replaced, not
dropped.** Write a new hard-no seat that fits this client: the stakeholder who
wanted a different studio, the executive who thinks the whole category of spend
is waste, the operator who was against running a review at all.

### 3a. A replacement seat is a DOSSIER, not a description

Every seat added here - a replacement dissent seat, a replacement defender, a
seat for a signer who was not on the roster - **gets a real dossier file before
it runs.** Copy `panel/dossiers/DOSSIER-TEMPLATE.md`, fill every heading in
order, and hit the length floor in `references/committee-standard.md` section 6:
1,200-1,800 words, and never below about 900.

This is not ceremony, and it is the step most likely to be skipped because the
seat feels obvious once you have described it in a sentence. A seat run from a
one-line description returns four flat sentences with no specific slide, no
history and no texture - a critique instead of a person, exactly what the length
floor exists to prevent. **It matters most on the seat it is most tempting to
skip:** a replacement `hard-no` carries the most load-bearing verdict in the run,
and a thin dossier makes the panel's most important dissent its weakest output.

Mechanical check before any seat runs: **every active seat in `panel.json` points
at a dossier file that exists and clears the length floor.** A manifest entry
with no dossier, or a dossier under 900 words, is not ready to run. If the studio
does not have ten minutes to write it, deactivate the seat and say the panel is
running without that dissent - an honest gap beats a seat that answers in
generalities and gets counted as a real verdict.

A panel with no seat that should say no is a panel that will say yes, and it
tells the studio nothing.

### 3b. Who actually signs, and what to do when the signer is the dissenter

Ask one more question and write the answer into `panel.json` under
`panel.signer`, which is a **list**, not a single name:

> "Who personally has to say yes before this is signed? Name everyone whose no
> stops it."

Usually that is one person. When it is more than one, the answer changes how the
whole run is read, so ask the follow-up rather than picking one:

> "Do they need each other, or can one of them decide alone?"

**Two or more required signers is a common shape at the businesses this kit
serves** - the co-owners, the two partners, the couple who own the place, the
franchisee and the family trust. Record every one of them in `panel.signer`,
give each their own seat, and mark each seat `"signer": true`. **Never collapse
required co-signers into one seat and never pick the friendlier one as "the"
signer.** Picking the enthusiast quietly demotes the other one's objection into
the do-not-optimize pile, which is exactly the failure the signer rule exists to
prevent.

If the required signers visibly disagree with each other, say so during setup and
write it into `EVIDENCE-NOTES.md`, because it becomes the finding: the pitch is
not being judged on its merits so much as it is landing inside an argument the
studio did not start. `workflows/rewrite-and-retest.md` step 4 handles what to do
about it.

Then find each signer on the roster. Two situations need handling and the kit is
explicit about both:

- **The signer is not on the roster.** Add a seat for them before running.
  Nothing else on this panel matters as much as the person holding the pen, and
  at an owner-run client that person is frequently in no shipped seat at all.
- **The signer sits in a `wrong-fit` or `hard-no` seat.** This happens at
  owner-run businesses, where the person most resistant to being sold to is also
  the person who buys. Mark the seat `"signer": true` in the manifest entry.
  **A signer's objection is never in the do-not-optimize pile** - see
  `workflows/rewrite-and-retest.md` step 1. The hard-no doctrine exists to stop a
  studio overpromising to convert someone who was never going to buy; it was
  never meant to tell a studio to ignore the buyer. If the signer's seat is
  `hard-no`, say so out loud during setup: "your hardest no is also the person
  who signs, so this panel's job is going to be finding the smallest version he
  would say yes to."

---

## 4. Check the scoring dimensions still fit

The shipped five dimensions total 100 and are written for a general pitch. Adjust
only with a stated reason, and only before any seat runs - never after seeing
reactions.

**First, the ownership check - it is mechanical and it catches the commonest
setup break.** Walk the dimensions against the roster you just finished
deactivating, and for each one name at least one ACTIVE seat whose reaction will
speak to it:

| Dimension | Usually owned by |
| --- | --- |
| `defensibility` | `cmo-defender`, or whoever replaced it in step 3b |
| `commercial-clarity` | `procurement-lead`, `finance-partner` |
| `distinctiveness` | `founder-wants-weirder`, `brand-manager` |
| `proof-and-substantiation` | `legal-reviewer`, `agency-fatigued-vp` |
| `livability` | `internal-champion`, `brand-manager` |

A dimension with no active owner is **orphaned**, and deactivating a seat is what
orphans it. Fix it here, in one of two ways:

- **add the seat back** in the form this client actually has - the owner who
  defends the spend, the bookkeeper who is the whole finance function. **This is
  the preferred fix and it is the right one most of the time.** The function
  almost always exists at a small client; it is wearing a different job title,
  not absent. Somebody defends the spend, somebody reads the contract, somebody
  will live with the work; or
- **drop the dimension** and redistribute its weight proportionally across the
  rest, and write down why.

**Two dimensions are never dropped.** `distinctiveness` and
`proof-and-substantiation` are the panel's reason to exist for a creative studio
- one asks whether the work is only theirs, the other whether the claims survive.
If either is orphaned, add an owning seat rather than dropping it. Any client has
someone who reacts to whether the work feels like it was made for them, and
proof-and-substantiation is owned by `legal-reviewer`, which the deactivation
table already tells you to keep for any regulated category or performance claim.

**Redistribution arithmetic, done the same way every time.** Weights are
**whole numbers only** - fractional weights are not legal in this kit, because
two AIs rounding differently produce scores that cannot be compared and the
frozen-snapshot design exists precisely so they can be. Redistribute like this:

1. take the dropped dimension's weight;
2. split it across the remaining dimensions in proportion to their existing
   weights;
3. **round each share down to a whole number**, then hand any leftover points one
   at a time to the remaining dimensions in descending weight order, until the
   total is exactly 100;
4. show the arithmetic and the final weights in `EVIDENCE-NOTES.md` and in the
   run's `panel-snapshot.json`.

Worked example - dropping a 20-weight dimension from `25 / 20 / 20 / 15`
(remaining total 80): shares are `25/80 x 20 = 6.25`, `20/80 x 20 = 5.0`,
`20/80 x 20 = 5.0`, `15/80 x 20 = 3.75`; rounded down that is `6 / 5 / 5 / 3`
which adds 19, leaving 1 point, handed to the largest remaining dimension. Final
weights: `32 / 25 / 25 / 18` = 100.

Do not carry an orphaned dimension into a run. Scoring will otherwise read it off
a seat that does not own it, which is how a `hard-no` seat's reaction ends up
supplying a `defensibility` score - a number that means the opposite of what it
claims to.

If the studio changes them: three to eight dimensions, weights totaling exactly
100, each tied to the decision named in step 1.

---

## 5. Record what the panel does not know

Open `panel/EVIDENCE-NOTES.md` and write down, honestly:

- what the studio actually knows about this committee (met them, researched them,
  guessed);
- which seats are grounded in real knowledge and which are running on the shipped
  composite;
- what would change a seat's verdict that the studio cannot currently know.

This is the file that keeps the panel honest over time. A panel whose seats are
all shipped composites is a useful thinking tool; a panel where four seats are
based on people the studio has actually met is materially better evidence, and
the difference should be written down rather than felt.

---

## 6. Confirm it is ready

State back to the studio:

- the decision the panel is answering;
- how many seats are active **and how many real people that is** - say both
  numbers, because they are usually different at a small client;
- which were deactivated and why, and which seats were added with a full dossier;
- who signs, every name, and whether any of them sits in a seat that should say
  no;
- which seats should say no;
- the scoring dimensions and weights, including any dimension dropped as orphaned
  and the redistribution arithmetic;
- what the panel cannot know.

Then: "Ready. Give me the pitch and say **wash this pitch**."
