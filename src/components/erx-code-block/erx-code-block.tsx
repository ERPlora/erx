import { Component, Prop, State, Event, EventEmitter, Method, h } from '@stencil/core';

@Component({
  tag: 'erx-code-block',
  styleUrl: 'erx-code-block.css',
  shadow: true,
})
export class ErxCodeBlock {
  /** Code content */
  @Prop() code = '';

  /** Programming language */
  @Prop() language?: string;

  /** Show line numbers */
  @Prop() showLineNumbers = true;

  /** Show copy button */
  @Prop() showCopy = true;

  /** Show language badge */
  @Prop() showLanguage = true;

  /** Highlight specific lines (comma-separated or array) */
  @Prop() highlightLines?: string | number[];

  /** Max height before scrolling */
  @Prop() maxHeight?: string;

  /** Wrap long lines */
  @Prop() wordWrap = false;

  /** File name to display */
  @Prop() fileName?: string;

  /** Copy success state */
  @State() copied = false;

  /** Emitted when code is copied */
  @Event() erxCopy!: EventEmitter<{ code: string; success: boolean }>;

  private get lines(): string[] {
    return this.code.split('\n');
  }

  private get highlightedLineNumbers(): Set<number> {
    if (!this.highlightLines) return new Set();

    if (Array.isArray(this.highlightLines)) {
      return new Set(this.highlightLines);
    }

    // Parse comma-separated string
    const nums = this.highlightLines.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
    return new Set(nums);
  }

  /** Copy code to clipboard */
  @Method()
  async copyCode(): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(this.code);
      this.copied = true;
      this.erxCopy.emit({ code: this.code, success: true });

      setTimeout(() => {
        this.copied = false;
      }, 2000);

      return true;
    } catch (err) {
      this.erxCopy.emit({ code: this.code, success: false });
      return false;
    }
  }

  private handleCopy = () => {
    this.copyCode();
  };

  render() {
    const style: any = {};
    if (this.maxHeight) {
      style.maxHeight = this.maxHeight;
    }

    return (
      <div
        class={{
          'erx-cb': true,
          'erx-cb--wrap': this.wordWrap,
        }}
        part="container"
      >
        {(this.fileName || this.language || this.showCopy) && (
          <div class="erx-cb__header" part="header">
            <div class="erx-cb__meta">
              {this.fileName && (
                <span class="erx-cb__filename" part="filename">{this.fileName}</span>
              )}
              {this.showLanguage && this.language && !this.fileName && (
                <span class="erx-cb__lang" part="language">{this.language}</span>
              )}
            </div>
            {this.showCopy && (
              <button
                type="button"
                class="erx-cb__copy"
                part="copy"
                onClick={this.handleCopy}
                aria-label="Copy code"
              >
                {this.copied ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                )}
                <span>{this.copied ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>
        )}

        <div class="erx-cb__content" part="content" style={style}>
          <pre class="erx-cb__pre">
            <code class={`erx-cb__code language-${this.language || 'text'}`}>
              {this.lines.map((line, idx) => {
                const lineNum = idx + 1;
                const isHighlighted = this.highlightedLineNumbers.has(lineNum);

                return (
                  <div
                    class={{
                      'erx-cb__line': true,
                      'erx-cb__line--highlighted': isHighlighted,
                    }}
                  >
                    {this.showLineNumbers && (
                      <span class="erx-cb__ln">{lineNum}</span>
                    )}
                    <span class="erx-cb__text">{line || ' '}</span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      </div>
    );
  }
}
