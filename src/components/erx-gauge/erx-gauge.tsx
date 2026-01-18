import { Component, Prop, State, h, Watch } from '@stencil/core';
import { ErxGaugeSize, ErxGaugeSegment } from './erx-gauge.types';

@Component({
  tag: 'erx-gauge',
  styleUrl: 'erx-gauge.css',
  shadow: true,
})
export class ErxGauge {
  /** Current value */
  @Prop() value: number = 0;

  /** Minimum value */
  @Prop() min: number = 0;

  /** Maximum value */
  @Prop() max: number = 100;

  /** Gauge size */
  @Prop() size: ErxGaugeSize = 'md';

  /** Custom width */
  @Prop() width?: number;

  /** Start angle (degrees) */
  @Prop() startAngle: number = -135;

  /** End angle (degrees) */
  @Prop() endAngle: number = 135;

  /** Segments/zones */
  @Prop() segments: ErxGaugeSegment[] = [];

  /** Show value */
  @Prop() showValue: boolean = true;

  /** Unit label */
  @Prop() unit?: string;

  /** Label */
  @Prop() label?: string;

  /** Show min/max labels */
  @Prop() showMinMax: boolean = true;

  /** Animate on change */
  @Prop() animate: boolean = true;

  @State() animatedValue: number = 0;

  private animationFrame?: number;

  @Watch('value')
  handleValueChange() {
    if (this.animate) {
      this.animateValue();
    } else {
      this.animatedValue = this.value;
    }
  }

  componentWillLoad() {
    if (this.animate) {
      this.animateValue();
    } else {
      this.animatedValue = this.value;
    }
  }

  disconnectedCallback() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private animateValue(): void {
    const startValue = this.animatedValue;
    const endValue = this.value;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.animatedValue = startValue + (endValue - startValue) * eased;

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  private getSizeValue(): number {
    if (this.width) return this.width;

    const sizes: Record<ErxGaugeSize, number> = {
      sm: 120,
      md: 180,
      lg: 240,
    };

    return sizes[this.size];
  }

  private get percentage(): number {
    return Math.min(Math.max((this.animatedValue - this.min) / (this.max - this.min), 0), 1);
  }

  private get currentAngle(): number {
    const range = this.endAngle - this.startAngle;
    return this.startAngle + range * this.percentage;
  }

  private getCurrentColor(): string {
    if (this.segments.length === 0) {
      return 'var(--erx-color-primary, #667eea)';
    }

    for (let i = this.segments.length - 1; i >= 0; i--) {
      if (this.animatedValue >= this.segments[i].value) {
        return this.segments[i].color;
      }
    }

    return this.segments[0]?.color || 'var(--erx-color-primary, #667eea)';
  }

  private polarToCartesian(cx: number, cy: number, r: number, angle: number): { x: number; y: number } {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  private describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
    const start = this.polarToCartesian(cx, cy, r, endAngle);
    const end = this.polarToCartesian(cx, cy, r, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
  }

  render() {
    const size = this.getSizeValue();
    const center = size / 2;
    const radius = size / 2 - 20;
    const strokeWidth = size / 12;

    return (
      <div
        class="erx-gauge"
        style={{ width: `${size}px`, height: `${size * 0.7}px` }}
        part="container"
      >
        <svg
          class="erx-gauge__svg"
          width={size}
          height={size * 0.7}
          viewBox={`0 0 ${size} ${size * 0.7}`}
        >
          {/* Track */}
          <path
            class="erx-gauge__track"
            d={this.describeArc(center, center, radius, this.startAngle, this.endAngle)}
            fill="none"
            stroke="var(--erx-border-color, #e5e7eb)"
            stroke-width={strokeWidth}
            stroke-linecap="round"
            part="track"
          />

          {/* Segments */}
          {this.segments.length > 0 && this.segments.map((segment, i) => {
            const prevValue = i === 0 ? this.min : this.segments[i - 1].value;
            const startPct = (prevValue - this.min) / (this.max - this.min);
            const endPct = (segment.value - this.min) / (this.max - this.min);
            const range = this.endAngle - this.startAngle;
            const segStart = this.startAngle + range * startPct;
            const segEnd = this.startAngle + range * endPct;

            return (
              <path
                class="erx-gauge__segment"
                d={this.describeArc(center, center, radius, segStart, segEnd)}
                fill="none"
                stroke={segment.color}
                stroke-width={strokeWidth}
                stroke-linecap="round"
                opacity="0.3"
              />
            );
          })}

          {/* Progress */}
          <path
            class="erx-gauge__progress"
            d={this.describeArc(center, center, radius, this.startAngle, this.currentAngle)}
            fill="none"
            stroke={this.getCurrentColor()}
            stroke-width={strokeWidth}
            stroke-linecap="round"
            part="progress"
          />

          {/* Needle */}
          <g transform={`rotate(${this.currentAngle} ${center} ${center})`}>
            <line
              x1={center}
              y1={center}
              x2={center + radius - 10}
              y2={center}
              stroke={this.getCurrentColor()}
              stroke-width="3"
              stroke-linecap="round"
              class="erx-gauge__needle"
              part="needle"
            />
            <circle
              cx={center}
              cy={center}
              r="8"
              fill={this.getCurrentColor()}
              class="erx-gauge__needle-cap"
            />
          </g>

          {/* Min/Max labels */}
          {this.showMinMax && (
            <g class="erx-gauge__labels">
              <text
                x={this.polarToCartesian(center, center, radius + 15, this.startAngle).x}
                y={this.polarToCartesian(center, center, radius + 15, this.startAngle).y}
                text-anchor="middle"
                class="erx-gauge__min-max"
              >
                {this.min}
              </text>
              <text
                x={this.polarToCartesian(center, center, radius + 15, this.endAngle).x}
                y={this.polarToCartesian(center, center, radius + 15, this.endAngle).y}
                text-anchor="middle"
                class="erx-gauge__min-max"
              >
                {this.max}
              </text>
            </g>
          )}
        </svg>

        {/* Value display */}
        <div class="erx-gauge__value-container" part="value-container">
          {this.showValue && (
            <span class="erx-gauge__value" part="value">
              {Math.round(this.animatedValue)}
              {this.unit && <span class="erx-gauge__unit">{this.unit}</span>}
            </span>
          )}
          {this.label && (
            <span class="erx-gauge__label" part="label">{this.label}</span>
          )}
        </div>
      </div>
    );
  }
}
