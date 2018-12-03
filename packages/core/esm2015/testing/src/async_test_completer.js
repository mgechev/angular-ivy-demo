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
export class AsyncTestCompleter {
    constructor() {
        this._promise = new Promise((res, rej) => {
            this._resolve = res;
            this._reject = rej;
        });
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    done(value) { this._resolve(value); }
    /**
     * @param {?=} error
     * @param {?=} stackTrace
     * @return {?}
     */
    fail(error, stackTrace) { this._reject(error); }
    /**
     * @return {?}
     */
    get promise() { return this._promise; }
}
if (false) {
    /** @type {?} */
    AsyncTestCompleter.prototype._resolve;
    /** @type {?} */
    AsyncTestCompleter.prototype._reject;
    /** @type {?} */
    AsyncTestCompleter.prototype._promise;
}
//# sourceMappingURL=async_test_completer.js.map