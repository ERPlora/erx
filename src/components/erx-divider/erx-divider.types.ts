/**
 * ERX Divider Types
 * Divider line with optional text
 */

export type ErxDividerOrientation = 'horizontal' | 'vertical';
export type ErxDividerTextPosition = 'left' | 'center' | 'right';

export interface ErxDividerConfig {
  /** Orientation */
  orientation?: ErxDividerOrientation;
  /** Text label */
  text?: string;
  /** Text position */
  textPosition?: ErxDividerTextPosition;
  /** Dashed style */
  dashed?: boolean;
  /** Margin */
  margin?: string;
}
