/**
 * ERX Code Block Types
 * Syntax-highlighted code display with copy functionality
 */

export interface ErxCodeBlockConfig {
  /** Programming language */
  language?: string;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Show copy button */
  showCopy?: boolean;
  /** Show language badge */
  showLanguage?: boolean;
  /** Highlight specific lines */
  highlightLines?: number[];
  /** Max height before scrolling */
  maxHeight?: string;
  /** Wrap long lines */
  wordWrap?: boolean;
  /** File name to display */
  fileName?: string;
}

export interface ErxCodeBlockCopyEvent {
  code: string;
  success: boolean;
}
