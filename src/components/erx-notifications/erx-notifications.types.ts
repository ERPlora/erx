/**
 * ERX Notifications Types
 * Notification center/panel
 */

export type ErxNotificationType = 'info' | 'success' | 'warning' | 'error';

export type ErxNotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface ErxNotification {
  /** Unique notification ID */
  id: string;
  /** Notification type */
  type?: ErxNotificationType;
  /** Priority level */
  priority?: ErxNotificationPriority;
  /** Title */
  title: string;
  /** Message content */
  message?: string;
  /** Icon */
  icon?: string;
  /** Avatar/image URL */
  avatar?: string;
  /** Timestamp */
  timestamp?: Date | string;
  /** Read status */
  read?: boolean;
  /** Action buttons */
  actions?: ErxNotificationAction[];
  /** Custom data */
  data?: unknown;
  /** Group/category */
  group?: string;
}

export interface ErxNotificationAction {
  /** Action ID */
  id: string;
  /** Action label */
  label: string;
  /** Primary action style */
  primary?: boolean;
}

export interface ErxNotificationsConfig {
  /** Show unread count badge */
  showBadge?: boolean;
  /** Max visible notifications */
  maxVisible?: number;
  /** Group notifications */
  groupByDate?: boolean;
  /** Show mark all read button */
  showMarkAllRead?: boolean;
  /** Show clear all button */
  showClearAll?: boolean;
  /** Empty state message */
  emptyMessage?: string;
}

export interface ErxNotificationClickEvent {
  notification: ErxNotification;
}

export interface ErxNotificationActionEvent {
  notification: ErxNotification;
  action: ErxNotificationAction;
}

export interface ErxNotificationDismissEvent {
  notification: ErxNotification;
}

export interface ErxNotificationsOpenEvent {
  open: boolean;
}
