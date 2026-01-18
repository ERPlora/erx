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
import type { ErxCalculatorResult } from './erx-calculator.types';

@Component({
  tag: 'erx-calculator',
  styleUrl: 'erx-calculator.css',
  shadow: true,
})
export class ErxCalculator {
  @Element() el!: HTMLElement;

  // ========================================
  // Props
  // ========================================

  /** Initial value */
  @Prop() value = '0';

  /** Show memory buttons */
  @Prop() showMemory = false;

  /** Show scientific functions */
  @Prop() showScientific = false;

  /** Decimal precision */
  @Prop() precision = 10;

  /** Currency symbol (for display) */
  @Prop() currency?: string;

  /** Disable calculator */
  @Prop() disabled = false;

  // ========================================
  // State
  // ========================================

  @State() display = '0';
  @State() previousValue = '';
  @State() operator = '';
  @State() waitingForOperand = false;
  @State() memory = 0;

  // ========================================
  // Events
  // ========================================

  /** Emitted when result is calculated */
  @Event() erxResult!: EventEmitter<ErxCalculatorResult>;

  /** Emitted on any input */
  @Event() erxInput!: EventEmitter<{ display: string }>;

  // ========================================
  // Lifecycle
  // ========================================

  componentWillLoad() {
    this.display = this.value;
  }

  // ========================================
  // Public Methods
  // ========================================

  /** Clear the calculator */
  @Method()
  async clear(): Promise<void> {
    this.display = '0';
    this.previousValue = '';
    this.operator = '';
    this.waitingForOperand = false;
  }

  /** Get current value */
  @Method()
  async getValue(): Promise<number> {
    return parseFloat(this.display) || 0;
  }

  /** Set display value */
  @Method()
  async setValue(value: string | number): Promise<void> {
    this.display = String(value);
    this.waitingForOperand = false;
  }

  // ========================================
  // Private Methods
  // ========================================

  private inputDigit(digit: string) {
    if (this.disabled) return;

    if (this.waitingForOperand) {
      this.display = digit;
      this.waitingForOperand = false;
    } else {
      this.display = this.display === '0' ? digit : this.display + digit;
    }
    this.emitInput();
  }

  private inputDecimal() {
    if (this.disabled) return;

    if (this.waitingForOperand) {
      this.display = '0.';
      this.waitingForOperand = false;
    } else if (!this.display.includes('.')) {
      this.display += '.';
    }
    this.emitInput();
  }

  private handleOperator(nextOperator: string) {
    if (this.disabled) return;

    const inputValue = parseFloat(this.display);

    if (this.operator && !this.waitingForOperand) {
      const result = this.calculate(parseFloat(this.previousValue), inputValue, this.operator);
      this.display = this.formatResult(result);
      this.previousValue = this.display;
    } else {
      this.previousValue = this.display;
    }

    this.operator = nextOperator;
    this.waitingForOperand = true;
    this.emitInput();
  }

  private calculate(left: number, right: number, op: string): number {
    switch (op) {
      case '+': return left + right;
      case '-': return left - right;
      case '×':
      case '*': return left * right;
      case '÷':
      case '/': return right !== 0 ? left / right : 0;
      case '%': return left % right;
      default: return right;
    }
  }

  private formatResult(value: number): string {
    // Handle very large or small numbers
    if (Math.abs(value) > 1e15 || (Math.abs(value) < 1e-10 && value !== 0)) {
      return value.toExponential(this.precision);
    }

    // Round to precision
    const result = parseFloat(value.toPrecision(this.precision));
    return String(result);
  }

  private handleEquals() {
    if (this.disabled) return;

    if (!this.operator) return;

    const inputValue = parseFloat(this.display);
    const result = this.calculate(parseFloat(this.previousValue), inputValue, this.operator);
    const expression = `${this.previousValue} ${this.operator} ${this.display}`;

    this.display = this.formatResult(result);
    this.previousValue = '';
    this.operator = '';
    this.waitingForOperand = true;

    this.erxResult.emit({
      display: this.display,
      value: result,
      expression,
    });
  }

  private handleClear() {
    this.clear();
    this.emitInput();
  }

  private handleClearEntry() {
    this.display = '0';
    this.waitingForOperand = false;
    this.emitInput();
  }

