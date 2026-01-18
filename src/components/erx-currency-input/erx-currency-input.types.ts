export interface CurrencyInputConfig {
  currency: string; // ISO 4217 code (USD, EUR, etc.)
  locale?: string;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  allowNegative?: boolean;
  showSymbol?: boolean;
  symbolPosition?: 'prefix' | 'suffix';
}

export interface CurrencyInputChangeDetail {
  value: number;
  formatted: string;
  currency: string;
}
