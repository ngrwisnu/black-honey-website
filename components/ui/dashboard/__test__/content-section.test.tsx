import { render, screen } from "@testing-library/react";
import ContentSection from "../content-section";

describe("Content section component", () => {
  it("should render the component correctly without any props", () => {
    const el = <div data-testid="child-el"></div>;

    render(<ContentSection>{el}</ContentSection>);

    expect(screen.getByTestId("child-el")).toBeInTheDocument();
  });

  it("should render the component correctly with props", () => {
    const el = <div data-testid="child-el"></div>;

    const { container } = render(
      <ContentSection aria-label="content-section" className="text-white">
        {el}
      </ContentSection>,
    );

    expect(container.firstChild).toHaveClass("text-white");
    expect(container.firstChild).toHaveAttribute(
      "aria-label",
      "content-section",
    );
  });
});
