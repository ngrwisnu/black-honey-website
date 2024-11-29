import { fireEvent, render, screen } from "@testing-library/react";
import SideNav from "../side-nav";
import { useGetPathname } from "@/hooks/useGetPathname";

jest.mock("../../../../hooks/useGetPathname", () => ({
  useGetPathname: jest.fn().mockReturnValue(""),
}));

describe("Navigation in Dashboard", () => {
  it("should render the component correctly", () => {
    render(<SideNav />);

    expect(screen.queryAllByRole("link").length).toBeGreaterThan(1);
  });

  it("should trigger the hamburger menu", () => {
    render(<SideNav />);

    const hamburgerMenu = screen.getByLabelText("hamburger-menu");
    const navWrapper = screen.getByLabelText("nav-wrapper");

    expect(navWrapper).toHaveClass("-left-full");
    expect(navWrapper).not.toHaveClass("-left-0");

    fireEvent.click(hamburgerMenu);

    expect(navWrapper).toHaveClass("-left-0");
    expect(navWrapper).not.toHaveClass("-left-full");
  });

  it("should close the side-nav after click the menu list", () => {
    render(<SideNav />);

    const hamburgerMenu = screen.getByLabelText("hamburger-menu");
    const navWrapper = screen.getByLabelText("nav-wrapper");
    const menuLink = screen.getAllByRole("link")[0];

    // open the nav
    fireEvent.click(hamburgerMenu);

    expect(navWrapper).toHaveClass("-left-0");
    expect(navWrapper).not.toHaveClass("-left-full");

    // close the nav
    fireEvent.click(menuLink);

    expect(navWrapper).toHaveClass("-left-full");
    expect(navWrapper).not.toHaveClass("-left-0");
  });

  it("should be able to show the active nav menu", () => {
    const mockUseGetPathname = useGetPathname as jest.Mock;
    mockUseGetPathname.mockReturnValueOnce("review");

    render(<SideNav />);

    const reviewMenu = screen.getByRole("link", { name: /review/i });

    expect(reviewMenu).toHaveClass("bg-gray-200");
    expect(reviewMenu).toHaveClass("sm:shadow-none");
  });
});
