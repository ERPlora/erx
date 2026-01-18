/**
 * ERX VariantSelector Types
 */

export interface ErxVariantOption {
  /** Option value/id */
  value: string;
  /** Display label */
  label: string;
  /** Whether option is available */
  available?: boolean;
  /** Additional price */
  priceModifier?: number;
  /** Stock count */
  stock?: number;
  /** Color hex (for color variants) */
  color?: string;
  /** Image URL (for image variants) */
  image?: string;
}

export interface ErxVariantGroup {
  /** Group identifier */
  id: string;
  /** Group name (e.g., "Size", "Color") */
  name: string;
  /** Variant type */
  type: 'button' | 'color' | 'image' | 'dropdown';
  /** Options */
  options: ErxVariantOption[];
  /** Required selection */
  required?: boolean;
}

export interface ErxVariantSelection {
  [groupId: string]: string;
}

export interface ErxVariantSelectEvent {
  groupId: string;
  option: ErxVariantOption;
  selection: ErxVariantSelection;
  complete: boolean;
}
