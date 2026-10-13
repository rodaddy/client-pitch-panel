# workflows

The four things a studio can say, one file each. A workflow is the procedure the
AI walks; the rules it applies while walking come from `../references/`.

- `setup-committee.md` - run once per client, about ten minutes: walk the
  thirteen seats, turn off the ones that do not exist at that client, edit the
  ones that differ, and keep at least one seat that should say no.
- `wash-pitch.md` - the main move. Runs the refusal gate first, then the seats,
  then synthesis.
- `rewrite-and-retest.md` - starts from a completed wash, sorts the objections,
  writes three genuinely different versions, and reruns them. Stops after three
  rounds.
- `room-lifecycle.md` - creating, cleaning, and archiving named committee
  instances so several can run at once.
