/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />

namespace MPCKeyboard.Options {
  /**
   * Zeigt das MPCKeyboard Element automatisch an, wenn ein Eingabefeld den Fokus erhält, oder blendet es aus, wenn das fokussierte Element keine Eingabe ermöglicht.
   * @default false
   */
  export declare var autoOpenKeyboard: boolean;
  /**
   * MPCKeyboard soll sich bemühen, native Bildschirm-Tastaturen auszublenden. (Funktioniert bisher nur bei Chromium basierten Browsern (Chrome, Chromium, Opera ...).
   * @default false
   */
  export declare var overrideInputMode: boolean;
  /**
   * Wenn aktiviert, wird versucht, die Hardware-Tastatur-Eingaben in MPCKeyboard-Eingaben unmzuwandeln. (Kann zu Problemen führen; bisher werden nur Desktop-Systeme wie Windows und OSX unterstützt).
   * @default false
   */
  export declare var combineMPCKeyboardAndNativeKeyboard: boolean;
  /**
   * Blendet bei verstecktem MPCKeyboard die Schaltfläche zum Öffnen aus oder ein.
   * @default false
   */
  export declare var collapseOnHide: boolean;
  /**
   * Gibt (in Millisekunden) an, wie lange eine Taste gedrückt werden muss, bevor MPCKeyboard den Wert bei keydown auf repeat setzt.
   * @range 50 - 10000
   * @default 500
   */
  export declare var keyHoldTimeout: number;
  /**
   * Gibt (in Millisekunden) an, wie lange zwischen den wiederholenden keydown-Events gewartet werden soll.
   * @range 10 - 500
   * @default 33
   */
  export declare var keyRepeatInterval: number;
  /**
   * Gibt (in Pixeln) die Präzision an, mit der ein Mousemove aus dem Tastenfeld maximal abweichen darf bevor ein die Taste ein keyUp Event wirft.
   * @range 0 - 100
   * @default 5
   */
  export declare var mousePrecision: number;
  /**
   * Gibt (in Pixeln) die Präzision an, mit der ein Touchmove aus dem Tastenfeld maximal abweichen darf bevor ein die Taste ein keyUp Event wirft.
   * @range 0 - 100
   * @default 5
   */
  export declare var touchPrecision: number;
  /**
   * Gibt (in Pixeln) die Präzision an, mit der ein Pointermove aus dem Tastenfeld maximal abweichen darf bevor ein die Taste ein keyUp Event wirft.
   * @range 0 - 100
   * @default 5
   */
  export declare var pointerPrecision: number;
  var _autoOpenKeyboard: boolean = false;
  var _overrideInputMode: boolean = false;
  var _combineMPCKeyboardAndNativeKeyboard: boolean = false;
  var _collapseOnHide: boolean = false;
  var _keyHoldTimeout: number = 500;
  var _keyRepeatInterval: number = 33;
  var _mousePrecision: number = 5;
  var _touchPrecision: number = 5;
  var _pointerPrecision: number = 5;

  Helper.defineProperties(Options, {
    autoOpenKeyboard: {
      get() { return _autoOpenKeyboard; },
      set(value: boolean) { _autoOpenKeyboard = !!value; },
      enumerable: true,
      configurable: false
    },
    overrideInputMode: {
      get() { return _overrideInputMode; },
      set(value: boolean) { _overrideInputMode = !!value; },
      enumerable: true,
      configurable: false
    },
    combineMPCKeyboardAndNativeKeyboard: {
      get() { return _combineMPCKeyboardAndNativeKeyboard; },
      set(value: boolean) { _combineMPCKeyboardAndNativeKeyboard = !!value; },
      enumerable: true,
      configurable: false
    },
    collapseOnHide: {
      get() { return _collapseOnHide; },
      set(value: boolean) { _collapseOnHide = !!value; },
      enumerable: true,
      configurable: false
    },
    keyHoldTimeout: {
      get() { return _keyHoldTimeout; },
      set(value: number) {
        value = Number(value);
        if (isNaN(value)) {
          value = _keyHoldTimeout;
        }
        if (value < 50) {
          value = 50;
        } else if (value > 10000) {
          value = 10000;
        }
        _keyHoldTimeout = value;
      },
      enumerable: true,
      configurable: false
    },
    keyRepeatInterval: {
      get() { return _keyRepeatInterval; },
      set(value: number) {
        value = Number(value);
        if (isNaN(value)) {
          value = _keyRepeatInterval;
        }
        if (value < 10) {
          value = 10;
        } else if (value > 500) {
          value = 500;
        }
        _keyRepeatInterval = value;
      },
      enumerable: true,
      configurable: false
    },
    mousePrecision: {
      get() { return _mousePrecision; },
      set(value: number) {
        value = Number(value);
        if (isNaN(value)) {
          value = _mousePrecision;
        }
        if (value < 0) {
          value = 0;
        } else if (value > 100) {
          value = 100;
        }
        _mousePrecision = value;
      },
      enumerable: true,
      configurable: false
    },
    touchPrecision: {
      get() { return _touchPrecision; },
      set(value: number) {
        value = Number(value);
        if (isNaN(value)) {
          value = _touchPrecision;
        }
        if (value < 0) {
          value = 0;
        } else if (value > 100) {
          value = 100;
        }
        _touchPrecision = value;
      },
      enumerable: true,
      configurable: false
    },
    pointerPrecision: {
      get() { return _pointerPrecision; },
      set(value: number) {
        value = Number(value);
        if (isNaN(value)) {
          value = _pointerPrecision;
        }
        if (value < 0) {
          value = 0;
        } else if (value > 100) {
          value = 100;
        }
        _pointerPrecision = value;
      },
      enumerable: true,
      configurable: false
    }
  });
}