"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/lib/data";
import { easeOut } from "@/lib/motion";

export default function DestinationCard({
  item,
  kind = "destination",
}: {
  item: Destination;
  kind?: "destination" | "experience";
}) {
  return (
    <motion.div whileHover="hover" initial="rest" animate="rest" style={{ height: "100%" }}>
      <Link
        href={`/${kind === "experience" ? "experiences" : "destinations"}/${item.slug}`}
        className="destination-card"
      >
        <div className="card-image-wrap">
          <motion.img
            src={item.image}
            alt={item.title}
            variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
            transition={{ duration: 0.6, ease: easeOut }}
          />
          <span className="card-tag">{item.tag}</span>
          <motion.span
            className="card-arrow"
            variants={{ rest: { x: 0, y: 0 }, hover: { x: 3, y: -3 } }}
            transition={{ duration: 0.3, ease: easeOut }}
          >
            <ArrowUpRight size={17} />
          </motion.span>
        </div>
        <div className="card-meta">
          <span>{item.region}</span>
          <span>↗</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <span className="card-note">{item.note}</span>
      </Link>
    </motion.div>
  );
}
