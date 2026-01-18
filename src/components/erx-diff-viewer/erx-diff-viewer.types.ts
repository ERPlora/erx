/**
 * ERX Diff Viewer Types
 * Side-by-side or unified diff visualization
 */

export type ErxDiffViewMode = 'split' | 'unified';

export interface ErxDiffLine {
  /** Line number in old file */
  oldLineNumber?: number;
  /** Line number in new file */
  newLineNumber?: number;
  /** Line content */
  content: string;
  /** Line type */
  type: 'unchanged' | 'added' | 'removed' | 'header';
}

export interface ErxDiffHunk {
  /** Hunk header */
  header: string;
  /** Lines in hunk */
  lines: ErxDiffLine[];
  /** Old file start line */
  oldStart: number;
  /** Old file line count */
  oldLines: number;
  /** New file start line */
  newStart: number;
  /** New file line count */
  newLines: number;
}

export interface ErxDiffConfig {
  /** View mode: split or unified */
  mode?: ErxDiffViewMode;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Highlight syntax */
  syntaxHighlight?: boolean;
  /** Language for syntax highlighting */
  language?: string;
  /** Show file headers */
  showHeaders?: boolean;
  /** Wrap long lines */
  wordWrap?: boolean;
}
