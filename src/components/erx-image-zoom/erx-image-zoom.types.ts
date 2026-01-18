/**
 * ERX Image Zoom Types
 * Image with hover/click zoom capability
 */

export type ErxImageZoomTrigger = 'hover' | 'click' | 'both';
export type ErxImageZoomPosition = 'lens' | 'side' | 'overlay';

export interface ErxImageZoomConfig {
  /** Zoom trigger mode */
  trigger?: ErxImageZoomTrigger;
  /** Zoom level */
  zoomLevel?: number;
  /** Zoom position/style */
  position?: ErxImageZoomPosition;
  /** Lens size (for lens mode) */
  lensSize?: number;
  /** Enable smooth zoom */
  smooth?: boolean;
}

export interface ErxImageZoomEvent {
  zoomed: boolean;
  level: number;
}
