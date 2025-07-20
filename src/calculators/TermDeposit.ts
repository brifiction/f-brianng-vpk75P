import { InterestPaid, type TermDepositFormSchema } from "../shared";

/**
 * Convert interest rate as percentage.
 *
 * @param {number} interestRate
 * @returns
 */
export function convertInterestRateToPercentage(interestRate: number): number {
  return interestRate / 100;
}

/**
 * Convert interest paid to a number, based on the base year value (1 = 1 year, 2 = 2 years, and so on).
 *
 * @param {string} interestPaid
 * @returns
 */
export function convertInterestPaid(
  interestPaid: InterestPaid
): number | never {
  switch (interestPaid) {
    case InterestPaid.MONTHLY:
      return 12;
    case InterestPaid.QUARTERLY:
      return 4;
    case InterestPaid.ANNUALLY:
    case InterestPaid.AT_MATURITY:
      return 1;
    default:
      throw new Error("Invalid interest paid option");
  }
}

/**
 * Round to two decimal places.
 *
 * @param {number} value
 * @returns
 */
export function roundToTwoDecimalPlaces(value: number): number {
  return Number((Math.round(value * 100) / 100).toFixed(2));
}

export function calculateFinalBalance(
  values: TermDepositFormSchema,
  interestRatePercentage: number,
  convertedInterestPaid: number
) {
  const { depositAmount, investmentTerm, interestPaid } = values;

  // Calculate the final balance, at the end of investment term.
  let totalAmount: number;

  switch (interestPaid) {
    case InterestPaid.AT_MATURITY:
      totalAmount =
        depositAmount *
        (1 + interestRatePercentage * investmentTerm) ** convertedInterestPaid;
      break;
    default:
      totalAmount =
        depositAmount *
        (1 + interestRatePercentage / convertedInterestPaid) **
          (investmentTerm * convertedInterestPaid);
      break;
  }

  // Round the total amount to two decimal places
  return roundToTwoDecimalPlaces(totalAmount);
}

/**
 * Calculate term deposit.
 *
 * @param values
 * @returns
 */
export function calculateTermDeposit(values: TermDepositFormSchema) {
  const { depositAmount, interestRate, interestPaid } = values;

  const interestRatePercentage = convertInterestRateToPercentage(interestRate);

  const convertedInterestPaid = convertInterestPaid(interestPaid);

  const totalAmount = calculateFinalBalance(
    values,
    interestRatePercentage,
    convertedInterestPaid
  );

  const interestEarned = totalAmount - depositAmount;

  return {
    finalBalance: roundToTwoDecimalPlaces(totalAmount),
    totalInterestEarned: roundToTwoDecimalPlaces(interestEarned),
  };
}
