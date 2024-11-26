import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../header";
import { useUserProfile } from "@/hooks/useUserProfile";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));
jest.mock("../../hooks/useUserProfile", () => ({
  __esModule: true,
  useUserProfile: jest.fn(),
}));

describe("Header", () => {
  it("should render with logo in the center", async () => {
    render(<Header logoCenter />);

    const headerElement = document.querySelector("header");
    const logoElement = screen.getByTestId("logo");

    expect(headerElement).toBeInTheDocument();
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveClass("justify-center");
  });

  it("should render cart icon", async () => {
    render(<Header />);

    const cartIcon = document.getElementsByClassName("cart-logo");

    expect(cartIcon[0]).toBeVisible();
  });

  it("should redirect user to login page when clicked avatar logo if not login yet", async () => {
    const mockPush = jest.fn();
    jest.spyOn(require("next/navigation"), "useRouter").mockReturnValue({
      push: mockPush,
    });

    // @ts-ignore
    useUserProfile.mockReturnValue(null);

    render(<Header />);

    const avatar = document.getElementById("user-avatar") as Element;

    fireEvent.click(avatar);
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("should toggle menu dropdown if already logged-in", async () => {
    // @ts-ignore
    useUserProfile.mockReturnValue({ id: "1", username: "user", avatar: null });

    render(<Header />);

    const avatar = document.getElementById("user-avatar") as Element;

    fireEvent.click(avatar);
    const listItems = screen.getByLabelText("dropdown");
    expect(listItems).toBeInTheDocument();

    fireEvent.click(avatar);
    expect(listItems).not.toBeInTheDocument();
  });

  it("should trigger logoutHandler when logout button is clicked", async () => {
    const mockPush = jest.fn();
    jest.spyOn(require("next/navigation"), "useRouter").mockReturnValue({
      push: mockPush,
    });

    // @ts-ignore
    useUserProfile.mockReturnValue({ id: "1", username: "user", avatar: null });

    render(<Header />);

    const avatar = document.getElementById("user-avatar") as Element;

    fireEvent.click(avatar);

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("should trigger cartHandler when cart icon is clicked", async () => {
    const mockPush = jest.fn();
    jest.spyOn(require("next/navigation"), "useRouter").mockReturnValue({
      push: mockPush,
    });

    // @ts-ignore
    useUserProfile.mockReturnValue({ id: "1", username: "user", avatar: null });

    render(<Header />);

    const cartButton = screen.getByLabelText("cart-button");

    fireEvent.click(cartButton);

    expect(mockPush).toHaveBeenCalledWith("/cart/summary");
  });
});
