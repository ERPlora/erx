import { Component, Prop, Event, EventEmitter, h, Element } from '@stencil/core';
import type { ErxLeaveRequest, ErxLeaveRequestActionEvent } from './erx-leave-request.types';

@Component({
  tag: 'erx-leave-request',
  styleUrl: 'erx-leave-request.css',
  shadow: true,
})
export class ErxLeaveRequestComponent {
  @Element() el!: HTMLElement;

  @Prop() request!: ErxLeaveRequest;
  @Prop() showActions = true;
  @Prop() locale = 'en-US';
  @Prop() compact = false;

  @Event() erxAction!: EventEmitter<ErxLeaveRequestActionEvent>;
  @Event() erxSelect!: EventEmitter<{ request: ErxLeaveRequest }>;

  private formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString(this.locale, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  private getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      vacation: 'Vacation', sick: 'Sick Leave', personal: 'Personal', maternity: 'Maternity',
      paternity: 'Paternity', unpaid: 'Unpaid Leave', other: 'Other',
    };
    return labels[type] || type;
  }

  private getTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      vacation: '🏖️', sick: '🤒', personal: '👤', maternity: '👶',
      paternity: '👶', unpaid: '📝', other: '📋',
    };
    return icons[type] || '📋';
  }

  private handleAction(action: 'approve' | 'reject' | 'cancel', e: MouseEvent) {
    e.stopPropagation();
    this.erxAction.emit({ request: this.request, action });
  }

  render() {
    const { request } = this;

    return (
      <div
        class={{ 'erx-leave': true, [`erx-leave--${request.status}`]: true, 'erx-leave--compact': this.compact }}
        onClick={() => this.erxSelect.emit({ request })}
        part="container"
      >
        <div class="erx-leave__header" part="header">
          <span class="erx-leave__icon">{this.getTypeIcon(request.type)}</span>
          <span class="erx-leave__type">{this.getTypeLabel(request.type)}</span>
          <span class={`erx-leave__status erx-leave__status--${request.status}`}>{request.status}</span>
        </div>

        {request.employeeName && <div class="erx-leave__employee">{request.employeeName}</div>}

        <div class="erx-leave__dates" part="dates">
          <span>{this.formatDate(request.startDate)}</span>
          <span class="erx-leave__arrow">→</span>
          <span>{this.formatDate(request.endDate)}</span>
        </div>

        <div class="erx-leave__days">{request.days} day{request.days !== 1 ? 's' : ''}</div>

        {request.reason && <div class="erx-leave__reason">{request.reason}</div>}

        {this.showActions && request.status === 'pending' && (
          <div class="erx-leave__actions" part="actions">
            <button class="erx-leave__btn erx-leave__btn--approve" onClick={(e) => this.handleAction('approve', e)} type="button">Approve</button>
            <button class="erx-leave__btn erx-leave__btn--reject" onClick={(e) => this.handleAction('reject', e)} type="button">Reject</button>
          </div>
        )}
      </div>
    );
  }
}
