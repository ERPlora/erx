import { Component, Prop, State, Event, EventEmitter, h, Method } from '@stencil/core';
import { CalendarEvent, CalendarConfig, CalendarView, CalendarSelectDetail, CalendarEventSelectDetail, CalendarViewChangeDetail } from './erx-calendar.types';

@Component({
  tag: 'erx-calendar',
  styleUrl: 'erx-calendar.css',
  shadow: true,
})
export class ErxCalendar {
  @Prop() events: CalendarEvent[] = [];
  @Prop() config: CalendarConfig = { view: 'month' };
  @Prop() selectedDate?: string;
  @Prop() disabled = false;

  @State() currentDate: Date = new Date();
  @State() view: CalendarView = 'month';
  @State() selected: Date | null = null;

  @Event() erxSelect!: EventEmitter<CalendarSelectDetail>;
  @Event() erxEventSelect!: EventEmitter<CalendarEventSelectDetail>;
  @Event() erxViewChange!: EventEmitter<CalendarViewChangeDetail>;

  componentWillLoad() {
    this.view = this.config.view || 'month';
    if (this.selectedDate) {
      this.selected = new Date(this.selectedDate);
      this.currentDate = new Date(this.selectedDate);
    }
  }

  @Method()
  async goToDate(date: Date): Promise<void> {
    this.currentDate = new Date(date);
  }

  @Method()
  async setView(view: CalendarView): Promise<void> {
    this.view = view;
    this.emitViewChange();
  }

  private get locale(): string {
    return this.config.locale || 'en-US';
  }

  private get firstDayOfWeek(): number {
    return this.config.firstDayOfWeek ?? 0;
  }

  private getMonthDays(): Date[][] {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDate = new Date(firstDay);
    const dayOffset = (firstDay.getDay() - this.firstDayOfWeek + 7) % 7;
    startDate.setDate(startDate.getDate() - dayOffset);

    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      currentWeek.push(date);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
        if (date > lastDay && weeks.length >= 5) break;
      }
    }

    return weeks;
  }

  private getWeekDayNames(): string[] {
    const names: string[] = [];
    const baseDate = new Date(2024, 0, this.firstDayOfWeek);
    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      names.push(date.toLocaleDateString(this.locale, { weekday: 'short' }));
    }
    return names;
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  private isSelected(date: Date): boolean {
    return this.selected?.toDateString() === date.toDateString();
  }

  private isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate.getMonth();
  }

  private getEventsForDate(date: Date): CalendarEvent[] {
    return this.events.filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = event.end ? new Date(event.end) : eventStart;
      return date >= new Date(eventStart.toDateString()) && date <= new Date(eventEnd.toDateString());
    });
  }

  private navigate(direction: 'prev' | 'next') {
    const newDate = new Date(this.currentDate);
    if (this.view === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (this.view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (this.view === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (this.view === 'year') {
      newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
    }
    this.currentDate = newDate;
    this.emitViewChange();
  }

  private goToToday() {
    this.currentDate = new Date();
    this.selected = new Date();
    this.emitViewChange();
  }

  private handleDateSelect(date: Date) {
    this.selected = date;
    const events = this.getEventsForDate(date);
    this.erxSelect.emit({ date, events });
  }

  private handleEventClick(event: CalendarEvent, date: Date, e: Event) {
    e.stopPropagation();
    this.erxEventSelect.emit({ event, date });
  }

  private emitViewChange() {
    const start = new Date(this.currentDate);
    const end = new Date(this.currentDate);
    if (this.view === 'month') {
      start.setDate(1);
      end.setMonth(end.getMonth() + 1, 0);
    } else if (this.view === 'week') {
      const dayOffset = (start.getDay() - this.firstDayOfWeek + 7) % 7;
      start.setDate(start.getDate() - dayOffset);
      end.setDate(start.getDate() + 6);
    }
    this.erxViewChange.emit({ view: this.view, start, end });
  }

  private formatMonthYear(): string {
    return this.currentDate.toLocaleDateString(this.locale, { month: 'long', year: 'numeric' });
  }

  private renderMonthView() {
    const weeks = this.getMonthDays();
    const weekDays = this.getWeekDayNames();

    return (
      <div class="erx-cal__month" part="month">
        <div class="erx-cal__weekdays">
          {weekDays.map(day => (
            <div class="erx-cal__weekday" key={day}>{day}</div>
          ))}
        </div>
        <div class="erx-cal__weeks">
          {weeks.map((week, weekIndex) => (
            <div class="erx-cal__week" key={weekIndex}>
              {week.map(date => {
                const events = this.getEventsForDate(date);
                return (
                  <div
                    class={{
                      'erx-cal__day': true,
                      'erx-cal__day--today': this.isToday(date),
                      'erx-cal__day--selected': this.isSelected(date),
                      'erx-cal__day--other-month': !this.isCurrentMonth(date),
                      'erx-cal__day--has-events': events.length > 0,
                    }}
                    key={date.toISOString()}
                    onClick={() => this.handleDateSelect(date)}
                  >
                    <span class="erx-cal__day-number">{date.getDate()}</span>
                    {events.length > 0 && (
                      <div class="erx-cal__day-events">
                        {events.slice(0, 3).map(event => (
                          <div
                            class="erx-cal__event"
                            style={{ background: event.color || 'var(--erx-color-primary, #667eea)' }}
                            key={event.id}
                            onClick={(e) => this.handleEventClick(event, date, e)}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {events.length > 3 && (
                          <div class="erx-cal__more">+{events.length - 3} more</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  private renderYearView() {
    const months: Date[] = [];
    for (let i = 0; i < 12; i++) {
      months.push(new Date(this.currentDate.getFullYear(), i, 1));
    }

    return (
      <div class="erx-cal__year" part="year">
        {months.map(month => {
          const monthEvents = this.events.filter(e => {
            const d = new Date(e.start);
            return d.getMonth() === month.getMonth() && d.getFullYear() === month.getFullYear();
          });
          return (
            <div
              class="erx-cal__year-month"
              key={month.getMonth()}
              onClick={() => {
                this.currentDate = month;
                this.view = 'month';
                this.emitViewChange();
              }}
            >
              <span class="erx-cal__year-month-name">
                {month.toLocaleDateString(this.locale, { month: 'short' })}
              </span>
              {monthEvents.length > 0 && (
                <span class="erx-cal__year-month-count">{monthEvents.length}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div
        class={{
          'erx-cal': true,
          'erx-cal--disabled': this.disabled,
        }}
        part="container"
      >
        <div class="erx-cal__header" part="header">
          <button class="erx-cal__nav-btn" onClick={() => this.navigate('prev')}>
            ←
          </button>
          <div class="erx-cal__title">
            <span class="erx-cal__month-year">{this.formatMonthYear()}</span>
          </div>
          <button class="erx-cal__nav-btn" onClick={() => this.navigate('next')}>
            →
          </button>
          <button class="erx-cal__today-btn" onClick={() => this.goToToday()}>
            Today
          </button>
          <div class="erx-cal__view-switcher">
            {(['month', 'year'] as CalendarView[]).map(v => (
              <button
                class={{
                  'erx-cal__view-btn': true,
                  'erx-cal__view-btn--active': this.view === v,
                }}
                key={v}
                onClick={() => {
                  this.view = v;
                  this.emitViewChange();
                }}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div class="erx-cal__body" part="body">
          {this.view === 'month' && this.renderMonthView()}
          {this.view === 'year' && this.renderYearView()}
        </div>
      </div>
    );
  }
}
