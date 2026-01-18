/**
 * ERX ShiftCalendar Types
 */

export interface ErxShift {
  id: string | number;
  employeeId: string | number;
  employeeName?: string;
  date: Date | string;
  startTime: string; // "09:00"
  endTime: string;   // "17:00"
  type?: 'morning' | 'afternoon' | 'night' | 'custom';
  color?: string;
  notes?: string;
  status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
}

export interface ErxShiftSelectEvent {
  shift: ErxShift;
  date: Date;
}
