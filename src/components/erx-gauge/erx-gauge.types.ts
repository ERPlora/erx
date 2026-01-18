/**
 * ERX Gauge Types
 * Gauge/meter visualization
 */

export type ErxGaugeSize = 'sm' | 'md' | 'lg';

export interface ErxGaugeSegment {
  /** Segment value/threshold */
  value: number;
  /** Segment color */
  color: string;
  /** Segment label */
  label?: string;
}

export interface ErxGaugeConfig {
  /** Current value */
  value?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Gauge size */
  size?: ErxGaugeSize;
  /** Custom width */
  width?: number;
  /** Start angle (degrees) */
  startAngle?: number;
  /** End angle (degrees) */
  endAngle?: number;
  /** Segments/zones */
  segments?: ErxGaugeSegment[];
  /** Show value */
  showValue?: boolean;
  /** Value format function */
  valueFormat?: string;
  /** Unit label */
  unit?: string;
  /** Show min/max labels */
  showMinMax?: boolean;
  /** Animate on change */
  animate?: boolean;
}
