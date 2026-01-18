import { Component, Prop, State, h, Element, Watch, Method } from '@stencil/core';
import { ErxQrCodeErrorLevel } from './erx-qr-code.types';

@Component({
  tag: 'erx-qr-code',
  styleUrl: 'erx-qr-code.css',
  shadow: true,
})
export class ErxQrCode {
  @Element() el!: HTMLElement;

  /** Data to encode */
  @Prop() value: string = '';

  /** Size in pixels */
  @Prop() size: number = 200;

  /** Error correction level */
  @Prop() errorLevel: ErxQrCodeErrorLevel = 'M';

  /** Foreground color */
  @Prop() color: string = '#000000';

  /** Background color */
  @Prop() backgroundColor: string = '#ffffff';

  /** Include margin */
  @Prop() margin: number = 4;

  /** Logo image URL */
  @Prop() logo?: string;

  /** Logo size ratio (0-1) */
  @Prop() logoSize: number = 0.2;

  @State() modules: boolean[][] = [];

  private canvasEl?: HTMLCanvasElement;

  @Watch('value')
  @Watch('errorLevel')
  handleValueChange() {
    this.generateQRCode();
  }

  componentWillLoad() {
    this.generateQRCode();
  }

  componentDidLoad() {
    this.renderCanvas();
  }

  componentDidUpdate() {
    this.renderCanvas();
  }

  @Method()
  async toDataURL(): Promise<string> {
    return this.canvasEl?.toDataURL('image/png') || '';
  }

  @Method()
  async download(filename: string = 'qrcode.png'): Promise<void> {
    const dataUrl = await this.toDataURL();
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  }

  private generateQRCode(): void {
    if (!this.value) {
      this.modules = [];
      return;
    }

    // Simple QR code generation (basic implementation)
    // In production, use a proper library like qrcode-generator
    const size = this.calculateSize();
    this.modules = this.createQRMatrix(this.value, size);
  }

  private calculateSize(): number {
    const length = this.value.length;
    // Simplified version selection
    if (length <= 25) return 21;  // Version 1
    if (length <= 47) return 25;  // Version 2
    if (length <= 77) return 29;  // Version 3
    if (length <= 114) return 33; // Version 4
    return 37; // Version 5
  }

  private createQRMatrix(data: string, size: number): boolean[][] {
    // This is a simplified placeholder - in production use qrcode library
    const matrix: boolean[][] = [];

    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        // Create finder patterns (corners)
        if (this.isFinderPattern(i, j, size)) {
          matrix[i][j] = true;
        }
        // Create timing patterns
        else if (this.isTimingPattern(i, j, size)) {
          matrix[i][j] = (i + j) % 2 === 0;
        }
        // Data area - simple hash based pattern
        else {
          const hash = this.simpleHash(data, i, j);
          matrix[i][j] = hash % 2 === 0;
        }
      }
    }

    return matrix;
  }

  private isFinderPattern(row: number, col: number, size: number): boolean {
    // Top-left finder
    if (row < 7 && col < 7) {
      return this.isInFinderModule(row, col);
    }
    // Top-right finder
    if (row < 7 && col >= size - 7) {
      return this.isInFinderModule(row, col - (size - 7));
    }
    // Bottom-left finder
    if (row >= size - 7 && col < 7) {
      return this.isInFinderModule(row - (size - 7), col);
    }
    return false;
  }

  private isInFinderModule(row: number, col: number): boolean {
    // Outer border
    if (row === 0 || row === 6 || col === 0 || col === 6) return true;
    // Inner square
    if (row >= 2 && row <= 4 && col >= 2 && col <= 4) return true;
    return false;
  }

  private isTimingPattern(row: number, col: number, size: number): boolean {
    return (row === 6 && col > 7 && col < size - 8) ||
           (col === 6 && row > 7 && row < size - 8);
  }

  private simpleHash(data: string, row: number, col: number): number {
    let hash = 0;
    const str = data + row.toString() + col.toString();
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private renderCanvas(): void {
    if (!this.canvasEl || this.modules.length === 0) return;

    const ctx = this.canvasEl.getContext('2d');
    if (!ctx) return;

    const moduleCount = this.modules.length;
    const moduleSize = (this.size - this.margin * 2) / moduleCount;

    // Clear canvas
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.size, this.size);

    // Draw modules
    ctx.fillStyle = this.color;
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (this.modules[row][col]) {
          ctx.fillRect(
            this.margin + col * moduleSize,
            this.margin + row * moduleSize,
            moduleSize,
            moduleSize
          );
        }
      }
    }

    // Draw logo if provided
    if (this.logo) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const logoSize = this.size * this.logoSize;
        const logoX = (this.size - logoSize) / 2;
        const logoY = (this.size - logoSize) / 2;

        // White background for logo
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(logoX - 4, logoY - 4, logoSize + 8, logoSize + 8);

        ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
      };
      img.src = this.logo;
    }
  }

  render() {
    return (
      <div class="erx-qr" part="container">
        <canvas
          ref={el => this.canvasEl = el}
          width={this.size}
          height={this.size}
          class="erx-qr__canvas"
          part="canvas"
        />
        {!this.value && (
          <div class="erx-qr__empty">
            No data
          </div>
        )}
      </div>
    );
  }
}
