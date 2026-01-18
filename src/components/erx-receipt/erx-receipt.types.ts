/**
 * ERX Receipt Types
 */

export interface ErxReceiptItem {
  /** Item name */
  name: string;
  /** Quantity */
  quantity: number;
  /** Unit price */
  price: number;
  /** Discount */
  discount?: number;
  /** Discount type */
  discountType?: 'percent' | 'fixed';
}

export interface ErxReceiptData {
  /** Receipt/invoice number */
  receiptNumber: string;
  /** Transaction date */
  date: Date | string;
  /** Business name */
  businessName: string;
  /** Business address */
  businessAddress?: string;
  /** Business phone */
  businessPhone?: string;
  /** Business tax ID */
  businessTaxId?: string;
  /** Logo URL */
  logoUrl?: string;
  /** Items */
  items: ErxReceiptItem[];
  /** Subtotal */
  subtotal: number;
  /** Discount amount */
  discount?: number;
  /** Tax amount */
  tax?: number;
  /** Tax rate */
  taxRate?: number;
  /** Total */
  total: number;
  /** Payment method */
  paymentMethod?: string;
  /** Amount paid */
  amountPaid?: number;
  /** Change */
  change?: number;
  /** Cashier name */
  cashier?: string;
  /** Customer name */
  customer?: string;
  /** Footer message */
  footerMessage?: string;
  /** Barcode data */
  barcode?: string;
  /** QR code data */
  qrCode?: string;
}
