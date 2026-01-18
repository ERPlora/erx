import { Component, Prop, State, Event, EventEmitter, Element, h } from '@stencil/core';
import { ErxImageZoomTrigger, ErxImageZoomPosition } from './erx-image-zoom.types';

@Component({
  tag: 'erx-image-zoom',
  styleUrl: 'erx-image-zoom.css',
  shadow: true,
})
export class ErxImageZoom {
  @Element() el!: HTMLElement;

  /** Image source URL */
  @Prop() src!: string;

  /** High-resolution image for zoom (defaults to src) */
  @Prop() zoomSrc?: string;

  /** Alt text */
  @Prop() alt = '';

  /** Zoom trigger mode */
  @Prop() trigger: ErxImageZoomTrigger = 'hover';

  /** Zoom level multiplier */
  @Prop() zoomLevel = 2;

  /** Zoom position/style */
  @Prop() position: ErxImageZoomPosition = 'overlay';

  /** Lens size in pixels (for lens mode) */
  @Prop() lensSize = 150;

  /** Enable smooth transitions */
  @Prop() smooth = true;

  /** Whether zoom is active */
  @State() isZoomed = false;

  /** Mouse position within image */
  @State() mouseX = 0;
  @State() mouseY = 0;

  /** Image dimensions */
  @State() imgWidth = 0;
  @State() imgHeight = 0;

  /** Emitted when zoom state changes */
  @Event() erxZoom!: EventEmitter<{ zoomed: boolean; level: number }>;

  private containerEl?: HTMLDivElement;

  private get effectiveZoomSrc(): string {
    return this.zoomSrc || this.src;
  }

  private handleMouseEnter = () => {
    if (this.trigger === 'hover' || this.trigger === 'both') {
      this.activateZoom();
    }
  };

  private handleMouseLeave = () => {
    if (this.trigger === 'hover' || this.trigger === 'both') {
      this.deactivateZoom();
    }
  };

  private handleClick = () => {
    if (this.trigger === 'click' || this.trigger === 'both') {
      if (this.isZoomed) {
        this.deactivateZoom();
      } else {
        this.activateZoom();
      }
    }
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.containerEl || !this.isZoomed) return;

    const rect = this.containerEl.getBoundingClientRect();
    this.mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    this.mouseY = ((e.clientY - rect.top) / rect.height) * 100;
  };

  private handleImageLoad = (e: Event) => {
    const img = e.target as HTMLImageElement;
    this.imgWidth = img.naturalWidth;
    this.imgHeight = img.naturalHeight;
  };

  private activateZoom() {
    this.isZoomed = true;
    this.erxZoom.emit({ zoomed: true, level: this.zoomLevel });
  }

  private deactivateZoom() {
    this.isZoomed = false;
    this.erxZoom.emit({ zoomed: false, level: 1 });
  }

  private renderOverlayZoom() {
    if (!this.isZoomed) return null;

    const bgPosition = `${this.mouseX}% ${this.mouseY}%`;
    const bgSize = `${this.zoomLevel * 100}%`;

    return (
      <div
        class="erx-iz__overlay"
        part="overlay"
        style={{
          backgroundImage: `url(${this.effectiveZoomSrc})`,
          backgroundPosition: bgPosition,
          backgroundSize: bgSize,
        }}
      ></div>
    );
  }

  private renderLensZoom() {
    if (!this.isZoomed) return null;

    const lensLeft = `calc(${this.mouseX}% - ${this.lensSize / 2}px)`;
    const lensTop = `calc(${this.mouseY}% - ${this.lensSize / 2}px)`;
    const bgPosition = `${this.mouseX}% ${this.mouseY}%`;
    const bgSize = `${this.zoomLevel * 100}%`;

    return (
      <div
        class="erx-iz__lens"
        part="lens"
        style={{
          width: `${this.lensSize}px`,
          height: `${this.lensSize}px`,
          left: lensLeft,
          top: lensTop,
          backgroundImage: `url(${this.effectiveZoomSrc})`,
          backgroundPosition: bgPosition,
          backgroundSize: bgSize,
        }}
      ></div>
    );
  }

  private renderSideZoom() {
    if (!this.isZoomed) return null;

    const bgPosition = `${this.mouseX}% ${this.mouseY}%`;
    const bgSize = `${this.zoomLevel * 100}%`;

    return (
      <div
        class="erx-iz__side"
        part="side"
        style={{
          backgroundImage: `url(${this.effectiveZoomSrc})`,
          backgroundPosition: bgPosition,
          backgroundSize: bgSize,
        }}
      ></div>
    );
  }

  render() {
    return (
      <div
        class={{
          'erx-iz': true,
          'erx-iz--zoomed': this.isZoomed,
          'erx-iz--smooth': this.smooth,
          [`erx-iz--${this.position}`]: true,
        }}
        part="container"
        ref={(el) => (this.containerEl = el)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
        onClick={this.handleClick}
      >
        <img
          class="erx-iz__img"
          part="image"
          src={this.src}
          alt={this.alt}
          onLoad={this.handleImageLoad}
        />

        {this.position === 'overlay' && this.renderOverlayZoom()}
        {this.position === 'lens' && this.renderLensZoom()}
        {this.position === 'side' && this.renderSideZoom()}
      </div>
    );
  }
}
