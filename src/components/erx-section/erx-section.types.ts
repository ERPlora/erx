/**
 * ERX Section Types
 * Section with collapsible header
 */

export interface ErxSectionConfig {
  /** Section title */
  title?: string;
  /** Subtitle/description */
  subtitle?: string;
  /** Icon */
  icon?: string;
  /** Collapsible */
  collapsible?: boolean;
  /** Initial collapsed state */
  collapsed?: boolean;
  /** Show divider */
  divider?: boolean;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface ErxSectionToggleEvent {
  collapsed: boolean;
}
