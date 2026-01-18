import {
  Component,
  Prop,
  Event,
  EventEmitter,
  State,
  h,
  Element,
  Method,
  Watch,
} from '@stencil/core';
import type { ErxSplitPaneResizeEvent, ErxSplitPaneCollapseEvent } from './erx-split-pane.types';

@Component({
  tag: 'erx-split-pane',
  styleUrl: 'erx-split-pane.css',
  shadow: true,
})
export class ErxSplitPane {
  @Element() el!: HTMLElement;

  // ========================================
  // Props
  // ========================================

  /** Orientation of the split: 'horizontal' (side-by-side) or 'vertical' (stacked) */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Initial size of the primary pane (px or %) */
  @Prop({ mutable: true }) primarySize: string = '50%';

  /** Minimum size of the primary pane in pixels */
  @Prop() primaryMinSize = 100;

  /** Maximum size of the primary pane in pixels */
  @Prop() primaryMaxSize?: number;

  /** Minimum size of the secondary pane in pixels */
  @Prop() secondaryMinSize = 100;

  /** Enable collapse button on the divider */
  @Prop() collapsible = false;

  /** Persist size to localStorage with this key */
  @Prop() persistKey?: string;

  /** Enable double-click to reset to initial size */
  @Prop() resetOnDoubleClick = true;

  /** Size of the divider/gutter in pixels */
  @Prop() gutterSize = 8;

  /** Disable resizing */
  @Prop() disabled = false;

  // ========================================
  // State
  // ========================================

  @State() isDragging = false;
  @State() currentSize: number = 0;
  @State() collapsed: 'primary' | 'secondary' | null = null;
  @State() containerSize: number = 0;

  private containerRef?: HTMLDivElement;
  private initialSize: string = '50%';
  private startPos: number = 0;
  private startSize: number = 0;

  // ========================================
  // Events
  // ========================================

  /** Emitted when pane is resized */
  @Event() erxResize!: EventEmitter<ErxSplitPaneResizeEvent>;

  /** Emitted when resize starts */
  @Event() erxResizeStart!: EventEmitter<void>;

  /** Emitted when resize ends */
  @Event() erxResizeEnd!: EventEmitter<ErxSplitPaneResizeEvent>;

  /** Emitted when pane is collapsed/expanded */
  @Event() erxCollapse!: EventEmitter<ErxSplitPaneCollapseEvent>;

  // ========================================
  // Watchers
  // ========================================

  @Watch('primarySize')
  handlePrimarySizeChange() {
    this.updateSizeFromProp();
  }

  // ========================================
  // Lifecycle
  // ========================================

