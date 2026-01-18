/**
 * ERX DataGrid Types
 */

export interface ErxColumn {
  /** Field name in the data object */
  field: string;
  /** Display header text */
  header: string;
  /** Column width (px or %) */
  width?: number | string;
  /** Minimum width in px */
  minWidth?: number;
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Enable filtering for this column */
  filterable?: boolean;
  /** Enable inline editing for this column */
  editable?: boolean;
  /** Data type for formatting and editing */
  type?: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'custom';
  /** Custom formatter function */
  formatter?: (value: unknown, row: Record<string, unknown>) => string;
  /** Editor type when editable */
  editor?: 'text' | 'number' | 'select' | 'date' | 'checkbox' | 'custom';
  /** Options for select editor */
  editorOptions?: { value: unknown; label: string }[];
  /** Pin column to left or right */
  pinned?: 'left' | 'right';
  /** Enable grouping by this column */
  groupable?: boolean;
  /** Hide the column */
  hidden?: boolean;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** CSS class for cells */
  cellClass?: string;
  /** CSS class for header */
  headerClass?: string;
}

export interface ErxSortState {
  field: string;
  direction: 'asc' | 'desc';
}

export interface ErxFilterState {
  [field: string]: {
    value: unknown;
    operator?: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';
  };
}

export interface ErxSortEvent {
  field: string;
  direction: 'asc' | 'desc' | null;
  sortState: ErxSortState | null;
}

export interface ErxFilterEvent {
  filters: ErxFilterState;
}

export interface ErxRowSelectEvent {
  selectedRows: Record<string, unknown>[];
  selectedKeys: string[];
  row?: Record<string, unknown>;
  key?: string;
}

export interface ErxRowClickEvent {
  row: Record<string, unknown>;
  index: number;
  originalEvent: MouseEvent;
}

export interface ErxCellEditEvent {
  row: Record<string, unknown>;
  field: string;
  oldValue: unknown;
  newValue: unknown;
  rowKey: string;
}

export interface ErxCellEditStartEvent {
  row: Record<string, unknown>;
  field: string;
  rowKey: string;
}

export interface ErxPageChangeEvent {
  page: number;
  pageSize: number;
  total: number;
}
