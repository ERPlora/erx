import { Component, Prop, h } from '@stencil/core';
import { ErxDividerOrientation, ErxDividerTextPosition } from './erx-divider.types';

@Component({
  tag: 'erx-divider',
  styleUrl: 'erx-divider.css',
  shadow: true,
})
export class ErxDivider {
  /** Orientation */
  @Prop() orientation: ErxDividerOrientation = 'horizontal';

  /** Text label */
  @Prop() text?: string;

  /** Text position */
  @Prop() textPosition: ErxDividerTextPosition = 'center';

  /** Dashed style */
  @Prop() dashed: boolean = false;

  /** Margin */
  @Prop() margin: string = '16px 0';

  render() {
    return (
      <div
        class={{
          'erx-divider': true,
          [`erx-divider--${this.orientation}`]: true,
          [`erx-divider--text-${this.textPosition}`]: !!this.text,
          'erx-divider--dashed': this.dashed,
        }}
        style={{ margin: this.orientation === 'horizontal' ? this.margin : `0 ${this.margin}` }}
        role="separator"
        part="container"
      >
        {this.text && this.orientation === 'horizontal' && (
          <span class="erx-divider__text" part="text">{this.text}</span>
        )}
      </div>
    );
  }
}
