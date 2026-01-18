export type TimelineItemType = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  type?: TimelineItemType;
  icon?: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  actions?: { label: string; action: string }[];
  data?: Record<string, unknown>;
}

export interface TimelineConfig {
  showTimestamps?: boolean;
  showConnectors?: boolean;
  alternating?: boolean;
  grouped?: boolean; // group by date
  maxItems?: number;
}

export interface TimelineSelectDetail {
  item: TimelineItem;
}

export interface TimelineActionDetail {
  item: TimelineItem;
  action: string;
}
