/**
 * ERX Video Player Types
 * Custom video player with controls
 */

export interface ErxVideoSource {
  /** Video URL */
  src: string;
  /** MIME type */
  type?: string;
  /** Quality label */
  label?: string;
  /** Resolution (e.g., 720, 1080) */
  resolution?: number;
}

export interface ErxVideoPlayerConfig {
  /** Auto play */
  autoplay?: boolean;
  /** Loop video */
  loop?: boolean;
  /** Muted by default */
  muted?: boolean;
  /** Show controls */
  controls?: boolean;
  /** Poster image */
  poster?: string;
  /** Preload strategy */
  preload?: 'none' | 'metadata' | 'auto';
  /** Enable picture-in-picture */
  pip?: boolean;
  /** Enable fullscreen */
  fullscreen?: boolean;
  /** Enable playback speed control */
  playbackSpeed?: boolean;
  /** Enable quality selector */
  qualitySelector?: boolean;
}

export interface ErxVideoPlayerEvent {
  currentTime: number;
  duration: number;
  playing: boolean;
  volume: number;
  muted: boolean;
}
