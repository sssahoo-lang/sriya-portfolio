"use client";

import { motion, useReducedMotion } from "framer-motion";

const HAIR = "#232220";
const SKIN = "#eccdb6";
const SKIN_SHADE = "#dcb69c";

/**
 * Hand-built desk scene: someone working behind a laptop with a mug going cold.
 * Everything is drawn from primitives so it inherits the site palette and stays
 * crisp at any size.
 */
export function DeskScene({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  const bob = reduceMotion
    ? {}
    : { y: [0, -3, 0], transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <svg
      // Cropped to the drawing itself. The old 0 0 320 300 box carried ~50px of
      // dead space above the head and ~30 below the desk, which made the scene
      // read small and floaty however wide its container was.
      viewBox="16 40 294 238"
      role="img"
      aria-label="Illustration of someone working at a laptop with a mug of coffee"
      className={className ?? "h-auto w-full max-w-[340px]"}
    >
      {/* desk */}
      <line x1="26" y1="268" x2="300" y2="268" stroke="var(--color-line)" strokeWidth="2" strokeLinecap="round" />

      <motion.g animate={bob}>
        {/* torso */}
        <path
          d="M96 258 C96 182 114 140 145 140 C176 140 194 182 194 258 Z"
          fill="var(--color-sage-200)"
        />
        <path
          d="M133 144 C138 156 152 156 157 144"
          stroke="var(--color-sage-400)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* neck */}
        <rect x="136" y="116" width="18" height="28" rx="8" fill={SKIN_SHADE} />

        {/*
          Hair is a bob whose sides stop above the jaw. Drawing it as an ellipse
          behind the face tapers it to a point under the chin, which reads as a beard.
        */}
        <path
          d="M112 92 C112 60 126 50 145 50 C164 50 178 60 178 92 L178 112 Q178 120 170 120 L120 120 Q112 120 112 112 Z"
          fill={HAIR}
        />

        {/* face */}
        <ellipse cx="145" cy="100" rx="24" ry="27" fill={SKIN} />

        {/* fringe, swept slightly to one side */}
        <path d="M121 90 C130 72 152 70 169 84 L169 64 L121 64 Z" fill={HAIR} />

        {/* ponytail */}
        <ellipse cx="184" cy="104" rx="7" ry="15" fill={HAIR} transform="rotate(18 184 104)" />

        {/* eyes, with an occasional blink */}
        {[136, 154].map((cx) => (
          <motion.ellipse
            key={cx}
            cx={cx}
            cy={102}
            rx={2.4}
            ry={3.4}
            fill={HAIR}
            style={{ transformOrigin: `${cx}px 102px` }}
            animate={reduceMotion ? {} : { scaleY: [1, 1, 0.1, 1] }}
            transition={
              reduceMotion
                ? {}
                : { duration: 4.2, times: [0, 0.92, 0.96, 1], repeat: Infinity, ease: "linear" }
            }
          />
        ))}

        {/* smile */}
        <path
          d="M139 112 Q145 117 151 112"
          fill="none"
          stroke={HAIR}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </motion.g>

      {/* laptop */}
      <rect x="64" y="174" width="162" height="82" rx="9" fill="var(--color-charcoal)" />
      <path d="M50 256 L240 256 L250 268 L40 268 Z" fill="var(--color-charcoal)" />
      <motion.circle
        cx="145"
        cy="215"
        r="7"
        fill="var(--color-sage-500)"
        initial={{ opacity: 0.55 }}
        animate={reduceMotion ? {} : { opacity: [0.55, 1, 0.55] }}
        transition={reduceMotion ? {} : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* mug */}
      <path
        d="M258 236 L288 236 L284 264 L262 264 Z"
        fill="var(--color-cream-dim)"
        stroke="var(--color-line)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M288 242 q11 5 -5 14"
        fill="none"
        stroke="var(--color-line)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* steam */}
      {!reduceMotion &&
        [0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M${266 + i * 8} 230 q5 -7 0 -14`}
            fill="none"
            stroke="var(--color-charcoal-faint)"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0], y: [2, -16] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.9, ease: "easeOut" }}
          />
        ))}
    </svg>
  );
}
