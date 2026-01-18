export interface Tag {
  id: string;
  label: string;
  color?: string;
  icon?: string;
  removable?: boolean;
  data?: Record<string, unknown>;
}

export interface TagInputConfig {
  maxTags?: number;
  allowDuplicates?: boolean;
  allowCustom?: boolean;
  separator?: string; // character to split input (e.g., ',')
  validate?: (value: string) => boolean | string; // return true or error message
}

export interface TagInputChangeDetail {
  tags: Tag[];
  added?: Tag;
  removed?: Tag;
}
