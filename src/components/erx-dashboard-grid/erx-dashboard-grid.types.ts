export interface DashboardWidget {
  id: string;
  title?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  locked?: boolean;
  data?: Record<string, unknown>;
}

export interface DashboardGridConfig {
  columns: number;
  rowHeight: number;
  gap?: number;
  margin?: number;
  draggable?: boolean;
  resizable?: boolean;
  compactType?: 'vertical' | 'horizontal' | 'none';
}

export interface DashboardLayoutChangeDetail {
  widgets: DashboardWidget[];
  changed: DashboardWidget;
}

export interface DashboardWidgetSelectDetail {
  widget: DashboardWidget;
}
