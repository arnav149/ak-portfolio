import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

// Thresholds are measured on the finger/mouse travel, not on the (resisted) card offset.
const LIKE_DISTANCE = 80; // px dragged right to count as a like
const REFUSE_DISTANCE = 70; // px dragged left to count as a (denied) left swipe
const FLICK_VELOCITY = 0.3; // px/ms; a quick swipe counts even if short...
const FLICK_MIN = 30; // ...as long as it travelled at least this far
const VELOCITY_WINDOW_MS = 100; // speed is measured over the last part of the gesture, not one sample
const QUICK_MIN = 50; // a swipe that was fast at any point counts from here, unless it was pulled back
const PULLBACK = 20; // px the pointer may drift back from its furthest point and still count
const EXIT_MS = 340;
const WHEEL_IDLE_MS = 140; // a trackpad gesture is over once wheel events stop for this long

// Trackpads keep sending momentum wheel events after the fingers lift, and
// they can land anywhere (the flying card ignores pointer input). After a card
// is decided, ignore wheel input until the whole stream goes quiet, so one
// gesture can never decide the next card too. A window-level listener tracks
// the stream because the events don't always reach a card.
let wheelLocked = false;
let lastWheelAt = 0;
if (typeof window !== "undefined") {
  window.addEventListener(
    "wheel",
    () => {
      const now = performance.now();
      if (wheelLocked && now - lastWheelAt > WHEEL_IDLE_MS) wheelLocked = false;
      lastWheelAt = now;
    },
    { capture: true, passive: true }
  );
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One draggable card. Drag state lives in refs and is written straight to the
 * element's style, so a drag never re-renders React. That keeps the motion
 * smooth and avoids transitions fighting the pointer.
 */
const SwipeCard = forwardRef(function SwipeCard({ card, position, onLiked, onRefused }, ref) {
  const el = useRef(null);
  const drag = useRef(null); // { id, x0, raw, min, max, peak, samples: [{ x, t }] }
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

  // Two-finger horizontal swipes on a trackpad arrive as wheel events, not
  // pointer events. With natural scrolling, fingers moving right give a
  // negative deltaX, so the card follows -deltaX. A native, non-passive
  // listener is needed to preventDefault, which also stops Chrome's
  // swipe-to-go-back gesture over the card.
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    let travel = 0;
    let idle = 0;

    const decide = () => {
      idle = 0;
      const t = travel;
      travel = 0;
      node.classList.remove("is-dragging");
      if (t > LIKE_DISTANCE || t < -REFUSE_DISTANCE) wheelLocked = true;
      if (t > LIKE_DISTANCE) like();
      else if (t < -REFUSE_DISTANCE) refuse();
      else settle();
    };

    const onWheel = e => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // vertical: let the page scroll
      e.preventDefault();
      if (busy.current || drag.current || wheelLocked) return;
      const unit = e.deltaMode === 1 ? 16 : 1; // lines -> px
      travel -= e.deltaX * unit;
      node.classList.remove("is-settling");
      node.classList.add("is-dragging");
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => paint(travel));
      clearTimeout(idle);
      // Commit early on a long swipe so it feels responsive; otherwise decide when the gesture ends.
      if (travel > LIKE_DISTANCE * 1.6 || travel < -REFUSE_DISTANCE * 1.6) decide();
      else idle = setTimeout(decide, WHEEL_IDLE_MS);
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      node.removeEventListener("wheel", onWheel);
      clearTimeout(idle);
    };
  }, [like, refuse, settle, paint]);

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
    drag.current = {
      id: e.pointerId,
      x0: e.clientX,
      raw: 0,
      min: 0,
      max: 0,
      peak: 0,
      samples: [{ x: e.clientX, t: performance.now() }]
    };
    node.classList.add("is-dragging");
  };

  const onPointerMove = e => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    track(d, e.clientX);
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => paint(d.raw));
  };

  const track = (d, x) => {
    const now = performance.now();
    d.raw = x - d.x0;
    d.samples.push({ x, t: now });
    // keep a little more than the window so there is always a sample at its start
    while (d.samples.length > 2 && now - d.samples[1].t > VELOCITY_WINDOW_MS) d.samples.shift();
    d.max = Math.max(d.max, d.raw);
    d.min = Math.min(d.min, d.raw);
    // Only trust a top speed measured over enough movement; the first few ms of a drag are noisy.
    if (now - d.samples[0].t >= 50) {
      const v = velocity(d);
      if (Math.abs(v) > Math.abs(d.peak)) d.peak = v;
    }
  };

  // Average speed over the last ~100ms. A single last-sample speed made quick
  // swipes snap back at random, because a finger slows down just before it lifts.
  const velocity = d => {
    const a = d.samples[0];
    const b = d.samples[d.samples.length - 1];
    const dt = b.t - a.t;
    return dt > 0 ? (b.x - a.x) / Math.max(dt, 16) : 0;
  };

  // Every way a drag can end goes through here. Only a real pointercancel
  // (the browser taking the gesture over) is allowed to undo a long drag.
  const endDrag = (e, cancelled) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    drag.current = null;
    if (typeof e.clientX === "number" && !cancelled) track(d, e.clientX);
    cancelAnimationFrame(frame.current);
    el.current.classList.remove("is-dragging");
    const { raw, peak } = d;
    const vx = cancelled ? 0 : velocity(d);
    const quickRight = !cancelled && peak > 2 * FLICK_VELOCITY && raw > QUICK_MIN && raw > d.max - PULLBACK;
    const quickLeft = !cancelled && peak < -2 * FLICK_VELOCITY && raw < -QUICK_MIN && raw < d.min + PULLBACK;
    if (raw > LIKE_DISTANCE || (vx > FLICK_VELOCITY && raw > FLICK_MIN) || quickRight) like();
    else if (raw < -REFUSE_DISTANCE || (vx < -FLICK_VELOCITY && raw < -FLICK_MIN) || quickLeft) refuse();
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
      onLostPointerCapture={e => endDrag(e, false)}
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
