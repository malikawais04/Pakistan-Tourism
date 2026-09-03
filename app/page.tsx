import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/motion";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="intro-section container">
          <Reveal className="section-stamp" variants={slideInLeft}>
            <span>02</span>
            <span>The short version</span>
          </Reveal>
          <Reveal className="intro-copy" delay={0.1}>
            <p className="eyebrow">A country of contrasts</p>
            <h2>
              Come for the peaks.
              <br />
              <em>Stay for the details.</em>
            </h2>
            <p className="large-copy">
              Pakistan rewards a slower way of looking. Here, a road is never only a road: it is a view, a story, a
              roadside chai, a change in altitude.
            </p>
            <Link href="/about" className="text-button">
              How we choose what to share <ArrowUpRight size={16} />
            </Link>
          </Reveal>
          <Reveal className="intro-aside" variants={slideInRight} delay={0.2}>
            <div className="line-art">
              ╱╲
              <br />
              ╱  ╲
            </div>
            <p>Travel notes for the curious, with room for context and the occasional change of plan.</p>
          </Reveal>
        </section>
        <section className="destinations-section">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <span className="eyebrow">03 / Places to begin</span>
                <h2>
                  Find your
                  <br />
                  <em>north star.</em>
                </h2>
              </div>
              <Link href="/destinations" className="text-button">
                See all destinations <ArrowUpRight size={16} />
              </Link>
            </Reveal>
            <StaggerGrid className="card-grid featured-grid" stagger={0.15}>
              {destinations.slice(0, 3).map((item) => (
                <StaggerItem key={item.slug}>
                  <DestinationCard item={item} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>
        <section className="season-strip">
          <Reveal className="container season-inner" variants={fadeUp}>
            <div className="season-label">
              <span className="eyebrow">Field note / 04</span>
              <span>When to go</span>
            </div>
            <div>
              <p className="season-title">
                The shoulder seasons
                <br />
                <em>hold the best light.</em>
              </p>
              <p className="season-copy">
                Spring in the valleys. Autumn on the passes. Winter in the old city. Start with a month, not a checklist.
              </p>
            </div>
            <Link href="/experiences" className="circle-link" aria-label="Explore experiences">
              <ArrowUpRight size={22} />
            </Link>
          </Reveal>
        </section>
        <section className="responsible-section container">
          <Reveal className="responsible-art" variants={slideInLeft}>
            <div className="stamp">
              LEAVE
              <br />
              ROOM
            </div>
          </Reveal>
          <Reveal className="responsible-copy" variants={slideInRight} delay={0.1}>
            <span className="eyebrow">05 / Travel with context</span>
            <h2>
              Go gently.
              <br />
              <em>Look closely.</em>
            </h2>
            <p>
              Responsible travel is not a separate itinerary. It is how we move through a place: listening to local
              knowledge, respecting sacred spaces, and leaving more of the landscape for the next person.
            </p>
            <Link href="/about" className="text-button">
              Read our approach <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </section>
        <section className="final-cta">
          <Reveal className="container final-inner" variants={fadeUp}>
            <span className="eyebrow">06 / Your next page</span>
            <h2>
              So — where
              <br />
              <em>will you begin?</em>
            </h2>
            <Link href="/contact" className="primary-button light">
              Plan a first route <ArrowUpRight size={17} />
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
