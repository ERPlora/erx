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
  ErxColumn,
  ErxSortState,
  ErxFilterState,
  ErxSortEvent,
  ErxFilterEvent,
  ErxRowSelectEvent,
  ErxRowClickEvent,
  ErxCellEditEvent,
  ErxCellEditStartEvent,
  ErxPageChangeEvent,
} from './erx-data-grid.types';

@Component({
  tag: 'erx-data-grid',
  styleUrl: 'erx-data-grid.css',
  shadow: true,
})
export class ErxDataGrid {
  @Element() el!: HTMLElement;

  // ========================================
  // Props
  // ========================================

  /** Row data array */
  @Prop() data: Record<string, unknown>[] = [];

  /** Column definitions */
  @Prop() columns: ErxColumn[] = [];

  /** Enable row selection: false, 'single', or 'multiple' */
  @Prop() selectable: boolean | 'single' | 'multiple' = false;

  /** Currently selected row keys */
  @Prop({ mutable: true }) selected: string[] = [];

  /** Field to use as unique row identifier */
  @Prop() rowKey = 'id';

  /** Enable column sorting */
  @Prop() sortable = true;

  /** Enable column filtering */
  @Prop() filterable = false;

  /** Enable inline cell editing */
  @Prop() editable = false;

  /** Field to group rows by */
  @Prop() groupBy?: string;

  /** Enable virtual scrolling for large datasets */
  @Prop() virtualScroll = false;

  /** Row height in pixels for virtual scroll */
  @Prop() rowHeight = 48;

  /** Number of visible rows for virtual scroll */
  @Prop() visibleRows = 15;

  /** Show loading state */
  @Prop() loading = false;

  /** Message when no data */
  @Prop() emptyMessage = 'No data available';

  /** Enable striped rows */
  @Prop({ reflect: true }) striped = false;

  /** Enable row hover effect */
  @Prop({ reflect: true }) hover = true;

  /** Show borders */
  @Prop({ reflect: true }) bordered = false;

  /** Compact row height */
  @Prop({ reflect: true }) compact = false;

  /** Enable pagination */
  @Prop() paginate = false;

  /** Rows per page */
  @Prop({ mutable: true }) pageSize = 25;

  /** Current page (1-indexed) */
  @Prop({ mutable: true }) currentPage = 1;

  /** Total rows (for server-side pagination) */
  @Prop() totalRows?: number;

  // ========================================
  // State
  // ========================================

  @State() sortState: ErxSortState | null = null;
  @State() filterState: ErxFilterState = {};
  @State() expandedGroups: Set<string> = new Set();
  @State() editingCell: { rowKey: string; field: string } | null = null;
  @State() editValue: string = '';
  @State() scrollTop = 0;
  @State() processedData: Record<string, unknown>[] = [];

  private tableBodyRef?: HTMLDivElement;

  // ========================================
  // Events
  // ========================================

  /** Emitted when sort changes */
  @Event() erxSort!: EventEmitter<ErxSortEvent>;

  /** Emitted when filters change */
  @Event() erxFilter!: EventEmitter<ErxFilterEvent>;

  /** Emitted when row selection changes */
  @Event() erxRowSelect!: EventEmitter<ErxRowSelectEvent>;

  /** Emitted when a row is clicked */
  @Event() erxRowClick!: EventEmitter<ErxRowClickEvent>;

  /** Emitted when a row is double-clicked */
  @Event() erxRowDoubleClick!: EventEmitter<ErxRowClickEvent>;

  /** Emitted when cell edit is committed */
  @Event() erxCellEdit!: EventEmitter<ErxCellEditEvent>;

  /** Emitted when cell edit starts */
  @Event() erxCellEditStart!: EventEmitter<ErxCellEditStartEvent>;

  /** Emitted when cell edit is cancelled */
  @Event() erxCellEditCancel!: EventEmitter<ErxCellEditStartEvent>;

