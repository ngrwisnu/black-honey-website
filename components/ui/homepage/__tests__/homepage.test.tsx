import { fireEvent, render, screen } from "@testing-library/react";
import Jumbotron from "../jumbotron";
import Product from "../product";
import Benefits from "../benefits";
import Recipe from "../recipe";

jest.mock("../../../../store/modal-slice", () => {
  const originalModule = jest.requireActual("zustand").create;
  return {
    __esModule: true,
    default: jest.fn(() =>
      originalModule(() => ({
        isOpen: false,
        onOpen: jest.fn(),
        onClose: jest.fn(),
      })),
    ),
  };
});

describe("Homepage Components", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Jumbotron section", () => {
    it("should render h1 element", () => {
      render(<Jumbotron />);

      expect(
        screen.getByRole("heading", {
          level: 1,
        }),
      ).toBeInTheDocument();
    });
  });

  describe("Products section", () => {
    it("should render h3 element", () => {
      render(<Product />);

      expect(
        screen.getByRole("heading", {
          level: 3,
        }),
      ).toBeInTheDocument();
    });

    it("should render 'buy now' button", () => {
      render(<Product />);

      expect(
        screen.getByRole("button", {
          name: /buy now/i,
        }),
      ).toBeInTheDocument();
    });

    it("should trigger modal handler to open the modal", () => {
      const useModal = require("../../../../store/modal-slice").default;
      const mockOnOpen = jest.fn();

      useModal.mockReturnValue({
        isOpen: false,
        onOpen: mockOnOpen,
        onClose: jest.fn(),
      });

      render(<Product />);

      const buyButton = screen.getByRole("button", {
        name: /buy now/i,
      });

      fireEvent.click(buyButton);

      expect(mockOnOpen).toHaveBeenCalledTimes(1);
    });

    it("should render the product image/thumbnail", () => {
      render(<Product />);

      expect(screen.getByAltText("Product")).toBeInTheDocument();
    });
  });

  describe("Benefits section", () => {
    it("should show all the benefits (3)", () => {
      render(<Benefits />);

      const benefits = screen.queryAllByLabelText("benefit-row");
      const hasHeading = benefits.every(
        (benefit) => benefit.querySelector("h3") !== null,
      );
      const hasImage = benefits.every(
        (benefit) => benefit.querySelector("img") !== null,
      );

      expect(benefits.length).toBe(2);
      expect(hasHeading).toBeTruthy();
      expect(hasImage).toBeTruthy();
    });
  });

  describe("Recipe section", () => {
    it("should render h3 element", () => {
      render(<Recipe />);

      expect(
        screen.getByRole("heading", {
          level: 3,
          name: /elevate your recipe/i,
        }),
      ).toBeInTheDocument();
    });

    it("should render 'See Products' button", () => {
      render(<Recipe />);

      expect(
        screen.getByRole("button", {
          name: /see products/i,
        }),
      ).toBeInTheDocument();
    });

    it("should trigger modal handler to open the modal", () => {
      const useModal = require("../../../../store/modal-slice").default;
      const mockOnOpen = jest.fn();

      useModal.mockReturnValue({
        isOpen: false,
        onOpen: mockOnOpen,
        onClose: jest.fn(),
      });

      render(<Recipe />);

      const seeProductsButton = screen.getByRole("button", {
        name: /see products/i,
      });

      fireEvent.click(seeProductsButton);

      expect(mockOnOpen).toHaveBeenCalledTimes(1);
    });

    it("should show some images", () => {
      render(<Recipe />);

      const images = screen.queryAllByAltText(/\w+/i);

      expect(images.length).toBeGreaterThan(0);
    });
  });
});
