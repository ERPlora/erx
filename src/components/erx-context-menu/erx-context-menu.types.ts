/**
 * ERX Context Menu Types
 * Right-click context menu
 */

export interface ErxContextMenuItem {
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
  children?: ErxContextMenuItem[];
  /** Custom data */
  data?: unknown;
}

export interface ErxContextMenuPosition {
  x: number;
  y: number;
}

export interface ErxContextMenuSelectEvent {
  item: ErxContextMenuItem;
  position: ErxContextMenuPosition;
  target: HTMLElement | null;
}

export interface ErxContextMenuOpenEvent {
  open: boolean;
  position: ErxContextMenuPosition;
  target: HTMLElement | null;
}
