/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />

namespace MPCKeyboard.Layout {
  // # Layout
  // Bereitstellung der Keys
  // Bestückung mit Keys
  // Bestückung der Keys
  export const version = "2019.10.24";
  export const element = Helper.createMPCElement("mpc:layout");
  export const style = Helper.createHTMLElement("mpc:style");
  export const keys: {
    [code: string]: MPCKeyElement;
  } = Object.create(null);
  export const keyCodes: string[] = [];
  export const spans: MPCSpanElement[] = [];
  export declare const activeLayout: KeyboardLayout;
  export declare const activeKeyMap: KeyMap;
  const _codes: { [key: string]: Key; } = {};

  export declare var modifiers: MODIFIER;
  export declare var modifier_locks: MODIFIER;
  var _activeLayout: KeyboardLayout = [];
  var _activeKeyMap: KeyMap = {};
  var _touchId: number = null;
  var _modifiers: MODIFIER = 0;
  var _modifier_locks: MODIFIER = 0;
  var _key: { code: string; key: string; location: KEY_LOCATION; rect: DOMRect | ClientRect; } = null;

  export interface KeyboardLayoutKey<C extends string = string> {
    /**
     * Der Wert muss nicht einzigartig sein, sollte es aber!
     * @example "ControlLeft" | "KeyA" ...
     */
    code: C;
    /**
     * relative Weite der Taste in der Reihe
     * @default 2
     */
    width?: number;
    /**
     * Lage der Taste auf der Tastatur.
     * @default KEY_LOCATION_STANDARD
     */
    location?: KEY_LOCATION;
    /**
     * Verändert Aussehen der Taste (s.a. MPCKeyboard.Theme)
     * @example "Modifier"
     * @default null
     */
    feature?: string
  }
  export interface KeyboardLayoutSpan {
    /**
     * relative Weite der Taste in der Reihe
     * @default 2
     */
    width?: number;
  }
  export interface KeyboardKey {
    key: string;
    /**
     * Gibt ein benutzerdefiniertes Label an
     * @default this.key
     */
    label?: string;
  }
  interface Key {
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
    timeout: number;
    interval: number;
    stopped: boolean;
    isModifier: boolean;
    keyElements: MPCKeyElement[];
  }

  export type KeyboardLayout<C extends string = string> = (KeyboardLayoutKey<C> | KeyboardLayoutSpan)[][];
  export type KeyMap<C extends string = string> = { [code in C]?: KeyboardKey; };

  export class MPCKeyElement extends Element {
    get code() { return this.getAttribute("code"); }
    get size() { return this.getAttribute("size"); }
    set size(value: string) { this.setAttribute("size", value); }
    get location() { return <KEY_LOCATION>Number(this.getAttribute("location") || KEY_LOCATION_STANDARD); }
    set location(value: KEY_LOCATION) { this.setAttribute("location", value.toString()); }
    get feature() { return this.getAttribute("feature") || ""; }
    set feature(value: string) { value == "" ? this.removeAttribute("feature") : this.setAttribute("feature", value); }
    get label() { return this.innerHTML; }
    set label(value: string) { this.innerHTML = value; }
    get key() { return this.getAttribute("key") || ""; }
    set key(value: string) { this.setAttribute("key", value); }
  }
  export class MPCSpanElement extends Element {
    get size() { return this.getAttribute("size"); }
    set size(value: string) { this.setAttribute("size", value); }
  }

  Helper.defineProperties(Layout, {
    modifiers: {
      get() { return _modifiers; },
      set(value: MODIFIER) { _modifiers = value; },
      enumerable: true,
      configurable: false
    },
    modifier_locks: {
      get() { return _modifier_locks; },
      set(value: MODIFIER) { _modifier_locks = value; },
      enumerable: true,
      configurable: false
    },
    activeLayout: {
      get() { return _activeLayout; },
      enumerable: true,
      configurable: false
    },
    activeKeyMap: {
      get() { return _activeKeyMap; },
      enumerable: true,
      configurable: false
    }
  });

