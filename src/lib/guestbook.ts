import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  /** The word the visitor's pattern was grown from. */
  seed: string;
  /** PNG data URL of the generated pattern. */
  drawing: string | null;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "guestbook.json");
const DRAWINGS_DIR = path.join(DATA_DIR, "guestbook-drawings");

const DRAWING_PREFIX = "data:image/png;base64,";
const MAX_DRAWING_BYTES = 2_500_000;
const MAX_MESSAGE_LENGTH = 300;
const MAX_NAME_LENGTH = 40;
const MAX_SEED_LENGTH = 30;

async function ensureDataFiles() {
  await fs.mkdir(DRAWINGS_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

// Serializes reads/writes within this process so two near-simultaneous
// submissions can't clobber each other's read-modify-write of the JSON file.
let writeQueue: Promise<unknown> = Promise.resolve();
function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(task, task);
  writeQueue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

export async function readEntries(): Promise<GuestbookEntry[]> {
  await ensureDataFiles();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Entries written before seed art existed have no `seed` field.
    return (parsed as GuestbookEntry[]).map((entry) => ({ ...entry, seed: entry.seed ?? "" }));
  } catch {
    return [];
  }
}

export async function addEntry(input: {
  name?: string;
  message?: string;
  seed?: string;
  drawingDataUrl?: string;
}): Promise<GuestbookEntry> {
  const name = (input.name ?? "").trim().slice(0, MAX_NAME_LENGTH) || "Anonymous";
  const message = (input.message ?? "").trim().slice(0, MAX_MESSAGE_LENGTH);
  const seed = (input.seed ?? "").trim().slice(0, MAX_SEED_LENGTH);
  const drawing =
    typeof input.drawingDataUrl === "string" && input.drawingDataUrl.startsWith(DRAWING_PREFIX)
      ? input.drawingDataUrl
      : null;

  if (!message && !seed) {
    throw new Error("Add a word or a message before pinning.");
  }
  if (drawing && drawing.length > MAX_DRAWING_BYTES) {
    throw new Error("That pattern came out too large to save.");
  }

  return enqueue(async () => {
    await ensureDataFiles();

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const entry: GuestbookEntry = { id, name, message, seed, drawing, createdAt };

    if (drawing) {
      const base64 = drawing.slice(DRAWING_PREFIX.length);
      const fileName = `${createdAt.slice(0, 10)}_${id}.png`;
      await fs.writeFile(path.join(DRAWINGS_DIR, fileName), Buffer.from(base64, "base64"));
    }

    const entries = await readEntries();
    entries.push(entry);
    await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");

    return entry;
  });
}
