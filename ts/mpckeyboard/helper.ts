/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />
/// <reference path="jquery-ui-focusable.ts" />

namespace MPCKeyboard.Helper {
  export const version = "2019.10.25";
  export const namespaceURI = "https://mpdieckmann.github.io/mpc";
  export const window = (function (self, top) {
    let win: Window = self;
    try {
      if (top && top.document) {
        win = top;
      } else {
        while (win.parent && win.parent.document) {
          win = win.parent;
        }
      }
    } catch (e) { }
    return win;
  })(self, top);
  export const document = window.document;

  export const Event: Window["Event"] = window.Event || <Window["Event"]>class { constructor(...a: any[]) { } };
  export type Event = Window["Event"]["prototype"];
  export const KeyboardEvent: Window["KeyboardEvent"] = window.KeyboardEvent || <Window["KeyboardEvent"]><unknown>class extends Event { };
  export type KeyboardEvent = Window["KeyboardEvent"]["prototype"];
  export const MouseEvent: Window["MouseEvent"] = window.MouseEvent || <Window["MouseEvent"]><unknown>class extends Event { };
  export type MouseEvent = Window["MouseEvent"]["prototype"];
  export const TouchEvent: Window["TouchEvent"] = window.TouchEvent || <Window["TouchEvent"]><unknown>class extends Event { };
  export type TouchEvent = Window["TouchEvent"]["prototype"];
  export const PointerEvent: Window["PointerEvent"] = window.PointerEvent || <Window["PointerEvent"]><unknown>class extends Event { };
  export type PointerEvent = Window["PointerEvent"]["prototype"];

  export const supports_Event = Event === window.Event;
  export const supports_KeyboardEvent = KeyboardEvent === window.KeyboardEvent;
  export const supports_MouseEvent = MouseEvent === window.MouseEvent;
  export const supports_TouchEvent = TouchEvent === window.TouchEvent;
  export const supports_PointerEvent = PointerEvent === window.PointerEvent;

  export const requestAnimationFrame = window.requestAnimationFrame;

