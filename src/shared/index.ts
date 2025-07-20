export type TermDepositFormSchema = {
  depositAmount: number;
  interestRate: number;
  investmentTerm: number;
  interestPaid: InterestPaid;
};

export enum InterestPaid {
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  ANNUALLY = "annually",
  AT_MATURITY = "at-maturity",
}
