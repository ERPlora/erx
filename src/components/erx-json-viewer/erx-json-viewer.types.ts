/**
 * ERX JSON Viewer Types
 * Tree-based JSON viewer
 */

export interface ErxJsonViewerConfig {
  /** JSON data to display */
  data?: unknown;
  /** Initial expansion depth */
  expandDepth?: number;
  /** Show root name */
  rootName?: string;
  /** Show data types */
  showTypes?: boolean;
  /** Show array indexes */
  showArrayIndexes?: boolean;
  /** Collapsed by default */
  collapsed?: boolean;
  /** Searchable */
  searchable?: boolean;
  /** Copy button */
  copyable?: boolean;
  /** Max string length before truncation */
  maxStringLength?: number;
}
