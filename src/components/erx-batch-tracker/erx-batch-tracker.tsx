import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { Batch, BatchSelectDetail, BatchStage } from './erx-batch-tracker.types';

@Component({
  tag: 'erx-batch-tracker',
  styleUrl: 'erx-batch-tracker.css',
  shadow: true,
})
export class ErxBatchTracker {
  @Prop() batch!: Batch;
  @Prop() showTimeline = true;
  @Prop() showQR = false;
  @Prop() compact = false;

  @Event() erxSelect!: EventEmitter<BatchSelectDetail>;
  @Event() erxStageSelect!: EventEmitter<BatchStage>;

  private getStatusIcon(): string {
    const icons: Record<string, string> = {
      'created': '📝',
      'in-production': '🔄',
      'quality-check': '🔍',
      'completed': '✅',
      'rejected': '❌',
      'shipped': '📦',
    };
    return icons[this.batch.status] || '📋';
  }

  private formatDate(dateStr?: string): string {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString();
  }

  private formatDateTime(dateStr?: string): string {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  private getYieldPercentage(): number {
    if (this.batch.quantity === 0) return 0;
    return Math.round((this.batch.quantityGood / this.batch.quantity) * 100);
  }

  private handleSelect = () => {
    this.erxSelect.emit({ batch: this.batch });
  };

  private handleStageSelect(stage: BatchStage, e: Event) {
    e.stopPropagation();
    this.erxStageSelect.emit(stage);
  }

  render() {
    const { batch, showTimeline, showQR, compact } = this;
    const yieldPct = this.getYieldPercentage();

    return (
      <div
        class={{
          'erx-batch': true,
          [`erx-batch--${batch.status}`]: true,
          'erx-batch--compact': compact,
        }}
        onClick={this.handleSelect}
        part="container"
      >
        <div class="erx-batch__header" part="header">
          <div class="erx-batch__number">
            <span class="erx-batch__status-icon">{this.getStatusIcon()}</span>
            <span class="erx-batch__number-text">{batch.number}</span>
          </div>
          <span class={`erx-batch__status erx-batch__status--${batch.status}`}>
            {batch.status.replace('-', ' ')}
          </span>
        </div>

        <div class="erx-batch__product" part="product">
          {batch.product.image && (
            <img src={batch.product.image} alt="" class="erx-batch__product-img" />
          )}
          <div class="erx-batch__product-info">
            <span class="erx-batch__product-name">{batch.product.name}</span>
            {batch.product.sku && <span class="erx-batch__product-sku">{batch.product.sku}</span>}
          </div>
        </div>

        <div class="erx-batch__quantities" part="quantities">
          <div class="erx-batch__qty">
            <span class="erx-batch__qty-value">{batch.quantity}</span>
            <span class="erx-batch__qty-label">Total</span>
          </div>
          <div class="erx-batch__qty erx-batch__qty--good">
            <span class="erx-batch__qty-value">{batch.quantityGood}</span>
            <span class="erx-batch__qty-label">Good</span>
          </div>
          <div class="erx-batch__qty erx-batch__qty--defect">
            <span class="erx-batch__qty-value">{batch.quantityDefect}</span>
            <span class="erx-batch__qty-label">Defect</span>
          </div>
          <div class="erx-batch__yield">
            <svg viewBox="0 0 36 36" class="erx-batch__yield-ring">
              <path
                class="erx-batch__yield-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                class="erx-batch__yield-fill"
                stroke-dasharray={`${yieldPct}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span class="erx-batch__yield-text">{yieldPct}%</span>
          </div>
        </div>

        {!compact && batch.stages && batch.stages.length > 0 && (
          <div class="erx-batch__stages" part="stages">
            {batch.stages.map((stage, index) => (
              <div
                class={{
                  'erx-batch__stage': true,
                  [`erx-batch__stage--${stage.status}`]: true,
                }}
                key={stage.id}
                onClick={(e) => this.handleStageSelect(stage, e)}
              >
                <div class="erx-batch__stage-indicator">
                  <span class="erx-batch__stage-dot"></span>
                  {index < batch.stages!.length - 1 && (
                    <span class="erx-batch__stage-line"></span>
                  )}
                </div>
                <div class="erx-batch__stage-content">
                  <span class="erx-batch__stage-name">{stage.name}</span>
                  {stage.completedAt && (
                    <span class="erx-batch__stage-time">
                      {this.formatDateTime(stage.completedAt)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!compact && showTimeline && batch.events && batch.events.length > 0 && (
          <div class="erx-batch__timeline" part="timeline">
            <div class="erx-batch__timeline-title">History</div>
            {batch.events.slice(0, 5).map(event => (
              <div class="erx-batch__event" key={event.id}>
                <span class="erx-batch__event-time">
                  {this.formatDateTime(event.timestamp)}
                </span>
                <span class="erx-batch__event-desc">{event.description}</span>
                {event.user && (
                  <span class="erx-batch__event-user">{event.user.name}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {!compact && (
          <div class="erx-batch__dates" part="dates">
            {batch.manufactureDate && (
              <div class="erx-batch__date">
                <span class="erx-batch__date-label">Manufactured</span>
                <span class="erx-batch__date-value">{this.formatDate(batch.manufactureDate)}</span>
              </div>
            )}
            {batch.expiryDate && (
              <div class="erx-batch__date">
                <span class="erx-batch__date-label">Expires</span>
                <span class="erx-batch__date-value">{this.formatDate(batch.expiryDate)}</span>
              </div>
            )}
            {batch.location && (
              <div class="erx-batch__date">
                <span class="erx-batch__date-label">Location</span>
                <span class="erx-batch__date-value">{batch.location}</span>
              </div>
            )}
          </div>
        )}

        {showQR && batch.qrCode && (
          <div class="erx-batch__qr" part="qr">
            <img src={batch.qrCode} alt="Batch QR Code" class="erx-batch__qr-img" />
          </div>
        )}
      </div>
    );
  }
}
