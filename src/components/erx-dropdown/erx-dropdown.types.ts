/**
 * ERX Dropdown Types
 * Dropdown menu with trigger element
 */

export interface ErxDropdownItem {
  /** Unique item ID */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: string;
  /** Item type */
  type?: 'item' | 'divider' | 'header';
  /** Disabled state */
  disabled?: boolean;
  /** Danger/destructive style */
  danger?: boolean;
  /** Keyboard shortcut hint */
  shortcut?: string;
  /** Nested items */
  children?: ErxDropdownItem[];
  /** Custom data */
  data?: unknown;
}

export type ErxDropdownPlacement =
  | 'bottom-start'
  | 'bottom-end'
  | 'top-start'
  | 'top-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

export type ErxDropdownTrigger = 'click' | 'hover' | 'manual';

export interface ErxDropdownSelectEvent {
  item: ErxDropdownItem;
  path: ErxDropdownItem[];
}

export interface ErxDropdownOpenEvent {
  open: boolean;
}
