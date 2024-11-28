import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DeleteAccount from "../delete-account";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

jest.mock("js-cookie", () => ({
  remove: jest.fn(),
}));

jest.mock("../../../../hooks/useDeleteAccount", () => ({
  useDeleteAccount: jest.fn(),
}));

jest.mock("../../../../hooks/useToken", () => ({
  useToken: jest.fn(() => "dummytoken"),
}));

describe("Delete account component", () => {
  const mockMutate = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    const mockUseDeleteAccount = useDeleteAccount as jest.Mock;
    const mockUseRouter = useRouter as jest.Mock;

    mockUseDeleteAccount.mockReturnValue({
      mutate: mockMutate,
    });

    mockUseRouter.mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component correctly", () => {
    render(<DeleteAccount />);

    expect(
      screen.getByRole("heading", { name: /Delete this account/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Delete account")).toBeInTheDocument();
  });

  it("should open SweetAlert dialog box when the button is clicked", async () => {
    const swalObject = {
      title: "Are you sure?",
      text: "This will delete all data permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#FFF",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: `<span class="text-black">Cancel</span>`,
    };

    render(<DeleteAccount />);

    fireEvent.click(screen.getByText(/delete account/i));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledTimes(1);
      expect(Swal.fire).toHaveBeenCalledWith(swalObject);
    });
  });

  it("should not call the mutate when SweetAlert is cancelled", async () => {
    // @ts-ignore
    Swal.fire.mockResolvedValueOnce({ isConfirmed: false });

    render(<DeleteAccount />);
    fireEvent.click(screen.getByText(/delete account/i));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalled();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("should call mutate on confirm", async () => {
    mockMutate.mockImplementation((token, { onSuccess }) => {
      onSuccess({ isError: false });
    });

    const swalObject = {
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    };

    render(<DeleteAccount />);
    fireEvent.click(screen.getByText(/delete account/i));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalled();
    });

    expect(mockMutate).toHaveBeenCalledWith("dummytoken", expect.any(Object));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(swalObject);
    });

    await waitFor(
      () => {
        expect(Cookies.remove).toHaveBeenCalledWith("tk");
      },
      { timeout: 2000 },
    );

    expect(mockPush).toHaveBeenCalledWith("/register");
  });

  it("should fail the mutation", async () => {
    mockMutate.mockImplementation((token, { onSuccess }) => {
      onSuccess({ isError: true, data: { message: "Deleting failed" } });
    });

    render(<DeleteAccount />);
    fireEvent.click(screen.getByText(/delete account/i));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith("dummytoken", expect.any(Object));
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Deleting failed",
      });
    });
  });
});
