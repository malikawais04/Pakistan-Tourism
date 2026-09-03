"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { assets } from "@/lib/data";
import { useGuide } from "./GuideProvider";
import { easeOut } from "@/lib/motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOut } },
};

export default function Hero() {
  const { openGuide } = useGuide();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="hero" ref={sectionRef}>
      <motion.img
        className="hero-image"
        src={assets.hero_}
        alt="A winding road leading into the Karakoram mountains"
        style={{ y: imageY, scale: 1.08 }}
      />
      <div className="hero-wash" />
      <motion.div
        className="hero-content"
        style={{ y: contentY, opacity: contentOpacity }}
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.div className="hero-kicker" variants={item}>
          <span className="index-number">01</span>
          <span>Begin where the road turns quiet</span>
        </motion.div>
        <motion.h1 variants={item}>
          Pakistan,
          <br />
          <em>in full.</em>
        </motion.h1>
        <motion.p variants={item}>
          A living atlas of high valleys, old cities, wild coastlines, and the people who make every route worth
          remembering.
        </motion.p>
        <motion.div className="hero-buttons" variants={item}>
          <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }} style={{ display: "inline-block" }}>
            <Link href="/destinations" className="primary-button">
              Explore destinations <ArrowUpRight size={17} />
            </Link>
          </motion.div>
          <motion.button className="hero-guide" onClick={openGuide} whileHover={{ x: 3 }} whileTap={{ scale: 0.96 }}>
            <Sparkles size={16} /> Ask the guide
          </motion.button>
        </motion.div>
      </motion.div>
      <motion.div
        className="hero-caption"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: easeOut }}
      >
        <span>01 / 06</span>
        <span>Karakoram Highway · Gilgit-Baltistan</span>
      </motion.div>
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          Scroll to wander <ChevronDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
}
