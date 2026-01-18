import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';
import { GanttTask, GanttConfig, GanttSelectDetail, GanttUpdateDetail, GanttViewMode } from './erx-gantt.types';

@Component({
  tag: 'erx-gantt',
  styleUrl: 'erx-gantt.css',
  shadow: true,
})
export class ErxGantt {
  @Prop() tasks: GanttTask[] = [];
  @Prop() config: GanttConfig = { viewMode: 'week' };
  @Prop() disabled = false;

  @State() viewStart: Date = new Date();
  @State() collapsedTasks: Set<string> = new Set();

  @Event() erxSelect!: EventEmitter<GanttSelectDetail>;
  @Event() erxUpdate!: EventEmitter<GanttUpdateDetail>;
  @Event() erxViewChange!: EventEmitter<{ viewMode: GanttViewMode; startDate: Date }>;

  componentWillLoad() {
    if (this.config.startDate) {
      this.viewStart = new Date(this.config.startDate);
    } else {
      this.viewStart = this.getEarliestDate();
    }
  }

  private getEarliestDate(): Date {
    if (this.tasks.length === 0) return new Date();
    const dates = this.tasks.map(t => new Date(t.start).getTime());
    return new Date(Math.min(...dates));
  }

  private getColumns(): Date[] {
    const columns: Date[] = [];
    const start = new Date(this.viewStart);
    start.setHours(0, 0, 0, 0);

    const count = this.config.viewMode === 'day' ? 14 :
                  this.config.viewMode === 'week' ? 12 :
                  this.config.viewMode === 'month' ? 12 : 8;

    for (let i = 0; i < count; i++) {
      columns.push(new Date(start));
      if (this.config.viewMode === 'day') {
        start.setDate(start.getDate() + 1);
      } else if (this.config.viewMode === 'week') {
        start.setDate(start.getDate() + 7);
      } else if (this.config.viewMode === 'month') {
        start.setMonth(start.getMonth() + 1);
      } else {
        start.setMonth(start.getMonth() + 3);
      }
    }
    return columns;
  }

  private formatColumnHeader(date: Date): string {
    if (this.config.viewMode === 'day') {
      return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
    } else if (this.config.viewMode === 'week') {
      return `W${this.getWeekNumber(date)}`;
    } else if (this.config.viewMode === 'month') {
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    } else {
      return `Q${Math.floor(date.getMonth() / 3) + 1} ${date.getFullYear()}`;
    }
  }

  private getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  private getTaskPosition(task: GanttTask): { left: string; width: string } {
    const columns = this.getColumns();
    if (columns.length === 0) return { left: '0%', width: '0%' };

    const startDate = new Date(task.start);
    const endDate = new Date(task.end);
    const viewStartTime = columns[0].getTime();
    const viewEndTime = columns[columns.length - 1].getTime();
    const totalDuration = viewEndTime - viewStartTime;

    if (totalDuration === 0) return { left: '0%', width: '100%' };

    const taskStart = Math.max(startDate.getTime(), viewStartTime);
    const taskEnd = Math.min(endDate.getTime(), viewEndTime);

    const left = ((taskStart - viewStartTime) / totalDuration) * 100;
    const width = ((taskEnd - taskStart) / totalDuration) * 100;

    return {
      left: `${Math.max(0, left)}%`,
      width: `${Math.max(2, width)}%`,
    };
  }

