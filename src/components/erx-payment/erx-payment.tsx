import {
  Component,
  Prop,
  Event,
  EventEmitter,
  State,
  h,
  Element,
  Method,
} from '@stencil/core';
import type {
  ErxPaymentMethod,
  ErxPaymentSplit,
  ErxPaymentSelectEvent,
  ErxPaymentCompleteEvent,
} from './erx-payment.types';

@Component({
  tag: 'erx-payment',
  styleUrl: 'erx-payment.css',
  shadow: true,
})
export class ErxPayment {
  @Element() el!: HTMLElement;

  // ========================================
  // Props
  // ========================================

  /** Available payment methods */
  @Prop() methods: ErxPaymentMethod[] = [];

  /** Total amount to pay */
  @Prop() total = 0;

  /** Allow split payments */
  @Prop() allowSplit = false;

  /** Allow tips */
  @Prop() allowTip = true;

  /** Preset tip percentages */
  @Prop() tipPresets: number[] = [10, 15, 20, 25];

  /** Currency symbol */
  @Prop() currency = '$';

  /** Locale for formatting */
  @Prop() locale = 'en-US';

  /** Show numpad for cash */
  @Prop() showNumpad = true;

  /** Disable interactions */
  @Prop() disabled = false;

  // ========================================
  // State
  // ========================================

  @State() selectedMethod?: ErxPaymentMethod;
  @State() splits: ErxPaymentSplit[] = [];
  @State() tip = 0;
  @State() customTip = false;
  @State() cashAmount = 0;

  // ========================================
  // Events
  // ========================================

  /** Emitted when payment method is selected */
  @Event() erxSelect!: EventEmitter<ErxPaymentSelectEvent>;

  /** Emitted when payment is completed */
  @Event() erxComplete!: EventEmitter<ErxPaymentCompleteEvent>;

  // ========================================
  // Public Methods
  // ========================================

  /** Reset payment state */
  @Method()
  async reset(): Promise<void> {
    this.selectedMethod = undefined;
    this.splits = [];
    this.tip = 0;
    this.customTip = false;
    this.cashAmount = 0;
  }

  // ========================================
  // Private Methods
  // ========================================

  private selectMethod = (method: ErxPaymentMethod) => {
    if (this.disabled || !method.available) return;

    this.selectedMethod = method;
    this.erxSelect.emit({
      method,
      amount: this.getTotalWithTip(),
    });
  };

  private selectTip = (percent: number) => {
    this.tip = this.total * (percent / 100);
    this.customTip = false;
  };

  private handleCustomTip = (e: Event) => {
    const value = parseFloat((e.target as HTMLInputElement).value) || 0;
    this.tip = value;
    this.customTip = true;
  };

  private handleCashInput = (digit: string) => {
    if (digit === 'clear') {
      this.cashAmount = 0;
    } else if (digit === 'backspace') {
      this.cashAmount = Math.floor(this.cashAmount / 10);
    } else {
      const newAmount = this.cashAmount * 10 + parseInt(digit);
      this.cashAmount = newAmount;
    }
  };

  private handleQuickCash = (amount: number) => {
    this.cashAmount = amount * 100;
  };

  private getTotalWithTip(): number {
    return this.total + this.tip;
  }

  private getChange(): number {
    const cashInDollars = this.cashAmount / 100;
    return Math.max(0, cashInDollars - this.getTotalWithTip());
  }

  private canComplete(): boolean {
    if (!this.selectedMethod) return false;

    if (this.selectedMethod.id === 'cash') {
      return this.cashAmount / 100 >= this.getTotalWithTip();
    }

    return true;
  }

  private handleComplete = () => {
    if (!this.canComplete()) return;

    const splits: ErxPaymentSplit[] = this.allowSplit && this.splits.length > 0
      ? this.splits
      : [{ methodId: this.selectedMethod!.id, amount: this.getTotalWithTip() }];

    this.erxComplete.emit({
      methods: splits,
      total: this.getTotalWithTip(),
      tip: this.tip,
      change: this.selectedMethod?.id === 'cash' ? this.getChange() : 0,
    });
  };

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

  private getMethodIcon(method: ErxPaymentMethod): string {
    if (method.icon) return method.icon;
    const icons: Record<string, string> = {
      cash: '💵',
      card: '💳',
      credit: '💳',
      debit: '💳',
      mobile: '📱',
      qr: '📱',
    };
    return icons[method.id] || '💳';
  }

  // ========================================
  // Render
  // ========================================

