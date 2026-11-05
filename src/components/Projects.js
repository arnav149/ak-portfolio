import React, { useCallback, useMemo, useReducer, useRef } from "react";
import SwipeCard from "./SwipeCard";
import Reveal from "./Reveal";
import Prompt from "./Prompt";
import { categories, leftSwipeMessages, projects } from "../content";

const initialState = {
  cat: "work",
  pos: { work: 0, personal: 0 },
  liked: [], // project ids, in the order they were liked
  refusals: 0,
  last: null, // 'like' | 'refuse' | null
  tick: 0, // bumps on every action so one-shot animations replay
  mode: "swipe"
};

function reducer(state, action) {
  switch (action.type) {
    case "cat":
      return { ...state, cat: action.cat, last: null };
    case "mode":
      return { ...state, mode: action.mode };
    case "like":
      if (state.liked.includes(action.id)) return state;
      return {
        ...state,
        pos: { ...state.pos, [state.cat]: state.pos[state.cat] + 1 },
        liked: [...state.liked, action.id],
        last: "like",
        tick: state.tick + 1
      };
    case "refuse":
      return { ...state, refusals: state.refusals + 1, last: "refuse", tick: state.tick + 1 };
    case "rewind": {
      const i = state.pos[state.cat];
      if (i === 0) return state;
      return {
        ...state,
        pos: { ...state.pos, [state.cat]: i - 1 },
        liked: state.liked.filter(id => id !== action.prevId),
        last: null
      };
    }
    case "restart":
      return {
        ...state,
        pos: { ...state.pos, [state.cat]: 0 },
        liked: state.liked.filter(id => !action.ids.includes(id)),
        last: null
      };
    default:
      return state;
  }
}

const HEARTS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
  const dist = 120 + (i % 3) * 40;
  return {
    x: Math.round(Math.cos(a) * dist),
    y: Math.round(Math.sin(a) * dist - 40),
    r: (i % 2 ? 1 : -1) * (10 + i * 4),
    size: 18 + (i % 4) * 6,
    delay: (i % 4) * 40,
    fill: ["#F778BA", "#FF9BCF", "#E3B341", "#F778BA", "#FFFFFF"][i % 5]
  };
});

const byId = Object.fromEntries(projects.map(p => [p.id, p]));

