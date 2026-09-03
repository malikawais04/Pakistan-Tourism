"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import { assets } from "@/lib/data";
import { useGuide } from "./GuideProvider";
import { easeOut } from "@/lib/motion";

const links: [string, string][] = [
  ["Destinations", "/destinations"],
  ["Experiences", "/experiences"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

const navListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
};

export default function Header() {
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const { openGuide } = useGuide();
  const lightPage = pathname !== "/";

  return (
    <motion.header
      className={`site-header ${lightPage ? "light-header" : ""}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Pakistan Tourism home">
          <img src={assets.mark} alt="" />
          <span>
            Pakistan
            <br />
            <i>Tourism</i>
          </span>
        </Link>
        <motion.nav
          className={`main-nav ${menu ? "is-open" : ""}`}
          aria-label="Primary navigation"
          initial="hidden"
          animate="visible"
          variants={navListVariants}
        >
          {links.map(([label, href]) => (
            <motion.div key={href} variants={navItemVariants} className="nav-item">
              <Link href={href} onClick={() => setMenu(false)}>
                {label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        <div className="header-actions">
          <motion.button
            className="guide-pill"
            onClick={openGuide}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Sparkles size={15} /> Ask the guide
          </motion.button>
          <button
            className="menu-button"
            aria-label={menu ? "Close menu" : "Open menu"}
            onClick={() => setMenu(!menu)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menu ? "close" : "open"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.18 }}
                style={{ display: "flex" }}
              >
                {menu ? <X size={21} /> : <Menu size={21} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
