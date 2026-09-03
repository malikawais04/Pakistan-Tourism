"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { DetailEntry } from "@/lib/data";
import { detailEntries } from "@/lib/data";
import DestinationCard from "./DestinationCard";
import Lightbox from "./Lightbox";
import { useGuide } from "./GuideProvider";

export default function Detail({ entry }: { entry: DetailEntry }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { openGuide } = useGuide();
  const related = entry.related
    .map((name) => detailEntries.find((item) => item.title === name || item.slug === name.toLowerCase().replaceAll(" ", "-")))
    .filter(Boolean) as DetailEntry[];

  return (
    <main className="detail-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link href={entry.kind === "destination" ? "/destinations" : "/experiences"}>
            {entry.kind === "destination" ? "Destinations" : "Experiences"}
          </Link>
          <span>/</span>
          <span>{entry.title}</span>
        </div>
        <div className="detail-hero">
          <div>
            <span className="eyebrow">{entry.kicker}</span>
            <h1>{entry.title}</h1>
            <p>{entry.body}</p>
            <div className="detail-facts">
              {entry.duration && (
                <span>
                  <b>Duration</b>
                  {entry.duration}
                </span>
              )}
              {entry.difficulty && (
                <span>
                  <b>Difficulty</b>
                  {entry.difficulty}
                </span>
              )}
              <span>
                <b>Reviewed</b>
                {entry.review.replace("Reviewed ", "")}
              </span>
            </div>
          </div>
          <img src={entry.gallery[0]} alt={entry.title} />
        </div>
        <div className="gallery-strip">
          {entry.gallery.map((image, i) => (
            <button
              type="button"
              className="gallery-thumb"
              key={image}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Open ${entry.title} gallery image ${i + 1}`}
            >
              <img src={image} alt={`${entry.title} view ${i + 1}`} />
              <span className="gallery-expand">+</span>
            </button>
          ))}
        </div>
        {lightboxIndex !== null && (
          <Lightbox
            images={entry.gallery}
            activeIndex={lightboxIndex}
            title={entry.title}
            onChange={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
        <div className="detail-body">
          <article>
            <span className="eyebrow">The note</span>
            <h2>
              Read the landscape
              <br />
              <em>at its own pace.</em>
            </h2>
            <div className="detail-copy">
              <h3>What to look for</h3>
              <ul>
                {entry.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>{entry.kind === "experience" ? "Route outline" : "Getting there"}</h3>
              <p>{entry.route || entry.gettingThere}</p>
              <h3>When to go</h3>
              <p>{entry.bestTime}</p>
            </div>
          </article>
          <aside className="detail-aside">
            <div className="detail-note">
              <span className="index-number">FIELD NOTE / 08</span>
              <p>{entry.gettingThere}</p>
            </div>
            <div className="source-block">
              <span className="eyebrow">Source + scope</span>
              <p>
                This is an editorial guide, not a booking or safety service. Conditions, access, prices, schedules, and
                entry requirements can change. Check current official and local sources.
              </p>
            </div>
            <button className="primary-button" onClick={openGuide}>
              Ask about this route <Sparkles size={16} />
            </button>
          </aside>
        </div>
        <section className="related-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Keep wandering</span>
              <h2>
                Related
                <br />
                <em>notes.</em>
              </h2>
            </div>
          </div>
          <div className="card-grid">
            {related.map((item) => (
              <DestinationCard key={item.slug} item={item} kind={item.kind} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
