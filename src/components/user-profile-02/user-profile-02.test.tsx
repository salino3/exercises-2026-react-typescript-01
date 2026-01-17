import { fireEvent, render, screen, within } from "@testing-library/react";
import { UserProfile02 } from "./user-profile-02.component";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act } from "react";
import * as api from "../../api";
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

  it("shows error message on failure", async () => {
    const spy = vi
      .spyOn(api, "fetchUserProfile")
      .mockRejectedValue(new Error("Fail"));

    render(<UserProfile02 />);

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    const errorMessage = screen.getByText(/Error, try to refresh the page/i);

    expect(errorMessage).toBeInTheDocument();
    spy.mockRestore();
  });

  it("should display Admin Badge when user is an administrator", async () => {
    // 1. Define your custom mock data
    const adminUser = {
      name: "Jane Boss",
      email: "jane@company.com",
      isAdmin: true, // Changing the logic here!
    };

    // 2. Use mockResolvedValue to force the API to return Jane
    const spy = vi.spyOn(api, "fetchUserProfile").mockResolvedValue(adminUser);

    render(<UserProfile02 />);

    // 3. Advance timers to skip the loading state
    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    // 4. ASSERTIONS
    // The name should be Jane Boss
    expect(screen.getByText(/Jane Boss/i)).toBeInTheDocument();

    // The Admin badge should be there
    const adminBadge = screen.getByText(/Administrator Mode Active/i);
    expect(adminBadge).toBeInTheDocument();

    // The "Request Access" button should NOT be there
    const requestBtn = screen.queryByText(/request admin access/i);
    expect(requestBtn).not.toBeInTheDocument();

    spy.mockRestore();
  });
});
