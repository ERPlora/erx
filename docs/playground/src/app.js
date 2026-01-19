import { components } from './components-data.js';
import { initMonaco, updateEditor, getEditorValue } from './editor.js';
import { runComponentTest } from './test-runner.js';

class ERXPlayground {
  constructor() {
    this.currentComponent = null;
    this.componentInstance = null;
    this.init();
  }

  async init() {
    // Initialize Monaco Editor
    await initMonaco();

    // Render component list
    this.renderComponentList();

    // Setup event listeners
    this.setupEventListeners();

    // Setup tabs
    this.setupTabs();
  }

  renderComponentList() {
    const list = document.getElementById('component-list');
    list.innerHTML = '';

    components.forEach(comp => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = comp.name;
      btn.onclick = () => this.loadComponent(comp);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  setupEventListeners() {
    // Search
    document.getElementById('search').addEventListener('input', (e) => {
      this.filterComponents(e.target.value);
    });

    // Apply JSON
    document.getElementById('apply-btn').addEventListener('click', () => {
      this.applyJSON();
    });

    // Reset
    document.getElementById('reset-btn').addEventListener('click', () => {
      if (this.currentComponent) {
        this.loadComponent(this.currentComponent);
      }
    });

    // Run Test
    document.getElementById('run-test').addEventListener('click', async () => {
      if (this.currentComponent) {
        await this.runTest();
      }
    });

    // Preset selector
    document.getElementById('preset-selector').addEventListener('change', (e) => {
      if (e.target.value && this.currentComponent) {
        const preset = this.currentComponent.presets.find(p => p.name === e.target.value);
        if (preset) {
          updateEditor(JSON.stringify(preset.data, null, 2));
          this.applyJSON();
        }
      }
    });
  }

  setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update active content
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        document.querySelector(`[data-content="${targetTab}"]`).classList.add('active');
      });
    });
  }

  filterComponents(query) {
    const list = document.getElementById('component-list');
    const items = list.querySelectorAll('li');

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
  }

  loadComponent(component) {
    this.currentComponent = component;

    // Update UI
    document.getElementById('component-name').textContent = component.name;

    // Update active state in sidebar
    document.querySelectorAll('.component-list button').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === component.name);
    });

    // Load presets
    this.loadPresets(component);

    // Load component info
    this.loadComponentInfo(component);

    // Render component
    this.renderComponent(component);

    // Update editor with default preset
    if (component.presets && component.presets.length > 0) {
      updateEditor(JSON.stringify(component.presets[0].data, null, 2));
      this.applyJSON();
    }
  }

  loadPresets(component) {
    const selector = document.getElementById('preset-selector');
    selector.innerHTML = '<option value="">Select preset...</option>';

    if (component.presets) {
      component.presets.forEach(preset => {
        const option = document.createElement('option');
        option.value = preset.name;
        option.textContent = preset.name;
        selector.appendChild(option);
      });
      selector.value = component.presets[0].name;
    }
  }

  loadComponentInfo(component) {
    // Props
    const propsInfo = document.getElementById('props-info');
    propsInfo.innerHTML = `
      <h4>Properties</h4>
      <table>
        ${component.props.map(prop => `
          <tr>
            <td><code>${prop.name}</code></td>
            <td>${prop.type}</td>
            <td>${prop.description}</td>
          </tr>
        `).join('')}
      </table>
    `;

    // Events
    const eventsInfo = document.getElementById('events-info');
    eventsInfo.innerHTML = `
      <h4>Events</h4>
      <table>
        ${component.events.map(event => `
          <tr>
            <td><code>${event.name}</code></td>
            <td>${event.description}</td>
          </tr>
        `).join('')}
      </table>
    `;

    // Methods
    const methodsInfo = document.getElementById('methods-info');
    if (component.methods && component.methods.length > 0) {
      methodsInfo.innerHTML = `
        <h4>Methods</h4>
        <table>
          ${component.methods.map(method => `
            <tr>
              <td><code>${method.name}()</code></td>
              <td>${method.description}</td>
            </tr>
          `).join('')}
        </table>
      `;
    } else {
      methodsInfo.innerHTML = '<p style="color: var(--text-muted);">No public methods</p>';
    }
  }

  renderComponent(component) {
    const preview = document.getElementById('component-preview');
    preview.innerHTML = `<${component.name} id="demo-component"></${component.name}>`;
    this.componentInstance = document.getElementById('demo-component');

    // Listen to all events
    if (component.events) {
      component.events.forEach(event => {
        this.componentInstance.addEventListener(event.name, (e) => {
          this.showMessage(`Event: ${event.name}`, 'success');
          console.log(`${event.name}:`, e.detail);
        });
      });
    }
  }

  applyJSON() {
    try {
      const json = getEditorValue();
      const data = JSON.parse(json);

      if (!this.componentInstance) {
        throw new Error('No component instance');
      }

      // Apply properties
      Object.keys(data).forEach(key => {
        this.componentInstance[key] = data[key];
      });

      this.showMessage('Configuration applied successfully!', 'success');
    } catch (error) {
      this.showMessage(`Error: ${error.message}`, 'error');
      console.error(error);
    }
  }

  async runTest() {
    try {
      this.showMessage('Running test...', 'info');
      const result = await runComponentTest(this.currentComponent, this.componentInstance);

      if (result.success) {
        this.showMessage(`Test passed! ${result.message}`, 'success');
      } else {
        this.showMessage(`Test failed: ${result.message}`, 'error');
      }
    } catch (error) {
      this.showMessage(`Test error: ${error.message}`, 'error');
      console.error(error);
    }
  }

  showMessage(message, type = 'info') {
    const statusEl = document.getElementById('status-message');
    statusEl.innerHTML = `<div class="${type}-message">${message}</div>`;

    if (type === 'success' || type === 'info') {
      setTimeout(() => {
        statusEl.innerHTML = '';
      }, 3000);
    }
  }
}

// Initialize app
new ERXPlayground();
