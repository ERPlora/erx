export type MachineState = 'running' | 'idle' | 'maintenance' | 'error' | 'offline';

export interface MachineMetric {
  label: string;
  value: number | string;
  unit?: string;
  status?: 'normal' | 'warning' | 'critical';
}

export interface MachineAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
}

export interface Machine {
  id: string;
  name: string;
  code?: string;
  image?: string;
  state: MachineState;
  currentJob?: {
    id: string;
    name: string;
    progress: number;
    eta?: string;
  };
  metrics?: MachineMetric[];
  alerts?: MachineAlert[];
  lastMaintenance?: string;
  nextMaintenance?: string;
  uptime?: number; // percentage
  efficiency?: number; // percentage (OEE)
  operator?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface MachineActionDetail {
  action: 'start' | 'stop' | 'maintenance' | 'details';
  machine: Machine;
}
