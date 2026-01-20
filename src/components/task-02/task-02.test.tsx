import { getByTestId, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TaskManager02 } from "./task-02.component";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("TaskManager02", () => {
  it("If the array of elements is empty, user will see a text says 'There are no elements.'", async () => {
    const user = userEvent.setup();
    render(<TaskManager02 />);

    const noElementsText = screen.getByText(/There are no elements./i);

    expect(noElementsText).toBeInTheDocument();

    const inputTextValue = screen.getByTestId("inputTextValue");
    const btnSubmit = screen.getByTestId("btnSubmit");

    await user.type(inputTextValue, "Test task..");
    await user.click(btnSubmit);

    expect(
      screen.queryByText(/There are no elements./i),
    ).not.toBeInTheDocument();
  });
});
