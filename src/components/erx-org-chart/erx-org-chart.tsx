import { Component, Prop, Event, EventEmitter, State, h, Element } from '@stencil/core';
import type { ErxOrgNode, ErxOrgChartSelectEvent } from './erx-org-chart.types';

@Component({
  tag: 'erx-org-chart',
  styleUrl: 'erx-org-chart.css',
  shadow: true,
})
export class ErxOrgChart {
  @Element() el!: HTMLElement;

  @Prop() data?: ErxOrgNode;
  @Prop() direction: 'vertical' | 'horizontal' = 'vertical';
  @Prop() collapsible = true;
  @Prop() showAvatar = true;
  @Prop() disabled = false;

  @State() collapsedNodes: Set<string | number> = new Set();

  @Event() erxSelect!: EventEmitter<ErxOrgChartSelectEvent>;

  private toggleCollapse(nodeId: string | number, e: MouseEvent) {
    e.stopPropagation();
    const newSet = new Set(this.collapsedNodes);
    if (newSet.has(nodeId)) {
      newSet.delete(nodeId);
    } else {
      newSet.add(nodeId);
    }
    this.collapsedNodes = newSet;
  }

  private handleSelect(node: ErxOrgNode, path: (string | number)[]) {
    if (this.disabled) return;
    this.erxSelect.emit({ node, path });
  }

  private getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  private renderNode(node: ErxOrgNode, path: (string | number)[] = []): HTMLElement {
    const currentPath = [...path, node.id];
    const isCollapsed = this.collapsedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div class="erx-org__node-wrapper" key={node.id}>
        <div
          class={{ 'erx-org__node': true, 'erx-org__node--collapsed': isCollapsed }}
          onClick={() => this.handleSelect(node, currentPath)}
          part="node"
        >
          {this.showAvatar && (
            <div class="erx-org__avatar">
              {node.avatar ? (
                <img src={node.avatar} alt={node.name} />
              ) : (
                <span>{this.getInitials(node.name)}</span>
              )}
            </div>
          )}
          <div class="erx-org__info">
            <span class="erx-org__name">{node.name}</span>
            {node.title && <span class="erx-org__title">{node.title}</span>}
            {node.department && <span class="erx-org__dept">{node.department}</span>}
          </div>
          {this.collapsible && hasChildren && (
            <button
              class="erx-org__toggle"
              onClick={(e) => this.toggleCollapse(node.id, e)}
              type="button"
              aria-label={isCollapsed ? 'Expand' : 'Collapse'}
            >
              {isCollapsed ? '+' : '−'}
            </button>
          )}
        </div>

        {hasChildren && !isCollapsed && (
          <div class="erx-org__children">
            {node.children!.map(child => this.renderNode(child, currentPath))}
          </div>
        )}
      </div>
    );
  }

  render() {
    if (!this.data) return <div class="erx-org__empty">No organization data</div>;

    return (
      <div
        class={{ 'erx-org': true, [`erx-org--${this.direction}`]: true, 'erx-org--disabled': this.disabled }}
        part="container"
      >
        {this.renderNode(this.data)}
      </div>
    );
  }
}
