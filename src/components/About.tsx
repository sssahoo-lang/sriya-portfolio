"use client";

import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { AnimatedStat } from "./ui/AnimatedStat";
import { profile } from "@/lib/data";

const facts = [
  { icon: MapPin, text: "Based in Chicago, IL, and happy to relocate" },
  { icon: GraduationCap, text: "M.S. Computer Science, Indiana University Bloomington, May 2026" },
  { icon: Sparkles, text: "Building agents that reason, use tools, and make real-time calls" },
];

const stats = [
  { value: "5", label: "projects shipped & documented" },
  { value: "5", label: "cloud & platform certifications" },
  { value: "4", label: "roles across data, backend & consulting" },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <SectionHeading number="01" label="About">
        <span className="block max-w-3xl">
          I care more about whether a system makes the right call than whether it{" "}
          <span className="italic">sounds smart</span> making it.
        </span>
      </SectionHeading>

      <div className="mt-16 grid gap-16 md:grid-cols-[1.3fr_1fr]">
        <div>
          <Reveal delay={0.15}>
            <p className="max-w-xl text-[17px] leading-relaxed text-charcoal-soft">
              {profile.blurb}
            </p>
          </Reveal>

          <ul className="mt-10 space-y-4">
            {facts.map((fact, i) => (
              <Reveal key={fact.text} delay={0.1 + i * 0.08} direction="left">
                <li className="flex items-center gap-3 text-sm text-charcoal-soft">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage-50 text-sage-600">
                    <fact.icon size={15} />
                  </span>
                  {fact.text}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal direction="right" delay={0.1}>
          <div className="rounded-3xl border border-line bg-cream-dim/60 p-8">
            <div className="grid grid-cols-1 gap-8">
              {stats.map((s) => (
                <AnimatedStat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
