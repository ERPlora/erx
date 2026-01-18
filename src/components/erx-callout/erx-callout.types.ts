/**
 * ERX Callout Types
 * Highlighted information box with icon
 */

export type ErxCalloutVariant = 'info' | 'success' | 'warning' | 'error' | 'tip' | 'note';

export interface ErxCalloutConfig {
  /** Callout variant */
  variant?: ErxCalloutVariant;
  /** Title text */
  title?: string;
  /** Icon to show */
  icon?: string;
  /** Collapsible */
  collapsible?: boolean;
  /** Collapsed by default */
  collapsed?: boolean;
}
