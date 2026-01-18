import { Component, Prop, Event, EventEmitter, State, h, Element, Method } from '@stencil/core';
import { ErxRichTextTool, ErxRichTextChangeEvent } from './erx-rich-text.types';

@Component({
  tag: 'erx-rich-text',
  styleUrl: 'erx-rich-text.css',
  shadow: true,
})
export class ErxRichText {
  @Element() el!: HTMLElement;

  /** HTML content */
  @Prop({ mutable: true }) value: string = '';

  /** Placeholder text */
  @Prop() placeholder: string = 'Start typing...';

  /** Enabled tools */
  @Prop() tools: ErxRichTextTool[] = [
    'bold', 'italic', 'underline', 'strike',
    'heading1', 'heading2',
    'bulletList', 'orderedList',
    'blockquote', 'code', 'link',
    'divider', 'undo', 'redo', 'clear',
  ];

  /** Min height */
  @Prop() minHeight: string = '200px';

  /** Max height */
  @Prop() maxHeight: string = '500px';

  /** Disabled state */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Read only */
  @Prop({ reflect: true }) readOnly: boolean = false;

  /** Content change event */
  @Event() erxChange!: EventEmitter<ErxRichTextChangeEvent>;

  @State() isFocused: boolean = false;

  private editorEl?: HTMLDivElement;

  componentDidLoad() {
    if (this.editorEl) {
      this.editorEl.innerHTML = this.value;
    }
  }

  @Method()
  async getContent(): Promise<{ html: string; text: string }> {
    return {
      html: this.editorEl?.innerHTML || '',
      text: this.editorEl?.innerText || '',
    };
  }

  @Method()
  async setContent(html: string): Promise<void> {
    if (this.editorEl) {
      this.editorEl.innerHTML = html;
      this.value = html;
    }
  }

  @Method()
  async focus(): Promise<void> {
    this.editorEl?.focus();
  }

  private execCommand(command: string, value?: string): void {
    document.execCommand(command, false, value);
    this.editorEl?.focus();
    this.handleInput();
  }

  private handleToolClick(tool: ErxRichTextTool): void {
    switch (tool) {
      case 'bold':
        this.execCommand('bold');
        break;
      case 'italic':
        this.execCommand('italic');
        break;
      case 'underline':
        this.execCommand('underline');
        break;
      case 'strike':
        this.execCommand('strikeThrough');
        break;
      case 'heading1':
        this.execCommand('formatBlock', 'h1');
        break;
      case 'heading2':
        this.execCommand('formatBlock', 'h2');
        break;
      case 'heading3':
        this.execCommand('formatBlock', 'h3');
        break;
      case 'bulletList':
        this.execCommand('insertUnorderedList');
        break;
      case 'orderedList':
        this.execCommand('insertOrderedList');
        break;
      case 'blockquote':
        this.execCommand('formatBlock', 'blockquote');
        break;
      case 'code':
        this.execCommand('formatBlock', 'pre');
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) this.execCommand('createLink', url);
        break;
      case 'divider':
        this.execCommand('insertHorizontalRule');
        break;
      case 'undo':
        this.execCommand('undo');
        break;
      case 'redo':
        this.execCommand('redo');
        break;
      case 'clear':
        this.execCommand('removeFormat');
        break;
    }
  }

  private handleInput = () => {
    if (this.editorEl) {
      this.value = this.editorEl.innerHTML;
      this.erxChange.emit({
        html: this.value,
        text: this.editorEl.innerText,
        length: this.editorEl.innerText.length,
      });
    }
  };

  private getToolIcon(tool: ErxRichTextTool): string {
    const icons: Record<ErxRichTextTool, string> = {
      bold: 'B',
      italic: 'I',
      underline: 'U',
      strike: 'S',
      heading1: 'H1',
      heading2: 'H2',
      heading3: 'H3',
      bulletList: '•',
      orderedList: '1.',
      blockquote: '"',
      code: '</>',
      link: '🔗',
      image: '🖼',
      divider: '―',
      undo: '↩',
      redo: '↪',
      clear: '✕',
    };
    return icons[tool];
  }

  private getToolTitle(tool: ErxRichTextTool): string {
    const titles: Record<ErxRichTextTool, string> = {
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      strike: 'Strikethrough',
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
      bulletList: 'Bullet List',
      orderedList: 'Numbered List',
      blockquote: 'Quote',
      code: 'Code Block',
      link: 'Insert Link',
      image: 'Insert Image',
      divider: 'Horizontal Line',
      undo: 'Undo',
      redo: 'Redo',
      clear: 'Clear Formatting',
    };
    return titles[tool];
  }

  render() {
    return (
      <div
        class={{
          'erx-rte': true,
          'erx-rte--focused': this.isFocused,
          'erx-rte--disabled': this.disabled,
          'erx-rte--readonly': this.readOnly,
        }}
        part="container"
      >
        {/* Toolbar */}
        {!this.readOnly && (
          <div class="erx-rte__toolbar" part="toolbar">
            {this.tools.map(tool => (
              <button
                class={{
                  'erx-rte__tool': true,
                  [`erx-rte__tool--${tool}`]: true,
                }}
                onClick={() => this.handleToolClick(tool)}
                disabled={this.disabled}
                title={this.getToolTitle(tool)}
                type="button"
                part="tool"
              >
                {this.getToolIcon(tool)}
              </button>
            ))}
          </div>
        )}

        {/* Editor */}
        <div
          class="erx-rte__editor"
          ref={el => this.editorEl = el}
          contentEditable={!this.disabled && !this.readOnly}
          onInput={this.handleInput}
          onFocus={() => this.isFocused = true}
          onBlur={() => this.isFocused = false}
          style={{
            minHeight: this.minHeight,
            maxHeight: this.maxHeight,
          }}
          data-placeholder={this.placeholder}
          part="editor"
        />
      </div>
    );
  }
}
