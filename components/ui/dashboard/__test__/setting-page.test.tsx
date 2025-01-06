import { render, screen } from "@testing-library/react";
import SettingPage from "../setting-page";

jest.mock("../user-profile", () =>
  jest.fn(() => (
    <div>
      <h1>User Profile</h1>
    </div>
  )),
);

jest.mock("../delete-account.tsx", () =>
  jest.fn(() => <button>delete account</button>),
);

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

describe("Setting page", () => {
  it("should render the components correctly", async () => {
    render(<SettingPage addresses={address} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "User Profile",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "delete account",
      }),
    ).toBeInTheDocument();
  });
});
