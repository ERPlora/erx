/**
 * ERX Sparkline Types
 * Mini inline charts
 */

export type ErxSparklineType = 'line' | 'bar' | 'area';

export interface ErxSparklineConfig {
  /** Data points */
  data?: number[];
  /** Chart type */
  type?: ErxSparklineType;
  /** Chart width */
  width?: number;
  /** Chart height */
  height?: number;
  /** Line/bar color */
  color?: string;
  /** Fill color (for area) */
  fillColor?: string;
  /** Show min/max dots */
  showMinMax?: boolean;
  /** Show last value dot */
  showLast?: boolean;
  /** Animate on load */
  animate?: boolean;
  /** Curve line (smooth) */
  curved?: boolean;
}
