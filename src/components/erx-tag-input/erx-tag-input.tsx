import { Component, Prop, State, Event, EventEmitter, h, Method } from '@stencil/core';
import { Tag, TagInputConfig, TagInputChangeDetail } from './erx-tag-input.types';

@Component({
  tag: 'erx-tag-input',
  styleUrl: 'erx-tag-input.css',
  shadow: true,
})
export class ErxTagInput {
  @Prop() tags: Tag[] = [];
  @Prop() suggestions: Tag[] = [];
  @Prop() placeholder = 'Add tag...';
  @Prop() config: TagInputConfig = {};
  @Prop() disabled = false;
  @Prop() label?: string;

  @State() inputValue = '';
  @State() isFocused = false;
  @State() showSuggestions = false;
  @State() currentTags: Tag[] = [];

  private inputRef?: HTMLInputElement;

  @Event() erxChange!: EventEmitter<TagInputChangeDetail>;

  componentWillLoad() {
    this.currentTags = [...this.tags];
  }

  @Method()
  async addTag(tag: Tag): Promise<void> {
    if (this.canAddTag(tag)) {
      this.currentTags = [...this.currentTags, tag];
      this.erxChange.emit({ tags: this.currentTags, added: tag });
    }
  }

  @Method()
  async removeTag(tagId: string): Promise<void> {
    const tag = this.currentTags.find(t => t.id === tagId);
    if (tag) {
      this.currentTags = this.currentTags.filter(t => t.id !== tagId);
      this.erxChange.emit({ tags: this.currentTags, removed: tag });
    }
  }

  @Method()
  async clear(): Promise<void> {
    this.currentTags = [];
    this.inputValue = '';
    this.erxChange.emit({ tags: [] });
  }

  private canAddTag(tag: Tag): boolean {
    if (this.config.maxTags && this.currentTags.length >= this.config.maxTags) {
      return false;
    }
    if (!this.config.allowDuplicates && this.currentTags.some(t => t.label.toLowerCase() === tag.label.toLowerCase())) {
      return false;
    }
    if (this.config.validate) {
      const result = this.config.validate(tag.label);
      if (result !== true) {
        return false;
      }
    }
    return true;
  }

  private handleInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    this.inputValue = value;

    if (this.config.separator && value.includes(this.config.separator)) {
      const parts = value.split(this.config.separator);
      parts.forEach(part => {
        const trimmed = part.trim();
        if (trimmed) {
          this.createTag(trimmed);
        }
      });
      this.inputValue = '';
    }

    this.showSuggestions = value.length > 0 && this.filteredSuggestions.length > 0;
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && this.inputValue.trim()) {
      e.preventDefault();
      this.createTag(this.inputValue.trim());
      this.inputValue = '';
      this.showSuggestions = false;
    } else if (e.key === 'Backspace' && !this.inputValue && this.currentTags.length > 0) {
      const lastTag = this.currentTags[this.currentTags.length - 1];
      if (lastTag.removable !== false) {
        this.removeTag(lastTag.id);
      }
    } else if (e.key === 'Escape') {
      this.showSuggestions = false;
    }
  };

  private createTag(label: string) {
    if (!this.config.allowCustom && !this.suggestions.some(s => s.label.toLowerCase() === label.toLowerCase())) {
      return;
    }

    const existing = this.suggestions.find(s => s.label.toLowerCase() === label.toLowerCase());
    const newTag: Tag = existing || {
      id: `tag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      label,
    };

    this.addTag(newTag);
  }

  private handleSuggestionClick(suggestion: Tag) {
    this.addTag({ ...suggestion });
    this.inputValue = '';
    this.showSuggestions = false;
    this.inputRef?.focus();
  }

  private handleTagRemove(tag: Tag, e: Event) {
    e.stopPropagation();
    if (tag.removable !== false) {
      this.removeTag(tag.id);
    }
  }

  private get filteredSuggestions(): Tag[] {
    const lower = this.inputValue.toLowerCase();
    return this.suggestions.filter(s =>
      s.label.toLowerCase().includes(lower) &&
      !this.currentTags.some(t => t.id === s.id)
    );
  }

  render() {
    const maxReached = this.config.maxTags && this.currentTags.length >= this.config.maxTags;

    return (
      <div
        class={{
          'erx-tags': true,
          'erx-tags--disabled': this.disabled,
          'erx-tags--focused': this.isFocused,
        }}
        part="container"
      >
        {this.label && <label class="erx-tags__label">{this.label}</label>}

        <div class="erx-tags__input-area" onClick={() => this.inputRef?.focus()}>
          {this.currentTags.map(tag => (
            <span
              class="erx-tags__tag"
              style={{ background: tag.color || 'var(--erx-color-primary, #667eea)' }}
              key={tag.id}
            >
              {tag.icon && <span class="erx-tags__tag-icon">{tag.icon}</span>}
              <span class="erx-tags__tag-label">{tag.label}</span>
              {tag.removable !== false && (
                <button
                  class="erx-tags__tag-remove"
                  onClick={(e) => this.handleTagRemove(tag, e)}
                  type="button"
                >
                  ×
                </button>
              )}
            </span>
          ))}

          {!maxReached && (
            <input
              ref={el => (this.inputRef = el)}
              type="text"
              class="erx-tags__input"
              placeholder={this.currentTags.length === 0 ? this.placeholder : ''}
              value={this.inputValue}
              disabled={this.disabled}
              onInput={this.handleInput}
              onKeyDown={this.handleKeyDown}
              onFocus={() => { this.isFocused = true; }}
              onBlur={() => { this.isFocused = false; setTimeout(() => { this.showSuggestions = false; }, 200); }}
              part="input"
            />
          )}
        </div>

        {this.showSuggestions && this.filteredSuggestions.length > 0 && (
          <div class="erx-tags__suggestions" part="suggestions">
            {this.filteredSuggestions.map(suggestion => (
              <div
                class="erx-tags__suggestion"
                key={suggestion.id}
                onClick={() => this.handleSuggestionClick(suggestion)}
              >
                {suggestion.icon && <span class="erx-tags__suggestion-icon">{suggestion.icon}</span>}
                <span class="erx-tags__suggestion-label">{suggestion.label}</span>
              </div>
            ))}
          </div>
        )}

        {this.config.maxTags && (
          <div class="erx-tags__counter">
            {this.currentTags.length} / {this.config.maxTags}
          </div>
        )}
      </div>
    );
  }
}
