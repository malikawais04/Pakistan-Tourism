"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Send, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { askGuide, type ChatSource, type ChatTurn } from "@/lib/api";
import { easeOut } from "@/lib/motion";

type GuideContextType = { openGuide: () => void };
const GuideContext = createContext<GuideContextType | undefined>(undefined);

export function useGuide() {
  const ctx = useContext(GuideContext);
  if (!ctx) throw new Error("useGuide must be used within GuideProvider");
  return ctx;
}

export default function GuideProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <GuideContext.Provider value={{ openGuide: () => setOpen(true) }}>
      {children}
      <AnimatePresence>
        {!open && (
          <motion.button
            className="guide-launcher"
            onClick={() => setOpen(true)}
            aria-label="Open the travel guide"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.6 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.span
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
              style={{ display: "inline-flex" }}
            >
              <Sparkles size={16} />
            </motion.span>
            <span>
              <b>RAG guide</b>
              <small>Live source-aware chat</small>
            </span>
            <ArrowUpRight size={14} />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>{open && <GuidePanel close={() => setOpen(false)} />}</AnimatePresence>
    </GuideContext.Provider>
  );
}

function GuidePanel({ close }: { close: () => void }) {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<ChatTurn[]>([]);
  const [sources, setSources] = useState<ChatSource[]>([]);
  const [pending, setPending] = useState(false);
  const [errored, setErrored] = useState(false);
  const [lastQuestion, setLastQuestion] = useState("");

  const send = async (retryQuestion?: string) => {
    const question = (retryQuestion || message).trim();
    if (!question || pending) return;
    setLastQuestion(question);
    setMessage("");
    setErrored(false);
    if (!retryQuestion) setHistory((prev) => [...prev, { role: "user", content: question }]);
    setPending(true);
    try {
      const result = await askGuide(question, history);
      setHistory((prev) => [...prev, { role: "assistant", content: result.answer }]);
      setSources(result.sources || []);
    } catch {
      setErrored(true);
      setHistory((prev) => [...prev, { role: "assistant", content: "The guide could not reach its reviewed notes just now." }]);
    } finally {
      setPending(false);
    }
  };

  return (
    <motion.div
      className="guide-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Ask the guide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="guide-panel"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.4, ease: easeOut }}
      >
        <div className="guide-head">
          <div>
            <span className="eyebrow">A grounded companion</span>
            <h2>Ask the guide.</h2>
          </div>
          <motion.button
            className="icon-button"
            onClick={close}
            aria-label="Close guide"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>
        </div>
        <p className="guide-intro">
          Ask about places, seasons, routes, or the feeling of a destination. Answers are generated from
          reviewed notes and linked to their sources.
        </p>
        {history.length === 0 && (
          <motion.div
            className="suggestions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: easeOut }}
          >
            <button onClick={() => setMessage("What is a gentle first trip through the north?")}>
              A gentle first trip north?
            </button>
            <button onClick={() => setMessage("Where can I find heritage and food in one place?")}>
              Heritage and food?
            </button>
          </motion.div>
        )}
        <div className="guide-thread">
          <AnimatePresence initial={false}>
            {history.map((turn, i) => (
              <motion.div
                key={i}
                className={`guide-message ${turn.role}`}
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: easeOut }}
              >
                {turn.content}
              </motion.div>
            ))}
          </AnimatePresence>
          <AnimatePresence>
            {pending && (
              <motion.div
                className="guide-message assistant typing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                The guide is looking through its notes…
              </motion.div>
            )}
          </AnimatePresence>
          {errored && (
            <motion.div
              className="guide-error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span>We hit a connection problem.</span>
              <button className="text-button" onClick={() => void send(lastQuestion)}>
                Retry <ArrowUpRight size={14} />
              </button>
            </motion.div>
          )}
          {sources.length > 0 && history.length > 0 && (
            <motion.div
              className="source-chips"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              {sources.map((source) => (
                <Link key={source.id} href={source.url} className="source-chip">
                  Source: {source.title} <ArrowUpRight size={12} />
                </Link>
              ))}
            </motion.div>
          )}
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              void send();
            }
          }}
          placeholder="Ask a question about Pakistan…"
          aria-label="Your question"
        />
        <div className="guide-foot">
          <span>Reviewed notes · current details need a local check</span>
          <motion.button
            className="send-button"
            disabled={!message.trim() || pending}
            onClick={() => void send()}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.96 }}
          >
            Send question <Send size={16} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
