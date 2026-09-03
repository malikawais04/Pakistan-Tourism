import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact — Pakistan Tourism" };

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="contact-page container">
        <div className="contact-intro">
          <span className="eyebrow">A note to the desk</span>
          <h1>
            Planning something
            <br />
            <em>worth remembering?</em>
          </h1>
          <p>
            Tell us what has your attention. This form is a planning prompt, not a booking service; if no delivery
            provider is connected, your message stays on this screen.
          </p>
        </div>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
