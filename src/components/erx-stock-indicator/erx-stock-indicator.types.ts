/**
 * ERX StockIndicator Types
 */

export type ErxStockLevel = 'in-stock' | 'low' | 'out' | 'backorder';

export interface ErxStockStatus {
  level: ErxStockLevel;
  quantity: number;
  label: string;
}
