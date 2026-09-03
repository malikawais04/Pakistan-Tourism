"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ArrowUpRight, Send, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { askGuide, type ChatSource, type ChatTurn } from "@/lib/api";

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
      {!open && (
        <button className="guide-launcher" onClick={() => setOpen(true)} aria-label="Open the travel guide">
          <Sparkles size={16} />
          <span>
            <b>RAG guide</b>
            <small>Live source-aware chat</small>
          </span>
          <ArrowUpRight size={14} />
        </button>
      )}
      {open && <GuidePanel close={() => setOpen(false)} />}
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
    <div className="guide-overlay" role="dialog" aria-modal="true" aria-label="Ask the guide">
      <div className="guide-panel">
        <div className="guide-head">
          <div>
            <span className="eyebrow">A grounded companion</span>
            <h2>Ask the guide.</h2>
          </div>
          <button className="icon-button" onClick={close} aria-label="Close guide">
            <X size={20} />
          </button>
        </div>
        <p className="guide-intro">
          Ask about places, seasons, routes, or the feeling of a destination. Answers are generated from
          reviewed notes and linked to their sources.
        </p>
        {history.length === 0 && (
          <div className="suggestions">
            <button onClick={() => setMessage("What is a gentle first trip through the north?")}>
              A gentle first trip north?
            </button>
            <button onClick={() => setMessage("Where can I find heritage and food in one place?")}>
              Heritage and food?
            </button>
          </div>
        )}
        <div className="guide-thread">
          {history.map((turn, i) => (
            <div key={i} className={`guide-message ${turn.role}`}>
              {turn.content}
            </div>
          ))}
          {pending && <div className="guide-message assistant typing">The guide is looking through its notes…</div>}
          {errored && (
            <div className="guide-error">
              <span>We hit a connection problem.</span>
              <button className="text-button" onClick={() => void send(lastQuestion)}>
                Retry <ArrowUpRight size={14} />
              </button>
            </div>
          )}
          {sources.length > 0 && history.length > 0 && (
            <div className="source-chips">
              {sources.map((source) => (
                <Link key={source.id} href={source.url} className="source-chip">
                  Source: {source.title} <ArrowUpRight size={12} />
                </Link>
              ))}
            </div>
          )}
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
          placeholder="Ask a question about Pakistan…"
          aria-label="Your question"
        />
        <div className="guide-foot">
          <span>Reviewed notes · current details need a local check</span>
          <button className="send-button" disabled={!message.trim() || pending} onClick={() => void send()}>
            Send question <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
