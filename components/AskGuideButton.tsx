"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useGuide } from "./GuideProvider";

export default function AskGuideButton({ className = "primary-button" }: { className?: string }) {
  const { openGuide } = useGuide();
  return (
    <motion.button className={className} onClick={openGuide} whileHover={{ x: 3 }} whileTap={{ scale: 0.96 }}>
      Ask the guide <Sparkles size={16} />
    </motion.button>
  );
}
