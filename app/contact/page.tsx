import type { Metadata } from "next";
import PageTitle from "@/components/page-title";
import ContactForm from "@/components/contact-form";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageTitle kicker="Bookings · Press · Collabs" title="Contact" intro="Artists, venues, press and collaborators: send us a message and we'll get back to you." />

      <section className="container grid gap-16 md:grid-cols-[1fr_1.3fr]" style={{ paddingBottom: 128 }}>
        <div data-reveal>
          <div className="mono" style={{ color: "var(--smoke-2)" }}>
            Follow
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 12 }}>
            {Object.entries(site.socials).map(([name, href]) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" className="link-arrow">
                {name} ↗
              </a>
            ))}
          </div>
        </div>

        <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
