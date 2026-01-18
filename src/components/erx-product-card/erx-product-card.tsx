import {
  Component,
  Prop,
  Event,
  EventEmitter,
  State,
  h,
  Element,
} from '@stencil/core';
import type {
  ErxProduct,
  ErxProductCardSelectEvent,
  ErxProductCardAddEvent,
} from './erx-product-card.types';

@Component({
  tag: 'erx-product-card',
  styleUrl: 'erx-product-card.css',
  shadow: true,
})
export class ErxProductCard {
  @Element() el!: HTMLElement;

  // ========================================
  // Props
  // ========================================

  /** Product data */
  @Prop() product!: ErxProduct;

  /** Card size variant */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /** Card orientation */
  @Prop() orientation: 'vertical' | 'horizontal' = 'vertical';

  /** Show add to cart button */
  @Prop() showAddButton = true;

  /** Show quantity controls */
  @Prop() showQuantity = false;

  /** Show stock indicator */
  @Prop() showStock = true;

  /** Show price */
  @Prop() showPrice = true;

  /** Show image */
  @Prop() showImage = true;

  /** Currency symbol */
  @Prop() currency = '$';

  /** Currency locale for formatting */
  @Prop() locale = 'en-US';

  /** Disable the card */
  @Prop() disabled = false;

  /** Mark as selected */
  @Prop() selected = false;

  /** Image fit mode */
  @Prop() imageFit: 'cover' | 'contain' = 'cover';

  /** Placeholder image URL */
  @Prop() placeholder?: string;

  // ========================================
  // State
  // ========================================

  @State() quantity = 1;
  @State() imageError = false;
  @State() imageLoaded = false;

  // ========================================
  // Events
  // ========================================

  /** Emitted when card is clicked */
  @Event() erxSelect!: EventEmitter<ErxProductCardSelectEvent>;

  /** Emitted when add to cart is clicked */
  @Event() erxAdd!: EventEmitter<ErxProductCardAddEvent>;

  /** Emitted when quantity changes */
  @Event() erxQuantityChange!: EventEmitter<{ quantity: number }>;

  // ========================================
  // Private Methods
  // ========================================

  private handleClick = (e: MouseEvent) => {
    if (this.disabled || this.isOutOfStock()) return;

    // Don't emit select if clicking buttons
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;

    this.erxSelect.emit({
      product: this.product,
      quantity: this.quantity,
    });
  };

  private handleAdd = (e: MouseEvent) => {
    e.stopPropagation();
    if (this.disabled || this.isOutOfStock()) return;

    this.erxAdd.emit({
      product: this.product,
      quantity: this.quantity,
    });
  };

