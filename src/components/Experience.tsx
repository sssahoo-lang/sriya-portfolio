"use client";

import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="relative bg-cream-dim/50 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-sage-600">
            02 · Experience
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-6 max-w-2xl text-balance text-3xl leading-tight md:text-4xl">
            Every role so far has had the same shape: something was
            manual and confusing, so I automated it and made it make sense.
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-[9px]" />

          <ol className="space-y-12">
            {experience.map((job, i) => (
              <Reveal key={job.org} delay={i * 0.08} direction="left" amount={0.15}>
                <li className="relative pl-8 md:pl-10">
                  <motion.span
                    className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-sage-500 bg-cream md:h-[19px] md:w-[19px]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.08 + 0.1 }}
                  />

                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                    <h3 className="font-display text-xl text-charcoal">
                      {job.role} <span className="text-charcoal-faint">· {job.org}</span>
                    </h3>
                    <span className="text-sm text-charcoal-faint">{job.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-sage-600">{job.location}</p>

                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-charcoal-soft md:text-[15px]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sage-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
