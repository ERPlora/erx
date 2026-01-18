/**
 * ERX PerformanceMeter Types
 */

export interface ErxPerformanceCategory {
  id: string;
  name: string;
  score: number;
  maxScore?: number;
  weight?: number;
}

export interface ErxPerformanceData {
  employeeId: string | number;
  employeeName?: string;
  overallScore: number;
  maxScore?: number;
  categories?: ErxPerformanceCategory[];
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  period?: string;
}
