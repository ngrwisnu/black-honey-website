import { screen, render, fireEvent } from "@testing-library/react";
import FormContainer from "../form-container";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Form Container", () => {
  beforeEach(() => {
    // @ts-ignore
    jest.spyOn(window, "open").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original implementation
  });

  it("should render the component correctly", async () => {
    const mockedUsePathname = usePathname as jest.Mock;
    mockedUsePathname.mockReturnValue("/login");

    const formContent = (
      <div>
        <button>Login now</button>
      </div>
    );

    render(
      <FormContainer
        title="Login"
        description="Login description"
        formContent={formContent}
        footerText="Haven't an account yet"
      />,
    );

    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    expect(screen.getByText("Login description")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Login now/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("Haven't an account yet")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Register here/ })).toHaveAttribute(
      "href",
      "/register",
    );
  });

  it("should trigger clickHandler for login with google button when the button is clicked", async () => {
    const formContent = (
      <div>
        <button>Login now</button>
      </div>
    );

    render(
      <FormContainer
        title="Login"
        description="Login description"
        formContent={formContent}
        footerText="Register here"
      />,
    );

    const googleButton = screen.getByAltText("Google");

    fireEvent.click(googleButton);

    expect(window.open).toHaveBeenCalledTimes(1);
  });
});
