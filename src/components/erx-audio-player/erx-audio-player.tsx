import { Component, Prop, State, Event, EventEmitter, Method, h } from '@stencil/core';

@Component({
  tag: 'erx-audio-player',
  styleUrl: 'erx-audio-player.css',
  shadow: true,
})
export class ErxAudioPlayer {
  /** Audio source URL */
  @Prop() src!: string;

  /** Track title */
  @Prop() trackTitle?: string;

  /** Artist name */
  @Prop() artist?: string;

  /** Cover art URL */
  @Prop() cover?: string;

  /** Auto play */
  @Prop() autoplay = false;

  /** Loop audio */
  @Prop() loop = false;

  /** Muted by default */
  @Prop() muted = false;

  /** Show time display */
  @Prop() showTime = true;

  /** Show volume control */
  @Prop() showVolume = true;

  /** Show playback speed control */
  @Prop() showSpeed = false;

  /** Preload strategy */
  @Prop() preload: 'none' | 'metadata' | 'auto' = 'metadata';

  /** Compact mode */
  @Prop() compact = false;

  @State() isPlaying = false;
  @State() currentTime = 0;
  @State() duration = 0;
  @State() volume = 1;
  @State() isMuted = false;
  @State() playbackRate = 1;

  /** Emitted on play */
  @Event() erxPlay!: EventEmitter<void>;

  /** Emitted on pause */
  @Event() erxPause!: EventEmitter<void>;

  /** Emitted on time update */
  @Event() erxTimeUpdate!: EventEmitter<{ currentTime: number; duration: number }>;

  /** Emitted on ended */
  @Event() erxEnded!: EventEmitter<void>;

  private audioEl?: HTMLAudioElement;

  componentDidLoad() {
    this.isMuted = this.muted;
  }

  /** Play audio */
  @Method()
  async play(): Promise<void> {
    await this.audioEl?.play();
  }

  /** Pause audio */
  @Method()
  async pause(): Promise<void> {
    this.audioEl?.pause();
  }

  /** Seek to time */
  @Method()
  async seek(time: number): Promise<void> {
    if (this.audioEl) {
      this.audioEl.currentTime = time;
    }
  }

  private handlePlay = () => {
    this.isPlaying = true;
    this.erxPlay.emit();
  };

  private handlePause = () => {
    this.isPlaying = false;
    this.erxPause.emit();
  };

  private handleTimeUpdate = () => {
    if (this.audioEl) {
      this.currentTime = this.audioEl.currentTime;
      this.erxTimeUpdate.emit({
        currentTime: this.currentTime,
        duration: this.duration,
      });
    }
  };

  private handleLoadedMetadata = () => {
    if (this.audioEl) {
      this.duration = this.audioEl.duration;
    }
  };

  private handleEnded = () => {
    this.isPlaying = false;
    this.erxEnded.emit();
  };

  private handlePlayPause = () => {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  };

  private handleSeek = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.seek(parseFloat(input.value));
  };

  private handleVolume = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const vol = parseFloat(input.value);
    if (this.audioEl) {
      this.audioEl.volume = vol;
      this.volume = vol;
      this.isMuted = vol === 0;
    }
  };

  private handleMuteToggle = () => {
    if (this.audioEl) {
      this.audioEl.muted = !this.audioEl.muted;
      this.isMuted = this.audioEl.muted;
    }
  };

  private handleSpeedChange = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIdx = speeds.indexOf(this.playbackRate);
    const nextIdx = (currentIdx + 1) % speeds.length;
    this.playbackRate = speeds[nextIdx];
    if (this.audioEl) {
      this.audioEl.playbackRate = this.playbackRate;
    }
  };

  private formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  render() {
    const progress = this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;

    return (
      <div
        class={{
          'erx-ap': true,
          'erx-ap--compact': this.compact,
          'erx-ap--playing': this.isPlaying,
        }}
        part="container"
      >
        <audio
          ref={(el) => (this.audioEl = el)}
          src={this.src}
          autoplay={this.autoplay}
          loop={this.loop}
          muted={this.muted}
          preload={this.preload}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onTimeUpdate={this.handleTimeUpdate}
          onLoadedMetadata={this.handleLoadedMetadata}
          onEnded={this.handleEnded}
        />

        {this.cover && !this.compact && (
          <div class="erx-ap__cover" part="cover">
            <img src={this.cover} alt={this.trackTitle || 'Cover'} />
          </div>
        )}

        <div class="erx-ap__main">
          {(this.trackTitle || this.artist) && (
            <div class="erx-ap__info" part="info">
              {this.trackTitle && <span class="erx-ap__title">{this.trackTitle}</span>}
              {this.artist && <span class="erx-ap__artist">{this.artist}</span>}
            </div>
          )}

          <div class="erx-ap__controls" part="controls">
            <button
              type="button"
              class="erx-ap__play"
              part="play"
              onClick={this.handlePlayPause}
            >
              {this.isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div class="erx-ap__progress-wrap">
              {this.showTime && (
                <span class="erx-ap__time">{this.formatTime(this.currentTime)}</span>
              )}
              <div class="erx-ap__progress" part="progress">
                <div
                  class="erx-ap__progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
                <input
                  type="range"
                  class="erx-ap__seek"
                  min="0"
                  max={this.duration || 0}
                  step="0.1"
                  value={this.currentTime}
                  onInput={this.handleSeek}
                />
              </div>
              {this.showTime && (
                <span class="erx-ap__time">{this.formatTime(this.duration)}</span>
              )}
            </div>

            {this.showVolume && (
              <div class="erx-ap__volume-wrap">
                <button
                  type="button"
                  class="erx-ap__btn"
                  onClick={this.handleMuteToggle}
                >
                  {this.isMuted ? '🔇' : '🔊'}
                </button>
                <input
                  type="range"
                  class="erx-ap__volume"
                  min="0"
                  max="1"
                  step="0.1"
                  value={this.isMuted ? 0 : this.volume}
                  onInput={this.handleVolume}
                />
              </div>
            )}

            {this.showSpeed && (
              <button
                type="button"
                class="erx-ap__speed"
                part="speed"
                onClick={this.handleSpeedChange}
              >
                {this.playbackRate}x
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