  // Properties from window.Array
  export const concat: {
    // #region definition
    /**
      * Combines two or more arrays.
      * @param items Additional items to add to the end of array1.
      */
    <T>(...items: ConcatArray<T>[]): T[];
    /**
      * Combines two or more arrays.
      * @param items Additional items to add to the end of array1.
      */
    <T>(...items: (T | ConcatArray<T>)[]): T[];
    // #endregion
  } = window.Function.prototype.call.bind(window.Array.prototype.concat);
  export const filter: {
    // #region definition
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    <S extends T, T>(array: T[], callbackfn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
    <S extends T, T>(array: ArrayLike<T>, callbackfn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
    /**
      * Returns the elements of an array that meet the condition specified in a callback function.
      * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    <T>(array: T[], callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
    <T>(array: ArrayLike<T>, callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
    // #endregion
  } = window.Function.prototype.call.bind(window.Array.prototype.filter);
  export const forEach: {
    // #region definition
    /**
     * Performs the specified action for each element in an array.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    <T>(array: T[], callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
    <T>(array: ArrayLike<T>, callbackfn: (value: T, index: number, array: ArrayLike<T>) => void, thisArg?: any): void;
    // #endregion
  } = window.Function.prototype.call.bind(window.Array.prototype.forEach);
  export const indexOf: {
    // #region definition
    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
      */
    <T>(array: T[], searchElement: T, fromIndex?: number): number;
    <T>(array: ArrayLike<T>, searchElement: T, fromIndex?: number): number;
    // #endregion
  } = window.Function.prototype.call.bind(window.Array.prototype.indexOf);
  export const map: {
    // #region definition
    /**
      * Calls a defined callback function on each element of an array, and returns an array that contains the results.
      * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    <T, U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    // #endregion
  } = window.Function.prototype.call.bind(window.Array.prototype.map);

  // Properties from document
  export const createMPCElement: {
    // #region definition
    /**
     * Returns an element with namespace `namespace`. Its namespace prefix will be everything before ":" (U+003E) in qualifiedName or null. Its local name will be everything after
     * ":" (U+003E) in qualifiedName or qualifiedName.
     * If localName does not match the Name production an
     * "InvalidCharacterError" DOMException will be thrown.
     * If one of the following conditions is true a "NamespaceError" DOMException will be thrown:
     * localName does not match the QName production.
     * Namespace prefix is not null and namespace is the empty string.
     * Namespace prefix is "xml" and namespace is not the XML namespace.
     * qualifiedName or namespace prefix is "xmlns" and namespace is not the XMLNS namespace.
     * namespace is the XMLNS namespace and
     * neither qualifiedName nor namespace prefix is "xmlns".
     * When supplied, options's is can be used to create a customized built-in element.
     */
    (qualifiedName: string, options?: ElementCreationOptions): Element;
    (qualifiedName: string, options?: string | ElementCreationOptions): Element;
    // #endregion
  } = document.createElementNS.bind(document, namespaceURI);
  export const createHTMLElement: {
    // #region definition
    /**
     * Creates an instance of the element for the specified tag.
     * @param tagName The name of an element.
     */
    <K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K];
    (tagName: string, options?: ElementCreationOptions): HTMLElement;
    // #endregion
  } = document.createElementNS.bind(document, "http://www.w3.org/1999/xhtml");

  // Properties from window.Object
  export const assign: {
    // #region definition
    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source The source object from which to copy properties.
     */
    <T, U>(target: T, source: U): T & U;

    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source1 The first source object from which to copy properties.
     * @param source2 The second source object from which to copy properties.
     */
    <T, U, V>(target: T, source1: U, source2: V): T & U & V;

    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source1 The first source object from which to copy properties.
     * @param source2 The second source object from which to copy properties.
     * @param source3 The third source object from which to copy properties.
     */
    <T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;

    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param sources One or more source objects from which to copy properties
     */
    (target: object, ...sources: any[]): any;
    // #endregion
  } = window.Object.assign;
  export const create: {
    // #region definition
    /**
      * Creates an object that has the specified prototype or that has null prototype.
      * @param o Object to use as a prototype. May be null.
      */
    (o: object | null): any;

    /**
      * Creates an object that has the specified prototype, and that optionally contains specified properties.
      * @param o Object to use as a prototype. May be null
      * @param properties JavaScript object that contains one or more property descriptors.
      */
    (o: object | null, properties: PropertyDescriptorMap & ThisType<any>): any;
    // #endregion
  } = window.Object.create;
  export const defineProperty: {
    // #region definition
    /**
      * Adds a property to an object, or modifies attributes of an existing property.
      * @param o Object on which to add or modify the property. This can be a native JavaScript object (that is, a user-defined object or a built in object) or a DOM object.
      * @param p The property name.
      * @param attributes Descriptor for the property. It can be for a data property or an accessor property.
      */
    (o: any, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): any;
    // #endregion
  } = window.Object.defineProperty;
  export const defineProperties: {
    // #region definition
    /**
      * Adds one or more properties to an object, and/or modifies attributes of existing properties.
      * @param o Object on which to add or modify the properties. This can be a native JavaScript object or a DOM object.
      * @param properties JavaScript object that contains one or more descriptor objects. Each descriptor object describes a data property or an accessor property.
      */
    (o: any, properties: PropertyDescriptorMap & ThisType<any>): any;
    // #endregion
  } = window.Object.defineProperties;
  export const setPrototypeOf: {
    // #region definition
    /**
     * Sets the prototype of a specified object o to  object proto or null. Returns the object o.
     * @param o The object to change its prototype.
     * @param proto The value of the new prototype or null.
     */
    (o: any, proto: object | null): any;
    // #endregion
  } = window.Object.setPrototypeOf;

  // Properties from window.Object.prototype
  export const hasOwnProperty: {
    // #region definition
    /**
      * Determines whether an object has a property with the specified name.
      * @param v A property name.
      */
    (obj: any, v: PropertyKey): boolean;
    // #endregion
  } = window.Function.prototype.call.bind(window.Object.prototype.hasOwnProperty);

  // Promise
  export const Promise = window.Promise;

  var _lastPrompt: number = -1;

  export function find<T extends { [property in K]: any; }, K extends keyof T = keyof T>(objList: ArrayLike<T>, propertyName: K, propertyValue: T[K], returnFirst: true): T | null;
  export function find<T extends { [property in K]: any; }, K extends keyof T = keyof T>(objList: ArrayLike<T>, propertyName: K, propertyValue: T[K], returnFirst: false): T[];
  export function find<T extends { [property in K]: any; }, K extends keyof T = keyof T>(objList: ArrayLike<T>, propertyName: K, propertyValue: T[K], returnFirst: boolean = false): T[] | T | null {
    var rslt = [];
    forEach(objList, obj => {
      if (obj[propertyName] == propertyValue) {
        rslt.push(obj);
      }
    });
    if (returnFirst) {
      return rslt.length > 0 ? rslt[0] : null;
    } else {
      return rslt;
    }
  }
  export function findInSubObject<T extends { [property in K]: any; }, O extends { [property in keyof O]: T } = any, K extends keyof T = keyof T>(obj: O, propList: ArrayLike<keyof O>, propertyName: K, propertyValue: T[K], returnFirst: true): T | null;
  export function findInSubObject<T extends { [property in K]: any; }, O extends { [property in keyof O]: T } = any, K extends keyof T = keyof T>(obj: O, propList: ArrayLike<keyof O>, propertyName: K, propertyValue: T[K], returnFirst: false): T[];
  export function findInSubObject<T extends { [property in K]: any; }, O extends { [property in keyof O]: T } = any, K extends keyof T = keyof T>(obj: O, propList: ArrayLike<keyof O>, propertyName: K, propertyValue: T[K], returnFirst: boolean = false): T[] | T | null {
    var rslt = [];
    forEach(propList, pName => {
      if (obj[pName][propertyName] == propertyValue) {
        rslt.push(obj[pName]);
      }
    });
    if (returnFirst) {
      return rslt.length > 0 ? rslt[0] : null;
    } else {
      return rslt;
    }
  }
  export function getPreviousFocusable(): HTMLElement {
    var $tabbable = jQuery(":tabbable", Caret.activeDocument);
    var index = $tabbable.index(Caret.activeElement);
    var elm: JQuery = null;
    if (index == -1) {
      elm = $tabbable.last();
    } else {
      elm = $tabbable.eq(index - 1);
    }
    return elm[0] || null;
  }
  export function getNextFocusable(): HTMLElement {
    var $tabbable = jQuery(":tabbable", Caret.activeDocument);
    var index = $tabbable.index(Caret.activeElement);
    var elm: JQuery = null;
    if (index == -1) {
      elm = $tabbable.first();
    } else {
      elm = $tabbable.eq(index + 1);
    }
    if (elm.length == 0) {
      elm = $tabbable.first();
    }
    return elm[0] || null;
  }
  export function prompt(message?: string, _default?: string): string {
    if (_lastPrompt + 5000 > Date.now()) {
      return "";
    }
    Layout.releaseAllKeys();
    _lastPrompt = Date.now();
    let _value = window.prompt(message, _default || "") || "";
    Layout.releaseAllKeys();
    return _value;
  }

  export function isEvent(event: Event): boolean {
    return supports_Event && event instanceof Event;
  }
  export function isKeyboardEvent(event: Event): boolean {
    return supports_KeyboardEvent && event instanceof KeyboardEvent;
  }
  export function isMouseEvent(event: Event): boolean {
    return supports_MouseEvent && event instanceof MouseEvent;
  }
  export function isTouchEvent(event: Event): boolean {
    return supports_TouchEvent && event instanceof TouchEvent;
  }
  export function isPointerEvent(event: Event): boolean {
    return supports_PointerEvent && event instanceof PointerEvent;
  }

  /** Prüft, ob `flag2` in `flag1` enthalten ist */
  // export function hasFlag(flag1: number, flag2: number): number {
  //   return flag1 & flag2;
  // }
  /** Kombiniert `flag1` und `flag2` */
  // export function combineFlag(flag1: number, flag2: number): number {
  //   return flag1 | flag2;
  // }
  /** Entfernt `flag2` aus `flag1` */
  // export function removeFlag(flag1: number, flag2: number): number {
  //   return flag1 & ~flag2;
  // }
  /** Prüft, ob `flag2` in `flag1` vorhanden ist und wechselt entsprechend */
  // export function toggleFlag(flag1: number, flag2: number, force?: boolean) {
  //   if (force === true) {
  //     return combineFlag(flag1, flag2);
  //   } else if (force === false || hasFlag(flag1, flag2)) {
  //     return removeFlag(flag1, flag2);
  //   } else {
  //     return combineFlag(flag1, flag2);
  //   }
  // }
}
interface Window {
  HTMLElement: typeof HTMLElement;
  HTMLInputElement: typeof HTMLInputElement;
  HTMLSelectElement: typeof HTMLSelectElement;
  HTMLTextAreaElement: typeof HTMLTextAreaElement;
  HTMLIFrameElement: typeof HTMLIFrameElement;
  Object: typeof Object;
  Array: typeof Array;
  Function: typeof Function;
  Document: typeof Document;
  Promise: typeof Promise;
  Event: typeof Event;
  FocusEvent: typeof FocusEvent;
  KeyboardEvent: typeof KeyboardEvent;
  MouseEvent: typeof MouseEvent;
  TouchEvent: typeof TouchEvent;
  PointerEvent: typeof PointerEvent;
  jQuery: typeof jQuery;
}
interface KeyboardEventInit {
  lang: string;
}
interface Navigator {
  readonly clipboard: Clipboard;
}
interface HTMLElement {
  inputMode: string;
}
interface Clipboard {
  readText(): Promise<string>;
  writeText(data: string): Promise<void>;
}