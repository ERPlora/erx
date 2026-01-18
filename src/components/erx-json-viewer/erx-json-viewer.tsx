import { Component, Prop, State, h, Method } from '@stencil/core';

@Component({
  tag: 'erx-json-viewer',
  styleUrl: 'erx-json-viewer.css',
  shadow: true,
})
export class ErxJsonViewer {
  /** JSON data to display */
  @Prop() data: unknown = null;

  /** Initial expansion depth */
  @Prop() expandDepth: number = 2;

  /** Show root name */
  @Prop() rootName?: string;

  /** Show data types */
  @Prop() showTypes: boolean = false;

  /** Show array indexes */
  @Prop() showArrayIndexes: boolean = true;

  /** Collapsed by default */
  @Prop() collapsed: boolean = false;

  /** Searchable */
  @Prop() searchable: boolean = false;

  /** Copy button */
  @Prop() copyable: boolean = true;

  /** Max string length before truncation */
  @Prop() maxStringLength: number = 100;

  @State() expandedPaths: Set<string> = new Set();
  @State() searchQuery: string = '';
  @State() copied: boolean = false;

  componentWillLoad() {
    if (!this.collapsed) {
      this.initExpandedPaths(this.data, '', 0);
    }
  }

  private initExpandedPaths(data: unknown, path: string, depth: number): void {
    if (depth >= this.expandDepth) return;

    if (this.isObject(data) || Array.isArray(data)) {
      this.expandedPaths.add(path || 'root');
      const entries = Array.isArray(data) ? data.map((v, i) => [i, v]) : Object.entries(data as object);
      entries.forEach(([key]) => {
        const newPath = path ? `${path}.${key}` : String(key);
        this.initExpandedPaths((data as Record<string, unknown>)[key as string], newPath, depth + 1);
      });
    }
  }

  @Method()
  async expandAll(): Promise<void> {
    this.initExpandedPaths(this.data, '', Infinity);
    this.expandedPaths = new Set(this.expandedPaths);
  }

  @Method()
  async collapseAll(): Promise<void> {
    this.expandedPaths = new Set();
  }

  @Method()
  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(JSON.stringify(this.data, null, 2));
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    } catch {
      console.error('Failed to copy to clipboard');
    }
  }

  private isObject(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  private getType(value: unknown): string {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  }

  private togglePath(path: string): void {
    const newSet = new Set(this.expandedPaths);
    if (newSet.has(path)) {
      newSet.delete(path);
    } else {
      newSet.add(path);
    }
    this.expandedPaths = newSet;
  }

  private matchesSearch(key: string, value: unknown): boolean {
    if (!this.searchQuery) return true;
    const query = this.searchQuery.toLowerCase();
    if (key.toLowerCase().includes(query)) return true;
    if (typeof value === 'string' && value.toLowerCase().includes(query)) return true;
    if (typeof value === 'number' && String(value).includes(query)) return true;
    return false;
  }

  private renderValue(value: unknown, key: string | number, path: string, depth: number) {
    const type = this.getType(value);
    const isExpanded = this.expandedPaths.has(path || 'root');
    const isExpandable = type === 'object' || type === 'array';

    if (!this.matchesSearch(String(key), value) && !isExpandable) {
      return null;
    }

    return (
      <div class="erx-json__node" style={{ paddingLeft: `${depth * 16}px` }}>
        <div class="erx-json__row">
          {/* Toggle */}
          {isExpandable ? (
            <button
              class="erx-json__toggle"
              onClick={() => this.togglePath(path || 'root')}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          ) : (
            <span class="erx-json__toggle-placeholder" />
          )}

          {/* Key */}
          {key !== undefined && (
            <span class="erx-json__key">
              {this.showArrayIndexes || typeof key === 'string'
                ? `${key}`
                : ''}
              {key !== undefined && ':'}
            </span>
          )}

          {/* Value */}
          {isExpandable ? (
            <span class="erx-json__preview">
              {type === 'array'
                ? `Array(${(value as unknown[]).length})`
                : `Object{${Object.keys(value as object).length}}`}
            </span>
          ) : (
            <span class={`erx-json__value erx-json__value--${type}`}>
              {this.renderPrimitiveValue(value)}
            </span>
          )}

          {/* Type badge */}
          {this.showTypes && (
            <span class="erx-json__type">{type}</span>
          )}
        </div>

        {/* Children */}
        {isExpandable && isExpanded && (
          <div class="erx-json__children">
            {type === 'array'
              ? (value as unknown[]).map((item, i) =>
                  this.renderValue(item, i, `${path}.${i}`, depth + 1)
                )
              : Object.entries(value as object).map(([k, v]) =>
                  this.renderValue(v, k, `${path}.${k}`, depth + 1)
                )}
          </div>
        )}
      </div>
    );
  }

  private renderPrimitiveValue(value: unknown): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') {
      const display = value.length > this.maxStringLength
        ? value.substring(0, this.maxStringLength) + '...'
        : value;
      return `"${display}"`;
    }
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    return String(value);
  }

  render() {
    return (
      <div class="erx-json" part="container">
        {/* Toolbar */}
        <div class="erx-json__toolbar" part="toolbar">
          {this.searchable && (
            <input
              type="text"
              class="erx-json__search"
              placeholder="Search..."
              value={this.searchQuery}
              onInput={(e) => this.searchQuery = (e.target as HTMLInputElement).value}
            />
          )}
          <div class="erx-json__actions">
            <button class="erx-json__btn" onClick={() => this.expandAll()}>
              Expand All
            </button>
            <button class="erx-json__btn" onClick={() => this.collapseAll()}>
              Collapse All
            </button>
            {this.copyable && (
              <button class="erx-json__btn" onClick={() => this.copyToClipboard()}>
                {this.copied ? '✓ Copied' : 'Copy'}
              </button>
            )}
          </div>
        </div>

        {/* Tree */}
        <div class="erx-json__tree" part="tree">
          {this.rootName && (
            <span class="erx-json__root-name">{this.rootName}:</span>
          )}
          {this.data !== undefined
            ? this.renderValue(this.data, '', '', 0)
            : <span class="erx-json__empty">No data</span>}
        </div>
      </div>
    );
  }
}
