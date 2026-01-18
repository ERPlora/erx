import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';
import { ErxPaginationChangeEvent, ErxPageSizeChangeEvent } from './erx-pagination.types';

@Component({
  tag: 'erx-pagination',
  styleUrl: 'erx-pagination.css',
  shadow: true,
})
export class ErxPagination {
  /** Current page (1-indexed) */
  @Prop() page: number = 1;

  /** Total number of items */
  @Prop() total: number = 0;

  /** Items per page */
  @Prop() perPage: number = 10;

  /** Maximum visible page buttons */
  @Prop() maxVisible: number = 5;

  /** Show first/last buttons */
  @Prop() showFirstLast: boolean = true;

  /** Show prev/next buttons */
  @Prop() showPrevNext: boolean = true;

  /** Show page size selector */
  @Prop() showPageSize: boolean = false;

  /** Available page sizes */
  @Prop() pageSizes: number[] = [10, 25, 50, 100];

  /** Show total count */
  @Prop() showTotal: boolean = false;

  /** Show current range */
  @Prop() showRange: boolean = true;

  /** Compact mode */
  @Prop({ reflect: true }) compact: boolean = false;

  /** Disabled state */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Page change event */
  @Event() erxPageChange!: EventEmitter<ErxPaginationChangeEvent>;

  /** Page size change event */
  @Event() erxPageSizeChange!: EventEmitter<ErxPageSizeChangeEvent>;

  @State() pageSizeOpen: boolean = false;

  private get totalPages(): number {
    return Math.ceil(this.total / this.perPage);
  }

  private get visiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.page;
    const max = this.maxVisible;

    if (total <= max) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(max / 2);
      let start = current - half;
      let end = current + half;

      if (start < 1) {
        start = 1;
        end = max;
      }

      if (end > total) {
        end = total;
        start = total - max + 1;
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < total) {
          pages.push(i);
        }
      }

      if (end < total) {
        if (end < total - 1) pages.push('...');
        pages.push(total);
      }
    }

    return pages;
  }

  private get rangeStart(): number {
    return (this.page - 1) * this.perPage + 1;
  }

  private get rangeEnd(): number {
    return Math.min(this.page * this.perPage, this.total);
  }

  private goToPage(newPage: number): void {
    if (this.disabled || newPage < 1 || newPage > this.totalPages || newPage === this.page) return;

    this.erxPageChange.emit({
      page: newPage,
      perPage: this.perPage,
      offset: (newPage - 1) * this.perPage,
    });
  }

  private changePageSize(newSize: number): void {
    this.pageSizeOpen = false;
    if (newSize === this.perPage) return;

    // Recalculate page to keep similar position
    const newPage = Math.min(
      Math.ceil(this.rangeStart / newSize),
      Math.ceil(this.total / newSize)
    );

    this.erxPageSizeChange.emit({
      perPage: newSize,
      page: newPage,
    });
  }

  render() {
    const totalPages = this.totalPages;

    if (totalPages <= 1 && !this.showPageSize && !this.showTotal) {
      return null;
    }

    return (
      <nav
        class={{
          'erx-pagination': true,
          'erx-pagination--compact': this.compact,
          'erx-pagination--disabled': this.disabled,
        }}
        part="container"
        role="navigation"
        aria-label="Pagination"
      >
        {/* Total count */}
        {this.showTotal && (
          <span class="erx-pagination__total" part="total">
            {this.total.toLocaleString()} items
          </span>
        )}

        {/* Page size selector */}
        {this.showPageSize && (
          <div class="erx-pagination__size" part="size">
            <span class="erx-pagination__size-label">Show</span>
            <div class="erx-pagination__size-select">
              <button
                class="erx-pagination__size-btn"
                onClick={() => this.pageSizeOpen = !this.pageSizeOpen}
                disabled={this.disabled}
              >
                {this.perPage}
                <span class="erx-pagination__chevron">▼</span>
              </button>
              {this.pageSizeOpen && (
                <div class="erx-pagination__size-dropdown">
                  {this.pageSizes.map(size => (
                    <button
                      class={{
                        'erx-pagination__size-option': true,
                        'erx-pagination__size-option--active': size === this.perPage,
                      }}
                      onClick={() => this.changePageSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Range display */}
        {this.showRange && this.total > 0 && (
          <span class="erx-pagination__range" part="range">
            {this.rangeStart}-{this.rangeEnd} of {this.total.toLocaleString()}
          </span>
        )}

        {/* Navigation */}
        <div class="erx-pagination__nav" part="nav">
          {/* First */}
          {this.showFirstLast && (
            <button
              class="erx-pagination__btn erx-pagination__btn--first"
              onClick={() => this.goToPage(1)}
              disabled={this.disabled || this.page === 1}
              aria-label="First page"
              part="btn-first"
            >
              ⟨⟨
            </button>
          )}

          {/* Previous */}
          {this.showPrevNext && (
            <button
              class="erx-pagination__btn erx-pagination__btn--prev"
              onClick={() => this.goToPage(this.page - 1)}
              disabled={this.disabled || this.page === 1}
              aria-label="Previous page"
              part="btn-prev"
            >
              ⟨
            </button>
          )}

          {/* Page numbers */}
          {!this.compact && (
            <div class="erx-pagination__pages" part="pages">
              {this.visiblePages.map(p =>
                p === '...' ? (
                  <span class="erx-pagination__ellipsis">...</span>
                ) : (
                  <button
                    class={{
                      'erx-pagination__btn': true,
                      'erx-pagination__btn--page': true,
                      'erx-pagination__btn--active': p === this.page,
                    }}
                    onClick={() => this.goToPage(p as number)}
                    disabled={this.disabled}
                    aria-current={p === this.page ? 'page' : undefined}
                    part="btn-page"
                  >
                    {p}
                  </button>
                )
              )}
            </div>
          )}

          {/* Compact page indicator */}
          {this.compact && (
            <span class="erx-pagination__current" part="current">
              {this.page} / {totalPages}
            </span>
          )}

          {/* Next */}
          {this.showPrevNext && (
            <button
              class="erx-pagination__btn erx-pagination__btn--next"
              onClick={() => this.goToPage(this.page + 1)}
              disabled={this.disabled || this.page === totalPages}
              aria-label="Next page"
              part="btn-next"
            >
              ⟩
            </button>
          )}

          {/* Last */}
          {this.showFirstLast && (
            <button
              class="erx-pagination__btn erx-pagination__btn--last"
              onClick={() => this.goToPage(totalPages)}
              disabled={this.disabled || this.page === totalPages}
              aria-label="Last page"
              part="btn-last"
            >
              ⟩⟩
            </button>
          )}
        </div>
      </nav>
    );
  }
}
