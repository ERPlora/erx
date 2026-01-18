import { Component, Prop, State, h, Watch } from '@stencil/core';
import { ErxProgressCircleSize } from './erx-progress-circle.types';

@Component({
  tag: 'erx-progress-circle',
  styleUrl: 'erx-progress-circle.css',
  shadow: true,
})
export class ErxProgressCircle {
  /** Progress value (0-100) */
  @Prop() value: number = 0;

  /** Maximum value */
  @Prop() max: number = 100;

  /** Circle size */
  @Prop() size: ErxProgressCircleSize = 'md';

  /** Custom size in pixels */
  @Prop() customSize?: number;

  /** Stroke width */
  @Prop() strokeWidth: number = 8;

  /** Show percentage text */
  @Prop() showValue: boolean = true;

  /** Custom label */
  @Prop() label?: string;

  /** Color (CSS color or theme color) */
  @Prop() color: string = 'var(--erx-color-primary, #667eea)';

  /** Track color */
  @Prop() trackColor: string = 'var(--erx-border-color, #e5e7eb)';

  /** Animate on load */
  @Prop() shouldAnimate: boolean = true;

  /** Animation duration (ms) */
  @Prop() animationDuration: number = 1000;

  /** Indeterminate state */
  @Prop({ reflect: true }) indeterminate: boolean = false;

  @State() animatedValue: number = 0;

  private animationFrame?: number;

  @Watch('value')
  handleValueChange() {
    if (this.shouldAnimate && !this.indeterminate) {
      this.runAnimation();
    } else {
      this.animatedValue = this.value;
    }
  }

  componentWillLoad() {
    if (this.shouldAnimate && !this.indeterminate) {
      this.runAnimation();
    } else {
      this.animatedValue = this.value;
    }
  }

  disconnectedCallback() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private runAnimation(): void {
    const startValue = this.animatedValue;
    const endValue = this.value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.animationDuration, 1);

      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      this.animatedValue = startValue + (endValue - startValue) * eased;

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  private getSizeValue(): number {
    if (this.customSize) return this.customSize;

    const sizes: Record<ErxProgressCircleSize, number> = {
      sm: 48,
      md: 80,
      lg: 120,
      xl: 160,
    };

    return sizes[this.size];
  }

  private get percentage(): number {
    return Math.min(Math.max((this.animatedValue / this.max) * 100, 0), 100);
  }

  private get displayValue(): string {
    return `${Math.round(this.percentage)}%`;
  }

  render() {
    const size = this.getSizeValue();
    const radius = (size - this.strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (this.percentage / 100) * circumference;
    const center = size / 2;

    return (
      <div
        class={{
          'erx-pc': true,
          'erx-pc--indeterminate': this.indeterminate,
        }}
        style={{ width: `${size}px`, height: `${size}px` }}
        part="container"
      >
        <svg
          class="erx-pc__svg"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Track */}
          <circle
            class="erx-pc__track"
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={this.trackColor}
            stroke-width={this.strokeWidth}
            part="track"
          />

          {/* Progress */}
          <circle
            class="erx-pc__progress"
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={this.color}
            stroke-width={this.strokeWidth}
            stroke-linecap="round"
            stroke-dasharray={circumference}
            stroke-dashoffset={this.indeterminate ? circumference * 0.75 : offset}
            transform={`rotate(-90 ${center} ${center})`}
            part="progress"
          />
        </svg>

        {/* Center content */}
        <div class="erx-pc__content" part="content">
          {this.showValue && !this.indeterminate && (
            <span class="erx-pc__value" part="value">
              {this.displayValue}
            </span>
          )}
          {this.label && (
            <span class="erx-pc__label" part="label">
              {this.label}
            </span>
          )}
          <slot />
        </div>
      </div>
    );
  }
}
