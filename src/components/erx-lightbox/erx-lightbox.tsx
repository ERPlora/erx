import { Component, Prop, Event, EventEmitter, State, h, Element, Method, Watch, Listen } from '@stencil/core';
import { ErxLightboxImage, ErxLightboxOpenEvent, ErxLightboxSlideEvent, ErxLightboxZoomEvent } from './erx-lightbox.types';

@Component({
  tag: 'erx-lightbox',
  styleUrl: 'erx-lightbox.css',
  shadow: true,
})
export class ErxLightbox {
  @Element() el!: HTMLElement;

  /** Images array */
  @Prop() images: ErxLightboxImage[] = [];

  /** Current image index */
  @Prop({ mutable: true }) currentIndex: number = 0;

  /** Show navigation arrows */
  @Prop() showNav: boolean = true;

  /** Show thumbnails strip */
  @Prop() showThumbnails: boolean = true;

  /** Show image counter */
  @Prop() showCounter: boolean = true;

  /** Show caption */
  @Prop() showCaption: boolean = true;

  /** Enable zoom */
  @Prop() enableZoom: boolean = true;

  /** Max zoom level */
  @Prop() maxZoom: number = 3;

  /** Enable slideshow */
  @Prop() enableSlideshow: boolean = false;

  /** Slideshow interval (ms) */
  @Prop() slideshowInterval: number = 3000;

  /** Close on backdrop click */
  @Prop() backdropDismiss: boolean = true;

  /** Enable keyboard navigation */
  @Prop() keyboardNav: boolean = true;

  /** Open state */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /** Open/close event */
  @Event() erxOpenChange!: EventEmitter<ErxLightboxOpenEvent>;

  /** Slide change event */
  @Event() erxSlideChange!: EventEmitter<ErxLightboxSlideEvent>;

  /** Zoom change event */
  @Event() erxZoomChange!: EventEmitter<ErxLightboxZoomEvent>;

  @State() zoom: number = 1;
  @State() isPlaying: boolean = false;
  @State() isLoading: boolean = false;

  private slideshowTimer?: number;

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    this.erxOpenChange.emit({ open: newValue, index: this.currentIndex });
    if (!newValue) {
      this.stopSlideshow();
      this.zoom = 1;
    }
  }

  @Listen('keydown', { target: 'document' })
  handleKeyDown(e: KeyboardEvent) {
    if (!this.open || !this.keyboardNav) return;

    switch (e.key) {
      case 'Escape':
        this.open = false;
        break;
      case 'ArrowLeft':
        this.prev();
        break;
      case 'ArrowRight':
        this.next();
        break;
      case '+':
      case '=':
        this.zoomIn();
        break;
      case '-':
        this.zoomOut();
        break;
      case '0':
        this.resetZoom();
        break;
    }
  }

  disconnectedCallback() {
    this.stopSlideshow();
  }

  @Method()
  async show(index: number = 0): Promise<void> {
    this.currentIndex = index;
    this.open = true;
  }

  @Method()
  async close(): Promise<void> {
    this.open = false;
  }

  @Method()
  async goTo(index: number): Promise<void> {
    if (index >= 0 && index < this.images.length) {
      this.currentIndex = index;
      this.zoom = 1;
      this.erxSlideChange.emit({ index, image: this.images[index] });
    }
  }

  @Method()
  async next(): Promise<void> {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.goTo(nextIndex);
  }

  @Method()
  async prev(): Promise<void> {
    const prevIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.goTo(prevIndex);
  }

  private zoomIn(): void {
    if (!this.enableZoom) return;
    this.zoom = Math.min(this.zoom + 0.5, this.maxZoom);
    this.erxZoomChange.emit({ zoom: this.zoom });
  }

  private zoomOut(): void {
    if (!this.enableZoom) return;
    this.zoom = Math.max(this.zoom - 0.5, 1);
    this.erxZoomChange.emit({ zoom: this.zoom });
  }

  private resetZoom(): void {
    this.zoom = 1;
    this.erxZoomChange.emit({ zoom: this.zoom });
  }

  private toggleSlideshow(): void {
    if (this.isPlaying) {
      this.stopSlideshow();
    } else {
      this.startSlideshow();
    }
  }

  private startSlideshow(): void {
    this.isPlaying = true;
    this.slideshowTimer = window.setInterval(() => {
      this.next();
    }, this.slideshowInterval);
  }

  private stopSlideshow(): void {
    this.isPlaying = false;
    if (this.slideshowTimer) {
      clearInterval(this.slideshowTimer);
      this.slideshowTimer = undefined;
    }
  }

  private handleBackdropClick = () => {
    if (this.backdropDismiss) {
      this.open = false;
    }
  };

  private get currentImage(): ErxLightboxImage | undefined {
    return this.images[this.currentIndex];
  }

  render() {
    if (!this.open || !this.currentImage) return null;

    return (
      <div class="erx-lb" part="container">
        {/* Backdrop */}
        <div
          class="erx-lb__backdrop"
          onClick={this.handleBackdropClick}
          part="backdrop"
        />

        {/* Header */}
        <header class="erx-lb__header" part="header">
          {this.showCounter && (
            <span class="erx-lb__counter">
              {this.currentIndex + 1} / {this.images.length}
            </span>
          )}

          <div class="erx-lb__actions">
            {this.enableZoom && (
              <div class="erx-lb__zoom-controls">
                <button class="erx-lb__btn" onClick={() => this.zoomOut()} disabled={this.zoom <= 1}>−</button>
                <span class="erx-lb__zoom-level">{Math.round(this.zoom * 100)}%</span>
                <button class="erx-lb__btn" onClick={() => this.zoomIn()} disabled={this.zoom >= this.maxZoom}>+</button>
              </div>
            )}

            {this.enableSlideshow && (
              <button class="erx-lb__btn" onClick={() => this.toggleSlideshow()}>
                {this.isPlaying ? '⏸' : '▶'}
              </button>
            )}

            <button class="erx-lb__btn erx-lb__close" onClick={() => this.open = false}>✕</button>
          </div>
        </header>

        {/* Main image */}
        <div class="erx-lb__main" part="main">
          {this.showNav && this.images.length > 1 && (
            <button class="erx-lb__nav erx-lb__nav--prev" onClick={() => this.prev()} part="nav-prev">
              ‹
            </button>
          )}

          <div class="erx-lb__image-container">
            <img
              src={this.currentImage.src}
              alt={this.currentImage.alt || ''}
              class="erx-lb__image"
              style={{ transform: `scale(${this.zoom})` }}
              part="image"
            />
          </div>

          {this.showNav && this.images.length > 1 && (
            <button class="erx-lb__nav erx-lb__nav--next" onClick={() => this.next()} part="nav-next">
              ›
            </button>
          )}
        </div>

        {/* Caption */}
        {this.showCaption && (this.currentImage.title || this.currentImage.description) && (
          <div class="erx-lb__caption" part="caption">
            {this.currentImage.title && <h3 class="erx-lb__caption-title">{this.currentImage.title}</h3>}
            {this.currentImage.description && <p class="erx-lb__caption-desc">{this.currentImage.description}</p>}
          </div>
        )}

        {/* Thumbnails */}
        {this.showThumbnails && this.images.length > 1 && (
          <div class="erx-lb__thumbnails" part="thumbnails">
            {this.images.map((img, idx) => (
              <button
                class={{
                  'erx-lb__thumb': true,
                  'erx-lb__thumb--active': idx === this.currentIndex,
                }}
                onClick={() => this.goTo(idx)}
              >
                <img src={img.thumbnail || img.src} alt={img.alt || ''} />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}
