import {
  Component,
  Prop,
  Event,
  EventEmitter,
  State,
  h,
  Element,
  Method,
  Watch,
} from '@stencil/core';
import type {
  ErxCartItem,
  ErxCartSummary,
  ErxCartItemChangeEvent,
  ErxCartItemRemoveEvent,
  ErxCartClearEvent,
} from './erx-cart.types';

@Component({
  tag: 'erx-cart',
  styleUrl: 'erx-cart.css',
  shadow: true,
})
export class ErxCart {
  @Element() el!: HTMLElement;

  // ========================================
  // Props
  // ========================================

  /** Cart items */
  @Prop({ mutable: true }) items: ErxCartItem[] = [];

  /** Tax rate (decimal, e.g., 0.21 for 21%) */
  @Prop() taxRate = 0;

  /** Tax label */
  @Prop() taxLabel = 'Tax';

  /** Whether tax is included in prices */
  @Prop() taxIncluded = false;

  /** Currency symbol */
  @Prop() currency = '$';

  /** Currency locale for formatting */
  @Prop() locale = 'en-US';

  /** Show item images */
  @Prop() showImages = true;

  /** Show quantity controls */
  @Prop() showQuantityControls = true;

  /** Show remove button */
  @Prop() showRemoveButton = true;

  /** Show clear all button */
  @Prop() showClearButton = true;

  /** Show summary section */
  @Prop() showSummary = true;

  /** Editable item notes */
  @Prop() editableNotes = false;

  /** Compact mode */
  @Prop() compact = false;

  /** Empty cart message */
  @Prop() emptyMessage = 'Your cart is empty';

  /** Disable all interactions */
  @Prop() disabled = false;

  // ========================================
  // State
  // ========================================

  @State() summary: ErxCartSummary = {
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
    itemCount: 0,
    lineCount: 0,
  };

  // ========================================
  // Events
  // ========================================

  /** Emitted when item quantity changes */
  @Event() erxItemChange!: EventEmitter<ErxCartItemChangeEvent>;

  /** Emitted when item is removed */
  @Event() erxItemRemove!: EventEmitter<ErxCartItemRemoveEvent>;

  /** Emitted when cart is cleared */
  @Event() erxClear!: EventEmitter<ErxCartClearEvent>;

  /** Emitted when checkout is clicked */
  @Event() erxCheckout!: EventEmitter<{ summary: ErxCartSummary; items: ErxCartItem[] }>;

  // ========================================
  // Watchers
  // ========================================

  @Watch('items')
  @Watch('taxRate')
  @Watch('taxIncluded')
  handleItemsChange() {
    this.calculateSummary();
  }

  // ========================================
  // Lifecycle
  // ========================================

  componentWillLoad() {
    this.calculateSummary();
  }

  // ========================================
  // Public Methods
  // ========================================

  /** Add item to cart */
  @Method()
  async addItem(item: ErxCartItem): Promise<void> {
    const existingIndex = this.items.findIndex(
      i => i.productId === item.productId && i.variant === item.variant
    );

    if (existingIndex >= 0) {
      const existing = this.items[existingIndex];
      const newQuantity = existing.quantity + item.quantity;
      this.updateItemQuantity(existingIndex, newQuantity);
    } else {
      this.items = [...this.items, item];
    }
  }

