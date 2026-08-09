"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const distance = 28;

function getVariants(direction: Direction): Variants {
  const offset =
    direction === "up"
      ? { y: distance }
      : direction === "down"
        ? { y: -distance }
        : direction === "left"
          ? { x: distance }
          : direction === "right"
            ? { x: -distance }
            : {};

  return {
    hidden: { opacity: 0, ...offset, filter: "blur(6px)" },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as = "div",
  once = true,
  amount = 0.3,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
  once?: boolean;
  amount?: number;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={getVariants(direction)}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  amount = 0.2,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  as?: "div" | "span" | "li";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={getVariants(direction)}>
      {children}
    </MotionTag>
  );
}
