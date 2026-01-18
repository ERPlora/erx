export type StationStatus = 'active' | 'idle' | 'blocked' | 'error';

export interface ProductionStation {
  id: string;
  name: string;
  status: StationStatus;
  currentItem?: {
    id: string;
    name: string;
    progress: number;
  };
  operator?: {
    id: string;
    name: string;
    avatar?: string;
  };
  cycleTime?: number; // seconds
  throughput?: number; // items per hour
  defects?: number;
}

export interface ProductionLine {
  id: string;
  name: string;
  stations: ProductionStation[];
  status: 'running' | 'stopped' | 'partial';
  currentProduct?: {
    id: string;
    name: string;
    image?: string;
  };
  target: number;
  produced: number;
  defects: number;
  efficiency: number; // percentage
  startTime?: string;
}

export interface ProductionLineSelectDetail {
  station: ProductionStation;
  line: ProductionLine;
}
