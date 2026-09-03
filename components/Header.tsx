"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import { assets } from "@/lib/data";
import { useGuide } from "./GuideProvider";

const links: [string, string][] = [
  ["Destinations", "/destinations"],
  ["Experiences", "/experiences"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function Header() {
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const { openGuide } = useGuide();
  const lightPage = pathname !== "/";

  return (
    <header className={`site-header ${lightPage ? "light-header" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Pakistan Tourism home">
          <img src={assets.mark} alt="" />
          <span>
            Pakistan
            <br />
            <i>Tourism</i>
          </span>
        </Link>
        <nav className={`main-nav ${menu ? "is-open" : ""}`} aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenu(false)}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button className="guide-pill" onClick={openGuide}>
            <Sparkles size={15} /> Ask the guide
          </button>
          <button
            className="menu-button"
            aria-label={menu ? "Close menu" : "Open menu"}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
