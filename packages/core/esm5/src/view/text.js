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
import { asTextData } from './types';
import { checkAndUpdateBinding, getParentRenderElement } from './util';
/**
 * @param {?} checkIndex
 * @param {?} ngContentIndex
 * @param {?} staticText
 * @return {?}
 */
export function textDef(checkIndex, ngContentIndex, staticText) {
    /** @type {?} */
    var bindings = new Array(staticText.length - 1);
    for (var i = 1; i < staticText.length; i++) {
        bindings[i - 1] = {
            flags: 8 /* TypeProperty */,
            name: null,
            ns: null,
            nonMinifiedName: null,
            securityContext: null,
            suffix: staticText[i],
        };
    }
    return {
        // will bet set by the view definition
        nodeIndex: -1,
        parent: null,
        renderParent: null,
        bindingIndex: -1,
        outputIndex: -1,
        // regular values
        checkIndex: checkIndex,
        flags: 2 /* TypeText */,
        childFlags: 0,
        directChildFlags: 0,
        childMatchedQueries: 0,
        matchedQueries: {},
        matchedQueryIds: 0,
        references: {}, ngContentIndex: ngContentIndex,
        childCount: 0, bindings: bindings,
        bindingFlags: 8 /* TypeProperty */,
        outputs: [],
        element: null,
        provider: null,
        text: { prefix: staticText[0] },
        query: null,
        ngContent: null,
    };
}
/**
 * @param {?} view
 * @param {?} renderHost
 * @param {?} def
 * @return {?}
 */
export function createText(view, renderHost, def) {
    /** @type {?} */
    var renderNode;
    /** @type {?} */
    var renderer = view.renderer;
    renderNode = renderer.createText(/** @type {?} */ ((def.text)).prefix);
    /** @type {?} */
    var parentEl = getParentRenderElement(view, renderHost, def);
    if (parentEl) {
        renderer.appendChild(parentEl, renderNode);
    }
    return { renderText: renderNode };
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} v0
 * @param {?} v1
 * @param {?} v2
 * @param {?} v3
 * @param {?} v4
 * @param {?} v5
 * @param {?} v6
 * @param {?} v7
 * @param {?} v8
 * @param {?} v9
 * @return {?}
 */
export function checkAndUpdateTextInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    /** @type {?} */
    var changed = false;
    /** @type {?} */
    var bindings = def.bindings;
    /** @type {?} */
    var bindLen = bindings.length;
    if (bindLen > 0 && checkAndUpdateBinding(view, def, 0, v0))
        changed = true;
    if (bindLen > 1 && checkAndUpdateBinding(view, def, 1, v1))
        changed = true;
    if (bindLen > 2 && checkAndUpdateBinding(view, def, 2, v2))
        changed = true;
    if (bindLen > 3 && checkAndUpdateBinding(view, def, 3, v3))
        changed = true;
    if (bindLen > 4 && checkAndUpdateBinding(view, def, 4, v4))
        changed = true;
    if (bindLen > 5 && checkAndUpdateBinding(view, def, 5, v5))
        changed = true;
    if (bindLen > 6 && checkAndUpdateBinding(view, def, 6, v6))
        changed = true;
    if (bindLen > 7 && checkAndUpdateBinding(view, def, 7, v7))
        changed = true;
    if (bindLen > 8 && checkAndUpdateBinding(view, def, 8, v8))
        changed = true;
    if (bindLen > 9 && checkAndUpdateBinding(view, def, 9, v9))
        changed = true;
    if (changed) {
        /** @type {?} */
        var value = /** @type {?} */ ((def.text)).prefix;
        if (bindLen > 0)
            value += _addInterpolationPart(v0, bindings[0]);
        if (bindLen > 1)
            value += _addInterpolationPart(v1, bindings[1]);
        if (bindLen > 2)
            value += _addInterpolationPart(v2, bindings[2]);
        if (bindLen > 3)
            value += _addInterpolationPart(v3, bindings[3]);
        if (bindLen > 4)
            value += _addInterpolationPart(v4, bindings[4]);
        if (bindLen > 5)
            value += _addInterpolationPart(v5, bindings[5]);
        if (bindLen > 6)
            value += _addInterpolationPart(v6, bindings[6]);
        if (bindLen > 7)
            value += _addInterpolationPart(v7, bindings[7]);
        if (bindLen > 8)
            value += _addInterpolationPart(v8, bindings[8]);
        if (bindLen > 9)
            value += _addInterpolationPart(v9, bindings[9]);
        /** @type {?} */
        var renderNode = asTextData(view, def.nodeIndex).renderText;
        view.renderer.setValue(renderNode, value);
    }
    return changed;
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} values
 * @return {?}
 */
export function checkAndUpdateTextDynamic(view, def, values) {
    /** @type {?} */
    var bindings = def.bindings;
    /** @type {?} */
    var changed = false;
    for (var i = 0; i < values.length; i++) {
        // Note: We need to loop over all values, so that
        // the old values are updates as well!
        if (checkAndUpdateBinding(view, def, i, values[i])) {
            changed = true;
        }
    }
    if (changed) {
        /** @type {?} */
        var value = '';
        for (var i = 0; i < values.length; i++) {
            value = value + _addInterpolationPart(values[i], bindings[i]);
        }
        value = /** @type {?} */ ((def.text)).prefix + value;
        /** @type {?} */
        var renderNode = asTextData(view, def.nodeIndex).renderText;
        view.renderer.setValue(renderNode, value);
    }
    return changed;
}
/**
 * @param {?} value
 * @param {?} binding
 * @return {?}
 */
function _addInterpolationPart(value, binding) {
    /** @type {?} */
    var valueStr = value != null ? value.toString() : '';
    return valueStr + binding.suffix;
}
//# sourceMappingURL=text.js.map