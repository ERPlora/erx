import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { ComparisonItem, ComparisonConfig, ComparisonSelectDetail } from './erx-comparison.types';

@Component({
  tag: 'erx-comparison',
  styleUrl: 'erx-comparison.css',
  shadow: true,
})
export class ErxComparison {
  @Prop() items: ComparisonItem[] = [];
  @Prop() config!: ComparisonConfig;

  @Event() erxSelect!: EventEmitter<ComparisonSelectDetail>;

  private formatPrice(price?: number): string {
    if (price === undefined) return '-';
    const { currency = 'USD', locale = 'en-US' } = this.config;
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
  }

  private renderFeatureValue(item: ComparisonItem, feature: typeof this.config.features[0]) {
    const value = item.features[feature.key];

    if (value === undefined || value === null) {
      return <span class="erx-comp__value erx-comp__value--empty">-</span>;
    }

    if (feature.type === 'boolean') {
      return (
        <span class={`erx-comp__value erx-comp__value--bool erx-comp__value--${value ? 'yes' : 'no'}`}>
          {value ? '✓' : '✗'}
        </span>
      );
    }

    if (feature.type === 'rating') {
      const rating = Number(value);
      return (
        <span class="erx-comp__value erx-comp__value--rating">
          {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
          <span class="erx-comp__rating-num">{rating.toFixed(1)}</span>
        </span>
      );
    }

    if (feature.type === 'number') {
      return (
        <span class="erx-comp__value">
          {Number(value).toLocaleString()}{feature.unit ? ` ${feature.unit}` : ''}
        </span>
      );
    }

    return <span class="erx-comp__value">{String(value)}</span>;
  }

  private isBestValue(feature: typeof this.config.features[0], itemIndex: number): boolean {
    if (!feature.higherIsBetter && feature.higherIsBetter !== false) return false;
    if (feature.type !== 'number') return false;

    const values = this.items.map(item => Number(item.features[feature.key]) || 0);
    const bestValue = feature.higherIsBetter
      ? Math.max(...values)
      : Math.min(...values);

    return values[itemIndex] === bestValue && values.filter(v => v === bestValue).length === 1;
  }

  render() {
    const { items, config } = this;

    return (
      <div class="erx-comp" part="container">
        <div class="erx-comp__table">
          <div class="erx-comp__header" part="header">
            <div class="erx-comp__feature-cell"></div>
            {items.map((item, index) => (
              <div
                class={{
                  'erx-comp__item-header': true,
                  'erx-comp__item-header--highlighted': !!item.highlighted,
                }}
                key={item.id}
                onClick={() => this.erxSelect.emit({ item })}
              >
                {item.badge && <span class="erx-comp__badge">{item.badge}</span>}
                {item.image && <img src={item.image} alt="" class="erx-comp__item-img" />}
                <span class="erx-comp__item-name">{item.name}</span>
                {config.showPrices && (
                  <span class="erx-comp__item-price">{this.formatPrice(item.price)}</span>
                )}
              </div>
            ))}
          </div>

          <div class="erx-comp__body" part="body">
            {config.features.map(feature => (
              <div class="erx-comp__row" key={feature.key}>
                <div class="erx-comp__feature-cell">
                  <span class="erx-comp__feature-label">{feature.label}</span>
                </div>
                {items.map((item, index) => (
                  <div
                    class={{
                      'erx-comp__value-cell': true,
                      'erx-comp__value-cell--highlighted': !!item.highlighted,
                      'erx-comp__value-cell--best': this.isBestValue(feature, index),
                    }}
                    key={item.id}
                  >
                    {this.renderFeatureValue(item, feature)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
