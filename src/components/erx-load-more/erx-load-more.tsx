import { Component, Prop, State, Event, EventEmitter, Method, Element, Watch, h } from '@stencil/core';
import { ErxLoadMoreMode, ErxLoadMoreStatus, ErxLoadMoreEvent } from './erx-load-more.types';

@Component({
  tag: 'erx-load-more',
  styleUrl: 'erx-load-more.css',
  shadow: true,
})
export class ErxLoadMore {
  @Element() el!: HTMLElement;

  /** Mode: button, infinite scroll, or auto */
  @Prop() mode: ErxLoadMoreMode = 'button';

  /** Text for load more button */
  @Prop() loadText = 'Load More';

  /** Text while loading */
  @Prop() loadingText = 'Loading...';

  /** Text when all items loaded */
  @Prop() completeText = 'All items loaded';

  /** Text on error */
  @Prop() errorText = 'Failed to load';

  /** Retry button text */
  @Prop() retryText = 'Retry';

  /** Threshold in pixels for infinite scroll */
  @Prop() threshold = 200;

  /** Disable the component */
  @Prop({ reflect: true }) disabled = false;

  /** Current status */
  @State() status: ErxLoadMoreStatus = 'idle';

  /** Current page */
  @State() page = 1;

  /** Error message */
  @State() errorMessage = '';

  /** Emitted when more items should be loaded */
  @Event() erxLoadMore!: EventEmitter<ErxLoadMoreEvent>;

  private observer?: IntersectionObserver;
  private sentinelEl?: HTMLDivElement;

  componentDidLoad() {
    if (this.mode === 'infinite' || this.mode === 'auto') {
      this.setupIntersectionObserver();
    }
  }

  disconnectedCallback() {
    this.cleanupObserver();
  }

  @Watch('mode')
  onModeChange() {
    this.cleanupObserver();
    if (this.mode === 'infinite' || this.mode === 'auto') {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver() {
    if (!this.sentinelEl) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && this.status === 'idle' && !this.disabled) {
          this.triggerLoad();
        }
      },
      {
        rootMargin: `${this.threshold}px`,
        threshold: 0,
      }
    );

    this.observer.observe(this.sentinelEl);
  }

  private cleanupObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
  }

  private triggerLoad() {
    if (this.status === 'loading' || this.status === 'complete' || this.disabled) return;

    this.status = 'loading';
    this.errorMessage = '';

    this.erxLoadMore.emit({
      page: this.page,
      done: (hasMore: boolean) => {
        if (hasMore) {
          this.page++;
          this.status = 'idle';
        } else {
          this.status = 'complete';
        }
      },
      error: (message?: string) => {
        this.status = 'error';
        this.errorMessage = message || this.errorText;
      },
    });
  }

  private handleClick = () => {
    this.triggerLoad();
  };

  private handleRetry = () => {
    this.triggerLoad();
  };

  /** Reset the component to initial state */
  @Method()
  async reset(): Promise<void> {
    this.page = 1;
    this.status = 'idle';
    this.errorMessage = '';
  }

  /** Mark as complete (no more items) */
  @Method()
  async complete(): Promise<void> {
    this.status = 'complete';
  }

  render() {
    return (
      <div
        class={{
          'erx-lm': true,
          'erx-lm--disabled': this.disabled,
          [`erx-lm--${this.status}`]: true,
        }}
        part="container"
      >
        {this.status === 'idle' && this.mode === 'button' && (
          <button
            type="button"
            class="erx-lm__button"
            part="button"
            onClick={this.handleClick}
            disabled={this.disabled}
          >
            {this.loadText}
          </button>
        )}

        {this.status === 'loading' && (
          <div class="erx-lm__loading" part="loading">
            <div class="erx-lm__spinner" part="spinner"></div>
            <span class="erx-lm__text">{this.loadingText}</span>
          </div>
        )}

        {this.status === 'error' && (
          <div class="erx-lm__error" part="error">
            <span class="erx-lm__error-text">{this.errorMessage || this.errorText}</span>
            <button
              type="button"
              class="erx-lm__retry"
              part="retry"
              onClick={this.handleRetry}
            >
              {this.retryText}
            </button>
          </div>
        )}

        {this.status === 'complete' && (
          <div class="erx-lm__complete" part="complete">
            <span class="erx-lm__complete-text">{this.completeText}</span>
          </div>
        )}

        {/* Sentinel for infinite scroll */}
        {(this.mode === 'infinite' || this.mode === 'auto') && this.status !== 'complete' && (
          <div
            class="erx-lm__sentinel"
            ref={(el) => (this.sentinelEl = el)}
          ></div>
        )}
      </div>
    );
  }
}
