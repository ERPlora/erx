import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { ProgressStep, ProgressStepsConfig, ProgressStepSelectDetail } from './erx-progress-steps.types';

@Component({
  tag: 'erx-progress-steps',
  styleUrl: 'erx-progress-steps.css',
  shadow: true,
})
export class ErxProgressSteps {
  @Prop() steps: ProgressStep[] = [];
  @Prop() config: ProgressStepsConfig = {};

  @Event() erxSelect!: EventEmitter<ProgressStepSelectDetail>;

  private getStatusIcon(status: ProgressStep['status']): string {
    switch (status) {
      case 'completed': return '✓';
      case 'current': return '●';
      case 'error': return '!';
      default: return '○';
    }
  }

  private formatTimestamp(timestamp?: string): string {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleString();
  }

  private handleStepClick(step: ProgressStep, index: number) {
    if (this.config.clickable) {
      this.erxSelect.emit({ step, index });
    }
  }

  render() {
    const { steps, config } = this;
    const orientation = config.orientation || 'horizontal';
    const size = config.size || 'md';

    return (
      <div
        class={{
          'erx-steps': true,
          [`erx-steps--${orientation}`]: true,
          [`erx-steps--${size}`]: true,
          'erx-steps--clickable': !!config.clickable,
        }}
        part="container"
      >
        {steps.map((step, index) => (
          <div
            class={{
              'erx-steps__item': true,
              [`erx-steps__item--${step.status}`]: true,
            }}
            key={step.id}
            onClick={() => this.handleStepClick(step, index)}
          >
            <div class="erx-steps__indicator">
              {step.icon ? (
                <span class="erx-steps__icon">{step.icon}</span>
              ) : config.showNumbers ? (
                <span class="erx-steps__number">{index + 1}</span>
              ) : (
                <span class="erx-steps__status-icon">{this.getStatusIcon(step.status)}</span>
              )}
            </div>

            <div class="erx-steps__content">
              <span class="erx-steps__label">{step.label}</span>
              {step.description && (
                <span class="erx-steps__description">{step.description}</span>
              )}
              {config.showTimestamps && step.timestamp && (
                <span class="erx-steps__timestamp">{this.formatTimestamp(step.timestamp)}</span>
              )}
            </div>

            {index < steps.length - 1 && (
              <div class={{
                'erx-steps__connector': true,
                'erx-steps__connector--completed': step.status === 'completed',
              }}></div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
