import { Component, Prop, Event, EventEmitter, h, Element, Method, Watch, Listen } from '@stencil/core';
import { ErxDrawerPosition, ErxDrawerSize, ErxDrawerOpenEvent } from './erx-drawer.types';

@Component({
  tag: 'erx-drawer',
  styleUrl: 'erx-drawer.css',
  shadow: true,
})
export class ErxDrawer {
  @Element() el!: HTMLElement;

  /** Drawer position */
  @Prop() position: ErxDrawerPosition = 'right';

  /** Drawer size */
  @Prop() size: ErxDrawerSize = 'md';

  /** Custom width */
  @Prop() width?: string;

  /** Drawer title */
  @Prop() headerTitle?: string;

  /** Show backdrop */
  @Prop() backdrop: boolean = true;

  /** Close on backdrop click */
  @Prop() backdropDismiss: boolean = true;

  /** Show close button */
  @Prop() showClose: boolean = true;

  /** Enable keyboard close (Escape) */
  @Prop() keyboardClose: boolean = true;

  /** Open state */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /** Open/close event */
  @Event() erxOpenChange!: EventEmitter<ErxDrawerOpenEvent>;

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    this.erxOpenChange.emit({ open: newValue });
    if (newValue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  @Listen('keydown', { target: 'document' })
  handleKeyDown(e: KeyboardEvent) {
    if (this.keyboardClose && e.key === 'Escape' && this.open) {
      this.open = false;
    }
  }

  @Method()
  async present(): Promise<void> {
    this.open = true;
  }

  @Method()
  async dismiss(): Promise<void> {
    this.open = false;
  }

  private handleBackdropClick = () => {
    if (this.backdropDismiss) {
      this.open = false;
    }
  };

  private handleClose = () => {
    this.open = false;
  };

  private getWidthValue(): string {
    if (this.width) return this.width;

    const sizes: Record<ErxDrawerSize, string> = {
      sm: '280px',
      md: '400px',
      lg: '560px',
      xl: '720px',
      full: '100%',
    };

    return sizes[this.size];
  }

  render() {
    if (!this.open) return null;

    return (
      <div class="erx-drawer__container" part="container">
        {/* Backdrop */}
        {this.backdrop && (
          <div
            class="erx-drawer__backdrop"
            onClick={this.handleBackdropClick}
            part="backdrop"
          />
        )}

        {/* Drawer */}
        <div
          class={{
            'erx-drawer': true,
            [`erx-drawer--${this.position}`]: true,
          }}
          style={{ width: this.getWidthValue() }}
          part="drawer"
        >
          {/* Header */}
          {(this.headerTitle || this.showClose) && (
            <header class="erx-drawer__header" part="header">
              {this.headerTitle && (
                <h2 class="erx-drawer__title">{this.headerTitle}</h2>
              )}
              <slot name="header" />
              {this.showClose && (
                <button
                  class="erx-drawer__close"
                  onClick={this.handleClose}
                  aria-label="Close drawer"
                  part="close"
                >
                  ✕
                </button>
              )}
            </header>
          )}

          {/* Content */}
          <div class="erx-drawer__content" part="content">
            <slot />
          </div>

          {/* Footer */}
          <footer class="erx-drawer__footer" part="footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    );
  }
}
