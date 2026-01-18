import { Component, Prop, State, Event, EventEmitter, Method, h } from '@stencil/core';
import { ErxSnackbarPosition, ErxSnackbarVariant } from './erx-snackbar.types';

@Component({
  tag: 'erx-snackbar',
  styleUrl: 'erx-snackbar.css',
  shadow: true,
})
export class ErxSnackbar {
  /** Whether the snackbar is visible */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Message text */
  @Prop() message = '';

  /** Snackbar variant */
  @Prop() variant: ErxSnackbarVariant = 'default';

  /** Duration in ms (0 = persistent) */
  @Prop() duration = 4000;

  /** Position on screen */
  @Prop() position: ErxSnackbarPosition = 'bottom';

  /** Action button text */
  @Prop() actionText?: string;

  /** Show close button */
  @Prop() showClose = false;

  /** Icon to display */
  @Prop() icon?: string;

  /** Internal animation state */
  @State() isClosing = false;

  /** Emitted when snackbar closes */
  @Event() erxClose!: EventEmitter<void>;

  /** Emitted when action button clicked */
  @Event() erxAction!: EventEmitter<void>;

  private timer?: number;

  /** Show the snackbar */
  @Method()
  async show(message?: string): Promise<void> {
    if (message) {
      (this as any).message = message;
    }
    this.open = true;
    this.isClosing = false;
    this.startTimer();
  }

  /** Hide the snackbar */
  @Method()
  async hide(): Promise<void> {
    this.clearTimer();
    this.isClosing = true;
    setTimeout(() => {
      this.open = false;
      this.isClosing = false;
      this.erxClose.emit();
    }, 200);
  }

  private startTimer() {
    this.clearTimer();
    if (this.duration > 0) {
      this.timer = window.setTimeout(() => {
        this.hide();
      }, this.duration);
    }
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  private handleAction = () => {
    this.erxAction.emit();
    this.hide();
  };

  private handleClose = () => {
    this.hide();
  };

  private getIcon() {
    if (this.icon) return this.icon;
    switch (this.variant) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return null;
    }
  }

  render() {
    if (!this.open && !this.isClosing) return null;

    const icon = this.getIcon();

    return (
      <div
        class={{
          'erx-snackbar': true,
          'erx-snackbar--closing': this.isClosing,
          [`erx-snackbar--${this.variant}`]: true,
          [`erx-snackbar--${this.position}`]: true,
        }}
        part="container"
        role="alert"
        aria-live="polite"
      >
        {icon && (
          <span class="erx-snackbar__icon" part="icon">{icon}</span>
        )}
        <span class="erx-snackbar__message" part="message">{this.message}</span>

        {this.actionText && (
          <button
            type="button"
            class="erx-snackbar__action"
            part="action"
            onClick={this.handleAction}
          >
            {this.actionText}
          </button>
        )}

        {this.showClose && (
          <button
            type="button"
            class="erx-snackbar__close"
            part="close"
            onClick={this.handleClose}
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
}
