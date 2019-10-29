/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />

namespace MPCKeyboard.Input {
  // # Input
  // Behandlung der Events des Keyboards
  // Ausschüttung der Events ans Document
  // Behandlung des auszugebenden Inputs
  export const version = "2019.10.16";
  export const element = Helper.createMPCElement("mpc:input");
  export const commands: Command[] = [
    { key: "Alt", down() { return false; } },
    { key: "AltLock", down() { return false; } },
    { key: "AltGraph", down() { return false; } },
    { key: "AltGraphLock", down() { return false; } },
    { key: "Control", down() { return false; } },
    { key: "ControlLock", down() { return false; } },
    { key: "F1", down() { return false; } },
    { key: "F2", down() { return false; } },
    { key: "F3", down() { return false; } },
    { key: "F4", down() { return false; } },
    { key: "F5", down() { return false; } },
    { key: "F6", down() { return false; } },
    { key: "F7", down() { return false; } },
    { key: "F8", down() { return false; } },
    { key: "F9", down() { return false; } },
    { key: "F10", down() { return false; } },
    { key: "F11", down() { return false; } },
    { key: "F12", down() { return false; } },
    { key: "FN", down() { return false; } },
    { key: "FNLock", down() { return false; } },
    { key: "Meta", down() { return false; } },
    { key: "MetaLock", down() { return false; } },
    { key: "Shift", down() { return false; } },
    { key: "CapsLock", down() { return false; } },
    { key: "ShiftLock", down() { return false; } },
    { key: "Symbol", down() { return false; } },
    { key: "SymbolLock", down() { return false; } },
    { key: "ContextMenu", down() { return false; } },
    { key: "Dead", down() { return false; } },
    { key: "ArrowUp", down() { return false; } },
    {
      key: "ArrowLeft",
      down() {
        let activeElement = Caret.activeElement;
        let activeWindow = Caret.activeWindow;
        if (
          activeElement instanceof activeWindow.HTMLInputElement ||
          activeElement instanceof activeWindow.HTMLTextAreaElement
        ) {
          let selDir = activeElement.selectionDirection;
          let selStart = activeElement.selectionStart;
          let selEnd = activeElement.selectionEnd;
          if (selStart == selEnd) {
            if ((Layout.modifiers & MODIFIER_SHIFT) == MODIFIER_SHIFT) {
              selDir = "backward";
              selStart--;
            } else {
              selEnd = --selStart;
            }
          } else if (selDir == "backward") {
            if ((Layout.modifiers & MODIFIER_SHIFT) == MODIFIER_SHIFT) {
              selStart--;
            } else {
              selEnd = --selStart;
            }
          } else {
            if ((Layout.modifiers & MODIFIER_SHIFT) == MODIFIER_SHIFT) {
              selEnd--;
            } else {
              selStart = --selEnd;
            }
          }
          activeElement.selectionDirection = selDir;
          activeElement.selectionStart = selStart;
          activeElement.selectionEnd = selEnd;
        } else {
          let sel = getSelection();
          // if (sel.isCollapsed) {
          let selStartContainer = sel.anchorNode;
          let selStartOffset = sel.anchorOffset;
          let selEndContainer = sel.focusNode;
          let selEndOffset = sel.focusOffset;
          console.log({
            selStartContainer,
            selStartOffset,
            selEndContainer,
            selEndOffset
          });
          // } else {
          //   sel.collapseToStart();
          // }
        }
        return false;
      }
    },
    { key: "ArrowRight", down() { return false; } },
    { key: "ArrowDown", down() { return false; } },
    { key: "Undefined", down() { return false; } },
    { key: "Backspace", down() { Caret.execCommand("delete"); return false; } },
    { key: "Delete", down() { Caret.execCommand("forwardDelete"); return false; } },
    {
      key: "Enter",
      press() {
        let activeElement = Caret.activeElement;
        let activeWindow = Caret.activeWindow;
        if (activeElement instanceof activeWindow.HTMLElement) {
          if (/^(a|button|details|summary)$/i.test(activeElement.nodeName)) {
            activeElement.click();
            return "";
          } else if (activeElement instanceof activeWindow.HTMLInputElement) {
            switch (activeElement.type) {
              case "button":
              case "image":
              case "reset":
              case "submit":
                activeElement.click();
                break;
              default:
                activeElement.form && activeElement.form.submit();
                break;
            }
            return "";
          } else if (activeElement instanceof activeWindow.HTMLSelectElement) {
            activeElement.form && activeElement.form.submit();
            return "";
          }
        }
        return "\n";
      }
    },
    {
      key: " ",
      press() {
        let activeElement = Caret.activeElement;
        let activeWindow = Caret.activeWindow;
        if (activeElement instanceof activeWindow.HTMLElement) {
          if (/^(a|button|details|summary|select)$/i.test(activeElement.nodeName)) {
            activeElement.click();
            return "";
          } else if (activeElement instanceof activeWindow.HTMLInputElement) {
            switch (activeElement.type) {
              case "button":
              case "checkbox":
              case "image":
              case "radio":
              case "reset":
              case "submit":
                activeElement.click();
                return "";
              default:
                break;
            }
          }
        }
        if ((Layout.modifiers & MODIFIER_SHIFT) == MODIFIER_SHIFT) {
          return "\u00a0";
        } else {
          return " ";
        }
      }
    },
    {
      key: "Tab",
      down() {
        if (!Caret.activeWindow.getSelection().isCollapsed) {
          if ((Layout.modifiers & MODIFIER_SHIFT) == MODIFIER_SHIFT) {
            Caret.execCommand("outdent");
          } else {
            Caret.execCommand("indent");
          }
        } else if (Caret.activeDocument.designMode == "on") {
          return true;
        } else {
          if ((Layout.modifiers & MODIFIER_SHIFT) == MODIFIER_SHIFT) {
            Helper.getPreviousFocusable().focus();
          } else {
            Helper.getNextFocusable().focus();
          }
          return false;
        }
      },
      press() { return "\t"; }
    },
    { code: "KeyA", modifiers: MODIFIER_CTRL.toString(), down() { Caret.execCommand("selectAll"); return false; } },
    { code: "KeyB", modifiers: MODIFIER_CTRL.toString(), down() { Caret.execCommand("bold"); return false; } },
    { code: "KeyC", modifiers: MODIFIER_CTRL.toString(), down() { Caret.execCommand("copy"); return false; } },
    { code: "KeyI", modifiers: MODIFIER_CTRL.toString(), down() { Caret.execCommand("italic"); return false; } },
    {
      code: "KeyP",
      modifiers: MODIFIER_CTRL.toString(),
      lastTimeout: -1,
      down() {
        if (this.lastTimeout + 5000 < Date.now()) {
          this.lastTimeout = Date.now();
          setTimeout(Caret.activeWindow.print, 100);
        }
        return false;
      }
    },
    { code: "KeyU", modifiers: MODIFIER_CTRL.toString(), down() { Caret.execCommand("underline"); return false; } },
    { code: "KeyV", modifiers: MODIFIER_CTRL.toString(), down() { Caret.execCommand("paste"); return false; } },
    {
      code: "KeyV",
      modifiers: (MODIFIER_SHIFT | MODIFIER_CTRL).toString(),
      down() {
        if (Helper.window.navigator.clipboard && typeof Helper.window.navigator.clipboard.readText == "function") {
          Helper.window.navigator.clipboard.readText().then(text => {
            Caret.execCommand("insertText", false, text);
          }, () => {
            Caret.execCommand("insertText", false, Helper.prompt("Please paste text here"));
          });
        } else {
          Caret.execCommand("insertText", false, Helper.prompt("Please paste text here"));
        }
        return false;
      }
    },
    { code: "KeyX", modifiers: MODIFIER_CTRL.toString(), down() { Caret.execCommand("cut"); return false; } },
    { code: "KeyY", modifiers: MODIFIER_CTRL.toString(), down() { Caret.execCommand("redo"); return false; } },
    { code: "KeyZ", modifiers: MODIFIER_CTRL.toString(), down() { Caret.execCommand("undo"); return false; } },
    { code: "Language", down() { Menu.showMenu(Menu.LanguageMenu); return false; } },
    { modifiers: MODIFIER_CTRL.toString(), down() { return false; } },
    { modifiers: MODIFIER_ALT.toString(), down() { return false; } },
    { modifiers: MODIFIER_META.toString(), down() { return false; } },
    { key: /./, down() { return true; }, press(key) { return key.key; } }
  ];
  export declare const languageCommands: ReadonlyArray<Command>;
  export declare const layoutCommands: ReadonlyArray<Command>;

