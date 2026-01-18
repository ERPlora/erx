import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';
import { ErxTableColumn, ErxTableSize, ErxTableSortEvent, ErxTableRowClickEvent } from './erx-table.types';

@Component({
  tag: 'erx-table',
  styleUrl: 'erx-table.css',
  shadow: true,
})
export class ErxTable {
  /** Table columns */
  @Prop() columns: ErxTableColumn[] = [];

  /** Table data */
  @Prop() data: Record<string, unknown>[] = [];

  /** Table size */
  @Prop() size: ErxTableSize = 'md';

  /** Striped rows */
  @Prop() striped: boolean = false;

  /** Hoverable rows */
  @Prop() hoverable: boolean = true;

  /** Bordered */
  @Prop() bordered: boolean = false;

  /** Compact */
  @Prop({ reflect: true }) compact: boolean = false;

  /** Fixed header */
  @Prop() stickyHeader: boolean = false;

  /** Empty message */
  @Prop() emptyMessage: string = 'No data available';

  /** Sort event */
  @Event() erxSort!: EventEmitter<ErxTableSortEvent>;

  /** Row click event */
  @Event() erxRowClick!: EventEmitter<ErxTableRowClickEvent>;

  @State() sortColumn?: string;
  @State() sortDirection: 'asc' | 'desc' = 'asc';

  private handleSort(column: ErxTableColumn): void {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.erxSort.emit({
      column: column.key,
      direction: this.sortDirection,
    });
  }

  private handleRowClick(row: Record<string, unknown>, index: number): void {
    this.erxRowClick.emit({ row, index });
  }

  private formatValue(value: unknown, column: ErxTableColumn): string {
    if (value === null || value === undefined) return '-';

    switch (column.format) {
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : String(value);
      case 'currency':
        return typeof value === 'number'
          ? value.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
          : String(value);
      case 'date':
        return value instanceof Date || typeof value === 'string'
          ? new Date(value as string).toLocaleDateString()
          : String(value);
      default:
        return String(value);
    }
  }

  private renderCell(value: unknown, column: ErxTableColumn) {
    const formattedValue = this.formatValue(value, column);

    if (column.format === 'badge') {
      return (
        <span class="erx-table__badge">
          {formattedValue}
        </span>
      );
    }

    return formattedValue;
  }

  render() {
    return (
      <div
        class={{
          'erx-table-wrapper': true,
          'erx-table-wrapper--sticky': this.stickyHeader,
        }}
        part="wrapper"
      >
        <table
          class={{
            'erx-table': true,
            [`erx-table--${this.size}`]: true,
            'erx-table--striped': this.striped,
            'erx-table--hoverable': this.hoverable,
            'erx-table--bordered': this.bordered,
            'erx-table--compact': this.compact,
          }}
          part="table"
        >
          <thead class="erx-table__head" part="head">
            <tr>
              {this.columns.map(col => (
                <th
                  class={{
                    'erx-table__th': true,
                    'erx-table__th--sortable': col.sortable,
                    'erx-table__th--sorted': this.sortColumn === col.key,
                    [`erx-table__th--${col.align || 'left'}`]: true,
                  }}
                  style={{ width: col.width }}
                  onClick={() => this.handleSort(col)}
                  part="th"
                >
                  {col.label}
                  {col.sortable && (
                    <span class="erx-table__sort-icon">
                      {this.sortColumn === col.key
                        ? this.sortDirection === 'asc' ? '▲' : '▼'
                        : '⇅'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody class="erx-table__body" part="body">
            {this.data.length > 0 ? (
              this.data.map((row, index) => (
                <tr
                  class="erx-table__row"
                  onClick={() => this.handleRowClick(row, index)}
                  part="row"
                >
                  {this.columns.map(col => (
                    <td
                      class={{
                        'erx-table__td': true,
                        [`erx-table__td--${col.align || 'left'}`]: true,
                      }}
                      part="td"
                    >
                      {this.renderCell(row[col.key], col)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={this.columns.length} class="erx-table__empty">
                  {this.emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
