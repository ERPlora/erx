import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import { Machine, MachineActionDetail } from './erx-machine-status.types';

@Component({
  tag: 'erx-machine-status',
  styleUrl: 'erx-machine-status.css',
  shadow: true,
})
export class ErxMachineStatus {
  @Prop() machine!: Machine;
  @Prop() showMetrics = true;
  @Prop() showAlerts = true;
  @Prop() showActions = true;
  @Prop() compact = false;

  @Event() erxAction!: EventEmitter<MachineActionDetail>;
  @Event() erxSelect!: EventEmitter<Machine>;

  private getStateLabel(): string {
    const labels: Record<string, string> = {
      'running': 'Running',
      'idle': 'Idle',
      'maintenance': 'Maintenance',
      'error': 'Error',
      'offline': 'Offline',
    };
    return labels[this.machine.state] || 'Unknown';
  }

  private handleAction(action: MachineActionDetail['action'], e: Event) {
    e.stopPropagation();
    this.erxAction.emit({ action, machine: this.machine });
  }

  private handleSelect = () => {
    this.erxSelect.emit(this.machine);
  };

  render() {
    const { machine, showMetrics, showAlerts, showActions, compact } = this;

    return (
      <div
        class={{
          'erx-machine': true,
          [`erx-machine--${machine.state}`]: true,
          'erx-machine--compact': compact,
        }}
        onClick={this.handleSelect}
        part="container"
      >
        <div class="erx-machine__header" part="header">
          <div class="erx-machine__status">
            <span class="erx-machine__state-indicator"></span>
            <span class="erx-machine__state-label">{this.getStateLabel()}</span>
          </div>
          {machine.efficiency !== undefined && (
            <div class="erx-machine__oee">
              <span class="erx-machine__oee-label">OEE</span>
              <span class="erx-machine__oee-value">{machine.efficiency}%</span>
            </div>
          )}
        </div>

        <div class="erx-machine__info" part="info">
          {machine.image && (
            <img src={machine.image} alt={machine.name} class="erx-machine__image" />
          )}
          <div class="erx-machine__details">
            <span class="erx-machine__name">{machine.name}</span>
            {machine.code && <span class="erx-machine__code">{machine.code}</span>}
          </div>
        </div>

        {machine.currentJob && (
          <div class="erx-machine__job" part="job">
            <div class="erx-machine__job-header">
              <span class="erx-machine__job-label">Current Job</span>
              {machine.currentJob.eta && (
                <span class="erx-machine__job-eta">ETA: {machine.currentJob.eta}</span>
              )}
            </div>
            <span class="erx-machine__job-name">{machine.currentJob.name}</span>
            <div class="erx-machine__job-progress">
              <div
                class="erx-machine__job-fill"
                style={{ width: `${machine.currentJob.progress}%` }}
              ></div>
            </div>
            <span class="erx-machine__job-percent">{machine.currentJob.progress}%</span>
          </div>
        )}

        {!compact && showMetrics && machine.metrics && machine.metrics.length > 0 && (
          <div class="erx-machine__metrics" part="metrics">
            {machine.metrics.map(metric => (
              <div
                class={{
                  'erx-machine__metric': true,
                  [`erx-machine__metric--${metric.status || 'normal'}`]: true,
                }}
                key={metric.label}
              >
                <span class="erx-machine__metric-value">
                  {metric.value}
                  {metric.unit && <span class="erx-machine__metric-unit">{metric.unit}</span>}
                </span>
                <span class="erx-machine__metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        )}

        {!compact && showAlerts && machine.alerts && machine.alerts.length > 0 && (
          <div class="erx-machine__alerts" part="alerts">
            {machine.alerts.slice(0, 3).map(alert => (
              <div class={`erx-machine__alert erx-machine__alert--${alert.type}`} key={alert.id}>
                <span class="erx-machine__alert-icon">
                  {alert.type === 'error' ? '❌' : alert.type === 'warning' ? '⚠️' : 'ℹ️'}
                </span>
                <span class="erx-machine__alert-msg">{alert.message}</span>
              </div>
            ))}
          </div>
        )}

        {!compact && machine.operator && (
          <div class="erx-machine__operator" part="operator">
            {machine.operator.avatar ? (
              <img src={machine.operator.avatar} alt="" class="erx-machine__operator-avatar" />
            ) : (
              <span class="erx-machine__operator-avatar">
                {machine.operator.name.charAt(0).toUpperCase()}
              </span>
            )}
            <span class="erx-machine__operator-name">{machine.operator.name}</span>
          </div>
        )}

        {showActions && (
          <div class="erx-machine__actions" part="actions">
            {machine.state === 'idle' && (
              <button
                class="erx-machine__btn erx-machine__btn--start"
                onClick={(e) => this.handleAction('start', e)}
              >
                Start
              </button>
            )}
            {machine.state === 'running' && (
              <button
                class="erx-machine__btn erx-machine__btn--stop"
                onClick={(e) => this.handleAction('stop', e)}
              >
                Stop
              </button>
            )}
            <button
              class="erx-machine__btn erx-machine__btn--maintenance"
              onClick={(e) => this.handleAction('maintenance', e)}
            >
              🔧
            </button>
            <button
              class="erx-machine__btn erx-machine__btn--details"
              onClick={(e) => this.handleAction('details', e)}
            >
              ⋯
            </button>
          </div>
        )}
      </div>
    );
  }
}
