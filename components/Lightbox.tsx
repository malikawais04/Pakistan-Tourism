"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

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
    <div
      className={`lightbox-overlay ${direction}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lightbox-frame">
        <div className="lightbox-top">
          <span className="eyebrow">{title} / Gallery</span>
          <button className="icon-button lightbox-close" onClick={onClose} aria-label="Close gallery">
            <X size={21} />
          </button>
        </div>
        <div className="lightbox-stage">
          <button className="lightbox-nav previous" onClick={() => show(activeIndex - 1, "prev")} aria-label="Previous image">
            <ArrowLeft size={20} />
          </button>
          <img key={image} className="lightbox-image" src={image} alt={`${title} gallery image ${activeIndex + 1}`} />
          <button className="lightbox-nav next" onClick={() => show(activeIndex + 1, "next")} aria-label="Next image">
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="lightbox-bottom">
          <span>
            {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <span>Use arrow keys to browse · Esc to close</span>
        </div>
      </div>
    </div>
  );
}
