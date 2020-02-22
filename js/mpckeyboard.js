/*! jQuery UI - v1.12.1 - 2019-05-30
 * http://jqueryui.com
 * Includes: focusable.js, tabbable.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT
 *
 * Modified und reformatted by MPDieckmann
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    }
    else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.ui = $.ui || {};
    var version = $.ui.version = "1.12.1";
    /*!
     * jQuery UI Focusable 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    //>>label: :focusable Selector
    //>>group: Core
    //>>description: Selects elements which can be focused.
    //>>docs: http://api.jqueryui.com/focusable-selector/
    // Selectors
    $.ui.focusable = function (element, hasTabindex) {
        var map, mapName, img, focusableIfVisible, fieldset, nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false;
            }
            img = $("img[usemap='#" + mapName + "']");
            return img.length > 0 && img.is(":visible");
        }
        if (/^(input|select|textarea|button|object)$/i.test(nodeName)) {
            focusableIfVisible = !element.disabled;
            if (focusableIfVisible) {
                // Form controls within a disabled fieldset are disabled.
                // However, controls within the fieldset's legend do not get disabled.
                // Since controls generally aren't placed inside legends, we skip
                // this portion of the check.
                fieldset = $(element).closest("fieldset")[0];
                if (fieldset) {
                    focusableIfVisible = !fieldset.disabled;
                }
            }
        }
        else if ("iframe" == nodeName) {
            focusableIfVisible = true;
        }
        else if ("details" == nodeName && $(element).children("summary").length == 0) {
            focusableIfVisible = true;
        }
        else if ("summary" == nodeName) {
            focusableIfVisible = true;
        }
        else if ("a" === nodeName) {
            focusableIfVisible = element.href || hasTabindex;
            // Start of: Modified by MPDieckmann
        }
        else if (element.contentEditable == "true") {
            focusableIfVisible = !element.parentElement.isContentEditable;
            // End of: Modified by MPDieckmann
        }
        else {
            focusableIfVisible = hasTabindex;
        }
        return focusableIfVisible && $(element).is(":visible") && visible($(element));
    };
    // Support: IE 8 only
    // IE 8 doesn't resolve inherit to visible/hidden for computed values
    function visible(element) {
        var visibility = element.css("visibility");
        while (visibility === "inherit") {
            element = element.parent();
            visibility = element.css("visibility");
        }
        return visibility !== "hidden";
    }
    $.extend($.expr[":"], {
        focusable: function (element) {
            return $.ui.focusable(element, $.attr(element, "tabindex") != null);
        }
    });
    var focusable = $.ui.focusable;
    /*!
     * jQuery UI Tabbable 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    //>>label: :tabbable Selector
    //>>group: Core
    //>>description: Selects elements which can be tabbed to.
    //>>docs: http://api.jqueryui.com/tabbable-selector/
    var tabbable = $.extend($.expr[":"], {
        tabbable: function (element) {
            var tabIndex = $.attr(element, "tabindex"), hasTabindex = tabIndex != null;
            return (!hasTabindex || tabIndex >= 0) && $.ui.focusable(element, hasTabindex);
        }
    });
}));
/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />
/// <reference path="jquery-ui-focusable.ts" />
var MPCKeyboard;
(function (MPCKeyboard) {
    var Helper;
    (function (Helper) {
        Helper.version = "2019.10.25";
        Helper.namespaceURI = "https://mpdieckmann.github.io/mpc";
        Helper.window = (function (self, top) {
            let win = self;
            try {
                if (top && top.document) {
                    win = top;
                }
                else {
                    while (win.parent && win.parent.document) {
                        win = win.parent;
                    }
                }
            }
            catch (e) { }
            return win;
        })(self, top);
        Helper.document = Helper.window.document;
        Helper.Event = Helper.window.Event || class {
            constructor(...a) { }
        };
        Helper.KeyboardEvent = Helper.window.KeyboardEvent || class extends Helper.Event {
        };
        Helper.MouseEvent = Helper.window.MouseEvent || class extends Helper.Event {
        };
        Helper.TouchEvent = Helper.window.TouchEvent || class extends Helper.Event {
        };
        Helper.PointerEvent = Helper.window.PointerEvent || class extends Helper.Event {
        };
        Helper.supports_Event = Helper.Event === Helper.window.Event;
        Helper.supports_KeyboardEvent = Helper.KeyboardEvent === Helper.window.KeyboardEvent;
        Helper.supports_MouseEvent = Helper.MouseEvent === Helper.window.MouseEvent;
        Helper.supports_TouchEvent = Helper.TouchEvent === Helper.window.TouchEvent;
        Helper.supports_PointerEvent = Helper.PointerEvent === Helper.window.PointerEvent;
        Helper.requestAnimationFrame = Helper.window.requestAnimationFrame;
        // Properties from window.Array
        Helper.concat = Helper.window.Function.prototype.call.bind(Helper.window.Array.prototype.concat);
        Helper.filter = Helper.window.Function.prototype.call.bind(Helper.window.Array.prototype.filter);
        Helper.forEach = Helper.window.Function.prototype.call.bind(Helper.window.Array.prototype.forEach);
        Helper.indexOf = Helper.window.Function.prototype.call.bind(Helper.window.Array.prototype.indexOf);
        Helper.map = Helper.window.Function.prototype.call.bind(Helper.window.Array.prototype.map);
        // Properties from document
        Helper.createMPCElement = Helper.document.createElementNS.bind(Helper.document, Helper.namespaceURI);
        Helper.createHTMLElement = Helper.document.createElementNS.bind(Helper.document, "http://www.w3.org/1999/xhtml");
        // Properties from window.Object
        Helper.assign = Helper.window.Object.assign;
        Helper.create = Helper.window.Object.create;
        Helper.defineProperty = Helper.window.Object.defineProperty;
        Helper.defineProperties = Helper.window.Object.defineProperties;
        Helper.setPrototypeOf = Helper.window.Object.setPrototypeOf;
        // Properties from window.Object.prototype
        Helper.hasOwnProperty = Helper.window.Function.prototype.call.bind(Helper.window.Object.prototype.hasOwnProperty);
        // Promise
        Helper.Promise = Helper.window.Promise;
        var _lastPrompt = -1;
        function find(objList, propertyName, propertyValue, returnFirst = false) {
            var rslt = [];
            Helper.forEach(objList, obj => {
                if (obj[propertyName] == propertyValue) {
                    rslt.push(obj);
                }
            });
            if (returnFirst) {
                return rslt.length > 0 ? rslt[0] : null;
            }
            else {
                return rslt;
            }
        }
        Helper.find = find;
        function findInSubObject(obj, propList, propertyName, propertyValue, returnFirst = false) {
            var rslt = [];
            Helper.forEach(propList, pName => {
                if (obj[pName][propertyName] == propertyValue) {
                    rslt.push(obj[pName]);
                }
            });
            if (returnFirst) {
                return rslt.length > 0 ? rslt[0] : null;
            }
            else {
                return rslt;
            }
        }
        Helper.findInSubObject = findInSubObject;
        function getPreviousFocusable() {
            var $tabbable = jQuery(":tabbable", MPCKeyboard.Caret.activeDocument);
            var index = $tabbable.index(MPCKeyboard.Caret.activeElement);
            var elm = null;
            if (index == -1) {
                elm = $tabbable.last();
            }
            else {
                elm = $tabbable.eq(index - 1);
            }
            return elm[0] || null;
        }
        Helper.getPreviousFocusable = getPreviousFocusable;
        function getNextFocusable() {
            var $tabbable = jQuery(":tabbable", MPCKeyboard.Caret.activeDocument);
            var index = $tabbable.index(MPCKeyboard.Caret.activeElement);
            var elm = null;
            if (index == -1) {
                elm = $tabbable.first();
            }
            else {
                elm = $tabbable.eq(index + 1);
            }
            if (elm.length == 0) {
                elm = $tabbable.first();
            }
            return elm[0] || null;
        }
        Helper.getNextFocusable = getNextFocusable;
        function prompt(message, _default) {
            if (_lastPrompt + 5000 > Date.now()) {
                return "";
            }
            MPCKeyboard.Layout.releaseAllKeys();
            _lastPrompt = Date.now();
            let _value = Helper.window.prompt(message, _default || "") || "";
            MPCKeyboard.Layout.releaseAllKeys();
            return _value;
        }
        Helper.prompt = prompt;
        function isEvent(event) {
            return Helper.supports_Event && event instanceof Helper.Event;
        }
        Helper.isEvent = isEvent;
        function isKeyboardEvent(event) {
            return Helper.supports_KeyboardEvent && event instanceof Helper.KeyboardEvent;
        }
        Helper.isKeyboardEvent = isKeyboardEvent;
        function isMouseEvent(event) {
            return Helper.supports_MouseEvent && event instanceof Helper.MouseEvent;
        }
        Helper.isMouseEvent = isMouseEvent;
        function isTouchEvent(event) {
            return Helper.supports_TouchEvent && event instanceof Helper.TouchEvent;
        }
        Helper.isTouchEvent = isTouchEvent;
        function isPointerEvent(event) {
            return Helper.supports_PointerEvent && event instanceof Helper.PointerEvent;
        }
        Helper.isPointerEvent = isPointerEvent;
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
    })(Helper = MPCKeyboard.Helper || (MPCKeyboard.Helper = {}));
})(MPCKeyboard || (MPCKeyboard = {}));
/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />
var MPCKeyboard;
(function (MPCKeyboard) {
    var Options;
    (function (Options) {
        var _autoOpenKeyboard = false;
        var _overrideInputMode = false;
        var _combineMPCKeyboardAndNativeKeyboard = false;
        var _collapseOnHide = false;
        var _keyHoldTimeout = 500;
        var _keyRepeatInterval = 33;
        var _mousePrecision = 5;
        var _touchPrecision = 5;
        var _pointerPrecision = 5;
        MPCKeyboard.Helper.defineProperties(Options, {
            autoOpenKeyboard: {
                get() { return _autoOpenKeyboard; },
                set(value) { _autoOpenKeyboard = !!value; },
                enumerable: true,
                configurable: false
            },
            overrideInputMode: {
                get() { return _overrideInputMode; },
                set(value) { _overrideInputMode = !!value; },
                enumerable: true,
                configurable: false
            },
            combineMPCKeyboardAndNativeKeyboard: {
                get() { return _combineMPCKeyboardAndNativeKeyboard; },
                set(value) { _combineMPCKeyboardAndNativeKeyboard = !!value; },
                enumerable: true,
                configurable: false
            },
            collapseOnHide: {
                get() { return _collapseOnHide; },
                set(value) { _collapseOnHide = !!value; },
                enumerable: true,
                configurable: false
            },
            keyHoldTimeout: {
                get() { return _keyHoldTimeout; },
                set(value) {
                    value = Number(value);
                    if (isNaN(value)) {
                        value = _keyHoldTimeout;
                    }
                    if (value < 50) {
                        value = 50;
                    }
                    else if (value > 10000) {
                        value = 10000;
                    }
                    _keyHoldTimeout = value;
                },
                enumerable: true,
                configurable: false
            },
            keyRepeatInterval: {
                get() { return _keyRepeatInterval; },
                set(value) {
                    value = Number(value);
                    if (isNaN(value)) {
                        value = _keyRepeatInterval;
                    }
                    if (value < 10) {
                        value = 10;
                    }
                    else if (value > 500) {
                        value = 500;
                    }
                    _keyRepeatInterval = value;
                },
                enumerable: true,
                configurable: false
            },
            mousePrecision: {
                get() { return _mousePrecision; },
                set(value) {
                    value = Number(value);
                    if (isNaN(value)) {
                        value = _mousePrecision;
                    }
                    if (value < 0) {
                        value = 0;
                    }
                    else if (value > 100) {
                        value = 100;
                    }
                    _mousePrecision = value;
                },
                enumerable: true,
                configurable: false
            },
            touchPrecision: {
                get() { return _touchPrecision; },
                set(value) {
                    value = Number(value);
                    if (isNaN(value)) {
                        value = _touchPrecision;
                    }
                    if (value < 0) {
                        value = 0;
                    }
                    else if (value > 100) {
                        value = 100;
                    }
                    _touchPrecision = value;
                },
                enumerable: true,
                configurable: false
            },
            pointerPrecision: {
                get() { return _pointerPrecision; },
                set(value) {
                    value = Number(value);
                    if (isNaN(value)) {
                        value = _pointerPrecision;
                    }
                    if (value < 0) {
                        value = 0;
                    }
                    else if (value > 100) {
                        value = 100;
                    }
                    _pointerPrecision = value;
                },
                enumerable: true,
                configurable: false
            }
        });
    })(Options = MPCKeyboard.Options || (MPCKeyboard.Options = {}));
})(MPCKeyboard || (MPCKeyboard = {}));
/// <reference no-default-lib="true" />
/// <reference path="./main.ts" />
var MPCKeyboard;
(function (MPCKeyboard) {
    MPCKeyboard.version = "2019.10.17";
    MPCKeyboard.element = MPCKeyboard.Helper.createMPCElement("mpc:keyboard");
    // Key.location
    MPCKeyboard.KEY_LOCATION_STANDARD = 0;
    MPCKeyboard.KEY_LOCATION_LEFT = 1;
    MPCKeyboard.KEY_LOCATION_RIGHT = 2;
    MPCKeyboard.KEY_LOCATION_NUMPAD = 3;
    // Modifiers
    MPCKeyboard.MODIFIER_DEFAULT = 0;
    MPCKeyboard.MODIFIER_SHIFT = 1;
    MPCKeyboard.MODIFIER_CTRL = 2;
    MPCKeyboard.MODIFIER_ALT = 4;
    MPCKeyboard.MODIFIER_ALTGRAPH = (MPCKeyboard.MODIFIER_CTRL | MPCKeyboard.MODIFIER_ALT);
    MPCKeyboard.MODIFIER_META = 8;
    MPCKeyboard.MODIFIER_FN = 16;
    MPCKeyboard.MODIFIER_SYMBOL = 32;
    // Layouts
    MPCKeyboard.LAYOUT_DEFAULT = MPCKeyboard.MODIFIER_DEFAULT;
    MPCKeyboard.LAYOUT_SHIFT = MPCKeyboard.MODIFIER_SHIFT;
    MPCKeyboard.LAYOUT_ALTGRAPH = MPCKeyboard.MODIFIER_ALTGRAPH;
    MPCKeyboard.LAYOUT_SHIFT_ALTGRAPH = (MPCKeyboard.MODIFIER_SHIFT | MPCKeyboard.MODIFIER_ALTGRAPH);
    MPCKeyboard.LAYOUT_SYMBOL = MPCKeyboard.MODIFIER_SYMBOL;
    MPCKeyboard.LAYOUT_SHIFT_SYMBOL = (MPCKeyboard.MODIFIER_SHIFT | MPCKeyboard.MODIFIER_SYMBOL);
    MPCKeyboard.LAYOUT_ALTGRAPH_SYMBOL = (MPCKeyboard.MODIFIER_ALTGRAPH | MPCKeyboard.MODIFIER_SYMBOL);
    MPCKeyboard.LAYOUT_SHIFT_ALTGRAPH_SYMBOL = (MPCKeyboard.MODIFIER_SHIFT | MPCKeyboard.MODIFIER_ALTGRAPH | MPCKeyboard.MODIFIER_SYMBOL);
    /** Keine virtuelle Tastatur; dies ist nützlich, wenn die Anwendung oder die Website ihre eigene Tastatureingabesteuerung implementiert. */
    MPCKeyboard.INPUT_MODE_NONE = "none";
    /** Standard-Text-Eingabetastatur für das aktuelle Gebietsschema des Benutzers. */
    MPCKeyboard.INPUT_MODE_TEXT = "text";
    /** Fraktionierte numerische Eingabetastatur, die die Ziffern und das entsprechende Trennzeichen für das Gebietsschema des Benutzers enthält (typischerweise entweder "." oder ","). */
    MPCKeyboard.INPUT_MODE_DECIMAL = "decimal";
    /** Numerische Eingabetastatur; alles, was benötigt wird, sind die Ziffern 0 bis 9. */
    MPCKeyboard.INPUT_MODE_NUMERIC = "numeric";
    /** Eine Telefontastatur-Eingabe, die die Ziffern 0 bis 9, das Sternchen ("*") und die Pfund-Taste ("#") enthält. Für Formulareingaben, die eine Telefontastatur erfordern, sollte stattdessen <input type="tel"> verwendet werden. */
    MPCKeyboard.INPUT_MODE_TEL = "tel";
    /** Eine virtuelle Tastatur, die für die Sucheingabe optimiert ist. So kann beispielsweise die Eingabetaste in "Suchen" umbenannt werden, und es kann weitere Optimierungen geben. */
    MPCKeyboard.INPUT_MODE_SEARCH = "search";
    /** Eine virtuelle Tastatur, die für die Eingabe von E-Mail-Adressen optimiert ist; typischerweise beinhaltet dies das Zeichen "@" sowie andere Optimierungen. Für Formulareingaben, die eine Eingabe der E-Mail-Adresse erfordern, sollte stattdessen <input type="email"> verwendet werden. */
    MPCKeyboard.INPUT_MODE_EMAIL = "email";
    /** Eine Tastatur, die für die Eingabe von URLs optimiert ist. Dies kann z.B. dazu führen, dass die Taste "/" prominenter verfügbar ist. Erweiterte Funktionen können auch den Zugriff auf die Historie und dergleichen beinhalten. Für Formulareingaben, die eine URL anfordern, sollte stattdessen <input type="url"> verwendet werden. */
    MPCKeyboard.INPUT_MODE_URL = "url";
    MPCKeyboard.langs = new Map([["", {
                lang: "",
                title: "",
                description: "",
                layoutList: { 0: [] },
                keyMapList: { 0: {} },
                commands: []
            }]]);
    MPCKeyboard.langList = [];
    var _lang = "";
    MPCKeyboard.Helper.defineProperties(MPCKeyboard, {
        visibility: {
            get() {
                if (MPCKeyboard.element.hasAttribute("hidden")) {
                    if (MPCKeyboard.element.getAttribute("hidden") == "collapse") {
                        return "collapse";
                    }
                    else {
                        return "hidden";
                    }
                }
                else {
                    return "visible";
                }
            },
            set(value) {
                switch (value) {
                    case "collapse":
                        hide(true);
                        break;
                    case "hidden":
                        hide(false);
                        break;
                    case "visible":
                        show();
                        break;
                }
            },
            enumerable: true,
            configurable: false
        },
        lang: {
            get() {
                if (!MPCKeyboard.langs.has(_lang)) {
                    _lang = MPCKeyboard.langList[0] || "";
                    MPCKeyboard.Layout.updateLayout();
                }
                return _lang;
            },
            set(value) {
                let lang = value.toLowerCase();
                if (lang == "" && MPCKeyboard.langList.length > 0) {
                    return;
                }
                if (MPCKeyboard.langs.has(lang)) {
                    _lang = lang;
                    MPCKeyboard.Layout.updateLayout();
                }
            },
            enumerable: true,
            configurable: false
        }
    });
    function registerKeyboardLanguage(def) {
        if (MPCKeyboard.langs.has(def.lang)) {
            throw new Error("Failed to register keyboard language: lang '" + def.lang + "' is already registered.");
        }
        def.lang = def.lang.toLowerCase();
        MPCKeyboard.langs.set(def.lang, def);
        MPCKeyboard.langList.push(def.lang);
        if (MPCKeyboard.lang == "") {
            MPCKeyboard.lang = def.lang;
        }
        MPCKeyboard.Caret.updateInputLanguage();
    }
    MPCKeyboard.registerKeyboardLanguage = registerKeyboardLanguage;
    function unregisterKeyboardLanguage(lang) {
        lang = lang.toLowerCase();
        MPCKeyboard.langs.delete(lang);
        let i = MPCKeyboard.langList.indexOf(lang);
        if (i > -1) {
            MPCKeyboard.langList.splice(i, 1);
            if (_lang == lang) {
                MPCKeyboard.lang = MPCKeyboard.langList[0] || "";
            }
        }
        MPCKeyboard.Caret.updateInputLanguage();
    }
    MPCKeyboard.unregisterKeyboardLanguage = unregisterKeyboardLanguage;
    var hideRequest = null;
    function show() {
        if (typeof hideRequest == "number") {
            clearTimeout(hideRequest);
            hideRequest = null;
        }
        if (!MPCKeyboard.element.hasAttribute("hidden")) {
            return;
        }
        MPCKeyboard.element.removeAttribute("hidden");
    }
    MPCKeyboard.show = show;
    function hide(collapse = MPCKeyboard.Options.collapseOnHide) {
        if (typeof hideRequest == "number" ||
            (collapse && MPCKeyboard.element.getAttribute("hidden") == "collapse") ||
            (!collapse && MPCKeyboard.element.getAttribute("hidden") == "")) {
            return;
        }
        hideRequest = setTimeout(() => {
            if (collapse) {
                MPCKeyboard.element.setAttribute("hidden", "collapse");
            }
            else {
                MPCKeyboard.element.setAttribute("hidden", "");
            }
            hideRequest = null;
        }, 100);
    }
    MPCKeyboard.hide = hide;
    function toggle(force = null, collapse = MPCKeyboard.Options.collapseOnHide) {
        if (force === true) {
            show();
        }
        else if (force === false || !MPCKeyboard.element.hasAttribute("hidden")) {
            hide(collapse);
        }
        else {
            show();
        }
    }
    MPCKeyboard.toggle = toggle;
    MPCKeyboard.Helper.document.documentElement.appendChild(MPCKeyboard.element);
})(MPCKeyboard || (MPCKeyboard = {}));
/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />
var MPCKeyboard;
(function (MPCKeyboard) {
    class KeyboardEvent extends MPCKeyboard.Helper.KeyboardEvent {
    }
    KeyboardEvent.version = "2019.05.30";
    MPCKeyboard.KeyboardEvent = KeyboardEvent;
})(MPCKeyboard || (MPCKeyboard = {}));
/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />
var MPCKeyboard;
(function (MPCKeyboard) {
    var Caret;
    (function (Caret) {
        // # Caret
        // Integration in die Browser:
        //  - Aktives Element
        //  - Aktive Input-Methode
        //  - etc.
        Caret.version = "2019.10.24";
        Caret.element = MPCKeyboard.Helper.createHTMLElement("mpc:caret");
        var _activeInputLanguage = "";
        var _activeInputMode = MPCKeyboard.INPUT_MODE_TEXT;
        var _hasCustomInputMode = false;
        var _activeElement = document.activeElement;
        var _activeDocument = document;
        var _activeWindow = window;
        var _frames = [];
        var _blurTimeout = -1;
        var _customCaret = false;
        MPCKeyboard.Helper.defineProperties(Caret, {
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
        MPCKeyboard.element.appendChild(Caret.element);
        frameChange(MPCKeyboard.Helper.window);
        /**
         * Executes a command on the current document, current selection, or the given range.
         * @param commandId String that specifies the command to execute. This command can be any of the command identifiers that can be executed in script.
         * @param showUI Display the user interface, defaults to false.
         * @param value Value to assign.
         */
        function execCommand(commandId, showUI, value) {
            if (_activeElement instanceof _activeWindow.HTMLInputElement ||
                _activeElement instanceof _activeWindow.HTMLTextAreaElement) {
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
                            }
                            else {
                                _selValue = _selValue.substr(0, _selStart) + _selValue.substr(_selEnd);
                                _selEnd = _selStart;
                            }
                            break;
                        case "forwardDelete":
                            if (_selStart == _selEnd) {
                                _selValue = _selValue.substr(0, _selStart) + _selValue.substr(_selEnd + 1);
                            }
                            else {
                                _selValue = _selValue.substr(0, _selStart) + _selValue.substr(_selEnd);
                                _selEnd = _selStart;
                            }
                            break;
                        case "selectAll":
                            _selStart = 0;
                            _selEnd = _selValue.length;
                            break;
                        case "paste":
                            value = MPCKeyboard.Helper.prompt("Please paste text here");
                            _selValue = _selValue.substr(0, _selStart) + value + _selValue.substr(_selEnd);
                            _selStart = _selStart + value.length;
                            _selEnd = _selStart;
                            break;
                        case "copy":
                            value = _selValue.substr(_selStart, _selEnd);
                            if (MPCKeyboard.Helper.window.navigator.clipboard && typeof MPCKeyboard.Helper.window.navigator.clipboard.writeText == "function") {
                                MPCKeyboard.Helper.window.navigator.clipboard.writeText(value);
                            }
                            break;
                        case "cut":
                            value = _selValue.substr(_selStart, _selEnd);
                            if (MPCKeyboard.Helper.window.navigator.clipboard && typeof MPCKeyboard.Helper.window.navigator.clipboard.writeText == "function") {
                                MPCKeyboard.Helper.window.navigator.clipboard.writeText(value);
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
        Caret.execCommand = execCommand;
        function frameChange(frame) {
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
                }
                catch (e) {
                    console.warn("Info: Failed to add EventListeners to frame!");
                }
            }
        }
        Caret.frameChange = frameChange;
        function updateInputLanguage() {
            let _lang = navigator.language;
            let _elm = _activeElement;
            while (_lang == "" && _elm) {
                if (_activeElement instanceof Caret.activeWindow.HTMLElement) {
                    _lang = _activeElement.lang;
                }
                _elm = _elm.parentNode;
            }
            if (!MPCKeyboard.langs.has(_lang)) {
                var i = 0;
                var l = (navigator.languages || []).length;
                while (i < l && !MPCKeyboard.langs.has(navigator.languages[i++]))
                    ;
                if (MPCKeyboard.langs.has(navigator.languages[i - 1])) {
                    _lang = navigator.languages[i - 1];
                }
            }
            MPCKeyboard.lang = _lang;
        }
        Caret.updateInputLanguage = updateInputLanguage;
        function _setActiveElement(event) {
            if (event.type == "blur" && MPCKeyboard.Helper.isEvent(event) && event.target == MPCKeyboard.Helper.window) {
                _blurTimeout = setTimeout(() => {
                    MPCKeyboard.Layout.releaseAllKeys();
                    console.warn("Info: All keys were released programmatically to prevent Errors");
                }, 1000);
            }
            if (_blurTimeout > -1 && event.type == "focus") {
                clearTimeout(_blurTimeout);
                _blurTimeout = -1;
            }
            if (_activeElement instanceof Caret.activeWindow.HTMLElement && "inputMode" in _activeElement) {
                _activeElement.inputMode = _hasCustomInputMode ? Caret.activeInputMode : "";
            }
            if (this.document.activeElement instanceof this.HTMLIFrameElement) {
                frameChange(this.document.activeElement.contentWindow);
                return;
            }
            _activeWindow = this;
            _activeDocument = this.document;
            _activeElement = this.document.activeElement;
            if (_activeElement instanceof Caret.activeWindow.HTMLElement) {
                if ("inputMode" in _activeElement) {
                    _customCaret = false;
                    _activeInputMode = _activeElement.inputMode;
                    if (_activeInputMode == "") {
                        _hasCustomInputMode = false;
                        if (_activeElement instanceof Caret.activeWindow.HTMLInputElement) {
                            switch (_activeElement.type) {
                                case "number":
                                    _activeInputMode = MPCKeyboard.INPUT_MODE_DECIMAL;
                                    break;
                                case "date":
                                case "datetime":
                                case "datetime-local":
                                case "month":
                                case "time":
                                case "week":
                                    _activeInputMode = MPCKeyboard.INPUT_MODE_NUMERIC;
                                    break;
                                case "email":
                                    _activeInputMode = MPCKeyboard.INPUT_MODE_EMAIL;
                                    break;
                                case "search":
                                    _activeInputMode = MPCKeyboard.INPUT_MODE_SEARCH;
                                    break;
                                case "tel":
                                    _activeInputMode = MPCKeyboard.INPUT_MODE_TEL;
                                    break;
                                case "url":
                                    _activeInputMode = MPCKeyboard.INPUT_MODE_URL;
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
                                    _activeInputMode = MPCKeyboard.INPUT_MODE_TEXT;
                                    break;
                            }
                        }
                        else {
                            _activeInputMode = MPCKeyboard.INPUT_MODE_TEXT;
                        }
                    }
                    else {
                        _hasCustomInputMode = true;
                    }
                    if (MPCKeyboard.Options.overrideInputMode) {
                        _activeElement.inputMode = "none";
                    }
                }
                else {
                    _customCaret = true;
                    MPCKeyboard.Helper.requestAnimationFrame(_updateCaret);
                }
                if (MPCKeyboard.Options.autoOpenKeyboard) {
                    if (/input/i.test(Caret.activeElement.nodeName) &&
                        Caret.activeElement.type != "hidden") {
                        MPCKeyboard.show();
                    }
                    else if (_activeElement.isContentEditable ||
                        /textarea|details|summary/i.test(Caret.activeElement.nodeName)) {
                        MPCKeyboard.show();
                    }
                    else {
                        MPCKeyboard.hide(MPCKeyboard.Options.collapseOnHide);
                    }
                }
            }
            updateInputLanguage();
            var frame = _activeWindow;
            var _rect = null;
            _top = 0;
            _left = 0;
            while (frame && top != frame && frame.frameElement) {
                _rect = frame.frameElement.getBoundingClientRect();
                _top += _rect.top;
                _left += _rect.left;
                frame = frame.parent;
            }
        }
        function _keydown(event) {
            if (event instanceof MPCKeyboard.KeyboardEvent) {
                return;
            }
            if (MPCKeyboard.Options.combineMPCKeyboardAndNativeKeyboard) {
                if (/^Arrow(Up|Left|Right|Down)$/.test(event.code)) {
                    MPCKeyboard.Layout.releaseAllKeys();
                    return;
                }
                event.preventDefault();
                if (event.repeat) {
                    return;
                }
                if (MPCKeyboard.Layout.keys[event.code]) {
                    MPCKeyboard.Layout.keyDown({
                        key: MPCKeyboard.Layout.keys[event.code].key,
                        code: event.code,
                        location: MPCKeyboard.Layout.keys[event.code].location
                    });
                }
                else {
                    MPCKeyboard.Layout.keyDown(event);
                }
            }
            else {
                if (event.repeat) {
                    return;
                }
                switch (event.key) {
                    case "Alt":
                        MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_ALT);
                        break;
                    case "AltLock":
                        if (event.getModifierState(event.key)) {
                            MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_ALT, true);
                        }
                        else {
                            MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_ALT);
                        }
                        break;
                    case "AltGraph":
                        MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_ALTGRAPH);
                        break;
                    case "AltGraphLock":
                        if (event.getModifierState(event.key)) {
                            MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_ALTGRAPH, true);
                        }
                        else {
                            MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_ALTGRAPH);
                        }
                        break;
                    case "Control":
                        MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_CTRL);
                        break;
                    case "ControlLock":
                        if (event.getModifierState(event.key)) {
                            MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_CTRL, true);
                        }
                        else {
                            MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_CTRL);
                        }
                        break;
                    case "FN":
                        MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_FN);
                        break;
                    case "FNLock":
                        if (event.getModifierState(event.key)) {
                            MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_FN, true);
                        }
                        else {
                            MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_FN);
                        }
                        break;
                    case "Hyper":
                    case "Meta":
                    case "Super":
                    case "OS":
                        MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_META);
                        break;
                    case "HyperLock":
                    case "MetaLock":
                    case "SuperLock":
                    case "OSLock":
                        if (event.getModifierState(event.key)) {
                            MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_META, true);
                        }
                        else {
                            MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_META);
                        }
                        break;
                    case "Shift":
                        MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_SHIFT);
                        break;
                    case "CapsLock":
                    case "ShiftLock":
                        if (event.getModifierState(event.key)) {
                            MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_SHIFT, true);
                        }
                        else {
                            MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_SHIFT);
                        }
                        break;
                    case "Symbol":
                        MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_SYMBOL);
                        break;
                    case "SymbolLock":
                        if (event.getModifierState(event.key)) {
                            MPCKeyboard.Layout.setModifier(MPCKeyboard.MODIFIER_SYMBOL, true);
                        }
                        else {
                            MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_SYMBOL);
                        }
                        break;
                    default:
                        break;
                }
                MPCKeyboard.Layout.modifyKey(event.key, "down", true);
            }
        }
        function _keyup(event) {
            if (event instanceof MPCKeyboard.KeyboardEvent) {
                return;
            }
            if (MPCKeyboard.Options.combineMPCKeyboardAndNativeKeyboard) {
                event.preventDefault();
            }
            if (event.repeat) {
                return;
            }
            switch (event.key) {
                case "Alt":
                    MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_ALT);
                    break;
                case "AltGraph":
                    MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_ALTGRAPH);
                    break;
                case "Control":
                    MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_CTRL);
                    break;
                case "FN":
                    MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_FN);
                    break;
                case "Hyper":
                case "Meta":
                case "Super":
                case "OS":
                    MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_META);
                    break;
                case "Shift":
                    MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_SHIFT);
                    break;
                case "Symbol":
                    MPCKeyboard.Layout.removeModifier(MPCKeyboard.MODIFIER_SYMBOL);
                    break;
                default:
                    break;
            }
            if (MPCKeyboard.Options.combineMPCKeyboardAndNativeKeyboard) {
                if (MPCKeyboard.Layout.keys[event.code]) {
                    MPCKeyboard.Layout.keyUp({
                        key: MPCKeyboard.Layout.keys[event.code].key,
                        code: event.code,
                        location: MPCKeyboard.Layout.keys[event.code].location
                    });
                }
                else {
                    MPCKeyboard.Layout.keyUp(event);
                }
            }
            else {
                MPCKeyboard.Layout.modifyKey(event.key, "down", false);
            }
        }
        var _top = 0;
        var _left = 0;
        function _updateCaret() {
            var _selection = _activeWindow.getSelection();
            var _range = _selection.getRangeAt(0);
            var _rect = _range.getBoundingClientRect();
            Caret.element.style.top = _top + _rect.top + "px";
            Caret.element.style.left = _left + _rect.left + "px";
            Caret.element.style.height = _rect.height + "px";
            if (_customCaret) {
                MPCKeyboard.Helper.requestAnimationFrame(_updateCaret);
            }
            else {
                Caret.element.classList.add("hidden");
            }
        }
    })(Caret = MPCKeyboard.Caret || (MPCKeyboard.Caret = {}));
})(MPCKeyboard || (MPCKeyboard = {}));
/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />
var MPCKeyboard;
(function (MPCKeyboard) {
    var Input;
    (function (Input) {
        // # Input
        // Behandlung der Events des Keyboards
        // Ausschüttung der Events ans Document
        // Behandlung des auszugebenden Inputs
        Input.version = "2019.10.16";
        Input.element = MPCKeyboard.Helper.createMPCElement("mpc:input");
        Input.commands = [
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
                    let activeElement = MPCKeyboard.Caret.activeElement;
                    let activeWindow = MPCKeyboard.Caret.activeWindow;
                    if (activeElement instanceof activeWindow.HTMLInputElement ||
                        activeElement instanceof activeWindow.HTMLTextAreaElement) {
                        let selDir = activeElement.selectionDirection;
                        let selStart = activeElement.selectionStart;
                        let selEnd = activeElement.selectionEnd;
                        if (selStart == selEnd) {
                            if ((MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT) {
                                selDir = "backward";
                                selStart--;
                            }
                            else {
                                selEnd = --selStart;
                            }
                        }
                        else if (selDir == "backward") {
                            if ((MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT) {
                                selStart--;
                            }
                            else {
                                selEnd = --selStart;
                            }
                        }
                        else {
                            if ((MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT) {
                                selEnd--;
                            }
                            else {
                                selStart = --selEnd;
                            }
                        }
                        activeElement.selectionDirection = selDir;
                        activeElement.selectionStart = selStart;
                        activeElement.selectionEnd = selEnd;
                    }
                    else {
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
            { key: "Backspace", down() { MPCKeyboard.Caret.execCommand("delete"); return false; } },
            { key: "Delete", down() { MPCKeyboard.Caret.execCommand("forwardDelete"); return false; } },
            {
                key: "Enter",
                press() {
                    let activeElement = MPCKeyboard.Caret.activeElement;
                    let activeWindow = MPCKeyboard.Caret.activeWindow;
                    if (activeElement instanceof activeWindow.HTMLElement) {
                        if (/^(a|button|details|summary)$/i.test(activeElement.nodeName)) {
                            activeElement.click();
                            return "";
                        }
                        else if (activeElement instanceof activeWindow.HTMLInputElement) {
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
                        }
                        else if (activeElement instanceof activeWindow.HTMLSelectElement) {
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
                    let activeElement = MPCKeyboard.Caret.activeElement;
                    let activeWindow = MPCKeyboard.Caret.activeWindow;
                    if (activeElement instanceof activeWindow.HTMLElement) {
                        if (/^(a|button|details|summary|select)$/i.test(activeElement.nodeName)) {
                            activeElement.click();
                            return "";
                        }
                        else if (activeElement instanceof activeWindow.HTMLInputElement) {
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
                    if ((MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT) {
                        return "\u00a0";
                    }
                    else {
                        return " ";
                    }
                }
            },
            {
                key: "Tab",
                down() {
                    if (!MPCKeyboard.Caret.activeWindow.getSelection().isCollapsed) {
                        if ((MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT) {
                            MPCKeyboard.Caret.execCommand("outdent");
                        }
                        else {
                            MPCKeyboard.Caret.execCommand("indent");
                        }
                    }
                    else if (MPCKeyboard.Caret.activeDocument.designMode == "on") {
                        return true;
                    }
                    else {
                        if ((MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT) {
                            MPCKeyboard.Helper.getPreviousFocusable().focus();
                        }
                        else {
                            MPCKeyboard.Helper.getNextFocusable().focus();
                        }
                        return false;
                    }
                },
                press() { return "\t"; }
            },
            { code: "KeyA", modifiers: MPCKeyboard.MODIFIER_CTRL.toString(), down() { MPCKeyboard.Caret.execCommand("selectAll"); return false; } },
            { code: "KeyB", modifiers: MPCKeyboard.MODIFIER_CTRL.toString(), down() { MPCKeyboard.Caret.execCommand("bold"); return false; } },
            { code: "KeyC", modifiers: MPCKeyboard.MODIFIER_CTRL.toString(), down() { MPCKeyboard.Caret.execCommand("copy"); return false; } },
            { code: "KeyI", modifiers: MPCKeyboard.MODIFIER_CTRL.toString(), down() { MPCKeyboard.Caret.execCommand("italic"); return false; } },
            {
                code: "KeyP",
                modifiers: MPCKeyboard.MODIFIER_CTRL.toString(),
                lastTimeout: -1,
                down() {
                    if (this.lastTimeout + 5000 < Date.now()) {
                        this.lastTimeout = Date.now();
                        setTimeout(MPCKeyboard.Caret.activeWindow.print, 100);
                    }
                    return false;
                }
            },
            { code: "KeyU", modifiers: MPCKeyboard.MODIFIER_CTRL.toString(), down() { MPCKeyboard.Caret.execCommand("underline"); return false; } },
            { code: "KeyV", modifiers: MPCKeyboard.MODIFIER_CTRL.toString(), down() { MPCKeyboard.Caret.execCommand("paste"); return false; } },
            {
                code: "KeyV",
                modifiers: (MPCKeyboard.MODIFIER_SHIFT | MPCKeyboard.MODIFIER_CTRL).toString(),
                down() {
                    if (MPCKeyboard.Helper.window.navigator.clipboard && typeof MPCKeyboard.Helper.window.navigator.clipboard.readText == "function") {
                        MPCKeyboard.Helper.window.navigator.clipboard.readText().then(text => {
                            MPCKeyboard.Caret.execCommand("insertText", false, text);
                        }, () => {
                            MPCKeyboard.Caret.execCommand("insertText", false, MPCKeyboard.Helper.prompt("Please paste text here"));
                        });
                    }
                    else {
                        MPCKeyboard.Caret.execCommand("insertText", false, MPCKeyboard.Helper.prompt("Please paste text here"));
                    }
                    return false;
                }
            },
            { code: "KeyX", modifiers: MPCKeyboard.MODIFIER_CTRL.toString(), down() { MPCKeyboard.Caret.execCommand("cut"); return false; } },
            { code: "KeyY", modifiers: MPCKeyboard.MODIFIER_CTRL.toString(), down() { MPCKeyboard.Caret.execCommand("redo"); return false; } },
            { code: "KeyZ", modifiers: MPCKeyboard.MODIFIER_CTRL.toString(), down() { MPCKeyboard.Caret.execCommand("undo"); return false; } },
            { code: "Language", down() { MPCKeyboard.Menu.showMenu(MPCKeyboard.Menu.LanguageMenu); return false; } },
            { modifiers: MPCKeyboard.MODIFIER_CTRL.toString(), down() { return false; } },
            { modifiers: MPCKeyboard.MODIFIER_ALT.toString(), down() { return false; } },
            { modifiers: MPCKeyboard.MODIFIER_META.toString(), down() { return false; } },
            { key: /./, down() { return true; }, press(key) { return key.key; } }
        ];
        var _languageCommands = [];
        var _layoutCommands = [];
        MPCKeyboard.Helper.defineProperties(Input, {
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
        MPCKeyboard.element.appendChild(Input.element);
        function getCommandsFor(key) {
            var _commands = [];
            getCommandsFrom(_languageCommands, key, _commands);
            getCommandsFrom(_layoutCommands, key, _commands);
            getCommandsFrom(Input.commands, key, _commands);
            return _commands;
        }
        Input.getCommandsFor = getCommandsFor;
        function handleKeyDown(key, commands = getCommandsFor(key)) {
            // console.log("handleKeyDown(", ...arguments, ")");
            var event = new MPCKeyboard.KeyboardEvent("keydown", {
                altKey: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_ALT) == MPCKeyboard.MODIFIER_ALT,
                bubbles: true,
                cancelable: true,
                code: key.code,
                composed: false,
                ctrlKey: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_CTRL) == MPCKeyboard.MODIFIER_CTRL,
                detail: 0,
                key: key.key,
                lang: MPCKeyboard.lang,
                location: key.location,
                metaKey: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_META) == MPCKeyboard.MODIFIER_META,
                modifierAltGraph: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_ALTGRAPH) == MPCKeyboard.MODIFIER_ALTGRAPH,
                modifierCapsLock: (MPCKeyboard.Layout.modifier_locks & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT,
                modifierFn: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_FN) == MPCKeyboard.MODIFIER_FN,
                modifierFnLock: (MPCKeyboard.Layout.modifier_locks & MPCKeyboard.MODIFIER_FN) == MPCKeyboard.MODIFIER_FN,
                modifierHyper: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_META) == MPCKeyboard.MODIFIER_META,
                modifierNumLock: false,
                // modifierOS: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
                modifierScrollLock: false,
                modifierSuper: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_META) == MPCKeyboard.MODIFIER_META,
                modifierSymbol: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_SYMBOL) == MPCKeyboard.MODIFIER_SYMBOL,
                modifierSymbolLock: (MPCKeyboard.Layout.modifier_locks & MPCKeyboard.MODIFIER_SYMBOL) == MPCKeyboard.MODIFIER_SYMBOL,
                repeat: key.repeat,
                shiftKey: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT,
                view: MPCKeyboard.Caret.activeWindow
            });
            if (!MPCKeyboard.Caret.activeElement.dispatchEvent(event)) {
                // console.error(key.key, "dispatch-down", event);
                return;
            }
            var index = 0;
            var length = commands.length;
            var rslt;
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
        Input.handleKeyDown = handleKeyDown;
        function handleKeyPress(key, commands = getCommandsFor(key)) {
            // console.log("handleKeyPress(", ...arguments, ")");
            var event = new MPCKeyboard.KeyboardEvent("keypress", {
                altKey: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_ALT) == MPCKeyboard.MODIFIER_ALT,
                bubbles: true,
                cancelable: true,
                code: key.code,
                composed: false,
                ctrlKey: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_CTRL) == MPCKeyboard.MODIFIER_CTRL,
                detail: 0,
                key: key.key,
                lang: MPCKeyboard.lang,
                location: key.location,
                metaKey: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_META) == MPCKeyboard.MODIFIER_META,
                modifierAltGraph: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_ALTGRAPH) == MPCKeyboard.MODIFIER_ALTGRAPH,
                modifierCapsLock: (MPCKeyboard.Layout.modifier_locks & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT,
                modifierFn: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_FN) == MPCKeyboard.MODIFIER_FN,
                modifierFnLock: (MPCKeyboard.Layout.modifier_locks & MPCKeyboard.MODIFIER_FN) == MPCKeyboard.MODIFIER_FN,
                modifierHyper: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_META) == MPCKeyboard.MODIFIER_META,
                modifierNumLock: false,
                // modifierOS: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
                modifierScrollLock: false,
                modifierSuper: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_META) == MPCKeyboard.MODIFIER_META,
                modifierSymbol: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_SYMBOL) == MPCKeyboard.MODIFIER_SYMBOL,
                modifierSymbolLock: (MPCKeyboard.Layout.modifier_locks & MPCKeyboard.MODIFIER_SYMBOL) == MPCKeyboard.MODIFIER_SYMBOL,
                repeat: key.repeat,
                shiftKey: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT,
                view: MPCKeyboard.Caret.activeWindow
            });
            if (!MPCKeyboard.Caret.activeElement.dispatchEvent(event)) {
                console.error(key.key, "dispatch-press", event);
                return;
            }
            var index = 0;
            var length = commands.length;
            var rslt;
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
            MPCKeyboard.Caret.execCommand("insertText", false, text);
        }
        Input.handleKeyPress = handleKeyPress;
        function handleKeyUp(key, commands = getCommandsFor(key)) {
            // console.log("handleKeyUp(", ...arguments, ")");
            var event = new MPCKeyboard.KeyboardEvent("keyup", {
                altKey: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_ALT) == MPCKeyboard.MODIFIER_ALT,
                bubbles: true,
                cancelable: true,
                code: key.code,
                composed: false,
                ctrlKey: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_CTRL) == MPCKeyboard.MODIFIER_CTRL,
                detail: 0,
                key: key.key,
                lang: MPCKeyboard.lang,
                location: key.location,
                metaKey: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_META) == MPCKeyboard.MODIFIER_META,
                modifierAltGraph: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_ALTGRAPH) == MPCKeyboard.MODIFIER_ALTGRAPH,
                modifierCapsLock: (MPCKeyboard.Layout.modifier_locks & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT,
                modifierFn: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_FN) == MPCKeyboard.MODIFIER_FN,
                modifierFnLock: (MPCKeyboard.Layout.modifier_locks & MPCKeyboard.MODIFIER_FN) == MPCKeyboard.MODIFIER_FN,
                modifierHyper: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_META) == MPCKeyboard.MODIFIER_META,
                modifierNumLock: false,
                // modifierOS: (Layout.modifiers & MODIFIER_META) == MODIFIER_META,
                modifierScrollLock: false,
                modifierSuper: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_META) == MPCKeyboard.MODIFIER_META,
                modifierSymbol: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_SYMBOL) == MPCKeyboard.MODIFIER_SYMBOL,
                modifierSymbolLock: (MPCKeyboard.Layout.modifier_locks & MPCKeyboard.MODIFIER_SYMBOL) == MPCKeyboard.MODIFIER_SYMBOL,
                repeat: key.repeat,
                shiftKey: (MPCKeyboard.Layout.modifiers & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT,
                view: MPCKeyboard.Caret.activeWindow
            });
            if (!MPCKeyboard.Caret.activeElement.dispatchEvent(event)) {
                // console.error(key.key, "dispatch-up", event);
                return;
            }
            var index = 0;
            var length = commands.length;
            var rslt;
            for (index; index < length; index++) {
                if (typeof commands[index].up == "function") {
                    rslt = commands[index].up(key);
                    if (typeof rslt == "boolean") {
                        break;
                    }
                }
            }
        }
        Input.handleKeyUp = handleKeyUp;
        function setLayoutCommands(commands) {
            _layoutCommands = commands;
        }
        Input.setLayoutCommands = setLayoutCommands;
        function setLanguageCommands(commands) {
            _languageCommands = commands;
        }
        Input.setLanguageCommands = setLanguageCommands;
        function getCommandsFrom(commands, key, results) {
            MPCKeyboard.Helper.forEach(commands, command => {
                if (typeof command.down != "function" && typeof command.press != "function" && typeof command.up != "function") {
                    // console.error(key.key, "callback", command);
                    return;
                }
                if ((typeof command.code == "string" && command.code != key.code) ||
                    (command.code instanceof RegExp && !command.code.test(key.code))) {
                    // console.error(key.key, "code", command.code);
                    return;
                }
                if ((typeof command.key == "string" && command.key != key.key) ||
                    (command.key instanceof RegExp && !command.key.test(key.key))) {
                    // console.error(key.key, "key", command.key);
                    return;
                }
                if ((typeof command.location == "number" && command.location != key.location) ||
                    (command.location instanceof RegExp && !command.location.test(key.location.toString()))) {
                    // console.error(key.key, "location", command.location);
                    return;
                }
                if (typeof command.repeat == "boolean" && command.repeat != key.repeat) {
                    // console.error(key.key, "repeat", command.repeat);
                    return;
                }
                if ((typeof command.modifiers == "number" && (MPCKeyboard.Layout.modifiers & command.modifiers) != command.modifiers) ||
                    (typeof command.modifiers == "string" && command.modifiers != MPCKeyboard.Layout.modifiers.toString()) ||
                    (command.modifiers instanceof RegExp && !command.modifiers.test(MPCKeyboard.Layout.modifiers.toString()))) {
                    // console.error(key.key, "modifiers", command.modifiers);
                    return;
                }
                results.push(command);
            });
            return results;
        }
    })(Input = MPCKeyboard.Input || (MPCKeyboard.Input = {}));
})(MPCKeyboard || (MPCKeyboard = {}));
/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />
var MPCKeyboard;
(function (MPCKeyboard) {
    var Theme;
    (function (Theme) {
        // # Theme
        // Anordnung der Keys
        // Aussehen der Keys
        // Anpassung an das Fenster
        // Anpassung des Fensters
        Theme.version = "2019.05.25";
        Theme.element = MPCKeyboard.Helper.createMPCElement("mpc:theme");
        MPCKeyboard.element.appendChild(Theme.element);
    })(Theme = MPCKeyboard.Theme || (MPCKeyboard.Theme = {}));
})(MPCKeyboard || (MPCKeyboard = {}));
/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />
var MPCKeyboard;
(function (MPCKeyboard) {
    var Layout;
    (function (Layout) {
        // # Layout
        // Bereitstellung der Keys
        // Bestückung mit Keys
        // Bestückung der Keys
        Layout.version = "2020.02.22";
        Layout.element = MPCKeyboard.Helper.createMPCElement("mpc:layout");
        Layout.style = MPCKeyboard.Helper.createHTMLElement("mpc:style");
        Layout.keys = Object.create(null);
        Layout.keyCodes = [];
        Layout.spans = [];
        const _codes = {};
        var _activeLayout = [];
        var _activeKeyMap = {};
        var _touchId = null;
        var _modifiers = 0;
        var _modifier_locks = 0;
        var _key = null;
        class MPCKeyElement extends Element {
            get code() { return this.getAttribute("code"); }
            get size() { return this.getAttribute("size"); }
            set size(value) { this.setAttribute("size", value); }
            get location() { return Number(this.getAttribute("location") || MPCKeyboard.KEY_LOCATION_STANDARD); }
            set location(value) { this.setAttribute("location", value.toString()); }
            get feature() { return this.getAttribute("feature") || ""; }
            set feature(value) { value == "" ? this.removeAttribute("feature") : this.setAttribute("feature", value); }
            get label() { return this.innerHTML; }
            set label(value) { this.innerHTML = value; }
            get key() { return this.getAttribute("key") || ""; }
            set key(value) { this.setAttribute("key", value); }
        }
        Layout.MPCKeyElement = MPCKeyElement;
        class MPCSpanElement extends Element {
            get size() { return this.getAttribute("size"); }
            set size(value) { this.setAttribute("size", value); }
        }
        Layout.MPCSpanElement = MPCSpanElement;
        MPCKeyboard.Helper.defineProperties(Layout, {
            modifiers: {
                get() { return _modifiers; },
                set(value) { _modifiers = value; },
                enumerable: true,
                configurable: false
            },
            modifier_locks: {
                get() { return _modifier_locks; },
                set(value) { _modifier_locks = value; },
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
        MPCKeyboard.Theme.element.appendChild(Layout.style);
        MPCKeyboard.element.appendChild(Layout.element);
        Layout.element.addEventListener("mousedown", _down);
        Layout.element.addEventListener("mousemove", _move);
        Layout.element.addEventListener("mouseup", _up);
        MPCKeyboard.Helper.window.addEventListener("mousemove", _move);
        MPCKeyboard.Helper.window.addEventListener("mouseup", _up);
        Layout.element.addEventListener("touchstart", _down);
        Layout.element.addEventListener("touchmove", _move);
        Layout.element.addEventListener("touchcancel", _cancel);
        Layout.element.addEventListener("touchend", _up);
        MPCKeyboard.Helper.window.addEventListener("touchmove", _move);
        MPCKeyboard.Helper.window.addEventListener("touchcancel", _cancel);
        MPCKeyboard.Helper.window.addEventListener("touchend", _up);
        Layout.element.addEventListener("pointerdown", _down);
        Layout.element.addEventListener("pointermove", _move);
        Layout.element.addEventListener("pointercancel", _cancel);
        Layout.element.addEventListener("pointerup", _up);
        MPCKeyboard.Helper.window.addEventListener("pointermove", _move);
        MPCKeyboard.Helper.window.addEventListener("pointercancel", _cancel);
        MPCKeyboard.Helper.window.addEventListener("pointerup", _up);
        function getMPCKeyElementsByKey(key, getFirstOnly = false) {
            key = keyFilter({ key }).key;
            var rslt = [];
            MPCKeyboard.Helper.forEach(Layout.keyCodes, code => {
                if (Layout.keys[code].key == key) {
                    rslt.push(Layout.keys[code]);
                }
            });
            return getFirstOnly ? rslt.length > 0 ? rslt[0] : null : rslt;
        }
        Layout.getMPCKeyElementsByKey = getMPCKeyElementsByKey;
        function hasModifier(mod, persistent = false) {
            if (persistent) {
                return (Layout.modifier_locks & mod) == mod;
            }
            else {
                return (Layout.modifiers & mod) == mod;
            }
        }
        Layout.hasModifier = hasModifier;
        function setModifier(mod, persistent = false) {
            Layout.modifiers = (Layout.modifiers | mod);
            if (persistent) {
                Layout.modifier_locks = (Layout.modifier_locks | mod);
            }
            updateModifiers();
        }
        Layout.setModifier = setModifier;
        function removeModifier(mod, remove_persistent_only = false) {
            if (!remove_persistent_only) {
                Layout.modifiers = (Layout.modifiers & ~mod);
            }
            Layout.modifier_locks = (Layout.modifier_locks & ~mod);
            updateModifiers();
        }
        Layout.removeModifier = removeModifier;
        function updateModifiers() {
            if ((Layout.modifiers & MPCKeyboard.MODIFIER_ALT) == MPCKeyboard.MODIFIER_ALT) {
                if ((Layout.modifier_locks & MPCKeyboard.MODIFIER_ALT) == MPCKeyboard.MODIFIER_ALT) {
                    modifyKey("Alt", "lock=persistent", true);
                    modifyKey("AltLock", "lock=persistent", true);
                }
                else {
                    modifyKey("Alt", "lock", true);
                    modifyKey("AltLock", "lock", false);
                }
            }
            else {
                modifyKey("Alt", "lock", false);
                modifyKey("AltLock", "lock", false);
            }
            if ((Layout.modifiers & MPCKeyboard.MODIFIER_ALTGRAPH) == MPCKeyboard.MODIFIER_ALTGRAPH) {
                if ((Layout.modifier_locks & MPCKeyboard.MODIFIER_ALTGRAPH) == MPCKeyboard.MODIFIER_ALTGRAPH) {
                    modifyKey("AltGraph", "lock=persistent", true);
                    modifyKey("AltGraphLock", "lock=persistent", true);
                }
                else {
                    modifyKey("AltGraph", "lock", true);
                    modifyKey("AltGraphLock", "lock", false);
                }
            }
            else {
                modifyKey("AltGraph", "lock", false);
                modifyKey("AltGraphLock", "lock", false);
            }
            if ((Layout.modifiers & MPCKeyboard.MODIFIER_CTRL) == MPCKeyboard.MODIFIER_CTRL) {
                if ((Layout.modifier_locks & MPCKeyboard.MODIFIER_CTRL) == MPCKeyboard.MODIFIER_CTRL) {
                    modifyKey("Control", "lock=persistent", true);
                    modifyKey("ControlLock", "lock=persistent", true);
                }
                else {
                    modifyKey("Control", "lock", true);
                    modifyKey("ControlLock", "lock", false);
                }
            }
            else {
                modifyKey("Control", "lock", false);
                modifyKey("ControlLock", "lock", false);
            }
            if ((Layout.modifiers & MPCKeyboard.MODIFIER_FN) == MPCKeyboard.MODIFIER_FN) {
                if ((Layout.modifier_locks & MPCKeyboard.MODIFIER_FN) == MPCKeyboard.MODIFIER_FN) {
                    modifyKey("FN", "lock=persistent", true);
                    modifyKey("FNLock", "lock=persistent", true);
                }
                else {
                    modifyKey("FN", "lock", true);
                    modifyKey("FNLock", "lock", false);
                }
            }
            else {
                modifyKey("FN", "lock", false);
                modifyKey("FNLock", "lock", false);
            }
            if ((Layout.modifiers & MPCKeyboard.MODIFIER_META) == MPCKeyboard.MODIFIER_META) {
                if ((Layout.modifier_locks & MPCKeyboard.MODIFIER_META) == MPCKeyboard.MODIFIER_META) {
                    modifyKey("Meta", "lock=persistent", true);
                    modifyKey("MetaLock", "lock=persistent", true);
                }
                else {
                    modifyKey("Meta", "lock", true);
                    modifyKey("MetaLock", "lock", false);
                }
            }
            else {
                modifyKey("Meta", "lock", false);
                modifyKey("MetaLock", "lock", false);
            }
            if ((Layout.modifiers & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT) {
                if ((Layout.modifier_locks & MPCKeyboard.MODIFIER_SHIFT) == MPCKeyboard.MODIFIER_SHIFT) {
                    modifyKey("Shift", "lock=persistent", true);
                    modifyKey("CapsLock", "lock=persistent", true);
                    modifyKey("ShiftLock", "lock=persistent", true);
                }
                else {
                    modifyKey("Shift", "lock", true);
                    modifyKey("CapsLock", "lock", false);
                    modifyKey("ShiftLock", "lock", false);
                }
            }
            else {
                modifyKey("Shift", "lock", false);
                modifyKey("CapsLock", "lock", false);
                modifyKey("ShiftLock", "lock", false);
            }
            if ((Layout.modifiers & MPCKeyboard.MODIFIER_SYMBOL) == MPCKeyboard.MODIFIER_SYMBOL) {
                if ((Layout.modifier_locks & MPCKeyboard.MODIFIER_SYMBOL) == MPCKeyboard.MODIFIER_SYMBOL) {
                    modifyKey("Symbol", "lock=persistent", true);
                    modifyKey("SymbolLock", "lock=persistent", true);
                }
                else {
                    modifyKey("Symbol", "lock", true);
                    modifyKey("SymbolLock", "lock", false);
                }
            }
            else {
                modifyKey("Symbol", "lock", false);
                modifyKey("SymbolLock", "lock", false);
            }
            updateLayout();
        }
        Layout.updateModifiers = updateModifiers;
        function updateLayout() {
            let layout;
            let keyMap;
            let activeKeyboardLanguage = MPCKeyboard.langs.get(MPCKeyboard.lang);
            if (typeof activeKeyboardLanguage.getLayout == "function") {
                layout = activeKeyboardLanguage.getLayout(MPCKeyboard.Caret.activeInputMode, Layout.modifiers, Layout.modifier_locks);
            }
            else {
                layout = getLayout(MPCKeyboard.Caret.activeInputMode, Layout.modifiers, Layout.modifier_locks);
            }
            if (layout !== _activeLayout) {
                _setLayout(layout);
            }
            if (typeof activeKeyboardLanguage.getKeyMap == "function") {
                keyMap = activeKeyboardLanguage.getKeyMap(MPCKeyboard.Caret.activeInputMode, Layout.modifiers, Layout.modifier_locks);
            }
            else {
                keyMap = getKeyMap(MPCKeyboard.Caret.activeInputMode, Layout.modifiers, Layout.modifier_locks);
            }
            if (keyMap !== _activeKeyMap) {
                _setKeyMap(keyMap);
            }
        }
        Layout.updateLayout = updateLayout;
        function getLayout(inputMode, modifiers, modifier_locks) {
            let i;
            let mods = [];
            let activeKeyboardLanguage = MPCKeyboard.langs.get(MPCKeyboard.lang);
            for (i in activeKeyboardLanguage.layoutList) {
                i = parseInt(i);
                if (!isNaN(i) && hasModifier(i)) {
                    mods.push(i);
                }
            }
            i = Math.max.apply(null, mods.filter(a => a >= 0 && a <= 63));
            if (i < 0) {
                i = 0;
            }
            return activeKeyboardLanguage.layoutList[i] || [];
        }
        Layout.getLayout = getLayout;
        function getKeyMap(inputMode, modifiers, modifier_locks) {
            let i;
            let mods = [];
            let activeKeyboardLanguage = MPCKeyboard.langs.get(MPCKeyboard.lang);
            for (i in activeKeyboardLanguage.keyMapList) {
                i = parseInt(i);
                if (!isNaN(i) && hasModifier(i)) {
                    mods.push(i);
                }
            }
            i = Math.max.apply(null, mods.filter(a => a >= 0 && a <= 63));
            if (i < 0) {
                i = 0;
            }
            return activeKeyboardLanguage.keyMapList[i] || [];
        }
        Layout.getKeyMap = getKeyMap;
        function modifyKey(key, attr, state) {
            key = keyFilter({ key }).key;
            var attrName = attr.replace(/^([^\=]*)(?:\=(.*))?$/, "$1");
            var attrValue = attr.replace(/^([^\=]*)(?:\=(.*))?$/, "$2");
            MPCKeyboard.Helper.forEach(getMPCKeyElementsByKey(key, false), key => {
                if (state) {
                    key.setAttribute(attrName, attrValue);
                }
                else {
                    key.removeAttribute(attrName);
                }
            });
        }
        Layout.modifyKey = modifyKey;
        function keyDown(key) {
            keyFilter(key);
            keyUp(key);
            var _key = {
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
                    if (hasModifier(MPCKeyboard.MODIFIER_ALT, true) || hasModifier(MPCKeyboard.MODIFIER_ALT, false)) {
                        removeModifier(MPCKeyboard.MODIFIER_ALT);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_ALT, false);
                    }
                    break;
                case "AltLock":
                    if (hasModifier(MPCKeyboard.MODIFIER_ALT, true)) {
                        removeModifier(MPCKeyboard.MODIFIER_ALT);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_ALT, true);
                    }
                    break;
                case "AltGraph":
                    if (hasModifier(MPCKeyboard.MODIFIER_ALTGRAPH, true) || hasModifier(MPCKeyboard.MODIFIER_ALTGRAPH, false)) {
                        removeModifier(MPCKeyboard.MODIFIER_ALTGRAPH);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_ALTGRAPH, false);
                    }
                    break;
                case "AltGraphLock":
                    if (hasModifier(MPCKeyboard.MODIFIER_ALTGRAPH, true)) {
                        removeModifier(MPCKeyboard.MODIFIER_ALTGRAPH);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_ALTGRAPH, true);
                    }
                    break;
                case "Control":
                    if (hasModifier(MPCKeyboard.MODIFIER_CTRL, true) || hasModifier(MPCKeyboard.MODIFIER_CTRL, false)) {
                        removeModifier(MPCKeyboard.MODIFIER_CTRL);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_CTRL);
                    }
                    break;
                case "ControlLock":
                    if (hasModifier(MPCKeyboard.MODIFIER_CTRL, true)) {
                        removeModifier(MPCKeyboard.MODIFIER_CTRL);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_CTRL, true);
                    }
                    break;
                case "FN":
                    if (hasModifier(MPCKeyboard.MODIFIER_FN, true) || hasModifier(MPCKeyboard.MODIFIER_FN, false)) {
                        removeModifier(MPCKeyboard.MODIFIER_FN);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_FN, false);
                    }
                    break;
                case "FNLock":
                    if (hasModifier(MPCKeyboard.MODIFIER_FN, true)) {
                        removeModifier(MPCKeyboard.MODIFIER_FN);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_FN, true);
                    }
                    break;
                case "Meta":
                    if (hasModifier(MPCKeyboard.MODIFIER_META, true) || hasModifier(MPCKeyboard.MODIFIER_META, false)) {
                        removeModifier(MPCKeyboard.MODIFIER_META);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_META, false);
                    }
                    break;
                case "MetaLock":
                    if (hasModifier(MPCKeyboard.MODIFIER_META, true)) {
                        removeModifier(MPCKeyboard.MODIFIER_META);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_META, true);
                    }
                    break;
                case "Shift":
                    if (hasModifier(MPCKeyboard.MODIFIER_SHIFT, true) || hasModifier(MPCKeyboard.MODIFIER_SHIFT, false)) {
                        removeModifier(MPCKeyboard.MODIFIER_SHIFT);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_SHIFT, false);
                    }
                    break;
                case "CapsLock":
                case "ShiftLock":
                    if (hasModifier(MPCKeyboard.MODIFIER_SHIFT, true)) {
                        removeModifier(MPCKeyboard.MODIFIER_SHIFT);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_SHIFT, true);
                    }
                    break;
                case "Symbol":
                    if (hasModifier(MPCKeyboard.MODIFIER_SYMBOL, true) || hasModifier(MPCKeyboard.MODIFIER_SYMBOL, false)) {
                        removeModifier(MPCKeyboard.MODIFIER_SYMBOL);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_SYMBOL, false);
                    }
                    break;
                case "SymbolLock":
                    if (hasModifier(MPCKeyboard.MODIFIER_SYMBOL, true)) {
                        removeModifier(MPCKeyboard.MODIFIER_SYMBOL);
                    }
                    else {
                        setModifier(MPCKeyboard.MODIFIER_SYMBOL, true);
                    }
                    break;
                default:
                    _key.isModifier = false;
                    break;
            }
            MPCKeyboard.Helper.forEach(_key.keyElements, key => key.setAttribute("down", ""));
            MPCKeyboard.Input.handleKeyDown(_key);
            _key.timeout = setTimeout(() => {
                switch (_key.key) {
                    case "Alt":
                        if (hasModifier(MPCKeyboard.MODIFIER_ALT, true)) {
                            removeModifier(MPCKeyboard.MODIFIER_ALT);
                        }
                        else {
                            setModifier(MPCKeyboard.MODIFIER_ALT, true);
                        }
                        break;
                    case "AltGraph":
                        if (hasModifier(MPCKeyboard.MODIFIER_ALTGRAPH, true)) {
                            removeModifier(MPCKeyboard.MODIFIER_ALTGRAPH);
                        }
                        else {
                            setModifier(MPCKeyboard.MODIFIER_ALTGRAPH, true);
                        }
                        break;
                    case "Control":
                        if (hasModifier(MPCKeyboard.MODIFIER_CTRL, true)) {
                            removeModifier(MPCKeyboard.MODIFIER_CTRL);
                        }
                        else {
                            setModifier(MPCKeyboard.MODIFIER_CTRL, true);
                        }
                        break;
                    case "FN":
                        if (hasModifier(MPCKeyboard.MODIFIER_FN, true)) {
                            removeModifier(MPCKeyboard.MODIFIER_FN);
                        }
                        else {
                            setModifier(MPCKeyboard.MODIFIER_FN, true);
                        }
                        break;
                    case "Meta":
                        if (hasModifier(MPCKeyboard.MODIFIER_META, true)) {
                            removeModifier(MPCKeyboard.MODIFIER_META);
                        }
                        else {
                            setModifier(MPCKeyboard.MODIFIER_META, true);
                        }
                        break;
                    case "Shift":
                        if (hasModifier(MPCKeyboard.MODIFIER_SHIFT, true)) {
                            removeModifier(MPCKeyboard.MODIFIER_SHIFT);
                        }
                        else {
                            setModifier(MPCKeyboard.MODIFIER_SHIFT, true);
                        }
                        break;
                    case "Symbol":
                        if (hasModifier(MPCKeyboard.MODIFIER_SYMBOL, true)) {
                            removeModifier(MPCKeyboard.MODIFIER_SYMBOL);
                        }
                        else {
                            setModifier(MPCKeyboard.MODIFIER_SYMBOL, true);
                        }
                        break;
                    default:
                        break;
                }
                MPCKeyboard.Helper.forEach(_key.keyElements, key => key.setAttribute("down", "hold"));
                _key.repeat = true;
                MPCKeyboard.Input.handleKeyDown(_key);
                _key.timeout = null;
                _key.interval = setInterval(() => {
                    if (_key.stopped) {
                        clearInterval(_key.interval);
                    }
                    else {
                        MPCKeyboard.Input.handleKeyDown(_key);
                    }
                }, MPCKeyboard.Options.keyRepeatInterval);
            }, MPCKeyboard.Options.keyHoldTimeout);
        }
        Layout.keyDown = keyDown;
        function keyUp(key) {
            keyFilter(key);
            if (!MPCKeyboard.Helper.hasOwnProperty(_codes, key.code)) {
                return;
            }
            let _key = _codes[key.code];
            _key.stopped = true;
            typeof _key.timeout == "number" && clearTimeout(_key.timeout);
            typeof _key.interval == "number" && clearInterval(_key.interval);
            MPCKeyboard.Input.handleKeyUp(_key);
            MPCKeyboard.Helper.forEach(_key.keyElements, key => key.removeAttribute("down"));
            // remove non persistent modifiers
            // only if _key.key was not a modifier
            if (!_key.isModifier) {
                var removableModifiers = 0;
                if (!hasModifier(MPCKeyboard.MODIFIER_ALT, true)) {
                    removableModifiers |= MPCKeyboard.MODIFIER_ALT;
                }
                if (!hasModifier(MPCKeyboard.MODIFIER_CTRL, true)) {
                    removableModifiers |= MPCKeyboard.MODIFIER_CTRL;
                }
                if (!hasModifier(MPCKeyboard.MODIFIER_FN, true)) {
                    removableModifiers |= MPCKeyboard.MODIFIER_FN;
                }
                if (!hasModifier(MPCKeyboard.MODIFIER_META, true)) {
                    removableModifiers |= MPCKeyboard.MODIFIER_META;
                }
                if (!hasModifier(MPCKeyboard.MODIFIER_SHIFT, true)) {
                    removableModifiers |= MPCKeyboard.MODIFIER_SHIFT;
                }
                if (!hasModifier(MPCKeyboard.MODIFIER_SYMBOL, true)) {
                    removableModifiers |= MPCKeyboard.MODIFIER_SYMBOL;
                }
                removeModifier(removableModifiers);
            }
            delete _codes[key.code];
        }
        Layout.keyUp = keyUp;
        function releaseAllKeys() {
            var code;
            for (code in _codes) {
                if (MPCKeyboard.Helper.hasOwnProperty(_codes, code)) {
                    keyUp(_codes[code]);
                }
            }
            _key = null;
            MPCKeyboard.Helper.forEach(Layout.element.childNodes, (key) => {
                key.removeAttribute("down");
            });
        }
        Layout.releaseAllKeys = releaseAllKeys;
        function keyFilter(key) {
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
        Layout.keyFilter = keyFilter;
        function _setLayout(layout) {
            while (Layout.element.firstChild) {
                Layout.element.removeChild(Layout.element.firstChild);
            }
            var spanIndex = 0;
            var rows = [];
            var cols = [];
            MPCKeyboard.Helper.forEach(layout, row => {
                let row_length = 0;
                MPCKeyboard.Helper.forEach(row, keyOrSpan => {
                    row_length += keyOrSpan.width || 2;
                });
                var rowTemplate = MPCKeyboard.Helper.indexOf(rows, row_length);
                if (rowTemplate == -1) {
                    rowTemplate = rows.push(row_length) - 1;
                    cols.push([]);
                }
                MPCKeyboard.Helper.forEach(row, keyOrSpan => {
                    if ("code" in keyOrSpan) {
                        let key = Layout.keys[keyOrSpan.code] || null;
                        if (key instanceof MPCKeyElement === false) {
                            key = MPCKeyboard.Helper.createMPCElement("mpc:key");
                            MPCKeyboard.Helper.setPrototypeOf(key, MPCKeyElement.prototype);
                            key.setAttribute("code", keyOrSpan.code);
                            Layout.keys[key.code] = key;
                            Layout.keyCodes.push(key.code);
                        }
                        key.size = rowTemplate + "-" + (keyOrSpan.width || 2);
                        if (MPCKeyboard.Helper.indexOf(cols[rowTemplate], (keyOrSpan.width || 2)) == -1) {
                            cols[rowTemplate].push((keyOrSpan.width || 2));
                        }
                        key.location = keyOrSpan.location || MPCKeyboard.KEY_LOCATION_STANDARD;
                        key.feature = keyOrSpan.feature || "";
                        Layout.element.appendChild(key);
                    }
                    else {
                        let span = Layout.spans[spanIndex++] || null;
                        if (span instanceof MPCSpanElement === false) {
                            span = MPCKeyboard.Helper.createMPCElement("mpc:span");
                            MPCKeyboard.Helper.setPrototypeOf(span, MPCSpanElement.prototype);
                            Layout.spans.push(span);
                        }
                        span.size = rowTemplate + "-" + (keyOrSpan.width || 2);
                        if (MPCKeyboard.Helper.indexOf(cols[rowTemplate], (keyOrSpan.width || 2)) == -1) {
                            cols[rowTemplate].push((keyOrSpan.width || 2));
                        }
                        Layout.element.appendChild(span);
                    }
                });
            });
            var styleString = "";
            MPCKeyboard.Helper.forEach(cols, (row, rowTemplate) => {
                MPCKeyboard.Helper.forEach(row, width => {
                    styleString += `key[size="${rowTemplate}-${width}"],span[size="${rowTemplate}-${width}"]{width:${width / rows[rowTemplate] * 100}%;flex:${width} ${width} ${width / rows[rowTemplate] * 100}%;}`;
                });
            });
            Layout.style.textContent = styleString;
        }
        function _setKeyMap(keyMap) {
            MPCKeyboard.Helper.forEach(Layout.element.children, key => {
                if (key instanceof MPCKeyElement) {
                    if (key.code in keyMap) {
                        key.key = keyMap[key.code].key || "";
                        key.label = typeof keyMap[key.code].label == "string" ? keyMap[key.code].label : key.key;
                    }
                    else if (key.feature.length == 0) {
                        key.key = "";
                        key.label = "";
                    }
                }
            });
        }
        function _down(event) {
            event.preventDefault();
            if (_key || _touchId !== null && MPCKeyboard.Helper.isTouchEvent(event) && event.touches.length > 1) {
                return;
            }
            var target = event.target;
            while (target && (target instanceof MPCKeyElement) === false) {
                target = target.parentElement;
            }
            if (target instanceof MPCKeyElement) {
                _key = {
                    code: target.code,
                    key: target.key,
                    location: target.location,
                    rect: target.getBoundingClientRect()
                };
                keyDown(_key);
                if (MPCKeyboard.Helper.isTouchEvent(event)) {
                    _touchId = event.targetTouches[0].identifier;
                }
            }
        }
        function _move(event) {
            if (MPCKeyboard.Helper.isMouseEvent(event)) {
                if (_key) {
                    if (event.clientX < _key.rect.left - MPCKeyboard.Options.mousePrecision ||
                        event.clientX > _key.rect.right + MPCKeyboard.Options.mousePrecision ||
                        event.clientY < _key.rect.top - MPCKeyboard.Options.mousePrecision ||
                        event.clientY > _key.rect.bottom + MPCKeyboard.Options.mousePrecision) {
                        _cancel(event);
                    }
                }
            }
            else if (MPCKeyboard.Helper.isTouchEvent(event)) {
                if (_key && _touchId !== null) {
                    let _touch = MPCKeyboard.Helper.find(event.touches, "identifier", _touchId, true);
                    if (_touch.clientX < _key.rect.left - MPCKeyboard.Options.touchPrecision ||
                        _touch.clientX > _key.rect.right + MPCKeyboard.Options.touchPrecision ||
                        _touch.clientY < _key.rect.top - MPCKeyboard.Options.touchPrecision ||
                        _touch.clientY > _key.rect.bottom + MPCKeyboard.Options.touchPrecision) {
                        _cancel(event);
                    }
                }
            }
            else if (MPCKeyboard.Helper.isPointerEvent(event)) {
                if (event.clientX < _key.rect.left - MPCKeyboard.Options.pointerPrecision ||
                    event.clientX > _key.rect.right + MPCKeyboard.Options.pointerPrecision ||
                    event.clientY < _key.rect.top - MPCKeyboard.Options.pointerPrecision ||
                    event.clientY > _key.rect.bottom + MPCKeyboard.Options.pointerPrecision) {
                    _cancel(event);
                }
            }
        }
        function _cancel(event) {
            if (!_key || _touchId !== null && MPCKeyboard.Helper.isTouchEvent(event) && MPCKeyboard.Helper.find(event.touches, "identifier", _touchId, true)) {
                return;
            }
            keyUp(_key);
            _key = null;
        }
        function _up(event) {
            if (!_key || _touchId !== null && MPCKeyboard.Helper.isTouchEvent(event) && MPCKeyboard.Helper.find(event.touches, "identifier", _touchId, true)) {
                return;
            }
            keyUp(_key);
            _key = null;
        }
    })(Layout = MPCKeyboard.Layout || (MPCKeyboard.Layout = {}));
})(MPCKeyboard || (MPCKeyboard = {}));
/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />
var MPCKeyboard;
(function (MPCKeyboard) {
    var Menu;
    (function (Menu) {
        Menu.version = "2020.02.22";
        Menu.element = MPCKeyboard.Helper.createMPCElement("mpc:menus");
        Menu.element.addEventListener("mousedown", event => {
            event.preventDefault();
            while (Menu.element.firstChild) {
                Menu.element.removeChild(Menu.element.firstChild);
            }
        });
        Menu.element.addEventListener("touchstart", event => {
            event.preventDefault();
            while (Menu.element.firstChild) {
                Menu.element.removeChild(Menu.element.firstChild);
            }
        });
        Menu.element.addEventListener("pointerdown", event => {
            event.preventDefault();
            while (Menu.element.firstChild) {
                Menu.element.removeChild(Menu.element.firstChild);
            }
        });
        MPCKeyboard.element.appendChild(Menu.element);
        Menu.LanguageMenu = [() => {
                let rtn = [];
                let _lang = MPCKeyboard.lang;
                MPCKeyboard.Helper.forEach(MPCKeyboard.langList, lang => {
                    let def = MPCKeyboard.langs.get(lang);
                    rtn.push({
                        media: {
                            type: "text",
                            text: lang.toUpperCase()
                        },
                        class: _lang == lang ? "active" : "",
                        title: def.title,
                        description: def.description,
                        onclick() { MPCKeyboard.lang = lang; }
                    });
                });
                return rtn;
            }];
        Menu.SettingsMenu = [
            () => {
                let iconTrue = "\u2611";
                let iconFalse = "\u2610";
                return [
                    { title: "Auto-open Keyboard", media: { type: "text", text: MPCKeyboard.Options.autoOpenKeyboard ? iconTrue : iconFalse }, onclick() { MPCKeyboard.Options.autoOpenKeyboard = !MPCKeyboard.Options.autoOpenKeyboard; } },
                    { title: "Override Inputmethod", media: { type: "text", text: MPCKeyboard.Options.overrideInputMode ? iconTrue : iconFalse }, onclick() { MPCKeyboard.Options.overrideInputMode = !MPCKeyboard.Options.overrideInputMode; } },
                    { title: "Combine with Native Keyboard", media: { type: "text", text: MPCKeyboard.Options.combineMPCKeyboardAndNativeKeyboard ? iconTrue : iconFalse }, onclick() { MPCKeyboard.Options.combineMPCKeyboardAndNativeKeyboard = !MPCKeyboard.Options.combineMPCKeyboardAndNativeKeyboard; } },
                    { title: "Collapse on Hide", media: { type: "text", text: MPCKeyboard.Options.collapseOnHide ? iconTrue : iconFalse }, onclick() { MPCKeyboard.Options.collapseOnHide = !MPCKeyboard.Options.collapseOnHide; } },
                    { title: "Extended Keyboard Options", media: { type: "text", text: "\u2328" }, onclick() { alert("Open window to edit all options. Create a simple Number-Input to access/manage number-inputs"); } },
                ];
            }
        ];
        function showMenu(menu, parentMenuElement) {
            let menuElement = MPCKeyboard.Helper.createMPCElement("mpc:menu");
            Menu.element.appendChild(menuElement);
            iterateMenu(menu, menuElement);
        }
        Menu.showMenu = showMenu;
        function iterateMenu(menu, element) {
            MPCKeyboard.Helper.forEach(menu, menuitem => {
                if (typeof menuitem == "function") {
                    iterateMenu(menuitem(), element);
                }
                else if (typeof menuitem == "object") {
                    element.appendChild(createMenuItem(menuitem));
                }
                else {
                    element.appendChild(MPCKeyboard.Helper.createMPCElement("mpc:separator"));
                }
            });
        }
        function createMenuItem(menuitem) {
            let element = MPCKeyboard.Helper.createMPCElement("mpc:menuitem");
            element.addEventListener("mousedown", event => {
                event.preventDefault();
                menuitem.onclick();
            });
            element.addEventListener("touchstart", event => {
                event.preventDefault();
                menuitem.onclick();
            });
            element.addEventListener("pointerdown", event => {
                event.preventDefault();
                menuitem.onclick();
            });
            if (menuitem.class) {
                element.className = menuitem.class;
            }
            if (menuitem.media && menuitem.media.type == "image") {
                let media = MPCKeyboard.Helper.createHTMLElement("img");
                media.src = menuitem.media.src;
                media.classList.add("menuitem-media");
                element.appendChild(media);
            }
            else if (menuitem.media && menuitem.media.type == "text") {
                let media = MPCKeyboard.Helper.createMPCElement("mpc:text");
                media.textContent = menuitem.media.text;
                media.classList.add("menuitem-media");
                element.appendChild(media);
            }
            let title = MPCKeyboard.Helper.createMPCElement("mpc:text");
            title.textContent = menuitem.title;
            title.classList.add("menuitem-title");
            element.appendChild(title);
            if (menuitem.description) {
                let description = MPCKeyboard.Helper.createMPCElement("mpc:text");
                description.textContent = menuitem.description;
                description.classList.add("menuitem-description");
                element.appendChild(description);
            }
            return element;
        }
    })(Menu = MPCKeyboard.Menu || (MPCKeyboard.Menu = {}));
})(MPCKeyboard || (MPCKeyboard = {}));
/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference path="mpckeyboard/helper.ts" />
/// <reference path="mpckeyboard/options.ts" />
/// <reference path="mpckeyboard.ts" />
/// <reference path="mpckeyboard/event.ts" />
/// <reference path="mpckeyboard/caret.ts" />
/// <reference path="mpckeyboard/input.ts" />
/// <reference path="mpckeyboard/theme.ts" />
/// <reference path="mpckeyboard/layout.ts" />
/// <reference path="mpckeyboard/menu.ts" />
var MPCKeyboard;
(function (MPCKeyboard) {
    MPCKeyboard.Options.autoOpenKeyboard && MPCKeyboard.hide(MPCKeyboard.Options.collapseOnHide);
})(MPCKeyboard || (MPCKeyboard = {}));
//# sourceMappingURL=mpckeyboard.js.map