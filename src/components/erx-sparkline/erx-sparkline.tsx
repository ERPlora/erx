import { Component, Prop, h } from '@stencil/core';
import { ErxSparklineType } from './erx-sparkline.types';

@Component({
  tag: 'erx-sparkline',
  styleUrl: 'erx-sparkline.css',
  shadow: true,
})
export class ErxSparkline {
  /** Data points */
  @Prop() data: number[] = [];

  /** Chart type */
  @Prop() type: ErxSparklineType = 'line';

  /** Chart width */
  @Prop() width: number = 100;

  /** Chart height */
  @Prop() height: number = 24;

  /** Line/bar color */
  @Prop() color: string = 'var(--erx-color-primary, #667eea)';

  /** Fill color (for area) */
  @Prop() fillColor?: string;

  /** Show min/max dots */
  @Prop() showMinMax: boolean = false;

  /** Show last value dot */
  @Prop() showLast: boolean = true;

  /** Animate on load */
  @Prop() shouldAnimate: boolean = true;

  /** Curve line (smooth) */
  @Prop() curved: boolean = true;

  private get minValue(): number {
    return Math.min(...this.data);
  }

  private get maxValue(): number {
    return Math.max(...this.data);
  }

  private get minIndex(): number {
    return this.data.indexOf(this.minValue);
  }

  private get maxIndex(): number {
    return this.data.indexOf(this.maxValue);
  }

  private normalizeY(value: number): number {
    const range = this.maxValue - this.minValue;
    if (range === 0) return this.height / 2;
    const padding = 4;
    return this.height - padding - ((value - this.minValue) / range) * (this.height - padding * 2);
  }

  private getPoints(): { x: number; y: number }[] {
    if (this.data.length === 0) return [];

    const step = this.width / Math.max(this.data.length - 1, 1);
    return this.data.map((value, i) => ({
      x: i * step,
      y: this.normalizeY(value),
    }));
  }

  private getLinePath(): string {
    const points = this.getPoints();
    if (points.length === 0) return '';

    if (this.curved && points.length > 2) {
      return this.getCurvedPath(points);
    }

    return points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
  }

  private getCurvedPath(points: { x: number; y: number }[]): string {
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return path;
  }

  private getAreaPath(): string {
    const linePath = this.getLinePath();
    if (!linePath) return '';

    const points = this.getPoints();
    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];

    return `${linePath} L ${lastPoint.x} ${this.height} L ${firstPoint.x} ${this.height} Z`;
  }

  private renderLine() {
    const points = this.getPoints();
    const path = this.getLinePath();
    const lastPoint = points[points.length - 1];

    return (
      <g>
        {this.type === 'area' && (
          <path
            d={this.getAreaPath()}
            fill={this.fillColor || this.color}
            opacity="0.2"
            class={this.shouldAnimate ? 'erx-spark__area--animated' : ''}
          />
        )}
        <path
          d={path}
          fill="none"
          stroke={this.color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class={this.shouldAnimate ? 'erx-spark__line--animated' : ''}
        />
        {this.showMinMax && (
          <g>
            <circle
              cx={points[this.minIndex]?.x}
              cy={points[this.minIndex]?.y}
              r="3"
              fill="var(--erx-color-danger, #ef4444)"
            />
            <circle
              cx={points[this.maxIndex]?.x}
              cy={points[this.maxIndex]?.y}
              r="3"
              fill="var(--erx-color-success, #22c55e)"
            />
          </g>
        )}
        {this.showLast && lastPoint && (
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r="3"
            fill={this.color}
          />
        )}
      </g>
    );
  }

  private renderBars() {
    if (this.data.length === 0) return null;

    const barWidth = Math.max(2, (this.width / this.data.length) - 2);
    const gap = 2;

    return (
      <g>
        {this.data.map((value, i) => {
          const barHeight = this.height - this.normalizeY(value);
          const x = i * (barWidth + gap);
          const y = this.height - barHeight;

          return (
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={this.color}
              rx="1"
              class={this.shouldAnimate ? 'erx-spark__bar--animated' : ''}
              style={{ animationDelay: `${i * 30}ms` }}
            />
          );
        })}
      </g>
    );
  }

  render() {
    if (this.data.length === 0) return null;

    return (
      <svg
        class="erx-spark"
        width={this.width}
        height={this.height}
        viewBox={`0 0 ${this.width} ${this.height}`}
        part="container"
      >
        {this.type === 'bar' ? this.renderBars() : this.renderLine()}
      </svg>
    );
  }
}
