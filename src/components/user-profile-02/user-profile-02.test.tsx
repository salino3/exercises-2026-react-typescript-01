import { fireEvent, render, screen, within } from "@testing-library/react";
import { UserProfile02 } from "./user-profile-02.component";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act } from "react";
import "@testing-library/jest-dom/vitest";

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

    // expect(within(userName).getByText(/John Doe/i)).toBeInTheDocument();
    expect(within(userName).getByText(/John Doe/i));
  });

  it("Button 'Request Admin Access' visible", async () => {
    render(<UserProfile02 />);
    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    const btnRequestAdminAccess = screen.getByText(/request admin access/i);

    expect(btnRequestAdminAccess).toBeInTheDocument();

    const btnEvent = screen.getByTestId("btn-event");
    fireEvent.click(btnEvent);

    const btnAdminModeActive = screen.getByText(/Administrator Mode Active/i);

    expect(btnAdminModeActive).toBeInTheDocument();
  });
});
