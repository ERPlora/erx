export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePreset {
  id: string;
  label: string;
  range: DateRange;
}

export interface DateRangePickerConfig {
  minDate?: string;
  maxDate?: string;
  locale?: string;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showPresets?: boolean;
  presets?: DateRangePreset[];
  maxRange?: number; // max days between start and end
  singleCalendar?: boolean;
}

export interface DateRangeChangeDetail {
  start: Date | null;
  end: Date | null;
  preset?: DateRangePreset;
}

export const DEFAULT_PRESETS: DateRangePreset[] = [
  { id: 'today', label: 'Today', range: { start: new Date(), end: new Date() } },
  { id: 'yesterday', label: 'Yesterday', range: { start: new Date(Date.now() - 86400000), end: new Date(Date.now() - 86400000) } },
  { id: 'last7', label: 'Last 7 days', range: { start: new Date(Date.now() - 7 * 86400000), end: new Date() } },
  { id: 'last30', label: 'Last 30 days', range: { start: new Date(Date.now() - 30 * 86400000), end: new Date() } },
  { id: 'thisMonth', label: 'This month', range: { start: new Date(new Date().getFullYear(), new Date().getMonth(), 1), end: new Date() } },
  { id: 'lastMonth', label: 'Last month', range: { start: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), end: new Date(new Date().getFullYear(), new Date().getMonth(), 0) } },
];
