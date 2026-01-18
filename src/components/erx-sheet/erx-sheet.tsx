import { Component, Prop, Event, EventEmitter, State, h, Element, Method, Watch } from '@stencil/core';
import { ErxSheetPosition, ErxSheetSize, ErxSheetBreakpoint, ErxSheetOpenEvent, ErxSheetBreakpointEvent } from './erx-sheet.types';

@Component({
  tag: 'erx-sheet',
  styleUrl: 'erx-sheet.css',
  shadow: true,
})
export class ErxSheet {
  @Element() el!: HTMLElement;

  /** Sheet position */
  @Prop() position: ErxSheetPosition = 'bottom';

  /** Sheet size */
  @Prop() size: ErxSheetSize = 'md';

  /** Custom height/width */
  @Prop() customSize?: string;

  /** Show backdrop */
  @Prop() backdrop: boolean = true;

  /** Close on backdrop click */
  @Prop() backdropDismiss: boolean = true;

  /** Show drag handle */
  @Prop() showHandle: boolean = true;

  /** Enable swipe to dismiss */
  @Prop() swipeToDismiss: boolean = true;

  /** Snap breakpoints (for bottom sheet) */
  @Prop() breakpoints: ErxSheetBreakpoint[] = [];

  /** Initial breakpoint */
  @Prop() initialBreakpoint: number = 0;

  /** Open state */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /** Open/close event */
  @Event() erxOpenChange!: EventEmitter<ErxSheetOpenEvent>;

  /** Breakpoint change event */
  @Event() erxBreakpointChange!: EventEmitter<ErxSheetBreakpointEvent>;

  @State() currentBreakpoint: number = 0;
  @State() isDragging: boolean = false;
  @State() dragOffset: number = 0;

  private sheetEl?: HTMLElement;
  private startY: number = 0;
  private startX: number = 0;

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    this.erxOpenChange.emit({ open: newValue });
    if (newValue && this.breakpoints.length > 0) {
      this.currentBreakpoint = this.initialBreakpoint;
    }
  }

  @Method()
  async present(): Promise<void> {
    this.open = true;
  }

  @Method()
  async dismiss(): Promise<void> {
    this.open = false;
  }

  @Method()
  async setBreakpoint(index: number): Promise<void> {
    if (index >= 0 && index < this.breakpoints.length) {
      this.currentBreakpoint = index;
      this.erxBreakpointChange.emit({
        breakpoint: index,
        ratio: this.breakpoints[index].ratio,
      });
    }
  }

  private handleBackdropClick = () => {
    if (this.backdropDismiss) {
      this.open = false;
    }
  };

  private handleDragStart = (e: TouchEvent | MouseEvent) => {
    if (!this.swipeToDismiss && this.breakpoints.length === 0) return;

    this.isDragging = true;
    if ('touches' in e) {
      this.startY = e.touches[0].clientY;
      this.startX = e.touches[0].clientX;
    } else {
      this.startY = e.clientY;
      this.startX = e.clientX;
    }

    document.addEventListener('mousemove', this.handleDragMove as EventListener);
    document.addEventListener('mouseup', this.handleDragEnd);
    document.addEventListener('touchmove', this.handleDragMove as EventListener);
    document.addEventListener('touchend', this.handleDragEnd);
  };

  private handleDragMove = (e: TouchEvent | MouseEvent) => {
    if (!this.isDragging) return;

    let currentY: number, currentX: number;
    if ('touches' in e) {
      currentY = e.touches[0].clientY;
      currentX = e.touches[0].clientX;
    } else {
      currentY = e.clientY;
      currentX = e.clientX;
    }

    if (this.position === 'bottom') {
      this.dragOffset = Math.max(0, currentY - this.startY);
    } else if (this.position === 'top') {
      this.dragOffset = Math.max(0, this.startY - currentY);
    } else if (this.position === 'right') {
      this.dragOffset = Math.max(0, currentX - this.startX);
    } else if (this.position === 'left') {
      this.dragOffset = Math.max(0, this.startX - currentX);
    }
  };

  private handleDragEnd = () => {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.handleDragMove as EventListener);
    document.removeEventListener('mouseup', this.handleDragEnd);
    document.removeEventListener('touchmove', this.handleDragMove as EventListener);
    document.removeEventListener('touchend', this.handleDragEnd);

    const threshold = 100;
    if (this.dragOffset > threshold && this.swipeToDismiss) {
      this.open = false;
    }

    this.dragOffset = 0;
  };

  private getSizeValue(): string {
    if (this.customSize) return this.customSize;

    const sizes: Record<ErxSheetSize, string> = {
      sm: '25%',
      md: '50%',
      lg: '75%',
      xl: '90%',
      full: '100%',
    };

    return sizes[this.size];
  }

  private getSheetStyle(): Record<string, string> {
    const style: Record<string, string> = {};
    const sizeValue = this.getSizeValue();

    if (this.position === 'bottom' || this.position === 'top') {
      style.height = sizeValue;
      if (this.dragOffset > 0) {
        style.transform = this.position === 'bottom'
          ? `translateY(${this.dragOffset}px)`
          : `translateY(-${this.dragOffset}px)`;
      }
    } else {
      style.width = sizeValue;
      if (this.dragOffset > 0) {
        style.transform = this.position === 'right'
          ? `translateX(${this.dragOffset}px)`
          : `translateX(-${this.dragOffset}px)`;
      }
    }

    return style;
  }

  render() {
    if (!this.open) return null;

    const isVertical = this.position === 'bottom' || this.position === 'top';

    return (
      <div class="erx-sheet__container" part="container">
        {/* Backdrop */}
        {this.backdrop && (
          <div
            class="erx-sheet__backdrop"
            onClick={this.handleBackdropClick}
            part="backdrop"
          />
        )}

        {/* Sheet */}
        <div
          class={{
            'erx-sheet': true,
            [`erx-sheet--${this.position}`]: true,
            'erx-sheet--dragging': this.isDragging,
          }}
          ref={el => this.sheetEl = el}
          style={this.getSheetStyle()}
          part="sheet"
        >
          {/* Handle */}
          {this.showHandle && (
            <div
              class="erx-sheet__handle"
              onMouseDown={this.handleDragStart}
              onTouchStart={this.handleDragStart}
              part="handle"
            >
              <div class={`erx-sheet__handle-bar ${isVertical ? '' : 'erx-sheet__handle-bar--vertical'}`} />
            </div>
          )}

          {/* Content */}
          <div class="erx-sheet__content" part="content">
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
