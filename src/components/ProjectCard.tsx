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
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="project-card group scroll-mt-28 grid gap-8 rounded-3xl border border-line bg-cream-dim/40 p-6 md:grid-cols-2 md:gap-10 md:p-10"
      >
        <div className={clsx(reversed && "md:order-2")}>
          <ProjectVisual slug={project.slug} />
        </div>

        <div className={clsx("flex flex-col justify-center", reversed && "md:order-1")}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-charcoal-faint">{project.period}</span>
            {project.status && (
              <span className="rounded-full bg-terracotta/10 px-2.5 py-0.5 text-[11px] font-medium text-terracotta">
                {project.status}
              </span>
            )}
          </div>

          <h3 className="font-display mt-2 text-2xl text-charcoal md:text-3xl">
            {project.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-sage-600">{project.tagline}</p>

          <p className="mt-4 text-sm leading-relaxed text-charcoal-soft md:text-[15px]">
            {project.narrative}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line bg-cream px-3 py-1 text-xs text-charcoal-soft"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4 border-y border-line py-6 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <AnimatedStat key={m.label} value={m.value} label={m.label} />
            ))}
          </div>

          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-charcoal transition-colors hover:text-sage-600"
          >
            View on GitHub
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </motion.article>
    </Reveal>
  );
}
