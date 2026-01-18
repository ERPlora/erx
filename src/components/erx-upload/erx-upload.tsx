import { Component, Prop, Event, EventEmitter, State, h, Method } from '@stencil/core';
import { ErxUploadFile, ErxUploadSelectEvent, ErxUploadProgressEvent, ErxUploadCompleteEvent, ErxUploadErrorEvent } from './erx-upload.types';

@Component({
  tag: 'erx-upload',
  styleUrl: 'erx-upload.css',
  shadow: true,
})
export class ErxUpload {
  /** Accept file types */
  @Prop() accept: string = '*/*';

  /** Allow multiple files */
  @Prop() multiple: boolean = true;

  /** Max file size in bytes */
  @Prop() maxSize: number = 10 * 1024 * 1024; // 10MB

  /** Max number of files */
  @Prop() maxFiles: number = 10;

  /** Show file list */
  @Prop() showList: boolean = true;

  /** Show preview for images */
  @Prop() showPreview: boolean = true;

  /** Disabled state */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** File select event */
  @Event() erxSelect!: EventEmitter<ErxUploadSelectEvent>;

  /** Upload progress event */
  @Event() erxProgress!: EventEmitter<ErxUploadProgressEvent>;

  /** Upload complete event */
  @Event() erxComplete!: EventEmitter<ErxUploadCompleteEvent>;

  /** Upload error event */
  @Event() erxError!: EventEmitter<ErxUploadErrorEvent>;

  /** File remove event */
  @Event() erxRemove!: EventEmitter<{ file: ErxUploadFile }>;

  @State() files: ErxUploadFile[] = [];
  @State() isDragOver: boolean = false;

  private inputEl?: HTMLInputElement;
  private fileIdCounter: number = 0;

  @Method()
  async getFiles(): Promise<ErxUploadFile[]> {
    return this.files;
  }

  @Method()
  async clearFiles(): Promise<void> {
    this.files.forEach(f => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    this.files = [];
  }

  @Method()
  async removeFile(id: string): Promise<void> {
    const file = this.files.find(f => f.id === id);
    if (file) {
      if (file.preview) URL.revokeObjectURL(file.preview);
      this.files = this.files.filter(f => f.id !== id);
      this.erxRemove.emit({ file });
    }
  }

  private handleClick = () => {
    if (!this.disabled) {
      this.inputEl?.click();
    }
  };

  private handleInputChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
    }
    input.value = '';
  };

  private handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (!this.disabled) {
      this.isDragOver = true;
    }
  };

  private handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    this.isDragOver = false;
  };

  private handleDrop = (e: DragEvent) => {
    e.preventDefault();
    this.isDragOver = false;

    if (this.disabled || !e.dataTransfer?.files) return;

    this.addFiles(Array.from(e.dataTransfer.files));
  };

  private addFiles(fileList: File[]): void {
    const newFiles: ErxUploadFile[] = [];

    for (const file of fileList) {
      // Check max files
      if (this.files.length + newFiles.length >= this.maxFiles) {
        break;
      }

      // Check file size
      if (file.size > this.maxSize) {
        console.warn(`File ${file.name} exceeds max size`);
        continue;
      }

      // Check file type
      if (this.accept !== '*/*' && !this.isAcceptedType(file)) {
        console.warn(`File ${file.name} type not accepted`);
        continue;
      }

      const uploadFile: ErxUploadFile = {
        id: `file-${++this.fileIdCounter}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'pending',
      };

      // Generate preview for images
      if (this.showPreview && file.type.startsWith('image/')) {
        uploadFile.preview = URL.createObjectURL(file);
      }

      newFiles.push(uploadFile);
    }

    if (newFiles.length > 0) {
      this.files = [...this.files, ...newFiles];
      this.erxSelect.emit({ files: newFiles });
    }
  }

  private isAcceptedType(file: File): boolean {
    const accepted = this.accept.split(',').map(t => t.trim());
    return accepted.some(accept => {
      if (accept.startsWith('.')) {
        return file.name.toLowerCase().endsWith(accept.toLowerCase());
      }
      if (accept.endsWith('/*')) {
        return file.type.startsWith(accept.replace('/*', '/'));
      }
      return file.type === accept;
    });
  }

  private formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  private getFileIcon(type: string): string {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎬';
    if (type.startsWith('audio/')) return '🎵';
    if (type.includes('pdf')) return '📄';
    if (type.includes('zip') || type.includes('rar')) return '📦';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('sheet') || type.includes('excel')) return '📊';
    return '📎';
  }

  render() {
    return (
      <div class="erx-upload" part="container">
        {/* Drop zone */}
        <div
          class={{
            'erx-upload__dropzone': true,
            'erx-upload__dropzone--active': this.isDragOver,
            'erx-upload__dropzone--disabled': this.disabled,
          }}
          onClick={this.handleClick}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
          part="dropzone"
        >
          <input
            ref={el => this.inputEl = el}
            type="file"
            accept={this.accept}
            multiple={this.multiple}
            onChange={this.handleInputChange}
            hidden
          />

          <div class="erx-upload__icon">📁</div>
          <div class="erx-upload__text">
            <span class="erx-upload__primary">Drop files here or click to upload</span>
            <span class="erx-upload__secondary">
              Max {this.formatSize(this.maxSize)} per file
              {this.maxFiles > 1 && ` • Up to ${this.maxFiles} files`}
            </span>
          </div>
        </div>

        {/* File list */}
        {this.showList && this.files.length > 0 && (
          <div class="erx-upload__list" part="list">
            {this.files.map(file => (
              <div
                class={{
                  'erx-upload__file': true,
                  [`erx-upload__file--${file.status}`]: true,
                }}
                part="file"
              >
                {/* Preview or icon */}
                <div class="erx-upload__file-preview">
                  {file.preview ? (
                    <img src={file.preview} alt={file.name} />
                  ) : (
                    <span class="erx-upload__file-icon">{this.getFileIcon(file.type)}</span>
                  )}
                </div>

                {/* Info */}
                <div class="erx-upload__file-info">
                  <span class="erx-upload__file-name">{file.name}</span>
                  <span class="erx-upload__file-size">{this.formatSize(file.size)}</span>
                </div>

                {/* Progress */}
                {file.status === 'uploading' && (
                  <div class="erx-upload__progress">
                    <div
                      class="erx-upload__progress-bar"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}

                {/* Status */}
                {file.status === 'success' && (
                  <span class="erx-upload__status erx-upload__status--success">✓</span>
                )}
                {file.status === 'error' && (
                  <span class="erx-upload__status erx-upload__status--error">✕</span>
                )}

                {/* Remove button */}
                <button
                  class="erx-upload__remove"
                  onClick={() => this.removeFile(file.id)}
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
