import ContactForm from "@/components/contact-form";
import { SectionHeader } from "@/components/ui";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <SectionHeader kicker="" title="Contact" subtitle="Send us a message and we’ll get back to you." />

      <div className="mt-8 max-w-2xl rounded-3xl border border-white/10 bg-black/30 p-6">
        {/* Put your email here if you want mailto to work */}
        <ContactForm toEmail="brainwashatl@gmail.com" />
      </div>
    </div>
  );
}
