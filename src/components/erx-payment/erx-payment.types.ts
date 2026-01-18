/**
 * ERX Payment Types
 */

export interface ErxPaymentMethod {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Icon URL or name */
  icon?: string;
  /** Whether this method is available */
  available?: boolean;
  /** Description */
  description?: string;
  /** Processing fee percentage */
  fee?: number;
  /** Minimum amount */
  minAmount?: number;
  /** Maximum amount */
  maxAmount?: number;
}

export interface ErxPaymentSplit {
  /** Payment method ID */
  methodId: string;
  /** Amount for this method */
  amount: number;
}

export interface ErxPaymentSelectEvent {
  method: ErxPaymentMethod;
  amount: number;
}

export interface ErxPaymentCompleteEvent {
  methods: ErxPaymentSplit[];
  total: number;
  tip: number;
  change: number;
}
