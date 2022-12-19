import {render, screen} from "@testing-library/react";
import SigninButton from "../components/SigninButton";
import "@testing-library/jest-dom";

describe("Button", () => {
  it("checks if there is a button", () => {
    render(<SigninButton />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });
});
