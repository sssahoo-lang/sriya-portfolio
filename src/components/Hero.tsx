"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import { HeroTrace } from "./ui/HeroTrace";
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
  primary,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** One filled action per screen — everything else stays quiet beside it. */
  primary?: boolean;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      data-cursor-hover
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm transition-colors " +
        (primary
          ? "bg-charcoal text-cream shadow-[0_2px_10px_rgba(43,43,41,0.16)] hover:bg-ink"
          : "border border-line bg-cream text-charcoal-soft hover:border-sage-400 hover:text-charcoal")
      }
    >
      {children}
    </motion.a>
  );
}

const socials = [
  { href: profile.github, label: "GitHub", Icon: GithubIcon, hover: "hover:text-charcoal" },
  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon, hover: "hover:text-sage-600" },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail, hover: "hover:text-terracotta" },
];

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
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-20 pt-32 md:px-10"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[12%] top-1/2 h-[520px] w-[720px] -translate-y-1/2 rounded-full bg-sage-100/45 blur-[120px]" />
        <div className="absolute right-[8%] top-1/3 h-[320px] w-[420px] rounded-full bg-terracotta-soft/20 blur-[100px]" />
      </div>

      <motion.div
        style={{ y: lift }}
        className="mx-auto grid w-full max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_minmax(0,1fr)] md:gap-16"
      >
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.1 }}>
          {/* The two facts a recruiter needs in the first second. */}
          <motion.p
            variants={rise}
            transition={{ duration: 0.6, ease }}
            className="font-instrument text-[11px] uppercase tracking-[0.18em] text-charcoal-faint"
          >
            {profile.location} — open to SWE &amp; AI engineering roles
          </motion.p>

          <h1
            aria-label="Hi, I’m Sriya. I build AI agents that show their work."
            className="mt-7"
          >
            <motion.span
              variants={rise}
              transition={{ duration: 0.7, ease }}
              className="font-display block text-2xl text-charcoal-faint md:text-[1.75rem]"
            >
              Hi, I&rsquo;m Sriya.
            </motion.span>
            <motion.span
              variants={rise}
              transition={{ duration: 0.8, ease }}
              className="font-display mt-2 block text-balance text-[10vw] font-light leading-[1.02] tracking-[-0.025em] text-charcoal sm:text-[3rem] md:text-[3.4rem] lg:text-[4rem] xl:text-[4.5rem]"
            >
              I build AI agents that{" "}
              <span className="italic">show their work.</span>
            </motion.span>
          </h1>

          <motion.p
            variants={rise}
            transition={{ duration: 0.7, ease }}
            className="mt-7 max-w-md text-[17px] leading-relaxed text-charcoal-soft"
          >
            Multi-step agents that reason, call tools, and account for every decision —
            plus the backend and interface that put them in front of real users.
          </motion.p>

          <motion.div
            variants={rise}
            transition={{ duration: 0.7, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <PillLink
              primary
              href={profile.resumeHref}
              onClick={(e) => {
                e.preventDefault();
                setResumeOpen(true);
              }}
            >
              View my resume
            </PillLink>
            <PillLink href={`mailto:${profile.email}`}>Get in touch</PillLink>

            {/* The rule only earns its place when the icons share the buttons'
                line; once the row wraps it reads as a stray tick. */}
            <span className="flex items-center gap-4 sm:ml-1 sm:border-l sm:border-line sm:pl-5">
              {socials.map(({ href, label, Icon, hover }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("mailto:")
                    ? {}
                    : { target: "_blank", rel: "noreferrer" })}
                  data-cursor-hover
                  aria-label={label}
                  className={"text-charcoal-faint transition-colors " + hover}
                >
                  <Icon size={17} />
                </a>
              ))}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
        >
          <HeroTrace />
        </motion.div>
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
