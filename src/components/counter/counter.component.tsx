import { useState } from "react";

export function Counter() {
  const [count, setCounter] = useState<number>(0);

  return (
    <div>
      <p data-testid="counter_value">{count}</p>
      <button onClick={() => setCounter((prev: number) => prev + 1)}>
        Increment
      </button>
    </div>
  );
}
