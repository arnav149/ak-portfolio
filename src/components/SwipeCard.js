import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

// Thresholds are measured on the finger/mouse travel, not on the (resisted) card offset.
const LIKE_DISTANCE = 110; // px dragged right to count as a like
const REFUSE_DISTANCE = 90; // px dragged left to count as a (denied) left swipe
const FLICK_VELOCITY = 0.55; // px/ms; a fast flick counts even if short
const EXIT_MS = 340;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One draggable card. Drag state lives in refs and is written straight to the
 * element's style, so a drag never re-renders React. That keeps the motion
 * smooth and avoids transitions fighting the pointer.
 */
const SwipeCard = forwardRef(function SwipeCard({ card, position, onLiked, onRefused }, ref) {
  const el = useRef(null);
  const drag = useRef(null); // { id, x0, raw, lastX, lastT, vx }
  const busy = useRef(false); // true while flying out
  const frame = useRef(0);
  const exitTimer = useRef(0);

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
      clearTimeout(exitTimer.current);
    },
    []
  );

  const paint = useCallback(raw => {
    const node = el.current;
    if (!node) return;
    // Left drags feel heavier: the card resists being rejected.
    const dx = raw < 0 ? -Math.pow(-raw, 0.82) : raw;
    node.style.transform = `translate3d(${dx}px,0,0) rotate(${dx / 18}deg)`;
    node.style.setProperty("--like", Math.max(0, Math.min(1, raw / LIKE_DISTANCE)));
    node.style.setProperty("--nope", Math.max(0, Math.min(1, -raw / REFUSE_DISTANCE)));
  }, []);

  const settle = useCallback(() => {
    const node = el.current;
    if (!node) return;
    node.classList.add("is-settling");
    paint(0);
  }, [paint]);

  const shake = useCallback(() => {
    const node = el.current && el.current.querySelector(".swipe-card__body");
    if (!node) return;
    node.classList.remove("is-shaking");
    // Force a reflow so the animation restarts on repeated refusals.
    void node.offsetWidth;
    node.classList.add("is-shaking");
  }, []);

  const like = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    const node = el.current;
    const finish = () => {
      clearTimeout(exitTimer.current);
      onLiked(card);
    };
    if (!node || prefersReducedMotion()) {
      finish();
      return;
    }
    node.classList.add("is-flying");
    const distance = Math.max(window.innerWidth, 800);
    node.style.transform = `translate3d(${distance}px,-40px,0) rotate(28deg)`;
    node.style.setProperty("--like", 1);
    exitTimer.current = setTimeout(finish, EXIT_MS + 40);
  }, [card, onLiked]);

  const refuse = useCallback(() => {
    if (busy.current) return;
    settle();
    shake();
    onRefused();
  }, [onRefused, settle, shake]);

  useImperativeHandle(ref, () => ({ like, refuse }), [like, refuse]);

  const onPointerDown = e => {
    if (busy.current || drag.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const node = el.current;
    node.classList.remove("is-settling");
    try {
      node.setPointerCapture(e.pointerId);
    } catch (_) {
      /* some browsers throw for synthetic pointers */
    }
    const now = performance.now();
    drag.current = { id: e.pointerId, x0: e.clientX, raw: 0, lastX: e.clientX, lastT: now, vx: 0 };
    node.classList.add("is-dragging");
  };

  const onPointerMove = e => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    const now = performance.now();
    d.raw = e.clientX - d.x0;
    const dt = now - d.lastT;
    if (dt > 0) d.vx = 0.8 * ((e.clientX - d.lastX) / dt) + 0.2 * d.vx;
    d.lastX = e.clientX;
    d.lastT = now;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => paint(d.raw));
  };

  const endDrag = (e, cancelled) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    drag.current = null;
    cancelAnimationFrame(frame.current);
    el.current.classList.remove("is-dragging");
    if (cancelled) return settle();
    const { raw, vx } = d;
    if (raw > LIKE_DISTANCE || (vx > FLICK_VELOCITY && raw > 40)) like();
    else if (raw < -REFUSE_DISTANCE || (vx < -FLICK_VELOCITY && raw < -40)) refuse();
    else settle();
  };

  return (
    <article
      ref={el}
      className="swipe-card"
      aria-label={`${card.name}, ${position}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={e => endDrag(e, false)}
      onPointerCancel={e => endDrag(e, true)}
      onLostPointerCapture={e => endDrag(e, true)}
      onDragStart={e => e.preventDefault()}
    >
      <div className="swipe-card__enter">
        <div
          className="swipe-card__body"
          onAnimationEnd={e => {
            if (e.target === e.currentTarget) e.currentTarget.classList.remove("is-shaking");
          }}
        >
          <div className="swipe-card__photo" style={{ background: card.color }}>
            <div className="swipe-card__meta">
              <span>{card.kind}</span>
              <span>{position}</span>
            </div>
            <div className="swipe-card__cmd">
              $ {card.cmd}
              <span className="cursor" aria-hidden="true">
                ▍
              </span>
            </div>
            <div>
              <div className="swipe-card__title">
                <span>{card.name}</span>
                <span className="swipe-card__when">{card.when}</span>
              </div>
              <div className="swipe-card__where">{card.where}</div>
            </div>
            <span className="stamp stamp--like" aria-hidden="true">
              LIKE ♥
            </span>
            <span className="stamp stamp--nope" aria-hidden="true">
              NOPE?
            </span>
          </div>
          <div className="swipe-card__content">
            <p>{card.bio}</p>
            <div className="highlight">
              <span className="highlight__label">Highlight</span>
              <span>{card.highlight}</span>
            </div>
            <ul className="tags" aria-label="Tech">
              {card.tags.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
});

export default SwipeCard;
