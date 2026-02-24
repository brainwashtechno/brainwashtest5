"use client";

import { useMemo, useState } from "react";

type Props = {
  toEmail?: string; // optional - if you want mailto
};

export default function ContactForm({ toEmail }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return name.trim().length > 0 && email.trim().length > 0 && message.trim().length > 0;
  }, [name, email, message]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);

    // OPTION A (no backend): mailto
    // This is the safest in Stackblitz with zero API needed.
    if (toEmail) {
      const subject = encodeURIComponent(`Brainwash — Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
      setSubmitting(false);
      return;
    }

    // OPTION B: placeholder (if you later add an API route)
    // For now, just "fake success".
    await new Promise((r) => setTimeout(r, 400));
    setSubmitting(false);

    // Clear
    setName("");
    setEmail("");
    setMessage("");
    alert("Message ready to send (connect API or set mailto email).");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm text-white/80">Name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-white/35"
          placeholder="Your name"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-white/80">Email</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-white/35"
          placeholder="you@email.com"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-white/80">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[140px] rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-white/35"
          placeholder="Write your message..."
        />
      </label>

      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className="inline-flex w-fit items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
