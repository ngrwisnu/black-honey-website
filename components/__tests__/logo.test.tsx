import { render, screen } from "@testing-library/react";
import Logo from "../logo";

describe("Logo", () => {
  it("should render logo component without provide any props", async () => {
    render(<Logo />);

    const linkElement = screen.getByRole("link");

    expect(linkElement).toBeInTheDocument();
  });

  it("should have justify-center class when isCenter props is true", async () => {
    render(<Logo isCenter />);

    const divElement = screen.getByTestId("logo");

    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass("justify-center");
    expect(divElement).not.toHaveClass("justify-start");
  });

  it("should set text color to white when variant is set to light", async () => {
    render(<Logo variant="light" />);

    const linkElement = screen.getByRole("link");

    expect(linkElement).toHaveClass("text-white");
  });
});
