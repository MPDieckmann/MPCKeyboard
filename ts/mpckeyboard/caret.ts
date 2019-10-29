/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />

namespace MPCKeyboard.Caret {
  // # Caret
  // Integration in die Browser:
  //  - Aktives Element
  //  - Aktive Input-Methode
  //  - etc.
  export const version = "2019.10.24";
  export const element = Helper.createHTMLElement("mpc:caret");
  export declare const activeInputLanguage: string;
  export declare const activeInputMode: INPUT_MODE;
  export declare const activeElement: Element;
  export declare const activeDocument: Document;
  export declare const activeWindow: Window;

  var _activeInputLanguage: string = "";
  var _activeInputMode: INPUT_MODE = INPUT_MODE_TEXT;
  var _hasCustomInputMode: boolean = false;
  var _activeElement: Element = document.activeElement;
  var _activeDocument: Document = document;
  var _activeWindow: Window = window;
  var _frames: Window[] = [];
  var _blurTimeout: number = -1;
  var _customCaret: boolean = false;

  Helper.defineProperties(Caret, {
    activeInputLanguage: {
      get() { return _activeInputLanguage; },
      enumerable: true,
      configurable: false
    },
    activeInputMode: {
      get() { return _activeInputMode; },
      enumerable: true,
      configurable: false
    },
    activeElement: {
      get() { return _activeElement; },
      enumerable: true,
      configurable: false
    },
    activeDocument: {
      get() { return _activeDocument; },
      enumerable: true,
      configurable: false
    },
    activeWindow: {
      get() { return _activeWindow; },
      enumerable: true,
      configurable: false
    }
  });

  MPCKeyboard.element.appendChild(element);
  frameChange(Helper.window);

