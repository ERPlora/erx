import { Component, Prop, State, Event, EventEmitter, h, Element } from '@stencil/core';
import { DashboardWidget, DashboardGridConfig, DashboardLayoutChangeDetail, DashboardWidgetSelectDetail } from './erx-dashboard-grid.types';

@Component({
  tag: 'erx-dashboard-grid',
  styleUrl: 'erx-dashboard-grid.css',
  shadow: true,
})
export class ErxDashboardGrid {
  @Element() el!: HTMLElement;

  @Prop({ mutable: true }) widgets: DashboardWidget[] = [];
  @Prop() config: DashboardGridConfig = { columns: 12, rowHeight: 80 };

  @State() draggingWidget: string | null = null;
  @State() resizingWidget: string | null = null;

  @Event() erxLayoutChange!: EventEmitter<DashboardLayoutChangeDetail>;
  @Event() erxWidgetSelect!: EventEmitter<DashboardWidgetSelectDetail>;

  private get gap(): number {
    return this.config.gap ?? 12;
  }

  private get margin(): number {
    return this.config.margin ?? 12;
  }

  private getWidgetStyle(widget: DashboardWidget): Record<string, string> {
    return {
      gridColumn: `${widget.x + 1} / span ${widget.width}`,
      gridRow: `${widget.y + 1} / span ${widget.height}`,
      minHeight: `${widget.height * this.config.rowHeight + (widget.height - 1) * this.gap}px`,
    };
  }

  private handleWidgetClick(widget: DashboardWidget) {
    this.erxWidgetSelect.emit({ widget });
  }

  private handleDragStart(widget: DashboardWidget, e: DragEvent) {
    if (!this.config.draggable || widget.locked) return;
    this.draggingWidget = widget.id;
    e.dataTransfer?.setData('text/plain', widget.id);
  }

  private handleDragEnd() {
    this.draggingWidget = null;
  }

  render() {
    const { widgets, config } = this;

    return (
      <div
        class={{
          'erx-dash': true,
          'erx-dash--dragging': !!this.draggingWidget,
        }}
        style={{
          '--columns': config.columns.toString(),
          '--row-height': `${config.rowHeight}px`,
          '--gap': `${this.gap}px`,
          '--margin': `${this.margin}px`,
        }}
        part="container"
      >
        <div class="erx-dash__grid" part="grid">
          {widgets.map(widget => (
            <div
              class={{
                'erx-dash__widget': true,
                'erx-dash__widget--dragging': this.draggingWidget === widget.id,
                'erx-dash__widget--locked': !!widget.locked,
              }}
              style={this.getWidgetStyle(widget)}
              key={widget.id}
              draggable={config.draggable && !widget.locked}
              onDragStart={(e) => this.handleDragStart(widget, e)}
              onDragEnd={() => this.handleDragEnd()}
              onClick={() => this.handleWidgetClick(widget)}
              part="widget"
            >
              {widget.title && (
                <div class="erx-dash__widget-header" part="widget-header">
                  <span class="erx-dash__widget-title">{widget.title}</span>
                  {config.draggable && !widget.locked && (
                    <span class="erx-dash__widget-drag">⋮⋮</span>
                  )}
                </div>
              )}
              <div class="erx-dash__widget-content" part="widget-content">
                <slot name={widget.id}></slot>
              </div>
              {config.resizable && !widget.locked && (
                <div class="erx-dash__widget-resize">⌟</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
