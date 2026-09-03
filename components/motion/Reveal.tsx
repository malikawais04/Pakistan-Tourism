"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { defaultViewport, fadeUp } from "@/lib/motion";

export default function Reveal({
  children,
  as = "div",
  className,
  style,
  variants = fadeUp,
  delay = 0,
  full = false,
  once = true,
  margin = "-80px",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  variants?: Variants;
  delay?: number;
  /** Stretch the wrapper to fill its parent's cross-axis (useful inside CSS grid items). */
  full?: boolean;
  once?: boolean;
  margin?: string;
}) {
  const MotionTag = motion(as as any);
  return (
    <MotionTag
      className={className}
      style={full ? { height: "100%", ...style } : style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
