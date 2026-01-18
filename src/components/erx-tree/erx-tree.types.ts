export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  data?: Record<string, unknown>;
}

export interface TreeConfig {
  selectable?: boolean;
  multiSelect?: boolean;
  expandOnClick?: boolean;
  showIcons?: boolean;
  showCheckboxes?: boolean;
  draggable?: boolean;
}

export interface TreeSelectDetail {
  node: TreeNode;
  selected: TreeNode[];
}

export interface TreeExpandDetail {
  node: TreeNode;
  expanded: boolean;
}

export interface TreeDropDetail {
  draggedNode: TreeNode;
  targetNode: TreeNode;
  position: 'before' | 'after' | 'inside';
}
