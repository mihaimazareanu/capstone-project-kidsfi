import {render, screen} from "@testing-library/react";
import Navbar from "../components/Layout";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("checks background color of the nav element", () => {
    render(<Navbar />);

    const navbar = screen.getByRole("nav", {
      style: {backgroundColor: "#5E8C49"},
    });

    expect(navbar).toBeInTheDocument();
  });
});
