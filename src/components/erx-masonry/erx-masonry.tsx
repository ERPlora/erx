import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'erx-masonry',
  styleUrl: 'erx-masonry.css',
  shadow: true,
})
export class ErxMasonry {
  /** Number of columns */
  @Prop() columns: number = 3;

  /** Gap between items */
  @Prop() gap: number = 16;

  /** Column width (for auto columns) */
  @Prop() columnWidth?: number;

  render() {
    const style = this.columnWidth
      ? {
          '--masonry-column-width': `${this.columnWidth}px`,
          '--masonry-gap': `${this.gap}px`,
        }
      : {
          '--masonry-columns': String(this.columns),
          '--masonry-gap': `${this.gap}px`,
        };

    return (
      <div
        class={{
          'erx-masonry': true,
          'erx-masonry--auto': !!this.columnWidth,
        }}
        style={style}
        part="container"
      >
        <slot />
      </div>
    );
  }
}
