import React from "react";
import { render, screen } from "@testing-library/react";
import { Counter } from "./counter.component";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("Counter", () => {
  it("Increments counter on button click", async () => {
    // const user = userEvent.setup();
    render(<Counter />);

    const button = screen.getByRole("button", { name: /Increment/i });
    const counterValue = screen.getByTestId("counter_value");

    expect(counterValue).toHaveTextContent("0");

    await userEvent.click(button);

    // Check the update
    expect(counterValue).toHaveTextContent("1");

    await userEvent.click(button);

    // Check the update
    expect(counterValue).toHaveTextContent("2");

    await userEvent.type(button, "2");
  });
});
