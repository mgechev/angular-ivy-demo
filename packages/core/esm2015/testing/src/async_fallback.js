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
const _global = /** @type {?} */ ((typeof window === 'undefined' ? global : window));
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
 *
 * @param {?} fn
 * @return {?}
 */
export function asyncFallback(fn) {
    // If we're running using the Jasmine test framework, adapt to call the 'done'
    // function when asynchronous activity is finished.
    if (_global.jasmine) {
        // Not using an arrow function to preserve context passed from call site
        return function (done) {
            if (!done) {
                // if we run beforeEach in @angular/core/testing/testing_internal then we get no done
                // fake it here and assume sync.
                done = function () { };
                done.fail = function (e) { throw e; };
            }
            runInTestZone(fn, this, done, (err) => {
                if (typeof err === 'string') {
                    return done.fail(new Error(/** @type {?} */ (err)));
                }
                else {
                    done.fail(err);
                }
            });
        };
    }
    // Otherwise, return a promise which will resolve when asynchronous activity
    // is finished. This will be correctly consumed by the Mocha framework with
    // it('...', async(myFn)); or can be used in a custom framework.
    // Not using an arrow function to preserve context passed from call site
    return function () {
        return new Promise((finishCallback, failCallback) => {
            runInTestZone(fn, this, finishCallback, failCallback);
        });
    };
}
/**
 * @param {?} fn
 * @param {?} context
 * @param {?} finishCallback
 * @param {?} failCallback
 * @return {?}
 */
function runInTestZone(fn, context, finishCallback, failCallback) {
    /** @type {?} */
    const currentZone = Zone.current;
    /** @type {?} */
    const AsyncTestZoneSpec = (/** @type {?} */ (Zone))['AsyncTestZoneSpec'];
    if (AsyncTestZoneSpec === undefined) {
        throw new Error('AsyncTestZoneSpec is needed for the async() test helper but could not be found. ' +
            'Please make sure that your environment includes zone.js/dist/async-test.js');
    }
    /** @type {?} */
    const ProxyZoneSpec = /** @type {?} */ ((/** @type {?} */ (Zone))['ProxyZoneSpec']);
    if (ProxyZoneSpec === undefined) {
        throw new Error('ProxyZoneSpec is needed for the async() test helper but could not be found. ' +
            'Please make sure that your environment includes zone.js/dist/proxy.js');
    }
    /** @type {?} */
    const proxyZoneSpec = ProxyZoneSpec.get();
    ProxyZoneSpec.assertPresent();
    /** @type {?} */
    const proxyZone = Zone.current.getZoneWith('ProxyZoneSpec');
    /** @type {?} */
    const previousDelegate = proxyZoneSpec.getDelegate();
    proxyZone.parent.run(() => {
        /** @type {?} */
        const testZoneSpec = new AsyncTestZoneSpec(() => {
            // Need to restore the original zone.
            currentZone.run(() => {
                if (proxyZoneSpec.getDelegate() == testZoneSpec) {
                    // Only reset the zone spec if it's sill this one. Otherwise, assume it's OK.
                    proxyZoneSpec.setDelegate(previousDelegate);
                }
                finishCallback();
            });
        }, (error) => {
            // Need to restore the original zone.
            currentZone.run(() => {
                if (proxyZoneSpec.getDelegate() == testZoneSpec) {
                    // Only reset the zone spec if it's sill this one. Otherwise, assume it's OK.
                    proxyZoneSpec.setDelegate(previousDelegate);
                }
                failCallback(error);
            });
        }, 'test');
        proxyZoneSpec.setDelegate(testZoneSpec);
    });
    return Zone.current.runGuarded(fn, context);
}
//# sourceMappingURL=async_fallback.js.map