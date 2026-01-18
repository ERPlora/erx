import { Component, Prop, Event, EventEmitter, State, h, Element, Method } from '@stencil/core';
import { ErxCarouselSlide, ErxCarouselSlideEvent } from './erx-carousel.types';

@Component({
  tag: 'erx-carousel',
  styleUrl: 'erx-carousel.css',
  shadow: true,
})
export class ErxCarousel {
  @Element() el!: HTMLElement;

  /** Slides array */
  @Prop() slides: ErxCarouselSlide[] = [];

  /** Auto-play */
  @Prop() autoPlay: boolean = false;

  /** Auto-play interval (ms) */
  @Prop() interval: number = 5000;

  /** Show navigation arrows */
  @Prop() showNav: boolean = true;

  /** Show pagination dots */
  @Prop() showPagination: boolean = true;

  /** Loop slides */
  @Prop() loop: boolean = true;

  /** Slides per view */
  @Prop() slidesPerView: number = 1;

  /** Space between slides */
  @Prop() spaceBetween: number = 0;

  /** Pause on hover */
  @Prop() pauseOnHover: boolean = true;

  /** Enable touch/swipe */
  @Prop() touchEnabled: boolean = true;

  /** Slide change event */
  @Event() erxSlideChange!: EventEmitter<ErxCarouselSlideEvent>;

  @State() currentIndex: number = 0;
  @State() isPlaying: boolean = false;
  @State() isPaused: boolean = false;

  private autoPlayTimer?: number;
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  componentDidLoad() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  disconnectedCallback() {
    this.stopAutoPlay();
  }

  @Method()
  async goTo(index: number): Promise<void> {
    const direction = index > this.currentIndex ? 'next' : 'prev';
    this.currentIndex = this.normalizeIndex(index);
    this.erxSlideChange.emit({
      index: this.currentIndex,
      slide: this.slides[this.currentIndex],
      direction,
    });
  }

  @Method()
  async next(): Promise<void> {
    this.goTo(this.currentIndex + 1);
  }

  @Method()
  async prev(): Promise<void> {
    this.goTo(this.currentIndex - 1);
  }

  @Method()
  async play(): Promise<void> {
    this.startAutoPlay();
  }

  @Method()
  async pause(): Promise<void> {
    this.stopAutoPlay();
  }

  private normalizeIndex(index: number): number {
    const max = this.slides.length - this.slidesPerView;
    if (this.loop) {
      if (index < 0) return max;
      if (index > max) return 0;
    }
    return Math.max(0, Math.min(max, index));
  }

  private startAutoPlay(): void {
    this.isPlaying = true;
    this.autoPlayTimer = window.setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.interval);
  }

  private stopAutoPlay(): void {
    this.isPlaying = false;
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  private handleMouseEnter = () => {
    if (this.pauseOnHover && this.isPlaying) {
      this.isPaused = true;
    }
  };

  private handleMouseLeave = () => {
    if (this.pauseOnHover) {
      this.isPaused = false;
    }
  };

  private handleTouchStart = (e: TouchEvent) => {
    if (!this.touchEnabled) return;
    this.touchStartX = e.touches[0].clientX;
  };

  private handleTouchMove = (e: TouchEvent) => {
    if (!this.touchEnabled) return;
    this.touchEndX = e.touches[0].clientX;
  };

  private handleTouchEnd = () => {
    if (!this.touchEnabled) return;
    const diff = this.touchStartX - this.touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  };

  private getTranslateX(): string {
    const slideWidth = 100 / this.slidesPerView;
    return `translateX(-${this.currentIndex * slideWidth}%)`;
  }

  render() {
    const slideWidth = 100 / this.slidesPerView;

    return (
      <div
        class="erx-carousel"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        part="container"
      >
        {/* Track */}
        <div class="erx-carousel__viewport" part="viewport">
          <div
            class="erx-carousel__track"
            style={{
              transform: this.getTranslateX(),
              gap: `${this.spaceBetween}px`,
            }}
            part="track"
          >
            {this.slides.map((slide) => (
              <div
                class="erx-carousel__slide"
                style={{ flex: `0 0 calc(${slideWidth}% - ${this.spaceBetween}px)` }}
                part="slide"
              >
                {slide.image && (
                  <img
                    src={slide.image}
                    alt={slide.title || ''}
                    class="erx-carousel__image"
                    part="image"
                  />
                )}
                {(slide.title || slide.description) && (
                  <div class="erx-carousel__content" part="content">
                    {slide.title && <h3 class="erx-carousel__title">{slide.title}</h3>}
                    {slide.description && <p class="erx-carousel__desc">{slide.description}</p>}
                  </div>
                )}
                <slot name={`slide-${slide.id}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {this.showNav && this.slides.length > this.slidesPerView && (
          <div class="erx-carousel__nav" part="nav">
            <button
              class="erx-carousel__nav-btn erx-carousel__nav-btn--prev"
              onClick={() => this.prev()}
              disabled={!this.loop && this.currentIndex === 0}
              part="nav-prev"
            >
              ‹
            </button>
            <button
              class="erx-carousel__nav-btn erx-carousel__nav-btn--next"
              onClick={() => this.next()}
              disabled={!this.loop && this.currentIndex >= this.slides.length - this.slidesPerView}
              part="nav-next"
            >
              ›
            </button>
          </div>
        )}

        {/* Pagination */}
        {this.showPagination && this.slides.length > this.slidesPerView && (
          <div class="erx-carousel__pagination" part="pagination">
            {this.slides.slice(0, this.slides.length - this.slidesPerView + 1).map((_, idx) => (
              <button
                class={{
                  'erx-carousel__dot': true,
                  'erx-carousel__dot--active': idx === this.currentIndex,
                }}
                onClick={() => this.goTo(idx)}
                part="dot"
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
