/**
 * ERX Color Picker Types
 * Color selection component
 */

export type ErxColorFormat = 'hex' | 'rgb' | 'hsl';

export interface ErxColorPickerConfig {
  /** Selected color value */
  value?: string;
  /** Color format */
  format?: ErxColorFormat;
  /** Show alpha/opacity slider */
  showAlpha?: boolean;
  /** Preset colors */
  presets?: string[];
  /** Show input field */
  showInput?: boolean;
  /** Show preset colors */
  showPresets?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

export interface ErxColorChangeEvent {
  /** Color in specified format */
  value: string;
  /** Color in hex format */
  hex: string;
  /** Color in rgb format */
  rgb: { r: number; g: number; b: number; a: number };
  /** Color in hsl format */
  hsl: { h: number; s: number; l: number; a: number };
}
