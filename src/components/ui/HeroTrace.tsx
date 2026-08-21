"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Step = {
  label: string;
  meta?: string;
  kind?: "tool" | "decision" | "done";
};

/**
 * The hero's claim is "agents that show their work," so the hero shows the work:
 * a generic agent run — tool calls, a check that fails, a second call, a cited
 * answer, a logged rationale — advancing a step at a time on a loop. Deliberately
 * not tied to one project; it's the shape of the thing she builds.
 */
const STEPS: Step[] = [
  { label: "question received", meta: "user" },
  { label: "search_docs()", meta: "1.2s", kind: "tool" },
  { label: "12 passages ranked", meta: "fused" },
  { label: "enough to answer?", meta: "no", kind: "decision" },
  { label: "query_metrics()", meta: "0.4s", kind: "tool" },
  { label: "answer drafted", meta: "4 citations" },
  { label: "decision logged", meta: "with rationale", kind: "done" },
];

const STEP_MS = 850;
const HOLD_MS = 2200;

export function HeroTrace() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  // Reduced motion gets the finished trace rather than an empty panel, derived
  // at render so the effect never has to write state on that path.
  const shown = reduceMotion ? STEPS.length : step;

  useEffect(() => {
    if (reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = (n: number) => {
      setStep(n);
      const done = n >= STEPS.length;
      timer = setTimeout(() => tick(done ? 0 : n + 1), done ? HOLD_MS : STEP_MS);
    };
    timer = setTimeout(() => tick(1), 600);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <div
      aria-hidden="true"
      className="ink-grain relative w-full overflow-hidden rounded-xl border border-ink-line bg-ink px-6 py-5 shadow-[0_18px_50px_-24px_rgba(31,30,28,0.55)]"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between border-b border-ink-line pb-3">
          <span className="font-instrument text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            Agent trace
          </span>
          <span className="flex items-center gap-1.5">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-verdigris"
              initial={{ opacity: 0.4 }}
              animate={reduceMotion ? { opacity: 0.9 } : { opacity: [0.35, 1, 0.35] }}
              transition={
                reduceMotion ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }
            />
            <span className="font-instrument text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              live
            </span>
          </span>
        </div>

        {/* Height is pinned so the surrounding layout never shifts as steps land. */}
        <ol className="mt-4 flex flex-col gap-[13px] min-h-[236px]">
          {STEPS.map((step, i) => {
            const visible = i < shown;
            const current = i === shown - 1;
            return (
              <motion.li
                key={step.label}
                className="flex items-baseline gap-3"
                initial={false}
                animate={{
                  opacity: visible ? (current ? 1 : 0.55) : 0,
                  x: visible ? 0 : -6,
                }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className={
                    "font-instrument w-3 shrink-0 text-[11px] " +
                    (step.kind === "done"
                      ? "text-verdigris"
                      : step.kind === "decision"
                        ? "text-clay"
                        : "text-ink-dim")
                  }
                >
                  {step.kind === "done" ? "✓" : step.kind === "tool" ? "▸" : "·"}
                </span>

                <span
                  className={
                    "font-instrument text-[13px] " +
                    (step.kind === "done"
                      ? "text-verdigris"
                      : step.kind === "decision"
                        ? "text-clay"
                        : step.kind === "tool"
                          ? "text-cream"
                          : "text-ink-muted")
                  }
                >
                  {step.label}
                </span>

                {step.meta && (
                  <span className="font-instrument ml-auto shrink-0 text-[10px] uppercase tracking-[0.12em] text-ink-dim">
                    {step.meta}
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
