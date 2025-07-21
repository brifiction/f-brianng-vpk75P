import { Field, Form, Formik } from "formik";
import { InterestPaid, type TermDepositFormSchema } from "../shared";
import { calculateTermDeposit } from "../calculators/TermDeposit";
import { useState } from "react";

export function TermDepositCalculator() {
  // Form initial values
  const initialValues: TermDepositFormSchema = {
    depositAmount: 10000,
    interestRate: 1.1,
    investmentTerm: 3,
    interestPaid: InterestPaid.AT_MATURITY,
  };

  // Pre-calculate initial results
  const initialResults = calculateTermDeposit(initialValues);

  // Term deposit results state handling
  const [results, setResults] = useState<{
    finalBalance: number;
    totalInterestEarned: number;
  }>(initialResults);

  /**
   * Handle the Term Deposit calculator form submission.
   *
   * @param {TermDepositFormSchema} values
   * @returns {void}
   */
  const handleSubmit = (values: TermDepositFormSchema): void => {
    const { finalBalance, totalInterestEarned } = calculateTermDeposit(values);
    setResults({ finalBalance, totalInterestEarned });
  };

  return (
    <>
      <section>
        <h1>Term Deposit Calculator</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <div>
              <label htmlFor="depositAmount">Deposit Amount ($)</label>
              <Field
                id="depositAmount"
                className="input"
                name="depositAmount"
                type="number"
              />
            </div>
            <div>
              <label htmlFor="interestRate">Interest Rate (%)</label>
              <Field
                id="interestRate"
                className="input"
                name="interestRate"
                type="number"
              />
            </div>
            <div>
              <label htmlFor="investmentTerm">Investment Term (Years)</label>
              <Field
                id="investmentTerm"
                className="input"
                name="investmentTerm"
                type="number"
              />
            </div>
            <div>
              <label htmlFor="interestPaid">
                Interest Paid (per year, per month, per quarter, or at maturity)
              </label>
              <Field
                id="interestPaid"
                className="input"
                name="interestPaid"
                as="select"
              >
                <option value={InterestPaid.AT_MATURITY}>At maturity</option>
                <option value={InterestPaid.ANNUALLY}>Annually</option>
                <option value={InterestPaid.QUARTERLY}>Quarterly</option>
                <option value={InterestPaid.MONTHLY}>Monthly</option>
              </Field>
            </div>
            <button type="submit">Calculate</button>
          </Form>
        </Formik>
      </section>
      <section>
        <div>
          <p>
            <strong>Final balance:</strong> ${results.finalBalance}
          </p>
          <p>
            <strong>Total interest earned:</strong> $
            {results.totalInterestEarned}
          </p>
        </div>
      </section>
    </>
  );
}
