"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { easeOut } from "@/lib/motion";

export default function Lightbox({
  images,
  activeIndex,
  title,
  onChange,
  onClose,
}: {
  images: string[];
  activeIndex: number;
  title: string;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const show = (index: number, nextDirection: "next" | "prev") => {
    setDirection(nextDirection);
    onChange((index + images.length) % images.length);
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") show(activeIndex + 1, "next");
      if (event.key === "ArrowLeft") show(activeIndex - 1, "prev");
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, images.length, onClose]);

  const image = images[activeIndex];
  return (
    <motion.div
      className={`lightbox-overlay ${direction}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: easeOut }}
    >
      <motion.div
        className="lightbox-frame"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.35, ease: easeOut }}
      >
        <div className="lightbox-top">
          <span className="eyebrow">{title} / Gallery</span>
          <motion.button
            className="icon-button lightbox-close"
            onClick={onClose}
            aria-label="Close gallery"
            whileHover={{ scale: 1.08, rotate: 90 }}
            whileTap={{ scale: 0.92 }}
          >
            <X size={21} />
          </motion.button>
        </div>
        <div className="lightbox-stage">
          <motion.button
            className="lightbox-nav previous"
            onClick={() => show(activeIndex - 1, "prev")}
            aria-label="Previous image"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={20} />
          </motion.button>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={image}
              className="lightbox-image"
              src={image}
              alt={`${title} gallery image ${activeIndex + 1}`}
              custom={direction}
              initial={{ opacity: 0, x: direction === "next" ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "next" ? -40 : 40 }}
              transition={{ duration: 0.35, ease: easeOut }}
            />
          </AnimatePresence>
          <motion.button
            className="lightbox-nav next"
            onClick={() => show(activeIndex + 1, "next")}
            aria-label="Next image"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight size={20} />
          </motion.button>
        </div>
        <div className="lightbox-bottom">
          <span>
            {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <span>Use arrow keys to browse · Esc to close</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
