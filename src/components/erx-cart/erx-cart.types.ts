/**
 * ERX Cart Types
 */

export interface ErxCartItem {
  /** Unique item identifier */
  id: string | number;
  /** Product ID */
  productId: string | number;
  /** Product name */
  name: string;
  /** Unit price */
  price: number;
  /** Quantity */
  quantity: number;
  /** Product image URL */
  image?: string;
  /** Selected variant */
  variant?: string;
  /** SKU */
  sku?: string;
  /** Additional notes */
  notes?: string;
  /** Discount amount */
  discount?: number;
  /** Discount type */
  discountType?: 'percent' | 'fixed';
  /** Maximum quantity (stock) */
  maxQuantity?: number;
}

export interface ErxCartSummary {
  /** Subtotal (before tax and discounts) */
  subtotal: number;
  /** Total discount amount */
  discount: number;
  /** Tax amount */
  tax: number;
  /** Total (after tax and discounts) */
  total: number;
  /** Number of items */
  itemCount: number;
  /** Number of unique products */
  lineCount: number;
}

export interface ErxCartItemChangeEvent {
  item: ErxCartItem;
  quantity: number;
  previousQuantity: number;
}

export interface ErxCartItemRemoveEvent {
  item: ErxCartItem;
}

export interface ErxCartClearEvent {
  items: ErxCartItem[];
}
