"use client";

import { useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { skillGroups } from "@/lib/data";
import { projectsForSkill } from "@/lib/skillLinks";

const categories = ["All", ...skillGroups.map((g) => g.title)];

export function Skills() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(92,122,82,0.10), transparent 70%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <section
      id="skills"
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-cream-dim/50 px-6 py-28 md:px-10 md:py-36"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading number="04" label="Toolkit">
          <span className="block max-w-3xl">
            What I reach for, from schema design to{" "}
            <span className="italic">shipping the agent.</span>
          </span>
        </SectionHeading>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-sm text-charcoal-faint">
            Filter by category, or hover a skill to see which project used it.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                data-cursor-hover
                onClick={() => setActive(cat)}
                className="relative rounded-full px-4 py-2 text-sm transition-colors"
              >
                {active === cat && (
                  <motion.span
                    layoutId="skills-active-pill"
                    className="absolute inset-0 rounded-full bg-sage-600"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span
                  className={
                    "relative z-10 " +
                    (active === cat ? "text-cream" : "text-charcoal-soft hover:text-sage-600")
                  }
                >
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 space-y-10">
          {skillGroups.map((group) => {
            const dimmed = active !== "All" && active !== group.title;
            return (
              <motion.div
                key={group.title}
                animate={{
                  opacity: dimmed ? 0.3 : 1,
                  filter: dimmed ? "grayscale(0.6)" : "grayscale(0)",
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-sm font-medium text-charcoal-faint">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const linked = projectsForSkill(item);
                    const isHovered = hovered === item;
                    return (
                      <div key={item} className="relative">
                        <motion.button
                          type="button"
                          data-cursor-hover
                          disabled={dimmed}
                          onMouseEnter={() => setHovered(item)}
                          onMouseLeave={() => setHovered((h) => (h === item ? null : h))}
                          whileHover={dimmed ? undefined : { scale: 1.06, y: -2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-3.5 py-1.5 text-sm text-charcoal-soft transition-colors hover:border-sage-400 hover:bg-sage-50 hover:text-sage-700"
                        >
                          {item}
                          {linked.length > 0 && (
                            <span className="h-1.5 w-1.5 rounded-full bg-terracotta/70" />
                          )}
                        </motion.button>

                        <AnimatePresence>
                          {isHovered && linked.length > 0 && !dimmed && (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.96 }}
                              transition={{ duration: 0.18 }}
                              className="absolute left-1/2 top-full z-20 mt-2 w-max -translate-x-1/2 rounded-xl border border-line bg-charcoal px-3 py-2 text-xs shadow-lg"
                            >
                              <p className="text-cream/60">Used in</p>
                              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                                {linked.map((p) => (
                                  <a
                                    key={p.slug}
                                    href={`#${p.slug}`}
                                    className="font-medium text-cream underline decoration-sage-400 decoration-2 underline-offset-2 hover:text-sage-300"
                                  >
                                    {p.name}
                                  </a>
                                ))}
                              </div>
                              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-charcoal" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
