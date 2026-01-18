/**
 * ERX EmployeeCard Types
 */

export interface ErxEmployee {
  id: string | number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  avatar?: string;
  position?: string;
  department?: string;
  location?: string;
  status?: 'active' | 'away' | 'busy' | 'offline';
  hireDate?: Date | string;
  manager?: string;
  badges?: string[];
}
