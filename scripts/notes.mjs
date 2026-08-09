#!/usr/bin/env node
/**
 * Manage the pinboard entries stored in data/.
 *
 *   npm run notes                 list every note with its id
 *   npm run notes remove <id>     remove one note (id prefix is enough)
 *   npm run notes clear           remove every note
 *
 * Deliberately a local script rather than a delete button on /notes: that page is
 * unlisted but publicly reachable, so a delete endpoint would need real auth to be
 * safe. Editing data/guestbook.json by hand works too.
 */

import { promises as fs } from "fs";
import path from "path";
import readline from "readline";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "guestbook.json");
const DRAWINGS_DIR = path.join(DATA_DIR, "guestbook-drawings");

async function readEntries() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeEntries(entries) {
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

async function removeDrawingFor(entry) {
  if (!entry.drawing) return;
  try {
    const files = await fs.readdir(DRAWINGS_DIR);
    const match = files.find((f) => f.includes(entry.id));
    if (match) await fs.unlink(path.join(DRAWINGS_DIR, match));
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
}

function describe(entry, index) {
  const when = new Date(entry.createdAt).toLocaleString();
  const seed = entry.seed ? `"${entry.seed}"` : "(none)";
  const message = entry.message ? entry.message.replace(/\s+/g, " ").slice(0, 48) : "(none)";
  return [
    `${String(index + 1).padStart(3)}. ${entry.id.slice(0, 8)}`,
    `     ${entry.name} · ${when}`,
    `     seed: ${seed}`,
    `     note: ${message}`,
    `     art:  ${entry.drawing ? "yes" : "no"}`,
  ].join("\n");
}

async function confirm(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((resolve) => rl.question(`${question} (y/N) `, resolve));
  rl.close();
  return answer.trim().toLowerCase() === "y";
}

async function main() {
  const [command = "list", target] = process.argv.slice(2);
  const entries = await readEntries();

  if (command === "list") {
    if (entries.length === 0) {
      console.log("No notes yet.");
      return;
    }
    console.log(`${entries.length} note${entries.length === 1 ? "" : "s"}:\n`);
    entries.forEach((entry, i) => console.log(describe(entry, i) + "\n"));
    console.log("Remove one with:  npm run notes remove <id>");
    return;
  }

  if (command === "remove") {
    if (!target) {
      console.error("Which one? Usage: npm run notes remove <id>");
      process.exitCode = 1;
      return;
    }
    const matches = entries.filter((e) => e.id.startsWith(target));
    if (matches.length === 0) {
      console.error(`No note starts with "${target}". Run "npm run notes" to see the ids.`);
      process.exitCode = 1;
      return;
    }
    if (matches.length > 1) {
      console.error(`"${target}" matches ${matches.length} notes. Use more characters.`);
      process.exitCode = 1;
      return;
    }

    const [entry] = matches;
    console.log(describe(entry, entries.indexOf(entry)) + "\n");
    if (!(await confirm("Remove this note?"))) {
      console.log("Left it alone.");
      return;
    }

    await removeDrawingFor(entry);
    await writeEntries(entries.filter((e) => e.id !== entry.id));
    console.log("Removed.");
    return;
  }

  if (command === "clear") {
    if (entries.length === 0) {
      console.log("Already empty.");
      return;
    }
    if (!(await confirm(`Remove all ${entries.length} notes?`))) {
      console.log("Left them alone.");
      return;
    }
    for (const entry of entries) await removeDrawingFor(entry);
    await writeEntries([]);
    console.log("Board cleared.");
    return;
  }

  console.error(`Unknown command "${command}". Try: list, remove <id>, clear`);
  process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
