/* eslint-disable react/jsx-pascal-case */
import { render, screen } from "@testing-library/react";
import Create_user from "./create_user";

describe("Tests of create_users", () => {
    test("form fields exist", () => {
        
        render(<Create_user/>);

        const inputName = screen.getByPlaceholderText("enter your name");
        const inputEmail = screen.getByPlaceholderText("enter your email");
        const inputPassword = screen.getByPlaceholderText("enter your password");
        const submitButton = screen.getByRole('button', {name: /Register/i});

        expect(inputName).toBeInTheDocument();
        expect(inputEmail).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    
    });

})