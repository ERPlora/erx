import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { WorkOrder, WorkOrderActionDetail } from './erx-work-order.types';

@Component({
  tag: 'erx-work-order',
  styleUrl: 'erx-work-order.css',
  shadow: true,
})
export class ErxWorkOrder {
  @Prop() order!: WorkOrder;
  @Prop() showMaterials = false;
  @Prop() showOperations = false;
  @Prop() showActions = true;
  @Prop() compact = false;

  @Event() erxAction!: EventEmitter<WorkOrderActionDetail>;
  @Event() erxSelect!: EventEmitter<WorkOrder>;

  private getStatusIcon(): string {
    const icons: Record<string, string> = {
      'draft': '📝',
      'pending': '⏳',
      'in-progress': '🔄',
      'completed': '✅',
      'cancelled': '❌',
      'on-hold': '⏸️',
    };
    return icons[this.order.status] || '📋';
  }

  private getPriorityIcon(): string {
    const icons: Record<string, string> = {
      'low': '🔵',
      'medium': '🟡',
      'high': '🟠',
      'urgent': '🔴',
    };
    return icons[this.order.priority] || '';
  }

  private getProgress(): number {
    if (this.order.quantity === 0) return 0;
    return Math.round((this.order.quantityProduced / this.order.quantity) * 100);
  }

  private formatDate(dateStr?: string): string {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString();
  }

  private handleAction(action: WorkOrderActionDetail['action'], e: Event) {
    e.stopPropagation();
    this.erxAction.emit({ action, order: this.order });
  }

  private handleSelect = () => {
    this.erxSelect.emit(this.order);
  };

  render() {
    const { order, showMaterials, showOperations, showActions, compact } = this;
    const progress = this.getProgress();

    return (
      <div
        class={{
          'erx-wo': true,
          [`erx-wo--${order.status}`]: true,
          [`erx-wo--priority-${order.priority}`]: true,
          'erx-wo--compact': compact,
        }}
        onClick={this.handleSelect}
        part="container"
      >
        <div class="erx-wo__header" part="header">
          <div class="erx-wo__number">
            <span class="erx-wo__status-icon">{this.getStatusIcon()}</span>
            <span>{order.number}</span>
          </div>
          <div class="erx-wo__priority">
            <span class="erx-wo__priority-icon">{this.getPriorityIcon()}</span>
            <span class={`erx-wo__priority-label erx-wo__priority-label--${order.priority}`}>
              {order.priority}
            </span>
          </div>
        </div>

        <div class="erx-wo__product" part="product">
          {order.product.image && (
            <img src={order.product.image} alt={order.product.name} class="erx-wo__product-img" />
          )}
          <div class="erx-wo__product-info">
            <span class="erx-wo__product-name">{order.product.name}</span>
            {order.product.sku && <span class="erx-wo__product-sku">{order.product.sku}</span>}
          </div>
        </div>

        <div class="erx-wo__quantity" part="quantity">
          <div class="erx-wo__qty-label">Progress</div>
          <div class="erx-wo__qty-values">
            <span class="erx-wo__qty-produced">{order.quantityProduced}</span>
            <span class="erx-wo__qty-sep">/</span>
            <span class="erx-wo__qty-total">{order.quantity} {order.unit}</span>
          </div>
          <div class="erx-wo__progress-bar">
            <div class="erx-wo__progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span class="erx-wo__progress-text">{progress}%</span>
        </div>

        {!compact && (
          <div class="erx-wo__schedule" part="schedule">
            <div class="erx-wo__date">
              <span class="erx-wo__date-label">Scheduled</span>
              <span class="erx-wo__date-value">
                {this.formatDate(order.scheduledStart)} - {this.formatDate(order.scheduledEnd)}
              </span>
            </div>
            {order.assignee && (
              <div class="erx-wo__assignee">
                {order.assignee.avatar ? (
                  <img src={order.assignee.avatar} alt="" class="erx-wo__assignee-avatar" />
                ) : (
                  <span class="erx-wo__assignee-avatar">
                    {order.assignee.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <span class="erx-wo__assignee-name">{order.assignee.name}</span>
              </div>
            )}
          </div>
        )}

        {showMaterials && order.materials && order.materials.length > 0 && (
          <div class="erx-wo__materials" part="materials">
            <div class="erx-wo__section-title">Materials</div>
            {order.materials.map(mat => (
              <div class="erx-wo__material" key={mat.id}>
                <span class="erx-wo__mat-name">{mat.name}</span>
                <span class="erx-wo__mat-qty">
                  {mat.consumed}/{mat.required} {mat.unit}
                </span>
                <div class="erx-wo__mat-bar">
                  <div
                    class="erx-wo__mat-fill"
                    style={{ width: `${Math.min((mat.consumed / mat.required) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showOperations && order.operations && order.operations.length > 0 && (
          <div class="erx-wo__operations" part="operations">
            <div class="erx-wo__section-title">Operations</div>
            {order.operations.map(op => (
              <div class={{ 'erx-wo__operation': true, 'erx-wo__operation--done': op.completed }} key={op.id}>
                <span class="erx-wo__op-check">{op.completed ? '✓' : '○'}</span>
                <span class="erx-wo__op-name">{op.name}</span>
                {op.workCenter && <span class="erx-wo__op-center">{op.workCenter}</span>}
                <span class="erx-wo__op-time">{op.duration}m</span>
              </div>
            ))}
          </div>
        )}

        {showActions && order.status !== 'completed' && order.status !== 'cancelled' && (
          <div class="erx-wo__actions" part="actions">
            {order.status === 'pending' && (
              <button class="erx-wo__btn erx-wo__btn--start" onClick={(e) => this.handleAction('start', e)}>
                Start
              </button>
            )}
            {order.status === 'in-progress' && (
              <button class="erx-wo__btn erx-wo__btn--pause" onClick={(e) => this.handleAction('pause', e)}>
                Pause
              </button>
            )}
            {order.status === 'in-progress' && (
              <button class="erx-wo__btn erx-wo__btn--complete" onClick={(e) => this.handleAction('complete', e)}>
                Complete
              </button>
            )}
            {order.status === 'on-hold' && (
              <button class="erx-wo__btn erx-wo__btn--start" onClick={(e) => this.handleAction('start', e)}>
                Resume
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}
