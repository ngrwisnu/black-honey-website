import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import PasswordModal from "../password-modal";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import Swal from "sweetalert2";

jest.mock("../../../../hooks/useUpdateProfile", () => ({
  useUpdateProfile: jest.fn(),
}));

jest.mock("../../../../hooks/useToken", () => ({
  useToken: jest.fn(() => "dummytoken"),
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

describe.skip("Password modal", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    const useModal = require("../../../../store/modal-slice").default;

    useModal.mockReturnValue({
      isOpen: true,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    });

    const mockUseUpdateProfile = useUpdateProfile as jest.Mock;
    mockUseUpdateProfile.mockReturnValue({
      mutate: mockMutate,
    });
  });

  afterEach(() => {
    // jest.clearAllMocks();
    // jest.resetModules();
    // cleanup();
  });

  it("should render the component correctly", () => {
    render(<PasswordModal />);

    expect(
      screen.getByRole("heading", { level: 3, name: /update password/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("password-field")).toBeInTheDocument();
    expect(screen.getByLabelText("confirm-password-field")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it.only("should reject if password confirmation does not match", async () => {
    render(<PasswordModal />);

    const passwordField = screen.getByLabelText("password-field");
    const confirmPasswordField = screen.getByLabelText(
      "confirm-password-field",
    );

    fireEvent.change(passwordField, { target: { value: "newpassword" } });
    fireEvent.change(confirmPasswordField, {
      target: { value: "wrongpassword" },
    });

    expect(passwordField).toHaveValue("newpassword");
    expect(confirmPasswordField).toHaveValue("wrongpassword");

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    // await waitFor(() => {
    // });
    expect(
      await screen.findByText(/password does not match/i),
    ).toBeInTheDocument();

    expect(mockMutate).not.toHaveBeenCalledTimes(1);
  });

  it("should be able to call mutate function", async () => {
    mockMutate.mockImplementation((data, { onSuccess }) => {
      console.log("DATA >> ", data);

      onSuccess({
        isError: false,
        data: { data: "any" },
      });
    });

    render(<PasswordModal />);

    expect(screen.getByLabelText("password-field")).toBeInTheDocument();
    expect(screen.getByLabelText("confirm-password-field")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();

    const passwordField = screen.getByLabelText("password-field");
    const confirmPasswordField = screen.getByLabelText(
      "confirm-password-field",
    );
    console.log("ON CHANGE");

    fireEvent.change(passwordField, { target: { value: "newpass" } });
    fireEvent.change(confirmPasswordField, { target: { value: "newpass" } });

    console.log("ON CLICK");

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    waitFor(() => {});
    console.log("MUTATE");
    expect(mockMutate).toHaveBeenCalledWith(
      {
        data: {
          password: "newpass",
        },
        token: "dummytoken",
      },
      expect.any(Object),
    );
    expect(mockMutate).toHaveBeenCalledTimes(1);
    console.log("END");
  });
});
