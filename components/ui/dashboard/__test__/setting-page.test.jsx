import { fireEvent, render, screen } from "@testing-library/react";
import DeleteAccount from "../delete-account";

describe("Delete account component", () => {
  it("should render delete account component", async () => {
    render(<DeleteAccount />);

    const headingElement = screen.getByText("Delete this account");
    expect(headingElement).toBeInTheDocument();
  });

  it("should render modal component", async () => {
    render(<DeleteAccount />);

    const buttonElement = screen.getByRole("button", {
      name: /delete account/i,
    });
    fireEvent.click(buttonElement);

    const headingElement = screen.getByRole("dialog");

    expect(headingElement).toBeInTheDocument();
  });
});
