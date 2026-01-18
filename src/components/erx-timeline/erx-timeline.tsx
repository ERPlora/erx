import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { TimelineItem, TimelineConfig, TimelineSelectDetail, TimelineActionDetail } from './erx-timeline.types';

@Component({
  tag: 'erx-timeline',
  styleUrl: 'erx-timeline.css',
  shadow: true,
})
export class ErxTimeline {
  @Prop() items: TimelineItem[] = [];
  @Prop() config: TimelineConfig = {};

  @Event() erxSelect!: EventEmitter<TimelineSelectDetail>;
  @Event() erxAction!: EventEmitter<TimelineActionDetail>;

  private getTypeColor(type?: TimelineItem['type']): string {
    const colors: Record<string, string> = {
      'success': 'var(--erx-color-success, #10b981)',
      'warning': 'var(--erx-color-warning, #f59e0b)',
      'error': 'var(--erx-color-danger, #ef4444)',
      'info': 'var(--erx-color-primary, #667eea)',
      'default': 'var(--erx-text-secondary, #6b7280)',
    };
    return colors[type || 'default'] || colors['default'];
  }

  private formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

  private groupByDate(items: TimelineItem[]): Map<string, TimelineItem[]> {
    const groups = new Map<string, TimelineItem[]>();
    items.forEach(item => {
      const date = new Date(item.timestamp).toDateString();
      if (!groups.has(date)) {
        groups.set(date, []);
      }
      groups.get(date)!.push(item);
    });
    return groups;
  }

  private handleItemClick(item: TimelineItem) {
    this.erxSelect.emit({ item });
  }

  private handleAction(item: TimelineItem, action: string, e: Event) {
    e.stopPropagation();
    this.erxAction.emit({ item, action });
  }

  private renderItem(item: TimelineItem, isLast: boolean) {
    return (
      <div
        class={{
          'erx-tl__item': true,
          [`erx-tl__item--${item.type || 'default'}`]: true,
        }}
        key={item.id}
        onClick={() => this.handleItemClick(item)}
      >
        <div class="erx-tl__indicator">
          <div class="erx-tl__dot" style={{ background: this.getTypeColor(item.type) }}>
            {item.icon && <span class="erx-tl__icon">{item.icon}</span>}
          </div>
          {!isLast && this.config.showConnectors !== false && (
            <div class="erx-tl__line"></div>
          )}
        </div>

        <div class="erx-tl__content">
          <div class="erx-tl__header">
            <span class="erx-tl__title">{item.title}</span>
            {this.config.showTimestamps !== false && (
              <span class="erx-tl__time">{this.formatTimestamp(item.timestamp)}</span>
            )}
          </div>

          {item.description && (
            <p class="erx-tl__description">{item.description}</p>
          )}

          {item.user && (
            <div class="erx-tl__user">
              {item.user.avatar ? (
                <img src={item.user.avatar} alt="" class="erx-tl__user-avatar" />
              ) : (
                <span class="erx-tl__user-avatar">{item.user.name.charAt(0)}</span>
              )}
              <span class="erx-tl__user-name">{item.user.name}</span>
            </div>
          )}

          {item.actions && item.actions.length > 0 && (
            <div class="erx-tl__actions">
              {item.actions.map(action => (
                <button
                  class="erx-tl__action"
                  key={action.action}
                  onClick={(e) => this.handleAction(item, action.action, e)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  render() {
    const { items, config } = this;
    const displayItems = config.maxItems ? items.slice(0, config.maxItems) : items;

    if (config.grouped) {
      const groups = this.groupByDate(displayItems);

      return (
        <div
          class={{
            'erx-tl': true,
            'erx-tl--alternating': !!config.alternating,
          }}
          part="container"
        >
          {Array.from(groups.entries()).map(([date, groupItems]) => (
            <div class="erx-tl__group" key={date}>
              <div class="erx-tl__group-header">{date}</div>
              {groupItems.map((item, index) =>
                this.renderItem(item, index === groupItems.length - 1)
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        class={{
          'erx-tl': true,
          'erx-tl--alternating': !!config.alternating,
        }}
        part="container"
      >
        {displayItems.map((item, index) =>
          this.renderItem(item, index === displayItems.length - 1)
        )}
      </div>
    );
  }
}
