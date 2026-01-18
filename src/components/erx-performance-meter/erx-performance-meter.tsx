import { Component, Prop, h, Element } from '@stencil/core';
import type { ErxPerformanceData } from './erx-performance-meter.types';

@Component({
  tag: 'erx-performance-meter',
  styleUrl: 'erx-performance-meter.css',
  shadow: true,
})
export class ErxPerformanceMeter {
  @Element() el!: HTMLElement;

  @Prop() data!: ErxPerformanceData;
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  @Prop() showCategories = true;
  @Prop() showTrend = true;
  @Prop() animated = true;

  private getScoreColor(score: number, max: number): string {
    const percent = (score / max) * 100;
    if (percent >= 80) return 'var(--erx-color-success, #10b981)';
    if (percent >= 60) return 'var(--erx-color-primary, #667eea)';
    if (percent >= 40) return 'var(--erx-color-warning, #f59e0b)';
    return 'var(--erx-color-danger, #ef4444)';
  }

  private getScoreLabel(score: number, max: number): string {
    const percent = (score / max) * 100;
    if (percent >= 80) return 'Excellent';
    if (percent >= 60) return 'Good';
    if (percent >= 40) return 'Fair';
    return 'Needs Improvement';
  }

  private renderGauge() {
    const { overallScore, maxScore = 100 } = this.data;
    const percent = Math.min(100, (overallScore / maxScore) * 100);
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div class="erx-perf__gauge" part="gauge">
        <svg viewBox="0 0 100 100" class="erx-perf__svg">
          <circle class="erx-perf__track" cx="50" cy="50" r="45" fill="none" stroke-width="8" />
          <circle
            class="erx-perf__fill"
            cx="50" cy="50" r="45"
            fill="none" stroke-width="8"
            stroke={this.getScoreColor(overallScore, maxScore)}
            stroke-dasharray={circumference}
            stroke-dashoffset={this.animated ? offset : circumference}
            transform="rotate(-90 50 50)"
            style={{ transition: this.animated ? 'stroke-dashoffset 1s ease-out' : 'none' }}
          />
        </svg>
        <div class="erx-perf__score">
          <span class="erx-perf__score-value">{Math.round(overallScore)}</span>
          <span class="erx-perf__score-max">/ {maxScore}</span>
        </div>
      </div>
    );
  }

  render() {
    const { data } = this;
    const maxScore = data.maxScore || 100;

    return (
      <div class={{ 'erx-perf': true, [`erx-perf--${this.size}`]: true }} part="container">
        {data.employeeName && <div class="erx-perf__name">{data.employeeName}</div>}
        {data.period && <div class="erx-perf__period">{data.period}</div>}

        {this.renderGauge()}

        <div class="erx-perf__label">{this.getScoreLabel(data.overallScore, maxScore)}</div>

        {this.showTrend && data.trend && (
          <div class={`erx-perf__trend erx-perf__trend--${data.trend}`}>
            {data.trend === 'up' ? '↑' : data.trend === 'down' ? '↓' : '→'}
            {data.trendValue !== undefined && ` ${data.trendValue > 0 ? '+' : ''}${data.trendValue}%`}
          </div>
        )}

        {this.showCategories && data.categories && data.categories.length > 0 && (
          <div class="erx-perf__categories" part="categories">
            {data.categories.map(cat => (
              <div class="erx-perf__category" key={cat.id}>
                <div class="erx-perf__cat-header">
                  <span class="erx-perf__cat-name">{cat.name}</span>
                  <span class="erx-perf__cat-score">{cat.score}/{cat.maxScore || 100}</span>
                </div>
                <div class="erx-perf__cat-bar">
                  <div
                    class="erx-perf__cat-fill"
                    style={{
                      width: `${(cat.score / (cat.maxScore || 100)) * 100}%`,
                      background: this.getScoreColor(cat.score, cat.maxScore || 100),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
