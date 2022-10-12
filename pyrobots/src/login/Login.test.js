import { render, screen } from "@testing-library/react";
import Login from "./Login";

it('should have a email and password field, alsog a sumbit button', () => {
    render(<Login />);
    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/submit/i);

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});