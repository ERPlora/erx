/**
 * ERX Image Crop Types
 * Image cropping tool
 */

export interface ErxCropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ErxImageCropConfig {
  /** Image source URL */
  src?: string;
  /** Aspect ratio (e.g., 16/9, 1, 4/3) */
  aspectRatio?: number;
  /** Minimum crop width */
  minWidth?: number;
  /** Minimum crop height */
  minHeight?: number;
  /** Show grid overlay */
  showGrid?: boolean;
  /** Circular crop */
  circular?: boolean;
  /** Zoom range min */
  minZoom?: number;
  /** Zoom range max */
  maxZoom?: number;
  /** Output format */
  outputFormat?: 'jpeg' | 'png' | 'webp';
  /** Output quality (0-1) */
  outputQuality?: number;
}

export interface ErxImageCropEvent {
  /** Crop area in percentages */
  cropArea: ErxCropArea;
  /** Crop area in pixels */
  cropAreaPixels: ErxCropArea;
  /** Zoom level */
  zoom: number;
  /** Rotation in degrees */
  rotation: number;
}

export interface ErxImageCropCompleteEvent {
  /** Cropped image as data URL */
  dataUrl: string;
  /** Cropped image as Blob */
  blob: Blob;
  /** Crop details */
  cropArea: ErxCropArea;
}
