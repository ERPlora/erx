import { Component, Prop, State, Event, EventEmitter, Method, Element, h } from '@stencil/core';
import { ErxVideoSource } from './erx-video-player.types';

@Component({
  tag: 'erx-video-player',
  styleUrl: 'erx-video-player.css',
  shadow: true,
})
export class ErxVideoPlayer {
  @Element() el!: HTMLElement;

  /** Video source URL or array of sources */
  @Prop() src?: string;

  /** Multiple sources for quality selection */
  @Prop() sources: ErxVideoSource[] = [];

  /** Poster image */
  @Prop() poster?: string;

  /** Auto play */
  @Prop() autoplay = false;

  /** Loop video */
  @Prop() loop = false;

  /** Muted by default */
  @Prop() muted = false;

  /** Show controls */
  @Prop() controls = true;

  /** Preload strategy */
  @Prop() preload: 'none' | 'metadata' | 'auto' = 'metadata';

  /** Enable picture-in-picture */
  @Prop() pip = true;

  /** Enable fullscreen */
  @Prop() fullscreen = true;

  @State() isPlaying = false;
  @State() currentTime = 0;
  @State() duration = 0;
  @State() volume = 1;
  @State() isMuted = false;
  @State() isFullscreen = false;
  @State() showControls = true;
  @State() buffered = 0;

  /** Emitted on play */
  @Event() erxPlay!: EventEmitter<void>;

  /** Emitted on pause */
  @Event() erxPause!: EventEmitter<void>;

  /** Emitted on time update */
  @Event() erxTimeUpdate!: EventEmitter<{ currentTime: number; duration: number }>;

  /** Emitted on ended */
  @Event() erxEnded!: EventEmitter<void>;

  private videoEl?: HTMLVideoElement;
  private controlsTimeout?: number;

  componentDidLoad() {
    this.isMuted = this.muted;
    if (this.videoEl) {
      this.volume = this.videoEl.volume;
    }
  }

  /** Play video */
  @Method()
  async play(): Promise<void> {
    await this.videoEl?.play();
  }

  /** Pause video */
  @Method()
  async pause(): Promise<void> {
    this.videoEl?.pause();
  }

  /** Seek to time */
  @Method()
  async seek(time: number): Promise<void> {
    if (this.videoEl) {
      this.videoEl.currentTime = time;
    }
  }

  /** Toggle fullscreen */
  @Method()
  async toggleFullscreen(): Promise<void> {
    if (!this.isFullscreen) {
      await this.el.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
    this.isFullscreen = !this.isFullscreen;
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
    if (this.videoEl) {
      this.currentTime = this.videoEl.currentTime;
      this.erxTimeUpdate.emit({
        currentTime: this.currentTime,
        duration: this.duration,
      });
    }
  };

  private handleLoadedMetadata = () => {
    if (this.videoEl) {
      this.duration = this.videoEl.duration;
    }
  };

  private handleProgress = () => {
    if (this.videoEl && this.videoEl.buffered.length > 0) {
      this.buffered = this.videoEl.buffered.end(this.videoEl.buffered.length - 1);
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
    const time = parseFloat(input.value);
    this.seek(time);
  };

  private handleVolume = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const vol = parseFloat(input.value);
    if (this.videoEl) {
      this.videoEl.volume = vol;
      this.volume = vol;
      this.isMuted = vol === 0;
    }
  };

  private handleMuteToggle = () => {
    if (this.videoEl) {
      this.videoEl.muted = !this.videoEl.muted;
      this.isMuted = this.videoEl.muted;
    }
  };

  private handleMouseMove = () => {
    this.showControls = true;
    if (this.controlsTimeout) clearTimeout(this.controlsTimeout);
    this.controlsTimeout = window.setTimeout(() => {
      if (this.isPlaying) this.showControls = false;
    }, 3000);
  };

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  render() {
    const videoSrc = this.src || (this.sources.length > 0 ? this.sources[0].src : '');

    return (
      <div
        class={{
          'erx-vp': true,
          'erx-vp--playing': this.isPlaying,
          'erx-vp--fullscreen': this.isFullscreen,
        }}
        part="container"
        onMouseMove={this.handleMouseMove}
        onMouseLeave={() => this.isPlaying && (this.showControls = false)}
      >
        <video
          ref={(el) => (this.videoEl = el)}
          class="erx-vp__video"
          part="video"
          src={videoSrc}
          poster={this.poster}
          autoplay={this.autoplay}
          loop={this.loop}
          muted={this.muted}
          preload={this.preload}
          onClick={this.handlePlayPause}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onTimeUpdate={this.handleTimeUpdate}
          onLoadedMetadata={this.handleLoadedMetadata}
          onProgress={this.handleProgress}
          onEnded={this.handleEnded}
        >
          {this.sources.map((source) => (
            <source src={source.src} type={source.type} />
          ))}
        </video>

        {!this.isPlaying && (
          <button
            type="button"
            class="erx-vp__play-overlay"
            part="play-overlay"
            onClick={this.handlePlayPause}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}

        {this.controls && (
          <div
            class={{
              'erx-vp__controls': true,
              'erx-vp__controls--visible': this.showControls || !this.isPlaying,
            }}
            part="controls"
          >
            <button
              type="button"
              class="erx-vp__btn"
              onClick={this.handlePlayPause}
            >
              {this.isPlaying ? '⏸' : '▶'}
            </button>

            <span class="erx-vp__time">{this.formatTime(this.currentTime)}</span>

            <div class="erx-vp__progress">
              <div
                class="erx-vp__buffered"
                style={{ width: `${(this.buffered / this.duration) * 100}%` }}
              ></div>
              <input
                type="range"
                class="erx-vp__seek"
                min="0"
                max={this.duration || 0}
                step="0.1"
                value={this.currentTime}
                onInput={this.handleSeek}
              />
            </div>

            <span class="erx-vp__time">{this.formatTime(this.duration)}</span>

            <button
              type="button"
              class="erx-vp__btn"
              onClick={this.handleMuteToggle}
            >
              {this.isMuted ? '🔇' : '🔊'}
            </button>

            <input
              type="range"
              class="erx-vp__volume"
              min="0"
              max="1"
              step="0.1"
              value={this.isMuted ? 0 : this.volume}
              onInput={this.handleVolume}
            />

            {this.fullscreen && (
              <button
                type="button"
                class="erx-vp__btn"
                onClick={() => this.toggleFullscreen()}
              >
                {this.isFullscreen ? '⊙' : '⛶'}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}
