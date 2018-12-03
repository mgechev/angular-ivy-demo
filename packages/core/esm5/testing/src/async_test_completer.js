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
/**
 * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
 */
var /**
 * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
 */
AsyncTestCompleter = /** @class */ (function () {
    function AsyncTestCompleter() {
        var _this = this;
        this._promise = new Promise(function (res, rej) {
            _this._resolve = res;
            _this._reject = rej;
        });
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    AsyncTestCompleter.prototype.done = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) { this._resolve(value); };
    /**
     * @param {?=} error
     * @param {?=} stackTrace
     * @return {?}
     */
    AsyncTestCompleter.prototype.fail = /**
     * @param {?=} error
     * @param {?=} stackTrace
     * @return {?}
     */
    function (error, stackTrace) { this._reject(error); };
    Object.defineProperty(AsyncTestCompleter.prototype, "promise", {
        get: /**
         * @return {?}
         */
        function () { return this._promise; },
        enumerable: true,
        configurable: true
    });
    return AsyncTestCompleter;
}());
/**
 * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
 */
export { AsyncTestCompleter };
if (false) {
    /** @type {?} */
    AsyncTestCompleter.prototype._resolve;
    /** @type {?} */
    AsyncTestCompleter.prototype._reject;
    /** @type {?} */
    AsyncTestCompleter.prototype._promise;
}
//# sourceMappingURL=async_test_completer.js.map