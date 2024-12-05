import { render, screen } from "@testing-library/react";
import ContentHeader from "../content-header";

describe("Content header component", () => {
  it("should render the component correctly", () => {
    render(<ContentHeader title="A Title" />);

    expect(
      screen.getByRole("heading", {
        level: 5,
        name: /a title/i,
      }),
    ).toBeInTheDocument();
  });
});
