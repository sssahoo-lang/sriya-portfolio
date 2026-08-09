import type { Metadata } from "next";
import Link from "next/link";
import { readEntries } from "@/lib/guestbook";
import { NoteCard } from "@/components/GuestbookNoteCard";

export const metadata: Metadata = {
  title: "Notes | Sriya Smita Sahoo",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const entries = [...(await readEntries())].reverse();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16 md:px-10">
      <Link href="/" className="text-sm text-charcoal-faint hover:text-sage-600">
        ← Back to the site
      </Link>

      <h1 className="font-display mt-6 text-3xl">Everything pinned to the board</h1>
      <p className="mt-2 text-sm text-charcoal-faint">
        {entries.length} {entries.length === 1 ? "note" : "notes"}, also stored as JSON and PNG
        files under <code className="rounded bg-cream-dim px-1.5 py-0.5">/data</code> in the
        project folder.
      </p>

      {entries.length === 0 ? (
        <p className="mt-16 text-center text-sm text-charcoal-faint">
          Nothing pinned yet.
        </p>
      ) : (
        <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {entries.map((entry) => (
            <NoteCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </main>
  );
}