  var _languageCommands: Command[] = [];
  var _layoutCommands: Command[] = [];

  export interface Key {
    /**
     * Liefert einen `DOMString` mit dem Codewert der Taste, welche durch das Event
     * repräsentiert wird.
     * @example
     * "ControlLeft" | "KeyA" ...
     */
    code: string;
    /**
     * Liefert einen `DOMString` der den Wert der Taste darstellt die durch das Event
     * repräsentiert wird.
     * @example
     * " " | "a" | "A" | "Control" ...
     */
    key: string;
    /**
     * Liefert einen `KEY_LOCATION` Wert der die Lage der Taste auf der Tastatur oder einem
     * anderen Eingabegerät repräsentiert.
     * @example
     * KEY_LOCATION_STANDARD | KEY_LOCATION_LEFT |
     * KEY_LOCATION_RIGHT | KEY_LOCATION_NUMPAD
     */
    location: KEY_LOCATION;
    /**
     * Liefert einen `Boolean` Wert der `true` ist, falls die Taste gedrückt gehalten
     * wird, so dass sie sich automatisch wiederholt.
     */
    repeat: boolean;
  }
  export interface Command {
    /**
     * Liefert einen `DOMString` mit dem Codewert der Taste, welche durch das Event
     * repräsentiert wird.
     * @example
     * "ControlLeft" | "KeyA" ...
     * 
     * @if `string`: `Key.code == string`
     * @if `RegExp`: `RegExp.test(Key.code)`
     */
    code?: string | RegExp;
    /**
     * Liefert einen `DOMString` der den Wert der Taste darstellt die durch das Event
     * repräsentiert wird.
     * @example
     * " " | "a" | "A" | "Control" ...
     * 
     * @if `string`: `Key.key == string`
     * @if `RegExp`: `RegExp.test(Key.key)`
     */
    key?: string | RegExp;
    /**
     * Liefert einen `KEY_LOCATION` Wert der die Lage der Taste auf der Tastatur oder einem
     * anderen Eingabegerät repräsentiert.
     * @example
     * KEY_LOCATION_STANDARD | KEY_LOCATION_LEFT |
     * KEY_LOCATION_RIGHT | KEY_LOCATION_NUMPAD
     * 
     * @if `KEY_LOCATION`: `Key.location & KEY_LOCATION = KEY_LOCATION`
     * @if `RegExp`: `RegExp.test(Key.location)`
     */
    location?: KEY_LOCATION | RegExp;
    /**
     * Liefert einen `Boolean` Wert der `true` ist, falls die Taste gedrückt gehalten
     * wird, so dass sie sich automatisch wiederholt.
     */
    repeat?: boolean;
    /**
     * @if `MODIFIER`: `Layout.modifiers & MODIFIER == MODIFIER`
     * @if `string`: `Layout.modifiers == string`
     * @if `RegExp`: `RegExp.test(Layout.modifiers)`
     */
    modifiers?: MODIFIER | string | RegExp;
    /**
     * @returns `true` if keypress-event should be dispatched
     * @returns `false` | `void` if no keypress-event should be dispatched
     */
    down?: (this: this, key: Key) => boolean | void;
    press?: (this: this, key: Key) => string | void;
    up?: (this: this, key: Key) => boolean | void;
    [s: string]: any;
  }

