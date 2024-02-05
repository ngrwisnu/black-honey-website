import { Suspense } from "react";
import HomePage from "../page";
import Loading from "../loading";
import { fireEvent, render } from "@testing-library/react";

describe.skip("Homepage", () => {
  it("should render the homepage comp.", async () => {
    const page = render(
      <Suspense fallback={<Loading />}>
        <HomePage />
      </Suspense>,
    );

    expect(page).toMatchSnapshot();
  });

  it("should open product modal", async () => {
    render(<HomePage />);

    const buttonEl = screen.getByRole("button", { name: /buy now/i });
    fireEvent.click(buttonEl);

    const modalEl = screen.getByRole("heading", { level: 3 });
    expect(modalEl).toBeDefine();
  });
});
