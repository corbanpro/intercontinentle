import React from "react";
import "./Tooltip.css";

type TTooltipProps = {
  children: React.ReactNode;
  text: string;
};

export default function Tooltip({ children, text }: TTooltipProps) {
  const [show, setShow] = React.useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div className="tooltip" style={show ? { visibility: "visible" } : {}}>
        {text}
        <span className="tooltip-arrow" />
      </div>
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </div>
    </div>
  );
}
