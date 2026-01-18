import { Component, Prop, State, Event, EventEmitter, h, Element, Method } from '@stencil/core';
import { SignatureConfig, SignatureChangeDetail, SignaturePoint } from './erx-signature-pad.types';

@Component({
  tag: 'erx-signature-pad',
  styleUrl: 'erx-signature-pad.css',
  shadow: true,
})
export class ErxSignaturePad {
  @Element() el!: HTMLElement;

  @Prop() config: SignatureConfig = {};
  @Prop() disabled = false;
  @Prop() label?: string;

  @State() isEmpty = true;

  private canvasRef?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
  private isDrawing = false;
  private points: SignaturePoint[] = [];
  private lastPoint?: SignaturePoint;

  @Event() erxChange!: EventEmitter<SignatureChangeDetail>;
  @Event() erxClear!: EventEmitter<void>;

  componentDidLoad() {
    this.initCanvas();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  @Method()
  async clear(): Promise<void> {
    if (this.ctx && this.canvasRef) {
      this.ctx.fillStyle = this.config.backgroundColor || '#ffffff';
      this.ctx.fillRect(0, 0, this.canvasRef.width, this.canvasRef.height);
      this.points = [];
      this.isEmpty = true;
      this.erxClear.emit();
      this.erxChange.emit({ isEmpty: true });
    }
  }

  @Method()
  async toDataURL(format?: 'png' | 'jpeg' | 'svg'): Promise<string> {
    if (!this.canvasRef) return '';
    const fmt = format || this.config.format || 'png';
    const quality = this.config.quality || 0.92;

    if (fmt === 'jpeg') {
      return this.canvasRef.toDataURL('image/jpeg', quality);
    }
    return this.canvasRef.toDataURL('image/png');
  }

  @Method()
  async isEmpty_(): Promise<boolean> {
    return this.isEmpty;
  }

  private get width(): number {
    return this.config.width || 400;
  }

  private get height(): number {
    return this.config.height || 200;
  }

  private get lineWidth(): number {
    return this.config.lineWidth || 2;
  }

  private get lineColor(): string {
    return this.config.lineColor || '#000000';
  }

  private initCanvas() {
    if (!this.canvasRef) return;

    this.ctx = this.canvasRef.getContext('2d')!;
    this.canvasRef.width = this.width;
    this.canvasRef.height = this.height;

    this.ctx.fillStyle = this.config.backgroundColor || '#ffffff';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  private setupEventListeners() {
    if (!this.canvasRef) return;

    // Mouse events
    this.canvasRef.addEventListener('mousedown', this.handleStart);
    this.canvasRef.addEventListener('mousemove', this.handleMove);
    this.canvasRef.addEventListener('mouseup', this.handleEnd);
    this.canvasRef.addEventListener('mouseleave', this.handleEnd);

    // Touch events
    this.canvasRef.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    this.canvasRef.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    this.canvasRef.addEventListener('touchend', this.handleEnd);
  }

  private removeEventListeners() {
    if (!this.canvasRef) return;

    this.canvasRef.removeEventListener('mousedown', this.handleStart);
    this.canvasRef.removeEventListener('mousemove', this.handleMove);
    this.canvasRef.removeEventListener('mouseup', this.handleEnd);
    this.canvasRef.removeEventListener('mouseleave', this.handleEnd);
    this.canvasRef.removeEventListener('touchstart', this.handleTouchStart);
    this.canvasRef.removeEventListener('touchmove', this.handleTouchMove);
    this.canvasRef.removeEventListener('touchend', this.handleEnd);
  }

  private getPointFromEvent(e: MouseEvent | Touch): SignaturePoint {
    const rect = this.canvasRef!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      time: Date.now(),
    };
  }

  private handleStart = (e: MouseEvent) => {
    if (this.disabled) return;
    this.isDrawing = true;
    this.lastPoint = this.getPointFromEvent(e);
    this.points.push(this.lastPoint);
  };

  private handleMove = (e: MouseEvent) => {
    if (!this.isDrawing || this.disabled) return;
    const point = this.getPointFromEvent(e);
    this.drawLine(this.lastPoint!, point);
    this.lastPoint = point;
    this.points.push(point);
  };

  private handleEnd = () => {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.isEmpty = this.points.length === 0;
      this.emitChange();
    }
  };

  private handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    if (this.disabled) return;
    this.isDrawing = true;
    const touch = e.touches[0];
    this.lastPoint = this.getPointFromEvent(touch);
    this.points.push(this.lastPoint);
  };

  private handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!this.isDrawing || this.disabled) return;
    const touch = e.touches[0];
    const point = this.getPointFromEvent(touch);
    this.drawLine(this.lastPoint!, point);
    this.lastPoint = point;
    this.points.push(point);
  };

  private drawLine(from: SignaturePoint, to: SignaturePoint) {
    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
    this.isEmpty = false;
  }

  private async emitChange() {
    const dataUrl = await this.toDataURL();
    this.erxChange.emit({
      isEmpty: this.isEmpty,
      dataUrl: this.isEmpty ? undefined : dataUrl,
    });
  }

  render() {
    return (
      <div
        class={{
          'erx-sig': true,
          'erx-sig--disabled': this.disabled,
        }}
        part="container"
      >
        {this.label && <label class="erx-sig__label">{this.label}</label>}

        <div class="erx-sig__canvas-wrapper" part="canvas-wrapper">
          <canvas
            ref={el => (this.canvasRef = el)}
            class="erx-sig__canvas"
            part="canvas"
          ></canvas>

          {this.isEmpty && (
            <div class="erx-sig__placeholder">Sign here</div>
          )}
        </div>

        <div class="erx-sig__actions" part="actions">
          <button
            class="erx-sig__clear-btn"
            onClick={() => this.clear()}
            disabled={this.disabled || this.isEmpty}
            type="button"
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}
