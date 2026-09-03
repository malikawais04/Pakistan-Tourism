import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Listing from "@/components/Listing";

export const metadata: Metadata = { title: "Destinations — Pakistan Tourism" };

export default function DestinationsPage() {
  return (
    <>
      <Header />
      <Listing kind="destinations" />
      <Footer />
    </>
  );
}
