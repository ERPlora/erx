/**
 * ERX Upload Types
 * File upload with drag-drop
 */

export interface ErxUploadFile {
  /** File ID */
  id: string;
  /** Original file object */
  file: File;
  /** File name */
  name: string;
  /** File size in bytes */
  size: number;
  /** MIME type */
  type: string;
  /** Upload progress (0-100) */
  progress: number;
  /** Upload status */
  status: 'pending' | 'uploading' | 'success' | 'error';
  /** Error message */
  error?: string;
  /** Preview URL (for images) */
  preview?: string;
  /** Server response */
  response?: unknown;
}

export interface ErxUploadConfig {
  /** Accept file types */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Max file size in bytes */
  maxSize?: number;
  /** Max number of files */
  maxFiles?: number;
  /** Show file list */
  showList?: boolean;
  /** Show preview for images */
  showPreview?: boolean;
  /** Auto upload on select */
  autoUpload?: boolean;
  /** Upload URL */
  uploadUrl?: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface ErxUploadSelectEvent {
  files: ErxUploadFile[];
}

export interface ErxUploadProgressEvent {
  file: ErxUploadFile;
  progress: number;
}

export interface ErxUploadCompleteEvent {
  file: ErxUploadFile;
  response: unknown;
}

export interface ErxUploadErrorEvent {
  file: ErxUploadFile;
  error: string;
}
