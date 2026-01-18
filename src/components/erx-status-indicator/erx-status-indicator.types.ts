/**
 * ERX Status Indicator Types
 * Visual status badge/dot
 */

export type ErxStatusIndicatorStatus = 'online' | 'offline' | 'away' | 'busy' | 'success' | 'warning' | 'error' | 'neutral';
export type ErxStatusIndicatorSize = 'xs' | 'sm' | 'md' | 'lg';
export type ErxStatusIndicatorVariant = 'dot' | 'badge' | 'pill';

export interface ErxStatusIndicatorConfig {
  /** Status type */
  status?: ErxStatusIndicatorStatus;
  /** Size */
  size?: ErxStatusIndicatorSize;
  /** Display variant */
  variant?: ErxStatusIndicatorVariant;
  /** Label text (for badge/pill) */
  label?: string;
  /** Pulse animation */
  pulse?: boolean;
}
