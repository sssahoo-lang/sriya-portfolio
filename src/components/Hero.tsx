"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import { DeskScene } from "./ui/DeskScene";
import { ResumeModal } from "./ui/ResumeModal";
import { profile } from "@/lib/data";

const rise = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const ease = [0.16, 1, 0.3, 1] as const;

function PillLink({
  href,
  children,
  external,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      data-cursor-hover
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="inline-flex items-center justify-center rounded-full border border-line bg-cream px-5 py-2.5 text-sm text-charcoal-soft shadow-[0_1px_2px_rgba(43,43,41,0.04)] transition-colors hover:border-sage-400 hover:text-charcoal"
    >
      {children}
    </motion.a>
  );
}

export function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <motion.section
      ref={sectionRef}
      id="top"
      style={{ opacity: fade }}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-16 pt-32 md:px-10"
    >
      {/* ambient glow behind the scene */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-sage-100/50 blur-[110px]" />
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[420px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-terracotta-soft/20 blur-[90px]" />
      </div>

      <motion.div style={{ y: lift }} className="mx-auto w-full max-w-5xl">
        <motion.h1
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="font-display text-center text-[10vw] leading-[1.06] tracking-tight text-charcoal sm:text-5xl md:text-6xl lg:text-[4.2rem]"
        >
          <motion.span
            variants={rise}
            transition={{ duration: 0.8, ease }}
            className="block"
          >
            Hi, I&rsquo;m Sriya Sahoo.
          </motion.span>
          <motion.span
            variants={rise}
            transition={{ duration: 0.8, ease }}
            className="block"
          >
            I&rsquo;m a software engineer building AI agents.
          </motion.span>
        </motion.h1>

        <div className="mt-14 grid items-center gap-10 md:mt-16 md:grid-cols-[1fr_minmax(230px,320px)_1fr] md:gap-6">
          {/* actions */}
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.09, delayChildren: 0.6 }}
            className="order-3 flex flex-col items-center gap-3 md:order-none md:items-end"
          >
            <motion.div variants={rise} transition={{ duration: 0.6, ease }}>
              <PillLink
                href={profile.resumeHref}
                onClick={(e) => {
                  e.preventDefault();
                  setResumeOpen(true);
                }}
              >
                View my resume
              </PillLink>
            </motion.div>

            <motion.div variants={rise} transition={{ duration: 0.6, ease }}>
              <PillLink href={`mailto:${profile.email}`}>Let&rsquo;s have a coffee</PillLink>
            </motion.div>

            <motion.div
              variants={rise}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-line bg-cream px-5 py-2.5 shadow-[0_1px_2px_rgba(43,43,41,0.04)]"
            >
              <span className="text-sm text-charcoal-soft">Contact me:</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                aria-label="GitHub"
                className="text-charcoal-faint transition-colors hover:text-charcoal"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                aria-label="LinkedIn"
                className="text-charcoal-faint transition-colors hover:text-sage-600"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                data-cursor-hover
                aria-label="Email"
                className="text-charcoal-faint transition-colors hover:text-terracotta"
              >
                <Mail size={16} />
              </a>
            </motion.div>
          </motion.div>

          {/* illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease }}
            className="order-1 flex justify-center md:order-none"
          >
            <DeskScene />
          </motion.div>

          {/* blurb */}
          <motion.p
            initial={{ opacity: 0, x: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.75, ease }}
            className="order-2 mx-auto max-w-[17rem] text-center text-sm leading-relaxed text-charcoal-faint md:order-none md:mx-0 md:max-w-[15rem] md:self-start md:pt-6 md:text-left"
          >
            Multi-step agents that reason, call tools, and decide for themselves, plus the
            backend and frontend that put them in front of people.
          </motion.p>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        data-cursor-hover
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-charcoal-faint md:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll
        <ArrowDown size={14} />
      </motion.a>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </motion.section>
  );
}
