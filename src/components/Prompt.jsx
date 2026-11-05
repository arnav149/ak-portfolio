import React from "react";

/** A terminal prompt line: `arnav@portfolio ~ % <command>`. */
export default function Prompt({ children, plain = false, dir = "~", user = "arnav@portfolio" }) {
  if (plain) return <div className="prompt">$ {children}</div>;
  return (
    <div className="prompt">
      <span className="green">{user}</span> <span className="blue">{dir}</span> % {children}
    </div>
  );
}