  componentWillLoad() {
    this.initialSize = this.primarySize;

    // Restore from localStorage if available
    if (this.persistKey) {
      const saved = localStorage.getItem(`erx-split-${this.persistKey}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.primarySize = parsed.size || this.primarySize;
        this.collapsed = parsed.collapsed || null;
      }
    }
  }

  componentDidLoad() {
    this.updateContainerSize();
    this.updateSizeFromProp();

    // Listen for window resize
    window.addEventListener('resize', this.handleWindowResize);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  // ========================================
  // Public Methods
  // ========================================

  /** Collapse the primary pane */
  @Method()
  async collapsePrimary(): Promise<void> {
    this.collapsed = 'primary';
    this.saveState();
    this.erxCollapse.emit({ collapsed: 'primary' });
  }

  /** Collapse the secondary pane */
  @Method()
  async collapseSecondary(): Promise<void> {
    this.collapsed = 'secondary';
    this.saveState();
    this.erxCollapse.emit({ collapsed: 'secondary' });
  }

  /** Expand both panes */
  @Method()
  async expand(): Promise<void> {
    this.collapsed = null;
    this.saveState();
    this.erxCollapse.emit({ collapsed: null });
  }

  /** Reset to initial size */
  @Method()
  async reset(): Promise<void> {
    this.primarySize = this.initialSize;
    this.collapsed = null;
    this.updateSizeFromProp();
    this.saveState();
  }

  /** Set the size programmatically */
  @Method()
  async setSize(size: number | string): Promise<void> {
    if (typeof size === 'number') {
      this.currentSize = size;
    } else {
      this.primarySize = size;
      this.updateSizeFromProp();
    }
    this.saveState();
  }

  // ========================================
  // Private Methods
  // ========================================

  private handleWindowResize = () => {
    this.updateContainerSize();
  };

  private updateContainerSize() {
    if (!this.containerRef) return;
    const rect = this.containerRef.getBoundingClientRect();
    this.containerSize = this.orientation === 'horizontal' ? rect.width : rect.height;
  }

  private updateSizeFromProp() {
    this.updateContainerSize();

    if (this.primarySize.endsWith('%')) {
      const percentage = parseFloat(this.primarySize);
      this.currentSize = (this.containerSize * percentage) / 100;
    } else {
      this.currentSize = parseFloat(this.primarySize);
    }
  }

  private handleMouseDown = (e: MouseEvent) => {
    if (this.disabled) return;
    e.preventDefault();

    this.isDragging = true;
    this.startPos = this.orientation === 'horizontal' ? e.clientX : e.clientY;
    this.startSize = this.currentSize;

    this.erxResizeStart.emit();

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  };

  private handleTouchStart = (e: TouchEvent) => {
    if (this.disabled) return;

    this.isDragging = true;
    const touch = e.touches[0];
    this.startPos = this.orientation === 'horizontal' ? touch.clientX : touch.clientY;
    this.startSize = this.currentSize;

    this.erxResizeStart.emit();

    document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    document.addEventListener('touchend', this.handleTouchEnd);
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDragging) return;
    e.preventDefault();

    const currentPos = this.orientation === 'horizontal' ? e.clientX : e.clientY;
    this.updateSize(currentPos);
  };

  private handleTouchMove = (e: TouchEvent) => {
    if (!this.isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    const currentPos = this.orientation === 'horizontal' ? touch.clientX : touch.clientY;
    this.updateSize(currentPos);
  };

  private updateSize(currentPos: number) {
    const delta = currentPos - this.startPos;
    let newSize = this.startSize + delta;

    // Apply min/max constraints
    newSize = Math.max(newSize, this.primaryMinSize);
    if (this.primaryMaxSize) {
      newSize = Math.min(newSize, this.primaryMaxSize);
    }

    // Ensure secondary pane has minimum size
    const maxPrimarySize = this.containerSize - this.secondaryMinSize - this.gutterSize;
    newSize = Math.min(newSize, maxPrimarySize);

    this.currentSize = newSize;

    const percentage = (newSize / this.containerSize) * 100;
    this.erxResize.emit({ size: newSize, percentage });
  }

  private handleMouseUp = () => {
    this.finishDrag();
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  private handleTouchEnd = () => {
    this.finishDrag();
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
  };

  private finishDrag() {
    this.isDragging = false;
    const percentage = (this.currentSize / this.containerSize) * 100;
    this.erxResizeEnd.emit({ size: this.currentSize, percentage });
    this.saveState();
  }

  private handleDoubleClick = () => {
    if (this.resetOnDoubleClick) {
      this.reset();
    }
  };

  private handleCollapseClick = (target: 'primary' | 'secondary') => {
    if (this.collapsed === target) {
      this.expand();
    } else {
      if (target === 'primary') {
        this.collapsePrimary();
      } else {
        this.collapseSecondary();
      }
    }
  };

  private saveState() {
    if (!this.persistKey) return;

    localStorage.setItem(
      `erx-split-${this.persistKey}`,
      JSON.stringify({
        size: `${(this.currentSize / this.containerSize) * 100}%`,
        collapsed: this.collapsed,
      })
    );
  }

  private getPrimaryStyle(): { [key: string]: string } {
    if (this.collapsed === 'primary') {
      return { [this.orientation === 'horizontal' ? 'width' : 'height']: '0px' };
    }
    if (this.collapsed === 'secondary') {
      return { [this.orientation === 'horizontal' ? 'width' : 'height']: '100%' };
    }
    return {
      [this.orientation === 'horizontal' ? 'width' : 'height']: `${this.currentSize}px`,
    };
  }

  private getSecondaryStyle(): { [key: string]: string } {
    if (this.collapsed === 'secondary') {
      return { [this.orientation === 'horizontal' ? 'width' : 'height']: '0px' };
    }
    if (this.collapsed === 'primary') {
      return { [this.orientation === 'horizontal' ? 'width' : 'height']: '100%' };
    }
    return { flex: '1' };
  }

  // ========================================
  // Render
  // ========================================

  render() {
    return (
      <div
        class={{
          'erx-split': true,
          'erx-split--horizontal': this.orientation === 'horizontal',
          'erx-split--vertical': this.orientation === 'vertical',
          'erx-split--dragging': this.isDragging,
          'erx-split--disabled': this.disabled,
        }}
        ref={el => (this.containerRef = el)}
        part="container"
      >
        {/* Primary pane */}
        <div
          class={{
            'erx-split__pane': true,
            'erx-split__pane--primary': true,
            'erx-split__pane--collapsed': this.collapsed === 'primary',
          }}
          style={this.getPrimaryStyle()}
          part="primary"
        >
          <slot name="primary" />
        </div>

        {/* Gutter/Divider */}
        <div
          class={{
            'erx-split__gutter': true,
            'erx-split__gutter--dragging': this.isDragging,
          }}
          style={{
            [this.orientation === 'horizontal' ? 'width' : 'height']: `${this.gutterSize}px`,
          }}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          onDblClick={this.handleDoubleClick}
          part="gutter"
          role="separator"
          aria-orientation={this.orientation}
          aria-valuenow={Math.round((this.currentSize / this.containerSize) * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={this.disabled ? -1 : 0}
        >
          <div class="erx-split__gutter-line" />
          {this.collapsible && (
            <div class="erx-split__collapse-buttons">
              <button
                class="erx-split__collapse-btn"
                onClick={() => this.handleCollapseClick('primary')}
                aria-label={this.collapsed === 'primary' ? 'Expand primary pane' : 'Collapse primary pane'}
              >
                {this.orientation === 'horizontal' ? (this.collapsed === 'primary' ? '›' : '‹') : (this.collapsed === 'primary' ? '▼' : '▲')}
              </button>
              <button
                class="erx-split__collapse-btn"
                onClick={() => this.handleCollapseClick('secondary')}
                aria-label={this.collapsed === 'secondary' ? 'Expand secondary pane' : 'Collapse secondary pane'}
              >
                {this.orientation === 'horizontal' ? (this.collapsed === 'secondary' ? '‹' : '›') : (this.collapsed === 'secondary' ? '▲' : '▼')}
              </button>
            </div>
          )}
        </div>

        {/* Secondary pane */}
        <div
          class={{
            'erx-split__pane': true,
            'erx-split__pane--secondary': true,
            'erx-split__pane--collapsed': this.collapsed === 'secondary',
          }}
          style={this.getSecondaryStyle()}
          part="secondary"
        >
          <slot name="secondary" />
        </div>
      </div>
    );
  }
}
