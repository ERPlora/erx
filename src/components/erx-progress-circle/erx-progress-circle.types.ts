/**
 * ERX Progress Circle Types
 * Circular progress indicator
 */

export type ErxProgressCircleSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ErxProgressCircleConfig {
  /** Progress value (0-100) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Circle size */
  size?: ErxProgressCircleSize;
  /** Custom size in pixels */
  customSize?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Show percentage text */
  showValue?: boolean;
  /** Custom label */
  label?: string;
  /** Color (CSS color or theme color) */
  color?: string;
  /** Track color */
  trackColor?: string;
  /** Animate on load */
  animate?: boolean;
  /** Animation duration (ms) */
  animationDuration?: number;
  /** Indeterminate state */
  indeterminate?: boolean;
}
