export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'area';

export interface ChartDataset {
  label: string;
  data: number[];
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  fill?: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartConfig {
  type: ChartType;
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  animated?: boolean;
  stacked?: boolean;
  aspectRatio?: number;
  currency?: string;
  locale?: string;
}

export interface ChartTooltipDetail {
  label: string;
  value: number;
  dataset: string;
  index: number;
}
