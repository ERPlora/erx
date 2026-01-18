/**
 * ERX VirtualKeyboard Types
 */

export type ErxKeyboardLayout = 'qwerty' | 'numeric' | 'phone';

export type ErxKeyboardLanguage = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt';

export interface ErxKeyboardKey {
  /** Key value */
  value: string;
  /** Display label (if different from value) */
  label?: string;
  /** Key width multiplier */
  width?: number;
  /** Key type */
  type?: 'char' | 'action' | 'space' | 'shift' | 'backspace' | 'enter';
}

export interface ErxKeyboardInputEvent {
  key: string;
  value: string;
}
