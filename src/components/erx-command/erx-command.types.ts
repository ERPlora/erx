/**
 * ERX Command Palette Types
 * Command palette (Cmd+K style)
 */

export interface ErxCommandItem {
  /** Unique command ID */
  id: string;
  /** Display label */
  label: string;
  /** Description/hint */
  description?: string;
  /** Optional icon */
  icon?: string;
  /** Category/group */
  category?: string;
  /** Keywords for search */
  keywords?: string[];
  /** Keyboard shortcut */
  shortcut?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Recent/pinned flag */
  recent?: boolean;
  /** Custom data */
  data?: unknown;
}

export interface ErxCommandCategory {
  /** Category ID */
  id: string;
  /** Display name */
  name: string;
  /** Items in this category */
  items: ErxCommandItem[];
}

export interface ErxCommandSelectEvent {
  item: ErxCommandItem;
  query: string;
}

export interface ErxCommandOpenEvent {
  open: boolean;
}

export interface ErxCommandSearchEvent {
  query: string;
}
