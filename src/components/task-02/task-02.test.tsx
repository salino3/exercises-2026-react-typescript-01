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

  it("if you add a task in to the list, the input clear automatically", async () => {
    const user = userEvent.setup();
    render(<TaskManager02 />);

    const inputTextValue = screen.getByTestId("inputTextValue");
    const btnSubmit = screen.getByTestId("btnSubmit");

    await user.type(inputTextValue, "Test task..");
    await user.click(btnSubmit);

    expect(
      screen.queryByText(/There are no elements./i),
    ).not.toBeInTheDocument();

    expect(inputTextValue).toHaveValue("");
  });

  it("If the input value with trim() method is '', the form does not execute anything", async () => {
    localStorage.clear();
    const user = userEvent.setup();
    render(<TaskManager02 />);

    const inputTextValue = screen.getByTestId("inputTextValue");
    const btnSubmit = screen.getByTestId("btnSubmit");

    const tasksBefore = screen.queryAllByTestId("liTask");
    const countBefore = tasksBefore.length;

    //  Acción
    await user.type(inputTextValue, "    ");
    await user.click(btnSubmit);

    //  Important: Should check the DOM again to see if it has changed
    const tasksAfter = screen.queryAllByTestId("liTask");

    //  Comparison of numbers
    expect(tasksAfter.length).toBe(countBefore);

    //  Acción
    await user.clear(inputTextValue);
    await user.type(inputTextValue, "Cook the dinner");
    await user.click(btnSubmit);
    // findAllByTestId asyncronous
    const newTasks = await screen.findAllByTestId("liTask");
    expect(newTasks.length).toBe(1);
    expect(newTasks[0]).not.toBe(countBefore);
    expect(newTasks[0]).toHaveTextContent("Cook the dinner");
  });
});
