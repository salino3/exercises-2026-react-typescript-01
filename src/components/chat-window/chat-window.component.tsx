import React, { useState, useEffect, useRef } from "react";

export const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([
    "Hello!",
    "How can I help?",
  ]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const addMessage = () => {
    setMessages([
      ...messages,
      "New message at " + new Date().toLocaleTimeString(),
    ]);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
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
