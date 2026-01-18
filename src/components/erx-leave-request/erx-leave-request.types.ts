/**
 * ERX LeaveRequest Types
 */

export interface ErxLeaveRequest {
  id: string | number;
  employeeId: string | number;
  employeeName?: string;
  type: 'vacation' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'unpaid' | 'other';
  startDate: Date | string;
  endDate: Date | string;
  days: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approvedBy?: string;
  createdAt?: Date | string;
}

export interface ErxLeaveRequestActionEvent {
  request: ErxLeaveRequest;
  action: 'approve' | 'reject' | 'cancel';
}
