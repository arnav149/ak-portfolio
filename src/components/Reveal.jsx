import React, { useEffect, useRef, useState } from "react";

/** Fades its children up the first time they scroll into view. */
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag ref={ref} className={`reveal${shown ? " is-visible" : ""} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
