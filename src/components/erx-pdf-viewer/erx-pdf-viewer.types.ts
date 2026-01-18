/**
 * ERX PDF Viewer Types
 * PDF document viewer
 */

export interface ErxPdfViewerConfig {
  /** PDF source URL or base64 */
  src?: string;
  /** Initial page number */
  page?: number;
  /** Initial zoom level */
  zoom?: number;
  /** Show toolbar */
  showToolbar?: boolean;
  /** Show page navigation */
  showNavigation?: boolean;
  /** Show zoom controls */
  showZoom?: boolean;
  /** Show download button */
  showDownload?: boolean;
  /** Show print button */
  showPrint?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Fit mode */
  fitMode?: 'page' | 'width' | 'height';
}

export interface ErxPdfPageChangeEvent {
  page: number;
  totalPages: number;
}

export interface ErxPdfLoadEvent {
  totalPages: number;
  pageWidth: number;
  pageHeight: number;
}

export interface ErxPdfErrorEvent {
  error: string;
}
