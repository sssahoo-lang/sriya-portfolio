"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  as = "a",
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  as?: "a" | "button";
  strength?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const Comp = motion[as] as typeof motion.a;

  return (
    <Comp
      ref={ref as never}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
