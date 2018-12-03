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
 * Determine if the argument is shaped like a Promise
 * @param {?} obj
 * @return {?}
 */
export function isPromise(obj) {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return !!obj && typeof obj.then === 'function';
}
/**
 * Determine if the argument is an Observable
 * @param {?} obj
 * @return {?}
 */
export function isObservable(obj) {
    // TODO: use isObservable once we update pass rxjs 6.1
    // https://github.com/ReactiveX/rxjs/blob/master/CHANGELOG.md#610-2018-05-03
    return !!obj && typeof obj.subscribe === 'function';
}
//# sourceMappingURL=lang.js.map