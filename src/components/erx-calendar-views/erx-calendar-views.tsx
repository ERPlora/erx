import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';
import { CalendarEvent, CalendarView } from '../erx-calendar/erx-calendar.types';
import { CalendarViewSelectDetail, TimeSlot, DayColumn } from './erx-calendar-views.types';

@Component({
  tag: 'erx-calendar-views',
  styleUrl: 'erx-calendar-views.css',
  shadow: true,
})
export class ErxCalendarViews {
  @Prop() view: CalendarView = 'week';
  @Prop() date: Date = new Date();
  @Prop() events: CalendarEvent[] = [];
  @Prop() startHour = 8;
  @Prop() endHour = 20;
  @Prop() slotDuration = 30; // minutes
  @Prop() hourHeight = 60; // pixels
  @Prop() locale = 'en-US';
  @Prop() disabled = false;

  @State() currentDate: Date = new Date();

  @Event() erxSelect!: EventEmitter<CalendarViewSelectDetail>;
  @Event() erxEventSelect!: EventEmitter<{ event: CalendarEvent }>;

  componentWillLoad() {
    this.currentDate = new Date(this.date);
  }

  private getTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    for (let hour = this.startHour; hour <= this.endHour; hour++) {
      for (let minute = 0; minute < 60; minute += this.slotDuration) {
        const label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({ hour, minute, label });
      }
    }
    return slots;
  }

  private getWeekDays(): DayColumn[] {
    const days: DayColumn[] = [];
    const startOfWeek = new Date(this.currentDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dayEvents = this.getEventsForDate(date);
      days.push({
        date,
        isToday: this.isToday(date),
        events: dayEvents.filter(e => !e.allDay),
        allDayEvents: dayEvents.filter(e => e.allDay),
      });
    }
    return days;
  }

  private getEventsForDate(date: Date): CalendarEvent[] {
    return this.events.filter(event => {
      const eventStart = new Date(event.start);
      return eventStart.toDateString() === date.toDateString();
    });
  }

  private isToday(date: Date): boolean {
    return date.toDateString() === new Date().toDateString();
  }

  private getEventPosition(event: CalendarEvent): { top: number; height: number } {
    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : new Date(start.getTime() + 60 * 60 * 1000);

    const startMinutes = (start.getHours() - this.startHour) * 60 + start.getMinutes();
    const endMinutes = (end.getHours() - this.startHour) * 60 + end.getMinutes();

    const top = (startMinutes / 60) * this.hourHeight;
    const height = Math.max(((endMinutes - startMinutes) / 60) * this.hourHeight, 20);

    return { top, height };
  }

  private handleSlotClick(date: Date, hour: number, minute: number) {
    this.erxSelect.emit({ date, time: { hour, minute } });
  }

  private handleEventClick(event: CalendarEvent, e: Event) {
    e.stopPropagation();
    this.erxEventSelect.emit({ event });
  }

  private navigate(direction: 'prev' | 'next') {
    const newDate = new Date(this.currentDate);
    if (this.view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (this.view === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    this.currentDate = newDate;
  }

  private formatDayHeader(date: Date): string {
    return date.toLocaleDateString(this.locale, { weekday: 'short', day: 'numeric' });
  }

  private renderWeekView() {
    const timeSlots = this.getTimeSlots();
    const days = this.getWeekDays();
    const hasAllDay = days.some(d => d.allDayEvents.length > 0);

    return (
      <div class="erx-calv__week" part="week">
        <div class="erx-calv__header">
          <div class="erx-calv__time-gutter"></div>
          {days.map(day => (
            <div
              class={{
                'erx-calv__day-header': true,
                'erx-calv__day-header--today': day.isToday,
              }}
              key={day.date.toISOString()}
            >
              {this.formatDayHeader(day.date)}
            </div>
          ))}
        </div>

        {hasAllDay && (
          <div class="erx-calv__all-day">
            <div class="erx-calv__time-gutter">
              <span class="erx-calv__all-day-label">All day</span>
            </div>
            {days.map(day => (
              <div class="erx-calv__all-day-cell" key={day.date.toISOString()}>
                {day.allDayEvents.map(event => (
                  <div
                    class="erx-calv__all-day-event"
                    style={{ background: event.color || 'var(--erx-color-primary, #667eea)' }}
                    key={event.id}
                    onClick={(e) => this.handleEventClick(event, e)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div class="erx-calv__body">
          <div class="erx-calv__time-column">
            {timeSlots.filter(s => s.minute === 0).map(slot => (
              <div class="erx-calv__time-slot" style={{ height: `${this.hourHeight}px` }} key={slot.label}>
                <span class="erx-calv__time-label">{slot.label}</span>
              </div>
            ))}
          </div>
          <div class="erx-calv__days-grid">
            {days.map(day => (
              <div
                class={{
                  'erx-calv__day-column': true,
                  'erx-calv__day-column--today': day.isToday,
                }}
                key={day.date.toISOString()}
              >
                {timeSlots.filter(s => s.minute === 0).map(slot => (
                  <div
                    class="erx-calv__hour-cell"
                    style={{ height: `${this.hourHeight}px` }}
                    key={slot.label}
                    onClick={() => this.handleSlotClick(day.date, slot.hour, slot.minute)}
                  >
                    <div class="erx-calv__half-hour"></div>
                  </div>
                ))}
                <div class="erx-calv__events">
                  {day.events.map(event => {
                    const pos = this.getEventPosition(event);
                    return (
                      <div
                        class="erx-calv__event"
                        style={{
                          top: `${pos.top}px`,
                          height: `${pos.height}px`,
                          background: event.color || 'var(--erx-color-primary, #667eea)',
                        }}
                        key={event.id}
                        onClick={(e) => this.handleEventClick(event, e)}
                      >
                        <span class="erx-calv__event-time">
                          {new Date(event.start).toLocaleTimeString(this.locale, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span class="erx-calv__event-title">{event.title}</span>
                      </div>
                    );
                  })}
                </div>

                {day.isToday && this.renderCurrentTimeLine()}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  private renderDayView() {
    const timeSlots = this.getTimeSlots();
    const dayEvents = this.getEventsForDate(this.currentDate);
    const timedEvents = dayEvents.filter(e => !e.allDay);
    const allDayEvents = dayEvents.filter(e => e.allDay);

    return (
      <div class="erx-calv__day" part="day">
        <div class="erx-calv__day-header-single">
          {this.currentDate.toLocaleDateString(this.locale, { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>

        {allDayEvents.length > 0 && (
          <div class="erx-calv__all-day-single">
            {allDayEvents.map(event => (
              <div
                class="erx-calv__all-day-event"
                style={{ background: event.color || 'var(--erx-color-primary, #667eea)' }}
                key={event.id}
                onClick={(e) => this.handleEventClick(event, e)}
              >
                {event.title}
              </div>
            ))}
          </div>
        )}

        <div class="erx-calv__day-body">
          <div class="erx-calv__time-column">
            {timeSlots.filter(s => s.minute === 0).map(slot => (
              <div class="erx-calv__time-slot" style={{ height: `${this.hourHeight}px` }} key={slot.label}>
                <span class="erx-calv__time-label">{slot.label}</span>
              </div>
            ))}
          </div>
          <div class="erx-calv__day-content">
            {timeSlots.filter(s => s.minute === 0).map(slot => (
              <div
                class="erx-calv__hour-cell"
                style={{ height: `${this.hourHeight}px` }}
                key={slot.label}
                onClick={() => this.handleSlotClick(this.currentDate, slot.hour, slot.minute)}
              >
                <div class="erx-calv__half-hour"></div>
              </div>
            ))}
            <div class="erx-calv__events">
              {timedEvents.map(event => {
                const pos = this.getEventPosition(event);
                return (
                  <div
                    class="erx-calv__event erx-calv__event--day"
                    style={{
                      top: `${pos.top}px`,
                      height: `${pos.height}px`,
                      background: event.color || 'var(--erx-color-primary, #667eea)',
                    }}
                    key={event.id}
                    onClick={(e) => this.handleEventClick(event, e)}
                  >
                    <span class="erx-calv__event-time">
                      {new Date(event.start).toLocaleTimeString(this.locale, { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span class="erx-calv__event-title">{event.title}</span>
                    {event.location && <span class="erx-calv__event-location">{event.location}</span>}
                  </div>
                );
              })}
            </div>
            {this.isToday(this.currentDate) && this.renderCurrentTimeLine()}
          </div>
        </div>
      </div>
    );
  }

  private renderCurrentTimeLine() {
    const now = new Date();
    const minutes = (now.getHours() - this.startHour) * 60 + now.getMinutes();
    const top = (minutes / 60) * this.hourHeight;

    if (top < 0 || top > (this.endHour - this.startHour) * this.hourHeight) return null;

    return (
      <div class="erx-calv__current-time" style={{ top: `${top}px` }}>
        <div class="erx-calv__current-time-dot"></div>
        <div class="erx-calv__current-time-line"></div>
      </div>
    );
  }

  render() {
    return (
      <div
        class={{
          'erx-calv': true,
          'erx-calv--disabled': this.disabled,
        }}
        part="container"
      >
        <div class="erx-calv__toolbar" part="toolbar">
          <button class="erx-calv__nav-btn" onClick={() => this.navigate('prev')}>←</button>
          <button class="erx-calv__nav-btn" onClick={() => this.navigate('next')}>→</button>
          <button class="erx-calv__today-btn" onClick={() => { this.currentDate = new Date(); }}>Today</button>
        </div>

        {this.view === 'week' && this.renderWeekView()}
        {this.view === 'day' && this.renderDayView()}
      </div>
    );
  }
}
