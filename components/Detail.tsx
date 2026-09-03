"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { DetailEntry } from "@/lib/data";
import { detailEntries } from "@/lib/data";
import DestinationCard from "./DestinationCard";
import Lightbox from "./Lightbox";
import { useGuide } from "./GuideProvider";
import Reveal from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { easeOut, fadeUp, slideInLeft, slideInRight } from "@/lib/motion";

export default function Detail({ entry }: { entry: DetailEntry }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { openGuide } = useGuide();
  const related = entry.related
    .map((name) => detailEntries.find((item) => item.title === name || item.slug === name.toLowerCase().replaceAll(" ", "-")))
    .filter(Boolean) as DetailEntry[];

  return (
    <main className="detail-page">
      <div className="container">
        <motion.div
          className="breadcrumbs"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <Link href={entry.kind === "destination" ? "/destinations" : "/experiences"}>
            {entry.kind === "destination" ? "Destinations" : "Experiences"}
          </Link>
          <span>/</span>
          <span>{entry.title}</span>
        </motion.div>
        <div className="detail-hero">
          <Reveal variants={slideInLeft}>
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
          </Reveal>
          <motion.img
            src={entry.gallery[0]}
            alt={entry.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.1 }}
          />
        </div>
        <StaggerGrid className="gallery-strip" stagger={0.08} margin="-40px">
          {entry.gallery.map((image, i) => (
            <StaggerItem key={image} full={false}>
              <motion.button
                type="button"
                className="gallery-thumb"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Open ${entry.title} gallery image ${i + 1}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: easeOut }}
              >
                <img src={image} alt={`${entry.title} view ${i + 1}`} />
                <span className="gallery-expand">+</span>
              </motion.button>
            </StaggerItem>
          ))}
        </StaggerGrid>
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
          <Reveal as="article" variants={slideInLeft}>
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
          </Reveal>
          <Reveal as="aside" className="detail-aside" variants={slideInRight} delay={0.1}>
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
            <motion.button
              className="primary-button"
              onClick={openGuide}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.96 }}
            >
              Ask about this route <Sparkles size={16} />
            </motion.button>
          </Reveal>
        </div>
        <section className="related-section">
          <Reveal className="section-heading" variants={fadeUp}>
            <div>
              <span className="eyebrow">Keep wandering</span>
              <h2>
                Related
                <br />
                <em>notes.</em>
              </h2>
            </div>
          </Reveal>
          <StaggerGrid className="card-grid" stagger={0.12}>
            {related.map((item) => (
              <StaggerItem key={item.slug}>
                <DestinationCard item={item} kind={item.kind} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      </div>
    </main>
  );
}
