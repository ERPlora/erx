/**
 * ERX Mega Menu Types
 */
export interface ErxMegaMenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  children?: ErxMegaMenuSection[];
}

export interface ErxMegaMenuSection {
  title?: string;
  items: { id: string; label: string; description?: string; icon?: string; href?: string }[];
}
