/// <reference path="../../js/mpckeyboard.d.ts" />

Promise.all([
  fetch("../layouts/qwerty.json").then(r => r.json()),
  fetch("../keymaps/deu-de.json").then(r => r.json()),
  fetch("../keymaps/deu-latf.json").then(r => r.json()),
  fetch("../keymaps/gre.json").then(r => r.json()),
  fetch("../keymaps/hbo.json").then(r => r.json())
]).then(value => {
  let layouts = value[0];
  let deu_de = value[1];
  let deu_latf = value[2];
  let gre = value[3];
  let hbo = value[4];
  window.addEventListener("resize", () => {
    (MPCKeyboard.lang == "deu-de") && MPCKeyboard.Layout.updateLayout();
    (MPCKeyboard.lang == "deu-latf") && MPCKeyboard.Layout.updateLayout();
    (MPCKeyboard.lang == "gre") && MPCKeyboard.Layout.updateLayout();
    (MPCKeyboard.lang == "hbo") && MPCKeyboard.Layout.updateLayout();
  });
  MPCKeyboard.registerKeyboardLanguage({
    lang: "deu-de",
    title: "Deutsch",
    description: "Deutschland",
    keyMapList: deu_de,
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
    lang: "deu-latf",
    title: "Deutsch",
    description: "Lateinisch-Fraktur",
    keyMapList: deu_latf,
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