  Helper.defineProperties(Input, {
    languageCommands: {
      get() { return _languageCommands; },
      enumerable: true,
      configurable: false
    },
    layoutCommands: {
      get() { return _layoutCommands; },
      enumerable: true,
      configurable: false
    }
  });
  MPCKeyboard.element.appendChild(element);

  export function getCommandsFor(key: Key): Command[] {
    var _commands: Command[] = [];
    getCommandsFrom(_languageCommands, key, _commands);
    getCommandsFrom(_layoutCommands, key, _commands);
    getCommandsFrom(commands, key, _commands);
    return _commands;
  }
  export function handleKeyDown(key: Key, commands: Command[] = getCommandsFor(key)) {
    // console.log("handleKeyDown(", ...arguments, ")");
    var event = new KeyboardEvent("keydown", {
      altKey: (Layout.modifiers & MODIFIER_ALT) == MODIFIER_ALT,
      bubbles: true,
      cancelable: true,
      code: key.code,
      composed: false,
      ctrlKey: (Layout.modifiers & MODIFIER_CTRL) == MODIFIER_CTRL,
      detail: 0,
      key: key.key,
      lang: lang,
      location: key.location,
      metaKey: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
      modifierAltGraph: (Layout.modifiers & MODIFIER_ALTGRAPH) == MODIFIER_ALTGRAPH,
      modifierCapsLock: (Layout.modifier_locks & MODIFIER_SHIFT) == MODIFIER_SHIFT,
      modifierFn: (Layout.modifiers & MODIFIER_FN) == MODIFIER_FN,
      modifierFnLock: (Layout.modifier_locks & MODIFIER_FN) == MODIFIER_FN,
      modifierHyper: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
      modifierNumLock: false,
      // modifierOS: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
      modifierScrollLock: false,
      modifierSuper: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
      modifierSymbol: (Layout.modifiers & MODIFIER_SYMBOL) == MODIFIER_SYMBOL,
      modifierSymbolLock: (Layout.modifier_locks & MODIFIER_SYMBOL) == MODIFIER_SYMBOL,
      repeat: key.repeat,
      shiftKey: (Layout.modifiers & MODIFIER_SHIFT) == MODIFIER_SHIFT,
      view: Caret.activeWindow
    });
    if (!Caret.activeElement.dispatchEvent(event)) {
      // console.error(key.key, "dispatch-down", event);
      return;
    }
    var index = 0;
    var length = commands.length;
    var rslt: boolean | void;
    var dispatchKeyPressEvent = null;
    for (index; index < length; index++) {
      if (typeof commands[index].down == "function") {
        rslt = commands[index].down(key);
        if (typeof rslt == "boolean") {
          dispatchKeyPressEvent = rslt;
          break;
        }
      }
    }
    if (dispatchKeyPressEvent) {
      handleKeyPress(key, commands);
    }
  }
  export function handleKeyPress(key: Key, commands: Command[] = getCommandsFor(key)) {
    // console.log("handleKeyPress(", ...arguments, ")");
    var event = new KeyboardEvent("keypress", {
      altKey: (Layout.modifiers & MODIFIER_ALT) == MODIFIER_ALT,
      bubbles: true,
      cancelable: true,
      code: key.code,
      composed: false,
      ctrlKey: (Layout.modifiers & MODIFIER_CTRL) == MODIFIER_CTRL,
      detail: 0,
      key: key.key,
      lang: lang,
      location: key.location,
      metaKey: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
      modifierAltGraph: (Layout.modifiers & MODIFIER_ALTGRAPH) == MODIFIER_ALTGRAPH,
      modifierCapsLock: (Layout.modifier_locks & MODIFIER_SHIFT) == MODIFIER_SHIFT,
      modifierFn: (Layout.modifiers & MODIFIER_FN) == MODIFIER_FN,
      modifierFnLock: (Layout.modifier_locks & MODIFIER_FN) == MODIFIER_FN,
      modifierHyper: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
      modifierNumLock: false,
      // modifierOS: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
      modifierScrollLock: false,
      modifierSuper: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
      modifierSymbol: (Layout.modifiers & MODIFIER_SYMBOL) == MODIFIER_SYMBOL,
      modifierSymbolLock: (Layout.modifier_locks & MODIFIER_SYMBOL) == MODIFIER_SYMBOL,
      repeat: key.repeat,
      shiftKey: (Layout.modifiers & MODIFIER_SHIFT) == MODIFIER_SHIFT,
      view: Caret.activeWindow
    });
    if (!Caret.activeElement.dispatchEvent(event)) {
      console.error(key.key, "dispatch-press", event);
      return;
    }
    var index = 0;
    var length = commands.length;
    var rslt: string | void;
    var text = "";
    for (index; index < length; index++) {
      if (typeof commands[index].press == "function") {
        rslt = commands[index].press(key);
        if (typeof rslt == "string") {
          text = rslt;
          break;
        }
      }
    }
    Caret.execCommand("insertText", false, text);
  }
  export function handleKeyUp(key: Key, commands: Command[] = getCommandsFor(key)) {
    // console.log("handleKeyUp(", ...arguments, ")");
    var event = new KeyboardEvent("keyup", {
      altKey: (Layout.modifiers & MODIFIER_ALT) == MODIFIER_ALT,
      bubbles: true,
      cancelable: true,
      code: key.code,
      composed: false,
      ctrlKey: (Layout.modifiers & MODIFIER_CTRL) == MODIFIER_CTRL,
      detail: 0,
      key: key.key,
      lang: lang,
      location: key.location,
      metaKey: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
      modifierAltGraph: (Layout.modifiers & MODIFIER_ALTGRAPH) == MODIFIER_ALTGRAPH,
      modifierCapsLock: (Layout.modifier_locks & MODIFIER_SHIFT) == MODIFIER_SHIFT,
      modifierFn: (Layout.modifiers & MODIFIER_FN) == MODIFIER_FN,
      modifierFnLock: (Layout.modifier_locks & MODIFIER_FN) == MODIFIER_FN,
      modifierHyper: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
      modifierNumLock: false,
      // modifierOS: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
      modifierScrollLock: false,
      modifierSuper: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
      modifierSymbol: (Layout.modifiers & MODIFIER_SYMBOL) == MODIFIER_SYMBOL,
      modifierSymbolLock: (Layout.modifier_locks & MODIFIER_SYMBOL) == MODIFIER_SYMBOL,
      repeat: key.repeat,
      shiftKey: (Layout.modifiers & MODIFIER_SHIFT) == MODIFIER_SHIFT,
      view: Caret.activeWindow
    });
    if (!Caret.activeElement.dispatchEvent(event)) {
      // console.error(key.key, "dispatch-up", event);
      return;
    }
    var index = 0;
    var length = commands.length;
    var rslt: boolean | void;
    for (index; index < length; index++) {
      if (typeof commands[index].up == "function") {
        rslt = commands[index].up(key);
        if (typeof rslt == "boolean") {
          break;
        }
      }
    }
  }
  export function setLayoutCommands(commands: Command[]) {
    _layoutCommands = commands;
  }
  export function setLanguageCommands(commands: Command[]) {
    _languageCommands = commands;
  }
  function getCommandsFrom(commands: Command[], key: Key, results: Command[]) {
    Helper.forEach(commands, command => {
      if (typeof command.down != "function" && typeof command.press != "function" && typeof command.up != "function") {
        // console.error(key.key, "callback", command);
        return;
      }
      if (
        (typeof command.code == "string" && command.code != key.code) ||
        (command.code instanceof RegExp && !command.code.test(key.code))
      ) {
        // console.error(key.key, "code", command.code);
        return;
      }
      if (
        (typeof command.key == "string" && command.key != key.key) ||
        (command.key instanceof RegExp && !command.key.test(key.key))
      ) {
        // console.error(key.key, "key", command.key);
        return;
      }
      if (
        (typeof command.location == "number" && command.location != key.location) ||
        (command.location instanceof RegExp && !command.location.test(key.location.toString()))
      ) {
        // console.error(key.key, "location", command.location);
        return;
      }
      if (
        typeof command.repeat == "boolean" && command.repeat != key.repeat
      ) {
        // console.error(key.key, "repeat", command.repeat);
        return;
      }
      if (
        (typeof command.modifiers == "number" && (Layout.modifiers & command.modifiers) != command.modifiers) ||
        (typeof command.modifiers == "string" && command.modifiers != Layout.modifiers.toString()) ||
        (command.modifiers instanceof RegExp && !command.modifiers.test(Layout.modifiers.toString()))
      ) {
        // console.error(key.key, "modifiers", command.modifiers);
        return;
      }
      results.push(command);
    });
    return results;
  }
}