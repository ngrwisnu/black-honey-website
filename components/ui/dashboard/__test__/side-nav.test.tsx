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

  it("should be able to show the active nav menu", () => {
    const mockUseGetPathname = useGetPathname as jest.Mock;
    mockUseGetPathname.mockReturnValueOnce("review");

    render(<SideNav />);

    const reviewMenu = screen.getByRole("link", { name: /review/i });

    expect(reviewMenu).toHaveClass("bg-gray-200");
    expect(reviewMenu).toHaveClass("sm:shadow-none");
  });
});