  /** Remove item from cart */
  @Method()
  async removeItem(itemId: string | number): Promise<void> {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      this.items = this.items.filter(i => i.id !== itemId);
      this.erxItemRemove.emit({ item });
    }
  }

  /** Update item quantity */
  @Method()
  async updateQuantity(itemId: string | number, quantity: number): Promise<void> {
    const index = this.items.findIndex(i => i.id === itemId);
    if (index >= 0) {
      this.updateItemQuantity(index, quantity);
    }
  }

  /** Clear all items */
  @Method()
  async clear(): Promise<void> {
    const items = [...this.items];
    this.items = [];
    this.erxClear.emit({ items });
  }

  /** Get current summary */
  @Method()
  async getSummary(): Promise<ErxCartSummary> {
    return this.summary;
  }

  // ========================================
  // Private Methods
  // ========================================

  private updateItemQuantity(index: number, quantity: number) {
    const item = this.items[index];
    const previousQuantity = item.quantity;
    const maxQty = item.maxQuantity ?? Infinity;
    const newQuantity = Math.max(1, Math.min(quantity, maxQty));

    if (newQuantity !== previousQuantity) {
      const newItems = [...this.items];
      newItems[index] = { ...item, quantity: newQuantity };
      this.items = newItems;

      this.erxItemChange.emit({
        item: newItems[index],
        quantity: newQuantity,
        previousQuantity,
      });
    }
  }

  private calculateSummary() {
    let subtotal = 0;
    let totalDiscount = 0;
    let itemCount = 0;

    for (const item of this.items) {
      const lineTotal = item.price * item.quantity;
      let lineDiscount = 0;

      if (item.discount) {
        if (item.discountType === 'percent') {
          lineDiscount = lineTotal * (item.discount / 100);
        } else {
          lineDiscount = item.discount * item.quantity;
        }
      }

      subtotal += lineTotal;
      totalDiscount += lineDiscount;
      itemCount += item.quantity;
    }

    const taxableAmount = subtotal - totalDiscount;
    let tax = 0;

    if (this.taxRate > 0) {
      if (this.taxIncluded) {
        // Tax is included in price, extract it
        tax = taxableAmount - (taxableAmount / (1 + this.taxRate));
      } else {
        // Tax is added on top
        tax = taxableAmount * this.taxRate;
      }
    }

    const total = this.taxIncluded ? taxableAmount : taxableAmount + tax;

    this.summary = {
      subtotal,
      discount: totalDiscount,
      tax,
      total,
      itemCount,
      lineCount: this.items.length,
    };
  }

  private formatPrice(price: number): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.getCurrencyCode(),
    }).format(price);
  }

  private getCurrencyCode(): string {
    const currencyMap: Record<string, string> = {
      '$': 'USD',
      '€': 'EUR',
      '£': 'GBP',
      '¥': 'JPY',
      '₹': 'INR',
    };
    return currencyMap[this.currency] || 'USD';
  }

  private handleQuantityChange = (item: ErxCartItem, delta: number) => {
    const index = this.items.findIndex(i => i.id === item.id);
    if (index >= 0) {
      this.updateItemQuantity(index, item.quantity + delta);
    }
  };

  private handleRemove = (item: ErxCartItem) => {
    this.removeItem(item.id);
  };

  private handleCheckout = () => {
    this.erxCheckout.emit({
      summary: this.summary,
      items: this.items,
    });
  };

  // ========================================
  // Render
  // ========================================

  render() {
    const isEmpty = this.items.length === 0;

    return (
      <div
        class={{
          'erx-cart': true,
          'erx-cart--compact': this.compact,
          'erx-cart--disabled': this.disabled,
          'erx-cart--empty': isEmpty,
        }}
        part="container"
      >
        {/* Header */}
        <div class="erx-cart__header" part="header">
          <span class="erx-cart__title">
            <slot name="title">Cart</slot>
            {!isEmpty && (
              <span class="erx-cart__count">({this.summary.itemCount})</span>
            )}
          </span>
          {this.showClearButton && !isEmpty && (
            <button
              class="erx-cart__clear-btn"
              onClick={() => this.clear()}
              disabled={this.disabled}
              type="button"
            >
              Clear
            </button>
          )}
        </div>

        {/* Items list */}
        <div class="erx-cart__items" part="items">
          {isEmpty ? (
            <div class="erx-cart__empty" part="empty">
              <slot name="empty">
                <svg class="erx-cart__empty-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                <p>{this.emptyMessage}</p>
              </slot>
            </div>
          ) : (
            this.items.map(item => (
              <div class="erx-cart__item" part="item" key={item.id}>
                {/* Image */}
                {this.showImages && (
                  <div class="erx-cart__item-image" part="item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div class="erx-cart__item-placeholder">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div class="erx-cart__item-content" part="item-content">
                  <div class="erx-cart__item-header">
                    <span class="erx-cart__item-name">{item.name}</span>
                    {this.showRemoveButton && (
                      <button
                        class="erx-cart__item-remove"
                        onClick={() => this.handleRemove(item)}
                        disabled={this.disabled}
                        type="button"
                        aria-label="Remove item"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Variant & SKU */}
                  {(item.variant || item.sku) && (
                    <div class="erx-cart__item-meta">
                      {item.variant && <span>{item.variant}</span>}
                      {item.sku && <span>SKU: {item.sku}</span>}
                    </div>
                  )}

                  {/* Notes */}
                  {item.notes && (
                    <div class="erx-cart__item-notes">{item.notes}</div>
                  )}

                  {/* Price & Quantity */}
                  <div class="erx-cart__item-footer">
                    <span class="erx-cart__item-price">
                      {this.formatPrice(item.price)}
                      {item.discount && (
                        <span class="erx-cart__item-discount">
                          -{item.discountType === 'percent' ? `${item.discount}%` : this.formatPrice(item.discount)}
                        </span>
                      )}
                    </span>

                    {this.showQuantityControls ? (
                      <div class="erx-cart__item-qty">
                        <button
                          class="erx-cart__qty-btn"
                          onClick={() => this.handleQuantityChange(item, -1)}
                          disabled={this.disabled || item.quantity <= 1}
                          type="button"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span class="erx-cart__qty-value">{item.quantity}</span>
                        <button
                          class="erx-cart__qty-btn"
                          onClick={() => this.handleQuantityChange(item, 1)}
                          disabled={this.disabled || (item.maxQuantity !== undefined && item.quantity >= item.maxQuantity)}
                          type="button"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <span class="erx-cart__item-qty-label">×{item.quantity}</span>
                    )}
                  </div>

                  {/* Line total */}
                  <div class="erx-cart__item-total">
                    {this.formatPrice(item.price * item.quantity - (item.discount || 0) * (item.discountType === 'percent' ? item.price * item.quantity / 100 : item.quantity))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {this.showSummary && !isEmpty && (
          <div class="erx-cart__summary" part="summary">
            <div class="erx-cart__summary-row">
              <span>Subtotal</span>
              <span>{this.formatPrice(this.summary.subtotal)}</span>
            </div>

            {this.summary.discount > 0 && (
              <div class="erx-cart__summary-row erx-cart__summary-row--discount">
                <span>Discount</span>
                <span>-{this.formatPrice(this.summary.discount)}</span>
              </div>
            )}

            {this.taxRate > 0 && (
              <div class="erx-cart__summary-row">
                <span>{this.taxLabel} ({(this.taxRate * 100).toFixed(0)}%)</span>
                <span>{this.formatPrice(this.summary.tax)}</span>
              </div>
            )}

            <div class="erx-cart__summary-row erx-cart__summary-row--total">
              <span>Total</span>
              <span>{this.formatPrice(this.summary.total)}</span>
            </div>
          </div>
        )}

        {/* Checkout button slot */}
        {!isEmpty && (
          <div class="erx-cart__actions" part="actions">
            <slot name="actions">
              <button
                class="erx-cart__checkout-btn"
                onClick={this.handleCheckout}
                disabled={this.disabled}
                type="button"
              >
                Checkout
              </button>
            </slot>
          </div>
        )}
      </div>
    );
  }
}
