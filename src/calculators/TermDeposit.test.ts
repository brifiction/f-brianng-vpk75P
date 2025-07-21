import { describe, it, expect } from "vitest";
import {
  convertInterestPaid,
  convertInterestRateToPercentage,
  roundToTwoDecimalPlaces,
} from "./TermDeposit";
import { InterestPaid } from "../shared";

describe("Calculators", () => {
  describe("TermDeposit business logic", () => {
    /**
     * Testing the convertInterestRateToPercentage function.
     */
    describe("should convert interest rate to percentage", () => {
      const testCases = [
        { input: 12, expected: 0.12 },
        { input: 100, expected: 1.0 },
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
    });
  });
});
