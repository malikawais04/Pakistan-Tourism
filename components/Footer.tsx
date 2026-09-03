import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { assets } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Link href="/" className="brand footer-brand">
            <img src={assets.mark} alt="" />
            <span>
              Pakistan
              <br />
              <i>Tourism</i>
            </span>
          </Link>
          <p className="footer-copy">A considered starting point for exploring Pakistan’s places, stories, and routes.</p>
        </div>
        <div className="footer-links">
          <div>
            <span className="eyebrow">Explore</span>
            <Link href="/destinations">Destinations</Link>
            <Link href="/experiences">Experiences</Link>
          </div>
          <div>
            <span className="eyebrow">Read</span>
            <Link href="/about">Our approach</Link>
            <Link href="/contact">Plan a trip</Link>
          </div>
          <div>
            <span className="eyebrow">Follow</span>
            <span className="socials">
              <Instagram size={16} />
              <Facebook size={16} />
            </span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Pakistan Tourism</span>
        <span>Information can change. Check current official and local sources before you travel.</span>
        <span>Privacy · Disclaimer</span>
      </div>
    </footer>
  );
}
