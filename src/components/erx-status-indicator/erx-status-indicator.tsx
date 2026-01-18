import { Component, Prop, h } from '@stencil/core';
import { ErxStatusIndicatorStatus, ErxStatusIndicatorSize, ErxStatusIndicatorVariant } from './erx-status-indicator.types';

@Component({
  tag: 'erx-status-indicator',
  styleUrl: 'erx-status-indicator.css',
  shadow: true,
})
export class ErxStatusIndicator {
  /** Status type */
  @Prop() status: ErxStatusIndicatorStatus = 'neutral';

  /** Size */
  @Prop() size: ErxStatusIndicatorSize = 'md';

  /** Display variant */
  @Prop() variant: ErxStatusIndicatorVariant = 'dot';

  /** Label text */
  @Prop() label?: string;

  /** Pulse animation */
  @Prop() pulse = false;

  private getDefaultLabel(): string {
    if (this.label) return this.label;
    switch (this.status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'away': return 'Away';
      case 'busy': return 'Busy';
      case 'success': return 'Success';
      case 'warning': return 'Warning';
      case 'error': return 'Error';
      default: return 'Status';
    }
  }

  render() {
    const showLabel = this.variant !== 'dot' && (this.label || this.variant === 'badge' || this.variant === 'pill');

    return (
      <span
        class={{
          'erx-si': true,
          [`erx-si--${this.status}`]: true,
          [`erx-si--${this.size}`]: true,
          [`erx-si--${this.variant}`]: true,
          'erx-si--pulse': this.pulse,
        }}
        part="container"
        role="status"
        aria-label={this.getDefaultLabel()}
      >
        <span class="erx-si__dot" part="dot"></span>
        {showLabel && (
          <span class="erx-si__label" part="label">{this.getDefaultLabel()}</span>
        )}
      </span>
    );
  }
}
