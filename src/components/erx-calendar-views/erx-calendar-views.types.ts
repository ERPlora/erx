import { CalendarEvent, CalendarView } from '../erx-calendar/erx-calendar.types';

export interface CalendarViewConfig {
  view: CalendarView;
  date: Date;
  events: CalendarEvent[];
  showHeader?: boolean;
  showAllDayRow?: boolean;
  hourHeight?: number; // pixels per hour for day/week view
  startHour?: number; // 0-23
  endHour?: number; // 0-23
  slotDuration?: number; // minutes
}

export interface TimeSlot {
  hour: number;
  minute: number;
  label: string;
}

export interface DayColumn {
  date: Date;
  isToday: boolean;
  events: CalendarEvent[];
  allDayEvents: CalendarEvent[];
}

export interface CalendarViewSelectDetail {
  date: Date;
  time?: { hour: number; minute: number };
  event?: CalendarEvent;
}

export interface CalendarViewDropDetail {
  event: CalendarEvent;
  newStart: Date;
  newEnd?: Date;
}
