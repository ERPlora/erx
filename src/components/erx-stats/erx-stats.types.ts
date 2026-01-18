export type StatTrend = 'up' | 'down' | 'stable';
export type StatSize = 'sm' | 'md' | 'lg';

export interface Stat {
  id: string;
  label: string;
  value: number | string;
  previousValue?: number | string;
  change?: number; // percentage
  trend?: StatTrend;
  icon?: string;
  color?: string;
  prefix?: string;
  suffix?: string;
  description?: string;
  sparkline?: number[];
}

export interface StatsConfig {
  columns?: number;
  showTrend?: boolean;
  showSparkline?: boolean;
  animated?: boolean;
}
