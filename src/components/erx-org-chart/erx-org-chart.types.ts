/**
 * ERX OrgChart Types
 */

export interface ErxOrgNode {
  id: string | number;
  name: string;
  title?: string;
  avatar?: string;
  department?: string;
  email?: string;
  children?: ErxOrgNode[];
  collapsed?: boolean;
}

export interface ErxOrgChartSelectEvent {
  node: ErxOrgNode;
  path: (string | number)[];
}
