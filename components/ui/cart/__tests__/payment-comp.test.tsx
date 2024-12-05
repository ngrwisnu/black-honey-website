import { act, render, screen } from "@testing-library/react";
import PaymentComp from "../payment-comp";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import useCheckout from "@/store/checkout";

jest.mock("@/store/cart", () => {
  const actual = jest.requireActual("zustand");
  return {
    __esModule: true,
    default: actual.create(() => ({
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
      removeAllItem: jest.fn(),
    })),
  };
});

jest.mock("@/store/checkout", () => {
  const actual = jest.requireActual("zustand");
  return {
    __esModule: true,
    default: actual.create(() => ({
      items: [],
      addItem: jest.fn(),
      clearItems: jest.fn(),
    })),
  };
});

jest.mock("@/hooks/useToken", () => ({
  useToken: jest.fn(() => "dummytoken"),
}));

jest.mock("@/hooks/useCreateOrder", () => ({
  useCreateOrder: jest.fn(),
}));

describe("Payment component", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    const mockUseCreateOrder = useCreateOrder as jest.Mock;
    mockUseCreateOrder.mockReturnValue({
      mutate: mockMutate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Empty cart", () => {
    it("should show link to homepage", () => {
      render(<PaymentComp />);

      expect(
        screen.getByRole("link", { name: /browse our products/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /browse our products/i }),
      ).toHaveAttribute("href", "/");
    });
  });

  describe("Filled cart", () => {
    const mockCheckout = [
      {
        address_id: "addr-1",
        payment_id: 11,
        qty: 1,
        product_id: "prd-1",
        product: {
          id: "p1",
          name: "product1",
          size: 100,
          stock: 10,
          price: 100,
          status: "in_stock",
          thumbnail: "/image.jpeg",
        },
      },
    ];

    it("should render component's elements properly", async () => {
      act(() => {
        useCheckout.setState({
          items: mockCheckout,
        });
      });

      act(() => {
        render(<PaymentComp />);
      });

      expect(screen.getByText(/purchase detail/i)).toBeInTheDocument();
      expect(
        screen.getByText(mockCheckout[0].product.name),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", {
          name: /pay-button/i,
        }),
      ).toBeInTheDocument();
    });
  });
});
