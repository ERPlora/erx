import { Component, Prop, Event, EventEmitter, State, h, Method } from '@stencil/core';
import { ErxSectionToggleEvent } from './erx-section.types';

@Component({
  tag: 'erx-section',
  styleUrl: 'erx-section.css',
  shadow: true,
})
export class ErxSection {
  /** Section title */
  @Prop() sectionTitle?: string;

  /** Subtitle/description */
  @Prop() subtitle?: string;

  /** Icon */
  @Prop() icon?: string;

  /** Collapsible */
  @Prop() collapsible: boolean = false;

  /** Initial collapsed state */
  @Prop({ mutable: true }) collapsed: boolean = false;

  /** Show divider */
  @Prop() divider: boolean = false;

  /** Padding size */
  @Prop() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  /** Toggle event */
  @Event() erxToggle!: EventEmitter<ErxSectionToggleEvent>;

  @Method()
  async expand(): Promise<void> {
    if (this.collapsible && this.collapsed) {
      this.collapsed = false;
      this.erxToggle.emit({ collapsed: false });
    }
  }

  @Method()
  async collapse(): Promise<void> {
    if (this.collapsible && !this.collapsed) {
      this.collapsed = true;
      this.erxToggle.emit({ collapsed: true });
    }
  }

  @Method()
  async toggle(): Promise<void> {
    if (this.collapsible) {
      this.collapsed = !this.collapsed;
      this.erxToggle.emit({ collapsed: this.collapsed });
    }
  }

  private handleHeaderClick = () => {
    if (this.collapsible) {
      this.toggle();
    }
  };

  render() {
    const hasHeader = this.sectionTitle || this.subtitle || this.icon;

    return (
      <section
        class={{
          'erx-section': true,
          'erx-section--collapsible': this.collapsible,
          'erx-section--collapsed': this.collapsed,
          'erx-section--divider': this.divider,
          [`erx-section--padding-${this.padding}`]: true,
        }}
        part="container"
      >
        {/* Header */}
        {hasHeader && (
          <header
            class="erx-section__header"
            onClick={this.handleHeaderClick}
            part="header"
          >
            <div class="erx-section__header-content">
              {this.icon && <span class="erx-section__icon">{this.icon}</span>}
              <div class="erx-section__titles">
                {this.sectionTitle && (
                  <h3 class="erx-section__title" part="title">{this.sectionTitle}</h3>
                )}
                {this.subtitle && (
                  <p class="erx-section__subtitle" part="subtitle">{this.subtitle}</p>
                )}
              </div>
            </div>

            {this.collapsible && (
              <button
                class="erx-section__toggle"
                aria-expanded={!this.collapsed}
                aria-label={this.collapsed ? 'Expand' : 'Collapse'}
                part="toggle"
              >
                <span class="erx-section__toggle-icon">▼</span>
              </button>
            )}

            <slot name="header-actions" />
          </header>
        )}

        {/* Content */}
        <div
          class={{
            'erx-section__content': true,
            'erx-section__content--hidden': this.collapsed,
          }}
          part="content"
        >
          <slot />
        </div>
      </section>
    );
  }
}
