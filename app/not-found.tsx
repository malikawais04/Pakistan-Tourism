import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="listing-page container">
        <div className="empty-state" style={{ marginTop: 60 }}>
          <h3>This page wandered off.</h3>
          <p>We couldn't find that note in the atlas.</p>
          <Link href="/" className="text-button">
            Back to the homepage <ArrowUpRight size={15} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
