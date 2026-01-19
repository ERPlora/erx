import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'erx-quantity-badge',
  styleUrl: 'erx-quantity-badge.css',
  shadow: true,
})
export class ErxQuantityBadge {
  /**
   * Quantity value to display
   */
  @Prop() value: number = 0;

  /**
   * Maximum value to display before showing "+" (e.g., "9+")
   */
  @Prop() max: number = 99;

  /**
   * Show badge even when value is 0
   */
  @Prop() showZero: boolean = false;

  /**
   * Badge size
   */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Badge color variant
   */
  @Prop({ reflect: true }) color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';

  /**
   * Position of the badge
   */
  @Prop({ reflect: true }) position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';

  /**
   * Pulse animation
   */
  @Prop({ reflect: true }) pulse: boolean = false;

  private getDisplayValue(): string {
    if (this.value > this.max) {
      return `${this.max}+`;
    }
    return this.value.toString();
  }

  render() {
    if (this.value === 0 && !this.showZero) {
      return null;
    }

    return (
      <div class="quantity-badge" part="badge">
        {this.getDisplayValue()}
      </div>
    );
  }
}
