import { render, screen } from "@testing-library/react";
import DashboardError from "../error";

describe("Dashboard Error Component", () => {
  it("should render the component correctly", () => {
    render(<DashboardError />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Something went wrong!/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Cannot retrieve data from the server"),
    ).toBeInTheDocument();
  });
});
