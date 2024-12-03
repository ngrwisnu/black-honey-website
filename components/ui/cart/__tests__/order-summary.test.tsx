import { useGetCouponByCode } from "@/hooks/useCoupon";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import OrderSummary from "../order-summary";
import { useGetPathname } from "@/hooks/useGetPathname";
import { toast } from "../../use-toast";
import useCheckout from "@/store/checkout";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

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

jest.mock("../../use-toast", () => ({
  toast: jest.fn(),
}));

jest.mock("@/hooks/useCoupon", () => ({
  useGetCouponByCode: jest.fn(),
}));

jest.mock("@/hooks/useToken", () => ({
  useToken: jest.fn(() => "dummytoken"),
}));

jest.mock("@/hooks/useGetPathname", () => ({
  useGetPathname: jest.fn(() => "summary"),
}));

const mockData = [
  {
    uid: "user1",
    qty: 1,
    product: {
      id: "p1",
      name: "product1",
      size: 200,
      stock: 10,
      price: 30000,
      status: "in_stock",
      thumbnail: "/image1.jpeg",
    },
  },
  {
    uid: "user1",
    qty: 1,
    product: {
      id: "p2",
      name: "product2",
      size: 200,
      stock: 10,
      price: 10000,
      status: "in_stock",
      thumbnail: "/image2.jpeg",
    },
  },
];

const mockCheckoutDetail = {
  address_id: "",
};

const mockCheckoutDetailWithAddress = {
  address_id: "addr-1",
};

const mockValidCoupon = {
  id: "cp-1",
  name: "test",
  code: "COUPON123",
  discount_type: "percent",
  discount_amount: "50",
  expired: new Date().getTime(),
  status: "Active",
  image: null,
};

describe("OrderSummary", () => {
  const mockMutate = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();

    const mockUseGetCouponByCode = useGetCouponByCode as jest.Mock;
    mockUseGetCouponByCode.mockReturnValue({
      mutate: mockMutate,
    });

    const mockUseRouter = useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });
  });

  it("should render the ui correctly", () => {
    render(<OrderSummary data={mockData} />);

    expect(
      screen.getByRole("heading", {
        level: 4,
        name: /order summary/i,
      }),
    ).toBeInTheDocument();
    expect(screen.queryAllByText(/40.000/i).length).not.toBe(0);
    expect(
      screen.getByRole("button", {
        name: /checkout now/i,
      }),
    ).toBeInTheDocument();
  });

  it("should render the ui correctly for checkout page", () => {
    const mockUseGetPathname = useGetPathname as jest.Mock;
    mockUseGetPathname.mockReturnValueOnce("checkout");

    render(<OrderSummary data={mockData} />);

    expect(
      screen.getByRole("heading", {
        level: 4,
        name: /order summary/i,
      }),
    ).toBeInTheDocument();
    expect(screen.queryAllByText(/40.000/i).length).not.toBe(0);
    expect(screen.getByLabelText(/have any coupon?/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/coupon code/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /apply/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /payment detail/i,
      }),
    ).toBeInTheDocument();
  });

  it("should perform the checkout button on summary page well", async () => {
    render(<OrderSummary data={mockData} />);

    const checkoutButton = screen.getByRole("button", {
      name: /checkout now/i,
    });

    expect(checkoutButton).toBeInTheDocument();

    await act(() => {
      fireEvent.click(checkoutButton);
    });

    expect(mockPush).toHaveBeenCalledWith("/cart/checkout");
  });

  it("should perform the payment detail button on checkout page well with no address selected", async () => {
    const mockUseGetPathname = useGetPathname as jest.Mock;
    mockUseGetPathname.mockReturnValueOnce("checkout");

    render(
      <OrderSummary data={mockData} checkoutDetail={mockCheckoutDetail} />,
    );

    const paymentDetailButton = screen.getByRole("button", {
      name: /payment detail/i,
    });

    expect(paymentDetailButton).toBeInTheDocument();

    fireEvent.click(paymentDetailButton);

    expect(toast).toHaveBeenCalledWith({
      title: "Checkout detail is not complete!",
      variant: "destructive",
    });
  });

  it("should trigger push with '/cart/payment'", async () => {
    const mockUseGetPathname = useGetPathname as jest.Mock;
    mockUseGetPathname.mockReturnValueOnce("checkout");

    const { addItem } = useCheckout.getState();

    render(
      <OrderSummary
        data={mockData}
        checkoutDetail={mockCheckoutDetailWithAddress}
      />,
    );

    const paymentDetailButton = screen.getByRole("button", {
      name: /payment detail/i,
    });

    expect(paymentDetailButton).toBeInTheDocument();

    fireEvent.click(paymentDetailButton);

    expect(addItem).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/cart/payment");
  });

  it("should be able to add and remove coupon", async () => {
    const mockUseGetPathname = useGetPathname as jest.Mock;
    mockUseGetPathname.mockReturnValueOnce("checkout");

    mockMutate.mockImplementation((data, { onSuccess }) =>
      onSuccess({
        isError: false,
        data: {
          data: mockValidCoupon,
        },
      }),
    );

    const couponCode = "COUPON123";

    render(
      <OrderSummary
        data={mockData}
        checkoutDetail={mockCheckoutDetailWithAddress}
      />,
    );

    const inputCouponField = screen.getByPlaceholderText(/coupon code/i);
    const applyButton = screen.getByRole("button", { name: /apply/i });

    expect(inputCouponField).toBeInTheDocument();
    expect(applyButton).toBeInTheDocument();

    // perform onChange
    await act(() => {
      fireEvent.change(inputCouponField, { target: { value: couponCode } });
    });

    expect(inputCouponField).toHaveValue(couponCode);

    await act(() => {
      fireEvent.click(applyButton);
    });

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { code: couponCode, token: "dummytok" },
        expect.anything(),
      );
    });
  });
});
