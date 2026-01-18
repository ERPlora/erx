/**
 * ERX Shell Types
 * App shell layout
 */

export type ErxShellSidebarPosition = 'left' | 'right';

export interface ErxShellConfig {
  /** Sidebar position */
  sidebarPosition?: ErxShellSidebarPosition;
  /** Sidebar width */
  sidebarWidth?: string;
  /** Collapsed sidebar width */
  collapsedWidth?: string;
  /** Header height */
  headerHeight?: string;
  /** Footer height */
  footerHeight?: string;
  /** Sidebar collapsed */
  sidebarCollapsed?: boolean;
}
