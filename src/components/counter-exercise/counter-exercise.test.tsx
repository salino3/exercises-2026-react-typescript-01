import { render, screen, waitFor } from "@testing-library/react";
import { calculateDiscount, SimpleCounter } from "./counter-exercise.component";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  expectTypeOf,
} from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("SimpleCounter", () => {
  it("the counter starts at 0", () => {
    render(<SimpleCounter />);

    const counterValue = screen.getByTestId("count-value");

    expect(counterValue).toHaveTextContent("0");
    expect(counterValue).toHaveTextContent("Current count: 0");
  });

  it("increment logic", async () => {
    const user = userEvent.setup();
    render(<SimpleCounter />);

    const incrementButton = screen.getByLabelText("increment");
    const counterValue = screen.getByTestId("count-value");

    await user.click(incrementButton);
    expect(counterValue).toHaveTextContent("1");
  });

  it("decrement", async () => {
    const user = userEvent.setup();
    render(<SimpleCounter />);

    const decrementButton = screen.getByLabelText("decrement");
    const counterValue = screen.getByTestId("count-value");

    await user.click(decrementButton);
    expect(counterValue).toHaveTextContent("0");
  });

  it("Goal Reached!", async () => {
    const user = userEvent.setup();
    render(<SimpleCounter />);

    const incrementButton = screen.getByLabelText("increment");

    // Click 10 times automatically
    for (let i = 0; i < 10; i++) {
      await user.click(incrementButton);
    }

    expect(screen.getByText(/Goal reached!/i)).toBeInTheDocument();
  });

  it("calculates 10% discount", () => {
    const result = calculateDiscount(100);
    expect(result).toBe(10);
  });
});
