import { Component, Prop, State, Event, EventEmitter, h, Element } from '@stencil/core';
import { PanelConfig, ResizablePanelsConfig, PanelResizeDetail, PanelCollapseDetail } from './erx-resizable-panels.types';

@Component({
  tag: 'erx-resizable-panels',
  styleUrl: 'erx-resizable-panels.css',
  shadow: true,
})
export class ErxResizablePanels {
  @Element() el!: HTMLElement;

  @Prop() config!: ResizablePanelsConfig;

  @State() sizes: Record<string, number> = {};
  @State() collapsedPanels: Set<string> = new Set();
  @State() resizingIndex: number | null = null;

  @Event() erxResize!: EventEmitter<PanelResizeDetail>;
  @Event() erxCollapse!: EventEmitter<PanelCollapseDetail>;

  componentWillLoad() {
    this.initializeSizes();
  }

  private initializeSizes() {
    const totalDefault = this.config.panels.reduce((sum, p) => sum + (p.defaultSize || 0), 0);
    const remaining = 100 - totalDefault;
    const panelsWithoutSize = this.config.panels.filter(p => !p.defaultSize).length;
    const defaultShare = panelsWithoutSize > 0 ? remaining / panelsWithoutSize : 0;

    this.config.panels.forEach(panel => {
      this.sizes[panel.id] = panel.defaultSize || defaultShare;
      if (panel.collapsed) this.collapsedPanels.add(panel.id);
    });
  }

  private get handleSize(): number {
    return this.config.handleSize ?? 8;
  }

  private handleResizeStart(index: number, e: MouseEvent) {
    e.preventDefault();
    this.resizingIndex = index;

    const containerRect = this.el.getBoundingClientRect();
    const isHorizontal = this.config.direction === 'horizontal';
    const containerSize = isHorizontal ? containerRect.width : containerRect.height;

    const panel1 = this.config.panels[index];
    const panel2 = this.config.panels[index + 1];
    const startSize1 = this.sizes[panel1.id];
    const startSize2 = this.sizes[panel2.id];
    const startPos = isHorizontal ? e.clientX : e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = isHorizontal ? e.clientX : e.clientY;
      const delta = ((currentPos - startPos) / containerSize) * 100;

      let newSize1 = startSize1 + delta;
      let newSize2 = startSize2 - delta;

      // Apply constraints
      if (panel1.minSize) newSize1 = Math.max(newSize1, panel1.minSize);
      if (panel1.maxSize) newSize1 = Math.min(newSize1, panel1.maxSize);
      if (panel2.minSize) newSize2 = Math.max(newSize2, panel2.minSize);
      if (panel2.maxSize) newSize2 = Math.min(newSize2, panel2.maxSize);

      // Recalculate with constraints
      const totalNewSize = newSize1 + newSize2;
      const totalOriginalSize = startSize1 + startSize2;
      if (Math.abs(totalNewSize - totalOriginalSize) < 0.1) {
        this.sizes = {
          ...this.sizes,
          [panel1.id]: newSize1,
          [panel2.id]: newSize2,
        };

        this.erxResize.emit({
          panelId: panel1.id,
          size: newSize1,
          sizes: { ...this.sizes },
        });
      }
    };

    const handleMouseUp = () => {
      this.resizingIndex = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  private toggleCollapse(panel: PanelConfig) {
    if (!panel.collapsible) return;

    const newCollapsed = new Set(this.collapsedPanels);
    const isCollapsed = newCollapsed.has(panel.id);

    if (isCollapsed) {
      newCollapsed.delete(panel.id);
    } else {
      newCollapsed.add(panel.id);
    }

    this.collapsedPanels = newCollapsed;
    this.erxCollapse.emit({ panelId: panel.id, collapsed: !isCollapsed });
  }

  render() {
    const { config } = this;
    const isHorizontal = config.direction === 'horizontal';

    return (
      <div
        class={{
          'erx-panels': true,
          [`erx-panels--${config.direction}`]: true,
          'erx-panels--resizing': this.resizingIndex !== null,
        }}
        part="container"
      >
        {config.panels.map((panel, index) => {
          const isCollapsed = this.collapsedPanels.has(panel.id);
          const size = isCollapsed ? 0 : this.sizes[panel.id];

          return [
            <div
              class={{
                'erx-panels__panel': true,
                'erx-panels__panel--collapsed': isCollapsed,
              }}
              style={{
                [isHorizontal ? 'width' : 'height']: isCollapsed ? '32px' : `${size}%`,
                flexGrow: isCollapsed ? '0' : undefined,
                flexShrink: isCollapsed ? '0' : undefined,
              }}
              key={panel.id}
              part="panel"
            >
              {panel.collapsible && (
                <button
                  class="erx-panels__collapse-btn"
                  onClick={() => this.toggleCollapse(panel)}
                >
                  {isCollapsed ? (isHorizontal ? '▶' : '▼') : (isHorizontal ? '◀' : '▲')}
                </button>
              )}
              {!isCollapsed && (
                <div class="erx-panels__content">
                  <slot name={panel.id}></slot>
                </div>
              )}
            </div>,

            index < config.panels.length - 1 && !isCollapsed && !this.collapsedPanels.has(config.panels[index + 1].id) && (
              <div
                class="erx-panels__handle"
                style={{
                  [isHorizontal ? 'width' : 'height']: `${this.handleSize}px`,
                }}
                onMouseDown={(e) => this.handleResizeStart(index, e)}
                part="handle"
              >
                <div class="erx-panels__handle-bar"></div>
              </div>
            ),
          ];
        })}
      </div>
    );
  }
}
