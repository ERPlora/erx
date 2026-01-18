import { Component, Prop, Event, EventEmitter, State, h, Method } from '@stencil/core';
import { ErxColorFormat, ErxColorChangeEvent } from './erx-color-picker.types';

@Component({
  tag: 'erx-color-picker',
  styleUrl: 'erx-color-picker.css',
  shadow: true,
})
export class ErxColorPicker {
  /** Selected color value */
  @Prop({ mutable: true }) value: string = '#667eea';

  /** Color format */
  @Prop() format: ErxColorFormat = 'hex';

  /** Show alpha/opacity slider */
  @Prop() showAlpha: boolean = false;

  /** Preset colors */
  @Prop() presets: string[] = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308',
    '#84cc16', '#22c55e', '#14b8a6', '#06b6d4',
    '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6',
    '#a855f7', '#d946ef', '#ec4899', '#f43f5e',
  ];

  /** Show input field */
  @Prop() showInput: boolean = true;

  /** Show preset colors */
  @Prop() showPresets: boolean = true;

  /** Disabled state */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Color change event */
  @Event() erxChange!: EventEmitter<ErxColorChangeEvent>;

  @State() isOpen: boolean = false;
  @State() hue: number = 0;
  @State() saturation: number = 100;
  @State() lightness: number = 50;
  @State() alpha: number = 1;

  componentWillLoad() {
    this.parseColor(this.value);
  }

  @Method()
  async setColor(color: string): Promise<void> {
    this.parseColor(color);
    this.emitChange();
  }

  private parseColor(color: string): void {
    // Parse hex color
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const hsl = this.rgbToHsl(r, g, b);
      this.hue = hsl.h;
      this.saturation = hsl.s;
      this.lightness = hsl.l;
      if (hex.length === 8) {
        this.alpha = parseInt(hex.slice(6, 8), 16) / 255;
      }
    }
  }

  private rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  private hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  private getHex(): string {
    const rgb = this.hslToRgb(this.hue, this.saturation, this.lightness);
    const hex = '#' +
      rgb.r.toString(16).padStart(2, '0') +
      rgb.g.toString(16).padStart(2, '0') +
      rgb.b.toString(16).padStart(2, '0');

    if (this.showAlpha && this.alpha < 1) {
      return hex + Math.round(this.alpha * 255).toString(16).padStart(2, '0');
    }
    return hex;
  }

  private emitChange(): void {
    const rgb = this.hslToRgb(this.hue, this.saturation, this.lightness);
    const hex = this.getHex();

    this.value = hex;

    this.erxChange.emit({
      value: hex,
      hex,
      rgb: { ...rgb, a: this.alpha },
      hsl: { h: this.hue, s: this.saturation, l: this.lightness, a: this.alpha },
    });
  }

  private handleSaturationLightness = (e: MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    this.saturation = x * 100;
    this.lightness = 100 - y * 100;
    this.emitChange();
  };

  private handleHueChange = (e: Event) => {
    this.hue = parseFloat((e.target as HTMLInputElement).value);
    this.emitChange();
  };

  private handleAlphaChange = (e: Event) => {
    this.alpha = parseFloat((e.target as HTMLInputElement).value);
    this.emitChange();
  };

  private handleInputChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    if (value.startsWith('#') && (value.length === 7 || value.length === 9)) {
      this.parseColor(value);
      this.emitChange();
    }
  };

  private selectPreset(color: string): void {
    this.parseColor(color);
    this.emitChange();
  }

  render() {
    const currentColor = this.getHex();
    const hueColor = `hsl(${this.hue}, 100%, 50%)`;

    return (
      <div class="erx-cp" part="container">
        {/* Color trigger */}
        <button
          class="erx-cp__trigger"
          style={{ backgroundColor: currentColor }}
          onClick={() => this.isOpen = !this.isOpen}
          disabled={this.disabled}
          part="trigger"
        />

        {/* Picker panel */}
        {this.isOpen && (
          <div class="erx-cp__panel" part="panel">
            {/* Saturation/Lightness area */}
            <div
              class="erx-cp__sl-area"
              style={{ backgroundColor: hueColor }}
              onClick={this.handleSaturationLightness}
              onMouseMove={(e) => e.buttons === 1 && this.handleSaturationLightness(e)}
              part="sl-area"
            >
              <div class="erx-cp__sl-white" />
              <div class="erx-cp__sl-black" />
              <div
                class="erx-cp__sl-cursor"
                style={{
                  left: `${this.saturation}%`,
                  top: `${100 - this.lightness}%`,
                  backgroundColor: currentColor,
                }}
              />
            </div>

            {/* Hue slider */}
            <div class="erx-cp__slider-row">
              <div
                class="erx-cp__color-preview"
                style={{ backgroundColor: currentColor }}
              />
              <input
                type="range"
                min="0"
                max="360"
                value={this.hue}
                onInput={this.handleHueChange}
                class="erx-cp__hue-slider"
                part="hue-slider"
              />
            </div>

            {/* Alpha slider */}
            {this.showAlpha && (
              <div class="erx-cp__slider-row">
                <span class="erx-cp__label">Alpha</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={this.alpha}
                  onInput={this.handleAlphaChange}
                  class="erx-cp__alpha-slider"
                  part="alpha-slider"
                />
                <span class="erx-cp__alpha-value">{Math.round(this.alpha * 100)}%</span>
              </div>
            )}

            {/* Input */}
            {this.showInput && (
              <input
                type="text"
                class="erx-cp__input"
                value={currentColor}
                onInput={this.handleInputChange}
                part="input"
              />
            )}

            {/* Presets */}
            {this.showPresets && this.presets.length > 0 && (
              <div class="erx-cp__presets" part="presets">
                {this.presets.map(color => (
                  <button
                    class={{
                      'erx-cp__preset': true,
                      'erx-cp__preset--active': color.toLowerCase() === currentColor.toLowerCase(),
                    }}
                    style={{ backgroundColor: color }}
                    onClick={() => this.selectPreset(color)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
