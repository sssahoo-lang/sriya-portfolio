"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { profile } from "@/lib/data";

/**
 * Shows the resume in a modal on top of the page instead of a new tab or
 * window.open() — Safari on macOS/iOS can silently block those, especially
 * if there's any delay between the click and the navigation.
 */
export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm md:p-8"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Resume"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-cream shadow-2xl"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-3">
              <span className="text-sm font-medium text-charcoal">Resume</span>
              <div className="flex items-center gap-2">
                <a
                  href={profile.resumeHref}
                  download
                  data-cursor-hover
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-charcoal-soft transition-colors hover:border-sage-400 hover:text-charcoal"
                >
                  <Download size={13} />
                  Download
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  data-cursor-hover
                  aria-label="Close"
                  className="grid h-8 w-8 place-items-center rounded-full text-charcoal-faint transition-colors hover:bg-cream-dim hover:text-charcoal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 bg-cream-dim">
              <object
                data={`${profile.resumeHref}#view=FitH`}
                type="application/pdf"
                className="h-full w-full"
              >
                <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                  <p className="max-w-xs text-sm text-charcoal-soft">
                    Your browser can&rsquo;t preview PDFs here. You can still download it.
                  </p>
                  <a
                    href={profile.resumeHref}
                    download
                    className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 text-sm text-cream"
                  >
                    <Download size={14} />
                    Download the resume
                  </a>
                </div>
              </object>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
