/**
 * ERX Button Group Types
 * Group of related buttons
 */

export type ErxButtonGroupSize = 'sm' | 'md' | 'lg';
export type ErxButtonGroupVariant = 'solid' | 'outline' | 'ghost';

export interface ErxButtonGroupConfig {
  /** Button size */
  size?: ErxButtonGroupSize;
  /** Button variant */
  variant?: ErxButtonGroupVariant;
  /** Vertical layout */
  vertical?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
}
