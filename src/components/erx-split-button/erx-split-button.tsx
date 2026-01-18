import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';
import { ErxSplitButtonSize, ErxSplitButtonVariant, ErxSplitButtonOption } from './erx-split-button.types';

@Component({
  tag: 'erx-split-button',
  styleUrl: 'erx-split-button.css',
  shadow: true,
})
export class ErxSplitButton {
  /** Primary button label */
  @Prop() label = 'Action';

  /** Dropdown options */
  @Prop() options: ErxSplitButtonOption[] = [];

  /** Button size */
  @Prop() size: ErxSplitButtonSize = 'md';

  /** Button variant */
  @Prop() variant: ErxSplitButtonVariant = 'primary';

  /** Disabled state */
  @Prop({ reflect: true }) disabled = false;

  /** Loading state */
  @Prop() loading = false;

  /** Dropdown open state */
  @State() isOpen = false;

  /** Emitted when primary button clicked */
  @Event() erxClick!: EventEmitter<void>;

  /** Emitted when dropdown option selected */
  @Event() erxSelect!: EventEmitter<{ value: string; option: ErxSplitButtonOption }>;

  private handlePrimaryClick = () => {
    if (!this.disabled && !this.loading) {
      this.erxClick.emit();
    }
  };

  private handleToggle = (e: Event) => {
    e.stopPropagation();
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  };

  private handleOptionClick = (option: ErxSplitButtonOption) => {
    if (!option.disabled) {
      this.erxSelect.emit({ value: option.value, option });
      this.isOpen = false;
    }
  };

  private handleBackdropClick = () => {
    this.isOpen = false;
  };

  render() {
    return (
      <div
        class={{
          'erx-sb': true,
          [`erx-sb--${this.size}`]: true,
          [`erx-sb--${this.variant}`]: true,
          'erx-sb--disabled': this.disabled,
          'erx-sb--loading': this.loading,
          'erx-sb--open': this.isOpen,
        }}
        part="container"
      >
        <button
          type="button"
          class="erx-sb__primary"
          part="primary"
          onClick={this.handlePrimaryClick}
          disabled={this.disabled || this.loading}
        >
          {this.loading && <span class="erx-sb__spinner"></span>}
          <span class="erx-sb__label">{this.label}</span>
        </button>

        <button
          type="button"
          class="erx-sb__toggle"
          part="toggle"
          onClick={this.handleToggle}
          disabled={this.disabled}
          aria-expanded={this.isOpen}
          aria-haspopup="menu"
        >
          <span class="erx-sb__arrow">▼</span>
        </button>

        {this.isOpen && (
          <div class="erx-sb__backdrop" onClick={this.handleBackdropClick}></div>
        )}

        {this.isOpen && this.options.length > 0 && (
          <div class="erx-sb__dropdown" part="dropdown" role="menu">
            {this.options.map((option) => (
              <div>
                {option.divider && <div class="erx-sb__divider"></div>}
                <button
                  type="button"
                  class={{
                    'erx-sb__option': true,
                    'erx-sb__option--disabled': option.disabled,
                  }}
                  part="option"
                  role="menuitem"
                  onClick={() => this.handleOptionClick(option)}
                  disabled={option.disabled}
                >
                  {option.icon && <span class="erx-sb__option-icon">{option.icon}</span>}
                  <span class="erx-sb__option-label">{option.label}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