  render() {
    const totalWithTip = this.getTotalWithTip();

    return (
      <div
        class={{
          'erx-payment': true,
          'erx-payment--disabled': this.disabled,
        }}
        part="container"
      >
        {/* Amount Display */}
        <div class="erx-payment__amount" part="amount">
          <span class="erx-payment__label">Total</span>
          <span class="erx-payment__total">{this.formatPrice(totalWithTip)}</span>
          {this.tip > 0 && (
            <span class="erx-payment__tip-info">
              (includes {this.formatPrice(this.tip)} tip)
            </span>
          )}
        </div>

        {/* Tip Selection */}
        {this.allowTip && (
          <div class="erx-payment__tips" part="tips">
            <span class="erx-payment__section-title">Add Tip</span>
            <div class="erx-payment__tip-options">
              <button
                class={{ 'erx-payment__tip-btn': true, 'erx-payment__tip-btn--selected': this.tip === 0 && !this.customTip }}
                onClick={() => this.selectTip(0)}
                type="button"
              >
                No Tip
              </button>
              {this.tipPresets.map(percent => (
                <button
                  class={{
                    'erx-payment__tip-btn': true,
                    'erx-payment__tip-btn--selected': !this.customTip && this.tip === this.total * (percent / 100),
                  }}
                  onClick={() => this.selectTip(percent)}
                  type="button"
                >
                  {percent}%
                </button>
              ))}
              <input
                type="number"
                class="erx-payment__tip-input"
                placeholder="Custom"
                value={this.customTip ? this.tip : ''}
                onInput={this.handleCustomTip}
                min="0"
                step="0.01"
              />
            </div>
          </div>
        )}

        {/* Payment Methods */}
        <div class="erx-payment__methods" part="methods">
          <span class="erx-payment__section-title">Payment Method</span>
          <div class="erx-payment__method-grid">
            {this.methods.map(method => (
              <button
                class={{
                  'erx-payment__method': true,
                  'erx-payment__method--selected': this.selectedMethod?.id === method.id,
                  'erx-payment__method--unavailable': !method.available,
                }}
                onClick={() => this.selectMethod(method)}
                disabled={this.disabled || !method.available}
                type="button"
              >
                <span class="erx-payment__method-icon">{this.getMethodIcon(method)}</span>
                <span class="erx-payment__method-name">{method.name}</span>
                {method.fee && method.fee > 0 && (
                  <span class="erx-payment__method-fee">+{method.fee}%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cash Input */}
        {this.selectedMethod?.id === 'cash' && this.showNumpad && (
          <div class="erx-payment__cash" part="cash">
            <div class="erx-payment__cash-display">
              <span class="erx-payment__cash-label">Tendered</span>
              <span class="erx-payment__cash-amount">
                {this.formatPrice(this.cashAmount / 100)}
              </span>
              {this.getChange() > 0 && (
                <span class="erx-payment__cash-change">
                  Change: {this.formatPrice(this.getChange())}
                </span>
              )}
            </div>

            {/* Quick amounts */}
            <div class="erx-payment__quick-cash">
              {[5, 10, 20, 50, 100].map(amount => (
                <button
                  class="erx-payment__quick-btn"
                  onClick={() => this.handleQuickCash(amount)}
                  type="button"
                >
                  {this.currency}{amount}
                </button>
              ))}
              <button
                class="erx-payment__quick-btn erx-payment__quick-btn--exact"
                onClick={() => this.handleQuickCash(Math.ceil(totalWithTip))}
                type="button"
              >
                Exact
              </button>
            </div>

            {/* Numpad */}
            <div class="erx-payment__numpad">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'backspace'].map(key => (
                <button
                  class={{
                    'erx-payment__num-btn': true,
                    'erx-payment__num-btn--action': key === 'clear' || key === 'backspace',
                  }}
                  onClick={() => this.handleCashInput(key)}
                  type="button"
                >
                  {key === 'clear' ? 'C' : key === 'backspace' ? '⌫' : key}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Complete Button */}
        <button
          class="erx-payment__complete-btn"
          onClick={this.handleComplete}
          disabled={this.disabled || !this.canComplete()}
          part="complete"
          type="button"
        >
          <slot name="complete-label">
            {this.selectedMethod?.id === 'cash' && this.getChange() > 0
              ? `Pay & Return ${this.formatPrice(this.getChange())}`
              : `Pay ${this.formatPrice(totalWithTip)}`}
          </slot>
        </button>
      </div>
    );
  }
}
