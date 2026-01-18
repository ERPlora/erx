export interface ComparisonItem {
  id: string;
  name: string;
  image?: string;
  price?: number;
  features: Record<string, string | number | boolean>;
  highlighted?: boolean;
  badge?: string;
}

export interface ComparisonFeature {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'boolean' | 'rating';
  unit?: string;
  higherIsBetter?: boolean;
}

export interface ComparisonConfig {
  features: ComparisonFeature[];
  showPrices?: boolean;
  showHighlight?: boolean;
  sticky?: boolean;
  currency?: string;
  locale?: string;
}

export interface ComparisonSelectDetail {
  item: ComparisonItem;
}
