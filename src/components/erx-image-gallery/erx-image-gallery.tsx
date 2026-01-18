import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';
import { ErxGalleryImage, ErxGalleryLayout, ErxGalleryClickEvent } from './erx-image-gallery.types';

@Component({
  tag: 'erx-image-gallery',
  styleUrl: 'erx-image-gallery.css',
  shadow: true,
})
export class ErxImageGallery {
  /** Images array */
  @Prop() images: ErxGalleryImage[] = [];

  /** Layout type */
  @Prop() layout: ErxGalleryLayout = 'grid';

  /** Columns (for grid) */
  @Prop() columns: number = 3;

  /** Gap between images */
  @Prop() gap: number = 8;

  /** Image aspect ratio */
  @Prop() aspectRatio: string = '1';

  /** Enable lightbox */
  @Prop() lightbox: boolean = true;

  /** Lazy load images */
  @Prop() lazyLoad: boolean = true;

  /** Image click event */
  @Event() erxImageClick!: EventEmitter<ErxGalleryClickEvent>;

  @State() lightboxOpen: boolean = false;
  @State() lightboxIndex: number = 0;
  @State() loadedImages: Set<string> = new Set();

  private handleImageClick(image: ErxGalleryImage, index: number): void {
    this.erxImageClick.emit({ image, index });

    if (this.lightbox) {
      this.lightboxIndex = index;
      this.lightboxOpen = true;
    }
  }

  private handleImageLoad(id: string): void {
    this.loadedImages = new Set([...this.loadedImages, id]);
  }

  private closeLightbox = () => {
    this.lightboxOpen = false;
  };

  private prevImage = () => {
    this.lightboxIndex = this.lightboxIndex === 0
      ? this.images.length - 1
      : this.lightboxIndex - 1;
  };

  private nextImage = () => {
    this.lightboxIndex = (this.lightboxIndex + 1) % this.images.length;
  };

  render() {
    return (
      <div class="erx-gallery" part="container">
        {/* Grid */}
        <div
          class={`erx-gallery__grid erx-gallery__grid--${this.layout}`}
          style={{
            '--columns': String(this.columns),
            '--gap': `${this.gap}px`,
            '--aspect-ratio': this.aspectRatio,
          }}
          part="grid"
        >
          {this.images.map((image, index) => (
            <div
              class={{
                'erx-gallery__item': true,
                'erx-gallery__item--loaded': this.loadedImages.has(image.id),
              }}
              onClick={() => this.handleImageClick(image, index)}
              part="item"
            >
              <img
                src={image.thumbnail || image.src}
                alt={image.alt || ''}
                loading={this.lazyLoad ? 'lazy' : 'eager'}
                onLoad={() => this.handleImageLoad(image.id)}
                class="erx-gallery__image"
                part="image"
              />
              {image.title && (
                <div class="erx-gallery__caption" part="caption">
                  {image.title}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {this.lightbox && this.lightboxOpen && (
          <div class="erx-gallery__lightbox" part="lightbox">
            <div class="erx-gallery__lightbox-backdrop" onClick={this.closeLightbox} />

            <div class="erx-gallery__lightbox-content">
              <img
                src={this.images[this.lightboxIndex]?.src}
                alt={this.images[this.lightboxIndex]?.alt || ''}
                class="erx-gallery__lightbox-image"
              />

              {this.images.length > 1 && (
                <button
                  class="erx-gallery__lightbox-nav erx-gallery__lightbox-nav--prev"
                  onClick={this.prevImage}
                >
                  ‹
                </button>
              )}

              {this.images.length > 1 && (
                <button
                  class="erx-gallery__lightbox-nav erx-gallery__lightbox-nav--next"
                  onClick={this.nextImage}
                >
                  ›
                </button>
              )}

              <button class="erx-gallery__lightbox-close" onClick={this.closeLightbox}>
                ✕
              </button>

              <div class="erx-gallery__lightbox-info">
                {this.images[this.lightboxIndex]?.title && (
                  <h3>{this.images[this.lightboxIndex].title}</h3>
                )}
                {this.images[this.lightboxIndex]?.description && (
                  <p>{this.images[this.lightboxIndex].description}</p>
                )}
                <span class="erx-gallery__lightbox-counter">
                  {this.lightboxIndex + 1} / {this.images.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
