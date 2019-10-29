/// <reference path="../../js/mpckeyboard.d.ts" />
var Options;
(function (Options) {
    Options.options = {
        autoOpenKeyboard: {
            name: "autoOpenKeyboard",
            type: "checkbox",
            default: MPCKeyboard.Options.autoOpenKeyboard,
            hint: "Zeigt das MPCKeyboard Element automatisch an, wenn ein Eingabefeld den Fokus erhält, oder blendet es aus, wenn das fokussierte Element keine Eingabe ermöglicht.",
        }, overrideInputMode: {
            name: "overrideInputMode",
            type: "checkbox",
            default: MPCKeyboard.Options.overrideInputMode,
            hint: "MPCKeyboard soll sich bemühen, native Bildschirm-Tastaturen auszublenden. (Funktioniert bisher nur bei Chromium basierten Browsern (Chrome, Chromium, Opera ...)."
        }, combineMPCKeyboardAndNativeKeyboard: {
            name: "combineMPCKeyboardAndNativeKeyboard",
            type: "checkbox",
            default: MPCKeyboard.Options.combineMPCKeyboardAndNativeKeyboard,
            hint: "Wenn aktiviert, wird versucht, die Hardware-Tastatur-Eingaben in MPCKeyboard-Eingaben unmzuwandeln. (Kann zu Problemen führen; bisher werden nur Desktop-Systeme wie Windows und OSX unterstützt)."
        }, collapseOnHide: {
            name: "collapseOnHide",
            type: "checkbox",
            default: MPCKeyboard.Options.collapseOnHide,
            hint: "Blendet bei verstecktem MPCKeyboard die Schaltfläche zum Öffnen aus oder ein."
        }, keyHoldTimeout: {
            name: "keyHoldTimeout",
            type: "number",
            min: 50,
            default: MPCKeyboard.Options.keyHoldTimeout,
            max: 10000,
            hint: "Gibt (in Millisekunden) an, wie lange eine Taste gedrückt werden muss, bevor MPCKeyboard den Wert bei keydown auf repeat setzt."
        }, keyRepeatInterval: {
            name: "keyRepeatInterval",
            type: "number",
            min: 10,
            default: MPCKeyboard.Options.keyRepeatInterval,
            max: 500,
            hint: "Gibt (in Millisekunden) an, wie lange zwischen den wiederholenden keydown-Events gewartet werden soll."
        }, mousePrecision: {
            name: "mousePrecision",
            type: "number",
            min: 0,
            default: MPCKeyboard.Options.mousePrecision,
            max: 100,
            hint: "Gibt (in Pixeln) die Präzision an, mit der ein Mousemove aus dem Tastenfeld maximal abweichen darf bevor ein die Taste ein keyUp Event wirft."
        }, touchPrecision: {
            name: "touchPrecision",
            type: "number",
            min: 0,
            default: MPCKeyboard.Options.touchPrecision,
            max: 100,
            hint: "Gibt (in Pixeln) die Präzision an, mit der ein Touchmove aus dem Tastenfeld maximal abweichen darf bevor ein die Taste ein keyUp Event wirft."
        }, pointerPrecision: {
            name: "pointerPrecision",
            type: "number",
            min: 0,
            default: MPCKeyboard.Options.pointerPrecision,
            max: 100,
            hint: "Gibt (in Pixeln) die Präzision an, mit der ein Pointermove aus dem Tastenfeld maximal abweichen darf bevor ein die Taste ein keyUp Event wirft."
        }
    };
    Options.optionsGrid = document.getElementById("options-grid");
    var key;
    Options.$_REQUEST = parseSearchString(location.search);
    for (key in MPCKeyboard.Options) {
        if (MPCKeyboard.Helper.hasOwnProperty(Options.options, key)) {
            let _value = MPCKeyboard.Options[key];
            if (MPCKeyboard.Helper.hasOwnProperty(Options.$_REQUEST, key)) {
                _value = Options.$_REQUEST[key];
                switch (Options.options[key].type) {
                    case "number":
                        _value = Number(_value || 0);
                        break;
                    case "checkbox":
                        _value = (_value || "").toLowerCase() == "on";
                        break;
                    default:
                        break;
                }
            }
            Options.options[key].value = _value;
            buildOption(Options.options[key], MPCKeyboard.Options);
        }
        else {
            let _type;
            let _value = Options.$_REQUEST[key];
            let _default = MPCKeyboard.Options[key];
            switch (typeof _default) {
                case "number":
                    _type = "number";
                    _value = Number(_value);
                    break;
                case "boolean":
                    _type = "checkbox";
                    _value = _value.toLowerCase() == "on";
                    break;
                default:
                    _type = "text";
                    break;
            }
            buildOption({
                name: key,
                type: _type,
                value: MPCKeyboard.Helper.hasOwnProperty(Options.$_REQUEST, key) ? _value : _default,
                default: _default,
                hint: null
            }, MPCKeyboard.Options);
        }
    }
    var hr = document.createElement("hr");
    hr.classList.add("flexbreak");
    Options.optionsGrid.appendChild(hr);
    var submitLabel = document.createElement("label");
    submitLabel.classList.add("label", "label-submit");
    var submitButton = document.createElement("input");
    submitButton.classList.add("labelcontent");
    submitButton.type = "submit";
    submitButton.value = "Speichern und neuladen";
    submitLabel.appendChild(submitButton);
    Options.optionsGrid.appendChild(submitLabel);
    function buildOption(option, container) {
        let label = document.createElement("label");
        label.classList.add("label", "label-title", "label-" + option.type);
        let labeltitle = document.createElement("span");
        labeltitle.classList.add("labeltitle");
        labeltitle.textContent = option.name;
        label.appendChild(labeltitle);
        let labelhint = document.createElement("p");
        labelhint.classList.add("labelhint");
        labelhint.textContent = option.hint && option.hint + " ";
        label.appendChild(labelhint);
        let hintExtension = document.createElement("i");
        hintExtension.textContent = "(Standard: " + option.value + ")";
        labelhint.appendChild(hintExtension);
        switch (option.type) {
            case "checkbox":
                var labelaction = document.createElement("input");
                labelaction.classList.add("labelaction");
                labelaction.name = option.name;
                labelaction.type = "checkbox";
                container[option.name] = labelaction.checked = option.value;
                labelaction.addEventListener("change", () => container[option.name] = labelaction.checked);
                label.insertBefore(labelaction, labeltitle);
                hintExtension.textContent = "(Standard: " + (option.default ? "an" : "aus") + ")";
                break;
            case "number":
                var labelcontent = document.createElement("input");
                labelcontent.classList.add("labelcontent");
                labelcontent.name = option.name;
                labelcontent.type = "number";
                labelcontent.min = option.min.toString();
                container[option.name] = labelcontent.value = option.value.toString();
                labelcontent.max = option.max.toString();
                labelcontent.addEventListener("change", () => container[option.name] = parseInt(labelcontent.value));
                label.insertBefore(labelcontent, labelhint);
                hintExtension.textContent = "(Minimum: " + option.min + "; Standard: " + option.default + "; Maximum: " + option.max + ")";
                break;
            case "text":
                var labelcontent = document.createElement("input");
                labelcontent.classList.add("labelcontent");
                labelcontent.name = option.name;
                labelcontent.type = "text";
                container[option.name] = labelcontent.value = option.value.toString();
                labelcontent.addEventListener("change", () => container[option.name] = labelcontent.value);
                label.insertBefore(labelcontent, labelhint);
                break;
            default:
                var labelcontent = document.createElement("input");
                labelcontent.classList.add("labelcontent");
                labelcontent.name = option.name;
                container[option.name] = labelcontent.value = option.value.toString();
                labelcontent.addEventListener("change", () => container[option.name] = labelcontent.value);
                label.insertBefore(labelcontent, labelhint);
                break;
        }
        Options.optionsGrid.appendChild(label);
    }
    Options.buildOption = buildOption;
    function parseSearchString(search) {
        var $_REQUEST = {};
        search.replace(/^\?/, "").split("&").map(a => {
            return a.split("=").map(b => {
                return decodeURIComponent(b);
            });
        }).forEach(a => {
            if (a.length > 2) {
                a = [a.shift(), a.join("=")];
            }
            if (a.length > 1) {
                $_REQUEST[a[0]] = a[1];
            }
        });
        return $_REQUEST;
    }
    Options.parseSearchString = parseSearchString;
})(Options || (Options = {}));
//# sourceMappingURL=options.js.map