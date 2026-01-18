/**
 * ERX Image Gallery Types
 * Image gallery with grid layout
 */

export type ErxGalleryLayout = 'grid' | 'masonry' | 'carousel';

export interface ErxGalleryImage {
  /** Image ID */
  id: string;
  /** Image URL */
  src: string;
  /** Thumbnail URL */
  thumbnail?: string;
  /** Alt text */
  alt?: string;
  /** Title */
  title?: string;
  /** Description */
  description?: string;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
}

export interface ErxImageGalleryConfig {
  /** Images array */
  images?: ErxGalleryImage[];
  /** Layout type */
  layout?: ErxGalleryLayout;
  /** Columns (for grid) */
  columns?: number;
  /** Gap between images */
  gap?: number;
  /** Image aspect ratio */
  aspectRatio?: string;
  /** Enable lightbox */
  lightbox?: boolean;
  /** Lazy load images */
  lazyLoad?: boolean;
}

export interface ErxGalleryClickEvent {
  image: ErxGalleryImage;
  index: number;
}
