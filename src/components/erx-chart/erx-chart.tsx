import { Component, Prop, State, h, Element } from '@stencil/core';
import { ChartData, ChartConfig } from './erx-chart.types';

@Component({
  tag: 'erx-chart',
  styleUrl: 'erx-chart.css',
  shadow: true,
})
export class ErxChart {
  @Element() el!: HTMLElement;

  @Prop() data!: ChartData;
  @Prop() config: ChartConfig = { type: 'bar' };
  @Prop() height = 300;

  @State() tooltip: { x: number; y: number; content: string } | null = null;

  private getDefaultColors(): string[] {
    return [
      '#667eea', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
      '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1',
    ];
  }

  private renderBarChart() {
    const { data, config } = this;
    const colors = this.getDefaultColors();
    const maxValue = Math.max(...data.datasets.flatMap(d => d.data));
    const barWidth = 100 / (data.labels.length * data.datasets.length + data.labels.length);
    const groupWidth = barWidth * data.datasets.length;

    return (
      <svg class="erx-chart__svg" viewBox={`0 0 100 100`} preserveAspectRatio="none">
        {config.showGrid !== false && (
          <g class="erx-chart__grid">
            {[0, 25, 50, 75, 100].map(y => (
              <line key={y} x1="0" y1={100 - y} x2="100" y2={100 - y} stroke="var(--erx-border-color, #e5e7eb)" stroke-width="0.2" />
            ))}
          </g>
        )}
        {data.datasets.map((dataset, datasetIndex) => (
          <g key={dataset.label}>
            {dataset.data.map((value, index) => {
              const height = (value / maxValue) * 90;
              const x = (index / data.labels.length) * 100 + barWidth * datasetIndex + barWidth / 2;
              const color = dataset.color || colors[datasetIndex % colors.length];
              return (
                <rect
                  key={index}
                  x={x}
                  y={100 - height - 5}
                  width={barWidth * 0.8}
                  height={height}
                  fill={color}
                  rx="0.5"
                  class="erx-chart__bar"
                />
              );
            })}
          </g>
        ))}
      </svg>
    );
  }

  private renderLineChart() {
    const { data, config } = this;
    const colors = this.getDefaultColors();
    const maxValue = Math.max(...data.datasets.flatMap(d => d.data));

    return (
      <svg class="erx-chart__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {config.showGrid !== false && (
          <g class="erx-chart__grid">
            {[0, 25, 50, 75, 100].map(y => (
              <line key={y} x1="0" y1={100 - y} x2="100" y2={100 - y} stroke="var(--erx-border-color, #e5e7eb)" stroke-width="0.2" />
            ))}
          </g>
        )}
        {data.datasets.map((dataset, datasetIndex) => {
          const points = dataset.data.map((value, index) => {
            const x = (index / (dataset.data.length - 1)) * 100;
            const y = 100 - (value / maxValue) * 90 - 5;
            return `${x},${y}`;
          }).join(' ');

          const color = dataset.color || colors[datasetIndex % colors.length];

          return (
            <g key={dataset.label}>
              {(config.type === 'area' || dataset.fill) && (
                <polygon
                  points={`0,95 ${points} 100,95`}
                  fill={color}
                  fill-opacity="0.1"
                />
              )}
              <polyline
                points={points}
                fill="none"
                stroke={color}
                stroke-width="0.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="erx-chart__line"
              />
              {dataset.data.map((value, index) => {
                const x = (index / (dataset.data.length - 1)) * 100;
                const y = 100 - (value / maxValue) * 90 - 5;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="1"
                    fill={color}
                    class="erx-chart__point"
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    );
  }

  private renderPieChart() {
    const { data, config } = this;
    const colors = this.getDefaultColors();
    const dataset = data.datasets[0];
    if (!dataset) return null;

    const total = dataset.data.reduce((a, b) => a + b, 0);
    let currentAngle = -90;
    const isDoughnut = config.type === 'doughnut';

    return (
      <svg class="erx-chart__svg erx-chart__svg--pie" viewBox="-50 -50 100 100">
        {dataset.data.map((value, index) => {
          const percentage = value / total;
          const angle = percentage * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          currentAngle = endAngle;

          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;

          const radius = 40;
          const innerRadius = isDoughnut ? 25 : 0;

          const x1 = Math.cos(startRad) * radius;
          const y1 = Math.sin(startRad) * radius;
          const x2 = Math.cos(endRad) * radius;
          const y2 = Math.sin(endRad) * radius;

          const largeArc = angle > 180 ? 1 : 0;

          let d: string;
          if (isDoughnut) {
            const ix1 = Math.cos(startRad) * innerRadius;
            const iy1 = Math.sin(startRad) * innerRadius;
            const ix2 = Math.cos(endRad) * innerRadius;
            const iy2 = Math.sin(endRad) * innerRadius;
            d = `M ${ix1} ${iy1} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1}`;
          } else {
            d = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
          }

          return (
            <path
              key={index}
              d={d}
              fill={colors[index % colors.length]}
              class="erx-chart__slice"
            />
          );
        })}
      </svg>
    );
  }

  private renderLegend() {
    const { data, config } = this;
    if (config.showLegend === false) return null;

    const colors = this.getDefaultColors();
    const items = config.type === 'pie' || config.type === 'doughnut'
      ? data.labels.map((label, i) => ({ label, color: colors[i % colors.length] }))
      : data.datasets.map((d, i) => ({ label: d.label, color: d.color || colors[i % colors.length] }));

    return (
      <div class="erx-chart__legend" part="legend">
        {items.map(item => (
          <div class="erx-chart__legend-item" key={item.label}>
            <span class="erx-chart__legend-color" style={{ background: item.color }}></span>
            <span class="erx-chart__legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { config, height } = this;

    return (
      <div class="erx-chart" part="container">
        <div class="erx-chart__canvas" style={{ height: `${height}px` }} part="canvas">
          {(config.type === 'bar') && this.renderBarChart()}
          {(config.type === 'line' || config.type === 'area') && this.renderLineChart()}
          {(config.type === 'pie' || config.type === 'doughnut') && this.renderPieChart()}
        </div>

        {(config.type !== 'pie' && config.type !== 'doughnut') && (
          <div class="erx-chart__labels" part="labels">
            {this.data.labels.map(label => (
              <span class="erx-chart__label" key={label}>{label}</span>
            ))}
          </div>
        )}

        {this.renderLegend()}
      </div>
    );
  }
}
