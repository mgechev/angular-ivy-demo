/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @enum {number} */
var RendererStyleFlags3 = {
    Important: 1,
    DashCase: 2,
};
export { RendererStyleFlags3 };
RendererStyleFlags3[RendererStyleFlags3.Important] = 'Important';
RendererStyleFlags3[RendererStyleFlags3.DashCase] = 'DashCase';
/** @typedef {?} */
var Renderer3;
export { Renderer3 };
/**
 * Object Oriented style of API needed to create elements and text nodes.
 *
 * This is the native browser API style, e.g. operations are methods on individual objects
 * like HTMLElement. With this style, no additional code is needed as a facade
 * (reducing payload size).
 *
 * @record
 */
export function ObjectOrientedRenderer3() { }
/** @type {?} */
ObjectOrientedRenderer3.prototype.createComment;
/** @type {?} */
ObjectOrientedRenderer3.prototype.createElement;
/** @type {?} */
ObjectOrientedRenderer3.prototype.createElementNS;
/** @type {?} */
ObjectOrientedRenderer3.prototype.createTextNode;
/** @type {?} */
ObjectOrientedRenderer3.prototype.querySelector;
/**
 * Returns whether the `renderer` is a `ProceduralRenderer3`
 * @param {?} renderer
 * @return {?}
 */
export function isProceduralRenderer(renderer) {
    return !!((/** @type {?} */ (renderer)).listen);
}
/**
 * Procedural style of API needed to create elements and text nodes.
 *
 * In non-native browser environments (e.g. platforms such as web-workers), this is the
 * facade that enables element manipulation. This also facilitates backwards compatibility
 * with Renderer2.
 * @record
 */
export function ProceduralRenderer3() { }
/** @type {?} */
ProceduralRenderer3.prototype.destroy;
/** @type {?} */
ProceduralRenderer3.prototype.createComment;
/** @type {?} */
ProceduralRenderer3.prototype.createElement;
/** @type {?} */
ProceduralRenderer3.prototype.createText;
/**
 * This property is allowed to be null / undefined,
 * in which case the view engine won't call it.
 * This is used as a performance optimization for production mode.
 * @type {?|undefined}
 */
ProceduralRenderer3.prototype.destroyNode;
/** @type {?} */
ProceduralRenderer3.prototype.appendChild;
/** @type {?} */
ProceduralRenderer3.prototype.insertBefore;
/** @type {?} */
ProceduralRenderer3.prototype.removeChild;
/** @type {?} */
ProceduralRenderer3.prototype.selectRootElement;
/** @type {?} */
ProceduralRenderer3.prototype.parentNode;
/** @type {?} */
ProceduralRenderer3.prototype.nextSibling;
/** @type {?} */
ProceduralRenderer3.prototype.setAttribute;
/** @type {?} */
ProceduralRenderer3.prototype.removeAttribute;
/** @type {?} */
ProceduralRenderer3.prototype.addClass;
/** @type {?} */
ProceduralRenderer3.prototype.removeClass;
/** @type {?} */
ProceduralRenderer3.prototype.setStyle;
/** @type {?} */
ProceduralRenderer3.prototype.removeStyle;
/** @type {?} */
ProceduralRenderer3.prototype.setProperty;
/** @type {?} */
ProceduralRenderer3.prototype.setValue;
/** @type {?} */
ProceduralRenderer3.prototype.listen;
/**
 * @record
 */
export function RendererFactory3() { }
/** @type {?} */
RendererFactory3.prototype.createRenderer;
/** @type {?|undefined} */
RendererFactory3.prototype.begin;
/** @type {?|undefined} */
RendererFactory3.prototype.end;
/** @type {?} */
export const domRendererFactory3 = {
    createRenderer: (hostElement, rendererType) => { return document; }
};
/**
 * Subset of API needed for appending elements and text nodes.
 * @record
 */
export function RNode() { }
/** @type {?} */
RNode.prototype.parentNode;
/** @type {?} */
RNode.prototype.nextSibling;
/** @type {?} */
RNode.prototype.removeChild;
/**
 * Insert a child node.
 *
 * Used exclusively for adding View root nodes into ViewAnchor location.
 * @type {?}
 */
RNode.prototype.insertBefore;
/**
 * Append a child node.
 *
 * Used exclusively for building up DOM which are static (ie not View roots)
 * @type {?}
 */
RNode.prototype.appendChild;
/**
 * Subset of API needed for writing attributes, properties, and setting up
 * listeners on Element.
 * @record
 */
export function RElement() { }
/** @type {?} */
RElement.prototype.style;
/** @type {?} */
RElement.prototype.classList;
/** @type {?} */
RElement.prototype.className;
/** @type {?} */
RElement.prototype.setAttribute;
/** @type {?} */
RElement.prototype.removeAttribute;
/** @type {?} */
RElement.prototype.setAttributeNS;
/** @type {?} */
RElement.prototype.addEventListener;
/** @type {?} */
RElement.prototype.removeEventListener;
/** @type {?|undefined} */
RElement.prototype.setProperty;
/**
 * @record
 */
export function RCssStyleDeclaration() { }
/** @type {?} */
RCssStyleDeclaration.prototype.removeProperty;
/** @type {?} */
RCssStyleDeclaration.prototype.setProperty;
/**
 * @record
 */
export function RDomTokenList() { }
/** @type {?} */
RDomTokenList.prototype.add;
/** @type {?} */
RDomTokenList.prototype.remove;
/**
 * @record
 */
export function RText() { }
/** @type {?} */
RText.prototype.textContent;
/**
 * @record
 */
export function RComment() { }
/** @type {?} */
export const unusedValueExportToPlacateAjd = 1;
//# sourceMappingURL=renderer.js.map