/**
 * ERX ProductCard Types
 */

export interface ErxProduct {
  /** Unique product identifier */
  id: string | number;
  /** Product name */
  name: string;
  /** Product price */
  price: number;
  /** Original price (for showing discounts) */
  originalPrice?: number;
  /** Product image URL */
  image?: string;
  /** Product category */
  category?: string;
  /** Stock quantity */
  stock?: number;
  /** SKU or barcode */
  sku?: string;
  /** Product description */
  description?: string;
  /** Whether product is active/available */
  active?: boolean;
  /** Product variants (colors, sizes, etc.) */
  variants?: ErxProductVariant[];
  /** Custom badge text */
  badge?: string;
  /** Badge color */
  badgeColor?: 'primary' | 'success' | 'warning' | 'danger';
}

export interface ErxProductVariant {
  id: string | number;
  name: string;
  price?: number;
  stock?: number;
  sku?: string;
}

export interface ErxProductCardSelectEvent {
  product: ErxProduct;
  quantity: number;
  variant?: ErxProductVariant;
}

export interface ErxProductCardAddEvent {
  product: ErxProduct;
  quantity: number;
  variant?: ErxProductVariant;
}
