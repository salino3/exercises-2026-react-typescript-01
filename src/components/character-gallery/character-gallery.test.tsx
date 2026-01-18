import { render, screen } from "@testing-library/react";
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
});