  /** Emitted when page changes */
  @Event() erxPageChange!: EventEmitter<ErxPageChangeEvent>;

  // ========================================
  // Watchers
  // ========================================

  @Watch('data')
  @Watch('sortState')
  @Watch('filterState')
  @Watch('groupBy')
  @Watch('currentPage')
  @Watch('pageSize')
  handleDataChange() {
    this.processData();
  }

  // ========================================
  // Lifecycle
  // ========================================

  componentWillLoad() {
    this.processData();
  }

  // ========================================
  // Public Methods
  // ========================================

  /** Select all visible rows */
  @Method()
  async selectAll(): Promise<void> {
    if (this.selectable !== 'multiple') return;
    this.selected = this.processedData.map(row => String(row[this.rowKey]));
    this.emitRowSelect();
  }

  /** Clear all selections */
  @Method()
  async clearSelection(): Promise<void> {
    this.selected = [];
    this.emitRowSelect();
  }

  /** Export data to CSV */
  @Method()
  async exportToCSV(filename = 'export.csv'): Promise<string> {
    const visibleColumns = this.columns.filter(c => !c.hidden);
    const headers = visibleColumns.map(c => c.header).join(',');
    const rows = this.processedData.map(row =>
      visibleColumns
        .map(col => {
          const value = row[col.field];
          const formatted = col.formatter ? col.formatter(value, row) : String(value ?? '');
          return `"${formatted.replace(/"/g, '""')}"`;
        })
        .join(',')
    );
    const csv = [headers, ...rows].join('\n');

    // Trigger download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);

    return csv;
  }

  /** Scroll to a specific row by key */
  @Method()
  async scrollToRow(key: string): Promise<void> {
    const index = this.processedData.findIndex(row => String(row[this.rowKey]) === key);
    if (index >= 0 && this.tableBodyRef) {
      const scrollTop = index * this.rowHeight;
      this.tableBodyRef.scrollTop = scrollTop;
    }
  }

  /** Refresh the grid (re-process data) */
  @Method()
  async refresh(): Promise<void> {
    this.processData();
  }

  // ========================================
  // Private Methods
  // ========================================

  private processData() {
    let result = [...this.data];

    // Apply filters
    if (Object.keys(this.filterState).length > 0) {
      result = this.applyFilters(result);
    }

    // Apply sorting
    if (this.sortState) {
      result = this.applySort(result);
    }

    // Apply grouping
    if (this.groupBy) {
      result = this.applyGrouping(result);
    }

    // Apply pagination (client-side)
    if (this.paginate && !this.totalRows) {
      const start = (this.currentPage - 1) * this.pageSize;
      result = result.slice(start, start + this.pageSize);
    }

    this.processedData = result;
  }

  private applyFilters(data: Record<string, unknown>[]): Record<string, unknown>[] {
    return data.filter(row => {
      return Object.entries(this.filterState).every(([field, filter]) => {
        if (!filter.value) return true;
        const cellValue = String(row[field] ?? '').toLowerCase();
        const filterValue = String(filter.value).toLowerCase();

        switch (filter.operator) {
          case 'equals':
            return cellValue === filterValue;
          case 'startsWith':
            return cellValue.startsWith(filterValue);
          case 'endsWith':
            return cellValue.endsWith(filterValue);
          case 'gt':
            return Number(row[field]) > Number(filter.value);
          case 'lt':
            return Number(row[field]) < Number(filter.value);
          case 'gte':
            return Number(row[field]) >= Number(filter.value);
          case 'lte':
            return Number(row[field]) <= Number(filter.value);
          case 'contains':
          default:
            return cellValue.includes(filterValue);
        }
      });
    });
  }

