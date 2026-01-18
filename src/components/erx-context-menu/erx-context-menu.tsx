import { Component, Prop, Event, EventEmitter, State, h, Element, Method, Listen } from '@stencil/core';
import { ErxContextMenuItem, ErxContextMenuPosition, ErxContextMenuSelectEvent, ErxContextMenuOpenEvent } from './erx-context-menu.types';

@Component({
  tag: 'erx-context-menu',
  styleUrl: 'erx-context-menu.css',
  shadow: true,
})
export class ErxContextMenu {
  @Element() el!: HTMLElement;

  /** Menu items */
  @Prop() items: ErxContextMenuItem[] = [];

  /** CSS selector for target elements (defaults to host parent) */
  @Prop() target?: string;

  /** Disabled state */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Item select event */
  @Event() erxSelect!: EventEmitter<ErxContextMenuSelectEvent>;

  /** Open/close event */
  @Event() erxOpenChange!: EventEmitter<ErxContextMenuOpenEvent>;

  @State() open: boolean = false;
  @State() position: ErxContextMenuPosition = { x: 0, y: 0 };
  @State() focusedIndex: number = -1;
  @State() submenuOpen: string | null = null;

  private targetElement: HTMLElement | null = null;
  private menuEl?: HTMLElement;

  componentDidLoad() {
    // Find target element(s)
    if (this.target) {
      document.querySelectorAll(this.target).forEach(el => {
        el.addEventListener('contextmenu', this.handleContextMenu as EventListener);
      });
    } else {
      // Default: parent element
      this.el.parentElement?.addEventListener('contextmenu', this.handleContextMenu as EventListener);
    }
  }

  disconnectedCallback() {
    if (this.target) {
      document.querySelectorAll(this.target).forEach(el => {
        el.removeEventListener('contextmenu', this.handleContextMenu as EventListener);
      });
    } else {
      this.el.parentElement?.removeEventListener('contextmenu', this.handleContextMenu as EventListener);
    }
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(e: MouseEvent) {
    if (this.open && !this.el.contains(e.target as Node)) {
      this.close();
    }
  }

  @Listen('keydown', { target: 'document' })
  handleKeyDown(e: KeyboardEvent) {
    if (!this.open) return;

    const enabledItems = this.items.filter(i => i.type !== 'divider' && i.type !== 'header' && !i.disabled);

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this.close();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.focusedIndex = (this.focusedIndex + 1) % enabledItems.length;
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusedIndex = this.focusedIndex <= 0 ? enabledItems.length - 1 : this.focusedIndex - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.focusedIndex >= 0 && enabledItems[this.focusedIndex]) {
          this.selectItem(enabledItems[this.focusedIndex]);
        }
        break;
      case 'ArrowRight':
        if (this.focusedIndex >= 0 && enabledItems[this.focusedIndex]?.children?.length) {
          this.submenuOpen = enabledItems[this.focusedIndex].id;
        }
        break;
      case 'ArrowLeft':
        this.submenuOpen = null;
        break;
    }
  }

  @Method()
  async show(x: number, y: number, target?: HTMLElement): Promise<void> {
    if (this.disabled) return;

    this.targetElement = target || null;
    this.position = this.adjustPosition(x, y);
    this.open = true;
    this.focusedIndex = -1;
    this.submenuOpen = null;

    this.erxOpenChange.emit({
      open: true,
      position: this.position,
      target: this.targetElement,
    });
  }

  @Method()
  async close(): Promise<void> {
    this.open = false;
    this.erxOpenChange.emit({
      open: false,
      position: this.position,
      target: this.targetElement,
    });
  }

  private handleContextMenu = (e: MouseEvent) => {
    if (this.disabled) return;

    e.preventDefault();
    this.show(e.clientX, e.clientY, e.target as HTMLElement);
  };

  private adjustPosition(x: number, y: number): ErxContextMenuPosition {
    const menuWidth = 200;
    const menuHeight = this.items.length * 40;
    const padding = 8;

    let adjustedX = x;
    let adjustedY = y;

    if (x + menuWidth > window.innerWidth - padding) {
      adjustedX = window.innerWidth - menuWidth - padding;
    }

    if (y + menuHeight > window.innerHeight - padding) {
      adjustedY = window.innerHeight - menuHeight - padding;
    }

    return { x: adjustedX, y: adjustedY };
  }

  private selectItem(item: ErxContextMenuItem): void {
    if (item.disabled) return;

    if (item.children?.length) {
      this.submenuOpen = this.submenuOpen === item.id ? null : item.id;
      return;
    }

    this.erxSelect.emit({
      item,
      position: this.position,
      target: this.targetElement,
    });

    this.close();
  }

  private renderItem(item: ErxContextMenuItem, index: number) {
    if (item.type === 'divider') {
      return <div class="erx-ctx__divider" part="divider" />;
    }

    if (item.type === 'header') {
      return (
        <div class="erx-ctx__header" part="header">
          {item.label}
        </div>
      );
    }

    const hasChildren = item.children && item.children.length > 0;

    return (
      <div class="erx-ctx__item-wrapper">
        <button
          class={{
            'erx-ctx__item': true,
            'erx-ctx__item--disabled': item.disabled,
            'erx-ctx__item--danger': item.danger,
            'erx-ctx__item--focused': index === this.focusedIndex,
            'erx-ctx__item--has-children': hasChildren,
          }}
          onClick={() => this.selectItem(item)}
          onMouseEnter={() => hasChildren && (this.submenuOpen = item.id)}
          disabled={item.disabled}
          role="menuitem"
          part="item"
        >
          {item.icon && <span class="erx-ctx__icon">{item.icon}</span>}
          <span class="erx-ctx__label">{item.label}</span>
          {item.shortcut && <span class="erx-ctx__shortcut">{item.shortcut}</span>}
          {hasChildren && <span class="erx-ctx__arrow">▶</span>}
        </button>
        {hasChildren && this.submenuOpen === item.id && (
          <div class="erx-ctx__submenu" part="submenu">
            {item.children.map((child, idx) => this.renderItem(child, idx))}
          </div>
        )}
      </div>
    );
  }

  render() {
    if (!this.open) return null;

    return (
      <div
        class="erx-ctx"
        ref={el => this.menuEl = el}
        style={{
          left: `${this.position.x}px`,
          top: `${this.position.y}px`,
        }}
        role="menu"
        part="menu"
      >
        {this.items.map((item, index) => this.renderItem(item, index))}
      </div>
    );
  }
}
