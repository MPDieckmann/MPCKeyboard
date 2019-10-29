/// <reference no-default-lib="true" />
/// <reference path="./main.ts" />

namespace MPCKeyboard {
  export const version = "2019.10.17";
  export const element = Helper.createMPCElement("mpc:keyboard");
  // Key.location
  export const KEY_LOCATION_STANDARD = 0;
  export const KEY_LOCATION_LEFT = 1;
  export const KEY_LOCATION_RIGHT = 2;
  export const KEY_LOCATION_NUMPAD = 3;
  /** @values from `0` to `3` */
  export type KEY_LOCATION = 0 | 1 | 2 | 3;
  // Modifiers
  export const MODIFIER_DEFAULT = 0;
  export const MODIFIER_SHIFT = 1;
  export const MODIFIER_CTRL = 2;
  export const MODIFIER_ALT = 4;
  export const MODIFIER_ALTGRAPH = <6>(MODIFIER_CTRL | MODIFIER_ALT);
  export const MODIFIER_META = 8;
  export const MODIFIER_FN = 16;
  export const MODIFIER_SYMBOL = 32;
  /** @values from `0` to `63` */
  export type MODIFIER = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63;
  // Layouts
  export const LAYOUT_DEFAULT = MODIFIER_DEFAULT;
  export const LAYOUT_SHIFT = MODIFIER_SHIFT;
  export const LAYOUT_ALTGRAPH = MODIFIER_ALTGRAPH;
  export const LAYOUT_SHIFT_ALTGRAPH = <7>(MODIFIER_SHIFT | MODIFIER_ALTGRAPH);
  export const LAYOUT_SYMBOL = MODIFIER_SYMBOL;
  export const LAYOUT_SHIFT_SYMBOL = <33>(MODIFIER_SHIFT | MODIFIER_SYMBOL);
  export const LAYOUT_ALTGRAPH_SYMBOL = <38>(MODIFIER_ALTGRAPH | MODIFIER_SYMBOL);
  export const LAYOUT_SHIFT_ALTGRAPH_SYMBOL = <39>(MODIFIER_SHIFT | MODIFIER_ALTGRAPH | MODIFIER_SYMBOL);
  /** 
   * @values typically: `0`, `1`, `6`, `7`, `32`, `33`, `38`, `39`
   * @values possible values: `0` to `103`
   */
  export type LAYOUT = 0 | 1 | 6 | 7 | 32 | 33 | 38 | 39 | MODIFIER;
  /** Keine virtuelle Tastatur; dies ist nützlich, wenn die Anwendung oder die Website ihre eigene Tastatureingabesteuerung implementiert. */
  export const INPUT_MODE_NONE = "none";
  /** Standard-Text-Eingabetastatur für das aktuelle Gebietsschema des Benutzers. */
  export const INPUT_MODE_TEXT = "text";
  /** Fraktionierte numerische Eingabetastatur, die die Ziffern und das entsprechende Trennzeichen für das Gebietsschema des Benutzers enthält (typischerweise entweder "." oder ","). */
  export const INPUT_MODE_DECIMAL = "decimal";
  /** Numerische Eingabetastatur; alles, was benötigt wird, sind die Ziffern 0 bis 9. */
  export const INPUT_MODE_NUMERIC = "numeric";
  /** Eine Telefontastatur-Eingabe, die die Ziffern 0 bis 9, das Sternchen ("*") und die Pfund-Taste ("#") enthält. Für Formulareingaben, die eine Telefontastatur erfordern, sollte stattdessen <input type="tel"> verwendet werden. */
  export const INPUT_MODE_TEL = "tel";
  /** Eine virtuelle Tastatur, die für die Sucheingabe optimiert ist. So kann beispielsweise die Eingabetaste in "Suchen" umbenannt werden, und es kann weitere Optimierungen geben. */
  export const INPUT_MODE_SEARCH = "search";
  /** Eine virtuelle Tastatur, die für die Eingabe von E-Mail-Adressen optimiert ist; typischerweise beinhaltet dies das Zeichen "@" sowie andere Optimierungen. Für Formulareingaben, die eine Eingabe der E-Mail-Adresse erfordern, sollte stattdessen <input type="email"> verwendet werden. */
  export const INPUT_MODE_EMAIL = "email";
  /** Eine Tastatur, die für die Eingabe von URLs optimiert ist. Dies kann z.B. dazu führen, dass die Taste "/" prominenter verfügbar ist. Erweiterte Funktionen können auch den Zugriff auf die Historie und dergleichen beinhalten. Für Formulareingaben, die eine URL anfordern, sollte stattdessen <input type="url"> verwendet werden. */
  export const INPUT_MODE_URL = "url";
  export type INPUT_MODE = "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";

