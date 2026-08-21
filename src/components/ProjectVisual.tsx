"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/data";

/* Palette for diagrams sitting on the ink band. Everything here is deliberately
   drawn rather than decorated: each visual shows the actual mechanism of the
   system it belongs to, so the picture is evidence, not ornament. */
const cream = "var(--color-cream)";
const muted = "var(--color-ink-muted)";
const dim = "var(--color-ink-dim)";
const line = "var(--color-ink-line)";
const clay = "var(--color-clay)";
const verdigris = "var(--color-verdigris)";
const mono = "var(--font-instrument)";

const ease = [0.16, 1, 0.3, 1] as const;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      {children}
    </svg>
  );
}

function Label({
  x,
  y,
  children,
  fill = dim,
  size = 8.5,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  fill?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={fill}
      textAnchor={anchor}
      fontFamily={mono}
      letterSpacing="0.08em"
    >
      {children}
    </text>
  );
}

/* NoteKit — the hybrid retrieval path. A query fans out into a dense-vector lane
   and a full-text lane, the two rankings fuse, a reranker reorders, and only then
   does anything reach the answer. The animation runs a pulse down both lanes so
   the "two searches, one fused ranking" idea is legible without a caption. */
function NoteKitVisual({ still }: { still: boolean }) {
  const lanes = [
    { y: 96, label: "dense · pgvector", color: verdigris },
    { y: 204, label: "full-text · tsquery", color: clay },
  ];

  return (
    <Frame>
      <Label x={22} y={30}>
        RETRIEVAL PATH
      </Label>

      <circle cx={34} cy={150} r={7} fill={cream} />
      <Label x={22} y={172} fill={muted}>
        QUERY
      </Label>

      {lanes.map((lane, i) => (
        <g key={lane.label}>
          <path
            d={`M 44 150 C 90 150, 90 ${lane.y}, 140 ${lane.y}`}
            fill="none"
            stroke={line}
            strokeWidth={1.5}
          />
          <rect
            x={140}
            y={lane.y - 15}
            width={104}
            height={30}
            rx={5}
            fill="none"
            stroke={lane.color}
            strokeWidth={1.2}
            opacity={0.85}
          />
          <Label x={192} y={lane.y + 3.5} fill={lane.color} anchor="middle" size={8}>
            {lane.label}
          </Label>
          <path
            d={`M 244 ${lane.y} C 280 ${lane.y}, 280 150, 306 150`}
            fill="none"
            stroke={line}
            strokeWidth={1.5}
          />
          {!still && (
            <motion.circle
              r={3}
              fill={lane.color}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                delay: i * 0.5,
                times: [0, 0.12, 0.82, 1],
              }}
            >
              <animateMotion
                dur="2.6s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
                path={`M 44 150 C 90 150, 90 ${lane.y}, 140 ${lane.y} L 244 ${lane.y} C 280 ${lane.y}, 280 150, 306 150`}
              />
            </motion.circle>
          )}
        </g>
      ))}

      {/* fusion + rerank */}
      <g transform="translate(306 150)">
        <motion.circle
          r={17}
          fill="none"
          stroke={cream}
          strokeWidth={1.4}
          initial={{ scale: 0.85, opacity: 0.5 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        />
        <Label x={0} y={3} fill={cream} anchor="middle" size={8.5}>
          RRF
        </Label>
      </g>
      <Label x={306} y={192} fill={muted} anchor="middle">
        FUSE
      </Label>

      <line x1={306} y1={205} x2={306} y2={228} stroke={line} strokeWidth={1.5} />
      <Label x={306} y={248} fill={muted} anchor="middle">
        RERANK
      </Label>

      {/* the reranked shortlist reordering itself */}
      <g transform="translate(268 258)">
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={i * 28}
            y={0}
            width={22}
            height={6}
            rx={3}
            fill={i === 0 ? verdigris : line}
            initial={{ scaleY: 0.3, opacity: 0.4 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.5, ease }}
            style={{ transformOrigin: "center" }}
          />
        ))}
      </g>
    </Frame>
  );
}

/* RatePilot — the actual decision trace, the thing that makes the agent
   inspectable. Steps illuminate in sequence: each one is a real move the agent
   makes, and the running highlight is the point (it decided this, then this). */
