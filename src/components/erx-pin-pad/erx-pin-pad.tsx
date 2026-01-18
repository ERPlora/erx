import {
  Component,
  Prop,
  Event,
  EventEmitter,
  State,
  h,
  Element,
  Method,
  Watch,
} from '@stencil/core';
import type {
  ErxPinPadChangeEvent,
  ErxPinPadSubmitEvent,
  ErxPinPadButtonConfig,
} from './erx-pin-pad.types';

@Component({
  tag: 'erx-pin-pad',
  styleUrl: 'erx-pin-pad.css',
  shadow: true,
})
export class ErxPinPad {
  @Element() el!: HTMLElement;

  // ========================================
  // Props
  // ========================================

  /** Current value */
  @Prop({ mutable: true }) value = '';

  /** Maximum length of the PIN */
  @Prop() maxLength = 4;

  /** Mask the input (show dots instead of numbers) */
  @Prop() masked = true;

  /** Show the value display */
  @Prop() showDisplay = true;

  /** Label text above the display */
  @Prop() label?: string;

  /** Placeholder text when empty */
  @Prop() placeholder = '';

  /** Enable decimal point button */
  @Prop() allowDecimal = false;

  /** Enable negative numbers (adds +/- button) */
  @Prop() allowNegative = false;

  /** Auto-submit when maxLength is reached */
  @Prop() autoSubmit = false;

  /** Disable the entire pin pad */
  @Prop() disabled = false;

  /** Show clear button */
  @Prop() showClear = true;

  /** Show backspace button */
  @Prop() showBackspace = true;

  /** Show submit/enter button */
  @Prop() showSubmit = true;

  /** Custom button layout (3 buttons per row) */
  @Prop() customButtons?: ErxPinPadButtonConfig[];

  /** Enable haptic feedback (vibration) on button press */
  @Prop() hapticFeedback = true;

  /** Sound effect on button press */
  @Prop() soundEnabled = false;

  // ========================================
  // State
  // ========================================

  @State() isNegative = false;
  @State() lastPressed: string | null = null;

  // ========================================
  // Events
  // ========================================

  /** Emitted when value changes */
  @Event() erxChange!: EventEmitter<ErxPinPadChangeEvent>;

  /** Emitted when PIN is submitted (Enter pressed or auto-submit) */
  @Event() erxSubmit!: EventEmitter<ErxPinPadSubmitEvent>;

  /** Emitted when clear is pressed */
  @Event() erxClear!: EventEmitter<void>;

  /** Emitted on each key press */
  @Event() erxKeyPress!: EventEmitter<{ key: string }>;

  // ========================================
  // Watchers
  // ========================================

  @Watch('value')
  handleValueChange(newValue: string) {
    // Check if auto-submit
    if (this.autoSubmit && newValue.length >= this.maxLength) {
      this.erxSubmit.emit({ value: newValue });
    }
  }

  // ========================================
  // Public Methods
  // ========================================

  /** Clear the current value */
  @Method()
  async clear(): Promise<void> {
    this.value = '';
    this.isNegative = false;
    this.emitChange();
    this.erxClear.emit();
  }

  /** Set the value programmatically */
  @Method()
  async setValue(value: string): Promise<void> {
    this.value = value.slice(0, this.maxLength);
    this.emitChange();
  }

  /** Submit the current value */
  @Method()
  async submit(): Promise<void> {
    const finalValue = this.isNegative ? `-${this.value}` : this.value;
    this.erxSubmit.emit({ value: finalValue });
  }

  /** Focus the pin pad */
  @Method()
  async setFocus(): Promise<void> {
    this.el.focus();
  }

  // ========================================
  // Private Methods
  // ========================================

  private handleKeyPress(key: string) {
    if (this.disabled) return;

    // Haptic feedback
    if (this.hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }

    // Visual feedback
    this.lastPressed = key;
    setTimeout(() => {
      this.lastPressed = null;
    }, 100);

    this.erxKeyPress.emit({ key });

    switch (key) {
      case 'backspace':
        this.handleBackspace();
        break;
      case 'clear':
        this.clear();
        break;
      case 'enter':
        this.submit();
        break;
      case 'toggle-sign':
        this.isNegative = !this.isNegative;
        this.emitChange();
        break;
      case '.':
        this.handleDecimal();
        break;
      default:
        this.handleDigit(key);
    }
  }

  private handleDigit(digit: string) {
    if (this.value.length >= this.maxLength) return;
    this.value += digit;
    this.emitChange();
  }

