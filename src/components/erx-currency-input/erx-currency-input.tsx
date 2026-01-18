import { Component, Prop, State, Event, EventEmitter, h, Method } from '@stencil/core';
import { CurrencyInputConfig, CurrencyInputChangeDetail } from './erx-currency-input.types';

@Component({
  tag: 'erx-currency-input',
  styleUrl: 'erx-currency-input.css',
  shadow: true,
})
export class ErxCurrencyInput {
  @Prop() value?: number;
  @Prop() config: CurrencyInputConfig = { currency: 'USD' };
  @Prop() placeholder = '0.00';
  @Prop() disabled = false;
  @Prop() readonly = false;
  @Prop() label?: string;

  @State() displayValue = '';
  @State() isFocused = false;

  private inputRef?: HTMLInputElement;

  @Event() erxChange!: EventEmitter<CurrencyInputChangeDetail>;
  @Event() erxBlur!: EventEmitter<CurrencyInputChangeDetail>;

  componentWillLoad() {
    if (this.value !== undefined) {
      this.displayValue = this.formatForDisplay(this.value);
    }
  }

  @Method()
  async setValue(value: number): Promise<void> {
    this.displayValue = this.formatForDisplay(value);
    this.emitChange();
  }

  @Method()
  async clear(): Promise<void> {
    this.displayValue = '';
    this.erxChange.emit({ value: 0, formatted: this.formatCurrency(0), currency: this.config.currency });
  }

  @Method()
  async setFocus(): Promise<void> {
    this.inputRef?.focus();
  }

  private get locale(): string {
    return this.config.locale || 'en-US';
  }

  private get precision(): number {
    return this.config.precision ?? 2;
  }

  private get currencySymbol(): string {
    const formatter = new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.config.currency,
    });
    const parts = formatter.formatToParts(0);
    const symbol = parts.find(p => p.type === 'currency');
    return symbol?.value || '$';
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.config.currency,
      minimumFractionDigits: this.precision,
      maximumFractionDigits: this.precision,
    }).format(value);
  }

  private formatForDisplay(value: number): string {
    return value.toFixed(this.precision);
  }

  private parseValue(str: string): number {
    const cleaned = str.replace(/[^\d.-]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }

  private clampValue(value: number): number {
    let clamped = value;
    if (this.config.min !== undefined) {
      clamped = Math.max(clamped, this.config.min);
    }
    if (this.config.max !== undefined) {
      clamped = Math.min(clamped, this.config.max);
    }
    if (!this.config.allowNegative && clamped < 0) {
      clamped = 0;
    }
    return clamped;
  }

  private handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    let value = input.value;

    // Allow only numbers, decimal point, and minus sign
    value = value.replace(/[^\d.-]/g, '');

    // Handle multiple decimal points
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Handle minus sign
    if (!this.config.allowNegative) {
      value = value.replace(/-/g, '');
    } else {
      // Only allow minus at the beginning
      const hasLeadingMinus = value.startsWith('-');
      value = value.replace(/-/g, '');
      if (hasLeadingMinus) {
        value = '-' + value;
      }
    }

    this.displayValue = value;
  };

  private handleFocus = () => {
    this.isFocused = true;
  };

  private handleBlur = () => {
    this.isFocused = false;

    let numValue = this.parseValue(this.displayValue);
    numValue = this.clampValue(numValue);
    numValue = parseFloat(numValue.toFixed(this.precision));

    this.displayValue = this.formatForDisplay(numValue);
    this.emitChange();
    this.erxBlur.emit({
      value: numValue,
      formatted: this.formatCurrency(numValue),
      currency: this.config.currency,
    });
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const step = this.config.step ?? 1;
      let current = this.parseValue(this.displayValue);
      current = e.key === 'ArrowUp' ? current + step : current - step;
      current = this.clampValue(current);
      this.displayValue = this.formatForDisplay(current);
      this.emitChange();
    }
  };

  private emitChange() {
    const numValue = this.clampValue(this.parseValue(this.displayValue));
    this.erxChange.emit({
      value: numValue,
      formatted: this.formatCurrency(numValue),
      currency: this.config.currency,
    });
  }

  render() {
    const showSymbol = this.config.showSymbol !== false;
    const symbolPosition = this.config.symbolPosition || 'prefix';

    return (
      <div
        class={{
          'erx-curr': true,
          'erx-curr--disabled': this.disabled,
          'erx-curr--focused': this.isFocused,
        }}
        part="container"
      >
        {this.label && <label class="erx-curr__label">{this.label}</label>}

        <div class="erx-curr__input-wrapper">
          {showSymbol && symbolPosition === 'prefix' && (
            <span class="erx-curr__symbol erx-curr__symbol--prefix">{this.currencySymbol}</span>
          )}

          <input
            ref={el => (this.inputRef = el)}
            type="text"
            inputMode="decimal"
            class="erx-curr__input"
            placeholder={this.placeholder}
            value={this.displayValue}
            disabled={this.disabled}
            readOnly={this.readonly}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            part="input"
          />

          {showSymbol && symbolPosition === 'suffix' && (
            <span class="erx-curr__symbol erx-curr__symbol--suffix">{this.currencySymbol}</span>
          )}
        </div>
      </div>
    );
  }
}
