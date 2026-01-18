import { Component, Prop, Event, EventEmitter, State, h, Element, Method } from '@stencil/core';
import { ErxBarcodeFormat, ErxBarcodeScanResult, ErxBarcodeScanEvent, ErxBarcodeScannerErrorEvent } from './erx-barcode-scanner.types';

@Component({
  tag: 'erx-barcode-scanner',
  styleUrl: 'erx-barcode-scanner.css',
  shadow: true,
})
export class ErxBarcodeScanner {
  @Element() el!: HTMLElement;

  /** Accepted formats */
  @Prop() formats: ErxBarcodeFormat[] = ['qr_code', 'ean_13', 'ean_8', 'code_128'];

  /** Auto-start camera */
  @Prop() autoStart: boolean = false;

  /** Facing mode */
  @Prop() facingMode: 'user' | 'environment' = 'environment';

  /** Scan frequency (ms) */
  @Prop() scanInterval: number = 500;

  /** Show overlay/guide */
  @Prop() showOverlay: boolean = true;

  /** Beep on scan */
  @Prop() beepOnScan: boolean = true;

  /** Vibrate on scan */
  @Prop() vibrateOnScan: boolean = true;

  /** Continuous scanning */
  @Prop() continuous: boolean = false;

  /** Width */
  @Prop() width: string = '100%';

  /** Height */
  @Prop() height: string = '300px';

  /** Scan success event */
  @Event() erxScan!: EventEmitter<ErxBarcodeScanEvent>;

  /** Error event */
  @Event() erxError!: EventEmitter<ErxBarcodeScannerErrorEvent>;

  @State() isScanning: boolean = false;
  @State() hasPermission: boolean = false;
  @State() lastResult?: ErxBarcodeScanResult;
  @State() error?: string;

  private videoEl?: HTMLVideoElement;
  private canvasEl?: HTMLCanvasElement;
  private stream?: MediaStream;
  private scanTimer?: number;
  private barcodeDetector?: unknown;

  componentDidLoad() {
    if (this.autoStart) {
      this.startScanning();
    }
  }

  disconnectedCallback() {
    this.stopScanning();
  }

  @Method()
  async startScanning(): Promise<void> {
    try {
      this.error = undefined;

      // Check for BarcodeDetector support
      if ('BarcodeDetector' in window) {
        this.barcodeDetector = new (window as unknown as { BarcodeDetector: new (options: { formats: string[] }) => unknown }).BarcodeDetector({
          formats: this.formats,
        });
      }

      // Request camera access
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: this.facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      this.hasPermission = true;

      if (this.videoEl) {
        this.videoEl.srcObject = this.stream;
        await this.videoEl.play();
      }

      this.isScanning = true;
      this.startScanLoop();
    } catch (err) {
      this.error = 'Camera access denied';
      this.erxError.emit({
        error: 'Camera access denied',
        code: 'PERMISSION_DENIED',
      });
    }
  }

  @Method()
  async stopScanning(): Promise<void> {
    this.isScanning = false;

    if (this.scanTimer) {
      clearInterval(this.scanTimer);
      this.scanTimer = undefined;
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = undefined;
    }

    if (this.videoEl) {
      this.videoEl.srcObject = null;
    }
  }

  @Method()
  async toggleTorch(enabled: boolean): Promise<void> {
    if (!this.stream) return;

    const track = this.stream.getVideoTracks()[0];
    if (track && 'applyConstraints' in track) {
      try {
        await (track as MediaStreamTrack & { applyConstraints: (constraints: Record<string, unknown>) => Promise<void> }).applyConstraints({
          advanced: [{ torch: enabled } as unknown as MediaTrackConstraintSet],
        });
      } catch {
        console.warn('Torch not supported');
      }
    }
  }

  private startScanLoop(): void {
    this.scanTimer = window.setInterval(() => {
      this.scanFrame();
    }, this.scanInterval);
  }

  private async scanFrame(): Promise<void> {
    if (!this.isScanning || !this.videoEl || !this.canvasEl) return;

    const ctx = this.canvasEl.getContext('2d');
    if (!ctx) return;

    // Draw video frame to canvas
    this.canvasEl.width = this.videoEl.videoWidth;
    this.canvasEl.height = this.videoEl.videoHeight;
    ctx.drawImage(this.videoEl, 0, 0);

    try {
      // Use BarcodeDetector if available
      if (this.barcodeDetector && 'detect' in (this.barcodeDetector as object)) {
        const detector = this.barcodeDetector as { detect: (source: HTMLCanvasElement) => Promise<Array<{ rawValue: string; format: string }>> };
        const barcodes = await detector.detect(this.canvasEl);

        if (barcodes.length > 0) {
          const barcode = barcodes[0];
          this.handleScanResult({
            text: barcode.rawValue,
            format: barcode.format as ErxBarcodeFormat,
            timestamp: new Date(),
            rawValue: barcode.rawValue,
          });
        }
      }
    } catch {
      // Silently fail - no barcode detected in this frame
    }
  }

  private handleScanResult(result: ErxBarcodeScanResult): void {
    // Avoid duplicate scans
    if (this.lastResult?.text === result.text &&
        Date.now() - this.lastResult.timestamp.getTime() < 2000) {
      return;
    }

    this.lastResult = result;

    // Feedback
    if (this.beepOnScan) {
      this.playBeep();
    }
    if (this.vibrateOnScan && 'vibrate' in navigator) {
      navigator.vibrate(100);
    }

    this.erxScan.emit({ result });

    if (!this.continuous) {
      this.stopScanning();
    }
  }

  private playBeep(): void {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 1000;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.1;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  render() {
    return (
      <div
        class="erx-scanner"
        style={{ width: this.width, height: this.height }}
        part="container"
      >
        {/* Video preview */}
        <video
          ref={el => this.videoEl = el}
          class="erx-scanner__video"
          playsinline
          muted
          part="video"
        />

        {/* Canvas for processing (hidden) */}
        <canvas
          ref={el => this.canvasEl = el}
          class="erx-scanner__canvas"
        />

        {/* Overlay */}
        {this.showOverlay && this.isScanning && (
          <div class="erx-scanner__overlay" part="overlay">
            <div class="erx-scanner__guide" part="guide">
              <div class="erx-scanner__corner erx-scanner__corner--tl" />
              <div class="erx-scanner__corner erx-scanner__corner--tr" />
              <div class="erx-scanner__corner erx-scanner__corner--bl" />
              <div class="erx-scanner__corner erx-scanner__corner--br" />
              <div class="erx-scanner__line" />
            </div>
          </div>
        )}

        {/* Start button */}
        {!this.isScanning && !this.error && (
          <div class="erx-scanner__placeholder" part="placeholder">
            <button
              class="erx-scanner__start"
              onClick={() => this.startScanning()}
            >
              📷 Start Scanner
            </button>
          </div>
        )}

        {/* Error state */}
        {this.error && (
          <div class="erx-scanner__error" part="error">
            <span>⚠️ {this.error}</span>
            <button onClick={() => this.startScanning()}>
              Try Again
            </button>
          </div>
        )}

        {/* Last result */}
        {this.lastResult && (
          <div class="erx-scanner__result" part="result">
            <span class="erx-scanner__result-format">{this.lastResult.format}</span>
            <span class="erx-scanner__result-text">{this.lastResult.text}</span>
          </div>
        )}
      </div>
    );
  }
}
