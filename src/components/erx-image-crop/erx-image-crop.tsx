import { Component, Prop, Event, EventEmitter, State, h, Element, Method } from '@stencil/core';
import { ErxCropArea, ErxImageCropEvent, ErxImageCropCompleteEvent } from './erx-image-crop.types';

@Component({
  tag: 'erx-image-crop',
  styleUrl: 'erx-image-crop.css',
  shadow: true,
})
export class ErxImageCrop {
  @Element() el!: HTMLElement;

  /** Image source URL */
  @Prop() src?: string;

  /** Aspect ratio */
  @Prop() aspectRatio?: number;

  /** Minimum crop width */
  @Prop() minWidth: number = 50;

  /** Minimum crop height */
  @Prop() minHeight: number = 50;

  /** Show grid overlay */
  @Prop() showGrid: boolean = true;

  /** Circular crop */
  @Prop() circular: boolean = false;

  /** Zoom range min */
  @Prop() minZoom: number = 1;

  /** Zoom range max */
  @Prop() maxZoom: number = 3;

  /** Output format */
  @Prop() outputFormat: 'jpeg' | 'png' | 'webp' = 'jpeg';

  /** Output quality */
  @Prop() outputQuality: number = 0.9;

  /** Crop change event */
  @Event() erxCropChange!: EventEmitter<ErxImageCropEvent>;

  /** Crop complete event */
  @Event() erxCropComplete!: EventEmitter<ErxImageCropCompleteEvent>;

  @State() zoom: number = 1;
  @State() rotation: number = 0;
  @State() cropArea: ErxCropArea = { x: 25, y: 25, width: 50, height: 50 };
  @State() isDragging: boolean = false;
  @State() isResizing: boolean = false;
  @State() imageLoaded: boolean = false;

  private containerEl?: HTMLElement;
  private imageEl?: HTMLImageElement;
  private startX: number = 0;
  private startY: number = 0;
  private startCrop: ErxCropArea = { x: 0, y: 0, width: 0, height: 0 };

  @Method()
  async getCroppedImage(): Promise<ErxImageCropCompleteEvent> {
    return new Promise((resolve) => {
      if (!this.imageEl) {
        throw new Error('No image loaded');
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      const naturalWidth = this.imageEl.naturalWidth;
      const naturalHeight = this.imageEl.naturalHeight;

      const cropX = (this.cropArea.x / 100) * naturalWidth;
      const cropY = (this.cropArea.y / 100) * naturalHeight;
      const cropW = (this.cropArea.width / 100) * naturalWidth;
      const cropH = (this.cropArea.height / 100) * naturalHeight;

      canvas.width = cropW;
      canvas.height = cropH;

      if (this.circular) {
        ctx.beginPath();
        ctx.arc(cropW / 2, cropH / 2, Math.min(cropW, cropH) / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
      }

      ctx.drawImage(
        this.imageEl,
        cropX, cropY, cropW, cropH,
        0, 0, cropW, cropH
      );

      canvas.toBlob(
        (blob) => {
          const dataUrl = canvas.toDataURL(`image/${this.outputFormat}`, this.outputQuality);
          const result: ErxImageCropCompleteEvent = {
            dataUrl,
            blob: blob!,
            cropArea: {
              x: cropX,
              y: cropY,
              width: cropW,
              height: cropH,
            },
          };
          this.erxCropComplete.emit(result);
          resolve(result);
        },
        `image/${this.outputFormat}`,
        this.outputQuality
      );
    });
  }

  @Method()
  async setZoom(zoom: number): Promise<void> {
    this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
  }

  @Method()
  async rotate(degrees: number): Promise<void> {
    this.rotation = (this.rotation + degrees) % 360;
  }

  @Method()
  async reset(): Promise<void> {
    this.zoom = 1;
    this.rotation = 0;
    this.cropArea = { x: 25, y: 25, width: 50, height: 50 };
  }

  private handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    this.isDragging = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.startCrop = { ...this.cropArea };

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDragging || !this.containerEl) return;

    const rect = this.containerEl.getBoundingClientRect();
    const deltaX = ((e.clientX - this.startX) / rect.width) * 100;
    const deltaY = ((e.clientY - this.startY) / rect.height) * 100;

    let newX = this.startCrop.x + deltaX;
    let newY = this.startCrop.y + deltaY;

    // Constrain to bounds
    newX = Math.max(0, Math.min(100 - this.cropArea.width, newX));
    newY = Math.max(0, Math.min(100 - this.cropArea.height, newY));

    this.cropArea = { ...this.cropArea, x: newX, y: newY };
    this.emitCropChange();
  };