  /**
   * Liefert einen `DOMString` der das Gebietsschema identifiziert für die das Keyboard
   * konfiguriert ist. Diese Zeichenkette kann leer sein, wenn der Browser oder das
   * Gerät das Gebietsschema des Keyboards nicht kennt.
   * 
   * @example
   * "de" | "de-de"
   */
  export declare var lang: string;
  export declare const visibility: VisibilityState;
  export const langs: ReadonlyMap<string, KeyboardLanguageDefinition> = new Map([["", {
    lang: "",
    title: "",
    description: "",
    layoutList: { 0: [] },
    keyMapList: { 0: {} },
    commands: []
  }]]);
  export const langList: ReadonlyArray<string> = [];
  var _lang: string = "";
  Helper.defineProperties(MPCKeyboard, {
    visibility: {
      get() {
        if (element.hasAttribute("hidden")) {
          if (element.getAttribute("hidden") == "collapse") {
            return "collapse";
          } else {
            return "hidden";
          }
        } else {
          return "visible";
        }
      },
      set(value: VisibilityState) {
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
        if (!langs.has(_lang)) {
          _lang = langList[0] || "";
          Layout.updateLayout();
        }
        return _lang;
      },
      set(value: string) {
        let lang = value.toLowerCase();
        if (lang == "" && langList.length > 0) {
          return;
        }
        if (langs.has(lang)) {
          _lang = lang;
          Layout.updateLayout();
        }
      },
      enumerable: true,
      configurable: false
    }
  });

  export type VisibilityState = "visible" | "hidden" | "collapse";

  export interface KeyboardLanguageDefinition {
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
    layoutList?: { [LAYOUT_DEFAULT]: Layout.KeyboardLayout; } & { [m in LAYOUT]?: Layout.KeyboardLayout; };
    /**
     * Eines von beiden muss existieren: `keyMapList` oder `getKeyMap`.
     * Das jeweils andere ist dann optional.
     */
    keyMapList?: { [LAYOUT_DEFAULT]: Layout.KeyMap; } & { [m in LAYOUT]?: Layout.KeyMap; };
    /**
     * Eines von beiden muss existieren: `layoutCommandsList` oder `getLayoutCommands`.
     * Das jeweils andere ist dann optional.
     */
    // layoutCommandsList?: { [m in LAYOUT]?: Input.Command[]; };
    commands: Input.Command[];
    getLayout?(this: KeyboardLanguageDefinition, inputMode: INPUT_MODE, modifiers: MODIFIER, modifier_locks: MODIFIER): Layout.KeyboardLayout;
    getKeyMap?(this: KeyboardLanguageDefinition, inputMode: INPUT_MODE, modifiers: MODIFIER, modifier_locks: MODIFIER): Layout.KeyMap;
    // getLayoutCommands?(this: KeyboardLanguageDefinition, modifiers: MODIFIER, modifier_locks: MODIFIER): Input.Command[];
  }

  export function registerKeyboardLanguage(def: KeyboardLanguageDefinition): void {
    if (langs.has(def.lang)) {
      throw new Error("Failed to register keyboard language: lang '" + def.lang + "' is already registered.");
    }
    def.lang = def.lang.toLowerCase();
    (<Map<string, KeyboardLanguageDefinition>>langs).set(def.lang, def);
    (<string[]>langList).push(def.lang);
    if (lang == "") {
      lang = def.lang;
    }
    Caret.updateInputLanguage();
  }
  export function unregisterKeyboardLanguage(lang: string): void {
    lang = lang.toLowerCase();
    (<Map<string, KeyboardLanguageDefinition>>langs).delete(lang);
    let i = langList.indexOf(lang);
    if (i > -1) {
      (<string[]>langList).splice(i, 1);
      if (_lang == lang) {
        MPCKeyboard.lang = langList[0] || "";
      }
    }
    Caret.updateInputLanguage();
  }

  var hideRequest: number = null;
  export function show(): void {
    if (typeof hideRequest == "number") {
      clearTimeout(hideRequest);
      hideRequest = null;
    }
    if (!element.hasAttribute("hidden")) {
      return;
    }
    element.removeAttribute("hidden");
  }
  export function hide(collapse: boolean = Options.collapseOnHide): void {
    if (
      typeof hideRequest == "number" ||
      (collapse && element.getAttribute("hidden") == "collapse") ||
      (!collapse && element.getAttribute("hidden") == "")
    ) {
      return;
    }
    hideRequest = setTimeout(() => {
      if (collapse) {
        element.setAttribute("hidden", "collapse");
      } else {
        element.setAttribute("hidden", "");
      }
      hideRequest = null;
    }, 100);
  }
  export function toggle(force: boolean = null, collapse: boolean = Options.collapseOnHide): void {
    if (force === true) {
      show();
    } else if (force === false || !element.hasAttribute("hidden")) {
      hide(collapse);
    } else {
      show();
    }
  }

  Helper.document.documentElement.appendChild(element);
}
