import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { availableProducts, ShoppingCart } from "./shopping-card.component";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("ShoppingCart", () => {
  it("clicking to Laptop Pro, I visualize one Laptop Pro in the cart list", async () => {
    const user = userEvent.setup();
    const { container } = render(<ShoppingCart />);

    const btn = container.querySelector('[data-btn-id="btn-Laptop Pro"]');

    if (!btn) return new Error("Button didn't find");

    await user.click(btn);
    const listCart = await screen.findByTestId("containerProducts");
    const itemCart = await within(listCart).findByText(/Laptop Pro/i);

    expect(itemCart).toBeInTheDocument();
  });

  it("Appear 3 available products in the list", () => {
    const { container } = render(<ShoppingCart />);

    const availableProductsElements =
      container.querySelectorAll(".cardProducts");

    expect(availableProductsElements.length).toBe(3);

    expect(screen.getByText(/Laptop Pro/i)).toBeInTheDocument();
    expect(screen.getByText(/Camiseta Algodón/i)).toBeInTheDocument();
    expect(screen.getByText(/Cafetera/i)).toBeInTheDocument();
  });
});
