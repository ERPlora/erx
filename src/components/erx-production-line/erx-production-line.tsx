import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { ProductionLine, ProductionLineSelectDetail, ProductionStation } from './erx-production-line.types';

@Component({
  tag: 'erx-production-line',
  styleUrl: 'erx-production-line.css',
  shadow: true,
})
export class ErxProductionLine {
  @Prop() line!: ProductionLine;
  @Prop() showStats = true;
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  @Event() erxSelect!: EventEmitter<ProductionLineSelectDetail>;

  private getStatusColor(status: ProductionStation['status']): string {
    const colors: Record<string, string> = {
      'active': 'var(--erx-color-success, #10b981)',
      'idle': 'var(--erx-color-warning, #f59e0b)',
      'blocked': 'var(--erx-color-danger, #ef4444)',
      'error': 'var(--erx-color-danger, #ef4444)',
    };
    return colors[status] || 'var(--erx-text-tertiary, #9ca3af)';
  }

  private handleStationSelect(station: ProductionStation) {
    this.erxSelect.emit({ station, line: this.line });
  }

  render() {
    const { line, showStats, orientation } = this;
    const defectRate = line.produced > 0 ? ((line.defects / line.produced) * 100).toFixed(1) : '0';

    return (
      <div
        class={{
          'erx-line': true,
          [`erx-line--${line.status}`]: true,
          [`erx-line--${orientation}`]: true,
        }}
        part="container"
      >
        <div class="erx-line__header" part="header">
          <div class="erx-line__info">
            <span class="erx-line__status-dot"></span>
            <span class="erx-line__name">{line.name}</span>
          </div>
          {line.currentProduct && (
            <div class="erx-line__product">
              {line.currentProduct.image && (
                <img src={line.currentProduct.image} alt="" class="erx-line__product-img" />
              )}
              <span class="erx-line__product-name">{line.currentProduct.name}</span>
            </div>
          )}
        </div>

        {showStats && (
          <div class="erx-line__stats" part="stats">
            <div class="erx-line__stat">
              <span class="erx-line__stat-value">{line.produced}</span>
              <span class="erx-line__stat-label">Produced</span>
            </div>
            <div class="erx-line__stat">
              <span class="erx-line__stat-value">{line.target}</span>
              <span class="erx-line__stat-label">Target</span>
            </div>
            <div class="erx-line__stat">
              <span class="erx-line__stat-value erx-line__stat-value--efficiency">{line.efficiency}%</span>
              <span class="erx-line__stat-label">Efficiency</span>
            </div>
            <div class="erx-line__stat">
              <span class="erx-line__stat-value erx-line__stat-value--defects">{defectRate}%</span>
              <span class="erx-line__stat-label">Defect Rate</span>
            </div>
          </div>
        )}

        <div class="erx-line__progress" part="progress">
          <div
            class="erx-line__progress-fill"
            style={{ width: `${Math.min((line.produced / line.target) * 100, 100)}%` }}
          ></div>
        </div>

        <div class="erx-line__stations" part="stations">
          {line.stations.map((station, index) => (
            <div class="erx-line__station-wrapper" key={station.id}>
              <div
                class={{
                  'erx-line__station': true,
                  [`erx-line__station--${station.status}`]: true,
                }}
                onClick={() => this.handleStationSelect(station)}
              >
                <div class="erx-line__station-header">
                  <span
                    class="erx-line__station-indicator"
                    style={{ background: this.getStatusColor(station.status) }}
                  ></span>
                  <span class="erx-line__station-name">{station.name}</span>
                </div>

                {station.currentItem && (
                  <div class="erx-line__station-item">
                    <span class="erx-line__item-name">{station.currentItem.name}</span>
                    <div class="erx-line__item-progress">
                      <div
                        class="erx-line__item-fill"
                        style={{ width: `${station.currentItem.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div class="erx-line__station-metrics">
                  {station.cycleTime && (
                    <span class="erx-line__metric">⏱ {station.cycleTime}s</span>
                  )}
                  {station.throughput && (
                    <span class="erx-line__metric">📦 {station.throughput}/h</span>
                  )}
                </div>

                {station.operator && (
                  <div class="erx-line__station-operator">
                    {station.operator.avatar ? (
                      <img src={station.operator.avatar} alt="" class="erx-line__operator-avatar" />
                    ) : (
                      <span class="erx-line__operator-avatar">
                        {station.operator.name.charAt(0)}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {index < line.stations.length - 1 && (
                <div class="erx-line__connector">
                  <div class="erx-line__connector-line"></div>
                  <div class="erx-line__connector-arrow">→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
