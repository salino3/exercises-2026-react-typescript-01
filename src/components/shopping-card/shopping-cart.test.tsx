import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { availableProducts, ShoppingCart } from "./shopping-card.component";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("ShoppingCart", () => {
  it("clicking to Laptop Pro, I visualize one Laptop Pro in the cart list", async () => {
    const user = userEvent.setup();
    const mockList = availableProducts;
    const { container } = render(<ShoppingCart />);

    const btn = container.querySelector('[data-btn-id="btn-Laptop Pro"]');

    console.log("clog1", btn);

    if (!btn) return new Error("Button didn't find");

    await user.click(btn);
    const listCart = await screen.findByTestId("containerProducts");

    expect(within(listCart).findByText(/Laptop Pro/i));
  });
});