  MPCKeyboard.Theme.element.appendChild(style);
  MPCKeyboard.element.appendChild(element);

  element.addEventListener("mousedown", _down);
  element.addEventListener("mousemove", _move);
  element.addEventListener("mouseup", _up);
  Helper.window.addEventListener("mousemove", _move);
  Helper.window.addEventListener("mouseup", _up);

  element.addEventListener("touchstart", _down);
  element.addEventListener("touchmove", _move);
  element.addEventListener("touchcancel", _cancel);
  element.addEventListener("touchend", _up);
  Helper.window.addEventListener("touchmove", _move);
  Helper.window.addEventListener("touchcancel", _cancel);
  Helper.window.addEventListener("touchend", _up);

  element.addEventListener("pointerdown", _down);
  element.addEventListener("pointermove", _move);
  element.addEventListener("pointercancel", _cancel);
  element.addEventListener("pointerup", _up);
  Helper.window.addEventListener("pointermove", _move);
  Helper.window.addEventListener("pointercancel", _cancel);
  Helper.window.addEventListener("pointerup", _up);

  export function getMPCKeyElementsByKey(key: string, getFirstOnly?: false): MPCKeyElement[];
  export function getMPCKeyElementsByKey(key: string, getFirstOnly: true): MPCKeyElement | null;
  export function getMPCKeyElementsByKey(key: string, getFirstOnly: boolean = false): MPCKeyElement[] | MPCKeyElement | null {
    key = keyFilter({ key }).key;
    var rslt = [];
    Helper.forEach(keyCodes, code => {
      if (keys[code].key == key) {
        rslt.push(keys[code]);
      }
    });
    return getFirstOnly ? rslt.length > 0 ? rslt[0] : null : rslt;
  }
  export function hasModifier(mod: MODIFIER, persistent: boolean = false): boolean {
    if (persistent) {
      return (modifier_locks & mod) == mod;
    } else {
      return (modifiers & mod) == mod;
    }
  }
  export function setModifier(mod: MODIFIER, persistent: boolean = false): void {
    modifiers = <MODIFIER>(modifiers | mod);
    if (persistent) {
      modifier_locks = <MODIFIER>(modifier_locks | mod);
    }
    updateModifiers();
  }
  export function removeModifier(mod: MODIFIER): void;
  export function removeModifier(mod: MODIFIER, remove_persistent_only: boolean): void;
  export function removeModifier(mod: MODIFIER, remove_persistent_only: boolean = false): void {
    if (!remove_persistent_only) {
      modifiers = <MODIFIER>(modifiers & ~mod);
    }
    modifier_locks = <MODIFIER>(modifier_locks & ~mod);
    updateModifiers();
  }
  export function updateModifiers() {
    if ((modifiers & MODIFIER_ALT) == MODIFIER_ALT) {
      if ((modifier_locks & MODIFIER_ALT) == MODIFIER_ALT) {
        modifyKey("Alt", "lock=persistent", true);
        modifyKey("AltLock", "lock=persistent", true);
      } else {
        modifyKey("Alt", "lock", true);
        modifyKey("AltLock", "lock", false);
      }
    } else {
      modifyKey("Alt", "lock", false);
      modifyKey("AltLock", "lock", false);
    }
    if ((modifiers & MODIFIER_ALTGRAPH) == MODIFIER_ALTGRAPH) {
      if ((modifier_locks & MODIFIER_ALTGRAPH) == MODIFIER_ALTGRAPH) {
        modifyKey("AltGraph", "lock=persistent", true);
        modifyKey("AltGraphLock", "lock=persistent", true);
      } else {
        modifyKey("AltGraph", "lock", true);
        modifyKey("AltGraphLock", "lock", false);
      }
    } else {
      modifyKey("AltGraph", "lock", false);
      modifyKey("AltGraphLock", "lock", false);
    }
    if ((modifiers & MODIFIER_CTRL) == MODIFIER_CTRL) {
      if ((modifier_locks & MODIFIER_CTRL) == MODIFIER_CTRL) {
        modifyKey("Control", "lock=persistent", true);
        modifyKey("ControlLock", "lock=persistent", true);
      } else {
        modifyKey("Control", "lock", true);
        modifyKey("ControlLock", "lock", false);
      }
    } else {
      modifyKey("Control", "lock", false);
      modifyKey("ControlLock", "lock", false);
    }
    if ((modifiers & MODIFIER_FN) == MODIFIER_FN) {
      if ((modifier_locks & MODIFIER_FN) == MODIFIER_FN) {
        modifyKey("FN", "lock=persistent", true);
        modifyKey("FNLock", "lock=persistent", true);
      } else {
        modifyKey("FN", "lock", true);
        modifyKey("FNLock", "lock", false);
      }
    } else {
      modifyKey("FN", "lock", false);
      modifyKey("FNLock", "lock", false);
    }
    if ((modifiers & MODIFIER_META) == MODIFIER_META) {
      if ((modifier_locks & MODIFIER_META) == MODIFIER_META) {
        modifyKey("Meta", "lock=persistent", true);
        modifyKey("MetaLock", "lock=persistent", true);
      } else {
        modifyKey("Meta", "lock", true);
        modifyKey("MetaLock", "lock", false);
      }
    } else {
      modifyKey("Meta", "lock", false);
      modifyKey("MetaLock", "lock", false);
    }
    if ((modifiers & MODIFIER_SHIFT) == MODIFIER_SHIFT) {
      if ((modifier_locks & MODIFIER_SHIFT) == MODIFIER_SHIFT) {
        modifyKey("Shift", "lock=persistent", true);
        modifyKey("CapsLock", "lock=persistent", true);
        modifyKey("ShiftLock", "lock=persistent", true);
      } else {
        modifyKey("Shift", "lock", true);
        modifyKey("CapsLock", "lock", false);
        modifyKey("ShiftLock", "lock", false);
      }
    } else {
      modifyKey("Shift", "lock", false);
      modifyKey("CapsLock", "lock", false);
      modifyKey("ShiftLock", "lock", false);
    }
    if ((modifiers & MODIFIER_SYMBOL) == MODIFIER_SYMBOL) {
      if ((modifier_locks & MODIFIER_SYMBOL) == MODIFIER_SYMBOL) {
        modifyKey("Symbol", "lock=persistent", true);
        modifyKey("SymbolLock", "lock=persistent", true);
      } else {
        modifyKey("Symbol", "lock", true);
        modifyKey("SymbolLock", "lock", false);
      }
    } else {
      modifyKey("Symbol", "lock", false);
      modifyKey("SymbolLock", "lock", false);
    }
    updateLayout();
  }
  export function updateLayout(): void {
    let layout: KeyboardLayout;
    let keyMap: KeyMap;
    let activeKeyboardLanguage = langs.get(lang);
    if (typeof activeKeyboardLanguage.getLayout == "function") {
      layout = activeKeyboardLanguage.getLayout(Caret.activeInputMode, modifiers, modifier_locks);
    } else {
      layout = getLayout(Caret.activeInputMode, modifiers, modifier_locks);
    }
    if (layout !== _activeLayout) {
      _setLayout(layout);
    }
    if (typeof activeKeyboardLanguage.getKeyMap == "function") {
      keyMap = activeKeyboardLanguage.getKeyMap(Caret.activeInputMode, modifiers, modifier_locks);
    } else {
      keyMap = getKeyMap(Caret.activeInputMode, modifiers, modifier_locks);
    }
    if (keyMap !== _activeKeyMap) {
      _setKeyMap(keyMap);
    }
  }
  export function getLayout(): KeyboardLayout;
  export function getLayout(inputMode?: INPUT_MODE, modifiers?: MODIFIER, modifier_locks?: MODIFIER): KeyboardLayout;
  export function getLayout(inputMode?: INPUT_MODE, modifiers?: MODIFIER, modifier_locks?: MODIFIER): KeyboardLayout {
    let i: PropertyKey;
    let mods: MODIFIER[] = [];
    let activeKeyboardLanguage = langs.get(lang);
    for (i in activeKeyboardLanguage.layoutList) {
      i = parseInt(i);
      if (!isNaN(i) && hasModifier(<MODIFIER>i)) {
        mods.push(<MODIFIER>i);
      }
    }
    i = Math.max.apply(null, mods.filter(a => a >= 0 && a <= 63));
    if (<MODIFIER>i < 0) {
      i = 0;
    }
    return activeKeyboardLanguage.layoutList[i] || [];
  }
  export function getKeyMap(): KeyMap;
  export function getKeyMap(inputMode?: INPUT_MODE, modifiers?: MODIFIER, modifier_locks?: MODIFIER): KeyMap;
  export function getKeyMap(inputMode?: INPUT_MODE, modifiers?: MODIFIER, modifier_locks?: MODIFIER): KeyMap {
    let i: PropertyKey;
    let mods: MODIFIER[] = [];
    let activeKeyboardLanguage = langs.get(lang);
    for (i in activeKeyboardLanguage.keyMapList) {
      i = parseInt(i);
      if (!isNaN(i) && hasModifier(<MODIFIER>i)) {
        mods.push(<MODIFIER>i);
      }
    }
    i = Math.max.apply(null, mods.filter(a => a >= 0 && a <= 63));
    if (<MODIFIER>i < 0) {
      i = 0;
    }
    return activeKeyboardLanguage.keyMapList[i] || [];
  }

