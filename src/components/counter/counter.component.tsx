import { useState } from "react";
import { useCounter } from "../../hooks";

export function Counter() {
  const { count, decrement, increment } = useCounter();

  return (
    <div>
      <p data-testid="counter_value">{count}</p>
      <button id="IDButtonCounter" onClick={() => increment()}>
        Increment
      </button>
      &nbsp;
      <button onClick={() => decrement()}>Decrement</button>
    </div>
  );
}
