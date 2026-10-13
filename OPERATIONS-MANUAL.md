# Client-Pitch Panel - Operations Manual

The plain-language guide to driving this thing. No technical knowledge needed.

## What it is

Thirteen people who are not real, but who are built from the patterns of the
people who actually decide whether your pitch wins: the CMO who has to defend it
upward, the brand manager protecting the style guide, the procurement lead who
only reads price and term, the founder who wants it braver, the legal reviewer
who kills the claim, the VP burned by three shops.

Each one reads your pitch alone, from their own written background, and answers
one question: **would you award this?** Then a separate pass shows you where they
agreed, where they did not, who would say no, and why.

Two of them are built to say no. That is on purpose and it is the point.

## What it is for

The room you are never in. A client says "we went another direction" and you
never learn that legal killed the claim on slide nine, or that procurement sent
it back because the fee had no composition, or that the person who loved it had
no budget. This puts those objections in front of you while you can still answer
them.

## What it is not

It is not a prediction. It does not tell you whether you win. It is a structured
read on which objections your pitch invites, from composites whose assumptions
are written down so you can argue with them.

The real committee is still the real committee.

---

## The three things you say

### "Set up the committee"

Do this once per client, before the first run. Takes about ten minutes.

The AI walks you through the thirteen seats and asks one question about each:
**does this person exist at this client?** Seats that do not exist get turned
off. Seats that exist but are different get edited. It also asks what exactly
you are asking this client to approve.

You do not have to keep thirteen. A twelve-person company has no procurement
lead. Turn it off rather than pretending.

**The one rule the AI will hold you to:** you must always keep at least one seat
that should say no. If you turn off the in-house team seat because your client
does not have one, the AI will ask you to name a different sceptic. A panel with
nobody who should say no will say yes, and it will tell you nothing.

### "Wash this pitch"

The main move. Give it the deck text, the concept, or the proposal, and say
**wash this pitch**.

**It may stop and refuse.** This is the kit working, not breaking. It will not
run without four things:

1. a named or described client;
2. what exactly you are asking them to approve;
3. the actual pitch content - not a summary of your deck, the deck;
4. a budget or term shape, even a range.

If one is missing it will tell you which and ask for it. It will not run "with
assumptions," because a made-up input produces a result that looks completely
real and is not, and you would act on it.

What comes back:

- **the decision table** - every seat, would-they-award, how strongly, how
  confident;
- **the dissent** - every no, in that person's own words, with their reason;
- **the scorecard** - five dimensions, weighted, with the arithmetic shown so you
  can check it;
- **the integrity check** - whether the run itself looks trustworthy;
- **the call** - award-ready, revise, or stop.

### "Rewrite and retest"

Say it after a wash. The AI sorts the objections into four piles - fix it, fix
it (one important voice), do not optimize for this, and not-a-copy-problem - then
writes three genuinely different versions and runs each back through the same
thirteen seats.

It will stop you after three rounds. If the same objection survives three
rewrites, the problem is not the words, and it will say so instead of helping you
polish forever.

---

## How to read the output (the part that matters)

**A hard-no saying no is a healthy panel.** `builds-it-in-house` - the in-house
creative lead - is supposed to reject you. Her reasons are the most reusable
thing in the run, because you will face them in every pitch where an internal
team exists.

**If `builds-it-in-house` says yes, be suspicious.** Either the pitch claimed
something you cannot deliver, or the run drifted. Check both.

**If `budget-was-never-real` is your most enthusiastic seat, that is a warning.**
That is the person who loves your work and cannot buy it. If the pitch is winning
him and leaving the CMO, procurement, and finance flat, you are aimed at the
wrong room - and this is the single most expensive pattern in the business,
because it feels like a great meeting.

**An all-yes panel is a broken panel.** Thirteen for thirteen is not a triumph.
Read it as an integrity warning and check whether the seats actually stayed in
character.

**Disagreement is usually more useful than agreement.** Agreement tells you the
pitch is clear. Disagreement tells you where it breaks.

**The score is directional.** It is a way to compare two versions of the same
pitch against the same seats. It is not a percentage chance of winning and you
should never repeat it to anyone as though it were.

---

## The routine that makes this compound

Most of the value shows up after the third or fourth pitch, and only if you do
one thing: **write down what actually happened.**

After every real pitch, open `panel/EVIDENCE-NOTES.md` and fill in one row:
what the panel said, what the client actually did, which objection the panel
missed, and which objection it invented that nobody raised.

After three or four of those, the pattern is visible. A seat that keeps inventing
objections nobody raises gets narrowed. A seat that keeps missing the thing that
actually killed the pitch gets rewritten from what you now know. That is when
this stops being a thinking tool and starts being evidence about your actual
market.

Do not tune anything after one surprising result. Wait for the pattern.

---

## Fitting it to your own clients

The thirteen shipped seats are composites of common committee patterns. They are
not your client. The kit gets materially better the more of them you replace with
people you have actually met.

When you know a real decision-maker - you have sat with them, you know what they
care about - edit that seat's dossier. Keep all the headings, change the content,
and in the `## Evidence basis` section write that this is first-hand knowledge.
That is the strongest evidence this kit can carry, and it is the difference
between a good thinking tool and a real read on a real room.

Keep a fitted roster per client if you pitch to a few regularly. Each becomes an
asset.

---

## Where things live

- **The committee** - the roster and the thirteen dossiers - lives inside the
  skill folder and travels with it. That is where you edit seats.
- **Your pitches and your finished runs** live in your own pitch folder,
  wherever you told the installer to put it (default `~/Documents/pitch-panel/`).
- **Two complete worked examples** are in `examples/` - a full run on a made-up
  studio's pitch, start to finish, so you can see the shape before trusting your
  own.

---

## Limits, stated plainly

This kit does not send, publish, price, approve, or submit anything. It does not
replace talking to your actual client, and one direct question to a real
decision-maker beats any run this produces. It is not legal review - the
`legal-reviewer` seat is a modeled gate and a real claim still goes to a real
lawyer.

Until you have filled in the calibration ledger, this panel has earned no
accuracy claim of any kind. Do not make one to your clients, and do not let it
make one to you.
