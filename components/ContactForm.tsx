"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Compass } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { easeOut, slideInRight } from "@/lib/motion";

const fieldContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const field = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="contact-layout">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className="form-success"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <motion.span
              className="success-mark"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
            >
              <Compass size={28} />
            </motion.span>
            <span className="eyebrow">Saved locally</span>
            <h2>A good place to begin.</h2>
            <p>Your note has been captured in this interface. Connect a delivery provider to route inquiries beyond the page.</p>
            <button className="text-button" onClick={() => setSubmitted(false)}>
              Write another note <ArrowUpRight size={16} />
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
            variants={fieldContainer}
          >
            <motion.label variants={field}>
              Name
              <input required placeholder="Your name" />
            </motion.label>
            <motion.label variants={field}>
              Email
              <input required type="email" placeholder="you@example.com" />
            </motion.label>
            <motion.label variants={field}>
              What are you curious about?
              <select defaultValue="">
                <option value="" disabled>
                  Select a thread
                </option>
                <option>Mountains and valleys</option>
                <option>Heritage and food</option>
                <option>Road trips</option>
                <option>Something else</option>
              </select>
            </motion.label>
            <motion.label variants={field}>
              Your note
              <textarea required placeholder="A place, a season, a question…" />
            </motion.label>
            <motion.label className="consent" variants={field}>
              <input required type="checkbox" /> <span>I understand this is an editorial inquiry and agree to the privacy notice.</span>
            </motion.label>
            <motion.button
              className="primary-button"
              type="submit"
              variants={field}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.96 }}
            >
              Send a note <ArrowUpRight size={17} />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
      <Reveal as="aside" className="contact-aside" variants={slideInRight} delay={0.15}>
        <div className="aside-note">
          <span className="index-number">FIELD NOTE / 07</span>
          <p>Good planning leaves room for local knowledge, changing weather, and the unexpected turn.</p>
        </div>
        <span className="eyebrow">Before you write</span>
        <p>For current visa, safety, weather, transport, or availability information, always check the relevant official or local source.</p>
        <div className="aside-rule" />
        <span className="eyebrow">Elsewhere</span>
        <p>
          hello@pakistantourism.example
          <br />
          Instagram / Facebook
        </p>
      </Reveal>
    </div>
  );
}
