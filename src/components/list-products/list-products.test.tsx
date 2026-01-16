import { render, screen, waitFor } from "@testing-library/react";
import { ListProducts } from "./list-products.component";
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

describe("ListProducts", () => {
  it("should update input value and filter list only after clicking search", async () => {
    const user = userEvent.setup();
    render(<ListProducts />);

    // 1. Target the input and button
    const input = screen.getByTestId("inputFormListData");
    const button = screen.getByRole("button", { name: /search/i });

    // 2. Initial state: check if a known product is there
    expect(screen.getByText(/iPhone 15/i)).toBeInTheDocument();

    // 3. Action: Type into the input
    await user.type(input, "Coffee");

    // Test behavior: The input should show "Coffee", but the list shouldn't change yet (useMemo logic)
    expect(input).toHaveValue("Coffee");
    expect(screen.getByText(/iPhone 15/i)).toBeInTheDocument();

    // 4. Action: Click search
    await user.click(button);

    // 5. Assertion: The list is now filtered
    expect(screen.queryByText(/iPhone 15/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Coffee Maker/i)).toBeInTheDocument();

    //

    // Clear the previous text "Coffee"
    await user.clear(input);

    await user.type(input, "Bus");

    expect(input).toHaveValue("Bus");
    expect(screen.getByText(/Coffee Maker/i)).toBeInTheDocument();

    await user.click(button);

    expect(screen.queryByText(/Coffee/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Bus/i)).toBeInTheDocument();
    expect(screen.getByText(/Bus/i)).toBeInTheDocument();
  });

  it("should show empty state message when no products match", async () => {
    const user = userEvent.setup();
    render(<ListProducts />);

    const input = screen.getByLabelText(/Name Product/i);
    const button = screen.getByRole("button", { name: /search/i });

    // Action: Search for something that doesn't exist
    await user.type(input, "NonExistentProduct");
    await user.click(button);

    // Assertion: Check for your specific error message
    expect(
      screen.getByText(/No products found for "NonExistentProduct"/i)
    ).toBeInTheDocument();
  });
});
