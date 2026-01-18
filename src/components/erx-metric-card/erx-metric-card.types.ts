export type MetricTrend = 'up' | 'down' | 'stable';
export type MetricStatus = 'good' | 'warning' | 'critical' | 'neutral';

export interface MetricThreshold {
  warning: number;
  critical: number;
  direction: 'above' | 'below'; // above = higher is worse
}

export interface Metric {
  id: string;
  label: string;
  value: number;
  unit?: string;
  format?: 'number' | 'currency' | 'percent';
  previousValue?: number;
  change?: number;
  trend?: MetricTrend;
  target?: number;
  threshold?: MetricThreshold;
  icon?: string;
  color?: string;
  sparkline?: number[];
  description?: string;
}

export interface MetricCardConfig {
  showTrend?: boolean;
  showTarget?: boolean;
  showSparkline?: boolean;
  currency?: string;
  locale?: string;
  animated?: boolean;
}
