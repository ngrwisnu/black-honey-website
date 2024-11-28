import { render, screen } from "@testing-library/react";
import ContentWrapper from "../content-wrapper";

describe("Content wrapper component", () => {
  it("should render the component correctly without any props", () => {
    const el = <div data-testid="child-el"></div>;

    render(<ContentWrapper>{el}</ContentWrapper>);

    expect(screen.getByTestId("child-el")).toBeInTheDocument();
  });

  it("should render the component correctly with props", () => {
    const el = <div data-testid="child-el"></div>;

    const { container } = render(
      <ContentWrapper aria-label="content-wrapper" className="text-white">
        {el}
      </ContentWrapper>,
    );

    expect(container.firstChild).toHaveClass("text-white");
    expect(container.firstChild).toHaveAttribute(
      "aria-label",
      "content-wrapper",
    );
  });
});
