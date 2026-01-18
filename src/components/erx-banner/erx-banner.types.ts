/**
 * ERX Banner Types
 * Full-width notification banner
 */

export type ErxBannerVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';
export type ErxBannerPosition = 'top' | 'bottom' | 'inline';

export interface ErxBannerConfig {
  /** Banner variant */
  variant?: ErxBannerVariant;
  /** Position */
  position?: ErxBannerPosition;
  /** Dismissible */
  dismissible?: boolean;
  /** Icon to show */
  icon?: string;
  /** Action button text */
  actionText?: string;
  /** Sticky when scrolling */
  sticky?: boolean;
}

export interface ErxBannerDismissEvent {
  dismissed: boolean;
}