function RatePilotVisual({ still }: { still: boolean }) {
  const steps = [
    { label: "fetch competitor rates", meta: "web search · tool", color: muted },
    { label: "draft offer · send", meta: "gmail api", color: muted },
    { label: "reply parsed → counter", meta: "rationale stored", color: clay },
    { label: "accepted · logged", meta: "audit trail complete", color: verdigris },
  ];
  const top = 52;
  const gap = 62;

  return (
    <Frame>
      <Label x={22} y={28}>
        AGENT TRACE
      </Label>

      <line
        x1={40}
        y1={top}
        x2={40}
        y2={top + gap * (steps.length - 1)}
        stroke={line}
        strokeWidth={1.5}
      />

      {/* the highlight travelling down the trace */}
      {!still && (
        <motion.circle
          cx={40}
          cy={top}
          r={13}
          fill={cream}
          opacity={0.09}
          initial={{ cy: top }}
          animate={{ cy: steps.map((_, i) => top + gap * i) }}
          transition={{
            duration: 4.4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.33, 0.66, 1],
          }}
        />
      )}

      {steps.map((s, i) => (
        <g key={s.label}>
          <motion.circle
            cx={40}
            cy={top + gap * i}
            r={5.5}
            fill={s.color === muted ? line : s.color}
            stroke={s.color === muted ? muted : s.color}
            strokeWidth={1.4}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.14, type: "spring", stiffness: 300, damping: 18 }}
          />
          <motion.g
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.14, duration: 0.5, ease }}
          >
            <text
              x={62}
              y={top + gap * i + 1}
              fontSize={12}
              fill={s.color === muted ? cream : s.color}
              fontFamily={mono}
            >
              {s.label}
            </text>
            <Label x={62} y={top + gap * i + 16} size={8}>
              {s.meta}
            </Label>
          </motion.g>
        </g>
      ))}
    </Frame>
  );
}

/* Distributed graph engine — the finding itself, drawn. Two workloads, two
   verdicts: the cluster wins big on the 5M-edge graph and loses catastrophically
   once the data fits in one machine's RAM. Bars grow on scroll. */
function GraphBenchmarkVisual({ still }: { still: boolean }) {
  void still;
  const rows = [
    { label: "5M-EDGE GRAPH", cluster: 100, single: 30, win: "cluster", note: "3.3× faster" },
    { label: "FITS IN RAM", cluster: 14, single: 100, win: "single", note: "25–400× slower" },
  ];

  return (
    <Frame>
      <Label x={22} y={28}>
        CLUSTER VS. ONE CORE
      </Label>

      {rows.map((row, i) => {
        const baseY = 66 + i * 118;
        return (
          <g key={row.label}>
            <Label x={22} y={baseY} fill={muted}>
              {row.label}
            </Label>

            {[
              { key: "cluster", w: row.cluster, y: baseY + 16, name: "5-node cluster" },
              { key: "single", w: row.single, y: baseY + 46, name: "1 core, plain python" },
            ].map((bar) => {
              const isWinner = row.win === bar.key;
              return (
                <g key={bar.key}>
                  <Label x={22} y={bar.y + 8} size={7.5} fill={dim}>
                    {bar.name}
                  </Label>
                  <rect x={148} y={bar.y} width={222} height={11} rx={2} fill={line} opacity={0.4} />
                  <motion.rect
                    x={148}
                    y={bar.y}
                    height={11}
                    rx={2}
                    fill={isWinner ? verdigris : clay}
                    opacity={isWinner ? 1 : 0.55}
                    initial={{ width: 0 }}
                    whileInView={{ width: (bar.w / 100) * 222 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.25, duration: 1.1, ease }}
                    style={{ transformOrigin: "148px 0px" }}
                  />
                </g>
              );
            })}

            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1 + i * 0.25, duration: 0.5 }}
            >
              <Label
                x={370}
                y={baseY + 82}
                anchor="end"
                size={9}
                fill={row.win === "cluster" ? verdigris : clay}
              >
                {row.note}
              </Label>
            </motion.g>
          </g>
        );
      })}

      <line x1={22} y1={182} x2={378} y2={182} stroke={line} strokeWidth={1} strokeDasharray="3 4" />
    </Frame>
  );
}

/* Edge vision — on-device detection. The scanline sweeps, boxes lock on, speed
   resolves. Nothing leaves the board, which is the whole claim. */
