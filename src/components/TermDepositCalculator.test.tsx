import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TermDepositCalculator } from "./TermDepositCalculator";

describe("TermDepositCalculator", () => {
  it("should render the calculator form with all fields", () => {
    render(<TermDepositCalculator />);

    // Check if the title is rendered
    expect(screen.getByText("Term Deposit Calculator")).toBeTruthy();

    // Check if all form fields are present
    expect(screen.getByLabelText("Deposit Amount ($)")).toBeTruthy();
    expect(screen.getByLabelText("Interest Rate (%)")).toBeTruthy();
    expect(screen.getByLabelText("Investment Term (Years)")).toBeTruthy();
    expect(
      screen.getByLabelText(
        "Interest Paid (per year, per month, per quarter, or at maturity)"
      )
    ).toBeTruthy();

    // Check if the calculate button is present
    expect(screen.getByRole("button", { name: "Calculate" })).toBeTruthy();
  });

  it("should display pre-calculated results on load", () => {
    render(<TermDepositCalculator />);

    // Check for the calculated results (based on initial values)
    // $10,000 at 1.1% for 3 years at maturity = $10,330 final balance, $330 interest
    const finalBalanceElements = screen.getAllByText("$10330");
    const interestElements = screen.getAllByText("$330");
    
    expect(finalBalanceElements.length).toBeGreaterThan(0);
    expect(interestElements.length).toBeGreaterThan(0);
  });
});
