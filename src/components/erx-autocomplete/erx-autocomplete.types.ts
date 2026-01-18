export interface AutocompleteOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  image?: string;
  disabled?: boolean;
  group?: string;
  data?: Record<string, unknown>;
}

export interface AutocompleteGroup {
  label: string;
  options: AutocompleteOption[];
}

export interface AutocompleteConfig {
  minChars?: number;
  debounce?: number;
  maxResults?: number;
  highlightMatch?: boolean;
  allowCustom?: boolean;
  async?: boolean;
}

export interface AutocompleteSelectDetail {
  option: AutocompleteOption;
  isCustom: boolean;
}

export interface AutocompleteSearchDetail {
  query: string;
}
