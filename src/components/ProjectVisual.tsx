"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

const sage = "var(--color-sage-500)";
const sageSoft = "var(--color-sage-200)";
const charcoal = "var(--color-charcoal)";
const terracotta = "var(--color-terracotta)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 400 280" className="h-full w-full">
      {children}
    </svg>
  );
}

function NoteKitVisual() {
  return (
    <Frame>
      <rect x="24" y="28" width="230" height="224" rx="14" fill="var(--color-cream)" stroke={sageSoft} />
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={44}
          y={56 + i * 26}
          width={i === 3 ? 110 : 190 - i * 14}
          height="8"
          rx="4"
          fill={i % 3 === 0 ? sage : sageSoft}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: "44px 0px" }}
        />
      ))}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(44 ${168 + i * 24})`}>
          <rect width="16" height="16" rx="8" fill="none" stroke={terracotta} strokeWidth="1.5" />
          <text x="8" y="11" fontSize="9" textAnchor="middle" fill={terracotta} fontFamily="var(--font-sans)">
            {i + 1}
          </text>
          <rect x="24" y="4" width={130 - i * 20} height="7" rx="3.5" fill={sageSoft} />
        </g>
      ))}
      <g transform="translate(310 90)">
        <circle r="42" fill="none" stroke={sageSoft} strokeWidth="8" />
        <motion.circle
          r="42"
          fill="none"
          stroke={sage}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 42}
          initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
          whileInView={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - 0.953) }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          transform="rotate(-90)"
        />
        <text x="0" y="6" textAnchor="middle" fontSize="17" fontFamily="var(--font-display)" fill={charcoal}>
          95%
        </text>
      </g>
      <text x="310" y="164" textAnchor="middle" fontSize="9" fill="var(--color-charcoal-faint)" fontFamily="var(--font-sans)">
        faithfulness
      </text>
    </Frame>
  );
}

function RatePilotVisual() {
  const branches = [
    { label: "Accept", y: 60, color: sage },
    { label: "Counter", y: 138, color: terracotta },
    { label: "Escalate", y: 216, color: charcoal },
  ];
  return (
    <Frame>
      <g transform="translate(46 118)">
        <circle r="26" fill={sage} opacity="0.15" />
        <circle r="16" fill={sage} />
        <text x="0" y="4" textAnchor="middle" fontSize="9" fill="var(--color-cream)" fontFamily="var(--font-sans)">
          agent
        </text>
      </g>
      {branches.map((b, i) => (
        <g key={b.label}>
          <motion.path
            d={`M 70 118 C 160 118, 160 ${b.y}, 240 ${b.y}`}
            fill="none"
            stroke={b.color}
            strokeWidth="1.5"
            strokeDasharray="4 5"
            initial={{ opacity: 0.25 }}
            whileInView={{ opacity: [0.25, 1, 0.25] }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
          />
          <rect x="244" y={b.y - 16} width="110" height="32" rx="16" fill="var(--color-cream)" stroke={b.color} strokeWidth="1.4" />
          <text x="299" y={b.y + 4} textAnchor="middle" fontSize="11" fill={charcoal} fontFamily="var(--font-sans)">
            {b.label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function EdgeVisionVisual() {
  const cars = [
    { x: 60, w: 70, speed: "38 mph" },
    { x: 210, w: 90, speed: "52 mph" },
  ];
  return (
    <Frame>
      <line x1="0" y1="200" x2="400" y2="200" stroke={sageSoft} strokeWidth="2" />
      <line x1="0" y1="230" x2="400" y2="230" stroke={sageSoft} strokeWidth="2" strokeDasharray="14 10" />
      {cars.map((c) => (
        <g key={c.x}>
          <rect x={c.x} y="150" width={c.w} height="42" rx="8" fill={charcoal} opacity="0.85" />
          <rect x={c.x - 6} y="144" width={c.w + 12} height={54} rx="10" fill="none" stroke={terracotta} strokeWidth="1.5" strokeDasharray="5 4" />
          <rect x={c.x - 6} y="128" width="72" height="16" rx="3" fill={terracotta} />
          <text x={c.x + 30} y="140" fontSize="9.5" textAnchor="middle" fill="var(--color-cream)" fontFamily="var(--font-sans)">
            {c.speed}
          </text>
        </g>
      ))}
      <motion.line
        x1="0"
        x2="400"
        y1="40"
        y2="40"
        stroke={sage}
        strokeWidth="2"
        initial={{ y1: 40, y2: 40, opacity: 0.7 }}
        whileInView={{ y1: [40, 210, 40], y2: [40, 210, 40] }}
        viewport={{ once: true }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </Frame>
  );
}

function GraphBenchmarkVisual() {
  const nodes = [
    { x: 200, y: 40 },
    { x: 90, y: 110 },
    { x: 310, y: 110 },
    { x: 130, y: 220 },
    { x: 270, y: 220 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [1, 2],
    [3, 4],
  ];
  return (
    <Frame>
      {edges.map(([a, b], i) => (
        <g key={i}>
          <line
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={sageSoft}
            strokeWidth="1.5"
          />
          <motion.circle
            r="3"
            fill={terracotta}
            cx={nodes[a].x}
            cy={nodes[a].y}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [0, nodes[b].x - nodes[a].x],
              y: [0, nodes[b].y - nodes[a].y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35, ease: "linear" }}
          />
        </g>
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 0 ? 12 : 9}
          fill={i === 0 ? sage : "var(--color-cream)"}
          stroke={sage}
          strokeWidth="2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.08 }}
        />
      ))}
    </Frame>
  );
}

function DeltaVisual() {
  return (
    <Frame>
      <rect x="24" y="30" width="150" height="220" rx="12" fill="var(--color-cream)" stroke={sageSoft} />
      <text x="40" y="54" fontSize="10" fill="var(--color-charcoal-faint)" fontFamily="var(--font-sans)">
        prompt v0
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="40" y={68 + i * 20} width={140 - (i % 2) * 30} height="7" rx="3.5" fill={sageSoft} />
      ))}

      <rect x="226" y="30" width="150" height="220" rx="12" fill="var(--color-cream)" stroke={sage} strokeWidth="1.5" />
      <text x="242" y="54" fontSize="10" fill={sage} fontFamily="var(--font-sans)">
        proposed
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={i}
          x="242"
          y={68 + i * 20}
          width={142 - (i % 3) * 24}
          height="7"
          rx="3.5"
          fill={i === 1 || i === 3 ? terracotta : sageSoft}
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.1 }}
        />
      ))}

      <g transform="translate(200 140)">
        <circle r="20" fill={charcoal} />
        <text x="0" y="6" textAnchor="middle" fontSize="16" fill="var(--color-cream)" fontFamily="var(--font-display)">
          Δ
        </text>
      </g>
      <g transform="translate(200 190)" opacity="0.7">
        <text x="0" y="0" textAnchor="middle" fontSize="9" fill="var(--color-charcoal-faint)" fontFamily="var(--font-sans)">
          held-out
        </text>
        <text x="0" y="12" textAnchor="middle" fontSize="9" fill="var(--color-charcoal-faint)" fontFamily="var(--font-sans)">
          test only
        </text>
      </g>
    </Frame>
  );
}

const visuals: Record<Project["slug"], React.ComponentType> = {
  notekit: NoteKitVisual,
  ratepilot: RatePilotVisual,
  "edge-vision": EdgeVisionVisual,
  "graph-benchmark": GraphBenchmarkVisual,
  delta: DeltaVisual,
};

export function ProjectVisual({ slug }: { slug: Project["slug"] }) {
  const Visual = visuals[slug];
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-sage-50"
    >
      <div className="absolute inset-0 p-2">
        <Visual />
      </div>
    </div>
  );
}
