import { Component, Prop, State, Event, EventEmitter, h, Element, Method } from '@stencil/core';
import { AutocompleteOption, AutocompleteConfig, AutocompleteSelectDetail, AutocompleteSearchDetail } from './erx-autocomplete.types';

@Component({
  tag: 'erx-autocomplete',
  styleUrl: 'erx-autocomplete.css',
  shadow: true,
})
export class ErxAutocomplete {
  @Element() el!: HTMLElement;

  @Prop() options: AutocompleteOption[] = [];
  @Prop() value?: string;
  @Prop() placeholder = 'Search...';
  @Prop() config: AutocompleteConfig = {};
  @Prop() disabled = false;
  @Prop() loading = false;
  @Prop() label?: string;

  @State() query = '';
  @State() isOpen = false;
  @State() highlightedIndex = -1;
  @State() filteredOptions: AutocompleteOption[] = [];

  private inputRef?: HTMLInputElement;
  private debounceTimer?: ReturnType<typeof setTimeout>;

  @Event() erxSelect!: EventEmitter<AutocompleteSelectDetail>;
  @Event() erxSearch!: EventEmitter<AutocompleteSearchDetail>;
  @Event() erxClear!: EventEmitter<void>;

  componentWillLoad() {
    if (this.value) {
      const option = this.options.find(o => o.value === this.value);
      if (option) {
        this.query = option.label;
      }
    }
  }

  @Method()
  async clear(): Promise<void> {
    this.query = '';
    this.filteredOptions = [];
    this.isOpen = false;
    this.erxClear.emit();
  }

  @Method()
  async setFocus(): Promise<void> {
    this.inputRef?.focus();
  }

  private get minChars(): number {
    return this.config.minChars ?? 1;
  }

  private get debounce(): number {
    return this.config.debounce ?? 300;
  }

  private get maxResults(): number {
    return this.config.maxResults ?? 10;
  }

  private handleInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    this.query = value;
    this.highlightedIndex = -1;

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    if (value.length < this.minChars) {
      this.filteredOptions = [];
      this.isOpen = false;
      return;
    }

    this.debounceTimer = setTimeout(() => {
      if (this.config.async) {
        this.erxSearch.emit({ query: value });
      } else {
        this.filterOptions(value);
      }
      this.isOpen = true;
    }, this.debounce);
  };

  private filterOptions(query: string) {
    const lower = query.toLowerCase();
    this.filteredOptions = this.options
      .filter(opt => opt.label.toLowerCase().includes(lower) || opt.description?.toLowerCase().includes(lower))
      .slice(0, this.maxResults);
  }

  private handleFocus = () => {
    if (this.query.length >= this.minChars) {
      this.isOpen = true;
    }
  };

  private handleBlur = () => {
    setTimeout(() => {
      this.isOpen = false;
    }, 200);
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (!this.isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        this.isOpen = true;
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.filteredOptions.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (this.highlightedIndex >= 0 && this.filteredOptions[this.highlightedIndex]) {
          this.selectOption(this.filteredOptions[this.highlightedIndex]);
        } else if (this.config.allowCustom && this.query) {
          this.selectCustom();
        }
        break;
      case 'Escape':
        this.isOpen = false;
        break;
    }
  };

  private selectOption(option: AutocompleteOption) {
    this.query = option.label;
    this.isOpen = false;
    this.erxSelect.emit({ option, isCustom: false });
  }

  private selectCustom() {
    const customOption: AutocompleteOption = {
      value: this.query,
      label: this.query,
    };
    this.isOpen = false;
    this.erxSelect.emit({ option: customOption, isCustom: true });
  }

  private highlightMatch(text: string): string {
    if (!this.config.highlightMatch || !this.query) return text;
    const regex = new RegExp(`(${this.query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  render() {
    return (
      <div
        class={{
          'erx-auto': true,
          'erx-auto--disabled': this.disabled,
          'erx-auto--open': this.isOpen,
        }}
        part="container"
      >
        {this.label && <label class="erx-auto__label">{this.label}</label>}

        <div class="erx-auto__input-wrapper">
          <input
            ref={el => (this.inputRef = el)}
            type="text"
            class="erx-auto__input"
            placeholder={this.placeholder}
            value={this.query}
            disabled={this.disabled}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            autocomplete="off"
            part="input"
          />
          {this.loading && <span class="erx-auto__spinner"></span>}
          {this.query && !this.loading && (
            <button class="erx-auto__clear" onClick={() => this.clear()} type="button">
              ×
            </button>
          )}
        </div>

        {this.isOpen && (
          <div class="erx-auto__dropdown" part="dropdown">
            {this.filteredOptions.length > 0 ? (
              <ul class="erx-auto__list">
                {this.filteredOptions.map((option, index) => (
                  <li
                    class={{
                      'erx-auto__option': true,
                      'erx-auto__option--highlighted': index === this.highlightedIndex,
                      'erx-auto__option--disabled': !!option.disabled,
                    }}
                    key={option.value}
                    onClick={() => !option.disabled && this.selectOption(option)}
                  >
                    {option.image && <img src={option.image} alt="" class="erx-auto__option-img" />}
                    {option.icon && <span class="erx-auto__option-icon">{option.icon}</span>}
                    <div class="erx-auto__option-content">
                      <span class="erx-auto__option-label" innerHTML={this.highlightMatch(option.label)}></span>
                      {option.description && (
                        <span class="erx-auto__option-desc">{option.description}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div class="erx-auto__empty">
                {this.loading ? 'Loading...' : 'No results found'}
              </div>
            )}

            {this.config.allowCustom && this.query && !this.filteredOptions.some(o => o.label.toLowerCase() === this.query.toLowerCase()) && (
              <div class="erx-auto__custom" onClick={() => this.selectCustom()}>
                <span class="erx-auto__custom-label">Create "{this.query}"</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
