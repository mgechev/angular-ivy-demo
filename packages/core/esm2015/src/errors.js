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
/** @type {?} */
export const ERROR_TYPE = 'ngType';
/** @type {?} */
export const ERROR_DEBUG_CONTEXT = 'ngDebugContext';
/** @type {?} */
export const ERROR_ORIGINAL_ERROR = 'ngOriginalError';
/** @type {?} */
export const ERROR_LOGGER = 'ngErrorLogger';
/**
 * @param {?} error
 * @return {?}
 */
export function getType(error) {
    return (/** @type {?} */ (error))[ERROR_TYPE];
}
/**
 * @param {?} error
 * @return {?}
 */
export function getDebugContext(error) {
    return (/** @type {?} */ (error))[ERROR_DEBUG_CONTEXT];
}
/**
 * @param {?} error
 * @return {?}
 */
export function getOriginalError(error) {
    return (/** @type {?} */ (error))[ERROR_ORIGINAL_ERROR];
}
/**
 * @param {?} error
 * @return {?}
 */
export function getErrorLogger(error) {
    return (/** @type {?} */ (error))[ERROR_LOGGER] || defaultErrorLogger;
}
/**
 * @param {?} console
 * @param {...?} values
 * @return {?}
 */
function defaultErrorLogger(console, ...values) {
    (/** @type {?} */ (console.error))(...values);
}
//# sourceMappingURL=errors.js.map