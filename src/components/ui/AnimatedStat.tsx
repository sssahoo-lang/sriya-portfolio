"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const PLAIN_NUMBER = /^(-?\d+(?:\.\d+)?)(%?)$/;

function CountUpNumber({ value }: { value: string }) {
  const match = value.match(PLAIN_NUMBER);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const suffix = match ? match[2] : "";

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(target);
  }, [inView, target, motionValue]);

  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = v.toFixed(decimals) + suffix;
      }
    });
    return unsub;
  }, [spring, decimals, suffix]);

  if (!match) return <span>{value}</span>;

  return (
    <span ref={ref}>
      <span ref={displayRef}>0{suffix}</span>
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
