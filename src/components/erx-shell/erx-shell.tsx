import { Component, Prop, Event, EventEmitter, h, Method } from '@stencil/core';
import { ErxShellSidebarPosition } from './erx-shell.types';

@Component({
  tag: 'erx-shell',
  styleUrl: 'erx-shell.css',
  shadow: true,
})
export class ErxShell {
  /** Sidebar position */
  @Prop() sidebarPosition: ErxShellSidebarPosition = 'left';

  /** Sidebar width */
  @Prop() sidebarWidth: string = '260px';

  /** Collapsed sidebar width */
  @Prop() collapsedWidth: string = '64px';

  /** Header height */
  @Prop() headerHeight: string = '64px';

  /** Footer height */
  @Prop() footerHeight: string = '48px';

  /** Sidebar collapsed */
  @Prop({ mutable: true }) sidebarCollapsed: boolean = false;

  /** Sidebar toggle event */
  @Event() erxSidebarToggle!: EventEmitter<{ collapsed: boolean }>;

  @Method()
  async toggleSidebar(): Promise<void> {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.erxSidebarToggle.emit({ collapsed: this.sidebarCollapsed });
  }

  @Method()
  async collapseSidebar(): Promise<void> {
    this.sidebarCollapsed = true;
    this.erxSidebarToggle.emit({ collapsed: true });
  }

  @Method()
  async expandSidebar(): Promise<void> {
    this.sidebarCollapsed = false;
    this.erxSidebarToggle.emit({ collapsed: false });
  }

  render() {
    const currentSidebarWidth = this.sidebarCollapsed ? this.collapsedWidth : this.sidebarWidth;

    return (
      <div
        class={{
          'erx-shell': true,
          [`erx-shell--sidebar-${this.sidebarPosition}`]: true,
          'erx-shell--sidebar-collapsed': this.sidebarCollapsed,
        }}
        style={{
          '--shell-sidebar-width': currentSidebarWidth,
          '--shell-header-height': this.headerHeight,
          '--shell-footer-height': this.footerHeight,
        }}
        part="container"
      >
        {/* Header */}
        <header class="erx-shell__header" part="header">
          <slot name="header" />
        </header>

        {/* Sidebar */}
        <aside class="erx-shell__sidebar" part="sidebar">
          <slot name="sidebar" />
        </aside>

        {/* Main content */}
        <main class="erx-shell__main" part="main">
          <slot />
        </main>

        {/* Footer */}
        <footer class="erx-shell__footer" part="footer">
          <slot name="footer" />
        </footer>
      </div>
    );
  }
}
