"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/brand-logo";
import { nav } from "@/data/site";
import { getUpcomingEvents, SHOTGUN_PAGE } from "@/data/events";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const next = getUpcomingEvents()[0];
  const ticketsHref = next?.ticketsHref ?? SHOTGUN_PAGE;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled || open || pathname !== "/";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          height: "var(--header-h)",
          background: solid ? "rgba(10,10,10,0.92)" : "transparent",
          borderBottom: `1px solid ${solid ? "var(--line)" : "transparent"}`,
          backdropFilter: solid ? "blur(8px)" : "none",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div className="container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <BrandLogo onClick={() => setOpen(false)} />
  
          <nav className="hidden md:flex" style={{ alignItems: "center", gap: 36 }} aria-label="Main">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mono"
                  style={{
                    fontSize: 13,
                    color: active ? "var(--text)" : "var(--text-dim)",
                    borderBottom: `1px solid ${active ? "var(--red-hi)" : "transparent"}`,
                    paddingBottom: 3,
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <a href={ticketsHref} target="_blank" rel="noreferrer" className="btn btn-solid btn-sm">
              Tickets
            </a>
          </nav>
  
          <button
            className="md:hidden mono"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            style={{ background: "none", border: 0, color: "var(--text)", fontSize: 13, padding: 8, cursor: "pointer" }}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Outside the header: its backdrop blur would trap a fixed panel inside it. */}
      {open ? (
        <div
          id="mobile-menu"
          className="md:hidden"
          style={{
            position: "fixed",
            top: "var(--header-h)",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 59,
            background: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "32px 20px 40px",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: 6 }} aria-label="Mobile">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display fade-up"
                style={{ fontSize: 64, ["--d" as string]: `${i * 70}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a href={ticketsHref} target="_blank" rel="noreferrer" className="btn btn-solid" style={{ width: "100%" }}>
            Tickets
          </a>
        </div>
      ) : null}
    </>
  );
}
