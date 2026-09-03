import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Listing from "@/components/Listing";

export const metadata: Metadata = { title: "Experiences — Pakistan Tourism" };

export default function ExperiencesPage() {
  return (
    <>
      <Header />
      <Listing kind="experiences" />
      <Footer />
    </>
  );
}
