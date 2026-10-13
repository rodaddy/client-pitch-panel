# scripts

The deterministic spine: the steps that land the same way every time are code
here, not instructions the AI is trusted to remember.

- `room.sh` - room lifecycle in bash/coreutils (parses on stock bash 3.2). Owns
  moving, archiving, staging, listing, and validating readiness. It never writes
  a dossier; it stages the prompt and gets out of the way.
- `verify-kit.mjs` - dependency-free Node (22.6.0+), no install or build step.
  Checks package version, required files, the JSON roster, active dossier paths,
  the 900-word floor, active-seat range, the dissent-seat requirement, and
  integer weights totaling 100. `--room <name>` adds room validation;
  `--skill-root <path>` points it at an installed copy. Exit 0 pass, 1 fail,
  3 harness error.
