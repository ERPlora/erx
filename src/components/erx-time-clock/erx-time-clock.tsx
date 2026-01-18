import { Component, Prop, Event, EventEmitter, State, h, Element } from '@stencil/core';
import type { ErxTimeClockEvent } from './erx-time-clock.types';

@Component({
  tag: 'erx-time-clock',
  styleUrl: 'erx-time-clock.css',
  shadow: true,
})
export class ErxTimeClock {
  @Element() el!: HTMLElement;

  private interval?: number;

  @Prop() employeeId?: string | number;
  @Prop() employeeName?: string;
  @Prop() status: 'clocked-out' | 'clocked-in' | 'on-break' = 'clocked-out';
  @Prop() clockedInAt?: Date | string;
  @Prop() showDate = true;
  @Prop() showSeconds = true;
  @Prop() disabled = false;
  @Prop() locale = 'en-US';

  @State() currentTime = new Date();

  @Event() erxClockIn!: EventEmitter<ErxTimeClockEvent>;
  @Event() erxClockOut!: EventEmitter<ErxTimeClockEvent>;
  @Event() erxBreakStart!: EventEmitter<ErxTimeClockEvent>;
  @Event() erxBreakEnd!: EventEmitter<ErxTimeClockEvent>;

  componentDidLoad() {
    this.interval = window.setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  disconnectedCallback() {
    if (this.interval) clearInterval(this.interval);
  }

  private formatTime(): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...(this.showSeconds && { second: '2-digit' }),
    };
    return this.currentTime.toLocaleTimeString(this.locale, options);
  }

  private formatDate(): string {
    return this.currentTime.toLocaleDateString(this.locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  private getElapsedTime(): string {
    if (!this.clockedInAt) return '00:00:00';
    const start = new Date(this.clockedInAt).getTime();
    const elapsed = Math.floor((this.currentTime.getTime() - start) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  private handleAction(action: 'clock-in' | 'clock-out' | 'break-start' | 'break-end') {
    const event: ErxTimeClockEvent = { action, timestamp: new Date(), employeeId: this.employeeId };
    switch (action) {
      case 'clock-in': this.erxClockIn.emit(event); break;
      case 'clock-out': this.erxClockOut.emit(event); break;
      case 'break-start': this.erxBreakStart.emit(event); break;
      case 'break-end': this.erxBreakEnd.emit(event); break;
    }
  }

  render() {
    return (
      <div class={{ 'erx-clock': true, 'erx-clock--disabled': this.disabled }} part="container">
        {this.employeeName && <div class="erx-clock__employee">{this.employeeName}</div>}

        <div class="erx-clock__time" part="time">{this.formatTime()}</div>
        {this.showDate && <div class="erx-clock__date" part="date">{this.formatDate()}</div>}

        {this.status !== 'clocked-out' && (
          <div class="erx-clock__elapsed" part="elapsed">
            <span class="erx-clock__elapsed-label">Time worked</span>
            <span class="erx-clock__elapsed-value">{this.getElapsedTime()}</span>
          </div>
        )}

        <div class="erx-clock__status" part="status">
          <span class={`erx-clock__status-badge erx-clock__status-badge--${this.status}`}>
            {this.status === 'clocked-out' ? 'Clocked Out' : this.status === 'clocked-in' ? 'Working' : 'On Break'}
          </span>
        </div>

        <div class="erx-clock__actions" part="actions">
          {this.status === 'clocked-out' && (
            <button class="erx-clock__btn erx-clock__btn--primary" onClick={() => this.handleAction('clock-in')} disabled={this.disabled} type="button">
              Clock In
            </button>
          )}
          {this.status === 'clocked-in' && (
            <div class="erx-clock__btn-group">
              <button class="erx-clock__btn erx-clock__btn--secondary" onClick={() => this.handleAction('break-start')} disabled={this.disabled} type="button">
                Start Break
              </button>
              <button class="erx-clock__btn erx-clock__btn--danger" onClick={() => this.handleAction('clock-out')} disabled={this.disabled} type="button">
                Clock Out
              </button>
            </div>
          )}
          {this.status === 'on-break' && (
            <button class="erx-clock__btn erx-clock__btn--success" onClick={() => this.handleAction('break-end')} disabled={this.disabled} type="button">
              End Break
            </button>
          )}
        </div>
      </div>
    );
  }
}
