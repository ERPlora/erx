import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { Metric, MetricCardConfig, MetricStatus } from './erx-metric-card.types';

@Component({
  tag: 'erx-metric-card',
  styleUrl: 'erx-metric-card.css',
  shadow: true,
})
export class ErxMetricCard {
  @Prop() metric!: Metric;
  @Prop() config: MetricCardConfig = {};

  @Event() erxSelect!: EventEmitter<Metric>;

  private getStatus(): MetricStatus {
    const { metric } = this;
    if (!metric.threshold) return 'neutral';

    const { warning, critical, direction } = metric.threshold;
    const value = metric.value;

    if (direction === 'above') {
      if (value >= critical) return 'critical';
      if (value >= warning) return 'warning';
      return 'good';
    } else {
      if (value <= critical) return 'critical';
      if (value <= warning) return 'warning';
      return 'good';
    }
  }

  private getTrendIcon(): string {
    if (this.metric.trend === 'up') return '↑';
    if (this.metric.trend === 'down') return '↓';
    return '→';
  }

  private formatValue(value: number): string {
    const { format, unit } = this.metric;
    const { currency = 'USD', locale = 'en-US' } = this.config;

    if (format === 'currency') {
      return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
    }
    if (format === 'percent') {
      return `${value.toFixed(1)}%`;
    }
    return value.toLocaleString(locale) + (unit ? ` ${unit}` : '');
  }

  private formatChange(): string {
    const change = this.metric.change;
    if (change === undefined) return '';
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  }

  private renderSparkline() {
    const data = this.metric.sparkline;
    if (!data || data.length < 2) return null;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 80;
    const height = 32;

    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    const trendColor = this.metric.trend === 'up'
      ? 'var(--erx-color-success, #10b981)'
      : this.metric.trend === 'down'
        ? 'var(--erx-color-danger, #ef4444)'
        : 'var(--erx-color-primary, #667eea)';

    return (
      <svg class="erx-metric__sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke={trendColor} stroke-width="2" />
      </svg>
    );
  }

  private renderTargetProgress() {
    const { value, target } = this.metric;
    if (!target) return null;

    const progress = Math.min((value / target) * 100, 100);

    return (
      <div class="erx-metric__target">
        <div class="erx-metric__target-bar">
          <div class="erx-metric__target-fill" style={{ width: `${progress}%` }}></div>
          <div class="erx-metric__target-marker" style={{ left: '100%' }}></div>
        </div>
        <span class="erx-metric__target-label">
          Target: {this.formatValue(target)}
        </span>
      </div>
    );
  }

  render() {
    const { metric, config } = this;
    const status = this.getStatus();

    return (
      <div
        class={{
          'erx-metric': true,
          [`erx-metric--${status}`]: true,
          [`erx-metric--${metric.trend || 'stable'}`]: true,
        }}
        style={{ '--metric-color': metric.color }}
        onClick={() => this.erxSelect.emit(metric)}
        part="container"
      >
        <div class="erx-metric__header">
          {metric.icon && <span class="erx-metric__icon">{metric.icon}</span>}
          <span class="erx-metric__label">{metric.label}</span>
        </div>

        <div class="erx-metric__body">
          <div class="erx-metric__value-section">
            <span class="erx-metric__value">{this.formatValue(metric.value)}</span>

            {config.showTrend !== false && metric.change !== undefined && (
              <span class={`erx-metric__change erx-metric__change--${metric.trend || 'stable'}`}>
                <span class="erx-metric__trend-icon">{this.getTrendIcon()}</span>
                {this.formatChange()}
              </span>
            )}
          </div>

          {config.showSparkline && metric.sparkline && (
            <div class="erx-metric__sparkline-wrapper">
              {this.renderSparkline()}
            </div>
          )}
        </div>

        {config.showTarget && metric.target && this.renderTargetProgress()}

        {metric.description && (
          <p class="erx-metric__description">{metric.description}</p>
        )}
      </div>
    );
  }
}