  private handleMouseUp = () => {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  private handleResize = (corner: string, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.isResizing = true;

    const startX = e.clientX;
    const startY = e.clientY;
    const startCrop = { ...this.cropArea };

    const handleMove = (moveEvent: MouseEvent) => {
      if (!this.containerEl) return;

      const rect = this.containerEl.getBoundingClientRect();
      const deltaX = ((moveEvent.clientX - startX) / rect.width) * 100;
      const deltaY = ((moveEvent.clientY - startY) / rect.height) * 100;

      let newCrop = { ...startCrop };

      switch (corner) {
        case 'se':
          newCrop.width = Math.max(10, startCrop.width + deltaX);
          newCrop.height = this.aspectRatio
            ? newCrop.width / this.aspectRatio
            : Math.max(10, startCrop.height + deltaY);
          break;
        case 'sw':
          newCrop.x = startCrop.x + deltaX;
          newCrop.width = Math.max(10, startCrop.width - deltaX);
          newCrop.height = this.aspectRatio
            ? newCrop.width / this.aspectRatio
            : Math.max(10, startCrop.height + deltaY);
          break;
        case 'ne':
          newCrop.y = startCrop.y + deltaY;
          newCrop.width = Math.max(10, startCrop.width + deltaX);
          newCrop.height = this.aspectRatio
            ? newCrop.width / this.aspectRatio
            : Math.max(10, startCrop.height - deltaY);
          break;
        case 'nw':
          newCrop.x = startCrop.x + deltaX;
          newCrop.y = startCrop.y + deltaY;
          newCrop.width = Math.max(10, startCrop.width - deltaX);
          newCrop.height = this.aspectRatio
            ? newCrop.width / this.aspectRatio
            : Math.max(10, startCrop.height - deltaY);
          break;
      }

      // Constrain to bounds
      newCrop.x = Math.max(0, Math.min(100 - newCrop.width, newCrop.x));
      newCrop.y = Math.max(0, Math.min(100 - newCrop.height, newCrop.y));
      newCrop.width = Math.min(100 - newCrop.x, newCrop.width);
      newCrop.height = Math.min(100 - newCrop.y, newCrop.height);

      this.cropArea = newCrop;
      this.emitCropChange();
    };

    const handleUp = () => {
      this.isResizing = false;
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
  };

  private emitCropChange(): void {
    if (!this.imageEl) return;

    const naturalWidth = this.imageEl.naturalWidth;
    const naturalHeight = this.imageEl.naturalHeight;

    this.erxCropChange.emit({
      cropArea: this.cropArea,
      cropAreaPixels: {
        x: (this.cropArea.x / 100) * naturalWidth,
        y: (this.cropArea.y / 100) * naturalHeight,
        width: (this.cropArea.width / 100) * naturalWidth,
        height: (this.cropArea.height / 100) * naturalHeight,
      },
      zoom: this.zoom,
      rotation: this.rotation,
    });
  }

  private handleZoomChange = (e: Event) => {
    this.zoom = parseFloat((e.target as HTMLInputElement).value);
    this.emitCropChange();
  };

  render() {
    return (
      <div class="erx-crop" part="container">
        {/* Image container */}
        <div
          class="erx-crop__container"
          ref={el => this.containerEl = el}
          part="image-container"
        >
          {this.src && (
            <img
              ref={el => this.imageEl = el}
              src={this.src}
              class="erx-crop__image"
              style={{
                transform: `scale(${this.zoom}) rotate(${this.rotation}deg)`,
              }}
              onLoad={() => this.imageLoaded = true}
              part="image"
            />
          )}

          {/* Overlay */}
          <div class="erx-crop__overlay" part="overlay">
            <div
              class={{
                'erx-crop__area': true,
                'erx-crop__area--circular': this.circular,
              }}
              style={{
                left: `${this.cropArea.x}%`,
                top: `${this.cropArea.y}%`,
                width: `${this.cropArea.width}%`,
                height: `${this.cropArea.height}%`,
              }}
              onMouseDown={this.handleMouseDown}
              part="crop-area"
            >
              {/* Grid */}
              {this.showGrid && (
                <div class="erx-crop__grid">
                  <div class="erx-crop__grid-line erx-crop__grid-line--h1" />
                  <div class="erx-crop__grid-line erx-crop__grid-line--h2" />
                  <div class="erx-crop__grid-line erx-crop__grid-line--v1" />
                  <div class="erx-crop__grid-line erx-crop__grid-line--v2" />
                </div>
              )}

              {/* Resize handles */}
              <div class="erx-crop__handle erx-crop__handle--nw" onMouseDown={(e) => this.handleResize('nw', e)} />
              <div class="erx-crop__handle erx-crop__handle--ne" onMouseDown={(e) => this.handleResize('ne', e)} />
              <div class="erx-crop__handle erx-crop__handle--sw" onMouseDown={(e) => this.handleResize('sw', e)} />
              <div class="erx-crop__handle erx-crop__handle--se" onMouseDown={(e) => this.handleResize('se', e)} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div class="erx-crop__controls" part="controls">
          <div class="erx-crop__zoom">
            <span>🔍</span>
            <input
              type="range"
              min={this.minZoom}
              max={this.maxZoom}
              step="0.1"
              value={this.zoom}
              onInput={this.handleZoomChange}
              class="erx-crop__zoom-slider"
            />
            <span>{Math.round(this.zoom * 100)}%</span>
          </div>

          <div class="erx-crop__rotation">
            <button class="erx-crop__btn" onClick={() => this.rotate(-90)}>↺</button>
            <button class="erx-crop__btn" onClick={() => this.rotate(90)}>↻</button>
          </div>

          <button class="erx-crop__btn" onClick={() => this.reset()}>Reset</button>
        </div>
      </div>
    );
  }
}
