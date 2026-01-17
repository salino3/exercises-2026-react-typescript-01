import { render, screen, act, fireEvent } from "@testing-library/react";
import { TaskManager } from "./tasks.component";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("TaskManager Interaction", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should change from ⬜ to ✅ when the span is clicked", async () => {
    render(<TaskManager />);

    // 1. Advance timers to skip the 500ms loading delay
    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    // 2. Find the span (it should be there now)
    const span = screen.getAllByTestId("spanHandleStatus")[0];
    expect(span).toHaveTextContent("⬜");

    // 3. Use fireEvent instead of userEvent to avoid the timeout conflict
    fireEvent.click(span);

    // 4. Check if it changed to ✅
    // Note: match the space if your component has "✅ "
    expect(span.textContent).toContain("✅");
  });
});
