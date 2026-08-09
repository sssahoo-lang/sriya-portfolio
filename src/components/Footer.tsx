"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { Guestbook } from "./Guestbook";

export function Footer({ guestbookEnabled = true }: { guestbookEnabled?: boolean }) {
  return (
    <footer>
      <Guestbook enabled={guestbookEnabled} />

      <div className="mx-auto max-w-6xl px-6 pt-10 md:px-10">
        <motion.svg
          viewBox="0 0 220 60"
          className="h-10 w-auto text-charcoal-faint"
          fill="none"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.path
            d="M8 40 C20 10 40 10 55 30 C65 44 80 44 85 28 C90 14 105 14 112 26 C118 36 130 36 135 22 C140 10 155 10 165 24 C172 34 185 40 195 26 C200 18 208 16 212 22"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              show: {
                pathLength: 1,
                opacity: 1,
                transition: { pathLength: { duration: 1.4, ease: "easeInOut" }, opacity: { duration: 0.3 } },
              },
            }}
          />
        </motion.svg>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-charcoal-faint sm:flex-row md:px-10">
        <p>© {new Date().getFullYear()} {profile.name}. Built by hand, one section at a time.</p>
        <a href="#top" data-cursor-hover className="hover:text-sage-600">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
