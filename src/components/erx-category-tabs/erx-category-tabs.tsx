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
import type { ErxCategory, ErxCategorySelectEvent } from './erx-category-tabs.types';

@Component({
  tag: 'erx-category-tabs',
  styleUrl: 'erx-category-tabs.css',
  shadow: true,
})
export class ErxCategoryTabs {
  @Element() el!: HTMLElement;

  private scrollContainer?: HTMLElement;
  private resizeObserver?: ResizeObserver;

  // ========================================
  // Props
  // ========================================

  /** Categories to display */
  @Prop() categories: ErxCategory[] = [];

  /** Currently selected category ID */
  @Prop({ mutable: true }) value?: string | number;

  /** Show "All" category at the beginning */
  @Prop() showAll = true;

  /** Label for "All" category */
  @Prop() allLabel = 'All';

  /** Tab style variant */
  @Prop() variant: 'pills' | 'underline' | 'chips' = 'pills';

  /** Size variant */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /** Show category icons */
  @Prop() showIcons = true;

  /** Show item counts */
  @Prop() showCounts = false;

  /** Allow horizontal scroll */
  @Prop() scrollable = true;

  /** Show scroll indicators/buttons */
  @Prop() showScrollButtons = true;

  /** Center tabs when they fit */
  @Prop() centered = false;

  /** Disable all tabs */
  @Prop() disabled = false;

  // ========================================
  // State
  // ========================================

  @State() canScrollLeft = false;
  @State() canScrollRight = false;

  // ========================================
  // Events
  // ========================================

  /** Emitted when a category is selected */
  @Event() erxSelect!: EventEmitter<ErxCategorySelectEvent>;

  // ========================================
  // Watchers
  // ========================================

  @Watch('categories')
  handleCategoriesChange() {
    this.checkScrollability();
  }

  // ========================================
  // Lifecycle
  // ========================================

  componentDidLoad() {
    this.checkScrollability();
    if (this.scrollContainer) {
      this.scrollContainer.addEventListener('scroll', this.handleScroll);
      this.resizeObserver = new ResizeObserver(() => this.checkScrollability());
      this.resizeObserver.observe(this.scrollContainer);
    }
  }

  disconnectedCallback() {
    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener('scroll', this.handleScroll);
    }
    this.resizeObserver?.disconnect();
  }

  // ========================================
  // Public Methods
  // ========================================

  /** Select a category by ID */
  @Method()
  async select(id: string | number | null): Promise<void> {
    const previousCategory = this.getSelectedCategory();
    this.value = id ?? undefined;

    const category = this.getSelectedCategory();
    if (category || id === null) {
      this.erxSelect.emit({
        category: category || { id: 'all', name: this.allLabel },
        previousCategory,
      });
    }

    // Scroll selected into view
    this.scrollSelectedIntoView();
  }

  /** Scroll to a specific category */
  @Method()
  async scrollToCategory(id: string | number): Promise<void> {
    const tab = this.el.shadowRoot?.querySelector(`[data-id="${id}"]`) as HTMLElement;
    if (tab && this.scrollContainer) {
      const containerRect = this.scrollContainer.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();
      const scrollLeft = tab.offsetLeft - (containerRect.width / 2) + (tabRect.width / 2);
      this.scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }

  // ========================================
  // Private Methods
  // ========================================

  private getSelectedCategory(): ErxCategory | undefined {
    if (!this.value) return undefined;
    return this.categories.find(c => c.id === this.value);
  }

  private handleSelect = (category: ErxCategory | null) => {
    if (this.disabled) return;
    if (category?.disabled) return;

    const previousCategory = this.getSelectedCategory();
    this.value = category?.id;

    this.erxSelect.emit({
      category: category || { id: 'all', name: this.allLabel },
      previousCategory,
    });
  };

  private handleScroll = () => {
    this.checkScrollability();
  };

  private checkScrollability = () => {
    if (!this.scrollContainer) return;

    const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer;
    this.canScrollLeft = scrollLeft > 0;
    this.canScrollRight = scrollLeft + clientWidth < scrollWidth - 1;
  };

  private scroll = (direction: 'left' | 'right') => {
    if (!this.scrollContainer) return;

    const scrollAmount = this.scrollContainer.clientWidth * 0.8;
    const newScrollLeft = this.scrollContainer.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    this.scrollContainer.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  private scrollSelectedIntoView = () => {
    if (!this.value) return;
    requestAnimationFrame(() => this.scrollToCategory(this.value!));
  };

  private renderIcon(icon?: string) {
    if (!icon || !this.showIcons) return null;

    // If it's a URL, render as image
    if (icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('data:')) {
      return <img class="erx-cat__icon erx-cat__icon--img" src={icon} alt="" />;
    }

    // Otherwise render as text/emoji
    return <span class="erx-cat__icon">{icon}</span>;
  }

  // ========================================
  // Render
  // ========================================

  render() {
    const showScrollNav = this.scrollable && this.showScrollButtons && (this.canScrollLeft || this.canScrollRight);

    return (
      <div
        class={{
          'erx-cat': true,
          [`erx-cat--${this.variant}`]: true,
          [`erx-cat--${this.size}`]: true,
          'erx-cat--disabled': this.disabled,
          'erx-cat--centered': this.centered && !this.scrollable,
        }}
        part="container"
      >
        {/* Left scroll button */}
        {showScrollNav && (
          <button
            class={{
              'erx-cat__scroll-btn': true,
              'erx-cat__scroll-btn--left': true,
              'erx-cat__scroll-btn--hidden': !this.canScrollLeft,
            }}
            onClick={() => this.scroll('left')}
            disabled={!this.canScrollLeft}
            type="button"
            aria-label="Scroll left"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Tabs container */}
        <div
          class={{
            'erx-cat__scroll': true,
            'erx-cat__scroll--scrollable': this.scrollable,
          }}
          ref={el => (this.scrollContainer = el)}
          part="scroll"
        >
          <div class="erx-cat__tabs" part="tabs" role="tablist">
            {/* All category */}
            {this.showAll && (
              <button
                class={{
                  'erx-cat__tab': true,
                  'erx-cat__tab--selected': !this.value,
                }}
                onClick={() => this.handleSelect(null)}
                disabled={this.disabled}
                role="tab"
                aria-selected={!this.value}
                data-id="all"
                part="tab"
                type="button"
              >
                <span class="erx-cat__label">{this.allLabel}</span>
              </button>
            )}

            {/* Category tabs */}
            {this.categories.map(category => (
              <button
                class={{
                  'erx-cat__tab': true,
                  'erx-cat__tab--selected': this.value === category.id,
                  'erx-cat__tab--disabled': !!category.disabled,
                }}
                style={category.color ? { '--cat-color': category.color } : {}}
                onClick={() => this.handleSelect(category)}
                disabled={this.disabled || category.disabled}
                role="tab"
                aria-selected={this.value === category.id}
                data-id={category.id}
                part="tab"
                type="button"
              >
                {this.renderIcon(category.icon)}
                <span class="erx-cat__label">{category.name}</span>
                {this.showCounts && category.count !== undefined && (
                  <span class="erx-cat__count">{category.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right scroll button */}
        {showScrollNav && (
          <button
            class={{
              'erx-cat__scroll-btn': true,
              'erx-cat__scroll-btn--right': true,
              'erx-cat__scroll-btn--hidden': !this.canScrollRight,
            }}
            onClick={() => this.scroll('right')}
            disabled={!this.canScrollRight}
            type="button"
            aria-label="Scroll right"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
    );
  }
}
