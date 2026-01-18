import { Component, Prop, State, Event, EventEmitter, h, Method } from '@stencil/core';
import { TreeNode, TreeConfig, TreeSelectDetail, TreeExpandDetail } from './erx-tree.types';

@Component({
  tag: 'erx-tree',
  styleUrl: 'erx-tree.css',
  shadow: true,
})
export class ErxTree {
  @Prop() nodes: TreeNode[] = [];
  @Prop() config: TreeConfig = {};

  @State() expandedNodes: Set<string> = new Set();
  @State() selectedNodes: Set<string> = new Set();

  @Event() erxSelect!: EventEmitter<TreeSelectDetail>;
  @Event() erxExpand!: EventEmitter<TreeExpandDetail>;

  componentWillLoad() {
    this.initializeState(this.nodes);
  }

  private initializeState(nodes: TreeNode[]) {
    nodes.forEach(node => {
      if (node.expanded) this.expandedNodes.add(node.id);
      if (node.selected) this.selectedNodes.add(node.id);
      if (node.children) this.initializeState(node.children);
    });
  }

  @Method()
  async expandAll(): Promise<void> {
    const collectIds = (nodes: TreeNode[]): string[] => {
      return nodes.flatMap(n => [n.id, ...(n.children ? collectIds(n.children) : [])]);
    };
    this.expandedNodes = new Set(collectIds(this.nodes));
  }

  @Method()
  async collapseAll(): Promise<void> {
    this.expandedNodes = new Set();
  }

  @Method()
  async selectNode(nodeId: string): Promise<void> {
    if (!this.config.multiSelect) {
      this.selectedNodes = new Set([nodeId]);
    } else {
      const newSelected = new Set(this.selectedNodes);
      newSelected.add(nodeId);
      this.selectedNodes = newSelected;
    }
  }

  private toggleExpand(node: TreeNode, e: Event) {
    e.stopPropagation();
    const newExpanded = new Set(this.expandedNodes);
    const isExpanded = newExpanded.has(node.id);
    if (isExpanded) {
      newExpanded.delete(node.id);
    } else {
      newExpanded.add(node.id);
    }
    this.expandedNodes = newExpanded;
    this.erxExpand.emit({ node, expanded: !isExpanded });
  }

  private handleNodeClick(node: TreeNode) {
    if (node.disabled) return;

    if (this.config.expandOnClick && node.children?.length) {
      const clickEvent = document.createEvent('Event');
      clickEvent.initEvent('click', true, true);
      this.toggleExpand(node, clickEvent);
    }

    if (this.config.selectable !== false) {
      const newSelected = new Set(this.config.multiSelect ? this.selectedNodes : []);
      if (this.selectedNodes.has(node.id)) {
        newSelected.delete(node.id);
      } else {
        newSelected.add(node.id);
      }
      this.selectedNodes = newSelected;

      const selectedNodesList = this.getSelectedNodes(this.nodes);
      this.erxSelect.emit({ node, selected: selectedNodesList });
    }
  }

  private getSelectedNodes(nodes: TreeNode[]): TreeNode[] {
    const result: TreeNode[] = [];
    nodes.forEach(node => {
      if (this.selectedNodes.has(node.id)) result.push(node);
      if (node.children) result.push(...this.getSelectedNodes(node.children));
    });
    return result;
  }

  private renderNode(node: TreeNode, level: number = 0): any {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = this.expandedNodes.has(node.id);
    const isSelected = this.selectedNodes.has(node.id);

    return (
      <div class="erx-tree__node-wrapper" key={node.id}>
        <div
          class={{
            'erx-tree__node': true,
            'erx-tree__node--selected': isSelected,
            'erx-tree__node--disabled': !!node.disabled,
            'erx-tree__node--expandable': !!hasChildren,
          }}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => this.handleNodeClick(node)}
        >
          {hasChildren ? (
            <button
              class="erx-tree__toggle"
              onClick={(e) => this.toggleExpand(node, e)}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          ) : (
            <span class="erx-tree__toggle-placeholder"></span>
          )}

          {this.config.showCheckboxes && (
            <input
              type="checkbox"
              class="erx-tree__checkbox"
              checked={isSelected}
              disabled={node.disabled}
              onClick={(e) => e.stopPropagation()}
              onChange={() => this.handleNodeClick(node)}
            />
          )}

          {this.config.showIcons !== false && node.icon && (
            <span class="erx-tree__icon">{node.icon}</span>
          )}

          <span class="erx-tree__label">{node.label}</span>
        </div>

        {hasChildren && isExpanded && (
          <div class="erx-tree__children">
            {node.children!.map(child => this.renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div class="erx-tree" part="container">
        {this.nodes.length === 0 ? (
          <div class="erx-tree__empty">No items</div>
        ) : (
          this.nodes.map(node => this.renderNode(node))
        )}
      </div>
    );
  }
}
