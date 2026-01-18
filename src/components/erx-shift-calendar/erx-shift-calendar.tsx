import { Component, Prop, Event, EventEmitter, State, h, Element, Watch } from '@stencil/core';
import type { ErxShift, ErxShiftSelectEvent } from './erx-shift-calendar.types';

@Component({
  tag: 'erx-shift-calendar',
  styleUrl: 'erx-shift-calendar.css',
  shadow: true,
})
export class ErxShiftCalendar {
  @Element() el!: HTMLElement;

  @Prop() shifts: ErxShift[] = [];
  @Prop() employees: { id: string | number; name: string }[] = [];
  @Prop({ mutable: true }) currentDate = new Date();
  @Prop() view: 'week' | 'month' = 'week';
  @Prop() locale = 'en-US';
  @Prop() disabled = false;

  @State() weekDays: Date[] = [];

  @Event() erxSelect!: EventEmitter<ErxShiftSelectEvent>;
  @Event() erxDateChange!: EventEmitter<{ date: Date }>;

  @Watch('currentDate')
  handleDateChange() {
    this.generateWeekDays();
  }

  componentWillLoad() {
    this.generateWeekDays();
  }

  private generateWeekDays() {
    const days: Date[] = [];
    const start = new Date(this.currentDate);
    start.setDate(start.getDate() - start.getDay());
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    this.weekDays = days;
  }

  private navigate(direction: number) {
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    this.currentDate = newDate;
    this.erxDateChange.emit({ date: newDate });
  }

  private getShiftsForDay(employeeId: string | number, date: Date): ErxShift[] {
    const dateStr = date.toISOString().split('T')[0];
    return this.shifts.filter(s => {
      const shiftDate = new Date(s.date).toISOString().split('T')[0];
      return s.employeeId === employeeId && shiftDate === dateStr;
    });
  }

  private formatDayHeader(date: Date): string {
    return date.toLocaleDateString(this.locale, { weekday: 'short', day: 'numeric' });
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  private handleShiftClick(shift: ErxShift, date: Date) {
    if (this.disabled) return;
    this.erxSelect.emit({ shift, date });
  }

  private getShiftColor(shift: ErxShift): string {
    if (shift.color) return shift.color;
    const colors: Record<string, string> = {
      morning: '#10b981',
      afternoon: '#3b82f6',
      night: '#8b5cf6',
      custom: '#6b7280',
    };
    return colors[shift.type || 'custom'];
  }

  render() {
    return (
      <div class={{ 'erx-shift': true, 'erx-shift--disabled': this.disabled }} part="container">
        <div class="erx-shift__header" part="header">
          <button class="erx-shift__nav-btn" onClick={() => this.navigate(-1)} type="button">‹</button>
          <span class="erx-shift__title">
            {this.currentDate.toLocaleDateString(this.locale, { month: 'long', year: 'numeric' })}
          </span>
          <button class="erx-shift__nav-btn" onClick={() => this.navigate(1)} type="button">›</button>
        </div>

        <div class="erx-shift__grid" part="grid">
          <div class="erx-shift__row erx-shift__row--header">
            <div class="erx-shift__cell erx-shift__cell--employee">Employee</div>
            {this.weekDays.map(day => (
              <div class={{ 'erx-shift__cell': true, 'erx-shift__cell--day': true, 'erx-shift__cell--today': this.isToday(day) }} key={day.toISOString()}>
                {this.formatDayHeader(day)}
              </div>
            ))}
          </div>

          {this.employees.map(emp => (
            <div class="erx-shift__row" key={emp.id}>
              <div class="erx-shift__cell erx-shift__cell--employee">{emp.name}</div>
              {this.weekDays.map(day => {
                const dayShifts = this.getShiftsForDay(emp.id, day);
                return (
                  <div class={{ 'erx-shift__cell': true, 'erx-shift__cell--today': this.isToday(day) }} key={day.toISOString()}>
                    {dayShifts.map(shift => (
                      <div
                        class="erx-shift__shift"
                        style={{ '--shift-color': this.getShiftColor(shift) }}
                        onClick={() => this.handleShiftClick(shift, day)}
                        key={shift.id}
                      >
                        {shift.startTime} - {shift.endTime}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
