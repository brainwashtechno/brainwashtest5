"use client";

import { useState } from "react";

/** Opens the visitor's email app with the message filled in (no server needed). */
export default function ContactForm({ toEmail }: { toEmail: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Booking");
  const [message, setMessage] = useState("");

  const canSubmit = name.trim() && email.trim() && message.trim();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const subject = encodeURIComponent(`Brainwash — ${topic} — ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 28 }}>
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

      <button type="submit" disabled={!canSubmit} className="btn btn-solid" style={{ justifySelf: "start", opacity: canSubmit ? 1 : 0.5 }}>
        Send message
      </button>
    </form>
  );
}
