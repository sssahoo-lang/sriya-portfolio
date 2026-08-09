"use client";

import { Reveal } from "./ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-sage-600">
            03 · Work
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-6 max-w-2xl text-balance text-3xl leading-tight md:text-4xl">
            Five systems, five different questions about what
            &ldquo;autonomous&rdquo; should actually mean.
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
