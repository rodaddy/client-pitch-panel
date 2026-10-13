# panel

The committee. This folder is the roster and it stays inside the skill folder,
where the workflows read it skill-relative.

- `panel.json` - the roster and nothing else. The seats come from this file, never
  from a folder scan, and it is frozen into a run before any seat executes. It
  also carries the panel objective, the decision signal, the artifact types, and
  the scoring weights.
- `dossiers/` - the thirteen seat dossiers plus the template.
- `EVIDENCE-NOTES.md` - what the panel is actually based on, plus the calibration
  ledger the studio fills in after each real pitch. It ships empty, which is why
  the panel has earned no accuracy claim yet.

An upgrade never overwrites this folder: the seats a studio has fitted to their
clients and every calibration entry carry over untouched.
