import { screen, render } from "@testing-library/react";
import RegisterPage from "../register-page";

describe.skip("Login page", () => {
  it("should render register page", async () => {
    render(<RegisterPage />);

    const headingEl = screen.getByRole("heading");

    expect(headingEl).toBeInTheDocument();
  });
});
