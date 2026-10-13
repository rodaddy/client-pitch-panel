# skills

The skills this kit installs. One of them: `pitch-panel/`.

The installer copies `pitch-panel/` whole and recursive into the AI's skills
directory (`~/.claude/skills/`, `~/.codex/skills/`, or the platform equivalent),
or zips it with every archive path starting at `pitch-panel/` for hosts that
accept skill uploads. This `skills/` level is packaging only and is never part
of the installed path.
