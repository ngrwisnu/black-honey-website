import { useUserProfile } from "@/hooks/useUserProfile";
import { fireEvent, render, screen } from "@testing-library/react";
import CartComp from "../cart-comp";
import * as utils from "@/lib/utils";

jest.mock("../order-summary", () =>
  jest.fn(() => (
    <div>
      <h3>Order Summary</h3>
    </div>
  )),
);

jest.mock("@/lib/utils");

jest.mock("@/store/cart", () => {
  const originalModule = jest.requireActual("zustand").create;
  return {
    __esModule: true,
    default: jest.fn(() =>
      originalModule(() => ({
        items: [],
        addItem: jest.fn(),
        removeItem: jest.fn(),
        removeAllItem: jest.fn(),
      })),
    ),
  };
});

jest.mock("@/hooks/useUserProfile", () => ({
  useUserProfile: jest.fn().mockReturnValue({
    id: "1",
    username: "user",
    email: "user@email.com",
    role: "USER",
  }),
}));

describe("Cart page component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should render correctly with empty cart", () => {
    jest.spyOn(utils, "findUserCart").mockImplementation(() => {
      return [];
    });

    render(<CartComp />);

    expect(
      screen.getByRole("heading", { level: 3, name: /product summary/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /order summary/i }),
    ).toBeInTheDocument();
    expect(screen.queryAllByLabelText("order-item").length).toBe(0);
    expect(utils.findUserCart).toHaveBeenCalledTimes(1);
  });

  it("should render correctly with an item in the cart", () => {
    const orders = [
      {
        uid: "user-1",
        qty: 1,
        product: {
          id: "p1",
          name: "product1",
          size: 200,
          stock: 10,
          price: 30000,
          status: "in_stock",
          thumbnail: "/image.jpeg",
        },
      },
    ];

    jest.spyOn(utils, "findUserCart").mockImplementation(() => {
      return orders;
    });

    render(<CartComp />);

    expect(
      screen.getByRole("heading", { level: 3, name: /product summary/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /order summary/i }),
    ).toBeInTheDocument();
    expect(screen.queryAllByLabelText("order-item").length).toBe(1);
    expect(screen.getByAltText("thumbnail")).toBeInTheDocument();
    expect(screen.getByText("product1")).toBeInTheDocument();
    expect(screen.getByLabelText("remove-item")).toBeInTheDocument();
    expect(utils.findUserCart).toHaveBeenCalledTimes(1);
  });

  it("should trigger remove item button", () => {
    const useCart = require("@/store/cart").default;
    const mockRemoveItem = jest.fn();

    useCart.mockReturnValue({
      items: [],
      addItem: jest.fn(),
      removeItem: mockRemoveItem,
      removeAllItem: jest.fn(),
    });

    const orders = [
      {
        uid: "user-1",
        qty: 1,
        product: {
          id: "p1",
          name: "product1",
          size: 200,
          stock: 10,
          price: 30000,
          status: "in_stock",
          thumbnail: "/image.jpeg",
        },
      },
    ];

    jest.spyOn(utils, "findUserCart").mockImplementation(() => {
      return orders;
    });

    render(<CartComp />);

    const removeButton = screen.getByLabelText("remove-item");

    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);

    expect(mockRemoveItem).toHaveBeenCalledTimes(1);
  });
});
