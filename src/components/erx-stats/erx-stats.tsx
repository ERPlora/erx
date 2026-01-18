import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { Stat, StatsConfig } from './erx-stats.types';

@Component({
  tag: 'erx-stats',
  styleUrl: 'erx-stats.css',
  shadow: true,
})
export class ErxStats {
  @Prop() stats: Stat[] = [];
  @Prop() config: StatsConfig = {};
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  @Event() erxSelect!: EventEmitter<Stat>;

  private getTrendIcon(trend?: string): string {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  }

  private formatChange(change?: number): string {
    if (change === undefined) return '';
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  }

  private renderSparkline(data?: number[]) {
    if (!data || data.length < 2) return null;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 60;
    const height = 24;
    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg class="erx-stats__sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke="currentColor" stroke-width="1.5" />
      </svg>
    );
  }

  render() {
    const { stats, config, size } = this;
    const columns = config.columns || 4;

    return (
      <div
        class={{
          'erx-stats': true,
          [`erx-stats--${size}`]: true,
        }}
        style={{ '--columns': columns.toString() }}
        part="container"
      >
        {stats.map(stat => (
          <div
            class={{
              'erx-stats__item': true,
              [`erx-stats__item--${stat.trend || 'stable'}`]: true,
            }}
            style={{ '--stat-color': stat.color }}
            key={stat.id}
            onClick={() => this.erxSelect.emit(stat)}
            part="item"
          >
            {stat.icon && <span class="erx-stats__icon">{stat.icon}</span>}

            <div class="erx-stats__content">
              <span class="erx-stats__label">{stat.label}</span>

              <div class="erx-stats__value-row">
                <span class="erx-stats__value">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </span>

                {config.showTrend !== false && stat.change !== undefined && (
                  <span class={`erx-stats__change erx-stats__change--${stat.trend || 'stable'}`}>
                    <span class="erx-stats__trend-icon">{this.getTrendIcon(stat.trend)}</span>
                    {this.formatChange(stat.change)}
                  </span>
                )}
              </div>

              {stat.description && (
                <span class="erx-stats__description">{stat.description}</span>
              )}
            </div>

            {config.showSparkline && stat.sparkline && (
              <div class="erx-stats__sparkline-wrapper">
                {this.renderSparkline(stat.sparkline)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
