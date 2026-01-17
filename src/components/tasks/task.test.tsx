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

  it("should apply line-through style when a task is completed", async () => {
    render(<TaskManager />);

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    const taskTitle = screen.getByText(/Aprender Vitest/i);
    const statusButton = screen.getAllByTestId("spanHandleStatus")[0];

    expect(taskTitle).not.toHaveStyle("text-decoration-line: line-through");

    fireEvent.click(statusButton);

    expect(taskTitle).toHaveStyle("text-decoration-line: line-through");
  });
});
