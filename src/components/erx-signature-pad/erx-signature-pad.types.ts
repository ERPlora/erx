export interface SignatureConfig {
  width?: number;
  height?: number;
  lineWidth?: number;
  lineColor?: string;
  backgroundColor?: string;
  format?: 'png' | 'jpeg' | 'svg';
  quality?: number; // 0-1 for jpeg
}

export interface SignatureChangeDetail {
  isEmpty: boolean;
  dataUrl?: string;
}

export interface SignaturePoint {
  x: number;
  y: number;
  time: number;
}
