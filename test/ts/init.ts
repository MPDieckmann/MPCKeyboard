/// <reference path="../../js/mpckeyboard.d.ts" />

Promise.all([
  fetch("../layouts/qwerty.json").then(r => r.json()),
  fetch("../keymaps/deu.json").then(r => r.json()),
  fetch("../keymaps/gre.json").then(r => r.json()),
  fetch("../keymaps/hbo.json").then(r => r.json())
]).then(value => {
  let layouts = value[0];
  let deu = value[1];
  let gre = value[2];
  let hbo = value[3];
  window.addEventListener("resize", () => {
    (MPCKeyboard.lang == "deu") && MPCKeyboard.Layout.updateLayout();
    (MPCKeyboard.lang == "gre") && MPCKeyboard.Layout.updateLayout();
    (MPCKeyboard.lang == "hbo") && MPCKeyboard.Layout.updateLayout();
  });
  MPCKeyboard.registerKeyboardLanguage({
    lang: "deu",
    title: "Deutsch",
    description: "Deutschland",
    keyMapList: deu,
    commands: [],
    getLayout(): MPCKeyboard.Layout.KeyboardLayout {
      if (window.innerWidth > 500) {
        if (MPCKeyboard.Layout.hasModifier(MPCKeyboard.MODIFIER_FN)) {
          return layouts.fn;
        } else {
          return layouts.default;
        }
      } else if (MPCKeyboard.Layout.hasModifier(MPCKeyboard.MODIFIER_SYMBOL)) {
        return layouts.symbol;
      } else {
        return layouts.mobile;
      }
    }
  });
  MPCKeyboard.registerKeyboardLanguage({
    lang: "gre",
    title: "Griechisch",
    description: "Polytonisch",
    keyMapList: gre,
    commands: [],
    getLayout(): MPCKeyboard.Layout.KeyboardLayout {
      if (window.innerWidth > 500) {
        if (MPCKeyboard.Layout.hasModifier(MPCKeyboard.MODIFIER_FN)) {
          return layouts.fn;
        } else {
          return layouts.default;
        }
      } else if (MPCKeyboard.Layout.hasModifier(MPCKeyboard.MODIFIER_SYMBOL)) {
        return layouts.symbol;
      } else {
        return layouts.mobile;
      }
    }
  });
  MPCKeyboard.registerKeyboardLanguage({
    lang: "hbo",
    title: "Hebräisch",
    description: "Masoretisch",
    keyMapList: hbo,
    commands: [],
    getLayout(): MPCKeyboard.Layout.KeyboardLayout {
      if (window.innerWidth > 500) {
        if (MPCKeyboard.Layout.hasModifier(MPCKeyboard.MODIFIER_FN)) {
          return layouts.fn;
        } else {
          return layouts.default;
        }
      } else if (MPCKeyboard.Layout.hasModifier(MPCKeyboard.MODIFIER_SYMBOL)) {
        return layouts.symbol;
      } else {
        return layouts.mobile;
      }
    }
  });
});
