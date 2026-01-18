import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { ErxStateType } from './erx-state.types';

@Component({
  tag: 'erx-state',
  styleUrl: 'erx-state.css',
  shadow: true,
})
export class ErxState {
  /** State type */
  @Prop() type: ErxStateType = 'empty';

  /** Title text */
  @Prop() stateTitle?: string;

  /** Description text */
  @Prop() description?: string;

  /** Custom icon (emoji or text) */
  @Prop() icon?: string;

  /** Primary action button text */
  @Prop() actionText?: string;

  /** Secondary action button text */
  @Prop() secondaryActionText?: string;

  /** Compact mode */
  @Prop() compact = false;

  /** Emitted when action button clicked */
  @Event() erxAction!: EventEmitter<{ action: 'primary' | 'secondary' }>;

  private getDefaultIcon(): string {
    switch (this.type) {
      case 'empty': return '📭';
      case 'error': return '⚠️';
      case 'loading': return '';
      case 'success': return '✅';
      default: return '📋';
    }
  }

  private getDefaultTitle(): string {
    switch (this.type) {
      case 'empty': return 'No data';
      case 'error': return 'Something went wrong';
      case 'loading': return 'Loading...';
      case 'success': return 'Success!';
      default: return '';
    }
  }

  private handlePrimaryClick = () => {
    this.erxAction.emit({ action: 'primary' });
  };

  private handleSecondaryClick = () => {
    this.erxAction.emit({ action: 'secondary' });
  };

  render() {
    const icon = this.icon || this.getDefaultIcon();
    const title = this.stateTitle || this.getDefaultTitle();

    return (
      <div
        class={{
          'erx-state': true,
          'erx-state--compact': this.compact,
          [`erx-state--${this.type}`]: true,
        }}
        part="container"
      >
        {this.type === 'loading' ? (
          <div class="erx-state__spinner" part="spinner"></div>
        ) : icon ? (
          <div class="erx-state__icon" part="icon">{icon}</div>
        ) : null}

        <slot name="icon"></slot>

        {title && (
          <h3 class="erx-state__title" part="title">{title}</h3>
        )}

        {this.description && (
          <p class="erx-state__desc" part="description">{this.description}</p>
        )}

        <slot name="content"></slot>

        {(this.actionText || this.secondaryActionText) && (
          <div class="erx-state__actions" part="actions">
            {this.actionText && (
              <button
                type="button"
                class="erx-state__btn erx-state__btn--primary"
                part="action-primary"
                onClick={this.handlePrimaryClick}
              >
                {this.actionText}
              </button>
            )}
            {this.secondaryActionText && (
              <button
                type="button"
                class="erx-state__btn erx-state__btn--secondary"
                part="action-secondary"
                onClick={this.handleSecondaryClick}
              >
                {this.secondaryActionText}
              </button>
            )}
          </div>
        )}

        <slot></slot>
      </div>
    );
  }
}
