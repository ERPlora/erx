import { Component, Prop, h } from '@stencil/core';
import { ErxButtonGroupSize, ErxButtonGroupVariant } from './erx-button-group.types';

@Component({
  tag: 'erx-button-group',
  styleUrl: 'erx-button-group.css',
  shadow: true,
})
export class ErxButtonGroup {
  /** Button size */
  @Prop() size: ErxButtonGroupSize = 'md';

  /** Button variant */
  @Prop() variant: ErxButtonGroupVariant = 'solid';

  /** Vertical layout */
  @Prop() vertical = false;

  /** Full width */
  @Prop() fullWidth = false;

  /** Disabled state */
  @Prop({ reflect: true }) disabled = false;

  render() {
    return (
      <div
        class={{
          'erx-bg': true,
          [`erx-bg--${this.size}`]: true,
          [`erx-bg--${this.variant}`]: true,
          'erx-bg--vertical': this.vertical,
          'erx-bg--full-width': this.fullWidth,
          'erx-bg--disabled': this.disabled,
        }}
        part="container"
        role="group"
      >
        <slot></slot>
      </div>
    );
  }
}
