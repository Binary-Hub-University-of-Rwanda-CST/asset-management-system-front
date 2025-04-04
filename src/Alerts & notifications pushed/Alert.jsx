import React, { useState } from "react";

const Alert = ({ variant }) => {
  const [open, setOpen] = useState(true);

  if (open)
    return (
      <div
        className="alert-container"
        style={{
          background: variant.mainColor,
          border: `0.1rem solid ${variant.secondaryColor}`,
        }}
      >
        <div
          className="symbol-container"
          style={{ background: variant.secondaryColor }}
        >
          <span className="material-symbols-outlined symbol">
            {variant.symbol}
          </span>{" "}
        </div>
        <div className="description-container">
          <span className="description-title" title={variant.title}>
            {variant.title}:
          </span>
          <span className="description-text" title={variant.text}>
            {variant.text}
          </span>
        </div>
        <a
          href="#"
          className="symbol-close-link"
          onClick={() => setOpen(false)}
        >
          <button className="material-symbols-outlined mystyle">Yes and continue</button>
        </a>
      </div>
    );
  else return null;
};

export default Alert;
