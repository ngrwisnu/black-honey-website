import { render, screen } from "@testing-library/react";
import ContentBody from "../content-body";

describe("Content body component", () => {
  it("should render the component correctly", () => {
    const el = <div data-testid="child-el"></div>;

    render(<ContentBody>{el}</ContentBody>);

    expect(screen.getByTestId("child-el")).toBeInTheDocument();
  });

  it("should be able to add new class property", () => {
    const el = <div data-testid="child-el"></div>;

    const { container } = render(
      <ContentBody className="text-white">{el}</ContentBody>,
    );

    expect(container.firstChild).toHaveClass("text-white");
  });
});
