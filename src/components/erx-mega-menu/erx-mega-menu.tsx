import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';
import { ErxMegaMenuItem } from './erx-mega-menu.types';

@Component({
  tag: 'erx-mega-menu',
  styleUrl: 'erx-mega-menu.css',
  shadow: true,
})
export class ErxMegaMenu {
  @Prop() items: ErxMegaMenuItem[] = [];
  @Event() erxSelect!: EventEmitter<{ item: unknown }>;
  @State() activeItem: string | null = null;

  render() {
    return (
      <nav class="erx-mm" part="container">
        <ul class="erx-mm__list">
          {this.items.map(item => (
            <li
              class={{ 'erx-mm__item': true, 'erx-mm__item--active': this.activeItem === item.id }}
              onMouseEnter={() => this.activeItem = item.children ? item.id : null}
              onMouseLeave={() => this.activeItem = null}
            >
              <a class="erx-mm__link" href={item.href || '#'}>
                {item.icon && <span class="erx-mm__icon">{item.icon}</span>}
                {item.label}
                {item.children && <span class="erx-mm__arrow">▼</span>}
              </a>
              {item.children && this.activeItem === item.id && (
                <div class="erx-mm__dropdown">
                  {item.children.map(section => (
                    <div class="erx-mm__section">
                      {section.title && <h4 class="erx-mm__section-title">{section.title}</h4>}
                      {section.items.map(subItem => (
                        <a class="erx-mm__subitem" href={subItem.href || '#'} onClick={() => this.erxSelect.emit({ item: subItem })}>
                          {subItem.icon && <span class="erx-mm__subicon">{subItem.icon}</span>}
                          <div>
                            <span class="erx-mm__sublabel">{subItem.label}</span>
                            {subItem.description && <span class="erx-mm__subdesc">{subItem.description}</span>}
                          </div>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
