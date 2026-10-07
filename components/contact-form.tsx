"use client";

import { useState } from "react";
import { site } from "@/data/site";

/** Sends the message straight to the Brainwash inbox through Web3Forms. */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Booking");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const canSubmit = name.trim() && email.trim() && message.trim() && status !== "sending";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    // Hidden field only bots fill in.
    const botcheck = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.contactFormKey,
          subject: `Brainwash website: ${topic} from ${name}`,
          from_name: "Brainwash website",
          replyto: email,
          name,
          email,
          topic,
          message,
          botcheck,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) throw new Error(data?.message || "Send failed");
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" style={{ display: "grid", gap: 16 }}>
        <div className="mono red">Message sent</div>
        <p className="display" style={{ fontSize: "clamp(32px, 4vw, 48px)", margin: 0 }}>
          Thanks. We&apos;ll get back to you.
        </p>
        <button type="button" className="link-arrow" onClick={() => setStatus("idle")} style={{ justifySelf: "start", background: "none", border: 0, padding: 0, cursor: "pointer" }}>
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 28 }}>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />

      <label style={{ display: "grid", gap: 4 }}>
        <span className="mono" style={{ color: "var(--smoke-2)" }}>
          Name
        </span>
        <input className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" required />
      </label>

      <label style={{ display: "grid", gap: 4 }}>
        <span className="mono" style={{ color: "var(--smoke-2)" }}>
          Email
        </span>
        <input
          className="field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
          required
        />
      </label>

      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="mono" style={{ color: "var(--smoke-2)", marginBottom: 12 }}>
          Topic
        </legend>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Booking", "Press", "Collab", "Other"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className="btn btn-sm"
              aria-pressed={topic === t}
              style={topic === t ? { background: "var(--red)", borderColor: "var(--red)" } : { borderColor: "var(--line)" }}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <label style={{ display: "grid", gap: 4 }}>
        <span className="mono" style={{ color: "var(--smoke-2)" }}>
          Message
        </span>
        <textarea
          className="field"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what you have in mind"
          rows={5}
          style={{ resize: "vertical" }}
          required
        />
      </label>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
        <button type="submit" disabled={!canSubmit} className="btn btn-solid" style={{ opacity: canSubmit ? 1 : 0.5 }}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" ? (
          <span role="alert" className="mono" style={{ color: "var(--red-hi)", textTransform: "none", letterSpacing: "0.02em" }}>
            Couldn&apos;t send. Try again, or message us on Instagram.
          </span>
        ) : null}
      </div>
    </form>
  );
}
