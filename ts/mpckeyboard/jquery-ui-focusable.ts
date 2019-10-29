// @ts-nocheck
declare var define;
interface JQueryStatic { attr: any; ui: any; }
declare namespace JQueryUI { interface UI { focusable: any; } }
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
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($: JQueryStatic) {
	$.ui = $.ui || <any>{};
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
	$.ui.focusable = function (element: Element, hasTabindex: boolean) {
		var map: HTMLMapElement, mapName: string, img: JQuery<HTMLImageElement>, focusableIfVisible, fieldset,
			nodeName = element.nodeName.toLowerCase();
		if ("area" === nodeName) {
			map = <HTMLMapElement>element.parentNode;
			mapName = map.name;
			if (!(<HTMLAnchorElement>element).href || !mapName || map.nodeName.toLowerCase() !== "map") {
				return false;
			}
			img = $("img[usemap='#" + mapName + "']");
			return img.length > 0 && img.is(":visible");
		}
		if (/^(input|select|textarea|button|object)$/i.test(nodeName)) {
			focusableIfVisible = !(<HTMLInputElement>element).disabled;
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
		} else if ("iframe" == nodeName) {
			focusableIfVisible = true;
		} else if ("details" == nodeName && $(element).children("summary").length == 0) {
			focusableIfVisible = true;
		} else if ("summary" == nodeName) {
			focusableIfVisible = true;
		} else if ("a" === nodeName) {
			focusableIfVisible = (<HTMLAnchorElement>element).href || hasTabindex;
			// Start of: Modified by MPDieckmann
		} else if ((<HTMLElement>element).contentEditable == "true") {
			focusableIfVisible = !element.parentElement.isContentEditable;
			// End of: Modified by MPDieckmann
		} else {
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
		focusable: function (element: Element) {
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
		tabbable: function (element: Element) {
			var tabIndex = $.attr(element, "tabindex"),
				hasTabindex = tabIndex != null;
			return (!hasTabindex || tabIndex >= 0) && $.ui.focusable(element, hasTabindex);
		}
	});
}));