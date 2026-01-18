import { Component, Prop, State, h } from '@stencil/core';
import { ErxDiffViewMode, ErxDiffLine } from './erx-diff-viewer.types';

@Component({
  tag: 'erx-diff-viewer',
  styleUrl: 'erx-diff-viewer.css',
  shadow: true,
})
export class ErxDiffViewer {
  /** Old/original text */
  @Prop() oldText = '';

  /** New/modified text */
  @Prop() newText = '';

  /** Old file name */
  @Prop() oldTitle = 'Original';

  /** New file name */
  @Prop() newTitle = 'Modified';

  /** View mode: split or unified */
  @Prop() mode: ErxDiffViewMode = 'split';

  /** Show line numbers */
  @Prop() showLineNumbers = true;

  /** Show file headers */
  @Prop() showHeaders = true;

  /** Wrap long lines */
  @Prop() wordWrap = false;

  /** Parsed diff lines */
  @State() diffLines: ErxDiffLine[] = [];

  componentWillLoad() {
    this.computeDiff();
  }

  componentWillUpdate() {
    this.computeDiff();
  }

  private computeDiff() {
    const oldLines = this.oldText.split('\n');
    const newLines = this.newText.split('\n');
    const result: ErxDiffLine[] = [];

    // Simple line-by-line diff (LCS-based would be better but complex)
    const maxLen = Math.max(oldLines.length, newLines.length);
    let oldIdx = 0;
    let newIdx = 0;

    while (oldIdx < oldLines.length || newIdx < newLines.length) {
      const oldLine = oldLines[oldIdx];
      const newLine = newLines[newIdx];

      if (oldIdx >= oldLines.length) {
        // Only new lines left
        result.push({
          newLineNumber: newIdx + 1,
          content: newLine,
          type: 'added',
        });
        newIdx++;
      } else if (newIdx >= newLines.length) {
        // Only old lines left
        result.push({
          oldLineNumber: oldIdx + 1,
          content: oldLine,
          type: 'removed',
        });
        oldIdx++;
      } else if (oldLine === newLine) {
        // Lines match
        result.push({
          oldLineNumber: oldIdx + 1,
          newLineNumber: newIdx + 1,
          content: oldLine,
          type: 'unchanged',
        });
        oldIdx++;
        newIdx++;
      } else {
        // Lines differ - check if it's a modification or insert/delete
        const oldInNew = newLines.indexOf(oldLine, newIdx);
        const newInOld = oldLines.indexOf(newLine, oldIdx);

        if (oldInNew === -1 && newInOld === -1) {
          // Both lines are unique - treat as modification
          result.push({
            oldLineNumber: oldIdx + 1,
            content: oldLine,
            type: 'removed',
          });
          result.push({
            newLineNumber: newIdx + 1,
            content: newLine,
            type: 'added',
          });
          oldIdx++;
          newIdx++;
        } else if (oldInNew !== -1 && (newInOld === -1 || oldInNew - newIdx <= newInOld - oldIdx)) {
          // New line was inserted
          result.push({
            newLineNumber: newIdx + 1,
            content: newLine,
            type: 'added',
          });
          newIdx++;
        } else {
          // Old line was removed
          result.push({
            oldLineNumber: oldIdx + 1,
            content: oldLine,
            type: 'removed',
          });
          oldIdx++;
        }
      }
    }

    this.diffLines = result;
  }

  private renderSplitView() {
    const pairs: { old?: ErxDiffLine; new?: ErxDiffLine }[] = [];
    let i = 0;

    while (i < this.diffLines.length) {
      const line = this.diffLines[i];
      if (line.type === 'unchanged') {
        pairs.push({ old: line, new: line });
        i++;
      } else if (line.type === 'removed') {
        const next = this.diffLines[i + 1];
        if (next && next.type === 'added') {
          pairs.push({ old: line, new: next });
          i += 2;
        } else {
          pairs.push({ old: line });
          i++;
        }
      } else if (line.type === 'added') {
        pairs.push({ new: line });
        i++;
      } else {
        i++;
      }
    }

    return (
      <div class="erx-diff__split" part="split">
        <div class="erx-diff__pane erx-diff__pane--old" part="pane-old">
          {this.showHeaders && (
            <div class="erx-diff__pane-header" part="pane-header">{this.oldTitle}</div>
          )}
          <div class="erx-diff__lines">
            {pairs.map((pair) => (
              <div class={`erx-diff__line erx-diff__line--${pair.old?.type || 'empty'}`}>
                {this.showLineNumbers && (
                  <span class="erx-diff__ln">{pair.old?.oldLineNumber || ''}</span>
                )}
                <span class="erx-diff__content">{pair.old?.content || ''}</span>
              </div>
            ))}
          </div>
        </div>
        <div class="erx-diff__pane erx-diff__pane--new" part="pane-new">
          {this.showHeaders && (
            <div class="erx-diff__pane-header" part="pane-header">{this.newTitle}</div>
          )}
          <div class="erx-diff__lines">
            {pairs.map((pair) => (
              <div class={`erx-diff__line erx-diff__line--${pair.new?.type || 'empty'}`}>
                {this.showLineNumbers && (
                  <span class="erx-diff__ln">{pair.new?.newLineNumber || ''}</span>
                )}
                <span class="erx-diff__content">{pair.new?.content || ''}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  private renderUnifiedView() {
    return (
      <div class="erx-diff__unified" part="unified">
        {this.showHeaders && (
          <div class="erx-diff__unified-header" part="unified-header">
            <span class="erx-diff__file erx-diff__file--old">--- {this.oldTitle}</span>
            <span class="erx-diff__file erx-diff__file--new">+++ {this.newTitle}</span>
          </div>
        )}
        <div class="erx-diff__lines">
          {this.diffLines.map((line) => (
            <div class={`erx-diff__line erx-diff__line--${line.type}`}>
              {this.showLineNumbers && (
                <span class="erx-diff__ln erx-diff__ln--old">{line.oldLineNumber || ''}</span>
              )}
              {this.showLineNumbers && (
                <span class="erx-diff__ln erx-diff__ln--new">{line.newLineNumber || ''}</span>
              )}
              <span class="erx-diff__prefix">
                {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
              </span>
              <span class="erx-diff__content">{line.content}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        class={{
          'erx-diff': true,
          'erx-diff--wrap': this.wordWrap,
        }}
        part="container"
      >
        {this.mode === 'split' ? this.renderSplitView() : this.renderUnifiedView()}
      </div>
    );
  }
}
