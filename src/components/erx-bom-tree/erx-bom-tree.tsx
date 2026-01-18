import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';
import { Bom, BomItem, BomSelectDetail } from './erx-bom-tree.types';

@Component({
  tag: 'erx-bom-tree',
  styleUrl: 'erx-bom-tree.css',
  shadow: true,
})
export class ErxBomTree {
  @Prop() bom!: Bom;
  @Prop() showCosts = true;
  @Prop() showStock = false;
  @Prop() expandAll = false;
  @Prop() currency = 'USD';
  @Prop() locale = 'en-US';

  @State() expandedItems: Set<string> = new Set();

  @Event() erxSelect!: EventEmitter<BomSelectDetail>;

  componentWillLoad() {
    if (this.expandAll) {
      this.expandAllItems(this.bom.items);
    }
  }

  private expandAllItems(items: BomItem[]) {
    items.forEach(item => {
      if (item.children && item.children.length > 0) {
        this.expandedItems.add(item.id);
        this.expandAllItems(item.children);
      }
    });
  }

  private getTypeIcon(type: BomItem['type']): string {
    const icons: Record<string, string> = {
      'product': '📦',
      'component': '🔩',
      'raw-material': '🪨',
      'consumable': '🧴',
    };
    return icons[type] || '📋';
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
    }).format(value);
  }

  private toggleItem(itemId: string, e: Event) {
    e.stopPropagation();
    const newExpanded = new Set(this.expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    this.expandedItems = newExpanded;
  }

  private handleSelect(item: BomItem, path: BomItem[], level: number) {
    this.erxSelect.emit({ item, path, level });
  }

  private renderItem(item: BomItem, path: BomItem[], level: number) {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = this.expandedItems.has(item.id);
    const currentPath = [...path, item];

    return (
      <div class="erx-bom__item-wrapper" key={item.id}>
        <div
          class={{
            'erx-bom__item': true,
            [`erx-bom__item--${item.type}`]: true,
            'erx-bom__item--expanded': isExpanded,
          }}
          style={{ paddingLeft: `${level * 24 + 12}px` }}
          onClick={() => this.handleSelect(item, currentPath, level)}
        >
          {hasChildren ? (
            <button
              class="erx-bom__toggle"
              onClick={(e) => this.toggleItem(item.id, e)}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          ) : (
            <span class="erx-bom__toggle-placeholder"></span>
          )}

          <span class="erx-bom__type-icon">{this.getTypeIcon(item.type)}</span>

          <div class="erx-bom__item-info">
            <span class="erx-bom__item-name">{item.name}</span>
            {item.sku && <span class="erx-bom__item-sku">{item.sku}</span>}
          </div>

          <span class="erx-bom__item-qty">
            {item.quantity} {item.unit}
          </span>

          {this.showCosts && item.unitCost !== undefined && (
            <span class="erx-bom__item-cost">
              {this.formatCurrency(item.unitCost)}
            </span>
          )}

          {this.showCosts && item.totalCost !== undefined && (
            <span class="erx-bom__item-total">
              {this.formatCurrency(item.totalCost)}
            </span>
          )}

          {this.showStock && item.available !== undefined && (
            <span
              class={{
                'erx-bom__item-stock': true,
                'erx-bom__item-stock--low': item.available < item.quantity,
                'erx-bom__item-stock--ok': item.available >= item.quantity,
              }}
            >
              {item.available} avail.
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div class="erx-bom__children">
            {item.children!.map(child => this.renderItem(child, currentPath, level + 1))}
          </div>
        )}
      </div>
    );
  }

  render() {
    const { bom, showCosts } = this;

    return (
      <div class="erx-bom" part="container">
        <div class="erx-bom__header" part="header">
          <div class="erx-bom__product">
            {bom.product.image && (
              <img src={bom.product.image} alt="" class="erx-bom__product-img" />
            )}
            <div class="erx-bom__product-info">
              <span class="erx-bom__product-name">{bom.product.name}</span>
              {bom.product.sku && <span class="erx-bom__product-sku">{bom.product.sku}</span>}
            </div>
          </div>
          {bom.version && (
            <span class="erx-bom__version">v{bom.version}</span>
          )}
          {bom.status && (
            <span class={`erx-bom__status erx-bom__status--${bom.status}`}>
              {bom.status}
            </span>
          )}
        </div>

        <div class="erx-bom__columns" part="columns">
          <span class="erx-bom__col erx-bom__col--name">Component</span>
          <span class="erx-bom__col erx-bom__col--qty">Qty</span>
          {showCosts && <span class="erx-bom__col erx-bom__col--cost">Unit Cost</span>}
          {showCosts && <span class="erx-bom__col erx-bom__col--total">Total</span>}
          {this.showStock && <span class="erx-bom__col erx-bom__col--stock">Stock</span>}
        </div>

        <div class="erx-bom__tree" part="tree">
          {bom.items.map(item => this.renderItem(item, [], 0))}
        </div>

        {showCosts && bom.totalCost !== undefined && (
          <div class="erx-bom__footer" part="footer">
            <span class="erx-bom__total-label">Total BOM Cost:</span>
            <span class="erx-bom__total-value">
              {this.formatCurrency(bom.totalCost)}
            </span>
          </div>
        )}
      </div>
    );
  }
}
