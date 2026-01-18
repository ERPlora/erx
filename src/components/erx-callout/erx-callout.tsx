import { Component, Prop, State, h } from '@stencil/core';
import { ErxCalloutVariant } from './erx-callout.types';

@Component({
  tag: 'erx-callout',
  styleUrl: 'erx-callout.css',
  shadow: true,
})
export class ErxCallout {
  /** Callout variant */
  @Prop() variant: ErxCalloutVariant = 'info';

  /** Title text */
  @Prop() calloutTitle?: string;

  /** Icon to show */
  @Prop() icon?: string;

  /** Collapsible */
  @Prop() collapsible = false;

  /** Collapsed state */
  @Prop({ mutable: true }) collapsed = false;

  private getDefaultIcon(): string {
    if (this.icon) return this.icon;
    switch (this.variant) {
      case 'info': return 'ℹ';
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'error': return '✕';
      case 'tip': return '💡';
      case 'note': return '📝';
      default: return 'ℹ';
    }
  }

  private getDefaultTitle(): string {
    if (this.calloutTitle) return this.calloutTitle;
    switch (this.variant) {
      case 'info': return 'Info';
      case 'success': return 'Success';
      case 'warning': return 'Warning';
      case 'error': return 'Error';
      case 'tip': return 'Tip';
      case 'note': return 'Note';
      default: return '';
    }
  }

  private handleToggle = () => {
    if (this.collapsible) {
      this.collapsed = !this.collapsed;
    }
  };

  render() {
    const icon = this.getDefaultIcon();
    const title = this.getDefaultTitle();

    return (
      <div
        class={{
          'erx-callout': true,
          [`erx-callout--${this.variant}`]: true,
          'erx-callout--collapsible': this.collapsible,
          'erx-callout--collapsed': this.collapsed,
        }}
        part="container"
      >
        <div
          class="erx-callout__header"
          part="header"
          onClick={this.handleToggle}
        >
          {icon && (
            <span class="erx-callout__icon" part="icon">{icon}</span>
          )}
          {title && (
            <span class="erx-callout__title" part="title">{title}</span>
          )}
          {this.collapsible && (
            <span class="erx-callout__toggle" part="toggle">
              {this.collapsed ? '▶' : '▼'}
            </span>
          )}
        </div>
        {!this.collapsed && (
          <div class="erx-callout__content" part="content">
            <slot></slot>
          </div>
        )}
      </div>
    );
  }
}
