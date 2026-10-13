#!/usr/bin/env node

import { readFile, stat } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const EXIT_FAIL = 1;
const EXIT_HARNESS = 3;
const scriptDir = dirname(fileURLToPath(import.meta.url));
const shippedSkillRoot = resolve(scriptDir, "..");
const shippedKitRoot = resolve(shippedSkillRoot, "../..");

function fail(message, code = EXIT_FAIL) {
  console.error(`verify-kit: ${message}`);
  process.exit(code);
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

function parseArgs(args) {
  let room = null;
  let skillRoot = null;
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--room") {
      room = args[index + 1] ?? "";
      index += 1;
    } else if (arg.startsWith("--room=")) {
      room = arg.slice("--room=".length);
    } else if (arg === "--skill-root") {
      skillRoot = args[index + 1] ?? "";
      index += 1;
    } else if (arg.startsWith("--skill-root=")) {
      skillRoot = arg.slice("--skill-root=".length);
    } else if (arg === "--help" || arg === "-h") {
      console.log("Usage: node verify-kit.mjs [--skill-root PATH] [--room NAME]");
      process.exit(0);
    } else {
      fail(`unknown argument: ${arg}`);
    }
  }
  if (room !== null && !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(room)) {
    fail(`room name is not usable: ${room}`);
  }
  if (skillRoot !== null && skillRoot.length === 0) fail("--skill-root needs a path");
  return { room, skillRoot: skillRoot === null ? null : resolve(skillRoot) };
}

// A dossier path that exists but is not a readable file (a directory, a
// dangling symlink, a device node) is an INVALID ROOM, not a broken harness.
// Letting readFile throw here escaped to the top-level catch and reported
// exit 3, which tells the buyer their machine is wrong when their roster is.
// Returning null keeps the caller in the exit-1 validation path.
async function countWords(path) {
  let text;
  try {
    text = await readFile(path, "utf8");
  } catch {
    return null;
  }
  return text.trim().split(/\s+/u).filter(Boolean).length;
}

function resolveInside(base, candidate) {
  if (typeof candidate !== "string" || candidate.length === 0 || isAbsolute(candidate)) return null;
  const target = resolve(base, candidate);
  const fromBase = relative(base, target);
  if (fromBase === "" || fromBase === ".." || fromBase.startsWith(`..${sep}`)) return null;
  return target;
}

async function readTrimmed(path, problems, label) {
  try {
    return (await readFile(path, "utf8")).trim();
  } catch (error) {
    if (error.code === "ENOENT") {
      problems.push(`missing ${label}`);
      return null;
    }
    throw error;
  }
}

