"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hammer, Loader2, Send, Shuffle } from "lucide-react";
import { SeedArtCanvas, type SeedArtCanvasHandle } from "./ui/SeedArtCanvas";
import { NoteCard, type GuestbookEntry } from "./GuestbookNoteCard";

const FAMILY_LABELS: Record<string, string> = {
  current: "drift",
  orbit: "orbit",
  strata: "strata",
};

const SUGGESTIONS = [
  "midnight",
  "bloomington",
  "chai",
  "monsoon",
  "hello world",
  "chicago",
  "backpropagation",
  "sunday",
];

export function Guestbook({ enabled = true }: { enabled?: boolean }) {
  const canvasRef = useRef<SeedArtCanvasHandle>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [seed, setSeed] = useState("hello world");
  const [family, setFamily] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justPostedId, setJustPostedId] = useState<string | null>(null);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then((data) => setEntries(data.entries ?? []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  function shuffleSeed() {
    const options = SUGGESTIONS.filter((s) => s !== seed);
    setSeed(options[Math.floor(Math.random() * options.length)]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!message.trim() && !seed.trim()) {
      setError("Add a word or a message before pinning.");
      return;
    }

    const drawingDataUrl = seed.trim() ? (canvasRef.current?.getDataUrl() ?? undefined) : undefined;

    setSubmitting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, seed, drawingDataUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setEntries((prev) => [data.entry, ...prev]);
      setJustPostedId(data.entry.id);
      setName("");
      setMessage("");
      setTimeout(() => setJustPostedId(null), 2400);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="border-t border-line px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-sage-600">
          Before you go
        </span>
        <h2 className="font-display mt-3 max-w-xl text-balance text-2xl leading-tight md:text-3xl">
          Type a word. Watch it grow into something.
        </h2>
        <p className="mt-3 max-w-lg text-sm text-charcoal-faint">
          Every word draws its own pattern, and the same word always draws the same one, so
          yours is yours. Pin it to the board with a note if you like. I read all of them.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {enabled ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <SeedArtCanvas ref={canvasRef} seed={seed} onFamilyChange={setFamily} />

              <div className="flex items-center gap-2">
                <input
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  maxLength={30}
                  placeholder="any word will do"
                  aria-label="Word to grow a pattern from"
                  className="flex-1 rounded-xl border border-line bg-cream px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal-faint focus:border-sage-400"
                />
                <button
                  type="button"
                  onClick={shuffleSeed}
                  data-cursor-hover
                  aria-label="Try a random word"
                  className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-line text-charcoal-faint transition-colors hover:border-sage-400 hover:text-sage-600"
                >
                  <Shuffle size={15} />
                </button>
              </div>

              {family && (
                <p className="-mt-1 text-[11px] text-charcoal-faint">
                  {seed.trim() ? (
                    <>
                      &ldquo;{seed.trim()}&rdquo; grew{" "}
                      {/^[aeiou]/i.test(FAMILY_LABELS[family] ?? family) ? "an" : "a"}{" "}
                      <span className="text-sage-600">{FAMILY_LABELS[family] ?? family}</span> pattern
                    </>
                  ) : (
                    "type something to grow a pattern"
                  )}
                </p>
              )}

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={300}
                rows={2}
                placeholder="Say hi, leave a thought, whatever's on your mind…"
                className="resize-none rounded-xl border border-line bg-cream px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal-faint focus:border-sage-400"
              />

              <div className="flex items-center gap-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                  placeholder="Your name (optional)"
                  className="flex-1 rounded-xl border border-line bg-cream px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal-faint focus:border-sage-400"
                />
                <button
                  type="submit"
                  disabled={submitting || (!message.trim() && !seed.trim())}
                  data-cursor-hover
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-sage-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                  Pin it
                </button>
              </div>

              <div className="min-h-[1.2em] text-xs">
                {error && <span className="text-terracotta">{error}</span>}
                {!error && justPostedId && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sage-600"
                  >
                    Pinned. Thank you!
                  </motion.span>
                )}
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-start justify-center gap-3 rounded-2xl border border-dashed border-line px-6 py-10 text-charcoal-faint">
              <Hammer size={20} className="text-sage-600" />
              <p className="text-sm leading-relaxed">
                The board&rsquo;s pen is being sharpened. I&rsquo;m wiring up permanent storage
                for it, so pinning is paused for now. Everyone&rsquo;s free to look around in
                the meantime.
              </p>
            </div>
          )}

          <div className="max-h-[520px] overflow-y-auto rounded-2xl border border-line bg-cream/60 p-4">
            {loaded && entries.length === 0 && (
              <p className="grid h-full min-h-[200px] place-items-center text-center text-sm text-charcoal-faint">
                The board&rsquo;s empty so far. Be the first to pin something.
              </p>
            )}
            <div className="columns-2 gap-3 sm:columns-3 [&>*]:mb-3">
              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <NoteCard key={entry.id} entry={entry} isNew={entry.id === justPostedId} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
