/**
 * ERX Audio Player Types
 * Custom audio player with waveform visualization
 */

export interface ErxAudioSource {
  /** Audio URL */
  src: string;
  /** MIME type */
  type?: string;
}

export interface ErxAudioPlayerConfig {
  /** Auto play */
  autoplay?: boolean;
  /** Loop audio */
  loop?: boolean;
  /** Muted by default */
  muted?: boolean;
  /** Show waveform */
  showWaveform?: boolean;
  /** Show time display */
  showTime?: boolean;
  /** Show volume control */
  showVolume?: boolean;
  /** Show playback speed control */
  showSpeed?: boolean;
  /** Preload strategy */
  preload?: 'none' | 'metadata' | 'auto';
  /** Compact mode */
  compact?: boolean;
}

export interface ErxAudioPlayerEvent {
  currentTime: number;
  duration: number;
  playing: boolean;
  volume: number;
}
