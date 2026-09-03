"use client";

import { Sparkles } from "lucide-react";
import { useGuide } from "./GuideProvider";

export default function AskGuideButton({ className = "primary-button" }: { className?: string }) {
  const { openGuide } = useGuide();
  return (
    <button className={className} onClick={openGuide}>
      Ask the guide <Sparkles size={16} />
    </button>
  );
}