  /**
   * Executes a command on the current document, current selection, or the given range.
   * @param commandId String that specifies the command to execute. This command can be any of the command identifiers that can be executed in script.
   * @param showUI Display the user interface, defaults to false.
   * @param value Value to assign.
   */
  export function execCommand(commandId: string, showUI?: boolean, value?: string): boolean {
    if (
      _activeElement instanceof _activeWindow.HTMLInputElement ||
      _activeElement instanceof _activeWindow.HTMLTextAreaElement
    ) {
      var _selStart = _activeElement.selectionStart;
      var _selEnd = _activeElement.selectionEnd;
      var _selValue = _activeElement.value;
      var _rslt = _activeDocument && _activeDocument.execCommand.apply(_activeDocument, arguments);
      if (!_rslt) {
        switch (commandId) {
          case "insertHTML":
            let elm = document.createElement("div");
            elm.innerHTML = value;
            value = elm.innerText;
          case "insertText":
            _selValue = _selValue.substr(0, _selStart) + value + _selValue.substr(_selEnd);
            _selStart = _selStart + value.length;
            _selEnd = _selStart;
            break;
          case "delete":
            if (_selStart == _selEnd) {
              _selValue = _selValue.substr(0, _selStart - 1) + _selValue.substr(_selEnd);
              _selStart--;
              _selEnd--;
            } else {
              _selValue = _selValue.substr(0, _selStart) + _selValue.substr(_selEnd);
              _selEnd = _selStart;
            }
            break;
          case "forwardDelete":
            if (_selStart == _selEnd) {
              _selValue = _selValue.substr(0, _selStart) + _selValue.substr(_selEnd + 1);
            } else {
              _selValue = _selValue.substr(0, _selStart) + _selValue.substr(_selEnd);
              _selEnd = _selStart;
            }
            break;
          case "selectAll":
            _selStart = 0;
            _selEnd = _selValue.length;
            break;
          case "paste":
            value = Helper.prompt("Please paste text here");
            _selValue = _selValue.substr(0, _selStart) + value + _selValue.substr(_selEnd);
            _selStart = _selStart + value.length;
            _selEnd = _selStart;
            break;
          case "copy":
            value = _selValue.substr(_selStart, _selEnd);
            if (Helper.window.navigator.clipboard && typeof Helper.window.navigator.clipboard.writeText == "function") {
              Helper.window.navigator.clipboard.writeText(value);
            }
            break;
          case "cut":
            value = _selValue.substr(_selStart, _selEnd);
            if (Helper.window.navigator.clipboard && typeof Helper.window.navigator.clipboard.writeText == "function") {
              Helper.window.navigator.clipboard.writeText(value);
            }
            _selValue = _selValue.substr(0, _selStart) + _selValue.substr(_selEnd);
            _selEnd = _selStart;
            break;
          default:
            return false;
        }
        _activeElement.value = _selValue;
        _activeElement.selectionStart = _selStart;
        _activeElement.selectionEnd = _selEnd;
        return true;
      }
      return _rslt;
    }
    return _activeDocument && _activeDocument.execCommand.apply(_activeDocument, arguments);
  }
  export function frameChange(frame: Window): void {
    if (_frames.indexOf(frame) == -1) {
      try {
        frame.addEventListener("click", _setActiveElement, true);
        frame.addEventListener("focusin", _setActiveElement, true);
        frame.addEventListener("focusout", _setActiveElement, true);
        frame.addEventListener("focus", _setActiveElement, true);
        frame.addEventListener("blur", _setActiveElement, true);
        frame.addEventListener("keydown", _keydown, true);
        frame.addEventListener("keyup", _keyup, true);
        _frames.push(frame);
        _setActiveElement.call(frame, { type: "focus" });
      } catch (e) {
        console.warn("Info: Failed to add EventListeners to frame!");
      }
    }
  }
  export function updateInputLanguage() {
    let _lang = navigator.language;
    let _elm: Node = _activeElement;
    while (_lang == "" && _elm) {
      if (_activeElement instanceof activeWindow.HTMLElement) {
        _lang = _activeElement.lang;
      }
      _elm = _elm.parentNode;
    }
    if (!langs.has(_lang)) {
      var i = 0;
      var l = (navigator.languages || []).length;
      while (i < l && !langs.has(navigator.languages[i++]));
      if (langs.has(navigator.languages[i - 1])) {
        _lang = navigator.languages[i - 1];
      }
    }
    lang = _lang;
  }
  function _setActiveElement(this: Window, event: Event): void {
    if (event.type == "blur" && Helper.isEvent(event) && event.target == Helper.window) {
      _blurTimeout = setTimeout(() => {
        Layout.releaseAllKeys();
        console.warn("Info: All keys were released programmatically to prevent Errors");
      }, 1000);
    }
    if (_blurTimeout > -1 && event.type == "focus") {
      clearTimeout(_blurTimeout);
      _blurTimeout = -1;
    }
    if (_activeElement instanceof activeWindow.HTMLElement && "inputMode" in _activeElement) {
      _activeElement.inputMode = _hasCustomInputMode ? activeInputMode : "";
    }
    if (this.document.activeElement instanceof this.HTMLIFrameElement) {
      frameChange(this.document.activeElement.contentWindow);
      return;
    }
    _activeWindow = this;
    _activeDocument = this.document;
    _activeElement = this.document.activeElement;
    if (_activeElement instanceof activeWindow.HTMLElement) {
      if ("inputMode" in _activeElement) {
        _customCaret = false;
        _activeInputMode = <INPUT_MODE>_activeElement.inputMode;
        if (_activeInputMode == <INPUT_MODE>"") {
          _hasCustomInputMode = false;
          if (_activeElement instanceof activeWindow.HTMLInputElement) {
            switch (_activeElement.type) {
              case "number":
                _activeInputMode = INPUT_MODE_DECIMAL;
                break;
              case "date":
              case "datetime":
              case "datetime-local":
              case "month":
              case "time":
              case "week":
                _activeInputMode = INPUT_MODE_NUMERIC;
                break;
              case "email":
                _activeInputMode = INPUT_MODE_EMAIL;
                break;
              case "search":
                _activeInputMode = INPUT_MODE_SEARCH;
                break;
              case "tel":
                _activeInputMode = INPUT_MODE_TEL;
                break;
              case "url":
                _activeInputMode = INPUT_MODE_URL;
                break;
              case "button":
              case "checkbox":
              case "color":
              case "file":
              case "hidden":
              case "image":
              case "password":
              case "radio":
              case "range":
              case "reset":
              case "submit":
              case "text":
              default:
                _activeInputMode = INPUT_MODE_TEXT;
                break;
            }
          } else {
            _activeInputMode = INPUT_MODE_TEXT;
          }
        } else {
          _hasCustomInputMode = true;
        }
        if (Options.overrideInputMode) {
          _activeElement.inputMode = "none";
        }
      } else {
        _customCaret = true;
        Helper.requestAnimationFrame(_updateCaret);
      }
      if (Options.autoOpenKeyboard) {
        if (
          /input/i.test(activeElement.nodeName) &&
          (<HTMLInputElement>activeElement).type != "hidden"
        ) {
          show();
        } else if (
          _activeElement.isContentEditable ||
          /textarea|details|summary/i.test(activeElement.nodeName)
        ) {
          show();
        } else {
          hide(Options.collapseOnHide);
        }
      }
    }
    updateInputLanguage();
    var frame = _activeWindow;
    var _rect: DOMRect | ClientRect = null;
    _top = 0;
    _left = 0;
    while (frame && top != frame && frame.frameElement) {
      _rect = frame.frameElement.getBoundingClientRect();
      _top += _rect.top;
      _left += _rect.left;
      frame = frame.parent;
    }
  }
  function _keydown(this: Window, event: Helper.KeyboardEvent): void {
    if (event instanceof MPCKeyboard.KeyboardEvent) {
      return;
    }
    if (Options.combineMPCKeyboardAndNativeKeyboard) {
      if (/^Arrow(Up|Left|Right|Down)$/.test(event.code)) {
        Layout.releaseAllKeys();
        return;
      }
      event.preventDefault();
      if (event.repeat) {
        return;
      }
      if (Layout.keys[event.code]) {
        Layout.keyDown({
          key: Layout.keys[event.code].key,
          code: event.code,
          location: Layout.keys[event.code].location
        });
      } else {
        Layout.keyDown(<{ key: string, code: string, location: KEY_LOCATION }>event);
      }
    } else {
      if (event.repeat) {
        return;
      }
      switch (event.key) {
        case "Alt":
          Layout.setModifier(MODIFIER_ALT);
          break;
        case "AltLock":
          if (event.getModifierState(event.key)) {
            Layout.setModifier(MODIFIER_ALT, true);
          } else {
            Layout.removeModifier(MODIFIER_ALT);
          }
          break;
        case "AltGraph":
          Layout.setModifier(MODIFIER_ALTGRAPH);
          break;
        case "AltGraphLock":
          if (event.getModifierState(event.key)) {
            Layout.setModifier(MODIFIER_ALTGRAPH, true);
          } else {
            Layout.removeModifier(MODIFIER_ALTGRAPH);
          }
          break;
        case "Control":
          Layout.setModifier(MODIFIER_CTRL);
          break;
        case "ControlLock":
          if (event.getModifierState(event.key)) {
            Layout.setModifier(MODIFIER_CTRL, true);
          } else {
            Layout.removeModifier(MODIFIER_CTRL);
          }
          break;
        case "FN":
          Layout.setModifier(MODIFIER_FN);
          break;
        case "FNLock":
          if (event.getModifierState(event.key)) {
            Layout.setModifier(MODIFIER_FN, true);
          } else {
            Layout.removeModifier(MODIFIER_FN);
          }
          break;
        case "Hyper":
        case "Meta":
        case "Super":
        case "OS":
          Layout.setModifier(MODIFIER_META);
          break;
        case "HyperLock":
        case "MetaLock":
        case "SuperLock":
        case "OSLock":
          if (event.getModifierState(event.key)) {
            Layout.setModifier(MODIFIER_META, true);
          } else {
            Layout.removeModifier(MODIFIER_META);
          }
          break;
        case "Shift":
          Layout.setModifier(MODIFIER_SHIFT);
          break;
        case "CapsLock":
        case "ShiftLock":
          if (event.getModifierState(event.key)) {
            Layout.setModifier(MODIFIER_SHIFT, true);
          } else {
            Layout.removeModifier(MODIFIER_SHIFT);
          }
          break;
        case "Symbol":
          Layout.setModifier(MODIFIER_SYMBOL);
          break;
        case "SymbolLock":
          if (event.getModifierState(event.key)) {
            Layout.setModifier(MODIFIER_SYMBOL, true);
          } else {
            Layout.removeModifier(MODIFIER_SYMBOL);
          }
          break;
        default:
          break;
      }
      Layout.modifyKey(event.key, "down", true);
    }
  }
  function _keyup(this: Window, event: Helper.KeyboardEvent): void {
    if (event instanceof MPCKeyboard.KeyboardEvent) {
      return;
    }
    if (Options.combineMPCKeyboardAndNativeKeyboard) {
      event.preventDefault();
    }
    if (event.repeat) {
      return;
    }
    switch (event.key) {
      case "Alt":
        Layout.removeModifier(MODIFIER_ALT);
        break;
      case "AltGraph":
        Layout.removeModifier(MODIFIER_ALTGRAPH);
        break;
      case "Control":
        Layout.removeModifier(MODIFIER_CTRL);
        break;
      case "FN":
        Layout.removeModifier(MODIFIER_FN);
        break;
      case "Hyper":
      case "Meta":
      case "Super":
      case "OS":
        Layout.removeModifier(MODIFIER_META);
        break;
      case "Shift":
        Layout.removeModifier(MODIFIER_SHIFT);
        break;
      case "Symbol":
        Layout.removeModifier(MODIFIER_SYMBOL);
        break;
      default:
        break;
    }
    if (Options.combineMPCKeyboardAndNativeKeyboard) {
      if (Layout.keys[event.code]) {
        Layout.keyUp({
          key: Layout.keys[event.code].key,
          code: event.code,
          location: Layout.keys[event.code].location
        });
      } else {
        Layout.keyUp(<{ key: string, code: string, location: KEY_LOCATION }>event);
      }
    } else {
      Layout.modifyKey(event.key, "down", false);
    }
  }
  var _top: number = 0;
  var _left: number = 0;

  function _updateCaret() {
    var _selection = _activeWindow.getSelection();
    var _range = _selection.getRangeAt(0);
    var _rect = _range.getBoundingClientRect();

    element.style.top = _top + _rect.top + "px";
    element.style.left = _left + _rect.left + "px";
    element.style.height = _rect.height + "px";

    if (_customCaret) {
      Helper.requestAnimationFrame(_updateCaret);
    } else {
      element.classList.add("hidden");
    }
  }
}