  private handleBackspace() {
    if (this.disabled || this.waitingForOperand) return;

    this.display = this.display.length > 1 ? this.display.slice(0, -1) : '0';
    this.emitInput();
  }

  private handlePercent() {
    if (this.disabled) return;

    const value = parseFloat(this.display);
    this.display = this.formatResult(value / 100);
    this.emitInput();
  }

  private handleNegate() {
    if (this.disabled) return;

    const value = parseFloat(this.display);
    this.display = this.formatResult(-value);
    this.emitInput();
  }

  private handleSquareRoot() {
    if (this.disabled) return;

    const value = parseFloat(this.display);
    this.display = this.formatResult(Math.sqrt(value));
    this.emitInput();
  }

  // Memory functions
  private memoryClear() {
    this.memory = 0;
  }

  private memoryRecall() {
    this.display = String(this.memory);
    this.waitingForOperand = true;
    this.emitInput();
  }

  private memoryAdd() {
    this.memory += parseFloat(this.display);
  }

  private memorySubtract() {
    this.memory -= parseFloat(this.display);
  }

  private emitInput() {
    this.erxInput.emit({ display: this.display });
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      this.inputDigit(e.key);
    } else if (e.key === '.') {
      e.preventDefault();
      this.inputDecimal();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      e.preventDefault();
      this.handleOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      this.handleEquals();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.handleClear();
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      this.handleBackspace();
    }
  };

  // ========================================
  // Render
  // ========================================

  render() {
    const buttons = [
      { label: 'C', action: () => this.handleClear(), class: 'action' },
      { label: 'CE', action: () => this.handleClearEntry(), class: 'action' },
      { label: '%', action: () => this.handlePercent(), class: 'action' },
      { label: '÷', action: () => this.handleOperator('÷'), class: 'operator' },

      { label: '7', action: () => this.inputDigit('7') },
      { label: '8', action: () => this.inputDigit('8') },
      { label: '9', action: () => this.inputDigit('9') },
      { label: '×', action: () => this.handleOperator('×'), class: 'operator' },

      { label: '4', action: () => this.inputDigit('4') },
      { label: '5', action: () => this.inputDigit('5') },
      { label: '6', action: () => this.inputDigit('6') },
      { label: '−', action: () => this.handleOperator('-'), class: 'operator' },

      { label: '1', action: () => this.inputDigit('1') },
      { label: '2', action: () => this.inputDigit('2') },
      { label: '3', action: () => this.inputDigit('3') },
      { label: '+', action: () => this.handleOperator('+'), class: 'operator' },

      { label: '±', action: () => this.handleNegate(), class: 'action' },
      { label: '0', action: () => this.inputDigit('0') },
      { label: '.', action: () => this.inputDecimal() },
      { label: '=', action: () => this.handleEquals(), class: 'equals' },
    ];

    return (
      <div
        class={{
          'erx-calc': true,
          'erx-calc--disabled': this.disabled,
        }}
        part="container"
        tabIndex={this.disabled ? -1 : 0}
        onKeyDown={this.handleKeyDown}
      >
        {/* Display */}
        <div class="erx-calc__display" part="display">
          {this.previousValue && this.operator && (
            <div class="erx-calc__expression">
              {this.previousValue} {this.operator}
            </div>
          )}
          <div class="erx-calc__value">
            {this.currency && <span class="erx-calc__currency">{this.currency}</span>}
            {this.display}
          </div>
        </div>

        {/* Memory buttons */}
        {this.showMemory && (
          <div class="erx-calc__memory" part="memory">
            <button onClick={() => this.memoryClear()} type="button">MC</button>
            <button onClick={() => this.memoryRecall()} type="button">MR</button>
            <button onClick={() => this.memoryAdd()} type="button">M+</button>
            <button onClick={() => this.memorySubtract()} type="button">M−</button>
          </div>
        )}

        {/* Keypad */}
        <div class="erx-calc__keypad" part="keypad">
          {buttons.map(btn => (
            <button
              class={{
                'erx-calc__btn': true,
                [`erx-calc__btn--${btn.class}`]: !!btn.class,
              }}
              onClick={btn.action}
              disabled={this.disabled}
              type="button"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
