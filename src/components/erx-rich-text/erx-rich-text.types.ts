/**
 * ERX Rich Text Types
 * WYSIWYG rich text editor
 */

export type ErxRichTextTool =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bulletList'
  | 'orderedList'
  | 'blockquote'
  | 'code'
  | 'link'
  | 'image'
  | 'divider'
  | 'undo'
  | 'redo'
  | 'clear';

export interface ErxRichTextConfig {
  /** HTML content */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Enabled tools */
  tools?: ErxRichTextTool[];
  /** Min height */
  minHeight?: string;
  /** Max height */
  maxHeight?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Read only */
  readOnly?: boolean;
}

export interface ErxRichTextChangeEvent {
  /** HTML content */
  html: string;
  /** Plain text content */
  text: string;
  /** Character count */
  length: number;
}
