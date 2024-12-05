import { act, render, screen } from "@testing-library/react";
import UserProfile from "../user-profile";
import { useAddAddress } from "@/hooks/useAddAddress";
import { getUserProfile } from "@/lib/utils";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../hooks/useAddAddress");

jest.mock("../../../../hooks/useToken", () => ({
  useToken: jest.fn().mockReturnValue("dummytoken"),
}));

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

jest.mock("../../../../lib/utils.ts");

const emptyAddress = {
  isError: false,
  data: {
    data: [],
  },
};

const address = {
  isError: false,
  data: {
    data: [
      {
        id: "4",
        city: "LA",
        province: "LA",
        full_address: "LA",
        recipient_name: "John doe",
        phone: "0888558588",
      },
    ],
  },
};

describe("User profile", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    const mockUseAddAddress = useAddAddress as jest.Mock;
    mockUseAddAddress.mockReturnValue({
      mutate: mockMutate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render user profile with no address", async () => {
    await act(() => {
      render(<UserProfile addresses={emptyAddress} />);
    });

    const profileHeading = screen.getByRole("heading", {
      level: 5,
      name: "Profile",
    });
    const addressHeading = screen.getByRole("heading", {
      level: 5,
      name: "Address",
    });

    expect(profileHeading).toBeInTheDocument();
    expect(addressHeading).toBeInTheDocument();
    expect(screen.queryAllByRole("textbox").length).toBeGreaterThan(1);
    expect(
      screen.getByRole("button", { name: /save changed/i }),
    ).toBeInTheDocument();
  });

  it("should render user profile and address", async () => {
    const mockGetUserProfile = getUserProfile as jest.Mock;
    mockGetUserProfile.mockReturnValueOnce({
      username: "user-1",
      email: "user@email.com",
    });

    act(() => {
      render(<UserProfile addresses={address} />);
    });

    const divEl = screen.getByTestId("addresses");

    expect(divEl).toBeInTheDocument();
    expect(screen.getByText("user-1")).toBeInTheDocument();
    expect(screen.getByText("user@email.com")).toBeInTheDocument();
  });
});
