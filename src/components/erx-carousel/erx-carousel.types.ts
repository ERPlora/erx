/**
 * ERX Carousel Types
 * Image/content carousel/slider
 */

export interface ErxCarouselSlide {
  /** Slide ID */
  id: string;
  /** Image URL */
  image?: string;
  /** Title */
  title?: string;
  /** Description */
  description?: string;
  /** Link URL */
  link?: string;
  /** Custom content (HTML) */
  content?: string;
}

export interface ErxCarouselConfig {
  /** Slides array */
  slides?: ErxCarouselSlide[];
  /** Auto-play */
  autoPlay?: boolean;
  /** Auto-play interval (ms) */
  interval?: number;
  /** Show navigation arrows */
  showNav?: boolean;
  /** Show pagination dots */
  showPagination?: boolean;
  /** Loop slides */
  loop?: boolean;
  /** Slides per view */
  slidesPerView?: number;
  /** Space between slides */
  spaceBetween?: number;
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Enable touch/swipe */
  touchEnabled?: boolean;
}

export interface ErxCarouselSlideEvent {
  index: number;
  slide: ErxCarouselSlide;
  direction: 'next' | 'prev';
}
