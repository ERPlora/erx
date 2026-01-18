import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';
import { QualityCheck, QualityCheckItem, QualityCheckResultDetail, QualityCheckCompleteDetail, CheckResult } from './erx-quality-check.types';

@Component({
  tag: 'erx-quality-check',
  styleUrl: 'erx-quality-check.css',
  shadow: true,
})
export class ErxQualityCheck {
  @Prop() check!: QualityCheck;
  @Prop() editable = true;
  @Prop() showNotes = true;

  @State() expandedItem: string | null = null;

  @Event() erxResult!: EventEmitter<QualityCheckResultDetail>;
  @Event() erxComplete!: EventEmitter<QualityCheckCompleteDetail>;
  @Event() erxSelect!: EventEmitter<QualityCheck>;

  private getResultIcon(result: CheckResult): string {
    const icons: Record<string, string> = {
      'pass': '✅',
      'fail': '❌',
      'pending': '⏳',
      'na': '➖',
    };
    return icons[result] || '❓';
  }

  private getTypeIcon(type: QualityCheckItem['type']): string {
    const icons: Record<string, string> = {
      'visual': '👁️',
      'measurement': '📏',
      'functional': '⚙️',
      'documentation': '📄',
    };
    return icons[type] || '📋';
  }

  private getPassCount(): number {
    return this.check.items.filter(i => i.result === 'pass').length;
  }

  private getFailCount(): number {
    return this.check.items.filter(i => i.result === 'fail').length;
  }

  private getPendingCount(): number {
    return this.check.items.filter(i => i.result === 'pending').length;
  }

  private handleItemResult(item: QualityCheckItem, result: CheckResult) {
    this.erxResult.emit({ item, result });
  }

  private handleComplete(result: 'pass' | 'fail') {
    this.erxComplete.emit({ check: this.check, result });
  }

  private toggleItem(itemId: string) {
    this.expandedItem = this.expandedItem === itemId ? null : itemId;
  }

  render() {
    const { check, editable, showNotes } = this;
    const passCount = this.getPassCount();
    const failCount = this.getFailCount();
    const pendingCount = this.getPendingCount();
    const total = check.items.length;

    return (
      <div
        class={{
          'erx-qc': true,
          [`erx-qc--${check.status}`]: true,
        }}
        part="container"
      >
        <div class="erx-qc__header" part="header">
          <div class="erx-qc__title-row">
            <span class="erx-qc__number">{check.number}</span>
            <span class={`erx-qc__status erx-qc__status--${check.status}`}>
              {check.status.replace('-', ' ')}
            </span>
          </div>
          <span class="erx-qc__type">{check.type} Inspection</span>
        </div>

        <div class="erx-qc__product" part="product">
          {check.product.image && (
            <img src={check.product.image} alt="" class="erx-qc__product-img" />
          )}
          <div class="erx-qc__product-info">
            <span class="erx-qc__product-name">{check.product.name}</span>
            {check.product.sku && <span class="erx-qc__product-sku">{check.product.sku}</span>}
            {check.batch && <span class="erx-qc__batch">Batch: {check.batch}</span>}
          </div>
        </div>

        <div class="erx-qc__summary" part="summary">
          <div class="erx-qc__summary-item erx-qc__summary-item--pass">
            <span class="erx-qc__summary-value">{passCount}</span>
            <span class="erx-qc__summary-label">Pass</span>
          </div>
          <div class="erx-qc__summary-item erx-qc__summary-item--fail">
            <span class="erx-qc__summary-value">{failCount}</span>
            <span class="erx-qc__summary-label">Fail</span>
          </div>
          <div class="erx-qc__summary-item erx-qc__summary-item--pending">
            <span class="erx-qc__summary-value">{pendingCount}</span>
            <span class="erx-qc__summary-label">Pending</span>
          </div>
          <div class="erx-qc__progress-ring">
            <svg viewBox="0 0 36 36" class="erx-qc__ring">
              <path
                class="erx-qc__ring-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                class="erx-qc__ring-fill"
                stroke-dasharray={`${((passCount / total) * 100)}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span class="erx-qc__ring-text">{Math.round((passCount / total) * 100)}%</span>
          </div>
        </div>

        <div class="erx-qc__items" part="items">
          {check.items.map(item => (
            <div
              class={{
                'erx-qc__item': true,
                [`erx-qc__item--${item.result}`]: true,
                'erx-qc__item--expanded': this.expandedItem === item.id,
              }}
              key={item.id}
            >
              <div class="erx-qc__item-header" onClick={() => this.toggleItem(item.id)}>
                <span class="erx-qc__item-type">{this.getTypeIcon(item.type)}</span>
                <span class="erx-qc__item-name">{item.name}</span>
                <span class="erx-qc__item-result">{this.getResultIcon(item.result)}</span>
              </div>

              {this.expandedItem === item.id && (
                <div class="erx-qc__item-details">
                  {item.description && (
                    <p class="erx-qc__item-desc">{item.description}</p>
                  )}

                  {item.specification && (
                    <div class="erx-qc__spec">
                      <span class="erx-qc__spec-label">Specification:</span>
                      <span class="erx-qc__spec-value">{item.specification}</span>
                    </div>
                  )}

                  {(item.minValue !== undefined || item.maxValue !== undefined) && (
                    <div class="erx-qc__range">
                      <span class="erx-qc__range-label">Acceptable Range:</span>
                      <span class="erx-qc__range-value">
                        {item.minValue ?? '-'} - {item.maxValue ?? '-'} {item.unit || ''}
                      </span>
                    </div>
                  )}

                  {item.actualValue !== undefined && (
                    <div class="erx-qc__actual">
                      <span class="erx-qc__actual-label">Actual Value:</span>
                      <span class="erx-qc__actual-value">
                        {item.actualValue} {item.unit || ''}
                      </span>
                    </div>
                  )}

                  {editable && check.status === 'in-progress' && (
                    <div class="erx-qc__item-actions">
                      <button
                        class="erx-qc__result-btn erx-qc__result-btn--pass"
                        onClick={() => this.handleItemResult(item, 'pass')}
                      >
                        Pass
                      </button>
                      <button
                        class="erx-qc__result-btn erx-qc__result-btn--fail"
                        onClick={() => this.handleItemResult(item, 'fail')}
                      >
                        Fail
                      </button>
                      <button
                        class="erx-qc__result-btn erx-qc__result-btn--na"
                        onClick={() => this.handleItemResult(item, 'na')}
                      >
                        N/A
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {check.inspector && (
          <div class="erx-qc__inspector" part="inspector">
            {check.inspector.avatar ? (
              <img src={check.inspector.avatar} alt="" class="erx-qc__inspector-avatar" />
            ) : (
              <span class="erx-qc__inspector-avatar">
                {check.inspector.name.charAt(0).toUpperCase()}
              </span>
            )}
            <span class="erx-qc__inspector-name">{check.inspector.name}</span>
          </div>
        )}

        {showNotes && check.notes && (
          <div class="erx-qc__notes" part="notes">
            <span class="erx-qc__notes-label">Notes:</span>
            <p class="erx-qc__notes-text">{check.notes}</p>
          </div>
        )}

        {editable && check.status === 'in-progress' && pendingCount === 0 && (
          <div class="erx-qc__actions" part="actions">
            <button
              class="erx-qc__btn erx-qc__btn--approve"
              onClick={() => this.handleComplete('pass')}
              disabled={failCount > 0}
            >
              Approve
            </button>
            <button
              class="erx-qc__btn erx-qc__btn--reject"
              onClick={() => this.handleComplete('fail')}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    );
  }
}
