"use client";

import { motion } from "framer-motion";
import { Pin } from "lucide-react";
import { relativeTime, seededTilt } from "@/lib/relativeTime";

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  seed: string;
  drawing: string | null;
  createdAt: string;
};

export function NoteCard({ entry, isNew }: { entry: GuestbookEntry; isNew?: boolean }) {
  const tilt = seededTilt(entry.id);

  return (
    <motion.div
      layout
      initial={isNew ? { opacity: 0, y: -18, scale: 0.85, rotate: 0 } : false}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: tilt }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="relative w-full break-inside-avoid rounded-lg border border-line bg-cream-dim p-3.5 shadow-sm"
    >
      <Pin
        size={14}
        className="absolute -top-2 left-1/2 -translate-x-1/2 -rotate-12 text-terracotta"
        fill="var(--color-terracotta)"
      />
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-semibold text-charcoal">{entry.name}</span>
        <span className="shrink-0 text-[10px] text-charcoal-faint">
          {relativeTime(entry.createdAt)}
        </span>
      </div>
      {entry.message && (
        <p className="mt-1.5 text-[13px] leading-snug text-charcoal-soft">{entry.message}</p>
      )}
      {entry.drawing && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={entry.drawing}
          alt={
            entry.seed
              ? `Pattern grown from the word "${entry.seed}"`
              : `Drawing from ${entry.name}`
          }
          className="mt-2 w-full rounded border border-line-soft bg-cream"
        />
      )}
      {entry.seed && (
        <p className="mt-1.5 text-[10px] italic text-charcoal-faint">from &ldquo;{entry.seed}&rdquo;</p>
      )}
    </motion.div>
  );
}