export default function Projects() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cardRef = useRef(null);
  const { cat, pos, liked, refusals, last, tick, mode } = state;

  const deck = useMemo(() => projects.filter(p => p.cat === cat), [cat]);
  const idx = pos[cat];
  const top = deck[idx];
  const next = deck[idx + 1];
  const other = cat === "work" ? "personal" : "work";
  const otherLeft = pos[other] < projects.filter(p => p.cat === other).length;
  const likedProjects = liked.map(id => byId[id]);
  const lastLiked = likedProjects[likedProjects.length - 1];

  const onLiked = useCallback(card => dispatch({ type: "like", id: card.id }), []);
  const onRefused = useCallback(() => dispatch({ type: "refuse" }), []);

  const onDeckKey = e => {
    if (!cardRef.current) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      cardRef.current.like();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      cardRef.current.refuse();
    }
  };

  const showList = e => {
    if (e) e.preventDefault();
    dispatch({ type: "mode", mode: "list" });
  };

  return (
    <section id="projects" className="section">
      <Reveal className="cat-tabs" role="tablist" aria-label="Project type">
        {categories.map(c => {
          const on = c.id === cat;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={on}
              className={`cat-tab${on ? " is-on" : ""}`}
              onClick={() => dispatch({ type: "cat", cat: c.id })}
            >
              {c.label}
              <span className="cat-tab__count">{projects.filter(p => p.cat === c.id).length}</span>
            </button>
          );
        })}
      </Reveal>

      <Reveal className="section-head section-head--row">
        <div>
          <Prompt>
            ls ~/projects/{cat} --mode={mode}
          </Prompt>
          <h2>
            Swipe right if you like it. <span className="muted">Swipe left if you… don’t?</span>
          </h2>
        </div>
        <div className="segmented" role="group" aria-label="View mode">
          {["swipe", "list"].map(m => (
            <button
              key={m}
              aria-pressed={mode === m}
              className={mode === m ? "is-on" : ""}
              onClick={() => dispatch({ type: "mode", mode: m })}
            >
              {m}
            </button>
          ))}
        </div>
      </Reveal>

      {mode === "swipe" ? (
        <div className="deckwrap">
          <div className="deck-col">
            <div
              className="deck"
              tabIndex={0}
              onKeyDown={onDeckKey}
              aria-label="Project cards. Use the right arrow to like and the left arrow to swipe left."
            >
              <div className="bubble-slot" aria-live="polite">
                {last === "refuse" && (
                  <div key={tick} className="bubble bubble--refuse">
                    <div className="bubble__meta">swipe_left() → denied ({refusals})</div>
                    {leftSwipeMessages[(refusals - 1) % leftSwipeMessages.length]}
                  </div>
                )}
                {last === "like" && lastLiked && (
                  <div key={tick} className="bubble bubble--like">
                    ♥ {lastLiked.name} → ~/liked
                  </div>
                )}
              </div>
              {next && (
                <div className="swipe-card swipe-card--ghost" aria-hidden="true">
                  <div className="swipe-card__body">
                    <div className="swipe-card__photo" style={{ background: next.color }} />
                  </div>
                </div>
              )}

              {top && (
                <SwipeCard
                  key={top.id}
                  ref={cardRef}
                  card={top}
                  position={`${idx + 1} / ${deck.length}`}
                  onLiked={onLiked}
                  onRefused={onRefused}
                />
              )}

              {last === "like" && (
                <div key={`burst-${tick}`} className="burst" aria-hidden="true">
                  {HEARTS.map((h, i) => (
                    <svg
                      key={i}
                      width={h.size}
                      height={h.size}
                      viewBox="0 0 24 24"
                      style={{
                        "--x": `${h.x}px`,
                        "--y": `${h.y}px`,
                        "--r": `${h.r}deg`,
                        animationDelay: `${h.delay}ms`
                      }}
                    >
                      <path
                        d="M12 21s-7.5-4.6-7.5-10.5A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.9C19.5 16.4 12 21 12 21z"
                        fill={h.fill}
                      />
                    </svg>
                  ))}
                </div>
              )}

              {!top && (
                <div className="deck-done">
                  <div className="beat deck-done__heart" aria-hidden="true">
                    ♥
                  </div>
                  <div className="muted small">$ ls ~/liked | wc -l → {liked.length}</div>
                  <div className="deck-done__title">You liked every single one.</div>
                  <p>
                    {refusals
                      ? `Even after ${refusals} ${refusals === 1 ? "attempt" : "attempts"} to resist. Respect.`
                      : "Not a single left swipe. You have impeccable taste."}
                  </p>
                  <div className="btn-row btn-row--center">
                    {otherLeft && (
                      <button className="tbtn tbtn--hot" onClick={() => dispatch({ type: "cat", cat: other })}>
                        cd ~/{other}
                      </button>
                    )}
                    <a className="tbtn" href="#contact">
                      ./say-hi
                    </a>
                    <button className="tbtn" onClick={() => dispatch({ type: "restart", ids: deck.map(p => p.id) })}>
                      git reset --hard
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="deck-controls">
              <button
                className="round round--nope"
                aria-label="Swipe left (good luck)"
                onClick={() => cardRef.current && cardRef.current.refuse()}
                disabled={!top}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E3B341"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
              <button
                className="round round--sm"
                aria-label="Rewind last card"
                onClick={() => idx > 0 && dispatch({ type: "rewind", prevId: deck[idx - 1].id })}
                disabled={idx === 0}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#79C0FF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <path d="M3 4v5h5" />
                </svg>
              </button>
              <button
                className="round round--like pulse"
                aria-label="Like this project"
                onClick={() => cardRef.current && cardRef.current.like()}
                disabled={!top}
              >
                <svg
                  className="beat"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F778BA"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
                </svg>
              </button>
            </div>
            <div className="deck-hints" aria-hidden="true">
              <span className="hint-l">← left (try it)</span>
              <span className="hint-r">right = like →</span>
            </div>
            {refusals >= 4 && (
              <div className="escape">
                ok, ok.{" "}
                <a href="#projects" onClick={showList}>
                  here’s the boring list view
                </a>
              </div>
            )}
          </div>

          <aside className="deck-side">
            <Reveal className="panel">
              <Prompt plain>cat RULES.md</Prompt>
              <ul className="rules">
                <li>
                  Swipe <b className="pink">right</b> if you like the project.
                </li>
                <li>Drag the card, two-finger swipe on a trackpad, or use the ← → keys.</li>
                <li>
                  Swipe <b className="amber">left</b> if you don’t.{" "}
                  <span className="muted">(We’ll see about that.)</span>
                </li>
                <li>
                  Prefer clicking? Switch to <b>list</b> up top anytime.
                </li>
              </ul>
            </Reveal>
            <Reveal className="panel">
              <div className="panel__head">
                <Prompt plain>ls ~/liked</Prompt>
                <span>
                  {liked.length} / {projects.length}
                </span>
              </div>
              <div className="meter" aria-hidden="true">
                <div style={{ width: `${Math.round((liked.length / projects.length) * 100)}%` }} />
              </div>
              {likedProjects.length === 0 ? (
                <p className="muted sans">Nothing liked yet. Playing hard to get?</p>
              ) : (
                <ul className="liked-list">
                  {likedProjects.map(p => (
                    <li key={p.id} className="liked-row">
                      <span className="dot" style={{ background: p.color }} />
                      <span className="liked-row__text">
                        <b>{p.name}</b>
                        <span className="muted small">
                          {p.kind} · {p.when}
                        </span>
                      </span>
                      <span className="pink" aria-hidden="true">
                        ♥
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
            <Reveal className="panel panel--dashed panel__head">
              <span className="muted">left-swipe attempts</span>
              <span className="amber">
                <b>{refusals}</b> <span className="muted">(all denied)</span>
              </span>
            </Reveal>
          </aside>
        </div>
      ) : (
        <ul className="list-grid">
          {deck.map((p, i) => (
            <li key={p.id} className="list-card" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="list-card__head">
                <span className="swatch" style={{ background: p.color }} />
                <span>
                  <b>{p.name}</b>
                  <span className="muted small">
                    {p.kind} · {p.when}
                  </span>
                </span>
              </div>
              <p>{p.bio}</p>
              <p className="list-card__hl">{p.highlight}</p>
              <div className="muted small">{p.tags.join(" · ")}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
