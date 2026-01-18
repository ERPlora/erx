/**
 * ERX AttendanceList Types
 */

export interface ErxAttendanceRecord {
  id: string | number;
  employeeId: string | number;
  employeeName: string;
  avatar?: string;
  date: Date | string;
  clockIn?: Date | string;
  clockOut?: Date | string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'on-leave';
  hoursWorked?: number;
  notes?: string;
}
