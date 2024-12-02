import { render, screen } from "@testing-library/react";
import { SummaryItem, SummaryList, SummaryTitle } from "../summary-item";

describe("Summary Item Component", () => {
  describe("Title component", () => {
    it("should render summary title correctly", () => {
      render(<SummaryTitle>This test</SummaryTitle>);

      expect(
        screen.getByRole("heading", {
          level: 4,
          name: /this test/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe("List component", () => {
    it("should render the component correctly without new classname", () => {
      render(
        <SummaryList>
          <h6>List name</h6>
        </SummaryList>,
      );

      expect(
        screen.getByRole("heading", { level: 6, name: /list name/i }),
      ).toBeInTheDocument();
    });

    it("should render the component correctly with new classname", () => {
      const { container } = render(
        <SummaryList classname="text-white">
          <div>list name</div>
        </SummaryList>,
      );

      expect(container).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("text-white");
      expect(screen.getByText(/list name/i)).toBeInTheDocument();
    });
  });

  describe("Item component", () => {
    it("should render the component correctly", () => {
      render(
        <SummaryItem>
          <SummaryTitle>Item name</SummaryTitle>
        </SummaryItem>,
      );

      expect(
        screen.getByRole("heading", {
          level: 4,
          name: /Item name/i,
        }),
      ).toBeInTheDocument();
    });
  });
});
