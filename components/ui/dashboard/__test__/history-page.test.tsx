import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import HistoryPage from "../history-page";
import { toast } from "../../use-toast";

jest.mock("../error", () => jest.fn(() => <h1>Something went wrong</h1>));

jest.mock("../../use-toast.ts", () => ({
  toast: jest.fn(),
}));

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe("History page", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  const mockDate = jest.spyOn(Date, "now").mockReturnValue(100);

  const orders = [
    {
      id: 1,
      qty: 1,
      total_price: 100,
      status: "pending",
      payment_status: "settlement",
      receipt_number: null,
      createdAt: mockDate,
      product: {
        id: "p-1",
        name: "product",
        size: 200,
        stock: 1,
        price: 100,
        status: "in-stock",
        thumbnail: "/image",
      },
    },
  ];

  const orderWithReceiptNumber = [
    {
      ...orders[0],
      receipt_number: "abc123",
    },
  ];

  it("should show error message when orders prop is undefined", () => {
    render(<HistoryPage orders={undefined} />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("should show a message when order history is empty", () => {
    render(
      <HistoryPage
        orders={{ isError: false, data: { data: { result: [] } } }}
      />,
    );

    expect(
      screen.getByRole("heading", {
        level: 4,
        name: /your purchase history is empty/i,
      }),
    ).toBeInTheDocument();
  });

  it("should render the component correctly", () => {
    render(
      <HistoryPage
        orders={{ isError: false, data: { data: { result: orders } } }}
      />,
    );

    const orderHistory = screen.getAllByLabelText(/order-card/i);

    expect(orderHistory.length).toBe(1);
  });

  it("should render order's card and contains order details", () => {
    render(
      <HistoryPage
        orders={{ isError: false, data: { data: { result: orders } } }}
      />,
    );

    expect(screen.getByText("pending")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 6 })).toBeInTheDocument();
    expect(screen.getByAltText("Thumbnail")).toBeInTheDocument();
    expect(screen.getByText(/will be updated soon/i)).toBeInTheDocument();
  });

  it("should be able to copy the receipt number", async () => {
    await act(() => {
      render(
        <HistoryPage
          orders={{
            isError: false,
            data: { data: { result: orderWithReceiptNumber } },
          }}
        />,
      );
    });

    await waitFor(() => {
      expect(screen.getByText("abc123")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("abc123"));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("abc123");

    expect(toast).toHaveBeenCalledWith({
      title: "Success copy to clipboard",
      variant: "success",
    });
  });
});
