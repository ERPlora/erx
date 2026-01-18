/**
 * ERX Table Types
 * Simple CSS-based table
 */

export type ErxTableSize = 'sm' | 'md' | 'lg';

export type ErxTableAlign = 'left' | 'center' | 'right';

export interface ErxTableColumn {
  /** Column key */
  key: string;
  /** Header label */
  label: string;
  /** Column width */
  width?: string;
  /** Text alignment */
  align?: ErxTableAlign;
  /** Sortable */
  sortable?: boolean;
  /** Custom cell render format */
  format?: 'text' | 'number' | 'currency' | 'date' | 'badge';
}

export interface ErxTableConfig {
  /** Table columns */
  columns?: ErxTableColumn[];
  /** Table data */
  data?: Record<string, unknown>[];
  /** Table size */
  size?: ErxTableSize;
  /** Striped rows */
  striped?: boolean;
  /** Hoverable rows */
  hoverable?: boolean;
  /** Bordered */
  bordered?: boolean;
  /** Compact */
  compact?: boolean;
  /** Fixed header */
  stickyHeader?: boolean;
  /** Empty message */
  emptyMessage?: string;
}

export interface ErxTableSortEvent {
  column: string;
  direction: 'asc' | 'desc';
}

export interface ErxTableRowClickEvent {
  row: Record<string, unknown>;
  index: number;
}
