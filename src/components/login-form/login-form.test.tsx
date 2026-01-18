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
});