function EdgeVisionVisual({ still }: { still: boolean }) {
  const cars = [
    { x: 52, w: 84, speed: "38 mph", over: false },
    { x: 224, w: 104, speed: "52 mph", over: true },
  ];

  return (
    <Frame>
      <Label x={22} y={28}>
        ON-DEVICE · NO UPLINK
      </Label>

      <line x1={0} y1={222} x2={400} y2={222} stroke={line} strokeWidth={2} />
      <line
        x1={0}
        y1={256}
        x2={400}
        y2={256}
        stroke={line}
        strokeWidth={2}
        strokeDasharray="16 12"
      />

      {cars.map((c, i) => (
        <g key={c.x}>
          <rect x={c.x} y={168} width={c.w} height={48} rx={7} fill={line} />
          <motion.rect
            x={c.x - 7}
            y={161}
            width={c.w + 14}
            height={62}
            rx={4}
            fill="none"
            stroke={c.over ? clay : verdigris}
            strokeWidth={1.4}
            strokeDasharray="6 4"
            initial={{ opacity: 0, scale: 1.12 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.25, duration: 0.5, ease }}
            style={{ transformOrigin: `${c.x + c.w / 2}px 192px` }}
          />
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 + i * 0.25, duration: 0.4 }}
          >
            <rect
              x={c.x - 7}
              y={141}
              width={68}
              height={16}
              rx={2}
              fill={c.over ? clay : verdigris}
            />
            <text
              x={c.x + 27}
              y={152.5}
              fontSize={9}
              textAnchor="middle"
              fill="var(--color-ink)"
              fontFamily={mono}
              fontWeight="500"
            >
              {c.speed}
            </text>
          </motion.g>
        </g>
      ))}

      {!still && (
        <motion.line
          x1={0}
          x2={400}
          y1={58}
          y2={58}
          stroke={verdigris}
          strokeWidth={1.5}
          opacity={0.7}
          initial={{ y1: 58, y2: 58 }}
          animate={{ y1: [58, 232, 58], y2: [58, 232, 58] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </Frame>
  );
}

/* Delta — the gate is the idea. A rewritten prompt only survives if it beats the
   old one on held-out data by more than the confidence interval allows. */
function DeltaVisual({ still }: { still: boolean }) {
  return (
    <Frame>
      <Label x={22} y={28}>
        HELD-OUT GATE
      </Label>

      {[
        { x: 22, title: "prompt v0", stroke: line, fill: dim },
        { x: 148, title: "proposed", stroke: clay, fill: clay },
      ].map((card) => (
        <g key={card.title}>
          <rect
            x={card.x}
            y={52}
            width={104}
            height={116}
            rx={6}
            fill="none"
            stroke={card.stroke}
            strokeWidth={1.3}
          />
          <Label x={card.x + 12} y={72} fill={card.fill} size={8}>
            {card.title.toUpperCase()}
          </Label>
          {[0, 1, 2, 3].map((i) => (
            <motion.rect
              key={i}
              x={card.x + 12}
              y={86 + i * 16}
              width={80 - (i % 2) * 26}
              height={5}
              rx={2.5}
              fill={card.title === "proposed" && (i === 1 || i === 2) ? clay : line}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease }}
              style={{ transformOrigin: `${card.x + 12}px 0px` }}
            />
          ))}
        </g>
      ))}

      {/* the gate */}
      <g transform="translate(316 110)">
        <motion.circle
          r={26}
          fill="none"
          stroke={cream}
          strokeWidth={1.3}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, ease }}
        />
        <text
          x={0}
          y={7}
          textAnchor="middle"
          fontSize={22}
          fill={cream}
          fontFamily="var(--font-display)"
        >
          Δ
        </text>
        {!still && (
          <motion.circle
            r={26}
            fill="none"
            stroke={verdigris}
            strokeWidth={1.3}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </g>

      <line x1={252} y1={110} x2={288} y2={110} stroke={line} strokeWidth={1.5} />

      {/* confidence interval whisker — the "prove it" part */}
      <g transform="translate(0 216)">
        <Label x={22} y={0} fill={muted}>
          MEASURED LIFT, 95% CI
        </Label>
        <line x1={22} y1={30} x2={378} y2={30} stroke={line} strokeWidth={1} />
        <line x1={140} y1={22} x2={140} y2={38} stroke={dim} strokeWidth={1} />
        <Label x={140} y={52} anchor="middle" size={7.5}>
          0
        </Label>
        <motion.g
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8, ease }}
          style={{ transformOrigin: "140px 30px" }}
        >
          <line x1={196} y1={30} x2={302} y2={30} stroke={verdigris} strokeWidth={2} />
          <line x1={196} y1={24} x2={196} y2={36} stroke={verdigris} strokeWidth={2} />
          <line x1={302} y1={24} x2={302} y2={36} stroke={verdigris} strokeWidth={2} />
          <circle cx={249} cy={30} r={4} fill={verdigris} />
        </motion.g>
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6, duration: 0.4 }}
        >
          <Label x={378} y={52} anchor="end" size={8} fill={verdigris}>
            KEEPS THE REWRITE
          </Label>
        </motion.g>
      </g>
    </Frame>
  );
}

const visuals: Record<Project["slug"], React.ComponentType<{ still: boolean }>> = {
  notekit: NoteKitVisual,
  ratepilot: RatePilotVisual,
  "edge-vision": EdgeVisionVisual,
  "graph-benchmark": GraphBenchmarkVisual,
  delta: DeltaVisual,
};

export function ProjectVisual({ slug }: { slug: Project["slug"] }) {
  const Visual = visuals[slug];
  // Looping animations are the ones worth suppressing: the scroll-triggered
  // reveals are one-shot and already neutered by the global reduced-motion rule.
  const still = useReducedMotion() ?? false;

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-ink-line/70 bg-ink-raised"
    >
      <div className="absolute inset-0 p-2">
        <Visual still={still} />
      </div>
    </div>
  );
}
