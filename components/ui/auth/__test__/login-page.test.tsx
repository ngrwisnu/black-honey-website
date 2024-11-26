import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../login-page";
import { useLogin } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

jest.mock("../../../../hooks/useAuth", () => ({
  useLogin: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

describe("Login page", () => {
  const mockMutate = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    const mockUseLogin = useLogin as jest.Mock;

    mockUseLogin.mockReturnValue({
      mutate: mockMutate,
    });

    const mockUseRouter = useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });

    const mockedUsePathname = usePathname as jest.Mock;
    mockedUsePathname.mockReturnValue("/login");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render login page correctly", async () => {
    render(<LoginPage />);

    expect(
      screen.getByRole("heading", { level: 3, name: /Welcome/ }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i }),
    ).toBeInTheDocument();
  });

  it("should show an error message when login data is invalid", async () => {
    mockMutate.mockImplementation((data, { onSuccess }) =>
      onSuccess({
        isError: true,
        data: { message: "Invalid login credentials" },
      }),
    );

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: {
        value: "example@email.com",
      },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: {
        value: "wrongpass",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/invalid login credentials/i),
      ).toBeInTheDocument();
    });
  });

  it("should save the cookie and redirect to / when login is successfully", async () => {
    mockMutate.mockImplementation((data, { onSuccess }) =>
      onSuccess({
        isError: false,
        data: { data: { token: "Thisisatoken" } },
      }),
    );

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: {
        value: "example@email.com",
      },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: {
        value: "Correctpass",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
