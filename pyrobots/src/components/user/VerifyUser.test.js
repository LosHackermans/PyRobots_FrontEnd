import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import axios from "axios";
import VerifyUser from "./VerifyUser";

jest.mock('axios');
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
window.alert = jest.fn();

const mockRequests = () => {
  axios.post.mockImplementation(() => Promise.resolve({ status: 200, data: { detail: "User validated" } }));
}

beforeEach(async () => {
  mockRequests();
})

afterEach(() => {
  cleanup();
});

describe("Validate user tests", () => {
  it("Should show the text-box and the button", async () => {
    render(<VerifyUser />);

    expect(await screen.findByTestId("code_input")).toBeInTheDocument();
    expect(await screen.findByTestId("validate_button")).toBeInTheDocument();
  });

  it("Should ask for an input if code is not writen", async () => {
    render(<VerifyUser />);

    const codeInput = await screen.findByTestId("code_input");
    const validateButton = await screen.findByTestId("validate_button");

    fireEvent.click(validateButton);
    expect(codeInput).toBeInvalid();
    expect(axios.post).toBeCalledTimes(0);
    expect(await screen.findByText("A code is required")).toBeInTheDocument();
  });

  it("Should send a request with the code", async () => {
    render(<VerifyUser />);

    const codeInput = await screen.findByTestId("code_input");
    const validateButton = await screen.findByTestId("validate_button");

    fireEvent.change(codeInput, {target: {value: 'code'}});
    fireEvent.click(validateButton);
    
    expect(codeInput).toBeValid();
    expect(axios.post).toBeCalledTimes(1);
    expect(axios.post).toBeCalledWith(`${process.env.REACT_APP_BACKEND_URL}/validate_user`, {
      code: 'code'
    });
    expect(await window.alert).toBeCalledTimes(1);
    expect(window.alert).toBeCalledWith("User validated");
    expect(mockedUsedNavigate).toBeCalledTimes(1);
    expect(mockedUsedNavigate).toBeCalledWith("/login");
  });
});