import { render, screen } from "@testing-library/react";
import Step from "../step";
import Stepper from "../stepper";

jest.mock("lucide-react", () => {
  const originalModule = jest.requireActual("lucide-react");
  return {
    ...originalModule,
    Check: jest.fn(() => <svg data-testid="lucide-check" />),
  };
});

describe("Step", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Disabled variant", () => {
    it("should render with correct style", () => {
      render(<Step label="1" variant="disabled" />);

      const path = screen.getByTestId("step-path");

      expect(screen.getByText("1")).toBeInTheDocument();
      expect(path.getAttribute("fill")?.trim()).toBe("#E5E7EB");
      expect(path.getAttribute("stroke")?.trim()).toBe("");
      expect(path.getAttribute("stroke-width")?.trim()).toBe("0");
    });
  });

  describe("Active variant", () => {
    it("should render with correct style", () => {
      render(<Step label="1" variant="active" />);

      const path = screen.getByTestId("step-path");

      expect(screen.getByText("1")).toBeInTheDocument();
      expect(path.getAttribute("fill")?.trim()).toBe("#FFF4EB");
      expect(path.getAttribute("stroke")?.trim()).toBe("#FB8B28");
      expect(path.getAttribute("stroke-width")?.trim()).toBe("4");
    });
  });

  describe("Done variant", () => {
    it("should render with correct style", () => {
      const { Check } = require("lucide-react");

      render(<Step label="1" variant="done" />);

      const path = screen.getByTestId("step-path");

      expect(screen.getByTestId("lucide-check")).toBeInTheDocument();
      expect(Check).toHaveBeenCalledTimes(1);
      expect(path.getAttribute("fill")?.trim()).toBe("#BEFED0");
      expect(path.getAttribute("stroke")?.trim()).toBe("#05E142");
      expect(path.getAttribute("stroke-width")?.trim()).toBe("4");
    });
  });
});

describe("Stepper", () => {
  it("should render the component properly", () => {
    render(<Stepper currentStep={0} />);

    expect(screen.queryAllByRole("listitem").length).toBe(3);
  });

  it("should show green horizontal line when current step is the second or above", () => {
    render(<Stepper currentStep={1} />);

    expect(screen.queryAllByTestId("horizontal-line").length).toBe(2);
    expect(screen.queryAllByTestId("horizontal-line")[0]).toHaveClass(
      "bg-[#05E142]",
    );
    expect(screen.queryAllByTestId("horizontal-line")[1]).toHaveClass(
      "bg-[#D9D9D9]",
    );
  });
});
