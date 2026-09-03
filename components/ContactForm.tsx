"use client";

import { useState } from "react";
import { ArrowUpRight, Compass } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="contact-layout">
      {submitted ? (
        <div className="form-success">
          <span className="success-mark">
            <Compass size={28} />
          </span>
          <span className="eyebrow">Saved locally</span>
          <h2>A good place to begin.</h2>
          <p>Your note has been captured in this interface. Connect a delivery provider to route inquiries beyond the page.</p>
          <button className="text-button" onClick={() => setSubmitted(false)}>
            Write another note <ArrowUpRight size={16} />
          </button>
        </div>
      ) : (
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <label>
            Name
            <input required placeholder="Your name" />
          </label>
          <label>
            Email
            <input required type="email" placeholder="you@example.com" />
          </label>
          <label>
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
          </label>
          <label>
            Your note
            <textarea required placeholder="A place, a season, a question…" />
          </label>
          <label className="consent">
            <input required type="checkbox" /> <span>I understand this is an editorial inquiry and agree to the privacy notice.</span>
          </label>
          <button className="primary-button" type="submit">
            Send a note <ArrowUpRight size={17} />
          </button>
        </form>
      )}
      <aside className="contact-aside">
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
      </aside>
    </div>
  );
}
