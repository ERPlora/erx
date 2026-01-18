/**
 * ERX QR Code Types
 * QR code generator
 */

export type ErxQrCodeErrorLevel = 'L' | 'M' | 'Q' | 'H';

export interface ErxQrCodeConfig {
  /** Data to encode */
  value?: string;
  /** Size in pixels */
  size?: number;
  /** Error correction level */
  errorLevel?: ErxQrCodeErrorLevel;
  /** Foreground color */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** Include margin */
  margin?: number;
  /** Logo image URL */
  logo?: string;
  /** Logo size ratio (0-1) */
  logoSize?: number;
  /** Render as canvas or SVG */
  renderAs?: 'canvas' | 'svg';
}
