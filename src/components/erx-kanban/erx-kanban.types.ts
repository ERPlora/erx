export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  order: number;
  labels?: { id: string; name: string; color: string }[];
  assignee?: { id: string; name: string; avatar?: string };
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  attachments?: number;
  comments?: number;
  data?: Record<string, unknown>;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  limit?: number;
  collapsed?: boolean;
}

export interface KanbanConfig {
  columns: KanbanColumn[];
  draggable?: boolean;
  collapsible?: boolean;
  showCardCount?: boolean;
  showWipLimit?: boolean;
}

export interface KanbanCardMoveDetail {
  card: KanbanCard;
  fromColumn: string;
  toColumn: string;
  newOrder: number;
}

export interface KanbanCardSelectDetail {
  card: KanbanCard;
}

export interface KanbanColumnCollapseDetail {
  column: KanbanColumn;
  collapsed: boolean;
}
