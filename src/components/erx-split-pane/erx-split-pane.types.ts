/**
 * ERX SplitPane Types
 */

export interface ErxSplitPaneResizeEvent {
  /** Current size of the primary pane in pixels or percentage */
  size: number;
  /** Size as percentage of container */
  percentage: number;
}

export interface ErxSplitPaneCollapseEvent {
  /** Which pane is collapsed: 'primary' or 'secondary' */
  collapsed: 'primary' | 'secondary' | null;
}
