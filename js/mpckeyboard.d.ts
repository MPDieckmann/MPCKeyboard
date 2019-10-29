/// <reference no-default-lib="true"/>
/// <reference types="jquery" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
declare var define: any;
interface JQueryStatic {
    attr: any;
    ui: any;
}
declare namespace JQueryUI {
    interface UI {
        focusable: any;
    }
}
declare namespace MPCKeyboard.Helper {
    const version = "2019.10.25";
    const namespaceURI = "https://mpdieckmann.github.io/mpc";
    const window: Window;
    const document: Document;
    const Event: Window["Event"];
    type Event = Window["Event"]["prototype"];
    const KeyboardEvent: Window["KeyboardEvent"];
    type KeyboardEvent = Window["KeyboardEvent"]["prototype"];
    const MouseEvent: Window["MouseEvent"];
    type MouseEvent = Window["MouseEvent"]["prototype"];
    const TouchEvent: Window["TouchEvent"];
    type TouchEvent = Window["TouchEvent"]["prototype"];
    const PointerEvent: Window["PointerEvent"];
    type PointerEvent = Window["PointerEvent"]["prototype"];
    const supports_Event: boolean;
    const supports_KeyboardEvent: boolean;
    const supports_MouseEvent: boolean;
    const supports_TouchEvent: boolean;
    const supports_PointerEvent: boolean;
    const requestAnimationFrame: (callback: FrameRequestCallback) => number;
    const concat: {
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
    };
    const filter: {
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
    };
    const forEach: {
        /**
         * Performs the specified action for each element in an array.
         * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
         * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        <T>(array: T[], callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        <T>(array: ArrayLike<T>, callbackfn: (value: T, index: number, array: ArrayLike<T>) => void, thisArg?: any): void;
    };
    const indexOf: {
        /**
          * Returns the index of the first occurrence of a value in an array.
          * @param searchElement The value to locate in the array.
          * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
          */
        <T>(array: T[], searchElement: T, fromIndex?: number): number;
        <T>(array: ArrayLike<T>, searchElement: T, fromIndex?: number): number;
    };
    const map: {
        /**
          * Calls a defined callback function on each element of an array, and returns an array that contains the results.
          * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
          * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
          */
        <T, U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    };
    const createMPCElement: {
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
    };
    const createHTMLElement: {
        /**
         * Creates an instance of the element for the specified tag.
         * @param tagName The name of an element.
         */
        <K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K];
        (tagName: string, options?: ElementCreationOptions): HTMLElement;
    };
    const assign: {
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
    };
    const create: {
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
    };
    const defineProperty: {
        /**
          * Adds a property to an object, or modifies attributes of an existing property.
          * @param o Object on which to add or modify the property. This can be a native JavaScript object (that is, a user-defined object or a built in object) or a DOM object.
          * @param p The property name.
          * @param attributes Descriptor for the property. It can be for a data property or an accessor property.
          */
        (o: any, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): any;
    };
    const defineProperties: {
        /**
          * Adds one or more properties to an object, and/or modifies attributes of existing properties.
          * @param o Object on which to add or modify the properties. This can be a native JavaScript object or a DOM object.
          * @param properties JavaScript object that contains one or more descriptor objects. Each descriptor object describes a data property or an accessor property.
          */
        (o: any, properties: PropertyDescriptorMap & ThisType<any>): any;
    };
    const setPrototypeOf: {
        /**
         * Sets the prototype of a specified object o to  object proto or null. Returns the object o.
         * @param o The object to change its prototype.
         * @param proto The value of the new prototype or null.
         */
        (o: any, proto: object | null): any;
    };
    const hasOwnProperty: {
        /**
          * Determines whether an object has a property with the specified name.
          * @param v A property name.
          */
        (obj: any, v: PropertyKey): boolean;
    };
    const Promise: PromiseConstructor;
    function find<T extends {
        [property in K]: any;
    }, K extends keyof T = keyof T>(objList: ArrayLike<T>, propertyName: K, propertyValue: T[K], returnFirst: true): T | null;
    function find<T extends {
        [property in K]: any;
    }, K extends keyof T = keyof T>(objList: ArrayLike<T>, propertyName: K, propertyValue: T[K], returnFirst: false): T[];
    function findInSubObject<T extends {
        [property in K]: any;
    }, O extends {
        [property in keyof O]: T;
    } = any, K extends keyof T = keyof T>(obj: O, propList: ArrayLike<keyof O>, propertyName: K, propertyValue: T[K], returnFirst: true): T | null;
    function findInSubObject<T extends {
        [property in K]: any;
    }, O extends {
        [property in keyof O]: T;
    } = any, K extends keyof T = keyof T>(obj: O, propList: ArrayLike<keyof O>, propertyName: K, propertyValue: T[K], returnFirst: false): T[];
    function getPreviousFocusable(): HTMLElement;
    function getNextFocusable(): HTMLElement;
    function prompt(message?: string, _default?: string): string;
    function isEvent(event: Event): boolean;
    function isKeyboardEvent(event: Event): boolean;
    function isMouseEvent(event: Event): boolean;
    function isTouchEvent(event: Event): boolean;
    function isPointerEvent(event: Event): boolean;
    /** Prüft, ob `flag2` in `flag1` enthalten ist */
    /** Kombiniert `flag1` und `flag2` */
    /** Entfernt `flag2` aus `flag1` */
    /** Prüft, ob `flag2` in `flag1` vorhanden ist und wechselt entsprechend */
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
declare namespace MPCKeyboard.Options {
    /**
     * Zeigt das MPCKeyboard Element automatisch an, wenn ein Eingabefeld den Fokus erhält, oder blendet es aus, wenn das fokussierte Element keine Eingabe ermöglicht.
     * @default false
     */
    var autoOpenKeyboard: boolean;
    /**
     * MPCKeyboard soll sich bemühen, native Bildschirm-Tastaturen auszublenden. (Funktioniert bisher nur bei Chromium basierten Browsern (Chrome, Chromium, Opera ...).
     * @default false
     */
    var overrideInputMode: boolean;
    /**
     * Wenn aktiviert, wird versucht, die Hardware-Tastatur-Eingaben in MPCKeyboard-Eingaben unmzuwandeln. (Kann zu Problemen führen; bisher werden nur Desktop-Systeme wie Windows und OSX unterstützt).
     * @default false
     */
    var combineMPCKeyboardAndNativeKeyboard: boolean;
    /**
     * Blendet bei verstecktem MPCKeyboard die Schaltfläche zum Öffnen aus oder ein.
     * @default false
     */
    var collapseOnHide: boolean;
    /**
     * Gibt (in Millisekunden) an, wie lange eine Taste gedrückt werden muss, bevor MPCKeyboard den Wert bei keydown auf repeat setzt.
     * @range 50 - 10000
     * @default 500
     */
    var keyHoldTimeout: number;
    /**
     * Gibt (in Millisekunden) an, wie lange zwischen den wiederholenden keydown-Events gewartet werden soll.
     * @range 10 - 500
     * @default 33
     */
    var keyRepeatInterval: number;
    /**
     * Gibt (in Pixeln) die Präzision an, mit der ein Mousemove aus dem Tastenfeld maximal abweichen darf bevor ein die Taste ein keyUp Event wirft.
     * @range 0 - 100
     * @default 5
     */
    var mousePrecision: number;
    /**
     * Gibt (in Pixeln) die Präzision an, mit der ein Touchmove aus dem Tastenfeld maximal abweichen darf bevor ein die Taste ein keyUp Event wirft.
     * @range 0 - 100
     * @default 5
     */
    var touchPrecision: number;
    /**
     * Gibt (in Pixeln) die Präzision an, mit der ein Pointermove aus dem Tastenfeld maximal abweichen darf bevor ein die Taste ein keyUp Event wirft.
     * @range 0 - 100
     * @default 5
     */
    var pointerPrecision: number;
}
declare namespace MPCKeyboard {
    const version = "2019.10.17";
    const element: Element;
    const KEY_LOCATION_STANDARD = 0;
    const KEY_LOCATION_LEFT = 1;
    const KEY_LOCATION_RIGHT = 2;
    const KEY_LOCATION_NUMPAD = 3;
    /** @values from `0` to `3` */
    type KEY_LOCATION = 0 | 1 | 2 | 3;
    const MODIFIER_DEFAULT = 0;
    const MODIFIER_SHIFT = 1;
    const MODIFIER_CTRL = 2;
    const MODIFIER_ALT = 4;
    const MODIFIER_ALTGRAPH: 6;
    const MODIFIER_META = 8;
    const MODIFIER_FN = 16;
    const MODIFIER_SYMBOL = 32;
    /** @values from `0` to `63` */
    type MODIFIER = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63;
    const LAYOUT_DEFAULT = 0;
    const LAYOUT_SHIFT = 1;
    const LAYOUT_ALTGRAPH: 6;
    const LAYOUT_SHIFT_ALTGRAPH: 7;
    const LAYOUT_SYMBOL = 32;
    const LAYOUT_SHIFT_SYMBOL: 33;
    const LAYOUT_ALTGRAPH_SYMBOL: 38;
    const LAYOUT_SHIFT_ALTGRAPH_SYMBOL: 39;
    /**
     * @values typically: `0`, `1`, `6`, `7`, `32`, `33`, `38`, `39`
     * @values possible values: `0` to `103`
     */
    type LAYOUT = 0 | 1 | 6 | 7 | 32 | 33 | 38 | 39 | MODIFIER;
    /** Keine virtuelle Tastatur; dies ist nützlich, wenn die Anwendung oder die Website ihre eigene Tastatureingabesteuerung implementiert. */
    const INPUT_MODE_NONE = "none";
    /** Standard-Text-Eingabetastatur für das aktuelle Gebietsschema des Benutzers. */
    const INPUT_MODE_TEXT = "text";
    /** Fraktionierte numerische Eingabetastatur, die die Ziffern und das entsprechende Trennzeichen für das Gebietsschema des Benutzers enthält (typischerweise entweder "." oder ","). */
    const INPUT_MODE_DECIMAL = "decimal";
    /** Numerische Eingabetastatur; alles, was benötigt wird, sind die Ziffern 0 bis 9. */
    const INPUT_MODE_NUMERIC = "numeric";
    /** Eine Telefontastatur-Eingabe, die die Ziffern 0 bis 9, das Sternchen ("*") und die Pfund-Taste ("#") enthält. Für Formulareingaben, die eine Telefontastatur erfordern, sollte stattdessen <input type="tel"> verwendet werden. */
    const INPUT_MODE_TEL = "tel";
    /** Eine virtuelle Tastatur, die für die Sucheingabe optimiert ist. So kann beispielsweise die Eingabetaste in "Suchen" umbenannt werden, und es kann weitere Optimierungen geben. */
    const INPUT_MODE_SEARCH = "search";
    /** Eine virtuelle Tastatur, die für die Eingabe von E-Mail-Adressen optimiert ist; typischerweise beinhaltet dies das Zeichen "@" sowie andere Optimierungen. Für Formulareingaben, die eine Eingabe der E-Mail-Adresse erfordern, sollte stattdessen <input type="email"> verwendet werden. */
    const INPUT_MODE_EMAIL = "email";
    /** Eine Tastatur, die für die Eingabe von URLs optimiert ist. Dies kann z.B. dazu führen, dass die Taste "/" prominenter verfügbar ist. Erweiterte Funktionen können auch den Zugriff auf die Historie und dergleichen beinhalten. Für Formulareingaben, die eine URL anfordern, sollte stattdessen <input type="url"> verwendet werden. */
    const INPUT_MODE_URL = "url";
    type INPUT_MODE = "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
    /**
     * Liefert einen `DOMString` der das Gebietsschema identifiziert für die das Keyboard
     * konfiguriert ist. Diese Zeichenkette kann leer sein, wenn der Browser oder das
     * Gerät das Gebietsschema des Keyboards nicht kennt.
     *
     * @example
     * "de" | "de-de"
     */
    var lang: string;
    const visibility: VisibilityState;
    const langs: ReadonlyMap<string, KeyboardLanguageDefinition>;
    const langList: ReadonlyArray<string>;
    type VisibilityState = "visible" | "hidden" | "collapse";
    interface KeyboardLanguageDefinition {
        /**
         * Liefert einen `DOMString` der das Gebietsschema identifiziert für die das Keyboard
         * konfiguriert ist. Diese Zeichenkette kann leer sein, wenn der Browser oder das
         * Gerät das Gebietsschema des Keyboards nicht kennt.
         * @example
         * "deu" | "de" | "de-de"
         */
        lang: string;
        /**
         * Titel der Sprache
         */
        title: string;
        /**
         * Beschreibung der Tastatur
         */
        description: string;
        /**
         * Eines von beiden muss existieren: `layoutList` oder `getLayout`.
         * Das jeweils andere ist dann optional.
         */
        layoutList?: {
            [LAYOUT_DEFAULT]: Layout.KeyboardLayout;
        } & {
            [m in LAYOUT]?: Layout.KeyboardLayout;
        };
        /**
         * Eines von beiden muss existieren: `keyMapList` oder `getKeyMap`.
         * Das jeweils andere ist dann optional.
         */
        keyMapList?: {
            [LAYOUT_DEFAULT]: Layout.KeyMap;
        } & {
            [m in LAYOUT]?: Layout.KeyMap;
        };
        /**
         * Eines von beiden muss existieren: `layoutCommandsList` oder `getLayoutCommands`.
         * Das jeweils andere ist dann optional.
         */
        commands: Input.Command[];
        getLayout?(this: KeyboardLanguageDefinition, inputMode: INPUT_MODE, modifiers: MODIFIER, modifier_locks: MODIFIER): Layout.KeyboardLayout;
        getKeyMap?(this: KeyboardLanguageDefinition, inputMode: INPUT_MODE, modifiers: MODIFIER, modifier_locks: MODIFIER): Layout.KeyMap;
    }
    function registerKeyboardLanguage(def: KeyboardLanguageDefinition): void;
    function unregisterKeyboardLanguage(lang: string): void;
    function show(): void;
    function hide(collapse?: boolean): void;
    function toggle(force?: boolean, collapse?: boolean): void;
}
declare namespace MPCKeyboard {
    class KeyboardEvent extends Helper.KeyboardEvent {
        static version: string;
    }
}
declare namespace MPCKeyboard.Caret {
    const version = "2019.10.24";
    const element: HTMLElement;
    const activeInputLanguage: string;
    const activeInputMode: INPUT_MODE;
    const activeElement: Element;
    const activeDocument: Document;
    const activeWindow: Window;
    /**
     * Executes a command on the current document, current selection, or the given range.
     * @param commandId String that specifies the command to execute. This command can be any of the command identifiers that can be executed in script.
     * @param showUI Display the user interface, defaults to false.
     * @param value Value to assign.
     */
    function execCommand(commandId: string, showUI?: boolean, value?: string): boolean;
    function frameChange(frame: Window): void;
    function updateInputLanguage(): void;
}
declare namespace MPCKeyboard.Input {
    const version = "2019.10.16";
    const element: Element;
    const commands: Command[];
    const languageCommands: ReadonlyArray<Command>;
    const layoutCommands: ReadonlyArray<Command>;
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
    }
    interface Command {
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
    function getCommandsFor(key: Key): Command[];
    function handleKeyDown(key: Key, commands?: Command[]): void;
    function handleKeyPress(key: Key, commands?: Command[]): void;
    function handleKeyUp(key: Key, commands?: Command[]): void;
    function setLayoutCommands(commands: Command[]): void;
    function setLanguageCommands(commands: Command[]): void;
}
declare namespace MPCKeyboard.Theme {
    const version = "2019.05.25";
    const element: Element;
}
declare namespace MPCKeyboard.Layout {
    const version = "2019.10.24";
    const element: Element;
    const style: HTMLElement;
    const keys: {
        [code: string]: MPCKeyElement;
    };
    const keyCodes: string[];
    const spans: MPCSpanElement[];
    const activeLayout: KeyboardLayout;
    const activeKeyMap: KeyMap;
    var modifiers: MODIFIER;
    var modifier_locks: MODIFIER;
    interface KeyboardLayoutKey<C extends string = string> {
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
        feature?: string;
    }
    interface KeyboardLayoutSpan {
        /**
         * relative Weite der Taste in der Reihe
         * @default 2
         */
        width?: number;
    }
    interface KeyboardKey {
        key: string;
        /**
         * Gibt ein benutzerdefiniertes Label an
         * @default this.key
         */
        label?: string;
    }
    type KeyboardLayout<C extends string = string> = (KeyboardLayoutKey<C> | KeyboardLayoutSpan)[][];
    type KeyMap<C extends string = string> = {
        [code in C]?: KeyboardKey;
    };
    class MPCKeyElement extends Element {
        readonly code: string;
        size: string;
        location: KEY_LOCATION;
        feature: string;
        label: string;
        key: string;
    }
    class MPCSpanElement extends Element {
        size: string;
    }
    function getMPCKeyElementsByKey(key: string, getFirstOnly?: false): MPCKeyElement[];
    function getMPCKeyElementsByKey(key: string, getFirstOnly: true): MPCKeyElement | null;
    function hasModifier(mod: MODIFIER, persistent?: boolean): boolean;
    function setModifier(mod: MODIFIER, persistent?: boolean): void;
    function removeModifier(mod: MODIFIER): void;
    function removeModifier(mod: MODIFIER, remove_persistent_only: boolean): void;
    function updateModifiers(): void;
    function updateLayout(): void;
    function getLayout(): KeyboardLayout;
    function getLayout(inputMode?: INPUT_MODE, modifiers?: MODIFIER, modifier_locks?: MODIFIER): KeyboardLayout;
    function getKeyMap(): KeyMap;
    function getKeyMap(inputMode?: INPUT_MODE, modifiers?: MODIFIER, modifier_locks?: MODIFIER): KeyMap;
    function modifyKey(key: string, attr: string, state: boolean): void;
    function keyDown(key: {
        code: string;
        key: string;
        location: KEY_LOCATION;
    }): void;
    function keyUp(key: {
        code: string;
        key: string;
        location: KEY_LOCATION;
    }): void;
    function releaseAllKeys(): void;
    function keyFilter<T extends {
        key: string;
    }>(key: T): T;
}
declare namespace MPCKeyboard.Menu {
    const version = "2019.10.21";
    const element: Element;
    interface Menuitem {
        media?: {
            type: "image";
            src: string;
        } | {
            type: "text";
            text: string;
        };
        class?: string;
        title: string;
        description?: string;
        onclick(): void;
    }
    type MenuitemSeparator = "separator";
    type Menu = ((() => Menu) | Menuitem | MenuitemSeparator)[];
    const LanguageMenu: Menu;
    const SettingsMenu: Menu;
    function showMenu(menu: Menu, parentMenuElement?: Element): void;
}
declare namespace MPCKeyboard {
}
