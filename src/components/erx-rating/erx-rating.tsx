import { Component, Prop, Event, EventEmitter, State, h, Host } from '@stencil/core';
import type { RatingChangeEvent } from './erx-rating.types';

/**
 * @component erx-rating
 * @description A flexible rating component with support for stars, half-stars, and custom icons.
 * Perfect for product reviews, employee evaluations, and quality ratings.
 */
@Component({
  tag: 'erx-rating',
  styleUrl: 'erx-rating.css',
  shadow: true,
})
export class ErxRating {
  /**
   * Current rating value
   */
  @Prop({ mutable: true, reflect: true }) value: number = 0;

  /**
   * Maximum rating value (number of stars/icons)
   */
  @Prop() max: number = 5;

  /**
   * Allow half-star ratings
   */
  @Prop() allowHalf: boolean = false;

  /**
   * Read-only mode (no interaction)
   */
  @Prop() readonly: boolean = false;

  /**
   * Disabled state
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Size variant
   */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Color theme
   */
  @Prop({ reflect: true }) color: 'primary' | 'secondary' | 'warning' | 'success' | 'danger' = 'warning';

  /**
   * Show rating count label
   */
  @Prop() showLabel: boolean = false;

  /**
   * Custom label text (e.g., "4.5 out of 5")
   */
  @Prop() label: string = '';

  /**
   * Show numeric value next to stars
   */
  @Prop() showValue: boolean = false;

  /**
   * Number of reviews/ratings (displayed if showLabel is true)
   */
  @Prop() reviewCount: number = 0;

  /**
   * Icon type
   */
  @Prop() icon: 'star' | 'heart' | 'circle' | 'thumb' = 'star';

  /**
   * Emitted when rating value changes
   */
  @Event() erxChange!: EventEmitter<RatingChangeEvent>;

  /**
   * Emitted when user hovers over a rating
   */
  @Event() erxHover!: EventEmitter<number>;

  @State() hoverValue: number = 0;

  private handleClick(index: number, isHalf: boolean = false) {
    if (this.readonly || this.disabled) return;

    const newValue = this.allowHalf && isHalf ? index + 0.5 : index + 1;

    if (this.value === newValue) {
      // Click same value to reset
      this.value = 0;
    } else {
      this.value = newValue;
    }

    this.erxChange.emit({
      value: this.value,
      maxValue: this.max,
    });
  }

  private handleMouseEnter(index: number, isHalf: boolean = false) {
    if (this.readonly || this.disabled) return;

    this.hoverValue = this.allowHalf && isHalf ? index + 0.5 : index + 1;
    this.erxHover.emit(this.hoverValue);
  }

  private handleMouseLeave() {
    if (this.readonly || this.disabled) return;
    this.hoverValue = 0;
  }

  private handleKeyDown(e: KeyboardEvent, index: number) {
    if (this.readonly || this.disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.handleClick(index);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        if (index < this.max - 1) {
          const nextStar = (e.target as HTMLElement).parentElement?.nextElementSibling?.querySelector('.erx-rating__star') as HTMLElement;
          nextStar?.focus();
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        if (index > 0) {
          const prevStar = (e.target as HTMLElement).parentElement?.previousElementSibling?.querySelector('.erx-rating__star') as HTMLElement;
          prevStar?.focus();
        }
        break;
    }
  }

  private getStarFillPercentage(index: number): number {
    const displayValue = this.hoverValue || this.value;

    if (displayValue >= index + 1) {
      return 100;
    } else if (displayValue > index) {
      return (displayValue - index) * 100;
    }
    return 0;
  }

  private renderIcon() {
    switch (this.icon) {
      case 'heart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        );
      case 'circle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
      case 'thumb':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
          </svg>
        );
      default: // star
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
    }
  }

  private getLabel(): string {
    if (this.label) {
      return this.label;
    }

    if (this.showLabel && this.reviewCount > 0) {
      return `${this.value} out of ${this.max} (${this.reviewCount} ${this.reviewCount === 1 ? 'review' : 'reviews'})`;
    }

    if (this.showValue) {
      return `${this.value}`;
    }

    return '';
  }

  render() {
    const stars = Array.from({ length: this.max }, (_, i) => i);

    return (
      <Host
        class={{
          'erx-rating--readonly': this.readonly,
          'erx-rating--disabled': this.disabled,
        }}
        role="slider"
        aria-label="Rating"
        aria-valuenow={this.value}
        aria-valuemin={0}
        aria-valuemax={this.max}
        aria-readonly={this.readonly ? 'true' : 'false'}
        aria-disabled={this.disabled ? 'true' : 'false'}
      >
        <div class="erx-rating" part="container">
          <div
            class="erx-rating__stars"
            part="stars"
            onMouseLeave={() => this.handleMouseLeave()}
          >
            {stars.map(index => {
              const fillPercentage = this.getStarFillPercentage(index);
              const isActive = fillPercentage > 0;

              return (
                <div
                  key={index}
                  class="erx-rating__star-container"
                  part="star-container"
                >
                  {this.allowHalf && (
                    <div
                      class={{
                        'erx-rating__star': true,
                        'erx-rating__star--half': true,
                        'erx-rating__star--active': this.getStarFillPercentage(index) >= 50,
                      }}
                      part="star star-half"
                      tabIndex={this.readonly || this.disabled ? -1 : 0}
                      role="button"
                      aria-label={`Rate ${index + 0.5} out of ${this.max}`}
                      onClick={() => this.handleClick(index, true)}
                      onMouseEnter={() => this.handleMouseEnter(index, true)}
                      onKeyDown={(e) => this.handleKeyDown(e, index)}
                    >
                      <div class="erx-rating__icon erx-rating__icon--empty">
                        {this.renderIcon()}
                      </div>
                      <div
                        class="erx-rating__icon erx-rating__icon--filled"
                        style={{ clipPath: 'inset(0 50% 0 0)' }}
                      >
                        {this.renderIcon()}
                      </div>
                    </div>
                  )}
                  <div
                    class={{
                      'erx-rating__star': true,
                      'erx-rating__star--full': true,
                      'erx-rating__star--active': isActive,
                    }}
                    part={`star ${isActive ? 'star-active' : 'star-inactive'}`}
                    tabIndex={this.readonly || this.disabled ? -1 : 0}
                    role="button"
                    aria-label={`Rate ${index + 1} out of ${this.max}`}
                    onClick={() => this.handleClick(index, false)}
                    onMouseEnter={() => this.handleMouseEnter(index, false)}
                    onKeyDown={(e) => this.handleKeyDown(e, index)}
                  >
                    <div class="erx-rating__icon erx-rating__icon--empty">
                      {this.renderIcon()}
                    </div>
                    <div
                      class="erx-rating__icon erx-rating__icon--filled"
                      style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
                    >
                      {this.renderIcon()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {(this.showLabel || this.showValue || this.label) && (
            <div class="erx-rating__label" part="label">
              {this.getLabel()}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
