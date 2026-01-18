import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import type { ErxEmployee } from './erx-employee-card.types';

@Component({
  tag: 'erx-employee-card',
  styleUrl: 'erx-employee-card.css',
  shadow: true,
})
export class ErxEmployeeCard {
  @Prop() employee!: ErxEmployee;
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  @Prop() orientation: 'vertical' | 'horizontal' = 'vertical';
  @Prop() showContact = true;
  @Prop() showStatus = true;
  @Prop() clickable = true;

  @Event() erxSelect!: EventEmitter<{ employee: ErxEmployee }>;
  @Event() erxAction!: EventEmitter<{ employee: ErxEmployee; action: string }>;

  private handleClick = () => {
    if (this.clickable) {
      this.erxSelect.emit({ employee: this.employee });
    }
  };

  private getInitials(): string {
    const { firstName, lastName } = this.employee;
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  }

  private getFullName(): string {
    return `${this.employee.firstName} ${this.employee.lastName}`;
  }

  render() {
    const { employee } = this;

    return (
      <div
        class={{
          'erx-emp': true,
          [`erx-emp--${this.size}`]: true,
          [`erx-emp--${this.orientation}`]: true,
          'erx-emp--clickable': this.clickable,
        }}
        part="container"
        onClick={this.handleClick}
        role={this.clickable ? 'button' : undefined}
        tabIndex={this.clickable ? 0 : undefined}
      >
        <div class="erx-emp__avatar" part="avatar">
          {employee.avatar ? (
            <img src={employee.avatar} alt={this.getFullName()} />
          ) : (
            <span class="erx-emp__initials">{this.getInitials()}</span>
          )}
          {this.showStatus && employee.status && (
            <span class={`erx-emp__status erx-emp__status--${employee.status}`} />
          )}
        </div>

        <div class="erx-emp__info" part="info">
          <h3 class="erx-emp__name">{this.getFullName()}</h3>
          {employee.position && (
            <p class="erx-emp__position">{employee.position}</p>
          )}
          {employee.department && (
            <p class="erx-emp__department">{employee.department}</p>
          )}

          {this.showContact && (employee.email || employee.phone) && (
            <div class="erx-emp__contact">
              {employee.email && (
                <a href={`mailto:${employee.email}`} class="erx-emp__email" onClick={e => e.stopPropagation()}>
                  {employee.email}
                </a>
              )}
              {employee.phone && (
                <a href={`tel:${employee.phone}`} class="erx-emp__phone" onClick={e => e.stopPropagation()}>
                  {employee.phone}
                </a>
              )}
            </div>
          )}

          {employee.badges && employee.badges.length > 0 && (
            <div class="erx-emp__badges">
              {employee.badges.map(badge => (
                <span class="erx-emp__badge" key={badge}>{badge}</span>
              ))}
            </div>
          )}
        </div>

        <div class="erx-emp__actions" part="actions">
          <slot name="actions" />
        </div>
      </div>
    );
  }
}
