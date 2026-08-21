"use client";

import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="relative bg-cream-dim/60 px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="02" label="Experience">
          <span className="block max-w-4xl">
            Every role so far has had the same shape: something was manual and
            confusing, so I <span className="italic">automated it</span> and made it
            make sense.
          </span>
        </SectionHeading>

        <ol className="mt-20 md:mt-24">
          {experience.map((job) => (
            <Reveal key={job.org} delay={0.04} amount={0.12}>
              <li className="grid gap-6 border-t border-line py-10 md:grid-cols-[minmax(0,300px)_1fr] md:gap-14 md:py-14">
                {/* Role identity — held in its own column so the bullets stop
                    reading as one continuous wall of text down the page. */}
                <div className="md:sticky md:top-28 md:self-start">
                  <div className="flex items-center gap-3">
                    <motion.span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
                    />
                    <span className="font-instrument text-[11px] uppercase tracking-[0.16em] text-charcoal-faint">
                      {job.period}
                    </span>
                  </div>

                  <h3 className="font-display mt-4 text-[1.75rem] leading-[1.1] tracking-tight text-charcoal md:text-[2rem]">
                    {job.role}
                  </h3>
                  <p className="mt-2 text-[15px] text-sage-700">{job.org}</p>
                  <p className="font-instrument mt-1 text-[11px] uppercase tracking-[0.12em] text-charcoal-faint">
                    {job.location}
                  </p>
                </div>

                <ul className="space-y-5 md:pt-1">
                  {job.points.map((point, pi) => (
                    <motion.li
                      key={point}
                      className="flex gap-4 text-[15px] leading-relaxed text-charcoal-soft"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ delay: pi * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="font-instrument mt-[3px] shrink-0 text-[11px] text-sage-400 tabular-nums">
                        {String(pi + 1).padStart(2, "0")}
                      </span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
