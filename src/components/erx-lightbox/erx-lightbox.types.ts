/**
 * ERX Lightbox Types
 * Fullscreen image viewer
 */

export interface ErxLightboxImage {
  /** Image URL */
  src: string;
  /** Thumbnail URL */
  thumbnail?: string;
  /** Alt text */
  alt?: string;
  /** Title/caption */
  title?: string;
  /** Description */
  description?: string;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
}

export interface ErxLightboxConfig {
  /** Show navigation arrows */
  showNav?: boolean;
  /** Show thumbnails strip */
  showThumbnails?: boolean;
  /** Show image counter */
  showCounter?: boolean;
  /** Show caption */
  showCaption?: boolean;
  /** Enable zoom */
  enableZoom?: boolean;
  /** Max zoom level */
  maxZoom?: number;
  /** Enable slideshow */
  enableSlideshow?: boolean;
  /** Slideshow interval (ms) */
  slideshowInterval?: number;
  /** Close on backdrop click */
  backdropDismiss?: boolean;
  /** Enable keyboard navigation */
  keyboardNav?: boolean;
  /** Enable swipe gestures */
  swipeNav?: boolean;
}

export interface ErxLightboxOpenEvent {
  open: boolean;
  index: number;
}

export interface ErxLightboxSlideEvent {
  index: number;
  image: ErxLightboxImage;
}

export interface ErxLightboxZoomEvent {
  zoom: number;
}
