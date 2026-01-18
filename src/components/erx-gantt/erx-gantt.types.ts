export type GanttViewMode = 'day' | 'week' | 'month' | 'quarter';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';

export interface GanttTask {
  id: string;
  name: string;
  start: string; // ISO date
  end: string; // ISO date
  progress: number; // 0-100
  status?: TaskStatus;
  color?: string;
  dependencies?: string[]; // task IDs
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  children?: GanttTask[];
  collapsed?: boolean;
  milestone?: boolean;
  notes?: string;
}

export interface GanttResource {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  tasks: GanttTask[];
}

export interface GanttConfig {
  viewMode: GanttViewMode;
  showDependencies?: boolean;
  showProgress?: boolean;
  showToday?: boolean;
  editable?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface GanttSelectDetail {
  task: GanttTask;
}

export interface GanttUpdateDetail {
  task: GanttTask;
  changes: {
    start?: string;
    end?: string;
    progress?: number;
  };
}

export interface GanttDependencyDetail {
  fromTask: GanttTask;
  toTask: GanttTask;
}
