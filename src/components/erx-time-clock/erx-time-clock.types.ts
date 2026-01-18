/**
 * ERX TimeClock Types
 */

export interface ErxTimeEntry {
  id: string | number;
  employeeId: string | number;
  clockIn: Date | string;
  clockOut?: Date | string;
  breakStart?: Date | string;
  breakEnd?: Date | string;
  notes?: string;
  status: 'clocked-in' | 'on-break' | 'clocked-out';
}

export interface ErxTimeClockEvent {
  action: 'clock-in' | 'clock-out' | 'break-start' | 'break-end';
  timestamp: Date;
  employeeId?: string | number;
}
