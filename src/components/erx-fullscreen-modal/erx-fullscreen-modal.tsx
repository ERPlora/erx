import { Component, Prop, State, Event, EventEmitter, Method, Listen, h } from '@stencil/core';

@Component({
  tag: 'erx-fullscreen-modal',
  styleUrl: 'erx-fullscreen-modal.css',
  shadow: true,
})
export class ErxFullscreenModal {
  /** Whether the modal is open */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Modal title */
  @Prop() modalTitle?: string;

  /** Show close button */
  @Prop() showClose = true;

  /** Close on escape key */
  @Prop() escapeClose = true;

  /** Animation type */
  @Prop() animation: 'fade' | 'slide-up' | 'zoom' = 'fade';

  /** Show header bar */
  @Prop() showHeader = true;

  /** Custom background color */
  @Prop() background?: string;

  /** Internal animation state */
  @State() isAnimating = false;

  /** Emitted when modal opens */
  @Event() erxOpen!: EventEmitter<void>;

  /** Emitted when modal closes */
  @Event() erxClose!: EventEmitter<void>;

  @Listen('keydown', { target: 'window' })
  handleKeyDown(ev: KeyboardEvent) {
    if (this.open && this.escapeClose && ev.key === 'Escape') {
      this.close();
    }
  }

  /** Open the modal */
  @Method()
  async show(): Promise<void> {
    this.open = true;
    this.erxOpen.emit();
    document.body.style.overflow = 'hidden';
  }

  /** Close the modal */
  @Method()
  async close(): Promise<void> {
    this.isAnimating = true;
    setTimeout(() => {
      this.open = false;
      this.isAnimating = false;
      this.erxClose.emit();
      document.body.style.overflow = '';
    }, 200);
  }

  private handleClose = () => {
    this.close();
  };

  render() {
    if (!this.open && !this.isAnimating) return null;

    const style = this.background ? { '--erx-fsm-bg': this.background } : {};

    return (
      <div
        class={{
          'erx-fsm': true,
          'erx-fsm--closing': this.isAnimating,
          [`erx-fsm--${this.animation}`]: true,
        }}
        style={style}
        part="container"
      >
        {this.showHeader && (
          <header class="erx-fsm__header" part="header">
            <div class="erx-fsm__title" part="title">
              {this.modalTitle}
            </div>
            <div class="erx-fsm__actions" part="actions">
              <slot name="header-actions"></slot>
              {this.showClose && (
                <button
                  type="button"
                  class="erx-fsm__close"
                  part="close"
                  onClick={this.handleClose}
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </header>
        )}

        {!this.showHeader && this.showClose && (
          <button
            type="button"
            class="erx-fsm__close erx-fsm__close--floating"
            part="close"
            onClick={this.handleClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <main class="erx-fsm__content" part="content">
          <slot></slot>
        </main>

        <footer class="erx-fsm__footer" part="footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    );
  }
}
