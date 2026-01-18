import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CharacterGallery } from "./character-gallery.component";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("CharacterGallery", () => {
  it("If arrive two characters, check both are shown", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [
            {
              id: 1,
              name: "Rick Sanchez",
              image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            },
            {
              id: 2,
              name: "Morty Smith",
              image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
            },
          ],
        }),
    });

    render(<CharacterGallery />);
    const loadingMessage = screen.getByText(/Loading characters../i);
    // findByText is good for 'async' / 'await'
    const character01 = await screen.findByText(/Rick Sanchez/i);
    const character02 = await screen.findByText(/Morty Smith/i);

    expect(loadingMessage).toBeInTheDocument();
    expect(character01).toBeInTheDocument();
    expect(character02).toBeInTheDocument();
    expect(
      screen.queryByText(/Loading characters.../i),
    ).not.toBeInTheDocument();
  });

  it("should like Morty Smith specifically without affecting Rick Sanchez", async () => {
    const user = userEvent.setup();

    // 1. Setup the Mock (Same as your previous test)
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [
            { id: 1, name: "Rick Sanchez", image: "rick.png" },
            { id: 2, name: "Morty Smith", image: "morty.png" },
          ],
        }),
    });

    render(<CharacterGallery />);

    // 2. Wait for the cards to appear
    const cards = await screen.findAllByTestId("character-card");
    expect(cards).toHaveLength(2);

    // 3. Find the specific card for Morty
    const mortyCard = cards.find((card) =>
      within(card).queryByText(/Morty Smith/i),
    );

    if (!mortyCard) throw new Error("Morty card not found");

    // 4. Use 'within' to get the button INSIDE Morty's card
    const mortyButton = within(mortyCard).getByRole("button", {
      name: /Like/i,
    });
    await user.click(mortyButton);

    // 5. ASSERTIONS
    // Morty's button should change
    expect(mortyButton).toHaveTextContent(/Liked/i);

    // Rick's button should STILL be unliked
    const rickCard = cards.find((card) =>
      within(card).queryByText(/Rick Sanchez/i),
    );
    const rickButton = within(rickCard!).getByRole("button");
    expect(rickButton).toHaveTextContent(/🤍 Like/i);
  });
});