  private handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, this.quantity + delta);
    const maxStock = this.product.stock ?? Infinity;
    this.quantity = Math.min(newQuantity, maxStock);
    this.erxQuantityChange.emit({ quantity: this.quantity });
  };

  private isOutOfStock(): boolean {
    return this.product.stock !== undefined && this.product.stock <= 0;
  }

  private isLowStock(): boolean {
    return this.product.stock !== undefined && this.product.stock > 0 && this.product.stock <= 5;
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

  private getDiscountPercent(): number | null {
    if (!this.product.originalPrice || this.product.originalPrice <= this.product.price) {
      return null;
    }
    return Math.round((1 - this.product.price / this.product.originalPrice) * 100);
  }

  private handleImageError = () => {
    this.imageError = true;
  };

  private handleImageLoad = () => {
    this.imageLoaded = true;
  };

  // ========================================
  // Render
  // ========================================

  render() {
    const outOfStock = this.isOutOfStock();
    const lowStock = this.isLowStock();
    const discount = this.getDiscountPercent();

    return (
      <div
        class={{
          'erx-product': true,
          [`erx-product--${this.size}`]: true,
          [`erx-product--${this.orientation}`]: true,
          'erx-product--disabled': this.disabled,
          'erx-product--out-of-stock': outOfStock,
          'erx-product--selected': this.selected,
        }}
        part="container"
        onClick={this.handleClick}
        role="button"
        tabIndex={this.disabled ? -1 : 0}
        aria-disabled={this.disabled || outOfStock}
        aria-selected={this.selected}
      >
        {/* Image */}
        {this.showImage && (
          <div class="erx-product__image-wrapper" part="image-wrapper">
            {this.product.image && !this.imageError ? (
              <img
                class={{
                  'erx-product__image': true,
                  'erx-product__image--loaded': this.imageLoaded,
                  [`erx-product__image--${this.imageFit}`]: true,
                }}
                src={this.product.image}
                alt={this.product.name}
                loading="lazy"
                onError={this.handleImageError}
                onLoad={this.handleImageLoad}
                part="image"
              />
            ) : (
              <div class="erx-product__image-placeholder" part="placeholder">
                {this.placeholder ? (
                  <img src={this.placeholder} alt="" />
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                )}
              </div>
            )}

            {/* Badges */}
            <div class="erx-product__badges" part="badges">
              {outOfStock && (
                <span class="erx-product__badge erx-product__badge--danger">
                  Out of Stock
                </span>
              )}
              {!outOfStock && discount && (
                <span class="erx-product__badge erx-product__badge--success">
                  -{discount}%
                </span>
              )}
              {this.product.badge && !outOfStock && (
                <span
                  class={`erx-product__badge erx-product__badge--${this.product.badgeColor || 'primary'}`}
                >
                  {this.product.badge}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div class="erx-product__content" part="content">
          {/* Category */}
          {this.product.category && (
            <span class="erx-product__category" part="category">
              {this.product.category}
            </span>
          )}

          {/* Name */}
          <h3 class="erx-product__name" part="name">
            {this.product.name}
          </h3>

          {/* SKU */}
          {this.product.sku && (
            <span class="erx-product__sku" part="sku">
              SKU: {this.product.sku}
            </span>
          )}

          {/* Stock indicator */}
          {this.showStock && this.product.stock !== undefined && (
            <div
              class={{
                'erx-product__stock': true,
                'erx-product__stock--low': lowStock,
                'erx-product__stock--out': outOfStock,
              }}
              part="stock"
            >
              <span class="erx-product__stock-dot" />
              {outOfStock
                ? 'Out of stock'
                : lowStock
                  ? `Only ${this.product.stock} left`
                  : `${this.product.stock} in stock`}
            </div>
          )}

          {/* Price */}
          {this.showPrice && (
            <div class="erx-product__price-wrapper" part="price-wrapper">
              <span class="erx-product__price" part="price">
                {this.formatPrice(this.product.price)}
              </span>
              {this.product.originalPrice && this.product.originalPrice > this.product.price && (
                <span class="erx-product__original-price" part="original-price">
                  {this.formatPrice(this.product.originalPrice)}
                </span>
              )}
            </div>
          )}

          {/* Quantity controls */}
          {this.showQuantity && !outOfStock && (
            <div class="erx-product__quantity" part="quantity">
              <button
                class="erx-product__qty-btn"
                onClick={() => this.handleQuantityChange(-1)}
                disabled={this.quantity <= 1}
                type="button"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span class="erx-product__qty-value">{this.quantity}</span>
              <button
                class="erx-product__qty-btn"
                onClick={() => this.handleQuantityChange(1)}
                disabled={this.product.stock !== undefined && this.quantity >= this.product.stock}
                type="button"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}

          {/* Add button */}
          {this.showAddButton && (
            <button
              class="erx-product__add-btn"
              onClick={this.handleAdd}
              disabled={this.disabled || outOfStock}
              part="add-button"
              type="button"
            >
              <slot name="add-label">
                {outOfStock ? 'Out of Stock' : 'Add'}
              </slot>
            </button>
          )}
        </div>
      </div>
    );
  }
}
