import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';
import { KanbanCard, KanbanColumn, KanbanConfig, KanbanCardMoveDetail, KanbanCardSelectDetail, KanbanColumnCollapseDetail } from './erx-kanban.types';

@Component({
  tag: 'erx-kanban',
  styleUrl: 'erx-kanban.css',
  shadow: true,
})
export class ErxKanban {
  @Prop() cards: KanbanCard[] = [];
  @Prop() config!: KanbanConfig;

  @State() draggedCard: string | null = null;
  @State() dragOverColumn: string | null = null;
  @State() collapsedColumns: Set<string> = new Set();

  @Event() erxCardMove!: EventEmitter<KanbanCardMoveDetail>;
  @Event() erxCardSelect!: EventEmitter<KanbanCardSelectDetail>;
  @Event() erxColumnCollapse!: EventEmitter<KanbanColumnCollapseDetail>;

  private getCardsForColumn(columnId: string): KanbanCard[] {
    return this.cards
      .filter(c => c.columnId === columnId)
      .sort((a, b) => a.order - b.order);
  }

  private getColumnCardCount(columnId: string): number {
    return this.cards.filter(c => c.columnId === columnId).length;
  }

  private isOverLimit(column: KanbanColumn): boolean {
    if (!column.limit) return false;
    return this.getColumnCardCount(column.id) >= column.limit;
  }

  private handleDragStart(card: KanbanCard, e: DragEvent) {
    if (!this.config.draggable) return;
    this.draggedCard = card.id;
    e.dataTransfer?.setData('text/plain', card.id);
    e.dataTransfer!.effectAllowed = 'move';
  }

  private handleDragOver(columnId: string, e: DragEvent) {
    e.preventDefault();
    this.dragOverColumn = columnId;
  }

  private handleDragLeave() {
    this.dragOverColumn = null;
  }

  private handleDrop(columnId: string, e: DragEvent) {
    e.preventDefault();
    this.dragOverColumn = null;

    if (!this.draggedCard) return;

    const card = this.cards.find(c => c.id === this.draggedCard);
    if (!card) return;

    if (card.columnId !== columnId) {
      const targetColumnCards = this.getCardsForColumn(columnId);
      this.erxCardMove.emit({
        card,
        fromColumn: card.columnId,
        toColumn: columnId,
        newOrder: targetColumnCards.length,
      });
    }

    this.draggedCard = null;
  }

  private handleDragEnd() {
    this.draggedCard = null;
    this.dragOverColumn = null;
  }

  private handleCardClick(card: KanbanCard) {
    this.erxCardSelect.emit({ card });
  }

  private toggleColumn(column: KanbanColumn) {
    if (!this.config.collapsible) return;

    const newCollapsed = new Set(this.collapsedColumns);
    const isCollapsed = newCollapsed.has(column.id);

    if (isCollapsed) {
      newCollapsed.delete(column.id);
    } else {
      newCollapsed.add(column.id);
    }

    this.collapsedColumns = newCollapsed;
    this.erxColumnCollapse.emit({ column, collapsed: !isCollapsed });
  }

  private getPriorityColor(priority?: KanbanCard['priority']): string {
    const colors: Record<string, string> = {
      'urgent': 'var(--erx-color-danger, #ef4444)',
      'high': 'var(--erx-color-warning, #f59e0b)',
      'medium': 'var(--erx-color-primary, #667eea)',
      'low': 'var(--erx-text-tertiary, #9ca3af)',
    };
    return colors[priority || 'low'] || colors['low'];
  }

  render() {
    const { config } = this;

    return (
      <div class="erx-kanban" part="container">
        {config.columns.map(column => {
          const isCollapsed = this.collapsedColumns.has(column.id);
          const cards = this.getCardsForColumn(column.id);
          const cardCount = cards.length;
          const overLimit = this.isOverLimit(column);

          return (
            <div
              class={{
                'erx-kanban__column': true,
                'erx-kanban__column--collapsed': isCollapsed,
                'erx-kanban__column--drag-over': this.dragOverColumn === column.id,
                'erx-kanban__column--over-limit': overLimit,
              }}
              key={column.id}
              onDragOver={(e) => this.handleDragOver(column.id, e)}
              onDragLeave={() => this.handleDragLeave()}
              onDrop={(e) => this.handleDrop(column.id, e)}
              part="column"
            >
              <div
                class="erx-kanban__column-header"
                style={{ borderColor: column.color }}
                onClick={() => config.collapsible && this.toggleColumn(column)}
              >
                <span class="erx-kanban__column-title">{column.title}</span>
                {config.showCardCount && (
                  <span class={{
                    'erx-kanban__column-count': true,
                    'erx-kanban__column-count--over': overLimit,
                  }}>
                    {cardCount}{column.limit && config.showWipLimit ? `/${column.limit}` : ''}
                  </span>
                )}
                {config.collapsible && (
                  <span class="erx-kanban__column-toggle">{isCollapsed ? '▶' : '▼'}</span>
                )}
              </div>

              {!isCollapsed && (
                <div class="erx-kanban__cards" part="cards">
                  {cards.map(card => (
                    <div
                      class={{
                        'erx-kanban__card': true,
                        'erx-kanban__card--dragging': this.draggedCard === card.id,
                      }}
                      key={card.id}
                      draggable={config.draggable}
                      onDragStart={(e) => this.handleDragStart(card, e)}
                      onDragEnd={() => this.handleDragEnd()}
                      onClick={() => this.handleCardClick(card)}
                      part="card"
                    >
                      {card.priority && (
                        <div
                          class="erx-kanban__card-priority"
                          style={{ background: this.getPriorityColor(card.priority) }}
                        ></div>
                      )}

                      {card.labels && card.labels.length > 0 && (
                        <div class="erx-kanban__card-labels">
                          {card.labels.map(label => (
                            <span
                              class="erx-kanban__label"
                              style={{ background: label.color }}
                              key={label.id}
                            ></span>
                          ))}
                        </div>
                      )}

                      <span class="erx-kanban__card-title">{card.title}</span>

                      {card.description && (
                        <p class="erx-kanban__card-desc">{card.description}</p>
                      )}

                      <div class="erx-kanban__card-footer">
                        {card.assignee && (
                          <div class="erx-kanban__card-assignee">
                            {card.assignee.avatar ? (
                              <img src={card.assignee.avatar} alt="" class="erx-kanban__avatar" />
                            ) : (
                              <span class="erx-kanban__avatar">{card.assignee.name.charAt(0)}</span>
                            )}
                          </div>
                        )}

                        <div class="erx-kanban__card-meta">
                          {card.dueDate && (
                            <span class="erx-kanban__card-due">
                              📅 {new Date(card.dueDate).toLocaleDateString()}
                            </span>
                          )}
                          {card.comments !== undefined && card.comments > 0 && (
                            <span class="erx-kanban__card-comments">💬 {card.comments}</span>
                          )}
                          {card.attachments !== undefined && card.attachments > 0 && (
                            <span class="erx-kanban__card-attachments">📎 {card.attachments}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
