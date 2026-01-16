import React from "react";
import { renderHook, screen, waitFor, act } from "@testing-library/react";
import { useCounter } from "./use-counter";

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("useCounter", () => {
  it("initailValue is 5", () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);
  });

  it("increment", () => {
    const { result } = renderHook(() => useCounter(0));
    expect(result.current.count).toBe(0);
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);

    act(() => {
      result.current.increment();
    });

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(1);
  });

  it("decrement", () => {
    const { result } = renderHook(() => useCounter(-1));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-2);
  });
});
