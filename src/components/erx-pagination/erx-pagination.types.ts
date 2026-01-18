/**
 * ERX Pagination Types
 * Numeric pagination with page navigation
 */

export interface ErxPaginationConfig {
  /** Current page (1-indexed) */
  page: number;
  /** Total number of items */
  total: number;
  /** Items per page */
  perPage: number;
  /** Maximum visible page buttons */
  maxVisible?: number;
  /** Show first/last buttons */
  showFirstLast?: boolean;
  /** Show prev/next buttons */
  showPrevNext?: boolean;
  /** Show page size selector */
  showPageSize?: boolean;
  /** Available page sizes */
  pageSizes?: number[];
  /** Show total count */
  showTotal?: boolean;
  /** Show current range */
  showRange?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

export interface ErxPaginationChangeEvent {
  page: number;
  perPage: number;
  offset: number;
}

export interface ErxPageSizeChangeEvent {
  perPage: number;
  page: number;
}
