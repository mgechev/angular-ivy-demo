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
import { asyncFallback } from './async_fallback';
/**
 * Wraps a test function in an asynchronous test zone. The test will automatically
 * complete when all asynchronous calls within this zone are done. Can be used
 * to wrap an {\@link inject} call.
 *
 * Example:
 *
 * ```
 * it('...', async(inject([AClass], (object) => {
 *   object.doSomething.then(() => {
 *     expect(...);
 *   })
 * });
 * ```
 *
 * \@publicApi
 * @param {?} fn
 * @return {?}
 */
export function async(fn) {
    /** @type {?} */
    const _Zone = typeof Zone !== 'undefined' ? Zone : null;
    if (!_Zone) {
        return function () {
            return Promise.reject('Zone is needed for the async() test helper but could not be found. ' +
                'Please make sure that your environment includes zone.js/dist/zone.js');
        };
    }
    /** @type {?} */
    const asyncTest = _Zone && _Zone[_Zone.__symbol__('asyncTest')];
    if (typeof asyncTest === 'function') {
        return asyncTest(fn);
    }
    // not using new version of zone.js
    // TODO @JiaLiPassion, remove this after all library updated to
    // newest version of zone.js(0.8.25)
    return asyncFallback(fn);
}
//# sourceMappingURL=async.js.map