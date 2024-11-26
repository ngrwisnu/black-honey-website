import { render, screen } from "@testing-library/react";
import Footer from "../footer";

describe("Footer", () => {
  it("should render footer component", async () => {
    render(<Footer />);

    const divElement = screen.getByRole("contentinfo");

    expect(divElement).toBeInTheDocument();
  });

  it("should render list items", async () => {
    render(<Footer />);

    const listItems = screen.getAllByRole("listitem");

    expect(listItems.length).toBe(3);
  });
});
