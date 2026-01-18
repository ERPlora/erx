/**
 * ERX Load More Types
 * Infinite scroll / load more button component
 */

export type ErxLoadMoreMode = 'button' | 'infinite' | 'auto';
export type ErxLoadMoreStatus = 'idle' | 'loading' | 'error' | 'complete';

export interface ErxLoadMoreConfig {
  /** Mode: button, infinite scroll, or auto (hybrid) */
  mode?: ErxLoadMoreMode;
  /** Text for load more button */
  loadText?: string;
  /** Text while loading */
  loadingText?: string;
  /** Text when all items loaded */
  completeText?: string;
  /** Text on error */
  errorText?: string;
  /** Retry button text */
  retryText?: string;
  /** Threshold in pixels before triggering (infinite mode) */
  threshold?: number;
  /** Disable the component */
  disabled?: boolean;
}

export interface ErxLoadMoreEvent {
  /** Current page number */
  page: number;
  /** Callback to signal load complete */
  done: (hasMore: boolean) => void;
  /** Callback to signal error */
  error: (message?: string) => void;
}
