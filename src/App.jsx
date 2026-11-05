import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import BootLoader from "./components/BootLoader";
import Header from "./components/Header";
import Projects from "./components/Projects";
import { Contact, GitLog, Hero, Stack } from "./components/Sections";
import { projects } from "./content";

const BOOT_MS = 4500; // how long the terminal runs before shutting off
const EXIT_MS = 1100; // CRT shut-off + fade
const SEEN_KEY = "ak-portfolio:booted";

const seenThisSession = () => {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch (_) {
    return false;
  }
};

const markSeen = () => {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch (_) {
    /* storage can be unavailable in private mode; the loader just shows again */
  }
};

export default function App() {
  // The loader plays once per browser session; ./reboot replays it.
  const [phase, setPhase] = useState(() => (seenThisSession() ? "done" : "boot"));
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const exit = useCallback(() => {
    clearTimers();
    markSeen();
    setPhase("exit");
    timers.current.push(setTimeout(() => setPhase("done"), EXIT_MS));
  }, []);

  const boot = useCallback(() => {
    clearTimers();
    window.scrollTo(0, 0);
    setPhase("boot");
  }, []);

  useEffect(() => {
    if (phase === "boot") timers.current.push(setTimeout(exit, BOOT_MS));
  }, [phase, exit]);

  useEffect(() => clearTimers, []);

  useEffect(() => {
    document.body.style.overflow = phase === "boot" ? "hidden" : "";
  }, [phase]);

  return (
    <div className="app">
      {phase !== "done" && <BootLoader exiting={phase === "exit"} onSkip={exit} projectCount={projects.length} />}
      {phase !== "boot" && (
        <>
          <a className="skip-link" href="#projects">
            Skip to projects
          </a>
          <Header />
          <Hero />
          <main className="container">
            <Projects />
            <GitLog />
            <Stack />
            <Contact onReboot={boot} />
          </main>
        </>
      )}
    </div>
  );
}
