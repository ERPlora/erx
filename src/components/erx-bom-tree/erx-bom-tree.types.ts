export type BomItemType = 'product' | 'component' | 'raw-material' | 'consumable';

export interface BomItem {
  id: string;
  name: string;
  sku?: string;
  type: BomItemType;
  quantity: number;
  unit: string;
  unitCost?: number;
  totalCost?: number;
  available?: number;
  leadTime?: number; // days
  supplier?: string;
  children?: BomItem[];
  notes?: string;
  image?: string;
}

export interface Bom {
  id: string;
  name: string;
  product: {
    id: string;
    name: string;
    sku?: string;
    image?: string;
  };
  version?: string;
  items: BomItem[];
  totalCost?: number;
  currency?: string;
  status?: 'draft' | 'active' | 'obsolete';
  createdAt?: string;
  updatedAt?: string;
}

export interface BomSelectDetail {
  item: BomItem;
  path: BomItem[];
  level: number;
}
