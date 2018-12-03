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
import { global } from '../util';
/**
 * A scope function for the Web Tracing Framework (WTF).
 *
 * \@publicApi
 * @record
 */
export function WtfScopeFn() { }
/**
 * @record
 */
function WTF() { }
/** @type {?} */
WTF.prototype.trace;
/**
 * @record
 */
function Trace() { }
/** @type {?} */
Trace.prototype.events;
/** @type {?} */
Trace.prototype.leaveScope;
/** @type {?} */
Trace.prototype.beginTimeRange;
/** @type {?} */
Trace.prototype.endTimeRange;
/**
 * @record
 */
export function Range() { }
/**
 * @record
 */
function Events() { }
/** @type {?} */
Events.prototype.createScope;
/**
 * @record
 */
export function Scope() { }
/** @type {?} */
var trace;
/** @type {?} */
var events;
/**
 * @return {?}
 */
export function detectWTF() {
    /** @type {?} */
    var wtf = (/** @type {?} */ (global /** TODO #9100 */) /** TODO #9100 */)['wtf'];
    if (wtf) {
        trace = wtf['trace'];
        if (trace) {
            events = trace['events'];
            return true;
        }
    }
    return false;
}
/**
 * @param {?} signature
 * @param {?=} flags
 * @return {?}
 */
export function createScope(signature, flags) {
    if (flags === void 0) { flags = null; }
    return events.createScope(signature, flags);
}
/**
 * @template T
 * @param {?} scope
 * @param {?=} returnValue
 * @return {?}
 */
export function leave(scope, returnValue) {
    trace.leaveScope(scope, returnValue);
    return returnValue;
}
/**
 * @param {?} rangeType
 * @param {?} action
 * @return {?}
 */
export function startTimeRange(rangeType, action) {
    return trace.beginTimeRange(rangeType, action);
}
/**
 * @param {?} range
 * @return {?}
 */
export function endTimeRange(range) {
    trace.endTimeRange(range);
}
//# sourceMappingURL=wtf_impl.js.map