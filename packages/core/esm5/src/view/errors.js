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
import { ERROR_DEBUG_CONTEXT, ERROR_LOGGER, getDebugContext } from '../errors';
/**
 * @param {?} context
 * @param {?} oldValue
 * @param {?} currValue
 * @param {?} isFirstCheck
 * @return {?}
 */
export function expressionChangedAfterItHasBeenCheckedError(context, oldValue, currValue, isFirstCheck) {
    /** @type {?} */
    var msg = "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '" + oldValue + "'. Current value: '" + currValue + "'.";
    if (isFirstCheck) {
        msg +=
            " It seems like the view has been created after its parent and its children have been dirty checked." +
                " Has it been created in a change detection hook ?";
    }
    return viewDebugError(msg, context);
}
/**
 * @param {?} err
 * @param {?} context
 * @return {?}
 */
export function viewWrappedDebugError(err, context) {
    if (!(err instanceof Error)) {
        // errors that are not Error instances don't have a stack,
        // so it is ok to wrap them into a new Error object...
        err = new Error(err.toString());
    }
    _addDebugContext(err, context);
    return err;
}
/**
 * @param {?} msg
 * @param {?} context
 * @return {?}
 */
export function viewDebugError(msg, context) {
    /** @type {?} */
    var err = new Error(msg);
    _addDebugContext(err, context);
    return err;
}
/**
 * @param {?} err
 * @param {?} context
 * @return {?}
 */
function _addDebugContext(err, context) {
    (/** @type {?} */ (err))[ERROR_DEBUG_CONTEXT] = context;
    (/** @type {?} */ (err))[ERROR_LOGGER] = context.logError.bind(context);
}
/**
 * @param {?} err
 * @return {?}
 */
export function isViewDebugError(err) {
    return !!getDebugContext(err);
}
/**
 * @param {?} action
 * @return {?}
 */
export function viewDestroyedError(action) {
    return new Error("ViewDestroyedError: Attempt to use a destroyed view: " + action);
}
//# sourceMappingURL=errors.js.map