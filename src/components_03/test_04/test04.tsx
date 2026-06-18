import React, { useMemo, useState } from "react";

function computeExpensiveValue(num: number) {
  // Simulation for huge calculation
  for (let i = 0; i < 1000000000; i++) {}
  return num * 2;
}

export function DataAnalyzer({ data }: { data: number }) {
  const [text, setText] = useState("");

  const expensiveValue = useMemo(() => computeExpensiveValue(data), [data]);

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>Risultato calcolo: {expensiveValue}</p>
    </div>
  );
}
