export type CalendarView = 'month' | 'week' | 'day' | 'year';

export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO date
  end?: string; // ISO date
  allDay?: boolean;
  color?: string;
  description?: string;
  location?: string;
  category?: string;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval?: number;
    endDate?: string;
    count?: number;
  };
  reminder?: number; // minutes before
  attendees?: { id: string; name: string; email?: string; status?: 'accepted' | 'declined' | 'pending' }[];
  data?: Record<string, unknown>;
}

export interface CalendarDay {
  date: Date;
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
  isWeekend: boolean;
  events: CalendarEvent[];
}

export interface CalendarConfig {
  view: CalendarView;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
  minDate?: string;
  maxDate?: string;
  showWeekNumbers?: boolean;
  locale?: string;
}

export interface CalendarSelectDetail {
  date: Date;
  events: CalendarEvent[];
}

export interface CalendarEventSelectDetail {
  event: CalendarEvent;
  date: Date;
}

export interface CalendarRangeSelectDetail {
  start: Date;
  end: Date;
}

export interface CalendarViewChangeDetail {
  view: CalendarView;
  start: Date;
  end: Date;
}
