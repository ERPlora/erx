export type WorkOrderStatus = 'draft' | 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'on-hold';
export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface WorkOrderMaterial {
  id: string;
  name: string;
  sku?: string;
  required: number;
  consumed: number;
  unit: string;
  available?: number;
}

export interface WorkOrderOperation {
  id: string;
  name: string;
  workCenter?: string;
  duration: number; // minutes
  completed: boolean;
  startedAt?: string;
  completedAt?: string;
}

export interface WorkOrder {
  id: string;
  number: string;
  product: {
    id: string;
    name: string;
    sku?: string;
    image?: string;
  };
  quantity: number;
  quantityProduced: number;
  unit: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  scheduledStart?: string;
  scheduledEnd?: string;
  actualStart?: string;
  actualEnd?: string;
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  materials?: WorkOrderMaterial[];
  operations?: WorkOrderOperation[];
  notes?: string;
}

export interface WorkOrderActionDetail {
  action: 'start' | 'pause' | 'complete' | 'cancel' | 'edit';
  order: WorkOrder;
}
