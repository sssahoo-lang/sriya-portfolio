"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * One heading treatment for every section: a mono eyebrow carrying the section
 * number, a hairline rule running to the edge, and a display headline set large
 * enough to actually open the section. Keeping it in one place is what stops the
 * type scale drifting back down section by section.
 */
export function SectionHeading({
  number,
  label,
  children,
  tone = "light",
  align = "left",
  className,
}: {
  number: string;
  label: string;
  children: ReactNode;
  tone?: "light" | "ink";
  align?: "left" | "center";
  className?: string;
}) {
  const ink = tone === "ink";
  const centered = align === "center";

  return (
    <div className={className}>
      <Reveal>
        <div
          className={
            "flex items-baseline gap-4 " + (centered ? "justify-center" : "")
          }
        >
          <span
            className={
              "font-instrument text-[11px] uppercase tracking-[0.2em] " +
              (ink ? "text-clay" : "text-terracotta")
            }
          >
            {number}
          </span>
          <span
            className={
              "font-instrument text-[11px] uppercase tracking-[0.2em] " +
              (ink ? "text-ink-dim" : "text-charcoal-faint")
            }
          >
            {label}
          </span>
          {!centered && (
            <span className={"h-px flex-grow " + (ink ? "bg-ink-line" : "bg-line")} />
          )}
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <h2
          className={
            "font-display mt-9 text-balance text-[2rem] font-light leading-[1.08] tracking-tight md:text-[3rem] " +
            (centered ? "mx-auto text-center " : "") +
            (ink ? "text-cream" : "text-charcoal")
          }
        >
          {children}
        </h2>
      </Reveal>
    </div>
  );
}
