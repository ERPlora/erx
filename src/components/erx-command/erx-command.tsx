import { Component, Prop, Event, EventEmitter, State, h, Element, Method, Watch, Listen } from '@stencil/core';
import { ErxCommandItem, ErxCommandSelectEvent, ErxCommandOpenEvent, ErxCommandSearchEvent } from './erx-command.types';

@Component({
  tag: 'erx-command',
  styleUrl: 'erx-command.css',
  shadow: true,
})
export class ErxCommand {
  @Element() el!: HTMLElement;

  /** Command items */
  @Prop() items: ErxCommandItem[] = [];

  /** Placeholder text */
  @Prop() placeholder: string = 'Type a command or search...';

  /** Show keyboard shortcut hint */
  @Prop() shortcutHint: string = '⌘K';

  /** Max visible items */
  @Prop() maxResults: number = 10;

  /** Show recent items */
  @Prop() showRecent: boolean = true;

  /** Empty state message */
  @Prop() emptyMessage: string = 'No results found';

  /** Open state */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /** Disabled state */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Command select event */
  @Event() erxSelect!: EventEmitter<ErxCommandSelectEvent>;

  /** Open/close event */
  @Event() erxOpenChange!: EventEmitter<ErxCommandOpenEvent>;

  /** Search event */
  @Event() erxSearch!: EventEmitter<ErxCommandSearchEvent>;

  @State() query: string = '';
  @State() focusedIndex: number = 0;

  private inputEl?: HTMLInputElement;

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    this.erxOpenChange.emit({ open: newValue });
    if (newValue) {
      this.query = '';
      this.focusedIndex = 0;
      setTimeout(() => this.inputEl?.focus(), 50);
    }
  }

  @Listen('keydown', { target: 'document' })
  handleGlobalKeyDown(e: KeyboardEvent) {
    // Cmd/Ctrl + K to open
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      this.open = !this.open;
    }

    // Escape to close
    if (e.key === 'Escape' && this.open) {
      e.preventDefault();
      this.open = false;
    }
  }

  @Method()
  async openPalette(): Promise<void> {
    if (!this.disabled) this.open = true;
  }

  @Method()
  async closePalette(): Promise<void> {
    this.open = false;
  }

  @Method()
  async togglePalette(): Promise<void> {
    if (!this.disabled) this.open = !this.open;
  }

  private get filteredItems(): ErxCommandItem[] {
    let results = this.items;

    if (this.query) {
      const q = this.query.toLowerCase();
      results = results.filter(item => {
        const matchLabel = item.label.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchKeywords = item.keywords?.some(k => k.toLowerCase().includes(q));
        return matchLabel || matchDesc || matchKeywords;
      });
    } else if (this.showRecent) {
      // Show recent items first when no query
      results = [...results].sort((a, b) => {
        if (a.recent && !b.recent) return -1;
        if (!a.recent && b.recent) return 1;
        return 0;
      });
    }

    return results.slice(0, this.maxResults);
  }

  private get groupedItems(): Map<string, ErxCommandItem[]> {
    const groups = new Map<string, ErxCommandItem[]>();

    this.filteredItems.forEach(item => {
      const category = item.category || 'Commands';
      if (!groups.has(category)) {
        groups.set(category, []);
      }
      groups.get(category)!.push(item);
    });

    return groups;
  }

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.query = target.value;
    this.focusedIndex = 0;
    this.erxSearch.emit({ query: this.query });
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    const items = this.filteredItems;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.focusedIndex = (this.focusedIndex + 1) % items.length;
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusedIndex = this.focusedIndex <= 0 ? items.length - 1 : this.focusedIndex - 1;
        break;
      case 'Enter':
        e.preventDefault();
        if (items[this.focusedIndex]) {
          this.selectItem(items[this.focusedIndex]);
        }
        break;
    }
  };

  private handleBackdropClick = () => {
    this.open = false;
  };

  private selectItem(item: ErxCommandItem): void {
    if (item.disabled) return;

    this.erxSelect.emit({
      item,
      query: this.query,
    });

    this.open = false;
  }

  private getFlatIndex(item: ErxCommandItem): number {
    return this.filteredItems.indexOf(item);
  }

  render() {
    if (!this.open) return null;

    const grouped = this.groupedItems;
    const hasResults = this.filteredItems.length > 0;

    return (
      <div class="erx-cmd__backdrop" onClick={this.handleBackdropClick} part="backdrop">
        <div
          class="erx-cmd"
          onClick={e => e.stopPropagation()}
          part="container"
        >
          {/* Search input */}
          <div class="erx-cmd__header" part="header">
            <span class="erx-cmd__search-icon">🔍</span>
            <input
              type="text"
              class="erx-cmd__input"
              ref={el => this.inputEl = el}
              value={this.query}
              placeholder={this.placeholder}
              onInput={this.handleInput}
              onKeyDown={this.handleKeyDown}
              part="input"
            />
            <kbd class="erx-cmd__shortcut">{this.shortcutHint}</kbd>
          </div>

          {/* Results */}
          <div class="erx-cmd__results" part="results">
            {hasResults ? (
              Array.from(grouped.entries()).map(([category, items]) => (
                <div class="erx-cmd__group" part="group">
                  <div class="erx-cmd__group-title" part="group-title">
                    {category}
                  </div>
                  {items.map(item => {
                    const flatIdx = this.getFlatIndex(item);
                    return (
                      <button
                        class={{
                          'erx-cmd__item': true,
                          'erx-cmd__item--focused': flatIdx === this.focusedIndex,
                          'erx-cmd__item--disabled': !!item.disabled,
                          'erx-cmd__item--recent': !!item.recent,
                        }}
                        onClick={() => this.selectItem(item)}
                        onMouseEnter={() => this.focusedIndex = flatIdx}
                        disabled={item.disabled}
                        part="item"
                      >
                        {item.icon && <span class="erx-cmd__item-icon">{item.icon}</span>}
                        <div class="erx-cmd__item-content">
                          <span class="erx-cmd__item-label">{item.label}</span>
                          {item.description && (
                            <span class="erx-cmd__item-desc">{item.description}</span>
                          )}
                        </div>
                        {item.shortcut && (
                          <kbd class="erx-cmd__item-shortcut">{item.shortcut}</kbd>
                        )}
                        {item.recent && (
                          <span class="erx-cmd__item-recent">Recent</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            ) : (
              <div class="erx-cmd__empty" part="empty">
                {this.emptyMessage}
              </div>
            )}
          </div>

          {/* Footer */}
          <div class="erx-cmd__footer" part="footer">
            <span class="erx-cmd__hint">
              <kbd>↑↓</kbd> Navigate
            </span>
            <span class="erx-cmd__hint">
              <kbd>↵</kbd> Select
            </span>
            <span class="erx-cmd__hint">
              <kbd>esc</kbd> Close
            </span>
          </div>
        </div>
      </div>
    );
  }
}
