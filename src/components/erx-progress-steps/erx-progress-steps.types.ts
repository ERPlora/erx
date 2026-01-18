export type ProgressStepStatus = 'pending' | 'current' | 'completed' | 'error';

export interface ProgressStep {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  status: ProgressStepStatus;
  timestamp?: string;
  data?: Record<string, unknown>;
}

export interface ProgressStepsConfig {
  orientation?: 'horizontal' | 'vertical';
  showNumbers?: boolean;
  showTimestamps?: boolean;
  clickable?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface ProgressStepSelectDetail {
  step: ProgressStep;
  index: number;
}
