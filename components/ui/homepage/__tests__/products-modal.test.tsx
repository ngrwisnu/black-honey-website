import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { useRouter } from "next/navigation";
import ProductsModal from "../products-modal";
import useCart from "@/store/cart";
import { useUserProfile } from "@/hooks/useUserProfile";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/useUserProfile", () => ({
  __esModule: true,
  useUserProfile: jest.fn(),
}));

jest.mock("@/store/modal-slice", () => {
  const actual = jest.requireActual("zustand");
  return {
    __esModule: true,
    default: actual.create(() => ({
      isOpen: true,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    })),
  };
});

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

const products = [
  {
    id: "pr-1",
    name: "product1",
    size: 100,
    stock: 12,
    price: 100,
    status: "InStock",
    thumbnail: "/pr1.jpeg",
  },
  {
    id: "pr-2",
    name: "product2",
    size: 200,
    stock: 0,
    price: 200,
    status: "InStock",
    thumbnail: "/pr2.jpeg",
  },
];

describe("ProductsModal", () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseUserProfile = useUserProfile as jest.Mock;

  const mockResponse = {
    isError: false,
    data: { data: products },
  };

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });

    mockUseUserProfile.mockReturnValue({
      id: "user1",
      username: "user",
      email: "user@email.com",
      role: "USER",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show error message when response set isError to true", async () => {
    act(() => {
      render(
        <ProductsModal products={{ isError: true, data: { data: [] } }} />,
      );
    });

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          level: 3,
          name: /oops!/i,
        }),
      ).toBeInTheDocument();
    });
  });

  it("should be able to show the content of the modal", async () => {
    act(() => {
      render(<ProductsModal products={mockResponse} />);
    });

    await waitFor(() => {
      expect(screen.getByAltText(/product's preview/i)).toBeInTheDocument();
      expect(screen.getByLabelText("Product's name")).toBeInTheDocument();
      expect(screen.queryAllByLabelText("product-list").length).toBe(
        products.length,
      );
      expect(
        screen.getByRole("button", {
          name: /add to cart/i,
        }),
      ).toBeInTheDocument();
    });
  });

  it("should be able to choose other products", async () => {
    act(() => {
      render(<ProductsModal products={mockResponse} />);
    });

    await waitFor(() => {
      expect(screen.getByAltText(/product's preview/i)).toBeInTheDocument();
      expect(screen.getByText("product1")).toBeInTheDocument();
    });

    const product2Button = document.getElementById("200") as Element;

    act(() => {
      fireEvent.click(product2Button);
    });

    await waitFor(() => {
      expect(screen.getByAltText(/product's preview/i)).toBeInTheDocument();
      expect(screen.getByText("product2")).toBeInTheDocument();
    });
  });

  it("should disable order's input field when the stock is 0", async () => {
    act(() => {
      render(<ProductsModal products={mockResponse} />);
    });

    await waitFor(() => {
      expect(screen.getByText("product1")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Quantity", {
          selector: "input",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Quantity", {
          selector: "input",
        }),
      ).toHaveProperty("disabled", false);
    });

    const product2Button = document.getElementById("200") as Element;

    act(() => {
      fireEvent.click(product2Button);
    });

    await waitFor(() => {
      expect(screen.getByText("product2")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Quantity", {
          selector: "input",
        }),
      ).toHaveProperty("disabled", true);
    });
  });

  it("should redirect user to the login page if haven't login when adding new order", async () => {
    mockUseUserProfile.mockReturnValue(undefined);

    act(() => {
      render(<ProductsModal products={mockResponse} />);
    });

    let addToCartButton: Element;

    await waitFor(() => {
      addToCartButton = screen.getByRole("button", {
        name: /add to cart/i,
      });

      expect(screen.getByText("product1")).toBeInTheDocument();
      expect(addToCartButton).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(addToCartButton);
    });

    const { addItem } = useCart.getState();

    expect(mockPush).toHaveBeenCalledWith("/login");
    expect(addItem).not.toHaveBeenCalled();
  });

  it("should be able to add order to cart", async () => {
    act(() => {
      render(<ProductsModal products={mockResponse} />);
    });

    await waitFor(() => {
      expect(screen.getByText("product1")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Quantity", {
          selector: "input",
        }),
      ).toBeInTheDocument();
    });

    const qtyField = screen.getByLabelText("Quantity", {
      selector: "input",
    });
    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });

    act(() => {
      fireEvent.change(qtyField, {
        target: {
          value: 2,
        },
      });
    });

    await waitFor(() => {
      expect(qtyField).toHaveValue(2);
    });

    act(() => {
      fireEvent.click(addToCartButton);
    });

    expect(mockPush).not.toHaveBeenCalled();
    await waitFor(() => {
      const { addItem } = useCart.getState();

      expect(addItem).toHaveBeenCalledWith({
        uid: "user1",
        qty: 2,
        product: {
          id: "pr-1",
          name: "product1",
          size: 100,
          stock: 12,
          price: 100,
          status: "InStock",
          thumbnail: "/pr1.jpeg",
        },
      });
    });
  });
});
