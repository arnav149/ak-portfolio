import React, { useEffect, useRef, useState } from "react";
import { profile, sections } from "../content";

export default function Header() {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const bar = useRef(null);

  // Scroll progress line under the header.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const nodes = sections.map(s => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">
          <span className="traffic" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <a href="#top" className="brand">
            arnav<span className="pink">@</span>kasturia
          </a>
        </div>

        <nav id="site-nav" className={`tabs${open ? " is-open" : ""}`} aria-label="Sections">
          {sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`tab${active === s.id ? " is-active" : ""}`}
              aria-current={active === s.id ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="tbtn tbtn--sm" href={profile.links.github} target="_blank" rel="noopener noreferrer">
            github
          </a>
          <button
            className="menu-btn"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(o => !o)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      <div ref={bar} className="progress" aria-hidden="true" />
    </header>
  );
}
