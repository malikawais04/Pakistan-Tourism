import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AskGuideButton from "@/components/AskGuideButton";

export const metadata: Metadata = { title: "About — Pakistan Tourism" };

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="about-page container">
        <div className="about-hero">
          <span className="eyebrow">05 / Our approach</span>
          <h1>
            Travel with
            <br />
            <em>context.</em>
          </h1>
          <p>
            Pakistan Tourism is a considered starting point for places, stories, and routes — built to leave room for
            local knowledge and a change of plan.
          </p>
        </div>
        <div className="about-grid">
          <article>
            <span className="eyebrow">What we share</span>
            <h2>
              Notes, not
              <br />
              <em>checklists.</em>
            </h2>
            <p>
              We look for the details that help a place feel legible: its landscapes, foodways, craft, architecture,
              seasonal rhythms, and the people who make a route worth remembering.
            </p>
            <p>
              Every note is editorial context, not a booking or safety service. Before you travel, verify current
              access, weather, permits, schedules, and official guidance.
            </p>
            <Link href="/destinations" className="text-button">
              Explore the atlas <ArrowUpRight size={16} />
            </Link>
          </article>
          <aside>
            <div className="about-note">
              <span className="index-number">FIELD NOTE / 09</span>
              <p>Go gently. Look closely. Leave room for local knowledge.</p>
            </div>
            <div className="about-rule" />
            <span className="eyebrow">The guide</span>
            <p>
              Ask the guide for a first route, a season, a destination mood, or a thread to follow. Answers are
              grounded in the reviewed notes shown here and should be checked against current local sources.
            </p>
            <AskGuideButton />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
