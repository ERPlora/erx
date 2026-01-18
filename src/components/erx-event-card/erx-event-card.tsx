import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { ErxEventCardData, ErxEventCardStatus, ErxEventCardAttendee, ErxEventCardClickEvent, ErxEventCardActionEvent } from './erx-event-card.types';

@Component({
  tag: 'erx-event-card',
  styleUrl: 'erx-event-card.css',
  shadow: true,
})
export class ErxEventCard {
  /** Event data */
  @Prop() event!: ErxEventCardData;

  /** Compact mode */
  @Prop({ reflect: true }) compact: boolean = false;

  /** Show actions */
  @Prop() showActions: boolean = true;

  /** Card click event */
  @Event() erxClick!: EventEmitter<ErxEventCardClickEvent>;

  /** Action event */
  @Event() erxAction!: EventEmitter<ErxEventCardActionEvent>;

  private formatTime(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  }

  private formatDuration(): string {
    if (!this.event.end) return '';

    const start = new Date(this.event.start);
    const end = new Date(this.event.end);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
  }

  private getStatusLabel(status?: ErxEventCardStatus): string {
    const labels: Record<ErxEventCardStatus, string> = {
      scheduled: 'Scheduled',
      ongoing: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    return status ? labels[status] : '';
  }

  private handleClick = () => {
    this.erxClick.emit({ event: this.event });
  };

  private handleAction = (action: string, e: Event) => {
    e.stopPropagation();
    this.erxAction.emit({ event: this.event, action });
  };

  private renderAttendees(attendees: ErxEventCardAttendee[]) {
    const maxShow = 3;
    const shown = attendees.slice(0, maxShow);
    const remaining = attendees.length - maxShow;

    return (
      <div class="erx-event__attendees" part="attendees">
        {shown.map(a => (
          <div
            class={{
              'erx-event__attendee': true,
              [`erx-event__attendee--${a.status}`]: !!a.status,
            }}
            title={`${a.name} (${a.status || 'pending'})`}
          >
            {a.avatar ? (
              <img src={a.avatar} alt={a.name} />
            ) : (
              <span>{a.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
        ))}
        {remaining > 0 && (
          <div class="erx-event__attendee erx-event__attendee--more">
            +{remaining}
          </div>
        )}
      </div>
    );
  }

  render() {
    const { event, compact } = this;
    const color = event.color || 'var(--erx-color-primary, #667eea)';

    return (
      <div
        class={{
          'erx-event': true,
          'erx-event--compact': compact,
          [`erx-event--${event.status}`]: !!event.status,
        }}
        style={{ '--event-color': color }}
        onClick={this.handleClick}
        part="container"
      >
        {/* Color bar */}
        <div class="erx-event__color-bar" part="color-bar" />

        {/* Content */}
        <div class="erx-event__content" part="content">
          {/* Header */}
          <div class="erx-event__header">
            <h4 class="erx-event__title" part="title">
              {event.recurring && <span class="erx-event__recurring" title="Recurring">↻</span>}
              {event.title}
            </h4>
            {event.status && (
              <span class={`erx-event__status erx-event__status--${event.status}`} part="status">
                {this.getStatusLabel(event.status)}
              </span>
            )}
          </div>

          {/* Time */}
          <div class="erx-event__time" part="time">
            {event.allDay ? (
              <span>All day</span>
            ) : (
              <span>
                {this.formatTime(event.start)}
                {event.end && ` - ${this.formatTime(event.end)}`}
                {event.end && <span class="erx-event__duration">({this.formatDuration()})</span>}
              </span>
            )}
          </div>

          {/* Date (if not compact) */}
          {!compact && (
            <div class="erx-event__date" part="date">
              {this.formatDate(event.start)}
            </div>
          )}

          {/* Location */}
          {event.location && !compact && (
            <div class="erx-event__location" part="location">
              📍 {event.location}
            </div>
          )}

          {/* Description */}
          {event.description && !compact && (
            <p class="erx-event__description" part="description">
              {event.description}
            </p>
          )}

          {/* Attendees */}
          {event.attendees && event.attendees.length > 0 && !compact && (
            this.renderAttendees(event.attendees)
          )}

          {/* Footer */}
          {!compact && (
            <div class="erx-event__footer" part="footer">
              <div class="erx-event__indicators">
                {event.hasReminder && <span class="erx-event__indicator" title="Reminder">🔔</span>}
              </div>

              {this.showActions && (
                <div class="erx-event__actions">
                  <button
                    class="erx-event__action"
                    onClick={(e) => this.handleAction('edit', e)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    class="erx-event__action"
                    onClick={(e) => this.handleAction('delete', e)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
