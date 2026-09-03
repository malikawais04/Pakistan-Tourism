import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Detail from "@/components/Detail";
import { experienceTitles, findDetail } from "@/lib/data";

export function generateStaticParams() {
  return Object.keys(experienceTitles).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = findDetail("experience", params.slug);
  return { title: `${entry.title} — Pakistan Tourism` };
}

export default function ExperienceDetailPage({ params }: { params: { slug: string } }) {
  const entry = findDetail("experience", params.slug);
  return (
    <>
      <Header />
      <Detail entry={entry} />
      <Footer />
    </>
  );
}
