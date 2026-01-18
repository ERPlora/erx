/**
 * ERX Calculator Types
 */

export interface ErxCalculatorResult {
  /** Display value */
  display: string;
  /** Numeric result */
  value: number;
  /** Expression that was calculated */
  expression: string;
}
