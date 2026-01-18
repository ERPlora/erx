import { Component, Prop, Event, EventEmitter, State, h, Element, Method, Watch } from '@stencil/core';
import { ErxPdfPageChangeEvent, ErxPdfLoadEvent, ErxPdfErrorEvent } from './erx-pdf-viewer.types';

@Component({
  tag: 'erx-pdf-viewer',
  styleUrl: 'erx-pdf-viewer.css',
  shadow: true,
})
export class ErxPdfViewer {
  @Element() el!: HTMLElement;

  /** PDF source URL or base64 */
  @Prop() src?: string;

  /** Initial page number */
  @Prop({ mutable: true }) page: number = 1;

  /** Initial zoom level */
  @Prop({ mutable: true }) zoom: number = 1;

  /** Show toolbar */
  @Prop() showToolbar: boolean = true;

  /** Show page navigation */
  @Prop() showNavigation: boolean = true;

  /** Show zoom controls */
  @Prop() showZoom: boolean = true;

  /** Show download button */
  @Prop() showDownload: boolean = true;

  /** Show print button */
  @Prop() showPrint: boolean = true;

  /** Fit mode */
  @Prop() fitMode: 'page' | 'width' | 'height' = 'width';

  /** Page change event */
  @Event() erxPageChange!: EventEmitter<ErxPdfPageChangeEvent>;

  /** Load event */
  @Event() erxLoad!: EventEmitter<ErxPdfLoadEvent>;

  /** Error event */
  @Event() erxError!: EventEmitter<ErxPdfErrorEvent>;

  @State() totalPages: number = 0;
  @State() isLoading: boolean = true;
  @State() error?: string;

  private iframeEl?: HTMLIFrameElement;

  @Watch('src')
  handleSrcChange() {
    this.loadPdf();
  }

  componentDidLoad() {
    this.loadPdf();
  }

  @Method()
  async goToPage(pageNum: number): Promise<void> {
    if (pageNum >= 1 && pageNum <= this.totalPages) {
      this.page = pageNum;
      this.erxPageChange.emit({ page: this.page, totalPages: this.totalPages });
    }
  }

  @Method()
  async nextPage(): Promise<void> {
    this.goToPage(this.page + 1);
  }

  @Method()
  async prevPage(): Promise<void> {
    this.goToPage(this.page - 1);
  }

  @Method()
  async setZoom(level: number): Promise<void> {
    this.zoom = Math.max(0.25, Math.min(4, level));
  }

  @Method()
  async zoomIn(): Promise<void> {
    this.setZoom(this.zoom + 0.25);
  }

  @Method()
  async zoomOut(): Promise<void> {
    this.setZoom(this.zoom - 0.25);
  }

  @Method()
  async download(): Promise<void> {
    if (this.src) {
      const link = document.createElement('a');
      link.href = this.src;
      link.download = 'document.pdf';
      link.click();
    }
  }

  @Method()
  async print(): Promise<void> {
    if (this.iframeEl?.contentWindow) {
      this.iframeEl.contentWindow.print();
    }
  }

  private loadPdf(): void {
    if (!this.src) {
      this.error = 'No PDF source provided';
      return;
    }

    this.isLoading = true;
    this.error = undefined;

    // For simplicity, we'll use an iframe with browser's built-in PDF viewer
    // In production, consider using PDF.js for more control
  }

  private handleIframeLoad = () => {
    this.isLoading = false;
    // Note: Getting page count requires PDF.js or similar library
    this.totalPages = 1; // Placeholder
    this.erxLoad.emit({
      totalPages: this.totalPages,
      pageWidth: 0,
      pageHeight: 0,
    });
  };

  private handleIframeError = () => {
    this.isLoading = false;
    this.error = 'Failed to load PDF';
    this.erxError.emit({ error: this.error });
  };

  private handlePageInput = (e: Event) => {
    const value = parseInt((e.target as HTMLInputElement).value, 10);
    if (!isNaN(value)) {
      this.goToPage(value);
    }
  };

  render() {
    const pdfUrl = this.src ? `${this.src}#page=${this.page}&zoom=${this.zoom * 100}` : '';

    return (
      <div class="erx-pdf" part="container">
        {/* Toolbar */}
        {this.showToolbar && (
          <div class="erx-pdf__toolbar" part="toolbar">
            {/* Navigation */}
            {this.showNavigation && (
              <div class="erx-pdf__nav">
                <button
                  class="erx-pdf__btn"
                  onClick={() => this.prevPage()}
                  disabled={this.page <= 1}
                  title="Previous page"
                >
                  ◀
                </button>
                <div class="erx-pdf__page-info">
                  <input
                    type="number"
                    class="erx-pdf__page-input"
                    value={this.page}
                    min="1"
                    max={this.totalPages}
                    onInput={this.handlePageInput}
                  />
                  <span>/ {this.totalPages || '?'}</span>
                </div>
                <button
                  class="erx-pdf__btn"
                  onClick={() => this.nextPage()}
                  disabled={this.page >= this.totalPages}
                  title="Next page"
                >
                  ▶
                </button>
              </div>
            )}

            {/* Zoom */}
            {this.showZoom && (
              <div class="erx-pdf__zoom">
                <button
                  class="erx-pdf__btn"
                  onClick={() => this.zoomOut()}
                  disabled={this.zoom <= 0.25}
                  title="Zoom out"
                >
                  −
                </button>
                <span class="erx-pdf__zoom-level">{Math.round(this.zoom * 100)}%</span>
                <button
                  class="erx-pdf__btn"
                  onClick={() => this.zoomIn()}
                  disabled={this.zoom >= 4}
                  title="Zoom in"
                >
                  +
                </button>
              </div>
            )}

            {/* Actions */}
            <div class="erx-pdf__actions">
              {this.showDownload && (
                <button
                  class="erx-pdf__btn"
                  onClick={() => this.download()}
                  title="Download"
                >
                  ⬇
                </button>
              )}
              {this.showPrint && (
                <button
                  class="erx-pdf__btn"
                  onClick={() => this.print()}
                  title="Print"
                >
                  🖨
                </button>
              )}
            </div>
          </div>
        )}

        {/* Viewer */}
        <div class="erx-pdf__viewer" part="viewer">
          {this.isLoading && (
            <div class="erx-pdf__loading">
              <div class="erx-pdf__spinner" />
              <span>Loading PDF...</span>
            </div>
          )}

          {this.error && (
            <div class="erx-pdf__error">
              <span>⚠️ {this.error}</span>
            </div>
          )}

          {this.src && !this.error && (
            <iframe
              ref={el => this.iframeEl = el}
              src={pdfUrl}
              class="erx-pdf__iframe"
              onLoad={this.handleIframeLoad}
              onError={this.handleIframeError}
              part="iframe"
            />
          )}

          {!this.src && !this.error && (
            <div class="erx-pdf__empty">
              <span>📄</span>
              <p>No PDF loaded</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