  private getStatusColor(status?: GanttTask['status']): string {
    const colors: Record<string, string> = {
      'pending': 'var(--erx-text-tertiary, #9ca3af)',
      'in-progress': 'var(--erx-color-primary, #667eea)',
      'completed': 'var(--erx-color-success, #10b981)',
      'delayed': 'var(--erx-color-danger, #ef4444)',
      'cancelled': 'var(--erx-text-tertiary, #9ca3af)',
    };
    return colors[status || 'pending'] || colors['pending'];
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  private handleTaskSelect(task: GanttTask) {
    this.erxSelect.emit({ task });
  }

  private toggleTask(taskId: string, e: Event) {
    e.stopPropagation();
    const newCollapsed = new Set(this.collapsedTasks);
    if (newCollapsed.has(taskId)) {
      newCollapsed.delete(taskId);
    } else {
      newCollapsed.add(taskId);
    }
    this.collapsedTasks = newCollapsed;
  }

  private navigate(direction: 'prev' | 'next') {
    const newStart = new Date(this.viewStart);
    const amount = this.config.viewMode === 'day' ? 7 :
                   this.config.viewMode === 'week' ? 4 :
                   this.config.viewMode === 'month' ? 3 : 1;

    if (this.config.viewMode === 'day') {
      newStart.setDate(newStart.getDate() + (direction === 'next' ? amount : -amount));
    } else if (this.config.viewMode === 'week') {
      newStart.setDate(newStart.getDate() + (direction === 'next' ? amount * 7 : -amount * 7));
    } else if (this.config.viewMode === 'month') {
      newStart.setMonth(newStart.getMonth() + (direction === 'next' ? amount : -amount));
    } else {
      newStart.setMonth(newStart.getMonth() + (direction === 'next' ? amount * 3 : -amount * 3));
    }

    this.viewStart = newStart;
    this.erxViewChange.emit({ viewMode: this.config.viewMode, startDate: newStart });
  }

  private renderTask(task: GanttTask, level: number = 0): any {
    const hasChildren = task.children && task.children.length > 0;
    const isCollapsed = this.collapsedTasks.has(task.id);
    const position = this.getTaskPosition(task);

    return [
      <div class="erx-gantt__row" key={task.id}>
        <div class="erx-gantt__task-cell" style={{ paddingLeft: `${level * 20 + 8}px` }}>
          {hasChildren && (
            <button class="erx-gantt__toggle" onClick={(e) => this.toggleTask(task.id, e)}>
              {isCollapsed ? '▶' : '▼'}
            </button>
          )}
          <span class="erx-gantt__task-name" onClick={() => this.handleTaskSelect(task)}>
            {task.name}
          </span>
          {task.assignee && (
            <span class="erx-gantt__assignee">
              {task.assignee.avatar ? (
                <img src={task.assignee.avatar} alt="" class="erx-gantt__assignee-avatar" />
              ) : (
                <span class="erx-gantt__assignee-initial">
                  {task.assignee.name.charAt(0)}
                </span>
              )}
            </span>
          )}
        </div>
        <div class="erx-gantt__bar-cell">
          <div class="erx-gantt__bar-container">
            {task.milestone ? (
              <div
                class="erx-gantt__milestone"
                style={{
                  left: position.left,
                  background: task.color || this.getStatusColor(task.status),
                }}
                onClick={() => this.handleTaskSelect(task)}
              >
                ◆
              </div>
            ) : (
              <div
                class={{
                  'erx-gantt__bar': true,
                  [`erx-gantt__bar--${task.status || 'pending'}`]: true,
                }}
                style={{
                  left: position.left,
                  width: position.width,
                  background: task.color || this.getStatusColor(task.status),
                }}
                onClick={() => this.handleTaskSelect(task)}
              >
                {this.config.showProgress && (
                  <div
                    class="erx-gantt__progress"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                )}
                <span class="erx-gantt__bar-label">{task.progress}%</span>
              </div>
            )}
          </div>
        </div>
      </div>,
      hasChildren && !isCollapsed &&
        task.children!.map(child => this.renderTask(child, level + 1)),
    ];
  }

  render() {
    const columns = this.getColumns();
    const today = new Date();

    return (
      <div
        class={{
          'erx-gantt': true,
          'erx-gantt--disabled': this.disabled,
        }}
        part="container"
      >
        <div class="erx-gantt__toolbar" part="toolbar">
          <div class="erx-gantt__nav">
            <button class="erx-gantt__nav-btn" onClick={() => this.navigate('prev')}>
              ←
            </button>
            <button class="erx-gantt__nav-btn" onClick={() => this.navigate('next')}>
              →
            </button>
          </div>
          <div class="erx-gantt__view-modes">
            {(['day', 'week', 'month', 'quarter'] as GanttViewMode[]).map(mode => (
              <button
                class={{
                  'erx-gantt__view-btn': true,
                  'erx-gantt__view-btn--active': this.config.viewMode === mode,
                }}
                onClick={() => {
                  this.config = { ...this.config, viewMode: mode };
                  this.erxViewChange.emit({ viewMode: mode, startDate: this.viewStart });
                }}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div class="erx-gantt__content" part="content">
          <div class="erx-gantt__header">
            <div class="erx-gantt__task-header">Task</div>
            <div class="erx-gantt__timeline-header">
              {columns.map(col => (
                <div
                  class={{
                    'erx-gantt__col-header': true,
                    'erx-gantt__col-header--today': this.config.viewMode === 'day' && this.isToday(col),
                  }}
                  key={col.getTime()}
                >
                  {this.formatColumnHeader(col)}
                </div>
              ))}
            </div>
          </div>

          <div class="erx-gantt__body" part="body">
            {this.tasks.length === 0 ? (
              <div class="erx-gantt__empty">No tasks to display</div>
            ) : (
              this.tasks.map(task => this.renderTask(task))
            )}
          </div>

          {this.config.showToday && (
            <div
              class="erx-gantt__today-line"
              style={{
                left: `calc(${((today.getTime() - columns[0].getTime()) / (columns[columns.length - 1].getTime() - columns[0].getTime())) * 100}% + 200px)`,
              }}
            ></div>
          )}
        </div>
      </div>
    );
  }
}
