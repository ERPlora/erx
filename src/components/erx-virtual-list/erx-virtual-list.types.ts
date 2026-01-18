export interface VirtualListConfig {
  itemHeight: number;
  overscan?: number; // extra items to render above/below viewport
  bufferSize?: number;
}

export interface VirtualListItem {
  id: string;
  data: unknown;
}

export interface VirtualListRenderDetail {
  item: VirtualListItem;
  index: number;
}

export interface VirtualListScrollDetail {
  scrollTop: number;
  startIndex: number;
  endIndex: number;
}
