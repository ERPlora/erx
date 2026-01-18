export type SchedulerView = 'day' | 'week' | 'month' | 'timeline';

export interface SchedulerResource {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
  color?: string;
  capacity?: number;
  group?: string;
  data?: Record<string, unknown>;
}

export interface SchedulerEvent {
  id: string;
  resourceId: string;
  title: string;
  start: string; // ISO date
  end: string; // ISO date
  color?: string;
  status?: 'confirmed' | 'tentative' | 'cancelled';
  editable?: boolean;
  resizable?: boolean;
  data?: Record<string, unknown>;
}

export interface SchedulerConfig {
  view: SchedulerView;
  date: Date;
  resources: SchedulerResource[];
  events: SchedulerEvent[];
  startHour?: number;
  endHour?: number;
  slotDuration?: number; // minutes
  groupBy?: string; // resource field to group by
  showCurrentTime?: boolean;
  allowOverlap?: boolean;
  editable?: boolean;
}

export interface SchedulerSelectDetail {
  resource: SchedulerResource;
  date: Date;
  time?: { hour: number; minute: number };
}

export interface SchedulerEventSelectDetail {
  event: SchedulerEvent;
  resource: SchedulerResource;
}

export interface SchedulerEventUpdateDetail {
  event: SchedulerEvent;
  changes: {
    resourceId?: string;
    start?: string;
    end?: string;
  };
}

export interface SchedulerEventCreateDetail {
  resourceId: string;
  start: Date;
  end: Date;
}
