"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { defaultViewport, staggerContainer, staggerItem } from "@/lib/motion";

/** Drop-in replacement for a grid/list wrapper div: staggers its StaggerItem children into view. */
export function StaggerGrid({
  children,
  as = "div",
  className,
  stagger = 0.12,
  delayChildren = 0.04,
  once = true,
  margin = "-80px",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  margin?: string;
}) {
  const MotionTag = motion(as as any);
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </MotionTag>
  );
}

/** A single animated child of a StaggerGrid. Renders as a plain block wrapper so CSS grid tracks stay intact. */
export function StaggerItem({
  children,
  as = "div",
  className,
  style,
  variants = staggerItem,
  full = true,
  layout = false,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  variants?: Variants;
  full?: boolean;
  layout?: boolean;
}) {
  const MotionTag = motion(as as any);
  return (
    <MotionTag
      className={className}
      style={full ? { height: "100%", ...style } : style}
      variants={variants}
      layout={layout}
    >
      {children}
    </MotionTag>
  );
}
