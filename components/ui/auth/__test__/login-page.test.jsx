import { screen, render } from "@testing-library/react";
import LoginPage from "../login-page";

describe.skip("Login page", () => {
  it("should render login page", async () => {
    render(<LoginPage />);

    const headingEl = screen.getByRole("heading");

    expect(headingEl).toBeInTheDocument();
  });
});
