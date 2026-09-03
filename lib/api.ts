// Talks to the separate FastAPI + Qdrant + Neon backend described in
// backend/. Configure NEXT_PUBLIC_API_URL in .env.local (see README).
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type ChatTurn = { role: "user" | "assistant"; content: string };
export type ChatSource = { id: string; title: string; url: string; text: string };
export type ChatResponse = { conversationId: string; answer: string; sources: ChatSource[] };

export async function askGuide(query: string, history: ChatTurn[]): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, history }),
  });
  if (!res.ok) {
    throw new Error(`Guide request failed (${res.status})`);
  }
  return res.json();
}
