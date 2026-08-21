"use client";

import { Award, BookOpen } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { certifications, education, publication } from "@/lib/data";

export function Education() {
  return (
    <section className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="05" label="Education & credentials">
          <span className="block max-w-3xl">
            Two degrees, five certifications, and one paper that made it into a
            conference.
          </span>
        </SectionHeading>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <Reveal delay={0.05}>
              <h3 className="font-display text-2xl text-charcoal">Education</h3>
            </Reveal>
            <div className="mt-6 space-y-6">
              {education.map((ed, i) => (
                <Reveal key={ed.school} delay={0.1 + i * 0.08} direction="left">
                  <div className="border-l-2 border-sage-200 pl-5">
                    <p className="font-medium text-charcoal">{ed.school}</p>
                    <p className="text-sm text-charcoal-soft">{ed.degree}</p>
                    <p className="mt-1 text-xs text-charcoal-faint">
                      {ed.detail} · {ed.period}
                    </p>
                    {ed.coursework && (
                      <p className="mt-2 text-xs leading-relaxed text-charcoal-faint/80">
                        {ed.coursework}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.25} direction="left">
              <p className="mt-8 text-xs font-medium uppercase tracking-[0.15em] text-sage-600">
                Publication
              </p>
            </Reveal>
            <Reveal delay={0.3} direction="left">
              <div className="mt-3 flex items-start gap-3 rounded-2xl border border-line bg-cream-dim/50 p-5">
                <BookOpen size={18} className="mt-0.5 shrink-0 text-sage-600" />
                <div>
                  <p className="text-sm font-medium text-charcoal">{publication.title}</p>
                  <p className="mt-1 text-xs text-charcoal-faint">{publication.venue}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.05}>
              <h3 className="font-display text-2xl text-charcoal">Certifications</h3>
            </Reveal>
            <RevealCertList />
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealCertList() {
  return (
    <ul className="mt-6 space-y-3">
      {certifications.map((cert, i) => (
        <Reveal key={cert} delay={0.1 + i * 0.06} direction="right">
          <li className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm text-charcoal-soft transition-colors hover:border-sage-400 hover:bg-sage-50">
            <Award size={15} className="shrink-0 text-sage-500" />
            {cert}
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
