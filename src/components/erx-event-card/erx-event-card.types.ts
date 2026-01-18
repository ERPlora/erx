/**
 * ERX Event Card Types
 * Card for calendar events
 */

export type ErxEventCardStatus = 'scheduled' | 'ongoing' | 'completed' | 'cancelled';

export interface ErxEventCardAttendee {
  /** Attendee ID */
  id: string;
  /** Name */
  name: string;
  /** Avatar URL */
  avatar?: string;
  /** Response status */
  status?: 'accepted' | 'declined' | 'tentative' | 'pending';
}

export interface ErxEventCardData {
  /** Event ID */
  id: string;
  /** Event title */
  title: string;
  /** Description */
  description?: string;
  /** Start time */
  start: Date | string;
  /** End time */
  end?: Date | string;
  /** All day event */
  allDay?: boolean;
  /** Location */
  location?: string;
  /** Event color */
  color?: string;
  /** Status */
  status?: ErxEventCardStatus;
  /** Attendees */
  attendees?: ErxEventCardAttendee[];
  /** Is recurring */
  recurring?: boolean;
  /** Has reminder */
  hasReminder?: boolean;
  /** Custom data */
  data?: unknown;
}

export interface ErxEventCardClickEvent {
  event: ErxEventCardData;
}

export interface ErxEventCardActionEvent {
  event: ErxEventCardData;
  action: string;
}
