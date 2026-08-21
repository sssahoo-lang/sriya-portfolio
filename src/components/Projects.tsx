"use client";

import { SectionHeading } from "./ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section
      id="projects"
      className="ink-grain relative overflow-hidden bg-ink px-6 py-32 text-cream md:px-10 md:py-44"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading number="03" label="Selected work" tone="ink">
          <span className="block max-w-4xl">
            Five systems, five different questions about what{" "}
            <span className="italic">&ldquo;autonomous&rdquo;</span> should actually mean.
          </span>
        </SectionHeading>

        <div className="mt-20 flex flex-col gap-20 md:mt-24 md:gap-28">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
