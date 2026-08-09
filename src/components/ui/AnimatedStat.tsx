"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const PLAIN_NUMBER = /^(-?\d+(?:\.\d+)?)(%?)$/;

function CountUpNumber({ value }: { value: string }) {
  const match = value.match(PLAIN_NUMBER);
  const ref = useRef<HTMLSpanElement>(null);
  const displayRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const suffix = match ? match[2] : "";

  // The spring starts at 0 so there's somewhere to count up from. That's just the
  // animation's internal state, though. The markup below always renders the real
  // final `value` as its default text, so anyone who never triggers this effect
  // (no JS, prefers-reduced-motion, or the element never scrolling into view)
  // still sees the correct number instead of a "0" stuck forever.
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });

  useEffect(() => {
    if (!match || reduceMotion || !inView) return;
    motionValue.set(target);
  }, [inView, match, reduceMotion, target, motionValue]);

  useEffect(() => {
    if (!match) return;
    const unsub = spring.on("change", (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = v.toFixed(decimals) + suffix;
      }
    });
    return unsub;
  }, [spring, decimals, suffix, match]);

  if (!match) return <span>{value}</span>;

  return (
    <span ref={ref}>
      <span ref={displayRef}>{value}</span>
    </span>
  );
}

export function AnimatedStat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="font-display text-3xl md:text-4xl text-sage-600 tabular-nums">
        <CountUpNumber value={value} />
      </div>
      <div className="mt-1 text-sm text-charcoal-soft">{label}</div>
    </motion.div>
  );
}
