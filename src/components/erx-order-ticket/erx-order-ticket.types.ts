/**
 * ERX OrderTicket Types
 */

export interface ErxOrderTicketItem {
  /** Item name */
  name: string;
  /** Quantity */
  quantity: number;
  /** Unit price */
  price?: number;
  /** Variant/modifier */
  variant?: string;
  /** Special notes */
  notes?: string;
  /** Status */
  status?: 'pending' | 'preparing' | 'ready' | 'delivered';
}

export interface ErxOrder {
  /** Order number */
  orderNumber: string | number;
  /** Order timestamp */
  timestamp: Date | string;
  /** Order items */
  items: ErxOrderTicketItem[];
  /** Customer name */
  customerName?: string;
  /** Table number */
  tableNumber?: string | number;
  /** Order type */
  orderType?: 'dine-in' | 'takeout' | 'delivery';
  /** Order status */
  status?: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  /** Total amount */
  total?: number;
  /** Notes */
  notes?: string;
  /** Priority */
  priority?: 'normal' | 'rush';
}

export interface ErxOrderTicketActionEvent {
  order: ErxOrder;
  action: string;
}
