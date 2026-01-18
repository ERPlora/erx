/**
 * ERX State Types
 * Empty state / error state / loading state display
 */

export type ErxStateType = 'empty' | 'error' | 'loading' | 'success' | 'custom';

export interface ErxStateConfig {
  /** State type */
  type?: ErxStateType;
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Icon name or URL */
  icon?: string;
  /** Primary action button text */
  actionText?: string;
  /** Secondary action button text */
  secondaryActionText?: string;
  /** Compact mode */
  compact?: boolean;
}

export interface ErxStateActionEvent {
  action: 'primary' | 'secondary';
}
