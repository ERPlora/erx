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
  ErxVariantGroup,
  ErxVariantOption,
  ErxVariantSelection,
  ErxVariantSelectEvent,
} from './erx-variant-selector.types';

@Component({
  tag: 'erx-variant-selector',
  styleUrl: 'erx-variant-selector.css',
  shadow: true,
})
export class ErxVariantSelector {
  @Element() el!: HTMLElement;

  // ========================================
  // Props
  // ========================================

  /** Variant groups */
  @Prop() groups: ErxVariantGroup[] = [];

  /** Current selection */
  @Prop({ mutable: true }) value: ErxVariantSelection = {};

  /** Show price modifiers */
  @Prop() showPrices = true;

  /** Show stock info */
  @Prop() showStock = true;

  /** Currency symbol */
  @Prop() currency = '$';

  /** Locale for formatting */
  @Prop() locale = 'en-US';

  /** Size variant */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /** Disable all selections */
  @Prop() disabled = false;

  // ========================================
  // State
  // ========================================

  @State() internalValue: ErxVariantSelection = {};

  // ========================================
  // Events
  // ========================================

  /** Emitted when a variant is selected */
  @Event() erxSelect!: EventEmitter<ErxVariantSelectEvent>;

  /** Emitted when all required selections are complete */
  @Event() erxComplete!: EventEmitter<{ selection: ErxVariantSelection }>;

  // ========================================
  // Watchers
  // ========================================

  @Watch('value')
  handleValueChange(newValue: ErxVariantSelection) {
    this.internalValue = { ...newValue };
  }

  // ========================================
  // Lifecycle
  // ========================================

  componentWillLoad() {
    this.internalValue = { ...this.value };
  }

  // ========================================
  // Public Methods
  // ========================================

  /** Reset all selections */
  @Method()
  async reset(): Promise<void> {
    this.internalValue = {};
    this.value = {};
  }

  /** Check if selection is complete */
  @Method()
  async isComplete(): Promise<boolean> {
    return this.checkComplete();
  }

  /** Get current selection */
  @Method()
  async getSelection(): Promise<ErxVariantSelection> {
    return this.internalValue;
  }

  // ========================================
  // Private Methods
  // ========================================

  private selectOption = (group: ErxVariantGroup, option: ErxVariantOption) => {
    if (this.disabled || option.available === false) return;

    const newValue = { ...this.internalValue, [group.id]: option.value };
    this.internalValue = newValue;
    this.value = newValue;

    const complete = this.checkComplete();

    this.erxSelect.emit({
      groupId: group.id,
      option,
      selection: newValue,
      complete,
    });

    if (complete) {
      this.erxComplete.emit({ selection: newValue });
    }
  };

  private checkComplete(): boolean {
    return this.groups
      .filter(g => g.required !== false)
      .every(g => this.internalValue[g.id] !== undefined);
  }

  private formatPrice(price: number): string {
    const sign = price >= 0 ? '+' : '';
    return sign + new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.getCurrencyCode(),
    }).format(price);
  }

  private getCurrencyCode(): string {
    const currencyMap: Record<string, string> = { '$': 'USD', '€': 'EUR', '£': 'GBP' };
    return currencyMap[this.currency] || 'USD';
  }

  private isSelected(groupId: string, optionValue: string): boolean {
    return this.internalValue[groupId] === optionValue;
  }

  // ========================================
  // Render Methods
  // ========================================

  private renderButtonOption(group: ErxVariantGroup, option: ErxVariantOption) {
    const selected = this.isSelected(group.id, option.value);
    const unavailable = option.available === false;

    return (
      <button
        class={{
          'erx-variant__option': true,
          'erx-variant__option--button': true,
          'erx-variant__option--selected': selected,
          'erx-variant__option--unavailable': unavailable,
        }}
        onClick={() => this.selectOption(group, option)}
        disabled={this.disabled || unavailable}
        type="button"
        aria-pressed={selected}
      >
        <span class="erx-variant__option-label">{option.label}</span>
        {this.showPrices && option.priceModifier && option.priceModifier !== 0 && (
          <span class="erx-variant__option-price">
            {this.formatPrice(option.priceModifier)}
          </span>
        )}
        {this.showStock && option.stock !== undefined && option.stock <= 5 && option.stock > 0 && (
          <span class="erx-variant__option-stock">Only {option.stock} left</span>
        )}
      </button>
    );
  }

  private renderColorOption(group: ErxVariantGroup, option: ErxVariantOption) {
    const selected = this.isSelected(group.id, option.value);
    const unavailable = option.available === false;

    return (
      <button
        class={{
          'erx-variant__option': true,
          'erx-variant__option--color': true,
          'erx-variant__option--selected': selected,
          'erx-variant__option--unavailable': unavailable,
        }}
        style={{ '--variant-color': option.color }}
        onClick={() => this.selectOption(group, option)}
        disabled={this.disabled || unavailable}
        type="button"
        aria-label={option.label}
        aria-pressed={selected}
        title={option.label}
      >
        <span class="erx-variant__color-swatch" />
        {unavailable && <span class="erx-variant__color-slash" />}
      </button>
    );
  }

  private renderImageOption(group: ErxVariantGroup, option: ErxVariantOption) {
    const selected = this.isSelected(group.id, option.value);
    const unavailable = option.available === false;

    return (
      <button
        class={{
          'erx-variant__option': true,
          'erx-variant__option--image': true,
          'erx-variant__option--selected': selected,
          'erx-variant__option--unavailable': unavailable,
        }}
        onClick={() => this.selectOption(group, option)}
        disabled={this.disabled || unavailable}
        type="button"
        aria-label={option.label}
        aria-pressed={selected}
      >
        {option.image ? (
          <img src={option.image} alt={option.label} class="erx-variant__image" />
        ) : (
          <span class="erx-variant__image-placeholder">{option.label}</span>
        )}
      </button>
    );
  }

  private renderDropdownOption(group: ErxVariantGroup) {
    return (
      <select
        class="erx-variant__select"
        onChange={(e) => {
          const value = (e.target as HTMLSelectElement).value;
          const option = group.options.find(o => o.value === value);
          if (option) this.selectOption(group, option);
        }}
        disabled={this.disabled}
      >
        <option value="">Select {group.name}</option>
        {group.options.map(option => (
          <option
            value={option.value}
            disabled={option.available === false}
            selected={this.isSelected(group.id, option.value)}
          >
            {option.label}
            {this.showPrices && option.priceModifier ? ` (${this.formatPrice(option.priceModifier)})` : ''}
            {option.available === false ? ' - Out of stock' : ''}
          </option>
        ))}
      </select>
    );
  }

  // ========================================
  // Render
  // ========================================

  render() {
    return (
      <div
        class={{
          'erx-variant': true,
          [`erx-variant--${this.size}`]: true,
          'erx-variant--disabled': this.disabled,
        }}
        part="container"
      >
        {this.groups.map(group => (
          <div class="erx-variant__group" part="group" key={group.id}>
            <label class="erx-variant__label">
              {group.name}
              {group.required !== false && <span class="erx-variant__required">*</span>}
            </label>

            <div class={`erx-variant__options erx-variant__options--${group.type}`}>
              {group.type === 'dropdown' ? (
                this.renderDropdownOption(group)
              ) : (
                group.options.map(option => {
                  switch (group.type) {
                    case 'color':
                      return this.renderColorOption(group, option);
                    case 'image':
                      return this.renderImageOption(group, option);
                    default:
                      return this.renderButtonOption(group, option);
                  }
                })
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
