import { describe, it, expect } from "vitest";
import {
  convertInterestPaid,
  convertInterestRateToPercentage,
  roundToTwoDecimalPlaces,
  calculateFinalBalance,
  calculateTermDeposit,
} from "./TermDeposit";
import { InterestPaid, type TermDepositFormSchema } from "../shared";

describe("Calculators", () => {
  describe("TermDeposit business logic", () => {
    /**
     * Testing the convertInterestRateToPercentage function.
     */
    describe("should convert interest rate to percentage", () => {
      const testCases = [
        { input: 12, expected: 0.12 },
        { input: 100, expected: 1.0 },
        { input: 5.5, expected: 0.055 },
        { input: 0, expected: 0 },
      ];

      for (const { input, expected } of testCases) {
        it(`should convert ${input} to ${expected}`, () => {
          const result = convertInterestRateToPercentage(input);
          expect(result).toBe(expected);
        });
      }
    });

    /**
     * Testing the roundToTwoDecimalPlaces function.
     */
    describe("should round to two decimal places", () => {
      const testCases = [
        { input: 0.005, expected: 0.01 },
        { input: 0.123, expected: 0.12 },
        { input: 1.12345, expected: 1.12 },
        { input: 1000.999, expected: 1001.00 },
        { input: 0, expected: 0 },
      ];

      for (const { input, expected } of testCases) {
        it(`should round ${input} to ${expected}`, () => {
          const result = roundToTwoDecimalPlaces(input);
          expect(result).toBe(expected);
        });
      }
    });

    /**
     * Testing the convertInterestPaid function.
     */
    describe("should convert interest paid", () => {
      const testCases = [
        { input: InterestPaid.MONTHLY, expected: 12 },
        { input: InterestPaid.QUARTERLY, expected: 4 },
        { input: InterestPaid.ANNUALLY, expected: 1 },
        { input: InterestPaid.AT_MATURITY, expected: 1 },
      ];

      for (const { input, expected } of testCases) {
        it(`should convert ${input} to ${expected}`, () => {
          const result = convertInterestPaid(input);
          expect(result).toBe(expected);
        });
      }

      it("should return 12 for invalid interest paid option", () => {
        const result = convertInterestPaid("INVALID" as InterestPaid);
        expect(result).toBe(12);
      });
    });

    /**
     * Testing the calculateFinalBalance function.
     */
    describe("should calculate final balance correctly", () => {
      const baseValues: TermDepositFormSchema = {
        depositAmount: 10000,
        interestRate: 5,
        investmentTerm: 1,
        interestPaid: InterestPaid.AT_MATURITY,
      };

      it("should calculate simple interest at maturity correctly", () => {
        const values = { ...baseValues, interestPaid: InterestPaid.AT_MATURITY };
        const result = calculateFinalBalance(values, 0.05, 1);
        // Simple interest: 10000 * (1 + 0.05 * 1) = 10500
        expect(result).toBe(10500);
      });

      it("should calculate compound interest annually correctly", () => {
        const values = { ...baseValues, interestPaid: InterestPaid.ANNUALLY };
        const result = calculateFinalBalance(values, 0.05, 1);
        // Compound interest: 10000 * (1 + 0.05/1)^(1*1) = 10500
        expect(result).toBe(10500);
      });

      it("should calculate compound interest quarterly correctly", () => {
        const values = { ...baseValues, interestPaid: InterestPaid.QUARTERLY };
        const result = calculateFinalBalance(values, 0.05, 4);
        // Compound interest: 10000 * (1 + 0.05/4)^(1*4) = 10000 * (1.0125)^4 ≈ 10509.45
        expect(result).toBe(10509.45);
      });

      it("should calculate compound interest monthly correctly", () => {
        const values = { ...baseValues, interestPaid: InterestPaid.MONTHLY };
        const result = calculateFinalBalance(values, 0.05, 12);
        // Compound interest: 10000 * (1 + 0.05/12)^(1*12) ≈ 10511.62
        expect(result).toBe(10511.62);
      });

      it("should handle multi-year investments", () => {
        const values = { ...baseValues, investmentTerm: 3, interestPaid: InterestPaid.ANNUALLY };
        const result = calculateFinalBalance(values, 0.05, 1);
        // Compound interest: 10000 * (1 + 0.05)^3 = 11576.25
        expect(result).toBe(11576.25);
      });
    });

    /**
     * Testing the calculateTermDeposit function.
     */
    describe("should calculate term deposit with complete results", () => {
      it("should return final balance and total interest earned", () => {
        const values: TermDepositFormSchema = {
          depositAmount: 10000,
          interestRate: 5,
          investmentTerm: 1,
          interestPaid: InterestPaid.AT_MATURITY,
        };

        const result = calculateTermDeposit(values);
        
        expect(result).toHaveProperty("finalBalance");
        expect(result).toHaveProperty("totalInterestEarned");
        expect(result.finalBalance).toBe(10500);
        expect(result.totalInterestEarned).toBe(500);
      });

      it("should calculate compound interest results correctly", () => {
        const values: TermDepositFormSchema = {
          depositAmount: 10000,
          interestRate: 5,
          investmentTerm: 1,
          interestPaid: InterestPaid.MONTHLY,
        };

        const result = calculateTermDeposit(values);
        
        expect(result.finalBalance).toBe(10511.62);
        expect(result.totalInterestEarned).toBe(511.62);
      });

      it("should handle zero interest rate", () => {
        const values: TermDepositFormSchema = {
          depositAmount: 10000,
          interestRate: 0,
          investmentTerm: 1,
          interestPaid: InterestPaid.AT_MATURITY,
        };

        const result = calculateTermDeposit(values);
        
        expect(result.finalBalance).toBe(10000);
        expect(result.totalInterestEarned).toBe(0);
      });
    });
  });
});
