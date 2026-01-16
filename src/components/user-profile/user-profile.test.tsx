import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { UserProfile } from "./user-profile.component";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("UserProfile", () => {
  // const functionMock = vi.fn()
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
  it("Fetches and displays the user data", async () => {
    // Use vi.mocked() to tell TypeScript this is a mock
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 4,
        name: "Kurtis Weissnat",
        email: "kurtis@gmail.com",
      }),
    } as Response);

    render(<UserProfile userId={"9"} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Kurtis Weissnat/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/kurtis@gmail.com/i)).toBeInTheDocument();
    });
  });
});
