export type BatchStatus = 'created' | 'in-production' | 'quality-check' | 'completed' | 'rejected' | 'shipped';

export interface BatchEvent {
  id: string;
  type: 'created' | 'started' | 'stage-change' | 'quality' | 'completed' | 'shipped' | 'note';
  description: string;
  timestamp: string;
  user?: {
    id: string;
    name: string;
  };
  data?: Record<string, unknown>;
}

export interface BatchStage {
  id: string;
  name: string;
  status: 'pending' | 'current' | 'completed' | 'skipped';
  startedAt?: string;
  completedAt?: string;
  duration?: number; // minutes
}

export interface Batch {
  id: string;
  number: string;
  product: {
    id: string;
    name: string;
    sku?: string;
    image?: string;
  };
  quantity: number;
  quantityGood: number;
  quantityDefect: number;
  unit: string;
  status: BatchStatus;
  stages?: BatchStage[];
  events?: BatchEvent[];
  workOrder?: {
    id: string;
    number: string;
  };
  expiryDate?: string;
  manufactureDate?: string;
  location?: string;
  qrCode?: string;
}

export interface BatchSelectDetail {
  batch: Batch;
  stage?: BatchStage;
}
