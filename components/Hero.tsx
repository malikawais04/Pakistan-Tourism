"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { assets } from "@/lib/data";
import { useGuide } from "./GuideProvider";

export default function Hero() {
  const { openGuide } = useGuide();
  return (
    <section className="hero">
      <img className="hero-image" src={assets.hero} alt="A winding road leading into the Karakoram mountains" />
      <div className="hero-wash" />
      <div className="hero-content">
        <div className="hero-kicker">
          <span className="index-number">01</span>
          <span>Begin where the road turns quiet</span>
        </div>
        <h1>
          Pakistan,
          <br />
          <em>in full.</em>
        </h1>
        <p>A living atlas of high valleys, old cities, wild coastlines, and the people who make every route worth remembering.</p>
        <div className="hero-buttons">
          <Link href="/destinations" className="primary-button">
            Explore destinations <ArrowUpRight size={17} />
          </Link>
          <button className="hero-guide" onClick={openGuide}>
            <Sparkles size={16} /> Ask the guide
          </button>
        </div>
      </div>
      <div className="hero-caption">
        <span>01 / 06</span>
        <span>Karakoram Highway · Gilgit-Baltistan</span>
      </div>
      <div className="hero-scroll">Scroll to wander <ChevronDown size={16} /></div>
    </section>
  );
}
