import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import { fadeUp } from "@/lib/motion";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="listing-page container">
        <Reveal className="empty-state" style={{ marginTop: 60 }} variants={fadeUp} margin="0px">
          <h3>This page wandered off.</h3>
          <p>We couldn&apos;t find that note in the atlas.</p>
          <Link href="/" className="text-button">
            Back to the homepage <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
