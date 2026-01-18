import { Component, Prop, Event, EventEmitter, State, h, Element, Method, Watch } from '@stencil/core';
import { ErxNotification, ErxNotificationType, ErxNotificationAction, ErxNotificationClickEvent, ErxNotificationActionEvent, ErxNotificationDismissEvent, ErxNotificationsOpenEvent } from './erx-notifications.types';

@Component({
  tag: 'erx-notifications',
  styleUrl: 'erx-notifications.css',
  shadow: true,
})
export class ErxNotifications {
  @Element() el!: HTMLElement;

  /** Notifications array */
  @Prop({ mutable: true }) notifications: ErxNotification[] = [];

  /** Show unread count badge */
  @Prop() showBadge: boolean = true;

  /** Max visible notifications */
  @Prop() maxVisible: number = 50;

  /** Group notifications by date */
  @Prop() groupByDate: boolean = true;

  /** Show mark all read button */
  @Prop() showMarkAllRead: boolean = true;

  /** Show clear all button */
  @Prop() showClearAll: boolean = true;

  /** Empty state message */
  @Prop() emptyMessage: string = 'No notifications';

  /** Panel title */
  @Prop() panelTitle: string = 'Notifications';

  /** Open state */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /** Notification click event */
  @Event() erxNotificationClick!: EventEmitter<ErxNotificationClickEvent>;

  /** Notification action event */
  @Event() erxNotificationAction!: EventEmitter<ErxNotificationActionEvent>;

  /** Notification dismiss event */
  @Event() erxNotificationDismiss!: EventEmitter<ErxNotificationDismissEvent>;

  /** Open/close event */
  @Event() erxOpenChange!: EventEmitter<ErxNotificationsOpenEvent>;

  /** Mark all read event */
  @Event() erxMarkAllRead!: EventEmitter<void>;

  /** Clear all event */
  @Event() erxClearAll!: EventEmitter<void>;

