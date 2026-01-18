import { Component, Prop, Event, EventEmitter, h, Element } from '@stencil/core';
import type { ErxAttendanceRecord } from './erx-attendance-list.types';

@Component({
  tag: 'erx-attendance-list',
  styleUrl: 'erx-attendance-list.css',
  shadow: true,
})
export class ErxAttendanceList {
  @Element() el!: HTMLElement;

  @Prop() records: ErxAttendanceRecord[] = [];
  @Prop() showAvatar = true;
  @Prop() showTime = true;
  @Prop() showHours = true;
  @Prop() locale = 'en-US';
  @Prop() compact = false;

  @Event() erxSelect!: EventEmitter<{ record: ErxAttendanceRecord }>;

  private formatTime(date?: Date | string): string {
    if (!date) return '--:--';
    return new Date(date).toLocaleTimeString(this.locale, { hour: '2-digit', minute: '2-digit' });
  }

  private formatHours(hours?: number): string {
    if (!hours) return '-';
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  }

  private getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      present: 'Present',
      absent: 'Absent',
      late: 'Late',
      'half-day': 'Half Day',
      'on-leave': 'On Leave',
    };
    return labels[status] || status;
  }

  render() {
    return (
      <div class={{ 'erx-att': true, 'erx-att--compact': this.compact }} part="container">
        <div class="erx-att__header" part="header">
          <span class="erx-att__col erx-att__col--name">Employee</span>
          {this.showTime && <span class="erx-att__col erx-att__col--time">In / Out</span>}
          {this.showHours && <span class="erx-att__col erx-att__col--hours">Hours</span>}
          <span class="erx-att__col erx-att__col--status">Status</span>
        </div>

        <div class="erx-att__list" part="list">
          {this.records.map(record => (
            <div
              class={`erx-att__item erx-att__item--${record.status}`}
              onClick={() => this.erxSelect.emit({ record })}
              key={record.id}
              part="item"
            >
              <div class="erx-att__col erx-att__col--name">
                {this.showAvatar && (
                  <div class="erx-att__avatar">
                    {record.avatar ? (
                      <img src={record.avatar} alt={record.employeeName} />
                    ) : (
                      <span>{record.employeeName.charAt(0)}</span>
                    )}
                  </div>
                )}
                <span class="erx-att__name">{record.employeeName}</span>
              </div>

              {this.showTime && (
                <div class="erx-att__col erx-att__col--time">
                  <span class="erx-att__time-in">{this.formatTime(record.clockIn)}</span>
                  <span class="erx-att__time-sep">-</span>
                  <span class="erx-att__time-out">{this.formatTime(record.clockOut)}</span>
                </div>
              )}

              {this.showHours && (
                <div class="erx-att__col erx-att__col--hours">
                  {this.formatHours(record.hoursWorked)}
                </div>
              )}

              <div class="erx-att__col erx-att__col--status">
                <span class={`erx-att__status erx-att__status--${record.status}`}>
                  {this.getStatusLabel(record.status)}
                </span>
              </div>
            </div>
          ))}

          {this.records.length === 0 && (
            <div class="erx-att__empty">No attendance records</div>
          )}
        </div>
      </div>
    );
  }
}
