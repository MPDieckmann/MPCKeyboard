/// <reference no-default-lib="true" />
/// <reference path="../main.ts" />

namespace MPCKeyboard.Menu {
  export const version = "2020.02.22";
  export const element = Helper.createMPCElement("mpc:menus");
  element.addEventListener("mousedown", event => {
    event.preventDefault();
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  });
  element.addEventListener("touchstart", event => {
    event.preventDefault();
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  });
  element.addEventListener("pointerdown", event => {
    event.preventDefault();
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  });
  MPCKeyboard.element.appendChild(element);
  export interface Menuitem {
    media?: {
      type: "image";
      src: string;
    } | {
      type: "text";
      text: string;
    };
    class?: string,
    title: string;
    description?: string;
    onclick(): void;
  }
  export type MenuitemSeparator = "separator";
  export type Menu = ((() => Menu) | Menuitem | MenuitemSeparator)[];
  export const LanguageMenu: Menu = [() => {
    let rtn: Menu = [];
    let _lang = MPCKeyboard.lang;
    Helper.forEach(langList, lang => {
      let def = langs.get(lang);
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
  export const SettingsMenu: Menu = [
    () => {
      let iconTrue = "\u2611";
      let iconFalse = "\u2610";
      return [
        { title: "Auto-open Keyboard", media: { type: "text", text: Options.autoOpenKeyboard ? iconTrue : iconFalse }, onclick() { Options.autoOpenKeyboard = !Options.autoOpenKeyboard; } },
        { title: "Override Inputmethod", media: { type: "text", text: Options.overrideInputMode ? iconTrue : iconFalse }, onclick() { Options.overrideInputMode = !Options.overrideInputMode; } },
        { title: "Combine with Native Keyboard", media: { type: "text", text: Options.combineMPCKeyboardAndNativeKeyboard ? iconTrue : iconFalse }, onclick() { Options.combineMPCKeyboardAndNativeKeyboard = !Options.combineMPCKeyboardAndNativeKeyboard; } },
        { title: "Collapse on Hide", media: { type: "text", text: Options.collapseOnHide ? iconTrue : iconFalse }, onclick() { Options.collapseOnHide = !Options.collapseOnHide; } },
        { title: "Extended Keyboard Options", media: { type: "text", text: "\u2328" }, onclick() { alert("Open window to edit all options. Create a simple Number-Input to access/manage number-inputs"); } },
      ];
    }
  ];
  export function showMenu(menu: Menu, parentMenuElement?: Element) {
    let menuElement = Helper.createMPCElement("mpc:menu");
    element.appendChild(menuElement);
    iterateMenu(menu, menuElement);
  }
  function iterateMenu(menu: Menu, element: Element) {
    Helper.forEach(menu, menuitem => {
      if (typeof menuitem == "function") {
        iterateMenu(menuitem(), element);
      } else if (typeof menuitem == "object") {
        element.appendChild(createMenuItem(menuitem));
      } else {
        element.appendChild(Helper.createMPCElement("mpc:separator"));
      }
    });
  }
  function createMenuItem(menuitem: Menuitem) {
    let element = Helper.createMPCElement("mpc:menuitem");
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
      let media = Helper.createHTMLElement("img");
      media.src = menuitem.media.src;
      media.classList.add("menuitem-media");
      element.appendChild(media);
    } else if (menuitem.media && menuitem.media.type == "text") {
      let media = Helper.createMPCElement("mpc:text");
      media.textContent = menuitem.media.text;
      media.classList.add("menuitem-media");
      element.appendChild(media);
    }
    let title = Helper.createMPCElement("mpc:text");
    title.textContent = menuitem.title;
    title.classList.add("menuitem-title");
    element.appendChild(title);
    if (menuitem.description) {
      let description = Helper.createMPCElement("mpc:text");
      description.textContent = menuitem.description;
      description.classList.add("menuitem-description");
      element.appendChild(description);
    }
    return element;
  }
}