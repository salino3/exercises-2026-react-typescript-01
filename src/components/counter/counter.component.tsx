import { useState } from "react";

export function Counter() {
  const [count, setCounter] = useState<number>(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCounter((prev: number) => prev + 1)}>
        Increment
      </button>
    </div>
  );
}
