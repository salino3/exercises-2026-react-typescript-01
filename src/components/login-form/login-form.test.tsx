import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "./login-form.component";
import * as LoginFormComponent from "./login-form.component";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("LoginForm", () => {
  it('Verify if user types "Ab" and clicks "Sign In", error message "Username too short" appears and the onLogin function is NOT called', async () => {
    const user = userEvent.setup();
    const mockOnLogin = vi.fn();
    render(<LoginForm onLogin={mockOnLogin} />);

    const input = screen.getByLabelText(/Username:/i);
    const btnSubmit = screen.getByTestId("btnSubmit");

    await user.type(input, "Ab");
    await user.click(btnSubmit);

    const textError = screen.getByText(/Username too short/i);

    expect(textError).toBeInTheDocument();

    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  it("calls onLogin with correct data when form is valid", async () => {
    const user = userEvent.setup();

    const mockOnLogin = vi.fn();

    render(<LoginForm onLogin={mockOnLogin} />);

    const input = screen.getByLabelText(/Username:/i);
    const select = screen.getByLabelText(/Role:/i);
    const btnSubmit = screen.getByRole("button", { name: /Sign In/i });

    await user.type(input, "Gerard");
    await user.selectOptions(select, "admin");
    await user.click(btnSubmit);
    expect(input).not.toBeNull();
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("Gerard");
    expect(mockOnLogin).toHaveBeenCalledWith("Gerard", "admin");
  });

  it("if user change role value to 'admin', it is sended to the function", async () => {
    const user = userEvent.setup();
    const mockOnLogin = vi.fn();
    render(<LoginForm onLogin={mockOnLogin} />);
    const input = screen.getByLabelText(/Username:/i);
    const dropdown = screen.getByLabelText(/Role:/i);
    const btnSubmit = screen.getByTestId("btnSubmit");
    await user.selectOptions(dropdown, "admin");
    await user.type(input, "Hola");
    await user.clear(input);
    await user.click(btnSubmit);
    expect(mockOnLogin).not.toHaveBeenCalled();
  });
});
