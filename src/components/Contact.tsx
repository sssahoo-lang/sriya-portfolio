"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import { Reveal } from "./ui/Reveal";
import { MagneticButton } from "./ui/MagneticButton";
import { profile } from "@/lib/data";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable, no-op: the mailto link still works
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-sage-100/60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-sage-600">
            06 · Contact
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display mt-6 text-balance text-4xl leading-tight md:text-6xl">
            Building something worth <span className="italic text-sage-600">reasoning about?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-lg text-charcoal-soft">
            I&rsquo;m open to full-time SWE and AI agent engineering roles. The fastest way
            to reach me is email, and I read every one.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={`mailto:${profile.email}`}
              className="bg-sage-600 text-cream hover:bg-sage-700"
            >
              {profile.email}
            </MagneticButton>

            <button
              onClick={copyEmail}
              data-cursor-hover
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/15 text-charcoal-soft transition-colors hover:border-sage-500 hover:text-sage-600"
              aria-label="Copy email address"
            >
              <motion.span
                key={copied ? "check" : "copy"}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </motion.span>
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 text-sm text-charcoal-faint transition-colors hover:text-sage-600"
            >
              <GithubIcon size={16} /> GitHub
            </a>
            <span className="text-line">·</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 text-sm text-charcoal-faint transition-colors hover:text-sage-600"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
