import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';
import { SchedulerResource, SchedulerEvent, SchedulerConfig, SchedulerView, SchedulerSelectDetail, SchedulerEventSelectDetail, SchedulerEventUpdateDetail } from './erx-scheduler.types';

@Component({
  tag: 'erx-scheduler',
  styleUrl: 'erx-scheduler.css',
  shadow: true,
})
export class ErxScheduler {
  @Prop() resources: SchedulerResource[] = [];
  @Prop() events: SchedulerEvent[] = [];
  @Prop() config: SchedulerConfig = {
    view: 'week',
    date: new Date(),
    resources: [],
    events: [],
  };
  @Prop() disabled = false;

  @State() currentDate: Date = new Date();
  @State() view: SchedulerView = 'week';

  @Event() erxSelect!: EventEmitter<SchedulerSelectDetail>;
  @Event() erxEventSelect!: EventEmitter<SchedulerEventSelectDetail>;
  @Event() erxEventUpdate!: EventEmitter<SchedulerEventUpdateDetail>;

  private startHour = 8;
  private endHour = 20;
  private hourHeight = 50;

  componentWillLoad() {
    this.view = this.config.view || 'week';
    this.currentDate = this.config.date || new Date();
    this.startHour = this.config.startHour ?? 8;
    this.endHour = this.config.endHour ?? 20;
  }

  private getTimeSlots(): { hour: number; label: string }[] {
    const slots: { hour: number; label: string }[] = [];
    for (let hour = this.startHour; hour <= this.endHour; hour++) {
      slots.push({ hour, label: `${hour.toString().padStart(2, '0')}:00` });
    }
    return slots;
  }

  private getWeekDays(): Date[] {
    const days: Date[] = [];
    const startOfWeek = new Date(this.currentDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  }

  private getEventsForResourceAndDate(resourceId: string, date: Date): SchedulerEvent[] {
    return this.events.filter(event => {
      if (event.resourceId !== resourceId) return false;
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  }

  private getEventPosition(event: SchedulerEvent): { top: number; height: number } {
    const start = new Date(event.start);
    const end = new Date(event.end);

    const startMinutes = (start.getHours() - this.startHour) * 60 + start.getMinutes();
    const endMinutes = (end.getHours() - this.startHour) * 60 + end.getMinutes();

    const top = (startMinutes / 60) * this.hourHeight;
    const height = Math.max(((endMinutes - startMinutes) / 60) * this.hourHeight, 20);

    return { top, height };
  }

  private isToday(date: Date): boolean {
    return date.toDateString() === new Date().toDateString();
  }

  private navigate(direction: 'prev' | 'next') {
    const newDate = new Date(this.currentDate);
    if (this.view === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (this.view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (this.view === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    this.currentDate = newDate;
  }

  private handleSlotClick(resource: SchedulerResource, date: Date, hour: number) {
    this.erxSelect.emit({ resource, date, time: { hour, minute: 0 } });
  }

  private handleEventClick(event: SchedulerEvent, e: Event) {
    e.stopPropagation();
    const resource = this.resources.find(r => r.id === event.resourceId);
    if (resource) {
      this.erxEventSelect.emit({ event, resource });
    }
  }

  private renderTimelineView() {
    const days = this.view === 'day' ? [this.currentDate] : this.getWeekDays();
    const timeSlots = this.getTimeSlots();

    return (
      <div class="erx-sched__timeline" part="timeline">
        <div class="erx-sched__header">
          <div class="erx-sched__resource-header">Resource</div>
          <div class="erx-sched__days-header">
            {days.map(day => (
              <div
                class={{
                  'erx-sched__day-header': true,
                  'erx-sched__day-header--today': this.isToday(day),
                }}
                key={day.toISOString()}
              >
                {day.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
              </div>
            ))}
          </div>
        </div>

        <div class="erx-sched__body">
          {this.resources.map(resource => (
            <div class="erx-sched__row" key={resource.id}>
              <div class="erx-sched__resource-cell">
                <div class="erx-sched__resource">
                  {resource.avatar ? (
                    <img src={resource.avatar} alt="" class="erx-sched__resource-avatar" />
                  ) : (
                    <span
                      class="erx-sched__resource-avatar"
                      style={{ background: resource.color || 'var(--erx-color-primary, #667eea)' }}
                    >
                      {resource.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div class="erx-sched__resource-info">
                    <span class="erx-sched__resource-name">{resource.name}</span>
                    {resource.title && <span class="erx-sched__resource-title">{resource.title}</span>}
                  </div>
                </div>
              </div>

              <div class="erx-sched__days-cells">
                {days.map(day => {
                  const dayEvents = this.getEventsForResourceAndDate(resource.id, day);
                  return (
                    <div
                      class={{
                        'erx-sched__day-cell': true,
                        'erx-sched__day-cell--today': this.isToday(day),
                      }}
                      key={day.toISOString()}
                    >
                      <div class="erx-sched__time-grid">
                        {timeSlots.map(slot => (
                          <div
                            class="erx-sched__time-slot"
                            style={{ height: `${this.hourHeight}px` }}
                            key={slot.hour}
                            onClick={() => this.handleSlotClick(resource, day, slot.hour)}
                          ></div>
                        ))}
                      </div>
                      <div class="erx-sched__events">
                        {dayEvents.map(event => {
                          const pos = this.getEventPosition(event);
                          return (
                            <div
                              class={{
                                'erx-sched__event': true,
                                [`erx-sched__event--${event.status || 'confirmed'}`]: true,
                              }}
                              style={{
                                top: `${pos.top}px`,
                                height: `${pos.height}px`,
                                background: event.color || resource.color || 'var(--erx-color-primary, #667eea)',
                              }}
                              key={event.id}
                              onClick={(e) => this.handleEventClick(event, e)}
                            >
                              <span class="erx-sched__event-time">
                                {new Date(event.start).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              <span class="erx-sched__event-title">{event.title}</span>
                            </div>
                          );
                        })}
                      </div>

                      {this.isToday(day) && this.config.showCurrentTime !== false && (
                        <div
                          class="erx-sched__current-time"
                          style={{
                            top: `${((new Date().getHours() - this.startHour) * 60 + new Date().getMinutes()) / 60 * this.hourHeight}px`,
                          }}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div class="erx-sched__time-labels">
          <div class="erx-sched__resource-header"></div>
          <div class="erx-sched__time-labels-grid">
            {timeSlots.map(slot => (
              <div class="erx-sched__time-label" style={{ height: `${this.hourHeight}px` }} key={slot.hour}>
                {slot.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        class={{
          'erx-sched': true,
          'erx-sched--disabled': this.disabled,
        }}
        part="container"
      >
        <div class="erx-sched__toolbar" part="toolbar">
          <div class="erx-sched__nav">
            <button class="erx-sched__nav-btn" onClick={() => this.navigate('prev')}>←</button>
            <button class="erx-sched__nav-btn" onClick={() => this.navigate('next')}>→</button>
            <button class="erx-sched__today-btn" onClick={() => { this.currentDate = new Date(); }}>Today</button>
          </div>

          <div class="erx-sched__title">
            {this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>

          <div class="erx-sched__view-switcher">
            {(['day', 'week'] as SchedulerView[]).map(v => (
              <button
                class={{
                  'erx-sched__view-btn': true,
                  'erx-sched__view-btn--active': this.view === v,
                }}
                key={v}
                onClick={() => { this.view = v; }}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {this.resources.length === 0 ? (
          <div class="erx-sched__empty">No resources configured</div>
        ) : (
          this.renderTimelineView()
        )}
      </div>
    );
  }
}
