export interface PanelConfig {
  id: string;
  defaultSize?: number; // percentage
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  collapsed?: boolean;
}

export interface ResizablePanelsConfig {
  panels: PanelConfig[];
  direction: 'horizontal' | 'vertical';
  handleSize?: number;
}

export interface PanelResizeDetail {
  panelId: string;
  size: number;
  sizes: Record<string, number>;
}

export interface PanelCollapseDetail {
  panelId: string;
  collapsed: boolean;
}
