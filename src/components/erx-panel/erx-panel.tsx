import { Component, Prop, Event, EventEmitter, h, Method } from '@stencil/core';
import { ErxPanelVariant, ErxPanelToggleEvent } from './erx-panel.types';

@Component({
  tag: 'erx-panel',
  styleUrl: 'erx-panel.css',
  shadow: true,
})
export class ErxPanel {
  /** Panel title */
  @Prop() panelTitle?: string;

  /** Subtitle */
  @Prop() subtitle?: string;

  /** Icon */
  @Prop() icon?: string;

  /** Variant style */
  @Prop() variant: ErxPanelVariant = 'bordered';

  /** Collapsible */
  @Prop() collapsible: boolean = true;

  /** Collapsed state */
  @Prop({ mutable: true }) collapsed: boolean = false;

  /** Disabled state */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Toggle event */
  @Event() erxToggle!: EventEmitter<ErxPanelToggleEvent>;

  @Method()
  async expand(): Promise<void> {
    if (this.collapsible && this.collapsed && !this.disabled) {
      this.collapsed = false;
      this.erxToggle.emit({ collapsed: false });
    }
  }

  @Method()
  async collapse(): Promise<void> {
    if (this.collapsible && !this.collapsed && !this.disabled) {
      this.collapsed = true;
      this.erxToggle.emit({ collapsed: true });
    }
  }

  @Method()
  async toggle(): Promise<void> {
    if (this.collapsible && !this.disabled) {
      this.collapsed = !this.collapsed;
      this.erxToggle.emit({ collapsed: this.collapsed });
    }
  }

  private handleHeaderClick = () => {
    if (this.collapsible && !this.disabled) {
      this.toggle();
    }
  };

  render() {
    return (
      <div
        class={{
          'erx-panel': true,
          [`erx-panel--${this.variant}`]: true,
          'erx-panel--collapsible': this.collapsible,
          'erx-panel--collapsed': this.collapsed,
          'erx-panel--disabled': this.disabled,
        }}
        part="container"
      >
        {/* Header */}
        <header
          class="erx-panel__header"
          onClick={this.handleHeaderClick}
          part="header"
        >
          {this.collapsible && (
            <span class="erx-panel__toggle">
              {this.collapsed ? '▶' : '▼'}
            </span>
          )}

          {this.icon && <span class="erx-panel__icon">{this.icon}</span>}

          <div class="erx-panel__titles">
            {this.panelTitle && (
              <h4 class="erx-panel__title" part="title">{this.panelTitle}</h4>
            )}
            {this.subtitle && (
              <span class="erx-panel__subtitle" part="subtitle">{this.subtitle}</span>
            )}
          </div>

          <div class="erx-panel__header-actions">
            <slot name="header-actions" />
          </div>
        </header>

        {/* Content */}
        {!this.collapsed && (
          <div class="erx-panel__content" part="content">
            <slot />
          </div>
        )}

        {/* Footer */}
        <footer class="erx-panel__footer" part="footer">
          <slot name="footer" />
        </footer>
      </div>
    );
  }
}
