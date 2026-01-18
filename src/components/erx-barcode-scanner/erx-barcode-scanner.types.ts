/**
 * ERX Barcode Scanner Types
 * Camera-based barcode scanner
 */

export type ErxBarcodeFormat =
  | 'qr_code'
  | 'ean_13'
  | 'ean_8'
  | 'upc_a'
  | 'upc_e'
  | 'code_128'
  | 'code_39'
  | 'code_93'
  | 'codabar'
  | 'itf'
  | 'data_matrix'
  | 'pdf417';

export interface ErxBarcodeScanResult {
  /** Decoded text */
  text: string;
  /** Barcode format */
  format: ErxBarcodeFormat;
  /** Timestamp */
  timestamp: Date;
  /** Raw data */
  rawValue?: string;
}

export interface ErxBarcodeScannerConfig {
  /** Accepted formats */
  formats?: ErxBarcodeFormat[];
  /** Auto-start camera */
  autoStart?: boolean;
  /** Facing mode */
  facingMode?: 'user' | 'environment';
  /** Scan frequency (ms) */
  scanInterval?: number;
  /** Show overlay/guide */
  showOverlay?: boolean;
  /** Beep on scan */
  beepOnScan?: boolean;
  /** Vibrate on scan */
  vibrateOnScan?: boolean;
  /** Continuous scanning */
  continuous?: boolean;
}

export interface ErxBarcodeScanEvent {
  result: ErxBarcodeScanResult;
}

export interface ErxBarcodeScannerErrorEvent {
  error: string;
  code?: string;
}
