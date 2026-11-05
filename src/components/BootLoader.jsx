import React from "react";

const Line = ({ t, children, className = "" }) => (
  <div className={`fade ${className}`} style={{ "--t": `${t}ms` }}>
    {children}
  </div>
);

const Typed = ({ text, t, d }) => (
  <span className="type" style={{ "--t": `${t}ms`, "--d": `${d}ms`, "--s": text.length }}>
    {text}
  </span>
);

const Host = ({ dir }) => (
  <>
    <span className="green">coolperson@cool-device</span> <span className="blue">{dir}</span> %{" "}
  </>
);

/** The terminal boot screen. `exiting` plays the CRT shut-off. */
export default function BootLoader({ exiting, onSkip, projectCount }) {
  return (
    <div className={`boot dots${exiting ? " is-exiting" : ""}`}>
      <div className="boot__window" role="status" aria-label="Loading portfolio">
        <div className="boot__bar">
          <span className="traffic" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="boot__title">zsh — ArnavsPortfolio</span>
        </div>
        <div className="boot__body">
          <div>
            <Host dir="~" />
            <Typed text="cd ArnavsPortfolio" t={300} d={650} />
          </div>
          <Line t={1150}>
            <Host dir="ArnavsPortfolio" />
            <Typed text="npm start" t={1300} d={420} />
          </Line>
          <Line t={1900} className="muted">
            &gt; ak-portfolio@2.0.0 start
          </Line>
          <Line t={2050} className="boot__progress">
            <span className="spinner" aria-hidden="true" />
            <span className="boot__track">
              <span className="boot__fill" style={{ "--t": "2150ms" }} />
            </span>
          </Line>
          <Line t={2450}>
            <span className="green">✓</span> fetched {projectCount} projects
          </Line>
          <Line t={2850}>
            <span className="green">✓</span> replayed git log <span className="muted">(5 commits)</span>
          </Line>
          <Line t={3250}>
            <span className="green">✓</span> swipe engine ready
          </Line>
          <Line t={3700} className="bold">
            <span className="green">ready in 3.7s</span> <span className="muted">·</span>{" "}
            <span className="pink glow">launching ♥</span>
          </Line>
        </div>
      </div>
      <button className="boot__skip" onClick={onSkip}>
        skip ›
      </button>
    </div>
  );
}
