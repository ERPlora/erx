export interface MasterDetailConfig {
  masterWidth?: string; // e.g., '300px' or '30%'
  minMasterWidth?: number;
  maxMasterWidth?: number;
  resizable?: boolean;
  collapsible?: boolean;
  position?: 'left' | 'right';
  showDivider?: boolean;
}

export interface MasterDetailItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  avatar?: string;
  badge?: string | number;
  selected?: boolean;
  data?: Record<string, unknown>;
}

export interface MasterDetailSelectDetail {
  item: MasterDetailItem;
  previousItem?: MasterDetailItem;
}

export interface MasterDetailResizeDetail {
  width: number;
}
