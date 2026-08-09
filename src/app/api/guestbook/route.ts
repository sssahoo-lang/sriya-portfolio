import { NextRequest, NextResponse } from "next/server";
import { addEntry, readEntries } from "@/lib/guestbook";

const COOLDOWN_MS = 8_000;
const lastSubmissionByClient = new Map<string, number>();

function clientKey(req: NextRequest): string {
  return req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
}

// Each entry carries its artwork inline as a base64 PNG, so the board only loads a
// recent window. The /notes page reads from disk and still shows everything.
const BOARD_LIMIT = 60;

export async function GET() {
  const entries = await readEntries();
  const newestFirst = [...entries].reverse().slice(0, BOARD_LIMIT);
  return NextResponse.json({ entries: newestFirst });
}

export async function POST(req: NextRequest) {
  // Belt-and-suspenders: the UI hides the form on Vercel already (its filesystem
  // is read-only outside /tmp), but guard the route directly too.
  if (process.env.VERCEL === "1") {
    return NextResponse.json(
      { error: "Pinning is paused while permanent storage gets wired up. Check back soon." },
      { status: 503 },
    );
  }

  const key = clientKey(req);
  const now = Date.now();
  const last = lastSubmissionByClient.get(key);
  if (last && now - last < COOLDOWN_MS) {
    return NextResponse.json(
      { error: "One at a time, please. Give it a few seconds." },
      { status: 429 },
    );
  }

  let body: { name?: string; message?: string; seed?: string; drawingDataUrl?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "That didn't come through right." }, { status: 400 });
  }

  try {
    const entry = await addEntry(body);
    lastSubmissionByClient.set(key, now);
    return NextResponse.json({ entry }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
