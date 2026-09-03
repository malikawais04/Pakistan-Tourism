"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { listingItems } from "@/lib/data";
import DestinationCard from "./DestinationCard";
import Reveal from "@/components/motion/Reveal";
import { easeOut, fadeUp } from "@/lib/motion";

export default function Listing({ kind }: { kind: "destinations" | "experiences" }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const items = useMemo(() => listingItems(kind), [kind]);
  const filters = ["All", ...Array.from(new Set(items.map((x) => x.tag)))];
  const filtered = useMemo(
    () =>
      items.filter(
        (x) => (filter === "All" || x.tag === filter) && `${x.title} ${x.region}`.toLowerCase().includes(query.toLowerCase())
      ),
    [filter, query, items]
  );

  return (
    <main className="listing-page container">
      <Reveal className="listing-hero" variants={fadeUp}>
        <span className="eyebrow">{kind === "destinations" ? "02 / Places" : "03 / Ways to wander"}</span>
        <h1>
          {kind === "destinations" ? (
            <>
              Places with
              <br />
              <em>pull.</em>
            </>
          ) : (
            <>
              Make room for
              <br />
              <em>the long way.</em>
            </>
          )}
        </h1>
        <p>
          {kind === "destinations"
            ? "Start with a region, a season, or simply the place you cannot stop thinking about."
            : "Experiences to shape a trip around — editorial suggestions, never promises of live availability."}
        </p>
      </Reveal>
      <Reveal className="listing-tools" delay={0.1}>
        <label className="search-box">
          <Search size={18} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search places…" aria-label="Search" />
        </label>
        <div className="filter-row">
          {filters.map((f) => (
            <motion.button
              className={filter === f ? "active" : ""}
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: easeOut }}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </Reveal>
      <div className="listing-results">
        <span className="eyebrow">{filtered.length} notes in the atlas</span>
        <motion.div className="card-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.slug + item.title}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                transition={{ duration: 0.45, ease: easeOut }}
                style={{ height: "100%" }}
              >
                <DestinationCard item={item} kind={kind === "experiences" ? "experience" : "destination"} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              <Search size={24} />
              <h3>No note found.</h3>
              <p>Try a different region, category, or a softer search.</p>
              <button
                className="text-button"
                onClick={() => {
                  setQuery("");
                  setFilter("All");
                }}
              >
                Clear filters <X size={15} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
