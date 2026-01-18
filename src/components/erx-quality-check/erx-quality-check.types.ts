export type CheckResult = 'pass' | 'fail' | 'pending' | 'na';
export type CheckType = 'visual' | 'measurement' | 'functional' | 'documentation';

export interface QualityCheckItem {
  id: string;
  name: string;
  description?: string;
  type: CheckType;
  result: CheckResult;
  specification?: string;
  actualValue?: string | number;
  minValue?: number;
  maxValue?: number;
  unit?: string;
  notes?: string;
  image?: string;
}

export interface QualityCheck {
  id: string;
  number: string;
  type: 'incoming' | 'in-process' | 'final' | 'audit';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  product: {
    id: string;
    name: string;
    sku?: string;
    image?: string;
  };
  batch?: string;
  workOrder?: string;
  items: QualityCheckItem[];
  inspector?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  completedAt?: string;
  overallResult?: CheckResult;
  notes?: string;
}

export interface QualityCheckResultDetail {
  item: QualityCheckItem;
  result: CheckResult;
  value?: string | number;
  notes?: string;
}

export interface QualityCheckCompleteDetail {
  check: QualityCheck;
  result: 'pass' | 'fail';
  notes?: string;
}
