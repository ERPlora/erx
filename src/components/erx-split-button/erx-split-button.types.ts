/**
 * ERX Split Button Types
 * Button with dropdown for secondary actions
 */

export type ErxSplitButtonSize = 'sm' | 'md' | 'lg';
export type ErxSplitButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ErxSplitButtonOption {
  /** Option label */
  label: string;
  /** Option value */
  value: string;
  /** Icon */
  icon?: string;
  /** Disabled */
  disabled?: boolean;
  /** Divider before this item */
  divider?: boolean;
}

export interface ErxSplitButtonConfig {
  /** Button size */
  size?: ErxSplitButtonSize;
  /** Button variant */
  variant?: ErxSplitButtonVariant;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
}

export interface ErxSplitButtonSelectEvent {
  value: string;
  option: ErxSplitButtonOption;
}
