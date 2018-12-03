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
import { Services } from './types';
import { declaredViewContainer, renderNode, visitRootRenderNodes } from './util';
/**
 * @param {?} parentView
 * @param {?} elementData
 * @param {?} viewIndex
 * @param {?} view
 * @return {?}
 */
export function attachEmbeddedView(parentView, elementData, viewIndex, view) {
    /** @type {?} */
    let embeddedViews = /** @type {?} */ ((elementData.viewContainer))._embeddedViews;
    if (viewIndex === null || viewIndex === undefined) {
        viewIndex = embeddedViews.length;
    }
    view.viewContainerParent = parentView;
    addToArray(embeddedViews, /** @type {?} */ ((viewIndex)), view);
    attachProjectedView(elementData, view);
    Services.dirtyParentQueries(view);
    /** @type {?} */
    const prevView = /** @type {?} */ ((viewIndex)) > 0 ? embeddedViews[/** @type {?} */ ((viewIndex)) - 1] : null;
    renderAttachEmbeddedView(elementData, prevView, view);
}
/**
 * @param {?} vcElementData
 * @param {?} view
 * @return {?}
 */
function attachProjectedView(vcElementData, view) {
    /** @type {?} */
    const dvcElementData = declaredViewContainer(view);
    if (!dvcElementData || dvcElementData === vcElementData ||
        view.state & 16 /* IsProjectedView */) {
        return;
    }
    // Note: For performance reasons, we
    // - add a view to template._projectedViews only 1x throughout its lifetime,
    //   and remove it not until the view is destroyed.
    //   (hard, as when a parent view is attached/detached we would need to attach/detach all
    //    nested projected views as well, even across component boundaries).
    // - don't track the insertion order of views in the projected views array
    //   (hard, as when the views of the same template are inserted different view containers)
    view.state |= 16 /* IsProjectedView */;
    /** @type {?} */
    let projectedViews = dvcElementData.template._projectedViews;
    if (!projectedViews) {
        projectedViews = dvcElementData.template._projectedViews = [];
    }
    projectedViews.push(view);
    // Note: we are changing the NodeDef here as we cannot calculate
    // the fact whether a template is used for projection during compilation.
    markNodeAsProjectedTemplate(/** @type {?} */ ((view.parent)).def, /** @type {?} */ ((view.parentNodeDef)));
}
/**
 * @param {?} viewDef
 * @param {?} nodeDef
 * @return {?}
 */
function markNodeAsProjectedTemplate(viewDef, nodeDef) {
    if (nodeDef.flags & 4 /* ProjectedTemplate */) {
        return;
    }
    viewDef.nodeFlags |= 4 /* ProjectedTemplate */;
    nodeDef.flags |= 4 /* ProjectedTemplate */;
    /** @type {?} */
    let parentNodeDef = nodeDef.parent;
    while (parentNodeDef) {
        parentNodeDef.childFlags |= 4 /* ProjectedTemplate */;
        parentNodeDef = parentNodeDef.parent;
    }
}
/**
 * @param {?} elementData
 * @param {?=} viewIndex
 * @return {?}
 */
export function detachEmbeddedView(elementData, viewIndex) {
    /** @type {?} */
    const embeddedViews = /** @type {?} */ ((elementData.viewContainer))._embeddedViews;
    if (viewIndex == null || viewIndex >= embeddedViews.length) {
        viewIndex = embeddedViews.length - 1;
    }
    if (viewIndex < 0) {
        return null;
    }
    /** @type {?} */
    const view = embeddedViews[viewIndex];
    view.viewContainerParent = null;
    removeFromArray(embeddedViews, viewIndex);
    // See attachProjectedView for why we don't update projectedViews here.
    Services.dirtyParentQueries(view);
    renderDetachView(view);
    return view;
}
/**
 * @param {?} view
 * @return {?}
 */
export function detachProjectedView(view) {
    if (!(view.state & 16 /* IsProjectedView */)) {
        return;
    }
    /** @type {?} */
    const dvcElementData = declaredViewContainer(view);
    if (dvcElementData) {
        /** @type {?} */
        const projectedViews = dvcElementData.template._projectedViews;
        if (projectedViews) {
            removeFromArray(projectedViews, projectedViews.indexOf(view));
            Services.dirtyParentQueries(view);
        }
    }
}
/**
 * @param {?} elementData
 * @param {?} oldViewIndex
 * @param {?} newViewIndex
 * @return {?}
 */
export function moveEmbeddedView(elementData, oldViewIndex, newViewIndex) {
    /** @type {?} */
    const embeddedViews = /** @type {?} */ ((elementData.viewContainer))._embeddedViews;
    /** @type {?} */
    const view = embeddedViews[oldViewIndex];
    removeFromArray(embeddedViews, oldViewIndex);
    if (newViewIndex == null) {
        newViewIndex = embeddedViews.length;
    }
    addToArray(embeddedViews, newViewIndex, view);
    // Note: Don't need to change projectedViews as the order in there
    // as always invalid...
    Services.dirtyParentQueries(view);
    renderDetachView(view);
    /** @type {?} */
    const prevView = newViewIndex > 0 ? embeddedViews[newViewIndex - 1] : null;
    renderAttachEmbeddedView(elementData, prevView, view);
    return view;
}
/**
 * @param {?} elementData
 * @param {?} prevView
 * @param {?} view
 * @return {?}
 */
function renderAttachEmbeddedView(elementData, prevView, view) {
    /** @type {?} */
    const prevRenderNode = prevView ? renderNode(prevView, /** @type {?} */ ((prevView.def.lastRenderRootNode))) :
        elementData.renderElement;
    /** @type {?} */
    const parentNode = view.renderer.parentNode(prevRenderNode);
    /** @type {?} */
    const nextSibling = view.renderer.nextSibling(prevRenderNode);
    // Note: We can't check if `nextSibling` is present, as on WebWorkers it will always be!
    // However, browsers automatically do `appendChild` when there is no `nextSibling`.
    visitRootRenderNodes(view, 2 /* InsertBefore */, parentNode, nextSibling, undefined);
}
/**
 * @param {?} view
 * @return {?}
 */
export function renderDetachView(view) {
    visitRootRenderNodes(view, 3 /* RemoveChild */, null, null, undefined);
}
/**
 * @param {?} arr
 * @param {?} index
 * @param {?} value
 * @return {?}
 */
function addToArray(arr, index, value) {
    // perf: array.push is faster than array.splice!
    if (index >= arr.length) {
        arr.push(value);
    }
    else {
        arr.splice(index, 0, value);
    }
}
/**
 * @param {?} arr
 * @param {?} index
 * @return {?}
 */
function removeFromArray(arr, index) {
    // perf: array.pop is faster than array.splice!
    if (index >= arr.length - 1) {
        arr.pop();
    }
    else {
        arr.splice(index, 1);
    }
}
//# sourceMappingURL=view_attach.js.map