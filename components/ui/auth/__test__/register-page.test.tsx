import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import RegisterPage from "../register-page";
import { useRegister } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("../../../../hooks/useAuth", () => ({
  useRegister: jest.fn(),
}));

describe("Register Page", () => {
  const mockMutate = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    const mockUseRegister = useRegister as jest.Mock;
    mockUseRegister.mockReturnValue({
      mutate: mockMutate,
    });

    const mockUsePathname = usePathname as jest.Mock;
    mockUsePathname.mockReturnValue("/register");

    const mockUseRouter = useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render register page correctly", async () => {
    render(<RegisterPage />);

    const passwordField = document.querySelector("input[type='password']");

    expect(
      screen.getByRole("heading", { level: 3, name: /Create an account/ }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/fullname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i }),
    ).toBeInTheDocument();
  });

  it("should show error message when the password does not fulfil the requirements", async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/fullname/i), {
      target: {
        value: "Us",
      },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: {
        value: "example@email.com",
      },
    });
    fireEvent.change(
      document.querySelector("input[type='password']") as Element,
      {
        target: {
          value: "weakpass",
        },
      },
    );

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(screen.getAllByTestId(/error-message/i).length).toBeGreaterThan(1);
    });
  });

  it("should show error message when the back-end set isError to true in the response", async () => {
    mockMutate.mockImplementation((data, { onSuccess }) =>
      onSuccess({
        isError: true,
        data: { message: "User already exist!" },
      }),
    );

    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/fullname/i), {
      target: {
        value: "User",
      },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: {
        value: "example@email.com",
      },
    });
    fireEvent.change(
      document.querySelector("input[type='password']") as Element,
      {
        target: {
          value: "ThisisAstrongpass21",
        },
      },
    );

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/User already exist!/i)).toBeInTheDocument();
    });
  });

  it("should redirect the user to the login page if the registration is successfully", async () => {
    mockMutate.mockImplementation((data, { onSuccess }) =>
      onSuccess({
        isError: false,
        data: null,
      }),
    );

    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/fullname/i), {
      target: {
        value: "User",
      },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: {
        value: "example@email.com",
      },
    });
    fireEvent.change(
      document.querySelector("input[type='password']") as Element,
      {
        target: {
          value: "ThisisAstrongpass21",
        },
      },
    );

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("should trigger hide & show password icon", () => {
    render(<RegisterPage />);

    const passwordField = document.getElementById("password-field");
    const eyeIcon = screen.getByTestId("password-visibility");

    fireEvent.click(eyeIcon);
    expect(passwordField).toHaveAttribute("type", "text");

    fireEvent.click(eyeIcon);
    expect(passwordField).toHaveAttribute("type", "password");
  });
});