  private handleBackspace() {
    if (this.value.length === 0) return;
    this.value = this.value.slice(0, -1);
    this.emitChange();
  }

  private handleDecimal() {
    if (!this.allowDecimal) return;
    if (this.value.includes('.')) return;
    if (this.value.length >= this.maxLength) return;

    this.value += this.value.length === 0 ? '0.' : '.';
    this.emitChange();
  }

  private emitChange() {
    const finalValue = this.isNegative && this.value ? `-${this.value}` : this.value;
    this.erxChange.emit({
      value: finalValue,
      length: this.value.length,
      complete: this.value.length >= this.maxLength,
    });
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    // Handle keyboard input
    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      this.handleKeyPress(e.key);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      this.handleKeyPress('backspace');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      this.handleKeyPress('enter');
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.handleKeyPress('clear');
    } else if (e.key === '.' && this.allowDecimal) {
      e.preventDefault();
      this.handleKeyPress('.');
    } else if (e.key === '-' && this.allowNegative) {
      e.preventDefault();
      this.handleKeyPress('toggle-sign');
    }
  };

  private getDisplayValue(): string {
    if (!this.value) return this.placeholder;

    const sign = this.isNegative ? '-' : '';
    if (this.masked) {
      return sign + '•'.repeat(this.value.length);
    }
    return sign + this.value;
  }

  private getDefaultButtons(): ErxPinPadButtonConfig[] {
    const buttons: ErxPinPadButtonConfig[] = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' },
      { value: '6', label: '6' },
      { value: '7', label: '7' },
      { value: '8', label: '8' },
      { value: '9', label: '9' },
    ];

    // Bottom row
    if (this.allowNegative) {
      buttons.push({ value: 'toggle-sign', label: '+/-', class: 'erx-pin__btn--action' });
    } else if (this.allowDecimal) {
      buttons.push({ value: '.', label: '.', class: 'erx-pin__btn--action' });
    } else if (this.showClear) {
      buttons.push({ value: 'clear', label: 'C', class: 'erx-pin__btn--action' });
    } else {
      buttons.push({ value: '', label: '', disabled: true });
    }

    buttons.push({ value: '0', label: '0' });

    if (this.showBackspace) {
      buttons.push({ value: 'backspace', label: '⌫', class: 'erx-pin__btn--action' });
    } else if (this.showSubmit) {
      buttons.push({ value: 'enter', label: '↵', class: 'erx-pin__btn--primary' });
    } else {
      buttons.push({ value: '', label: '', disabled: true });
    }

    return buttons;
  }

  // ========================================
  // Render
  // ========================================

  render() {
    const buttons = this.customButtons || this.getDefaultButtons();

    return (
      <div
        class={{
          'erx-pin': true,
          'erx-pin--disabled': this.disabled,
        }}
        part="container"
        tabIndex={this.disabled ? -1 : 0}
        onKeyDown={this.handleKeyDown}
        role="application"
        aria-label="PIN Pad"
      >
        {/* Display */}
        {this.showDisplay && (
          <div class="erx-pin__display" part="display">
            {this.label && <div class="erx-pin__label">{this.label}</div>}
            <div
              class={{
                'erx-pin__value': true,
                'erx-pin__value--empty': !this.value,
                'erx-pin__value--masked': this.masked,
              }}
              aria-live="polite"
            >
              {this.getDisplayValue()}
            </div>
            {this.maxLength > 0 && (
              <div class="erx-pin__dots">
                {Array.from({ length: this.maxLength }).map((_, i) => (
                  <div
                    class={{
                      'erx-pin__dot': true,
                      'erx-pin__dot--filled': i < this.value.length,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Keypad */}
        <div class="erx-pin__keypad" part="keypad">
          {buttons.map(btn => (
            <button
              class={{
                'erx-pin__btn': true,
                'erx-pin__btn--pressed': this.lastPressed === btn.value,
                [btn.class || '']: !!btn.class,
              }}
              disabled={this.disabled || btn.disabled || (!btn.value && !btn.label)}
              onClick={() => btn.value && this.handleKeyPress(btn.value)}
              part="button"
              type="button"
              aria-label={btn.label || btn.value}
            >
              {btn.label || btn.value}
            </button>
          ))}
        </div>

        {/* Submit button (if separate) */}
        {this.showSubmit && this.showBackspace && (
          <button
            class="erx-pin__submit"
            disabled={this.disabled || !this.value}
            onClick={() => this.handleKeyPress('enter')}
            part="submit"
            type="button"
          >
            <slot name="submit-label">Enter</slot>
          </button>
        )}
      </div>
    );
  }
}
