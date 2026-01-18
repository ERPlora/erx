import { Component, Prop, State, Event, EventEmitter, Method, h } from '@stencil/core';
import { ErxBannerVariant, ErxBannerPosition } from './erx-banner.types';

@Component({
  tag: 'erx-banner',
  styleUrl: 'erx-banner.css',
  shadow: true,
})
export class ErxBanner {
  /** Whether the banner is visible */
  @Prop({ mutable: true, reflect: true }) visible = true;

  /** Banner variant */
  @Prop() variant: ErxBannerVariant = 'info';

  /** Position */
  @Prop() position: ErxBannerPosition = 'inline';

  /** Dismissible */
  @Prop() dismissible = true;

  /** Icon to show */
  @Prop() icon?: string;

  /** Action button text */
  @Prop() actionText?: string;

  /** Sticky when scrolling */
  @Prop() sticky = false;

  /** Animation state */
  @State() isClosing = false;

  /** Emitted when banner is dismissed */
  @Event() erxDismiss!: EventEmitter<void>;

  /** Emitted when action button is clicked */
  @Event() erxAction!: EventEmitter<void>;

  private getDefaultIcon(): string {
    if (this.icon) return this.icon;
    switch (this.variant) {
      case 'info': return 'ℹ️';
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'error': return '✕';
      default: return '';
    }
  }

  /** Show the banner */
  @Method()
  async show(): Promise<void> {
    this.visible = true;
    this.isClosing = false;
  }

  /** Hide the banner */
  @Method()
  async hide(): Promise<void> {
    this.isClosing = true;
    setTimeout(() => {
      this.visible = false;
      this.isClosing = false;
      this.erxDismiss.emit();
    }, 200);
  }

  private handleDismiss = () => {
    this.hide();
  };

  private handleAction = () => {
    this.erxAction.emit();
  };

  render() {
    if (!this.visible && !this.isClosing) return null;

    const icon = this.getDefaultIcon();

    return (
      <div
        class={{
          'erx-banner': true,
          'erx-banner--closing': this.isClosing,
          [`erx-banner--${this.variant}`]: true,
          [`erx-banner--${this.position}`]: true,
          'erx-banner--sticky': this.sticky,
        }}
        part="container"
        role="alert"
      >
        <div class="erx-banner__content" part="content">
          {icon && (
            <span class="erx-banner__icon" part="icon">{icon}</span>
          )}
          <div class="erx-banner__text" part="text">
            <slot></slot>
          </div>
          {this.actionText && (
            <button
              type="button"
              class="erx-banner__action"
              part="action"
              onClick={this.handleAction}
            >
              {this.actionText}
            </button>
          )}
        </div>
        {this.dismissible && (
          <button
            type="button"
            class="erx-banner__close"
            part="close"
            onClick={this.handleDismiss}
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
}