  export function modifyKey(key: string, attr: string, state: boolean): void {
    key = keyFilter({ key }).key;
    var attrName = attr.replace(/^([^\=]*)(?:\=(.*))?$/, "$1");
    var attrValue = attr.replace(/^([^\=]*)(?:\=(.*))?$/, "$2");
    Helper.forEach(getMPCKeyElementsByKey(key, false), key => {
      if (state) {
        key.setAttribute(attrName, attrValue);
      } else {
        key.removeAttribute(attrName);
      }
    });
  }
  export function keyDown(key: { code: string; key: string; location: KEY_LOCATION; }): void {
    keyFilter(key);
    keyUp(key);
    var _key: Key = {
      code: key.code,
      key: key.key,
      repeat: false,
      timeout: null,
      interval: null,
      stopped: false,
      isModifier: true,
      location: key.location,
      keyElements: getMPCKeyElementsByKey(key.key)
    };
    _codes[_key.code] = _key;
    switch (_key.key) {
      case "Alt":
        if (hasModifier(MODIFIER_ALT, true) || hasModifier(MODIFIER_ALT, false)) {
          removeModifier(MODIFIER_ALT);
        } else {
          setModifier(MODIFIER_ALT, false);
        }
        break;
      case "AltLock":
        if (hasModifier(MODIFIER_ALT, true)) {
          removeModifier(MODIFIER_ALT);
        } else {
          setModifier(MODIFIER_ALT, true);
        }
        break;
      case "AltGraph":
        if (hasModifier(MODIFIER_ALTGRAPH, true) || hasModifier(MODIFIER_ALTGRAPH, false)) {
          removeModifier(MODIFIER_ALTGRAPH);
        } else {
          setModifier(MODIFIER_ALTGRAPH, false);
        }
        break;
      case "AltGraphLock":
        if (hasModifier(MODIFIER_ALTGRAPH, true)) {
          removeModifier(MODIFIER_ALTGRAPH);
        } else {
          setModifier(MODIFIER_ALTGRAPH, true);
        }
        break;
      case "Control":
        if (hasModifier(MODIFIER_CTRL, true) || hasModifier(MODIFIER_CTRL, false)) {
          removeModifier(MODIFIER_CTRL);
        } else {
          setModifier(MODIFIER_CTRL);
        }
        break;
      case "ControlLock":
        if (hasModifier(MODIFIER_CTRL, true)) {
          removeModifier(MODIFIER_CTRL);
        } else {
          setModifier(MODIFIER_CTRL, true);
        }
        break;
      case "FN":
        if (hasModifier(MODIFIER_FN, true) || hasModifier(MODIFIER_FN, false)) {
          removeModifier(MODIFIER_FN);
        } else {
          setModifier(MODIFIER_FN, false);
        }
        break;
      case "FNLock":
        if (hasModifier(MODIFIER_FN, true)) {
          removeModifier(MODIFIER_FN);
        } else {
          setModifier(MODIFIER_FN, true);
        }
        break;
      case "Meta":
        if (hasModifier(MODIFIER_META, true) || hasModifier(MODIFIER_META, false)) {
          removeModifier(MODIFIER_META);
        } else {
          setModifier(MODIFIER_META, false);
        }
        break;
      case "MetaLock":
        if (hasModifier(MODIFIER_META, true)) {
          removeModifier(MODIFIER_META);
        } else {
          setModifier(MODIFIER_META, true);
        }
        break;
      case "Shift":
        if (hasModifier(MODIFIER_SHIFT, true) || hasModifier(MODIFIER_SHIFT, false)) {
          removeModifier(MODIFIER_SHIFT);
        } else {
          setModifier(MODIFIER_SHIFT, false);
        }
        break;
      case "CapsLock":
      case "ShiftLock":
        if (hasModifier(MODIFIER_SHIFT, true)) {
          removeModifier(MODIFIER_SHIFT);
        } else {
          setModifier(MODIFIER_SHIFT, true);
        }
        break;
      case "Symbol":
        if (hasModifier(MODIFIER_SYMBOL, true) || hasModifier(MODIFIER_SYMBOL, false)) {
          removeModifier(MODIFIER_SYMBOL);
        } else {
          setModifier(MODIFIER_SYMBOL, false);
        }
        break;
      case "SymbolLock":
        if (hasModifier(MODIFIER_SYMBOL, true)) {
          removeModifier(MODIFIER_SYMBOL);
        } else {
          setModifier(MODIFIER_SYMBOL, true);
        }
        break;
      default:
        _key.isModifier = false;
        break;
    }
    Helper.forEach(_key.keyElements, key => key.setAttribute("down", ""));
    Input.handleKeyDown(_key);
    _key.timeout = setTimeout(() => {
      switch (_key.key) {
        case "Alt":
          if (hasModifier(MODIFIER_ALT, true)) {
            removeModifier(MODIFIER_ALT);
          } else {
            setModifier(MODIFIER_ALT, true);
          }
          break;
        case "AltGraph":
          if (hasModifier(MODIFIER_ALTGRAPH, true)) {
            removeModifier(MODIFIER_ALTGRAPH);
          } else {
            setModifier(MODIFIER_ALTGRAPH, true);
          }
          break;
        case "Control":
          if (hasModifier(MODIFIER_CTRL, true)) {
            removeModifier(MODIFIER_CTRL);
          } else {
            setModifier(MODIFIER_CTRL, true);
          }
          break;
        case "FN":
          if (hasModifier(MODIFIER_FN, true)) {
            removeModifier(MODIFIER_FN);
          } else {
            setModifier(MODIFIER_FN, true);
          }
          break;
        case "Meta":
          if (hasModifier(MODIFIER_META, true)) {
            removeModifier(MODIFIER_META);
          } else {
            setModifier(MODIFIER_META, true);
          }
          break;
        case "Shift":
          if (hasModifier(MODIFIER_SHIFT, true)) {
            removeModifier(MODIFIER_SHIFT);
          } else {
            setModifier(MODIFIER_SHIFT, true);
          }
          break;
        case "Symbol":
          if (hasModifier(MODIFIER_SYMBOL, true)) {
            removeModifier(MODIFIER_SYMBOL);
          } else {
            setModifier(MODIFIER_SYMBOL, true);
          }
          break;
        default:
          break;
      }
      Helper.forEach(_key.keyElements, key => key.setAttribute("down", "hold"));
      _key.repeat = true;
      Input.handleKeyDown(_key);
      _key.timeout = null;
      _key.interval = setInterval(() => {
        if (_key.stopped) {
          clearInterval(_key.interval);
        } else {
          Input.handleKeyDown(_key);
        }
      }, Options.keyRepeatInterval);
    }, Options.keyHoldTimeout);
  }
  export function keyUp(key: { code: string; key: string; location: KEY_LOCATION; }): void {
    keyFilter(key);
    if (!Helper.hasOwnProperty(_codes, key.code)) {
      return;
    }
    let _key = <Key>_codes[key.code];
    _key.stopped = true;
    typeof _key.timeout == "number" && clearTimeout(_key.timeout);
    typeof _key.interval == "number" && clearInterval(_key.interval);
    Input.handleKeyUp(_key);
    Helper.forEach(_key.keyElements, key => key.removeAttribute("down"));
    // remove non persistent modifiers
    // only if _key.key was not a modifier
    if (!_key.isModifier) {
      var removableModifiers: MODIFIER = 0;
      if (!hasModifier(MODIFIER_ALT, true)) { removableModifiers |= MODIFIER_ALT; }
      if (!hasModifier(MODIFIER_CTRL, true)) { removableModifiers |= MODIFIER_CTRL; }
      if (!hasModifier(MODIFIER_FN, true)) { removableModifiers |= MODIFIER_FN; }
      if (!hasModifier(MODIFIER_META, true)) { removableModifiers |= MODIFIER_META; }
      if (!hasModifier(MODIFIER_SHIFT, true)) { removableModifiers |= MODIFIER_SHIFT; }
      if (!hasModifier(MODIFIER_SYMBOL, true)) { removableModifiers |= MODIFIER_SYMBOL; }
      removeModifier(<MODIFIER>removableModifiers);
    }
    delete _codes[key.code];
  }
  export function releaseAllKeys(): void {
    var code: string;
    for (code in _codes) {
      if (Helper.hasOwnProperty(_codes, code)) {
        keyUp(_codes[code]);
      }
    }
    _key = null;
    Helper.forEach(element.childNodes, (key: MPCKeyElement) => {
      key.removeAttribute("down");
    });
  }
  export function keyFilter<T extends { key: string; }>(key: T): T {
    switch (key.key) {
      case "Hyper":
      case "Meta":
      case "Super":
      case "OS":
        key.key = "Meta";
        break;
      case "HyperLock":
      case "MetaLock":
      case "SuperLock":
      case "OSLock":
        key.key = "MetaLock";
        break;
      default:
        break;
    }
    return key;
  }
  function _setLayout<C extends string>(layout: KeyboardLayout<C>): void {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    var spanIndex = 0;
    var rows: number[] = [];
    var cols: number[][] = [];
    Helper.forEach(layout, row => {
      let row_length = 0;
      Helper.forEach(row, keyOrSpan => {
        row_length += keyOrSpan.width || 2;
      });
      var rowTemplate = Helper.indexOf(rows, row_length);
      if (rowTemplate == -1) {
        rowTemplate = rows.push(row_length) - 1;
        cols.push([]);
      }
      Helper.forEach(row, keyOrSpan => {
        if ("code" in keyOrSpan) {
          let key = keys[keyOrSpan.code] || null;
          if (key instanceof MPCKeyElement === false) {
            key = <MPCKeyElement>Helper.createMPCElement("mpc:key");
            Helper.setPrototypeOf(key, MPCKeyElement.prototype);
            key.setAttribute("code", keyOrSpan.code);
            keys[key.code] = key;
            keyCodes.push(key.code);
          }
          key.size = rowTemplate + "-" + (keyOrSpan.width || 2);
          if (Helper.indexOf(cols[rowTemplate], (keyOrSpan.width || 2)) == -1) {
            cols[rowTemplate].push((keyOrSpan.width || 2));
          }
          key.location = keyOrSpan.location || KEY_LOCATION_STANDARD;
          key.feature = keyOrSpan.feature || "";
          element.appendChild(key);
        } else {
          let span = spans[spanIndex++] || null;
          if (span instanceof MPCSpanElement === false) {
            span = <MPCSpanElement>Helper.createMPCElement("mpc:span");
            Helper.setPrototypeOf(span, MPCSpanElement.prototype);
            spans.push(span);
          }
          span.size = rowTemplate + "-" + (keyOrSpan.width || 2);
          if (Helper.indexOf(cols[rowTemplate], (keyOrSpan.width || 2)) == -1) {
            cols[rowTemplate].push((keyOrSpan.width || 2));
          }
          element.appendChild(span);
        }
      });
    });
    var styleString = "";
    Helper.forEach(cols, (row, rowTemplate) => {
      Helper.forEach(row, width => {
        styleString += `key[size="${rowTemplate}-${width}"],span[size="${rowTemplate}-${width}"]{width:${width / rows[rowTemplate] * 100}%;flex:${width} ${width} ${width / rows[rowTemplate] * 100}%;}`;
      });
    });
    style.textContent = styleString;
  }
  function _setKeyMap<C extends string>(keyMap: KeyMap<C>): void {
    Helper.forEach(element.children, key => {
      if (key instanceof MPCKeyElement) {
        if (key.code in keyMap) {
          key.key = keyMap[key.code].key || "";
          key.label = typeof keyMap[key.code].label == "string" ? keyMap[key.code].label : key.key;
        } else if (key.feature.length == 0) {
          key.key = "";
          key.label = "";
        }
      }
    });
  }
  function _down(event: MouseEvent | TouchEvent | PointerEvent): void {
    event.preventDefault();
    if (_key || _touchId !== null && Helper.isTouchEvent(event) && (<TouchEvent>event).touches.length > 1) {
      return;
    }
    if (event.target instanceof MPCKeyElement) {
      _key = {
        code: event.target.code,
        key: event.target.key,
        location: event.target.location,
        rect: event.target.getBoundingClientRect()
      };
      keyDown(_key);
      if (Helper.isTouchEvent(event)) {
        _touchId = (<TouchEvent>event).targetTouches[0].identifier;
      }
    }
  }
  function _move(event: MouseEvent | TouchEvent | PointerEvent): void {
    if (Helper.isMouseEvent(event)) {
      if (_key) {
        if (
          (<MouseEvent>event).clientX < _key.rect.left - Options.mousePrecision ||
          (<MouseEvent>event).clientX > _key.rect.right + Options.mousePrecision ||
          (<MouseEvent>event).clientY < _key.rect.top - Options.mousePrecision ||
          (<MouseEvent>event).clientY > _key.rect.bottom + Options.mousePrecision
        ) {
          _cancel(event);
        }
      }
    } else if (Helper.isTouchEvent(event)) {
      if (_key && _touchId !== null) {
        let _touch = Helper.find((<TouchEvent>event).touches, "identifier", _touchId, true);
        if (
          _touch.clientX < _key.rect.left - Options.touchPrecision ||
          _touch.clientX > _key.rect.right + Options.touchPrecision ||
          _touch.clientY < _key.rect.top - Options.touchPrecision ||
          _touch.clientY > _key.rect.bottom + Options.touchPrecision
        ) {
          _cancel(event);
        }
      }
    } else if (Helper.isPointerEvent(event)) {
      if (
        (<PointerEvent>event).clientX < _key.rect.left - Options.pointerPrecision ||
        (<PointerEvent>event).clientX > _key.rect.right + Options.pointerPrecision ||
        (<PointerEvent>event).clientY < _key.rect.top - Options.pointerPrecision ||
        (<PointerEvent>event).clientY > _key.rect.bottom + Options.pointerPrecision
      ) {
        _cancel(event);
      }
    }
  }
  function _cancel(event: MouseEvent | TouchEvent | PointerEvent): void {
    if (!_key || _touchId !== null && Helper.isTouchEvent(event) && Helper.find((<TouchEvent>event).touches, "identifier", _touchId, true)) {
      return;
    }
    keyUp(_key);
    _key = null;
  }
  function _up(event: MouseEvent | TouchEvent | PointerEvent): void {
    if (!_key || _touchId !== null && Helper.isTouchEvent(event) && Helper.find((<TouchEvent>event).touches, "identifier", _touchId, true)) {
      return;
    }
    keyUp(_key);
    _key = null;
  }
}