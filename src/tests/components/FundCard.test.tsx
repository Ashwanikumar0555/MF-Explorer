import { render, screen } from "@testing-library/react";
import FundCard from "../../components/molecules/FundCard";

describe("FundCard Component", () => {
  const fund = {
    schemeCode: "101",
    schemeName: "ABC Equity Fund",
    fundHouse: "ABC Mutual",
    schemeType: "Equity",
    category: "Large Cap",
    isRegular: true,
  };

  it("renders fund name", () => {
    render(<FundCard fund={fund} />);
    expect(screen.getByText("ABC Equity Fund")).toBeInTheDocument();
  });

  it("renders fund house", () => {
    render(<FundCard fund={fund} />);
    expect(screen.getByText("ABC Mutual")).toBeInTheDocument();
  });
});
