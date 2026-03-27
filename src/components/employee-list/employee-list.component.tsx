import React, { useRef } from "react";

export const EmployeeList: React.FC = () => {
  const topRef = useRef<HTMLHeadingElement | undefined | any>();
  const bottomRef = useRef<HTMLDivElement | undefined | any>();

  const scrollToTop = () => {
    topRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBottom = () => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 ref={topRef}>Employee Directory</h1>
      <button
        onClick={scrollToBottom}
        style={{ position: "fixed", top: "20px", right: "20px" }}
      >
        ↓ Go to Bottom
      </button>
      <div style={{ height: "150vh", background: "#f0f0f0", margin: "20px 0" }}>
        <p>... Lots of scrolling content ...</p>
      </div>

      <button
        onClick={scrollToTop}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        ↑ Back to Top
      </button>
      <div ref={bottomRef}></div>
    </div>
  );
};
