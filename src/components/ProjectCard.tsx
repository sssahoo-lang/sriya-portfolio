"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { AnimatedStat } from "./ui/AnimatedStat";
import { ProjectVisual } from "./ProjectVisual";
import type { Project } from "@/lib/data";
import clsx from "clsx";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <Reveal amount={0.15}>
      <motion.article
        id={project.slug}
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="project-card group scroll-mt-28 grid gap-8 border-t border-ink-line pt-10 md:grid-cols-[1fr_1.05fr] md:gap-12 md:pt-12"
      >
        <div className={clsx(reversed && "md:order-2")}>
          <ProjectVisual slug={project.slug} />
        </div>

        <div className={clsx("flex flex-col justify-center", reversed && "md:order-1")}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-instrument text-[11px] uppercase tracking-[0.16em] text-ink-dim">
              {project.period}
            </span>
            {project.status && (
              <span className="font-instrument rounded-sm bg-clay/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-clay">
                {project.status}
              </span>
            )}
          </div>

          <h3 className="font-display mt-3 text-[2.5rem] leading-[0.98] tracking-tight text-cream md:text-[3.25rem]">
            {project.name}
          </h3>
          <p className="mt-3 max-w-md text-balance text-[15px] leading-snug text-clay">
            {project.tagline}
          </p>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-muted">
            {project.narrative}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-instrument rounded-sm border border-ink-line px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-ink-dim"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-ink-line pt-8 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <AnimatedStat key={m.label} value={m.value} label={m.label} tone="ink" />
            ))}
          </div>

          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="font-instrument mt-8 inline-flex w-fit items-center gap-1.5 border-b border-ink-line pb-1 text-[11px] uppercase tracking-[0.14em] text-cream transition-colors hover:border-clay hover:text-clay"
          >
            View on GitHub
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </motion.article>
    </Reveal>
  );
}
