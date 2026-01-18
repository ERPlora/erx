/**
 * ERX PinPad Types
 */

export interface ErxPinPadChangeEvent {
  /** Current value */
  value: string;
  /** Length of the value */
  length: number;
  /** Whether the PIN is complete (reached maxLength) */
  complete: boolean;
}

export interface ErxPinPadSubmitEvent {
  /** Submitted value */
  value: string;
}

export interface ErxPinPadButtonConfig {
  /** Button value (what gets added to the PIN) */
  value: string;
  /** Display label (what shows on the button) */
  label?: string;
  /** Custom CSS class */
  class?: string;
  /** Disable this button */
  disabled?: boolean;
}
