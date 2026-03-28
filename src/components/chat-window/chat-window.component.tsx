import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext, type ContextTypes } from "../../context/global.context";

export const ChatWindow: React.FC = () => {
  const { theme, dispatch } = useContext<ContextTypes>(GlobalContext);

  const [messages, setMessages] = useState<string[]>([
    "Hello!",
    "How can I help?",
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    dispatch({
      type: "SET_THEME",
      payload: nextTheme,
    });
  };

  const addMessage = () => {
    setMessages([
      ...messages,
      "New message at " + new Date().toLocaleTimeString(),
    ]);
  };

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>
          Theme: <span style={{ color: "#04ba6e" }}>{theme}</span>
        </h3>

        <button onClick={toggleTheme}>Switch Theme</button>
      </div>
      <div
        style={{
          height: "200px",
          overflowY: "scroll",
          border: "1px solid blue",
        }}
      >
        {messages.map((msg, i) => (
          <p
            key={i}
            style={{ margin: "10px 0", padding: "5px", background: "#0dada5" }}
          >
            {msg}
          </p>
        ))}
        {/* This is the 'anchor' we scroll to */}
        <div ref={bottomRef} />
      </div>

      <button onClick={addMessage} style={{ marginTop: "10px" }}>
        Send Message
      </button>
    </div>
  );
};
