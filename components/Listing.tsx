"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { listingItems } from "@/lib/data";
import DestinationCard from "./DestinationCard";

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
      <div className="listing-hero">
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
      </div>
      <div className="listing-tools">
        <label className="search-box">
          <Search size={18} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search places…" aria-label="Search" />
        </label>
        <div className="filter-row">
          {filters.map((f) => (
            <button className={filter === f ? "active" : ""} key={f} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="listing-results">
        <span className="eyebrow">{filtered.length} notes in the atlas</span>
        <div className="card-grid">
          {filtered.map((item) => (
            <DestinationCard key={item.slug + item.title} item={item} kind={kind === "experiences" ? "experience" : "destination"} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="empty-state">
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
          </div>
        )}
      </div>
    </main>
  );
}
