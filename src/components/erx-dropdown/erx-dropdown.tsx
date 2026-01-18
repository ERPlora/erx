import { Component, Prop, Event, EventEmitter, State, h, Element, Method, Watch } from '@stencil/core';
import { ErxDropdownItem, ErxDropdownPlacement, ErxDropdownTrigger, ErxDropdownSelectEvent, ErxDropdownOpenEvent } from './erx-dropdown.types';

@Component({
  tag: 'erx-dropdown',
  styleUrl: 'erx-dropdown.css',
  shadow: true,
})
export class ErxDropdown {
  @Element() el!: HTMLElement;

  /** Menu items */
  @Prop() items: ErxDropdownItem[] = [];

  /** Dropdown placement */
  @Prop() placement: ErxDropdownPlacement = 'bottom-start';

  /** Trigger mode */
  @Prop() trigger: ErxDropdownTrigger = 'click';

  /** Open state (for manual trigger) */
  @Prop({ mutable: true }) open: boolean = false;

  /** Close on select */
  @Prop() closeOnSelect: boolean = true;

  /** Min width of dropdown */
  @Prop() minWidth: string = '180px';

  /** Disabled state */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Item select event */
  @Event() erxSelect!: EventEmitter<ErxDropdownSelectEvent>;

  /** Open/close event */
  @Event() erxOpenChange!: EventEmitter<ErxDropdownOpenEvent>;

  @State() focusedIndex: number = -1;
  @State() submenuOpen: string | null = null;

  private triggerEl?: HTMLElement;
  private menuEl?: HTMLElement;
  private hoverTimeout?: number;

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    this.erxOpenChange.emit({ open: newValue });
    if (!newValue) {
      this.focusedIndex = -1;
      this.submenuOpen = null;
    }
  }

  componentDidLoad() {
    document.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleKeyDown);
    if (this.hoverTimeout) clearTimeout(this.hoverTimeout);
  }

  @Method()
  async openMenu(): Promise<void> {
    if (!this.disabled) this.open = true;
  }

  @Method()
  async closeMenu(): Promise<void> {
    this.open = false;
  }

  @Method()
  async toggleMenu(): Promise<void> {
    if (!this.disabled) this.open = !this.open;
  }

  private handleOutsideClick = (e: MouseEvent) => {
    if (!this.el.contains(e.target as Node)) {
      this.open = false;
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (!this.open) return;

    const enabledItems = this.items.filter(i => i.type !== 'divider' && i.type !== 'header' && !i.disabled);

    switch (e.key) {
      case 'Escape':
        this.open = false;
        this.triggerEl?.focus();
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
    }
  };

  private handleTriggerClick = () => {
    if (this.trigger === 'click' && !this.disabled) {
      this.open = !this.open;
    }
  };

  private handleTriggerMouseEnter = () => {
    if (this.trigger === 'hover' && !this.disabled) {
      if (this.hoverTimeout) clearTimeout(this.hoverTimeout);
      this.open = true;
    }
  };

  private handleTriggerMouseLeave = () => {
    if (this.trigger === 'hover') {
      this.hoverTimeout = window.setTimeout(() => {
        this.open = false;
      }, 150);
    }
  };

  private handleMenuMouseEnter = () => {
    if (this.trigger === 'hover' && this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
  };

  private selectItem(item: ErxDropdownItem, path: ErxDropdownItem[] = []): void {
    if (item.disabled) return;

    if (item.children?.length) {
      this.submenuOpen = this.submenuOpen === item.id ? null : item.id;
      return;
    }

    this.erxSelect.emit({ item, path: [...path, item] });

    if (this.closeOnSelect) {
      this.open = false;
    }
  }

  private renderItem(item: ErxDropdownItem, index: number, path: ErxDropdownItem[] = []) {
    if (item.type === 'divider') {
      return <div class="erx-dropdown__divider" part="divider" />;
    }

    if (item.type === 'header') {
      return (
        <div class="erx-dropdown__header" part="header">
          {item.label}
        </div>
      );
    }

    const hasChildren = item.children && item.children.length > 0;

    return (
      <div class="erx-dropdown__item-wrapper">
        <button
          class={{
            'erx-dropdown__item': true,
            'erx-dropdown__item--disabled': item.disabled,
            'erx-dropdown__item--danger': item.danger,
            'erx-dropdown__item--focused': index === this.focusedIndex,
            'erx-dropdown__item--has-children': hasChildren,
          }}
          onClick={() => this.selectItem(item, path)}
          onMouseEnter={() => hasChildren && (this.submenuOpen = item.id)}
          disabled={item.disabled}
          role="menuitem"
          part="item"
        >
          {item.icon && <span class="erx-dropdown__icon">{item.icon}</span>}
          <span class="erx-dropdown__label">{item.label}</span>
          {item.shortcut && <span class="erx-dropdown__shortcut">{item.shortcut}</span>}
          {hasChildren && <span class="erx-dropdown__arrow">▶</span>}
        </button>
        {hasChildren && this.submenuOpen === item.id && (
          <div class="erx-dropdown__submenu" part="submenu">
            {item.children.map((child, idx) => this.renderItem(child, idx, [...path, item]))}
          </div>
        )}
      </div>
    );
  }

  render() {
    const placementClass = `erx-dropdown__menu--${this.placement}`;

    return (
      <div
        class={{
          'erx-dropdown': true,
          'erx-dropdown--open': this.open,
          'erx-dropdown--disabled': this.disabled,
        }}
        part="container"
      >
        {/* Trigger */}
        <div
          class="erx-dropdown__trigger"
          ref={el => this.triggerEl = el}
          onClick={this.handleTriggerClick}
          onMouseEnter={this.handleTriggerMouseEnter}
          onMouseLeave={this.handleTriggerMouseLeave}
          part="trigger"
        >
          <slot name="trigger">
            <button class="erx-dropdown__default-trigger" disabled={this.disabled}>
              Menu
              <span class="erx-dropdown__caret">▼</span>
            </button>
          </slot>
        </div>

        {/* Menu */}
        {this.open && (
          <div
            class={`erx-dropdown__menu ${placementClass}`}
            ref={el => this.menuEl = el}
            onMouseEnter={this.handleMenuMouseEnter}
            onMouseLeave={this.handleTriggerMouseLeave}
            role="menu"
            style={{ minWidth: this.minWidth }}
            part="menu"
          >
            <slot>
              {this.items.map((item, index) => this.renderItem(item, index))}
            </slot>
          </div>
        )}
      </div>
    );
  }
}