  @State() filter: 'all' | 'unread' = 'all';

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    this.erxOpenChange.emit({ open: newValue });
  }

  componentDidLoad() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  private handleOutsideClick = (e: MouseEvent) => {
    if (this.open && !this.el.contains(e.target as Node)) {
      this.open = false;
    }
  };

  @Method()
  async toggle(): Promise<void> {
    this.open = !this.open;
  }

  @Method()
  async addNotification(notification: ErxNotification): Promise<void> {
    this.notifications = [notification, ...this.notifications].slice(0, this.maxVisible);
  }

  @Method()
  async removeNotification(id: string): Promise<void> {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  @Method()
  async markAsRead(id: string): Promise<void> {
    this.notifications = this.notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
  }

  @Method()
  async markAllAsRead(): Promise<void> {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
    this.erxMarkAllRead.emit();
  }

  @Method()
  async clearAll(): Promise<void> {
    this.notifications = [];
    this.erxClearAll.emit();
  }

  private get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  private get filteredNotifications(): ErxNotification[] {
    if (this.filter === 'unread') {
      return this.notifications.filter(n => !n.read);
    }
    return this.notifications;
  }

  private get groupedNotifications(): Map<string, ErxNotification[]> {
    const groups = new Map<string, ErxNotification[]>();

    if (!this.groupByDate) {
      groups.set('All', this.filteredNotifications);
      return groups;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    this.filteredNotifications.forEach(n => {
      const date = n.timestamp ? new Date(n.timestamp) : new Date();
      date.setHours(0, 0, 0, 0);

      let groupName: string;
      if (date.getTime() === today.getTime()) {
        groupName = 'Today';
      } else if (date.getTime() === yesterday.getTime()) {
        groupName = 'Yesterday';
      } else {
        groupName = date.toLocaleDateString();
      }

      if (!groups.has(groupName)) {
        groups.set(groupName, []);
      }
      groups.get(groupName)!.push(n);
    });

    return groups;
  }

  private handleNotificationClick(notification: ErxNotification): void {
    this.markAsRead(notification.id);
    this.erxNotificationClick.emit({ notification });
  }

  private handleAction(notification: ErxNotification, action: ErxNotificationAction, e: Event): void {
    e.stopPropagation();
    this.erxNotificationAction.emit({ notification, action });
  }

  private handleDismiss(notification: ErxNotification, e: Event): void {
    e.stopPropagation();
    this.removeNotification(notification.id);
    this.erxNotificationDismiss.emit({ notification });
  }

  private getTypeIcon(type?: ErxNotificationType): string {
    const icons: Record<ErxNotificationType, string> = {
      info: 'ℹ️',
      success: '✓',
      warning: '⚠',
      error: '✕',
    };
    return type ? icons[type] : '🔔';
  }

  private formatTime(timestamp?: Date | string): string {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  }

  private renderNotification(notification: ErxNotification) {
    return (
      <div
        class={{
          'erx-notif__item': true,
          'erx-notif__item--unread': !notification.read,
          [`erx-notif__item--${notification.type}`]: !!notification.type,
          [`erx-notif__item--${notification.priority}`]: !!notification.priority,
        }}
        onClick={() => this.handleNotificationClick(notification)}
        part="item"
      >
        {/* Icon/Avatar */}
        <div class="erx-notif__icon">
          {notification.avatar ? (
            <img src={notification.avatar} alt="" class="erx-notif__avatar" />
          ) : (
            <span class={`erx-notif__type-icon erx-notif__type-icon--${notification.type || 'info'}`}>
              {notification.icon || this.getTypeIcon(notification.type)}
            </span>
          )}
        </div>

        {/* Content */}
        <div class="erx-notif__content">
          <div class="erx-notif__header">
            <span class="erx-notif__title">{notification.title}</span>
            {notification.timestamp && (
              <span class="erx-notif__time">{this.formatTime(notification.timestamp)}</span>
            )}
          </div>
          {notification.message && (
            <p class="erx-notif__message">{notification.message}</p>
          )}
          {notification.actions && notification.actions.length > 0 && (
            <div class="erx-notif__actions">
              {notification.actions.map(action => (
                <button
                  class={{
                    'erx-notif__action': true,
                    'erx-notif__action--primary': action.primary,
                  }}
                  onClick={e => this.handleAction(notification, action, e)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dismiss */}
        <button
          class="erx-notif__dismiss"
          onClick={e => this.handleDismiss(notification, e)}
          aria-label="Dismiss"
        >
          ✕
        </button>

        {/* Unread indicator */}
        {!notification.read && <div class="erx-notif__unread-dot" />}
      </div>
    );
  }

  render() {
    const grouped = this.groupedNotifications;

    return (
      <div class="erx-notif" part="container">
        {/* Trigger */}
        <div class="erx-notif__trigger" onClick={() => this.open = !this.open} part="trigger">
          <slot name="trigger">
            <button class="erx-notif__bell">
              🔔
              {this.showBadge && this.unreadCount > 0 && (
                <span class="erx-notif__badge">{this.unreadCount > 99 ? '99+' : this.unreadCount}</span>
              )}
            </button>
          </slot>
        </div>

        {/* Panel */}
        {this.open && (
          <div class="erx-notif__panel" part="panel">
            {/* Header */}
            <header class="erx-notif__panel-header">
              <h3 class="erx-notif__panel-title">{this.panelTitle}</h3>
              <div class="erx-notif__filters">
                <button
                  class={{ 'erx-notif__filter': true, 'erx-notif__filter--active': this.filter === 'all' }}
                  onClick={() => this.filter = 'all'}
                >
                  All
                </button>
                <button
                  class={{ 'erx-notif__filter': true, 'erx-notif__filter--active': this.filter === 'unread' }}
                  onClick={() => this.filter = 'unread'}
                >
                  Unread ({this.unreadCount})
                </button>
              </div>
            </header>

            {/* List */}
            <div class="erx-notif__list" part="list">
              {this.filteredNotifications.length > 0 ? (
                Array.from(grouped.entries()).map(([group, items]) => (
                  <div class="erx-notif__group">
                    {this.groupByDate && <div class="erx-notif__group-title">{group}</div>}
                    {items.map(n => this.renderNotification(n))}
                  </div>
                ))
              ) : (
                <div class="erx-notif__empty" part="empty">
                  {this.emptyMessage}
                </div>
              )}
            </div>

            {/* Footer */}
            {(this.showMarkAllRead || this.showClearAll) && this.notifications.length > 0 && (
              <footer class="erx-notif__panel-footer">
                {this.showMarkAllRead && this.unreadCount > 0 && (
                  <button class="erx-notif__footer-btn" onClick={() => this.markAllAsRead()}>
                    Mark all as read
                  </button>
                )}
                {this.showClearAll && (
                  <button class="erx-notif__footer-btn" onClick={() => this.clearAll()}>
                    Clear all
                  </button>
                )}
              </footer>
            )}
          </div>
        )}
      </div>
    );
  }
}
