import React, { useState } from "react";

export const calculateDiscount = (price: number) => price * 0.1;

export const SimpleCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="counter-container">
      <h1>Counter Case</h1>
      <p data-testid="count-value">Current count: {count}</p>
      <button onClick={decrement} aria-label="decrement">
        Minus -
      </button>
      &nbsp;
      <button onClick={increment} aria-label="increment">
        Plus +
      </button>
      {count === 10 && <span role="alert">Goal reached!</span>}
    </div>
  );
};
