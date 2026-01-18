import {
  Component,
  Prop,
  Event,
  EventEmitter,
  State,
  h,
  Element,
  Method,
} from '@stencil/core';
import type { ErxKeyboardLayout, ErxKeyboardInputEvent } from './erx-virtual-keyboard.types';

@Component({
  tag: 'erx-virtual-keyboard',
  styleUrl: 'erx-virtual-keyboard.css',
  shadow: true,
})
export class ErxVirtualKeyboard {
  @Element() el!: HTMLElement;

  // ========================================
  // Props
  // ========================================

  /** Keyboard layout */
  @Prop() layout: ErxKeyboardLayout = 'qwerty';

  /** Target input selector */
  @Prop() target?: string;

  /** Show keyboard */
  @Prop({ mutable: true }) visible = true;

  /** Enable sound feedback */
  @Prop() soundEnabled = false;

  /** Enable haptic feedback */
  @Prop() hapticEnabled = true;

  /** Keyboard theme */
  @Prop() theme: 'light' | 'dark' | 'auto' = 'auto';

  /** Disable keyboard */
  @Prop() disabled = false;

  // ========================================
  // State
  // ========================================

  @State() shifted = false;
  @State() capsLock = false;
  @State() currentValue = '';

  // ========================================
  // Events
  // ========================================

  /** Emitted on key press */
  @Event() erxInput!: EventEmitter<ErxKeyboardInputEvent>;

  /** Emitted on Enter */
  @Event() erxEnter!: EventEmitter<{ value: string }>;

  /** Emitted on keyboard close */
  @Event() erxClose!: EventEmitter<void>;

  // ========================================
  // Public Methods
  // ========================================

  /** Show the keyboard */
  @Method()
  async show(): Promise<void> {
    this.visible = true;
  }

  /** Hide the keyboard */
  @Method()
  async hide(): Promise<void> {
    this.visible = false;
    this.erxClose.emit();
  }

  /** Set input value */
  @Method()
  async setValue(value: string): Promise<void> {
    this.currentValue = value;
  }

  /** Clear input */
  @Method()
  async clear(): Promise<void> {
    this.currentValue = '';
  }

  // ========================================
  // Private Methods
  // ========================================

  private getQwertyLayout(): string[][] {
    return [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
      ['123', 'space', '.', 'enter'],
    ];
  }

  private getNumericLayout(): string[][] {
    return [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['.', '0', 'backspace'],
    ];
  }

  private getPhoneLayout(): string[][] {
    return [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['+', '0', 'backspace'],
      ['space', 'enter'],
    ];
  }

  private getLayout(): string[][] {
    switch (this.layout) {
      case 'numeric': return this.getNumericLayout();
      case 'phone': return this.getPhoneLayout();
      default: return this.getQwertyLayout();
    }
  }

  private handleKeyPress(key: string) {
    if (this.disabled) return;

    // Haptic feedback
    if (this.hapticEnabled && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }

    switch (key) {
      case 'shift':
        this.shifted = !this.shifted;
        break;
      case 'caps':
        this.capsLock = !this.capsLock;
        this.shifted = this.capsLock;
        break;
      case 'backspace':
        this.currentValue = this.currentValue.slice(0, -1);
        this.emitInput(key);
        break;
      case 'enter':
        this.erxEnter.emit({ value: this.currentValue });
        break;
      case 'space':
        this.currentValue += ' ';
        this.emitInput(' ');
        break;
      case '123':
        // Toggle numeric would be implemented with state
        break;
      default:
        const char = (this.shifted || this.capsLock) ? key.toUpperCase() : key;
        this.currentValue += char;
        this.emitInput(char);

        // Reset shift after typing (unless caps lock)
        if (this.shifted && !this.capsLock) {
          this.shifted = false;
        }
    }

    this.updateTarget();
  }

  private emitInput(key: string) {
    this.erxInput.emit({ key, value: this.currentValue });
  }

  private updateTarget() {
    if (!this.target) return;

    const input = document.querySelector(this.target) as HTMLInputElement;
    if (input) {
      input.value = this.currentValue;
      const inputEvent = document.createEvent('Event');
      inputEvent.initEvent('input', true, true);
      input.dispatchEvent(inputEvent);
    }
  }

  private getKeyLabel(key: string): string {
    const labels: Record<string, string> = {
      'shift': '⇧',
      'caps': '⇪',
      'backspace': '⌫',
      'enter': '↵',
      'space': ' ',
      '123': '123',
    };
    return labels[key] || ((this.shifted || this.capsLock) ? key.toUpperCase() : key);
  }

  private getKeyWidth(key: string): string {
    const widths: Record<string, string> = {
      'shift': '1.5',
      'backspace': '1.5',
      'space': '5',
      'enter': '2',
      '123': '1.5',
    };
    return widths[key] || '1';
  }

  // ========================================
  // Render
  // ========================================

  render() {
    if (!this.visible) return null;

    const layout = this.getLayout();

    return (
      <div
        class={{
          'erx-keyboard': true,
          [`erx-keyboard--${this.layout}`]: true,
          [`erx-keyboard--${this.theme}`]: true,
          'erx-keyboard--disabled': this.disabled,
        }}
        part="container"
      >
        {layout.map((row, rowIndex) => (
          <div class="erx-keyboard__row" key={rowIndex}>
            {row.map(key => (
              <button
                class={{
                  'erx-keyboard__key': true,
                  'erx-keyboard__key--special': ['shift', 'caps', 'backspace', 'enter', 'space', '123'].includes(key),
                  'erx-keyboard__key--active': (key === 'shift' && this.shifted) || (key === 'caps' && this.capsLock),
                }}
                style={{ '--key-width': this.getKeyWidth(key) }}
                onClick={() => this.handleKeyPress(key)}
                disabled={this.disabled}
                type="button"
                key={key}
              >
                {this.getKeyLabel(key)}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
