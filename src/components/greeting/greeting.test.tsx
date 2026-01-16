import React from "react";
import { render, screen } from "@testing-library/react";
import { Greeting } from "./greeting.component";
import { describe, it, expect } from "vitest";
// import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";

describe("Greenting", () => {
  it("Renders a default value", () => {
    render(<Greeting />);

    expect(screen.getByText("Hello, World")).toBeInTheDocument();
  });

  it("Renders greeting with a name", () => {
    render(<Greeting name="Joe" />);

    expect(screen.getByText("Hello, Joe")).toBeInTheDocument();
  });
});
