import {
  Component,
  Prop,
  h,
  Element,
  Method,
} from '@stencil/core';
import type { ErxReceiptData } from './erx-receipt.types';

@Component({
  tag: 'erx-receipt',
  styleUrl: 'erx-receipt.css',
  shadow: true,
})
export class ErxReceipt {
  @Element() el!: HTMLElement;

  // ========================================
  // Props
  // ========================================

  /** Receipt data */
  @Prop() data!: ErxReceiptData;

  /** Paper width in mm (for thermal printers) */
  @Prop() paperWidth: 58 | 80 = 80;

  /** Show logo */
  @Prop() showLogo = true;

  /** Show barcode */
  @Prop() showBarcode = true;

  /** Show QR code */
  @Prop() showQrCode = true;

  /** Currency symbol */
  @Prop() currency = '$';

  /** Locale for formatting */
  @Prop() locale = 'en-US';

  /** Compact mode (less spacing) */
  @Prop() compact = false;

  // ========================================
  // Public Methods
  // ========================================

  /** Print the receipt */
  @Method()
  async print(): Promise<void> {
    const content = this.el.shadowRoot?.querySelector('.erx-receipt');
    if (!content) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const styles = this.el.shadowRoot?.querySelector('style')?.textContent || '';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt #${this.data.receiptNumber}</title>
          <style>${styles}</style>
          <style>
            @media print {
              body { margin: 0; padding: 0; }
              .erx-receipt { box-shadow: none; border: none; }
            }
          </style>
        </head>
        <body>${content.outerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  }

  /** Get receipt as HTML string */
  @Method()
  async getHTML(): Promise<string> {
    return this.el.shadowRoot?.querySelector('.erx-receipt')?.outerHTML || '';
  }

  // ========================================
  // Private Methods
  // ========================================

  private formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(this.locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  private calculateItemTotal(item: { price: number; quantity: number; discount?: number; discountType?: string }): number {
    const lineTotal = item.price * item.quantity;
    if (!item.discount) return lineTotal;

    if (item.discountType === 'percent') {
      return lineTotal * (1 - item.discount / 100);
    }
    return lineTotal - item.discount;
  }

  // ========================================
  // Render
  // ========================================

  render() {
    const { data } = this;

    return (
      <div
        class={{
          'erx-receipt': true,
          'erx-receipt--compact': this.compact,
          [`erx-receipt--${this.paperWidth}mm`]: true,
        }}
        part="container"
      >
        {/* Header */}
        <div class="erx-receipt__header" part="header">
          {this.showLogo && data.logoUrl && (
            <img src={data.logoUrl} alt={data.businessName} class="erx-receipt__logo" />
          )}
          <h1 class="erx-receipt__business-name">{data.businessName}</h1>
          {data.businessAddress && (
            <p class="erx-receipt__address">{data.businessAddress}</p>
          )}
          {data.businessPhone && (
            <p class="erx-receipt__phone">{data.businessPhone}</p>
          )}
          {data.businessTaxId && (
            <p class="erx-receipt__tax-id">Tax ID: {data.businessTaxId}</p>
          )}
        </div>

        <div class="erx-receipt__divider" />

        {/* Receipt info */}
        <div class="erx-receipt__info" part="info">
          <div class="erx-receipt__row">
            <span>Receipt #</span>
            <span>{data.receiptNumber}</span>
          </div>
          <div class="erx-receipt__row">
            <span>Date</span>
            <span>{this.formatDate(data.date)}</span>
          </div>
          {data.cashier && (
            <div class="erx-receipt__row">
              <span>Cashier</span>
              <span>{data.cashier}</span>
            </div>
          )}
          {data.customer && (
            <div class="erx-receipt__row">
              <span>Customer</span>
              <span>{data.customer}</span>
            </div>
          )}
        </div>

        <div class="erx-receipt__divider erx-receipt__divider--double" />

        {/* Items */}
        <div class="erx-receipt__items" part="items">
          {data.items.map((item, index) => (
            <div class="erx-receipt__item" key={index}>
              <div class="erx-receipt__item-line">
                <span class="erx-receipt__item-name">{item.name}</span>
              </div>
              <div class="erx-receipt__item-line erx-receipt__item-line--details">
                <span>{item.quantity} × {this.formatPrice(item.price)}</span>
                <span>{this.formatPrice(this.calculateItemTotal(item))}</span>
              </div>
              {item.discount && (
                <div class="erx-receipt__item-line erx-receipt__item-line--discount">
                  <span>
                    Discount: {item.discountType === 'percent' ? `${item.discount}%` : this.formatPrice(item.discount)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div class="erx-receipt__divider" />

        {/* Totals */}
        <div class="erx-receipt__totals" part="totals">
          <div class="erx-receipt__row">
            <span>Subtotal</span>
            <span>{this.formatPrice(data.subtotal)}</span>
          </div>
          {data.discount && data.discount > 0 && (
            <div class="erx-receipt__row erx-receipt__row--discount">
              <span>Discount</span>
              <span>-{this.formatPrice(data.discount)}</span>
            </div>
          )}
          {data.tax !== undefined && (
            <div class="erx-receipt__row">
              <span>Tax {data.taxRate ? `(${data.taxRate}%)` : ''}</span>
              <span>{this.formatPrice(data.tax)}</span>
            </div>
          )}
          <div class="erx-receipt__row erx-receipt__row--total">
            <span>TOTAL</span>
            <span>{this.formatPrice(data.total)}</span>
          </div>
        </div>

        <div class="erx-receipt__divider" />

        {/* Payment */}
        {data.paymentMethod && (
          <div class="erx-receipt__payment" part="payment">
            <div class="erx-receipt__row">
              <span>Payment</span>
              <span>{data.paymentMethod}</span>
            </div>
            {data.amountPaid !== undefined && (
              <div class="erx-receipt__row">
                <span>Paid</span>
                <span>{this.formatPrice(data.amountPaid)}</span>
              </div>
            )}
            {data.change !== undefined && data.change > 0 && (
              <div class="erx-receipt__row">
                <span>Change</span>
                <span>{this.formatPrice(data.change)}</span>
              </div>
            )}
          </div>
        )}

        {/* Barcode/QR */}
        {(this.showBarcode && data.barcode) || (this.showQrCode && data.qrCode) ? (
          <div class="erx-receipt__codes" part="codes">
            {this.showBarcode && data.barcode && (
              <div class="erx-receipt__barcode">
                {/* Placeholder for barcode - would need a barcode library */}
                <div class="erx-receipt__barcode-placeholder">
                  ||||| {data.barcode} |||||
                </div>
              </div>
            )}
            {this.showQrCode && data.qrCode && (
              <div class="erx-receipt__qr">
                {/* Placeholder for QR code - would need a QR library */}
                <div class="erx-receipt__qr-placeholder">
                  [QR Code]
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Footer */}
        {data.footerMessage && (
          <div class="erx-receipt__footer" part="footer">
            <p>{data.footerMessage}</p>
          </div>
        )}
      </div>
    );
  }
}
