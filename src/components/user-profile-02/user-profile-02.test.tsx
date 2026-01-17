import { render, screen, waitFor, within } from "@testing-library/react";
import { UserProfile02 } from "./user-profile-02.component";
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
import { act } from "react";

describe("UserProfile02", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Verify 'Loading profile...' is visible as soon as the component mounts.", () => {
    render(<UserProfile02 />);
    const loadingText = screen.getByText("Loading profile...");

    expect(loadingText).toBeInTheDocument();
  });

  it("Verify after 500ms, the name 'John Doe' appears", async () => {
    render(<UserProfile02 />);

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    const userName = screen.getByTestId("user-name");

    expect(within(userName).getByText(/John Doe/i)).toBeInTheDocument();
  });
});