async function findRoster(skillRoot, room) {
  if (room === null) return join(skillRoot, "panel", "panel.json");
  const kitRoot = resolve(skillRoot, "../..");
  const roomRoot = join(kitRoot, "rooms", room);
  const flat = join(roomRoot, "panel.json");
  const nested = join(roomRoot, "panel", "panel.json");
  if (await exists(flat)) return flat;
  if (await exists(nested)) return nested;
  fail(`room "${room}" has no panel.json`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const skillRoot = options.skillRoot ?? shippedSkillRoot;
  const packageContext = (await exists(join(shippedKitRoot, "kit.json")))
    && (await exists(join(shippedKitRoot, "VERSION")));
  const problems = [];

  const requiredSkillFiles = [
    "SKILL.md",
    "USER-CONFIG.md",
    "VERSION",
    "references/committee-standard.md",
    "references/refusal-rules.md",
    "references/seat-protocol.md",
    "references/synthesis-and-scoring.md",
    "workflows/setup-committee.md",
    "workflows/wash-pitch.md",
    "workflows/rewrite-and-retest.md",
    "workflows/room-lifecycle.md",
    "scripts/room.sh",
    "scripts/verify-kit.mjs",
  ];
  for (const relative of requiredSkillFiles) {
    if (!(await exists(join(skillRoot, relative)))) problems.push(`missing skill file ${relative}`);
  }

  const skillVersion = await readTrimmed(join(skillRoot, "VERSION"), problems, "skill VERSION");
  if (packageContext) {
    const requiredKitFiles = [
      "README.md",
      "START-HERE.md",
      "installer.md",
      "OPERATIONS-MANUAL.md",
      "VERSION",
      "CHANGELOG.md",
      "kit.json",
    ];
    for (const relative of requiredKitFiles) {
      if (!(await exists(join(shippedKitRoot, relative)))) problems.push(`missing package file ${relative}`);
    }

    const packageVersion = await readTrimmed(join(shippedKitRoot, "VERSION"), problems, "package VERSION");
    if (packageVersion !== null && skillVersion !== null && packageVersion !== skillVersion) {
      problems.push(`skill VERSION ${skillVersion} does not match package VERSION ${packageVersion}`);
    }
    if (packageVersion !== null) {
      const installer = await readFile(join(shippedKitRoot, "installer.md"), "utf8");
      if (!installer.includes(`**Version:** ${packageVersion}`)) {
        problems.push(`installer version does not match VERSION (${packageVersion})`);
      }
      try {
        const manifest = JSON.parse(await readFile(join(shippedKitRoot, "kit.json"), "utf8"));
        if (manifest.version !== packageVersion) {
          problems.push(`kit.json version ${manifest.version ?? "<missing>"} does not match VERSION ${packageVersion}`);
        }
        if (manifest?.requirements?.runtimes?.node !== ">=22.6.0") {
          problems.push("kit.json must declare Node >=22.6.0");
        }
      } catch (error) {
        fail(`cannot parse kit.json: ${error.message}`, EXIT_HARNESS);
      }
    }
  }

  const rosterPath = await findRoster(skillRoot, options.room);
  let roster;
  try {
    roster = JSON.parse(await readFile(rosterPath, "utf8"));
  } catch (error) {
    fail(`cannot parse ${rosterPath}: ${error.message}`, EXIT_HARNESS);
  }

  const seats = roster?.seats;
  if (!Array.isArray(seats)) fail(`roster has no seats array: ${rosterPath}`, EXIT_HARNESS);
  const seen = new Set();
  let active = 0;
  let core = 0;
  let dissent = 0;
  for (const seat of seats) {
    if (!seat?.id || seen.has(seat.id)) problems.push(`missing or duplicate seat id: ${seat?.id ?? "<empty>"}`);
    seen.add(seat?.id);
    if (seat?.active === true) {
      active += 1;
      if (seat.fit === "core") core += 1;
      if (seat.fit === "wrong-fit" || seat.fit === "hard-no") dissent += 1;
      const dossierPath = resolveInside(dirname(rosterPath), seat.dossier);
      if (dossierPath === null) {
        problems.push(`active seat ${seat.id} dossier path must stay relative to the roster folder: ${seat.dossier ?? "<missing>"}`);
      } else if (!(await exists(dossierPath))) {
        problems.push(`active seat ${seat.id} dossier missing: ${seat.dossier}`);
      } else {
        const words = await countWords(dossierPath);
        if (words === null) {
          problems.push(`active seat ${seat.id} dossier is not a readable file: ${seat.dossier}`);
        } else if (words < 900) {
          problems.push(`active seat ${seat.id} dossier has ${words} words; minimum is 900`);
        }
      }
    }
  }

  if (active < 5 || active > 15) problems.push(`active seat count is ${active}; required range is 5-15`);
  if (core < 1) problems.push("no active core seat remains");
  if (dissent < 1) problems.push("no active wrong-fit or hard-no seat remains");

  const dimensions = roster?.scoring?.dimensions;
  if (!Array.isArray(dimensions) || dimensions.length < 3 || dimensions.length > 8) {
    problems.push("scoring dimensions must contain 3-8 entries");
  } else {
    const total = dimensions.reduce((sum, item) => sum + item.weight, 0);
    if (dimensions.some((item) => !Number.isInteger(item.weight))) problems.push("scoring weights must be whole numbers");
    if (total !== 100) problems.push(`scoring weights total ${total}; required total is 100`);
    for (const required of ["distinctiveness", "proof-and-substantiation"]) {
      if (!dimensions.some((item) => item.id === required)) problems.push(`required scoring dimension missing: ${required}`);
    }
  }

  if (problems.length > 0) {
    for (const problem of problems) console.error(`FAIL: ${problem}`);
    process.exit(EXIT_FAIL);
  }

  const target = options.room === null ? (packageContext ? "package and skill" : "installed skill") : `room ${options.room}`;
  console.log(`PASS: ${target}`);
  console.log(`PASS: version ${skillVersion}; ${active} active seats; ${core} active core seat(s); ${dissent} active dissent seat(s)`);
  console.log("PASS: dossier paths and 900-word floors; scoring dimensions and weights");
}

main().catch((error) => fail(error.message, EXIT_HARNESS));
