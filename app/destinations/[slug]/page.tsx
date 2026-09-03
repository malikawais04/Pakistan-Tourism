import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Detail from "@/components/Detail";
import { destinations, findDetail } from "@/lib/data";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = findDetail("destination", params.slug);
  return { title: `${entry.title} — Pakistan Tourism` };
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const entry = findDetail("destination", params.slug);
  return (
    <>
      <Header />
      <Detail entry={entry} />
      <Footer />
    </>
  );
}
