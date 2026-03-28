import React, { useState, useEffect, useRef } from "react";

export const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const refEl = useRef<HTMLHeadingElement | undefined>();
  useEffect(() => {
    // BUG 1: If we don't handle this correctly, it creates multiple intervals
    const interval = setInterval(() => {
      // BUG 2: This doesn't account for the current 'seconds' value correctly
      if (isActive) {
        setSeconds(seconds + 1);
      }
    }, 1000);

    // BUG 3: Something is missing here to stop the timer when the component dies
    return () => {
      clearInterval(interval);
    };
  }, [refEl.current?.innerText]);

  return (
    <div>
      <h1 ref={refEl}>Time elapsed: {seconds}s</h1>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Pause" : "Resume"}
      </button>
    </div>
  );
};
