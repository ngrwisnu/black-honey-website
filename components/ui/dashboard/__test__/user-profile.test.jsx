import { render, screen } from "@testing-library/react";
import UserProfile from "../user-profile";

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

describe.skip("User profile", () => {
  it("should render user profile", async () => {
    render(<UserProfile addresses={emptyAddress} />);

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
  });

  it("should render user profile and address", async () => {
    render(<UserProfile addresses={address} />);

    const divEl = screen.getByTestId("addresses");

    expect(divEl).toBeInTheDocument();
  });
});
