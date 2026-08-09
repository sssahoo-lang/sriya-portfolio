"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-5 z-40 flex justify-center px-4"
    >
      <nav className="max-w-full overflow-x-auto rounded-full border border-line bg-cream/85 px-2 py-1.5 shadow-[0_4px_20px_rgba(43,43,41,0.06)] backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor-hover
                  className={clsx(
                    "relative block whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] transition-colors sm:px-4 sm:text-sm",
                    isActive ? "text-charcoal" : "text-charcoal-faint hover:text-charcoal",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-cream-dim"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
