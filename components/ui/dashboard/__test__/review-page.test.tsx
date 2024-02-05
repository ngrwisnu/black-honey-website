import { render, screen } from "@testing-library/react";
import ReviewPage from "../review-page";

const dataRes = {
  isError: false,
  data: {
    data: [],
  },
};

jest.mock("react-query", () => ({
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock("../../../../hooks/usePostReview.ts", () => ({
  usePostReview: jest.fn(),
}));

describe("Review page", () => {
  it("should render review comp.", async () => {
    render(<ReviewPage review={dataRes} />);

    const headingEl = screen.getByRole("heading", { name: "Review" });
    expect(headingEl).toBeDefined();
  });
});
