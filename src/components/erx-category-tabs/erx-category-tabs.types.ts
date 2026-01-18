/**
 * ERX CategoryTabs Types
 */

export interface ErxCategory {
  /** Unique category identifier */
  id: string | number;
  /** Category name */
  name: string;
  /** Category icon (URL or icon name) */
  icon?: string;
  /** Category color */
  color?: string;
  /** Number of items in category */
  count?: number;
  /** Whether category is disabled */
  disabled?: boolean;
  /** Parent category ID for nested categories */
  parentId?: string | number;
}

export interface ErxCategorySelectEvent {
  category: ErxCategory;
  previousCategory?: ErxCategory;
}
