# pitch-panel skill

The installable skill itself - the folder the installer copies, whole and
recursive, into the AI's skills directory. `SKILL.md` is the entry point and
carries the trigger phrases ("wash this pitch", "run the panel"); `VERSION` is
the installed-copy upgrade version; `USER-CONFIG.md` is the one customer-settings
file, holding `pitch folder:` and `studio name:`.

Everything else is a subfolder: `workflows/` for the four things the studio can
say, `references/` for the rules those workflows apply, `scripts/` for the
deterministic tooling, `panel/` for the roster and dossiers, `owner/` for the
studio's own side. `branding/` is created here at install.
