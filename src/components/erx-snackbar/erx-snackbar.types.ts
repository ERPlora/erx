/**
 * ERX Snackbar Types
 * Brief notification at bottom of screen
 */

export type ErxSnackbarPosition = 'bottom' | 'bottom-left' | 'bottom-right' | 'top' | 'top-left' | 'top-right';
export type ErxSnackbarVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ErxSnackbarConfig {
  /** Message text */
  message: string;
  /** Snackbar variant */
  variant?: ErxSnackbarVariant;
  /** Duration in ms (0 = persistent) */
  duration?: number;
  /** Position on screen */
  position?: ErxSnackbarPosition;
  /** Action button text */
  actionText?: string;
  /** Show close button */
  showClose?: boolean;
  /** Icon to show */
  icon?: string;
}

export interface ErxSnackbarActionEvent {
  message: string;
}
