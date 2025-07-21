import { InterestPaid, type TermDepositFormSchema } from "../shared";

/**
 * Convert interest rate as percentage.
 *
 * @param {number} interestRate
 * @returns {number}
 */
export function convertInterestRateToPercentage(interestRate: number): number {
  return interestRate / 100;
}

/**
 * Convert interest paid to a number, based on the base year value (1 = 1 year, 2 = 2 years, and so on).
 *
 * If the interest paid is not one of the valid options, it will return 12 (monthly).
 *
 * @param {string} interestPaid
 * @returns {number}
 */
export function convertInterestPaid(interestPaid: InterestPaid): number {
  switch (interestPaid) {
    case InterestPaid.MONTHLY:
      return 12;
    case InterestPaid.QUARTERLY:
      return 4;
    case InterestPaid.ANNUALLY:
    case InterestPaid.AT_MATURITY:
      return 1;
    default:
      return 12;
  }
}

/**
 * Round to two decimal places.
 *
 * @param {number} value
 * @returns {number}
 */
export function roundToTwoDecimalPlaces(value: number): number {
  return Number((Math.round(value * 100) / 100).toFixed(2));
}

/**
 * Calculate the final balance, at the end of investment term.
 *
 * @param {TermDepositFormSchema} values
 * @param {number} interestRatePercentage
 * @param {number} convertedInterestPaid
 * @returns {number}
 */
export function calculateFinalBalance(
  values: TermDepositFormSchema,
  interestRatePercentage: number,
  convertedInterestPaid: number
): number {
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
 * @param {TermDepositFormSchema} values
 * @returns {number}
 */
export function calculateTermDeposit(values: TermDepositFormSchema): {
  finalBalance: number;
  totalInterestEarned: number;
} {
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
