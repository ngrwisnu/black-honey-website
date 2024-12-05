import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ReviewPage from "../review-page";
import { usePostReview } from "@/hooks/usePostReview";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("../../../../hooks/useToken", () => ({
  useToken: jest.fn(() => "dummytoken"),
}));

jest.mock("../../../../hooks/usePostReview");

describe("Review page", () => {
  const mockMutate = jest.fn();
  const mockRefresh = jest.fn();

  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  beforeEach(() => {
    const mockUseRouter = useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      refresh: mockRefresh,
    });
    const mockUsePostReview = usePostReview as jest.Mock;
    mockUsePostReview.mockReturnValue({
      mutate: mockMutate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form when the user hasn't written any review", async () => {
    const dataRes = {
      isError: false,
      data: {
        data: [],
      },
    };

    await act(() => {
      render(<ReviewPage review={dataRes} />);
    });

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Review" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Ratings")).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /submit/i }),
      ).toBeInTheDocument();
    });
  });

  it("should not show the form if already submit a review", async () => {
    const dataRes = {
      isError: false,
      data: {
        data: [{ id: "1", review: "any review" }],
      },
    };

    render(<ReviewPage review={dataRes} />);

    expect(screen.getByText("Thank you for the review!")).toBeInTheDocument();
  });

  it("should show error message", async () => {
    const dataRes = {
      isError: true,
      data: {
        data: undefined,
      },
    };

    render(<ReviewPage review={dataRes} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Something went wrong!",
      }),
    ).toBeInTheDocument();
  });

  it("should submit the review form with correct data", async () => {
    render(<ReviewPage review={{ isError: false, data: { data: [] } }} />);

    const textarea = screen.getByPlaceholderText(
      /We'd love to hear your thoughts/i,
    );
    fireEvent.change(textarea, { target: { value: "Great product!" } });

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        data: { rating: 5, message: "Great product!" },
        token: "dummytoken",
      });
    });

    expect(Swal.fire).toHaveBeenCalledWith({
      title: "Thank you for your Review",
      icon: "success",
    });

    expect(mockRefresh).toHaveBeenCalled();
  });
});
