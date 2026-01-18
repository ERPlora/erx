/**
 * ERX Sheet Types
 * Bottom/side sheet overlay
 */

export type ErxSheetPosition = 'bottom' | 'top' | 'left' | 'right';

export type ErxSheetSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ErxSheetBreakpoint {
  /** Breakpoint ratio (0-1) */
  ratio: number;
  /** Optional name */
  name?: string;
}

export interface ErxSheetConfig {
  /** Sheet position */
  position?: ErxSheetPosition;
  /** Sheet size */
  size?: ErxSheetSize;
  /** Custom height/width */
  customSize?: string;
  /** Show backdrop */
  backdrop?: boolean;
  /** Close on backdrop click */
  backdropDismiss?: boolean;
  /** Show drag handle */
  showHandle?: boolean;
  /** Enable swipe to dismiss */
  swipeToDismiss?: boolean;
  /** Snap breakpoints (for bottom sheet) */
  breakpoints?: ErxSheetBreakpoint[];
  /** Initial breakpoint */
  initialBreakpoint?: number;
}

export interface ErxSheetOpenEvent {
  open: boolean;
}

export interface ErxSheetBreakpointEvent {
  breakpoint: number;
  ratio: number;
}
