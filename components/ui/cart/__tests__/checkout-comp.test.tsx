import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import CheckoutComp from "../checkout-comp";
import * as utils from "@/lib/utils";
import useCart from "@/store/cart";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../order-summary", () =>
  jest.fn(() => (
    <div>
      <h3>Order Summary</h3>
    </div>
  )),
);

jest.mock("@/lib/utils");

jest.mock("@/app/(cart)/cart/[subPage]/loading", () =>
  jest.fn(() => <div data-testid="loading"></div>),
);

jest.mock("@/hooks/useUserProfile", () => ({
  useUserProfile: jest.fn().mockReturnValue({
    id: "1",
    username: "user",
    email: "user@email.com",
    role: "USER",
  }),
}));

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

describe("Checkout component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should show loading when address prop is undefined", () => {
    const { items } = useCart.getState();

    jest.spyOn(utils, "findUserCart").mockImplementation(() => {
      return [];
    });

    render(<CheckoutComp addresses={undefined} />);

    expect(items.length).toBe(0);
    expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
  });

  it("should show link to homepage when the cart is empty", () => {
    const mockAddress = {
      id: "addr-1",
    };

    const { items } = useCart.getState();

    jest.spyOn(utils, "findUserCart").mockImplementation(() => {
      return [];
    });

    render(
      <CheckoutComp
        addresses={{ isError: false, data: { data: { result: mockAddress } } }}
      />,
    );

    expect(items.length).toBe(0);
    expect(
      screen.getByRole("link", { name: /browse our products/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /browse our products/i }),
    ).toHaveAttribute("href", "/");
  });

  it("should render component correctly with add new address button", () => {
    const mockPush = jest.fn();
    const mockUseRouter = useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });

    const mockOrders = [
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
          thumbnail: "/image.jpeg",
        },
      },
    ];

    act(() => {
      useCart.setState({
        items: mockOrders,
      });
    });

    const { items } = useCart.getState();

    jest.spyOn(utils, "findUserCart").mockImplementation(() => {
      return mockOrders;
    });

    render(<CheckoutComp addresses={{ isError: false, data: { data: [] } }} />);

    expect(items.length).toBe(1);
    expect(
      screen.getByRole("heading", { level: 3, name: /delivery address/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/add address/i)).toBeInTheDocument();

    // trigger click event to the add address button
    fireEvent.click(screen.getByLabelText(/add-address-button/i));

    waitFor(() => {
      expect(mockPush).toHaveBeenCalledTimes(1);
    });
  });

  it("should render component correctly with list of address", () => {
    const mockAddress = {
      id: "addr-1",
      city: "test",
      province: "test",
      full_address: "test address",
      recipient_name: "user1",
      phone: "0888800",
    };

    const mockOrders = [
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
          thumbnail: "/image.jpeg",
        },
      },
    ];

    act(() => {
      useCart.setState({
        items: mockOrders,
      });
    });

    const { items } = useCart.getState();

    jest.spyOn(utils, "findUserCart").mockImplementation(() => {
      return mockOrders;
    });

    render(
      <CheckoutComp
        addresses={{ isError: false, data: { data: [mockAddress] } }}
      />,
    );

    expect(items.length).toBe(1);
    expect(
      screen.getByRole("heading", { level: 3, name: /delivery address/i }),
    ).toBeInTheDocument();
    expect(document.querySelector("input[type='radio']")).toBeInTheDocument();
    expect(screen.getByText(/test address/i)).toBeInTheDocument();
    expect(screen.getByText(/user1/i)).toBeInTheDocument();
  });

  it("should be able to toggle the active address", async () => {
    const mockAddresses = [
      {
        id: "addr-1",
        city: "test",
        province: "test",
        full_address: "test address 1",
        recipient_name: "user1",
        phone: "0888800",
      },
      {
        id: "addr-2",
        city: "test",
        province: "test",
        full_address: "test address 2",
        recipient_name: "user1",
        phone: "0888800",
      },
    ];

    const mockOrders = [
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
          thumbnail: "/image.jpeg",
        },
      },
    ];

    act(() => {
      useCart.setState({
        items: mockOrders,
      });
    });

    const { items } = useCart.getState();

    jest.spyOn(utils, "findUserCart").mockImplementation(() => {
      return mockOrders;
    });

    await act(() => {
      render(
        <CheckoutComp
          addresses={{ isError: false, data: { data: mockAddresses } }}
        />,
      );
    });

    expect(items.length).toBe(1);
    expect(screen.queryAllByLabelText(/address-item/i).length).toBe(2);
    expect(screen.getByTestId("addr-1")).toHaveClass("border-gray-200");
    expect(screen.getByTestId("addr-2")).toHaveClass("border-gray-200");

    const firstAddressRadio = document.querySelector("input[value='addr-1']");
    const secondAddressRadio = document.querySelector("input[value='addr-2']");

    await act(() => {
      fireEvent.click(firstAddressRadio as Element);
    });

    expect(firstAddressRadio).toBeChecked();
    expect(secondAddressRadio).not.toBeChecked();

    await waitFor(() => {
      expect(screen.getByTestId("addr-1")).toHaveClass("border-green-600");
      expect(screen.getByTestId("addr-1")).not.toHaveClass("border-gray-200");
      expect(screen.getByTestId("addr-2")).toHaveClass("border-gray-200");
    });
  });
});
