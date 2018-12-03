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
import { bindingUpdated, bindingUpdated2, bindingUpdated3, bindingUpdated4, getBinding, updateBinding } from './bindings';
import { getBindingRoot, getCreationMode, getLView } from './state';
/**
 * If the value hasn't been saved, calls the pure function to store and return the
 * value. If it has been saved, returns the saved value.
 *
 * @template T
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn Function that returns a value
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} value
 */
export function pureFunction0(slotOffset, pureFn, thisArg) {
    /** @type {?} */
    const bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    const lView = getLView();
    return getCreationMode() ?
        updateBinding(lView, bindingIndex, thisArg ? pureFn.call(thisArg) : pureFn()) :
        getBinding(lView, bindingIndex);
}
/**
 * If the value of the provided exp has changed, calls the pure function to return
 * an updated value. Or if the value has not changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn Function that returns an updated value
 * @param {?} exp Updated expression value
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction1(slotOffset, pureFn, exp, thisArg) {
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const bindingIndex = getBindingRoot() + slotOffset;
    return bindingUpdated(lView, bindingIndex, exp) ?
        updateBinding(lView, bindingIndex + 1, thisArg ? pureFn.call(thisArg, exp) : pureFn(exp)) :
        getBinding(lView, bindingIndex + 1);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction2(slotOffset, pureFn, exp1, exp2, thisArg) {
    /** @type {?} */
    const bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    const lView = getLView();
    return bindingUpdated2(lView, bindingIndex, exp1, exp2) ?
        updateBinding(lView, bindingIndex + 2, thisArg ? pureFn.call(thisArg, exp1, exp2) : pureFn(exp1, exp2)) :
        getBinding(lView, bindingIndex + 2);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction3(slotOffset, pureFn, exp1, exp2, exp3, thisArg) {
    /** @type {?} */
    const bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    const lView = getLView();
    return bindingUpdated3(lView, bindingIndex, exp1, exp2, exp3) ?
        updateBinding(lView, bindingIndex + 3, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3) : pureFn(exp1, exp2, exp3)) :
        getBinding(lView, bindingIndex + 3);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction4(slotOffset, pureFn, exp1, exp2, exp3, exp4, thisArg) {
    /** @type {?} */
    const bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    const lView = getLView();
    return bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4) ?
        updateBinding(lView, bindingIndex + 4, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4) : pureFn(exp1, exp2, exp3, exp4)) :
        getBinding(lView, bindingIndex + 4);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?} exp5
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction5(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, thisArg) {
    /** @type {?} */
    const bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const different = bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4);
    return bindingUpdated(lView, bindingIndex + 4, exp5) || different ?
        updateBinding(lView, bindingIndex + 5, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5) :
            pureFn(exp1, exp2, exp3, exp4, exp5)) :
        getBinding(lView, bindingIndex + 5);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?} exp5
 * @param {?} exp6
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction6(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, thisArg) {
    /** @type {?} */
    const bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const different = bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4);
    return bindingUpdated2(lView, bindingIndex + 4, exp5, exp6) || different ?
        updateBinding(lView, bindingIndex + 6, thisArg ?
            pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6) :
            pureFn(exp1, exp2, exp3, exp4, exp5, exp6)) :
        getBinding(lView, bindingIndex + 6);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?} exp5
 * @param {?} exp6
 * @param {?} exp7
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction7(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, exp7, thisArg) {
    /** @type {?} */
    const bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    let different = bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4);
    return bindingUpdated3(lView, bindingIndex + 4, exp5, exp6, exp7) || different ?
        updateBinding(lView, bindingIndex + 7, thisArg ?
            pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6, exp7) :
            pureFn(exp1, exp2, exp3, exp4, exp5, exp6, exp7)) :
        getBinding(lView, bindingIndex + 7);
}
/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn
 * @param {?} exp1
 * @param {?} exp2
 * @param {?} exp3
 * @param {?} exp4
 * @param {?} exp5
 * @param {?} exp6
 * @param {?} exp7
 * @param {?} exp8
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunction8(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8, thisArg) {
    /** @type {?} */
    const bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const different = bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4);
    return bindingUpdated4(lView, bindingIndex + 4, exp5, exp6, exp7, exp8) || different ?
        updateBinding(lView, bindingIndex + 8, thisArg ?
            pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8) :
            pureFn(exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8)) :
        getBinding(lView, bindingIndex + 8);
}
/**
 * pureFunction instruction that can support any number of bindings.
 *
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param {?} slotOffset the offset from binding root to the reserved slot
 * @param {?} pureFn A pure function that takes binding values and builds an object or array
 * containing those values.
 * @param {?} exps An array of binding values
 * @param {?=} thisArg Optional calling context of pureFn
 * @return {?} Updated or cached value
 */
export function pureFunctionV(slotOffset, pureFn, exps, thisArg) {
    /** @type {?} */
    let bindingIndex = getBindingRoot() + slotOffset;
    /** @type {?} */
    let different = false;
    /** @type {?} */
    const lView = getLView();
    for (let i = 0; i < exps.length; i++) {
        bindingUpdated(lView, bindingIndex++, exps[i]) && (different = true);
    }
    return different ? updateBinding(lView, bindingIndex, pureFn.apply(thisArg, exps)) :
        getBinding(lView, bindingIndex);
}
//# sourceMappingURL=pure_function.js.map