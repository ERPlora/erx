import {
  Component,
  Prop,
  h,
  Element,
} from '@stencil/core';
import type { ErxStockLevel } from './erx-stock-indicator.types';

@Component({
  tag: 'erx-stock-indicator',
  styleUrl: 'erx-stock-indicator.css',
  shadow: true,
})
export class ErxStockIndicator {
  @Element() el!: HTMLElement;

  // ========================================
  // Props
  // ========================================

  /** Current stock quantity */
  @Prop() quantity = 0;

  /** Low stock threshold */
  @Prop() lowThreshold = 5;

  /** Show quantity number */
  @Prop() showQuantity = true;

  /** Show label text */
  @Prop() showLabel = true;

  /** Custom labels */
  @Prop() labels: Record<ErxStockLevel, string> = {
    'in-stock': 'In Stock',
    'low': 'Low Stock',
    'out': 'Out of Stock',
    'backorder': 'Backorder',
  };

  /** Enable backorder state (quantity < 0) */
  @Prop() allowBackorder = false;

  /** Size variant */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /** Display style */
  @Prop() variant: 'dot' | 'badge' | 'bar' = 'dot';

  /** Maximum stock for bar visualization */
  @Prop() maxStock = 100;

  // ========================================
  // Private Methods
  // ========================================

  private getStockLevel(): ErxStockLevel {
    if (this.quantity <= 0) {
      return this.allowBackorder && this.quantity < 0 ? 'backorder' : 'out';
    }
    if (this.quantity <= this.lowThreshold) {
      return 'low';
    }
    return 'in-stock';
  }

  private getLabel(): string {
    const level = this.getStockLevel();
    return this.labels[level];
  }

  private getBarWidth(): number {
    if (this.quantity <= 0) return 0;
    return Math.min(100, (this.quantity / this.maxStock) * 100);
  }

  // ========================================
  // Render
  // ========================================

  render() {
    const level = this.getStockLevel();
    const label = this.getLabel();

    return (
      <div
        class={{
          'erx-stock': true,
          [`erx-stock--${level}`]: true,
          [`erx-stock--${this.size}`]: true,
          [`erx-stock--${this.variant}`]: true,
        }}
        part="container"
        role="status"
        aria-label={`${label}${this.showQuantity ? `: ${this.quantity}` : ''}`}
      >
        {this.variant === 'dot' && (
          <span class="erx-stock__dot" part="dot" />
        )}

        {this.variant === 'badge' && (
          <span class="erx-stock__badge" part="badge">
            {this.showQuantity ? this.quantity : level === 'out' ? '!' : '✓'}
          </span>
        )}

        {this.variant === 'bar' && (
          <div class="erx-stock__bar-wrapper" part="bar-wrapper">
            <div
              class="erx-stock__bar"
              part="bar"
              style={{ width: `${this.getBarWidth()}%` }}
            />
          </div>
        )}

        <div class="erx-stock__content">
          {this.showLabel && (
            <span class="erx-stock__label" part="label">
              {label}
            </span>
          )}

          {this.showQuantity && this.variant !== 'badge' && (
            <span class="erx-stock__quantity" part="quantity">
              {this.quantity > 0 ? this.quantity : 0}
              {this.quantity > 0 && <span class="erx-stock__unit"> units</span>}
            </span>
          )}
        </div>
      </div>
    );
  }
}
