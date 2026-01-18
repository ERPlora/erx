/**
 * ERX Panel Types
 * Collapsible panel/accordion
 */

export type ErxPanelVariant = 'default' | 'bordered' | 'elevated';

export interface ErxPanelConfig {
  /** Panel title */
  title?: string;
  /** Subtitle */
  subtitle?: string;
  /** Icon */
  icon?: string;
  /** Variant style */
  variant?: ErxPanelVariant;
  /** Collapsible */
  collapsible?: boolean;
  /** Collapsed state */
  collapsed?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

export interface ErxPanelToggleEvent {
  collapsed: boolean;
}
