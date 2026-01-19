import {
  Component,
  Prop,
  Event,
  EventEmitter,
  h,
  Element,
} from '@stencil/core';
import type { ErxOrder, ErxOrderTicketActionEvent } from './erx-order-ticket.types';

@Component({
  tag: 'erx-order-ticket',
  styleUrl: 'erx-order-ticket.css',
  shadow: true,
})
export class ErxOrderTicket {
  @Element() el!: HTMLElement;

  // ========================================
  // Props
  // ========================================

  /** Order data */
  @Prop() order!: ErxOrder;

  /** Show prices */
  @Prop() showPrices = false;

  /** Show status badge */
  @Prop() showStatus = true;

  /** Show action buttons */
  @Prop() showActions = true;

  /** Compact mode */
  @Prop() compact = false;

  /** Currency symbol */
  @Prop() currency = '$';

  /** Locale for formatting */
  @Prop() locale = 'en-US';

  // ========================================
  // Events
  // ========================================

  /** Emitted when action button is clicked */
  @Event() erxAction!: EventEmitter<ErxOrderTicketActionEvent>;

  /** Emitted when ticket is clicked */
  @Event() erxSelect!: EventEmitter<{ order: ErxOrder }>;

  // ========================================
  // Private Methods
  // ========================================

  private handleAction = (action: string, e: MouseEvent) => {
    e.stopPropagation();
    this.erxAction.emit({ order: this.order, action });
  };

  private handleClick = () => {
    this.erxSelect.emit({ order: this.order });
  };

  private formatTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString(this.locale, { hour: '2-digit', minute: '2-digit' });
  }

  private formatPrice(price: number): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.getCurrencyCode(),
    }).format(price);
  }

  private getCurrencyCode(): string {
    const currencyMap: Record<string, string> = { '$': 'USD', '€': 'EUR', '£': 'GBP' };
    return currencyMap[this.currency] || 'USD';
  }

  private getStatusColor(status?: string): string {
    const colors: Record<string, string> = {
      pending: 'warning',
      preparing: 'primary',
      ready: 'success',
      completed: 'medium',
      cancelled: 'danger',
    };
    return colors[status || 'pending'] || 'medium';
  }

  private getOrderTypeIcon(type?: string): string {
    const icons: Record<string, string> = {
      'dine-in': '🍽️',
      takeout: '🥡',
      delivery: '🚗',
    };
    return icons[type || 'dine-in'] || '🍽️';
  }

  // ========================================
  // Render
  // ========================================

  render() {
    const { order } = this;

    // Guard: don't render if no order data
    if (!order) {
      return (
        <div class="erx-ticket erx-ticket--empty" part="container">
          <div class="erx-ticket__empty-state">
            <p>No order data</p>
          </div>
        </div>
      );
    }

    return (
      <div
        class={{
          'erx-ticket': true,
          'erx-ticket--compact': this.compact,
          'erx-ticket--rush': order.priority === 'rush',
          [`erx-ticket--${order.status || 'pending'}`]: true,
        }}
        part="container"
        onClick={this.handleClick}
        role="article"
      >
        {/* Header */}
        <div class="erx-ticket__header" part="header">
          <div class="erx-ticket__order-info">
            <span class="erx-ticket__number">#{order.orderNumber}</span>
            <span class="erx-ticket__time">{this.formatTime(order.timestamp)}</span>
          </div>

          <div class="erx-ticket__meta">
            {order.orderType && (
              <span class="erx-ticket__type">
                {this.getOrderTypeIcon(order.orderType)}
              </span>
            )}
            {order.tableNumber && (
              <span class="erx-ticket__table">Table {order.tableNumber}</span>
            )}
            {order.priority === 'rush' && (
              <span class="erx-ticket__rush">RUSH</span>
            )}
          </div>
        </div>

        {/* Customer */}
        {order.customerName && (
          <div class="erx-ticket__customer" part="customer">
            {order.customerName}
          </div>
        )}

        {/* Items */}
        <div class="erx-ticket__items" part="items">
          {order.items.map((item, index) => (
            <div
              class={{
                'erx-ticket__item': true,
                [`erx-ticket__item--${item.status || 'pending'}`]: true,
              }}
              key={index}
            >
              <span class="erx-ticket__item-qty">{item.quantity}×</span>
              <div class="erx-ticket__item-details">
                <span class="erx-ticket__item-name">{item.name}</span>
                {item.variant && (
                  <span class="erx-ticket__item-variant">{item.variant}</span>
                )}
                {item.notes && (
                  <span class="erx-ticket__item-notes">{item.notes}</span>
                )}
              </div>
              {this.showPrices && item.price !== undefined && (
                <span class="erx-ticket__item-price">
                  {this.formatPrice(item.price * item.quantity)}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Notes */}
        {order.notes && (
          <div class="erx-ticket__notes" part="notes">
            <strong>Note:</strong> {order.notes}
          </div>
        )}

        {/* Footer */}
        <div class="erx-ticket__footer" part="footer">
          {this.showStatus && (
            <span class={`erx-ticket__status erx-ticket__status--${this.getStatusColor(order.status)}`}>
              {order.status || 'pending'}
            </span>
          )}

          {this.showPrices && order.total !== undefined && (
            <span class="erx-ticket__total">
              {this.formatPrice(order.total)}
            </span>
          )}
        </div>

        {/* Actions */}
        {this.showActions && (
          <div class="erx-ticket__actions" part="actions">
            <slot name="actions">
              {order.status === 'pending' && (
                <button
                  class="erx-ticket__action-btn erx-ticket__action-btn--primary"
                  onClick={(e) => this.handleAction('start', e)}
                  type="button"
                >
                  Start
                </button>
              )}
              {order.status === 'preparing' && (
                <button
                  class="erx-ticket__action-btn erx-ticket__action-btn--success"
                  onClick={(e) => this.handleAction('ready', e)}
                  type="button"
                >
                  Ready
                </button>
              )}
              {order.status === 'ready' && (
                <button
                  class="erx-ticket__action-btn erx-ticket__action-btn--success"
                  onClick={(e) => this.handleAction('complete', e)}
                  type="button"
                >
                  Complete
                </button>
              )}
            </slot>
          </div>
        )}
      </div>
    );
  }
}