  private applySort(data: Record<string, unknown>[]): Record<string, unknown>[] {
    if (!this.sortState) return data;
    const { field, direction } = this.sortState;

    return [...data].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      // Handle nulls
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return direction === 'asc' ? -1 : 1;
      if (bVal == null) return direction === 'asc' ? 1 : -1;

      // Compare values
      let comparison = 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return direction === 'desc' ? -comparison : comparison;
    });
  }

  private applyGrouping(data: Record<string, unknown>[]): Record<string, unknown>[] {
    // TODO: Implement grouping logic
    return data;
  }

  private handleSort(column: ErxColumn) {
    if (!column.sortable || !this.sortable) return;

    let newDirection: 'asc' | 'desc' | null = 'asc';
    if (this.sortState?.field === column.field) {
      if (this.sortState.direction === 'asc') {
        newDirection = 'desc';
      } else {
        newDirection = null;
      }
    }

    this.sortState = newDirection ? { field: column.field, direction: newDirection } : null;

    this.erxSort.emit({
      field: column.field,
      direction: newDirection,
      sortState: this.sortState,
    });
  }

  private handleRowClick(row: Record<string, unknown>, index: number, event: MouseEvent) {
    this.erxRowClick.emit({ row, index, originalEvent: event });

    if (this.selectable) {
      const key = String(row[this.rowKey]);
      if (this.selectable === 'single') {
        this.selected = [key];
      } else if (this.selectable === 'multiple') {
        if (event.ctrlKey || event.metaKey) {
          // Toggle selection
          this.selected = this.selected.includes(key)
            ? this.selected.filter(k => k !== key)
            : [...this.selected, key];
        } else if (event.shiftKey && this.selected.length > 0) {
          // Range selection
          const lastKey = this.selected[this.selected.length - 1];
          const lastIndex = this.processedData.findIndex(r => String(r[this.rowKey]) === lastKey);
          const start = Math.min(lastIndex, index);
          const end = Math.max(lastIndex, index);
          const rangeKeys = this.processedData.slice(start, end + 1).map(r => String(r[this.rowKey]));
          this.selected = [...new Set([...this.selected, ...rangeKeys])];
        } else {
          this.selected = [key];
        }
      }
      this.emitRowSelect(row, key);
    }
  }

  private handleRowDoubleClick(row: Record<string, unknown>, index: number, event: MouseEvent) {
    this.erxRowDoubleClick.emit({ row, index, originalEvent: event });
  }

  private emitRowSelect(row?: Record<string, unknown>, key?: string) {
    this.erxRowSelect.emit({
      selectedRows: this.data.filter(r => this.selected.includes(String(r[this.rowKey]))),
      selectedKeys: this.selected,
      row,
      key,
    });
  }

  private handleCheckboxChange(key: string, checked: boolean) {
    if (checked) {
      this.selected = [...this.selected, key];
    } else {
      this.selected = this.selected.filter(k => k !== key);
    }
    this.emitRowSelect();
  }

  private handleSelectAllChange(checked: boolean) {
    if (checked) {
      this.selected = this.processedData.map(row => String(row[this.rowKey]));
    } else {
      this.selected = [];
    }
    this.emitRowSelect();
  }

  private startEdit(row: Record<string, unknown>, column: ErxColumn) {
    if (!this.editable || !column.editable) return;

    const rowKey = String(row[this.rowKey]);
    this.editingCell = { rowKey, field: column.field };
    this.editValue = String(row[column.field] ?? '');

    this.erxCellEditStart.emit({
      row,
      field: column.field,
      rowKey,
    });
  }

  private commitEdit(row: Record<string, unknown>, column: ErxColumn) {
    if (!this.editingCell) return;

    const oldValue = row[column.field];
    let newValue: unknown = this.editValue;

    // Type conversion
    if (column.type === 'number' || column.type === 'currency') {
      newValue = parseFloat(this.editValue) || 0;
    } else if (column.type === 'boolean') {
      newValue = this.editValue === 'true';
    }

    this.erxCellEdit.emit({
      row,
      field: column.field,
      oldValue,
      newValue,
      rowKey: this.editingCell.rowKey,
    });

    this.editingCell = null;
    this.editValue = '';
  }

  private cancelEdit() {
    if (!this.editingCell) return;

    const row = this.data.find(r => String(r[this.rowKey]) === this.editingCell!.rowKey);
    if (row) {
      this.erxCellEditCancel.emit({
        row,
        field: this.editingCell.field,
        rowKey: this.editingCell.rowKey,
      });
    }

    this.editingCell = null;
    this.editValue = '';
  }

  private handleFilterChange(field: string, value: string) {
    if (value) {
      this.filterState = {
        ...this.filterState,
        [field]: { value, operator: 'contains' },
      };
    } else {
      const newState = { ...this.filterState };
      delete newState[field];
      this.filterState = newState;
    }

    this.erxFilter.emit({ filters: this.filterState });
  }

  private handlePageChange(page: number) {
    this.currentPage = page;
    this.erxPageChange.emit({
      page,
      pageSize: this.pageSize,
      total: this.totalRows ?? this.data.length,
    });
  }

  private getVisibleColumns(): ErxColumn[] {
    return this.columns.filter(c => !c.hidden);
  }

  private getTotalPages(): number {
    const total = this.totalRows ?? this.data.length;
    return Math.ceil(total / this.pageSize);
  }

  private formatCellValue(value: unknown, column: ErxColumn, row: Record<string, unknown>): string {
    if (column.formatter) {
      return column.formatter(value, row);
    }

    if (value == null) return '';

    switch (column.type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(Number(value));
      case 'number':
        return new Intl.NumberFormat('en-US').format(Number(value));
      case 'date':
        return new Date(value as string).toLocaleDateString();
      case 'boolean':
        return value ? 'Yes' : 'No';
      default:
        return String(value);
    }
  }

  // ========================================
  // Render
  // ========================================

  private renderHeader() {
    const visibleColumns = this.getVisibleColumns();
    const allSelected =
      this.processedData.length > 0 &&
      this.processedData.every(row => this.selected.includes(String(row[this.rowKey])));
    const someSelected =
      this.selected.length > 0 &&
      this.processedData.some(row => this.selected.includes(String(row[this.rowKey])));

    return (
      <div class="erx-grid__header" part="header">
        <div class="erx-grid__row erx-grid__row--header">
          {this.selectable === 'multiple' && (
            <div class="erx-grid__cell erx-grid__cell--checkbox">
              <input
                type="checkbox"
                checked={allSelected}
                indeterminate={someSelected && !allSelected}
                onChange={(e: Event) =>
                  this.handleSelectAllChange((e.target as HTMLInputElement).checked)
                }
                aria-label="Select all rows"
              />
            </div>
          )}
          {visibleColumns.map(column => (
            <div
              class={{
                'erx-grid__cell': true,
                'erx-grid__cell--header': true,
                'erx-grid__cell--sortable': !!column.sortable && this.sortable,
                'erx-grid__cell--sorted': this.sortState?.field === column.field,
                [`erx-grid__cell--align-${column.align || 'left'}`]: true,
                [column.headerClass || '']: !!column.headerClass,
              }}
              style={{
                width: column.width ? (typeof column.width === 'number' ? `${column.width}px` : column.width) : undefined,
                minWidth: column.minWidth ? `${column.minWidth}px` : undefined,
              }}
              onClick={() => this.handleSort(column)}
              part="header-cell"
            >
              <span class="erx-grid__header-text">{column.header}</span>
              {column.sortable && this.sortable && this.sortState?.field === column.field && (
                <span class="erx-grid__sort-icon" aria-hidden="true">
                  {this.sortState.direction === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </div>
          ))}
        </div>
        {this.filterable && this.renderFilterRow(visibleColumns)}
      </div>
    );
  }

  private renderFilterRow(columns: ErxColumn[]) {
    return (
      <div class="erx-grid__row erx-grid__row--filter">
        {this.selectable === 'multiple' && <div class="erx-grid__cell erx-grid__cell--checkbox" />}
        {columns.map(column => (
          <div
            class="erx-grid__cell erx-grid__cell--filter"
            style={{
              width: column.width ? (typeof column.width === 'number' ? `${column.width}px` : column.width) : undefined,
            }}
          >
            {column.filterable !== false && (
              <input
                type="text"
                class="erx-grid__filter-input"
                placeholder={`Filter ${column.header}...`}
                value={(this.filterState[column.field]?.value as string) ?? ''}
                onInput={(e: Event) =>
                  this.handleFilterChange(column.field, (e.target as HTMLInputElement).value)
                }
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  private renderBody() {
    if (this.loading) {
      return (
        <div class="erx-grid__loading" part="loading">
          <slot name="loading">
            <div class="erx-grid__spinner" />
            <span>Loading...</span>
          </slot>
        </div>
      );
    }

    if (this.processedData.length === 0) {
      return (
        <div class="erx-grid__empty" part="empty">
          <slot name="empty">{this.emptyMessage}</slot>
        </div>
      );
    }

    const visibleColumns = this.getVisibleColumns();

    return (
      <div
        class="erx-grid__body"
        part="body"
        ref={el => (this.tableBodyRef = el)}
        style={{
          maxHeight: this.virtualScroll ? `${this.visibleRows * this.rowHeight}px` : undefined,
        }}
      >
        {this.processedData.map((row, index) => this.renderRow(row, index, visibleColumns))}
      </div>
    );
  }

  private renderRow(row: Record<string, unknown>, index: number, columns: ErxColumn[]) {
    const key = String(row[this.rowKey]);
    const isSelected = this.selected.includes(key);

    return (
      <div
        class={{
          'erx-grid__row': true,
          'erx-grid__row--selected': isSelected,
          'erx-grid__row--even': index % 2 === 0,
          'erx-grid__row--odd': index % 2 !== 0,
        }}
        style={{ height: `${this.rowHeight}px` }}
        onClick={(e: MouseEvent) => this.handleRowClick(row, index, e)}
        onDblClick={(e: MouseEvent) => this.handleRowDoubleClick(row, index, e)}
        part="row"
        role="row"
        aria-selected={isSelected}
      >
        {this.selectable === 'multiple' && (
          <div class="erx-grid__cell erx-grid__cell--checkbox">
            <input
              type="checkbox"
              checked={isSelected}
              onClick={(e: MouseEvent) => e.stopPropagation()}
              onChange={(e: Event) =>
                this.handleCheckboxChange(key, (e.target as HTMLInputElement).checked)
              }
              aria-label={`Select row ${index + 1}`}
            />
          </div>
        )}
        {columns.map(column => this.renderCell(row, column, key))}
      </div>
    );
  }

  private renderCell(row: Record<string, unknown>, column: ErxColumn, rowKey: string) {
    const value = row[column.field];
    const isEditing =
      this.editingCell?.rowKey === rowKey && this.editingCell?.field === column.field;

    if (isEditing) {
      return this.renderEditCell(row, column);
    }

    const displayValue = this.formatCellValue(value, column, row);

    return (
      <div
        class={{
          'erx-grid__cell': true,
          'erx-grid__cell--editable': !!column.editable && this.editable,
          [`erx-grid__cell--align-${column.align || 'left'}`]: true,
          [column.cellClass || '']: !!column.cellClass,
        }}
        style={{
          width: column.width ? (typeof column.width === 'number' ? `${column.width}px` : column.width) : undefined,
          minWidth: column.minWidth ? `${column.minWidth}px` : undefined,
        }}
        onDblClick={(e: MouseEvent) => {
          e.stopPropagation();
          this.startEdit(row, column);
        }}
        part="cell"
        role="gridcell"
      >
        {column.type === 'boolean' ? (
          <span class={`erx-grid__boolean ${value ? 'erx-grid__boolean--true' : 'erx-grid__boolean--false'}`}>
            {displayValue}
          </span>
        ) : (
          displayValue
        )}
      </div>
    );
  }

  private renderEditCell(row: Record<string, unknown>, column: ErxColumn) {
    return (
      <div
        class="erx-grid__cell erx-grid__cell--editing"
        style={{
          width: column.width ? (typeof column.width === 'number' ? `${column.width}px` : column.width) : undefined,
        }}
        part="cell-editing"
      >
        {column.editor === 'select' && column.editorOptions ? (
          <select
            class="erx-grid__edit-input"
            onChange={(e: Event) => {
              this.editValue = (e.target as HTMLSelectElement).value;
            }}
            onBlur={() => this.commitEdit(row, column)}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === 'Enter') this.commitEdit(row, column);
              if (e.key === 'Escape') this.cancelEdit();
            }}
            ref={el => {
              if (el) {
                el.value = this.editValue;
                el.focus();
              }
            }}
          >
            {column.editorOptions.map(opt => (
              <option value={String(opt.value)} selected={String(opt.value) === this.editValue}>{opt.label}</option>
            ))}
          </select>
        ) : column.editor === 'checkbox' || column.type === 'boolean' ? (
          <input
            type="checkbox"
            checked={this.editValue === 'true'}
            onChange={(e: Event) => {
              this.editValue = (e.target as HTMLInputElement).checked ? 'true' : 'false';
              this.commitEdit(row, column);
            }}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === 'Escape') this.cancelEdit();
            }}
            ref={el => el?.focus()}
          />
        ) : (
          <input
            type={column.type === 'number' || column.type === 'currency' ? 'number' : 'text'}
            class="erx-grid__edit-input"
            value={this.editValue}
            onInput={(e: Event) => {
              this.editValue = (e.target as HTMLInputElement).value;
            }}
            onBlur={() => this.commitEdit(row, column)}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === 'Enter') this.commitEdit(row, column);
              if (e.key === 'Escape') this.cancelEdit();
            }}
            ref={el => el?.focus()}
          />
        )}
      </div>
    );
  }

  private renderPagination() {
    if (!this.paginate) return null;

    const totalPages = this.getTotalPages();
    const total = this.totalRows ?? this.data.length;

    return (
      <div class="erx-grid__pagination" part="pagination">
        <span class="erx-grid__pagination-info">
          Showing {(this.currentPage - 1) * this.pageSize + 1} to{' '}
          {Math.min(this.currentPage * this.pageSize, total)} of {total}
        </span>
        <div class="erx-grid__pagination-controls">
          <button
            class="erx-grid__pagination-btn"
            disabled={this.currentPage === 1}
            onClick={() => this.handlePageChange(1)}
            aria-label="First page"
          >
            ««
          </button>
          <button
            class="erx-grid__pagination-btn"
            disabled={this.currentPage === 1}
            onClick={() => this.handlePageChange(this.currentPage - 1)}
            aria-label="Previous page"
          >
            «
          </button>
          <span class="erx-grid__pagination-current">
            Page {this.currentPage} of {totalPages}
          </span>
          <button
            class="erx-grid__pagination-btn"
            disabled={this.currentPage === totalPages}
            onClick={() => this.handlePageChange(this.currentPage + 1)}
            aria-label="Next page"
          >
            »
          </button>
          <button
            class="erx-grid__pagination-btn"
            disabled={this.currentPage === totalPages}
            onClick={() => this.handlePageChange(totalPages)}
            aria-label="Last page"
          >
            »»
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        class={{
          'erx-grid': true,
          'erx-grid--loading': this.loading,
          'erx-grid--striped': this.striped,
          'erx-grid--hover': this.hover,
          'erx-grid--bordered': this.bordered,
          'erx-grid--compact': this.compact,
        }}
        part="container"
        role="grid"
        aria-busy={this.loading}
      >
        <slot name="toolbar" />
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderPagination()}
        <slot name="footer" />
      </div>
    );
  }
}
