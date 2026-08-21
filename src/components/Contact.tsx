"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
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
    <section
      id="contact"
      className="ink-grain relative overflow-hidden bg-ink px-6 py-32 text-cream md:px-10 md:py-44"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-clay/10 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <SectionHeading number="06" label="Contact" tone="ink" align="center">
          Building something worth{" "}
          <span className="italic text-clay">reasoning about?</span>
        </SectionHeading>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-lg text-[17px] leading-relaxed text-ink-muted">
            I&rsquo;m open to full-time SWE and AI agent engineering roles. The fastest way
            to reach me is email, and I read every one.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={`mailto:${profile.email}`}
              className="bg-clay text-ink hover:bg-terracotta-soft"
            >
              {profile.email}
            </MagneticButton>

            <button
              onClick={copyEmail}
              data-cursor-hover
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink-line text-ink-muted transition-colors hover:border-clay hover:text-clay"
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
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-clay"
            >
              <GithubIcon size={16} /> GitHub
            </a>
            <span className="text-ink-line">·</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-clay"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
