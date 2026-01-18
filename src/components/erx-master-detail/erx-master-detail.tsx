import { Component, Prop, State, Event, EventEmitter, h, Element } from '@stencil/core';
import { MasterDetailConfig, MasterDetailItem, MasterDetailSelectDetail, MasterDetailResizeDetail } from './erx-master-detail.types';

@Component({
  tag: 'erx-master-detail',
  styleUrl: 'erx-master-detail.css',
  shadow: true,
})
export class ErxMasterDetail {
  @Element() el!: HTMLElement;

  @Prop() items: MasterDetailItem[] = [];
  @Prop() config: MasterDetailConfig = {};
  @Prop() selectedId?: string;

  @State() currentWidth: number = 300;
  @State() isCollapsed = false;
  @State() isResizing = false;

  @Event() erxSelect!: EventEmitter<MasterDetailSelectDetail>;
  @Event() erxResize!: EventEmitter<MasterDetailResizeDetail>;

  componentWillLoad() {
    if (this.config.masterWidth) {
      const match = this.config.masterWidth.match(/(\d+)/);
      if (match) this.currentWidth = parseInt(match[1]);
    }
  }

  private handleItemClick(item: MasterDetailItem) {
    const previousItem = this.items.find(i => i.id === this.selectedId);
    this.erxSelect.emit({ item, previousItem });
  }

  private handleResizeStart = (e: MouseEvent) => {
    if (!this.config.resizable) return;
    e.preventDefault();
    this.isResizing = true;

    const startX = e.clientX;
    const startWidth = this.currentWidth;
    const isRight = this.config.position === 'right';

    const handleMouseMove = (e: MouseEvent) => {
      const delta = isRight ? startX - e.clientX : e.clientX - startX;
      let newWidth = startWidth + delta;

      if (this.config.minMasterWidth) newWidth = Math.max(newWidth, this.config.minMasterWidth);
      if (this.config.maxMasterWidth) newWidth = Math.min(newWidth, this.config.maxMasterWidth);

      this.currentWidth = newWidth;
      this.erxResize.emit({ width: newWidth });
    };

    const handleMouseUp = () => {
      this.isResizing = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  private toggleCollapse = () => {
    if (this.config.collapsible) {
      this.isCollapsed = !this.isCollapsed;
    }
  };

  render() {
    const { items, config, selectedId } = this;
    const position = config.position || 'left';

    return (
      <div
        class={{
          'erx-md': true,
          [`erx-md--${position}`]: true,
          'erx-md--collapsed': this.isCollapsed,
          'erx-md--resizing': this.isResizing,
        }}
        part="container"
      >
        <div
          class="erx-md__master"
          style={{ width: this.isCollapsed ? '48px' : `${this.currentWidth}px` }}
          part="master"
        >
          {config.collapsible && (
            <button class="erx-md__collapse-btn" onClick={this.toggleCollapse}>
              {this.isCollapsed ? (position === 'left' ? '▶' : '◀') : (position === 'left' ? '◀' : '▶')}
            </button>
          )}

          {!this.isCollapsed && (
            <div class="erx-md__list" part="list">
              {items.map(item => (
                <div
                  class={{
                    'erx-md__item': true,
                    'erx-md__item--selected': item.id === selectedId,
                  }}
                  key={item.id}
                  onClick={() => this.handleItemClick(item)}
                >
                  {item.avatar && (
                    <img src={item.avatar} alt="" class="erx-md__item-avatar" />
                  )}
                  {item.icon && !item.avatar && (
                    <span class="erx-md__item-icon">{item.icon}</span>
                  )}
                  <div class="erx-md__item-content">
                    <span class="erx-md__item-title">{item.title}</span>
                    {item.subtitle && (
                      <span class="erx-md__item-subtitle">{item.subtitle}</span>
                    )}
                  </div>
                  {item.badge !== undefined && (
                    <span class="erx-md__item-badge">{item.badge}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {config.resizable && config.showDivider !== false && !this.isCollapsed && (
          <div
            class="erx-md__divider"
            onMouseDown={this.handleResizeStart}
            part="divider"
          ></div>
        )}

        <div class="erx-md__detail" part="detail">
          <slot></slot>
        </div>
      </div>
    );
  }
}
