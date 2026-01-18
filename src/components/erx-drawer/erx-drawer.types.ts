/**
 * ERX Drawer Types
 * Side drawer/panel overlay
 */

export type ErxDrawerPosition = 'left' | 'right';

export type ErxDrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ErxDrawerConfig {
  /** Drawer position */
  position?: ErxDrawerPosition;
  /** Drawer size */
  size?: ErxDrawerSize;
  /** Custom width */
  width?: string;
  /** Show backdrop */
  backdrop?: boolean;
  /** Close on backdrop click */
  backdropDismiss?: boolean;
  /** Show close button */
  showClose?: boolean;
  /** Enable keyboard close (Escape) */
  keyboardClose?: boolean;
}

export interface ErxDrawerOpenEvent {
  open: boolean;
}
