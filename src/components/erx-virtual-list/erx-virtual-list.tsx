import { Component, Prop, State, Event, EventEmitter, h, Element, Method } from '@stencil/core';
import { VirtualListConfig, VirtualListItem, VirtualListScrollDetail } from './erx-virtual-list.types';

@Component({
  tag: 'erx-virtual-list',
  styleUrl: 'erx-virtual-list.css',
  shadow: true,
})
export class ErxVirtualList {
  @Element() el!: HTMLElement;

  @Prop() items: VirtualListItem[] = [];
  @Prop() config: VirtualListConfig = { itemHeight: 48 };

  @State() scrollTop = 0;
  @State() containerHeight = 0;

  private containerRef?: HTMLDivElement;

  @Event() erxScroll!: EventEmitter<VirtualListScrollDetail>;

  componentDidLoad() {
    this.updateContainerHeight();
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => this.updateContainerHeight());
      if (this.containerRef) observer.observe(this.containerRef);
    }
  }

  @Method()
  async scrollToIndex(index: number): Promise<void> {
    if (this.containerRef) {
      this.containerRef.scrollTop = index * this.config.itemHeight;
    }
  }

  @Method()
  async scrollToTop(): Promise<void> {
    if (this.containerRef) {
      this.containerRef.scrollTop = 0;
    }
  }

  private updateContainerHeight() {
    if (this.containerRef) {
      this.containerHeight = this.containerRef.clientHeight;
    }
  }

  private get overscan(): number {
    return this.config.overscan ?? 3;
  }

  private get totalHeight(): number {
    return this.items.length * this.config.itemHeight;
  }

  private get startIndex(): number {
    return Math.max(0, Math.floor(this.scrollTop / this.config.itemHeight) - this.overscan);
  }

  private get endIndex(): number {
    const visibleCount = Math.ceil(this.containerHeight / this.config.itemHeight);
    return Math.min(this.items.length, this.startIndex + visibleCount + this.overscan * 2);
  }

  private get visibleItems(): { item: VirtualListItem; index: number }[] {
    return this.items.slice(this.startIndex, this.endIndex).map((item, i) => ({
      item,
      index: this.startIndex + i,
    }));
  }

  private handleScroll = (e: Event) => {
    const target = e.target as HTMLDivElement;
    this.scrollTop = target.scrollTop;
    this.erxScroll.emit({
      scrollTop: this.scrollTop,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
    });
  };

  render() {
    return (
      <div
        class="erx-vlist"
        ref={el => (this.containerRef = el)}
        onScroll={this.handleScroll}
        part="container"
      >
        <div
          class="erx-vlist__spacer"
          style={{ height: `${this.totalHeight}px` }}
        >
          <div
            class="erx-vlist__content"
            style={{ transform: `translateY(${this.startIndex * this.config.itemHeight}px)` }}
          >
            {this.visibleItems.map(({ item, index }) => (
              <div
                class="erx-vlist__item"
                key={item.id}
                style={{ height: `${this.config.itemHeight}px` }}
                data-index={index}
                part="item"
              >
                <slot name={`item-${item.id}`}>
                  <span class="erx-vlist__item-default">{item.id}</span>
                </slot>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
