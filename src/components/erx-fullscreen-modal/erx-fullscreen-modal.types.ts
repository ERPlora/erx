/**
 * ERX Fullscreen Modal Types
 * Full-screen takeover modal for immersive content
 */

export interface ErxFullscreenModalConfig {
  /** Show close button */
  showClose?: boolean;
  /** Close on escape key */
  escapeClose?: boolean;
  /** Animation type */
  animation?: 'fade' | 'slide-up' | 'zoom';
  /** Background color */
  background?: string;
  /** Show header bar */
  showHeader?: boolean;
}

export interface ErxFullscreenModalOpenEvent {
  open: boolean;
}
