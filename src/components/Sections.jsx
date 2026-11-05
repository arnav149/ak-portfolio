import React from "react";
import Reveal from "./Reveal";
import Prompt from "./Prompt";
import { commits, profile, skills } from "../content";

const GLYPHS = [
  { text: "{ }", top: 70, right: "9%", d: 5, t: 0 },
  { text: "<3", top: 190, right: "22%", d: 6.5, t: 0.8, pink: true },
  { text: "=>", top: 300, right: "6%", d: 7, t: 0.3 },
  { text: "git push", top: 120, right: "34%", d: 5.5, t: 1.4 },
  { text: "</>", top: 380, right: "28%", d: 6, t: 0.6 },
  { text: "swipe →", top: 250, right: "14%", d: 8, t: 1 }
];

export function Hero() {
  return (
    <section id="top" className="hero dots">
      <div aria-hidden="true">
        {GLYPHS.map(g => (
          <span
            key={g.text}
            className={`glyph${g.pink ? " glyph--pink" : ""}`}
            style={{ top: g.top, right: g.right, "--d": `${g.d}s`, "--t": `${g.t}s` }}
          >
            {g.text}
          </span>
        ))}
      </div>
      <div className="hero__inner">
        <Prompt>
          <span className="type" style={{ "--s": 6, "--d": "500ms", "--t": "300ms" }}>
            whoami
          </span>
        </Prompt>
        <h1 className="fade" style={{ "--t": "950ms" }}>
          {profile.name}
          <span className="cursor pink">_</span>
        </h1>
        <div className="hero__role fade" style={{ "--t": "1150ms" }}>
          {profile.role} <span className="muted">@</span> {profile.company} · {profile.location}
        </div>
        <div className="fade hero__gap" style={{ "--t": "1400ms" }}>
          <Prompt>
            <span className="type" style={{ "--s": 13, "--d": "800ms", "--t": "1600ms" }}>
              cat pitch.txt
            </span>
          </Prompt>
        </div>
        <p className="hero__pitch fade" style={{ "--t": "2500ms" }}>
          {profile.pitch}
        </p>
        <div className="btn-row fade hero__gap" style={{ "--t": "2800ms" }}>
          <a className="tbtn tbtn--hot" href="#projects">
            ./start-swiping{" "}
            <span className="beat" aria-hidden="true">
              ♥
            </span>
          </a>
          <a className="tbtn" href={profile.links.github} target="_blank" rel="noopener noreferrer">
            github
          </a>
          <a className="tbtn" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            linkedin
          </a>
          <a className="tbtn" href={`mailto:${profile.email}`}>
            email
          </a>
        </div>
      </div>
    </section>
  );
}

export function GitLog() {
  return (
    <section id="log" className="section">
      <Reveal className="section-head">
        <Prompt>git log --career --oneline-ish</Prompt>
        <h2>Experience</h2>
      </Reveal>
      <ol className="gitlog">
        {commits.map(c => (
          <Reveal as="li" key={c.hash} className="commit">
            <div className="commit__rail" aria-hidden="true">
              <span
                className={`commit__dot${c.head ? " commit__dot--head pulse" : ""}${c.root ? " commit__dot--root" : ""}`}
              />
              <span className="commit__line" />
            </div>
            <div className="commit__body">
              <div>
                <span className="amber">commit {c.hash}</span> <span className="blue">{c.ref}</span>
              </div>
              <div className="muted small">Date: {c.period}</div>
              <h3>{c.title}</h3>
              <ul>
                {c.bullets.map(b => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

const Arr = ({ items }) => (
  <>
    [
    {items.map((s, i) => (
      <React.Fragment key={s}>
        <span className="str">"{s}"</span>
        {i < items.length - 1 ? ", " : ""}
      </React.Fragment>
    ))}
    ]
  </>
);

export function Stack() {
  return (
    <section id="stack" className="section">
      <Reveal className="section-head">
        <Prompt>cat package.json | jq .skills</Prompt>
      </Reveal>
      <Reveal as="pre" className="json">
        {"{\n  "}
        <span className="key">"languages"</span>: <Arr items={skills.languages} />
        {",\n  "}
        <span className="key">"backend"</span>: <Arr items={skills.backend} />
        {",\n  "}
        <span className="key">"ai"</span>: <Arr items={skills.ai} />
        {",\n  "}
        <span className="key">"mobile"</span>: <Arr items={skills.mobile} />
        {",\n  "}
        <span className="key">"education"</span>: <span className="str">"{skills.education}"</span>
        {"\n}"}
      </Reveal>
    </section>
  );
}

export function Contact({ onReboot }) {
  return (
    <section id="contact" className="section section--last">
      <Reveal className="section-head">
        <Prompt>./slide-into-dms.sh</Prompt>
        <h2 className="contact__title">
          Swiped right? <span className="pink">Let’s talk.</span>
        </h2>
      </Reveal>
      <Reveal className="btn-row">
        <a className="tbtn tbtn--hot" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <a className="tbtn" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
          linkedin
        </a>
        <a className="tbtn" href={profile.links.github} target="_blank" rel="noopener noreferrer">
          github
        </a>
        <a className="tbtn" href={profile.links.instagram} target="_blank" rel="noopener noreferrer">
          instagram
        </a>
      </Reveal>
      <footer className="footer">
        <span>© {new Date().getFullYear()} arnav kasturia · process exited with code 0</span>
        <span>
          built with coffee + fried chicken ·{" "}
          <button className="linkish" onClick={onReboot}>
            ./reboot
          </button>
        </span>
      </footer>
    </section>
  );
}
