/**
 * @license Angular v7.1.0-ee8310445
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define('@angular/core/testing', ['exports', '@angular/core'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.core = global.ng.core || {}, global.ng.core.testing = {}),global.ng.core));
}(this, (function (exports,_angular_core) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * @license Angular v7.1.0-ee8310445
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */
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
var _global = /** @type {?} */ ((typeof window === 'undefined' ? global : window));
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
function asyncFallback(fn) {
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
            runInTestZone(fn, this, done, function (err) {
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
        var _this = this;
        return new Promise(function (finishCallback, failCallback) {
            runInTestZone(fn, _this, finishCallback, failCallback);
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
    var currentZone = Zone.current;
    /** @type {?} */
    var AsyncTestZoneSpec = (/** @type {?} */ (Zone))['AsyncTestZoneSpec'];
    if (AsyncTestZoneSpec === undefined) {
        throw new Error('AsyncTestZoneSpec is needed for the async() test helper but could not be found. ' +
            'Please make sure that your environment includes zone.js/dist/async-test.js');
    }
    /** @type {?} */
    var ProxyZoneSpec = /** @type {?} */ ((/** @type {?} */ (Zone))['ProxyZoneSpec']);
    if (ProxyZoneSpec === undefined) {
        throw new Error('ProxyZoneSpec is needed for the async() test helper but could not be found. ' +
            'Please make sure that your environment includes zone.js/dist/proxy.js');
    }
    /** @type {?} */
    var proxyZoneSpec = ProxyZoneSpec.get();
    ProxyZoneSpec.assertPresent();
    /** @type {?} */
    var proxyZone = Zone.current.getZoneWith('ProxyZoneSpec');
    /** @type {?} */
    var previousDelegate = proxyZoneSpec.getDelegate();
    proxyZone.parent.run(function () {
        /** @type {?} */
        var testZoneSpec = new AsyncTestZoneSpec(function () {
            // Need to restore the original zone.
            currentZone.run(function () {
                if (proxyZoneSpec.getDelegate() == testZoneSpec) {
                    // Only reset the zone spec if it's sill this one. Otherwise, assume it's OK.
                    proxyZoneSpec.setDelegate(previousDelegate);
                }
                finishCallback();
            });
        }, function (error) {
            // Need to restore the original zone.
            currentZone.run(function () {
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
function async(fn) {
    /** @type {?} */
    var _Zone = typeof Zone !== 'undefined' ? Zone : null;
    if (!_Zone) {
        return function () {
            return Promise.reject('Zone is needed for the async() test helper but could not be found. ' +
                'Please make sure that your environment includes zone.js/dist/zone.js');
        };
    }
    /** @type {?} */
    var asyncTest = _Zone && _Zone[_Zone.__symbol__('asyncTest')];
    if (typeof asyncTest === 'function') {
        return asyncTest(fn);
    }
    // not using new version of zone.js
    // TODO @JiaLiPassion, remove this after all library updated to
    // newest version of zone.js(0.8.25)
    return asyncFallback(fn);
}

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
 * Fixture for debugging and testing a component.
 *
 * \@publicApi
 * @template T
 */
var ComponentFixture = /** @class */ (function () {
    function ComponentFixture(componentRef, ngZone, _autoDetect) {
        var _this = this;
        this.componentRef = componentRef;
        this.ngZone = ngZone;
        this._autoDetect = _autoDetect;
        this._isStable = true;
        this._isDestroyed = false;
        this._resolve = null;
        this._promise = null;
        this._onUnstableSubscription = null;
        this._onStableSubscription = null;
        this._onMicrotaskEmptySubscription = null;
        this._onErrorSubscription = null;
        this.changeDetectorRef = componentRef.changeDetectorRef;
        this.elementRef = componentRef.location;
        this.debugElement = /** @type {?} */ (_angular_core.getDebugNode(this.elementRef.nativeElement));
        this.componentInstance = componentRef.instance;
        this.nativeElement = this.elementRef.nativeElement;
        this.componentRef = componentRef;
        this.ngZone = ngZone;
        if (ngZone) {
            // Create subscriptions outside the NgZone so that the callbacks run oustide
            // of NgZone.
            ngZone.runOutsideAngular(function () {
                _this._onUnstableSubscription =
                    ngZone.onUnstable.subscribe({ next: function () { _this._isStable = false; } });
                _this._onMicrotaskEmptySubscription = ngZone.onMicrotaskEmpty.subscribe({
                    next: function () {
                        if (_this._autoDetect) {
                            // Do a change detection run with checkNoChanges set to true to check
                            // there are no changes on the second run.
                            _this.detectChanges(true);
                        }
                    }
                });
                _this._onStableSubscription = ngZone.onStable.subscribe({
                    next: function () {
                        _this._isStable = true;
                        // Check whether there is a pending whenStable() completer to resolve.
                        if (_this._promise !== null) {
                            // If so check whether there are no pending macrotasks before resolving.
                            // Do this check in the next tick so that ngZone gets a chance to update the state of
                            // pending macrotasks.
                            scheduleMicroTask(function () {
                                if (!ngZone.hasPendingMacrotasks) {
                                    if (_this._promise !== null) {
                                        /** @type {?} */ ((_this._resolve))(true);
                                        _this._resolve = null;
                                        _this._promise = null;
                                    }
                                }
                            });
                        }
                    }
                });
                _this._onErrorSubscription =
                    ngZone.onError.subscribe({ next: function (error) { throw error; } });
            });
        }
    }
    /**
     * @param {?} checkNoChanges
     * @return {?}
     */
    ComponentFixture.prototype._tick = /**
     * @param {?} checkNoChanges
     * @return {?}
     */
    function (checkNoChanges) {
        this.changeDetectorRef.detectChanges();
        if (checkNoChanges) {
            this.checkNoChanges();
        }
    };
    /**
     * Trigger a change detection cycle for the component.
     */
    /**
     * Trigger a change detection cycle for the component.
     * @param {?=} checkNoChanges
     * @return {?}
     */
    ComponentFixture.prototype.detectChanges = /**
     * Trigger a change detection cycle for the component.
     * @param {?=} checkNoChanges
     * @return {?}
     */
    function (checkNoChanges) {
        var _this = this;
        if (checkNoChanges === void 0) { checkNoChanges = true; }
        if (this.ngZone != null) {
            // Run the change detection inside the NgZone so that any async tasks as part of the change
            // detection are captured by the zone and can be waited for in isStable.
            this.ngZone.run(function () { _this._tick(checkNoChanges); });
        }
        else {
            // Running without zone. Just do the change detection.
            this._tick(checkNoChanges);
        }
    };
    /**
     * Do a change detection run to make sure there were no changes.
     */
    /**
     * Do a change detection run to make sure there were no changes.
     * @return {?}
     */
    ComponentFixture.prototype.checkNoChanges = /**
     * Do a change detection run to make sure there were no changes.
     * @return {?}
     */
    function () { this.changeDetectorRef.checkNoChanges(); };
    /**
     * Set whether the fixture should autodetect changes.
     *
     * Also runs detectChanges once so that any existing change is detected.
     */
    /**
     * Set whether the fixture should autodetect changes.
     *
     * Also runs detectChanges once so that any existing change is detected.
     * @param {?=} autoDetect
     * @return {?}
     */
    ComponentFixture.prototype.autoDetectChanges = /**
     * Set whether the fixture should autodetect changes.
     *
     * Also runs detectChanges once so that any existing change is detected.
     * @param {?=} autoDetect
     * @return {?}
     */
    function (autoDetect) {
        if (autoDetect === void 0) { autoDetect = true; }
        if (this.ngZone == null) {
            throw new Error('Cannot call autoDetectChanges when ComponentFixtureNoNgZone is set');
        }
        this._autoDetect = autoDetect;
        this.detectChanges();
    };
    /**
     * Return whether the fixture is currently stable or has async tasks that have not been completed
     * yet.
     */
    /**
     * Return whether the fixture is currently stable or has async tasks that have not been completed
     * yet.
     * @return {?}
     */
    ComponentFixture.prototype.isStable = /**
     * Return whether the fixture is currently stable or has async tasks that have not been completed
     * yet.
     * @return {?}
     */
    function () { return this._isStable && !/** @type {?} */ ((this.ngZone)).hasPendingMacrotasks; };
    /**
     * Get a promise that resolves when the fixture is stable.
     *
     * This can be used to resume testing after events have triggered asynchronous activity or
     * asynchronous change detection.
     */
    /**
     * Get a promise that resolves when the fixture is stable.
     *
     * This can be used to resume testing after events have triggered asynchronous activity or
     * asynchronous change detection.
     * @return {?}
     */
    ComponentFixture.prototype.whenStable = /**
     * Get a promise that resolves when the fixture is stable.
     *
     * This can be used to resume testing after events have triggered asynchronous activity or
     * asynchronous change detection.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isStable()) {
            return Promise.resolve(false);
        }
        else if (this._promise !== null) {
            return this._promise;
        }
        else {
            this._promise = new Promise(function (res) { _this._resolve = res; });
            return this._promise;
        }
    };
    /**
     * @return {?}
     */
    ComponentFixture.prototype._getRenderer = /**
     * @return {?}
     */
    function () {
        if (this._renderer === undefined) {
            this._renderer = this.componentRef.injector.get(_angular_core.RendererFactory2, null);
        }
        return /** @type {?} */ (this._renderer);
    };
    /**
      * Get a promise that resolves when the ui state is stable following animations.
      */
    /**
     * Get a promise that resolves when the ui state is stable following animations.
     * @return {?}
     */
    ComponentFixture.prototype.whenRenderingDone = /**
     * Get a promise that resolves when the ui state is stable following animations.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var renderer = this._getRenderer();
        if (renderer && renderer.whenRenderingDone) {
            return renderer.whenRenderingDone();
        }
        return this.whenStable();
    };
    /**
     * Trigger component destruction.
     */
    /**
     * Trigger component destruction.
     * @return {?}
     */
    ComponentFixture.prototype.destroy = /**
     * Trigger component destruction.
     * @return {?}
     */
    function () {
        if (!this._isDestroyed) {
            this.componentRef.destroy();
            if (this._onUnstableSubscription != null) {
                this._onUnstableSubscription.unsubscribe();
                this._onUnstableSubscription = null;
            }
            if (this._onStableSubscription != null) {
                this._onStableSubscription.unsubscribe();
                this._onStableSubscription = null;
            }
            if (this._onMicrotaskEmptySubscription != null) {
                this._onMicrotaskEmptySubscription.unsubscribe();
                this._onMicrotaskEmptySubscription = null;
            }
            if (this._onErrorSubscription != null) {
                this._onErrorSubscription.unsubscribe();
                this._onErrorSubscription = null;
            }
            this._isDestroyed = true;
        }
    };
    return ComponentFixture;
}());
/**
 * @param {?} fn
 * @return {?}
 */
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}

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
/** *
 * fakeAsync has been moved to zone.js
 * this file is for fallback in case old version of zone.js is used
  @type {?} */
var _Zone$1 = typeof Zone !== 'undefined' ? Zone : null;
/** @type {?} */
var FakeAsyncTestZoneSpec = _Zone$1 && _Zone$1['FakeAsyncTestZoneSpec'];
/** @type {?} */
var ProxyZoneSpec = _Zone$1 && _Zone$1['ProxyZoneSpec'];
/** @type {?} */
var _fakeAsyncTestZoneSpec = null;
/**
 * Clears out the shared fake async zone for a test.
 * To be called in a global `beforeEach`.
 *
 * \@publicApi
 * @return {?}
 */
function resetFakeAsyncZoneFallback() {
    _fakeAsyncTestZoneSpec = null;
    // in node.js testing we may not have ProxyZoneSpec in which case there is nothing to reset.
    ProxyZoneSpec && ProxyZoneSpec.assertPresent().resetDelegate();
}
/** @type {?} */
var _inFakeAsyncCall = false;
/**
 * Wraps a function to be executed in the fakeAsync zone:
 * - microtasks are manually executed by calling `flushMicrotasks()`,
 * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
 *
 * If there are any pending timers at the end of the function, an exception will be thrown.
 *
 * Can be used to wrap inject() calls.
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/testing/ts/fake_async.ts region='basic'}
 *
 * \@publicApi
 * @param {?} fn
 * @return {?} The function wrapped to be executed in the fakeAsync zone
 *
 */
function fakeAsyncFallback(fn) {
    // Not using an arrow function to preserve context passed from call site
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        /** @type {?} */
        var proxyZoneSpec = ProxyZoneSpec.assertPresent();
        if (_inFakeAsyncCall) {
            throw new Error('fakeAsync() calls can not be nested');
        }
        _inFakeAsyncCall = true;
        try {
            if (!_fakeAsyncTestZoneSpec) {
                if (proxyZoneSpec.getDelegate() instanceof FakeAsyncTestZoneSpec) {
                    throw new Error('fakeAsync() calls can not be nested');
                }
                _fakeAsyncTestZoneSpec = new FakeAsyncTestZoneSpec();
            }
            /** @type {?} */
            var res = void 0;
            /** @type {?} */
            var lastProxyZoneSpec = proxyZoneSpec.getDelegate();
            proxyZoneSpec.setDelegate(_fakeAsyncTestZoneSpec);
            try {
                res = fn.apply(this, args);
                flushMicrotasksFallback();
            }
            finally {
                proxyZoneSpec.setDelegate(lastProxyZoneSpec);
            }
            if (_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length > 0) {
                throw new Error(_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length + " " +
                    "periodic timer(s) still in the queue.");
            }
            if (_fakeAsyncTestZoneSpec.pendingTimers.length > 0) {
                throw new Error(_fakeAsyncTestZoneSpec.pendingTimers.length + " timer(s) still in the queue.");
            }
            return res;
        }
        finally {
            _inFakeAsyncCall = false;
            resetFakeAsyncZoneFallback();
        }
    };
}
/**
 * @return {?}
 */
function _getFakeAsyncZoneSpec() {
    if (_fakeAsyncTestZoneSpec == null) {
        throw new Error('The code should be running in the fakeAsync zone to call this function');
    }
    return _fakeAsyncTestZoneSpec;
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone.
 *
 * The microtasks queue is drained at the very start of this function and after any timer callback
 * has been executed.
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/testing/ts/fake_async.ts region='basic'}
 *
 * \@publicApi
 * @param {?=} millis
 * @return {?}
 */
function tickFallback(millis) {
    if (millis === void 0) { millis = 0; }
    _getFakeAsyncZoneSpec().tick(millis);
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone by
 * draining the macrotask queue until it is empty. The returned value is the milliseconds
 * of time that would have been elapsed.
 *
 * \@publicApi
 * @param {?=} maxTurns
 * @return {?} The simulated time elapsed, in millis.
 *
 */
function flushFallback(maxTurns) {
    return _getFakeAsyncZoneSpec().flush(maxTurns);
}
/**
 * Discard all remaining periodic tasks.
 *
 * \@publicApi
 * @return {?}
 */
function discardPeriodicTasksFallback() {
    /** @type {?} */
    var zoneSpec = _getFakeAsyncZoneSpec();
    zoneSpec.pendingPeriodicTimers.length = 0;
}
/**
 * Flush any pending microtasks.
 *
 * \@publicApi
 * @return {?}
 */
function flushMicrotasksFallback() {
    _getFakeAsyncZoneSpec().flushMicrotasks();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var _Zone = typeof Zone !== 'undefined' ? Zone : null;
/** @type {?} */
var fakeAsyncTestModule = _Zone && _Zone[_Zone.__symbol__('fakeAsyncTest')];
/**
 * Clears out the shared fake async zone for a test.
 * To be called in a global `beforeEach`.
 *
 * \@publicApi
 * @return {?}
 */
function resetFakeAsyncZone() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.resetFakeAsyncZone();
    }
    else {
        return resetFakeAsyncZoneFallback();
    }
}
/**
 * Wraps a function to be executed in the fakeAsync zone:
 * - microtasks are manually executed by calling `flushMicrotasks()`,
 * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
 *
 * If there are any pending timers at the end of the function, an exception will be thrown.
 *
 * Can be used to wrap inject() calls.
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/testing/ts/fake_async.ts region='basic'}
 *
 * \@publicApi
 * @param {?} fn
 * @return {?} The function wrapped to be executed in the fakeAsync zone
 *
 */
function fakeAsync(fn) {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.fakeAsync(fn);
    }
    else {
        return fakeAsyncFallback(fn);
    }
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone.
 *
 * The microtasks queue is drained at the very start of this function and after any timer callback
 * has been executed.
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/testing/ts/fake_async.ts region='basic'}
 *
 * \@publicApi
 * @param {?=} millis
 * @return {?}
 */
function tick(millis) {
    if (millis === void 0) { millis = 0; }
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.tick(millis);
    }
    else {
        return tickFallback(millis);
    }
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone by
 * draining the macrotask queue until it is empty. The returned value is the milliseconds
 * of time that would have been elapsed.
 *
 * \@publicApi
 * @param {?=} maxTurns
 * @return {?} The simulated time elapsed, in millis.
 *
 */
function flush(maxTurns) {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.flush(maxTurns);
    }
    else {
        return flushFallback(maxTurns);
    }
}
/**
 * Discard all remaining periodic tasks.
 *
 * \@publicApi
 * @return {?}
 */
function discardPeriodicTasks() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.discardPeriodicTasks();
    }
    else {
        discardPeriodicTasksFallback();
    }
}
/**
 * Flush any pending microtasks.
 *
 * \@publicApi
 * @return {?}
 */
function flushMicrotasks() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.flushMicrotasks();
    }
    else {
        return flushMicrotasksFallback();
    }
}

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
var AsyncTestCompleter = /** @class */ (function () {
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
var _nextReferenceId = 0;
var MetadataOverrider = /** @class */ (function () {
    function MetadataOverrider() {
        this._references = new Map();
    }
    /**
     * Creates a new instance for the given metadata class
     * based on an old instance and overrides.
     */
    /**
     * Creates a new instance for the given metadata class
     * based on an old instance and overrides.
     * @template C, T
     * @param {?} metadataClass
     * @param {?} oldMetadata
     * @param {?} override
     * @return {?}
     */
    MetadataOverrider.prototype.overrideMetadata = /**
     * Creates a new instance for the given metadata class
     * based on an old instance and overrides.
     * @template C, T
     * @param {?} metadataClass
     * @param {?} oldMetadata
     * @param {?} override
     * @return {?}
     */
    function (metadataClass, oldMetadata, override) {
        /** @type {?} */
        var props = {};
        if (oldMetadata) {
            _valueProps(oldMetadata).forEach(function (prop) { return props[prop] = (/** @type {?} */ (oldMetadata))[prop]; });
        }
        if (override.set) {
            if (override.remove || override.add) {
                throw new Error("Cannot set and add/remove " + _angular_core.ɵstringify(metadataClass) + " at the same time!");
            }
            setMetadata(props, override.set);
        }
        if (override.remove) {
            removeMetadata(props, override.remove, this._references);
        }
        if (override.add) {
            addMetadata(props, override.add);
        }
        return new metadataClass(/** @type {?} */ (props));
    };
    return MetadataOverrider;
}());
/**
 * @param {?} metadata
 * @param {?} remove
 * @param {?} references
 * @return {?}
 */
function removeMetadata(metadata, remove, references) {
    /** @type {?} */
    var removeObjects = new Set();
    var _loop_1 = function (prop) {
        /** @type {?} */
        var removeValue = remove[prop];
        if (removeValue instanceof Array) {
            removeValue.forEach(function (value) { removeObjects.add(_propHashKey(prop, value, references)); });
        }
        else {
            removeObjects.add(_propHashKey(prop, removeValue, references));
        }
    };
    for (var prop in remove) {
        _loop_1(prop);
    }
    var _loop_2 = function (prop) {
        /** @type {?} */
        var propValue = metadata[prop];
        if (propValue instanceof Array) {
            metadata[prop] = propValue.filter(function (value) { return !removeObjects.has(_propHashKey(prop, value, references)); });
        }
        else {
            if (removeObjects.has(_propHashKey(prop, propValue, references))) {
                metadata[prop] = undefined;
            }
        }
    };
    for (var prop in metadata) {
        _loop_2(prop);
    }
}
/**
 * @param {?} metadata
 * @param {?} add
 * @return {?}
 */
function addMetadata(metadata, add) {
    for (var prop in add) {
        /** @type {?} */
        var addValue = add[prop];
        /** @type {?} */
        var propValue = metadata[prop];
        if (propValue != null && propValue instanceof Array) {
            metadata[prop] = propValue.concat(addValue);
        }
        else {
            metadata[prop] = addValue;
        }
    }
}
/**
 * @param {?} metadata
 * @param {?} set
 * @return {?}
 */
function setMetadata(metadata, set) {
    for (var prop in set) {
        metadata[prop] = set[prop];
    }
}
/**
 * @param {?} propName
 * @param {?} propValue
 * @param {?} references
 * @return {?}
 */
function _propHashKey(propName, propValue, references) {
    /** @type {?} */
    var replacer = function (key, value) {
        if (typeof value === 'function') {
            value = _serializeReference(value, references);
        }
        return value;
    };
    return propName + ":" + JSON.stringify(propValue, replacer);
}
/**
 * @param {?} ref
 * @param {?} references
 * @return {?}
 */
function _serializeReference(ref, references) {
    /** @type {?} */
    var id = references.get(ref);
    if (!id) {
        id = "" + _angular_core.ɵstringify(ref) + _nextReferenceId++;
        references.set(ref, id);
    }
    return id;
}
/**
 * @param {?} obj
 * @return {?}
 */
function _valueProps(obj) {
    /** @type {?} */
    var props = [];
    // regular public props
    Object.keys(obj).forEach(function (prop) {
        if (!prop.startsWith('_')) {
            props.push(prop);
        }
    });
    /** @type {?} */
    var proto = obj;
    while (proto = Object.getPrototypeOf(proto)) {
        Object.keys(proto).forEach(function (protoProp) {
            /** @type {?} */
            var desc = Object.getOwnPropertyDescriptor(proto, protoProp);
            if (!protoProp.startsWith('_') && desc && 'get' in desc) {
                props.push(protoProp);
            }
        });
    }
    return props;
}

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
var reflection = new _angular_core.ɵReflectionCapabilities();
/**
 * Base interface to resolve `\@Component`, `\@Directive`, `\@Pipe` and `\@NgModule`.
 * @record
 * @template T
 */

/**
 * Allows to override ivy metadata for tests (via the `TestBed`).
 * @abstract
 * @template T
 */
var OverrideResolver = /** @class */ (function () {
    function OverrideResolver() {
        this.overrides = new Map();
        this.resolved = new Map();
    }
    /**
     * @param {?} overrides
     * @return {?}
     */
    OverrideResolver.prototype.setOverrides = /**
     * @param {?} overrides
     * @return {?}
     */
    function (overrides) {
        var _this = this;
        this.overrides.clear();
        overrides.forEach(function (_a) {
            var type = _a[0], override = _a[1];
            return _this.overrides.set(type, override);
        });
    };
    /**
     * @param {?} type
     * @return {?}
     */
    OverrideResolver.prototype.getAnnotation = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        var _this = this;
        return reflection.annotations(type).find(function (a) { return a instanceof _this.type; }) || null;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    OverrideResolver.prototype.resolve = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var resolved = this.resolved.get(type) || null;
        if (!resolved) {
            resolved = this.getAnnotation(type);
            if (resolved) {
                /** @type {?} */
                var override = this.overrides.get(type);
                if (override) {
                    /** @type {?} */
                    var overrider = new MetadataOverrider();
                    resolved = overrider.overrideMetadata(this.type, resolved, override);
                }
            }
            this.resolved.set(type, resolved);
        }
        return resolved;
    };
    return OverrideResolver;
}());
var DirectiveResolver = /** @class */ (function (_super) {
    __extends(DirectiveResolver, _super);
    function DirectiveResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DirectiveResolver.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () { return _angular_core.Directive; },
        enumerable: true,
        configurable: true
    });
    return DirectiveResolver;
}(OverrideResolver));
var ComponentResolver = /** @class */ (function (_super) {
    __extends(ComponentResolver, _super);
    function ComponentResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ComponentResolver.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () { return _angular_core.Component; },
        enumerable: true,
        configurable: true
    });
    return ComponentResolver;
}(OverrideResolver));
var PipeResolver = /** @class */ (function (_super) {
    __extends(PipeResolver, _super);
    function PipeResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PipeResolver.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () { return _angular_core.Pipe; },
        enumerable: true,
        configurable: true
    });
    return PipeResolver;
}(OverrideResolver));
var NgModuleResolver = /** @class */ (function (_super) {
    __extends(NgModuleResolver, _super);
    function NgModuleResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NgModuleResolver.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () { return _angular_core.NgModule; },
        enumerable: true,
        configurable: true
    });
    return NgModuleResolver;
}(OverrideResolver));

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
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * \@publicApi
 */
var TestComponentRenderer = /** @class */ (function () {
    function TestComponentRenderer() {
    }
    /**
     * @param {?} rootElementId
     * @return {?}
     */
    TestComponentRenderer.prototype.insertRootElement = /**
     * @param {?} rootElementId
     * @return {?}
     */
    function (rootElementId) { };
    return TestComponentRenderer;
}());
/** *
 * \@publicApi
  @type {?} */
var ComponentFixtureAutoDetect = new _angular_core.InjectionToken('ComponentFixtureAutoDetect');
/** *
 * \@publicApi
  @type {?} */
var ComponentFixtureNoNgZone = new _angular_core.InjectionToken('ComponentFixtureNoNgZone');
/**
 * Static methods implemented by the `TestBedViewEngine` and `TestBedRender3`
 *
 * \@publicApi
 * @record
 */

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
var _nextRootElementId$1 = 0;
/**
 * \@description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
var TestBedRender3 = /** @class */ (function () {
    function TestBedRender3() {
        // Properties
        this.platform = /** @type {?} */ ((null));
        this.ngModule = /** @type {?} */ ((null));
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._providerOverrides = [];
        this._rootProviderOverrides = [];
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
        this._activeFixtures = [];
        this._moduleRef = /** @type {?} */ ((null));
        this._instantiated = false;
    }
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     *
     * @publicApi
     */
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     *
     * \@publicApi
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    TestBedRender3.initTestEnvironment = /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     *
     * \@publicApi
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    function (ngModule, platform, aotSummaries) {
        /** @type {?} */
        var testBed = _getTestBedRender3();
        testBed.initTestEnvironment(ngModule, platform, aotSummaries);
        return testBed;
    };
    /**
     * Reset the providers for the test injector.
     *
     * @publicApi
     */
    /**
     * Reset the providers for the test injector.
     *
     * \@publicApi
     * @return {?}
     */
    TestBedRender3.resetTestEnvironment = /**
     * Reset the providers for the test injector.
     *
     * \@publicApi
     * @return {?}
     */
    function () { _getTestBedRender3().resetTestEnvironment(); };
    /**
     * @param {?} config
     * @return {?}
     */
    TestBedRender3.configureCompiler = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        _getTestBedRender3().configureCompiler(config);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     * @param {?} moduleDef
     * @return {?}
     */
    TestBedRender3.configureTestingModule = /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     * @param {?} moduleDef
     * @return {?}
     */
    function (moduleDef) {
        _getTestBedRender3().configureTestingModule(moduleDef);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     * @return {?}
     */
    TestBedRender3.compileComponents = /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     * @return {?}
     */
    function () { return _getTestBedRender3().compileComponents(); };
    /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.overrideModule = /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    function (ngModule, override) {
        _getTestBedRender3().overrideModule(ngModule, override);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.overrideComponent = /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    function (component, override) {
        _getTestBedRender3().overrideComponent(component, override);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.overrideDirective = /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    function (directive, override) {
        _getTestBedRender3().overrideDirective(directive, override);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.overridePipe = /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    function (pipe, override) {
        _getTestBedRender3().overridePipe(pipe, override);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    TestBedRender3.overrideTemplate = /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    function (component, template) {
        _getTestBedRender3().overrideComponent(component, { set: { template: template, templateUrl: /** @type {?} */ ((null)) } });
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    TestBedRender3.overrideTemplateUsingTestingModule = /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    function (component, template) {
        _getTestBedRender3().overrideTemplateUsingTestingModule(component, template);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    TestBedRender3.prototype.overrideTemplateUsingTestingModule = /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    function (component, template) {
        throw new Error('Render3TestBed.overrideTemplateUsingTestingModule is not implemented yet');
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedRender3.overrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        _getTestBedRender3().overrideProvider(token, provider);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedRender3.deprecatedOverrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        throw new Error('Render3TestBed.deprecatedOverrideProvider is not implemented');
    };
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    TestBedRender3.get = /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = _angular_core.Injector.THROW_IF_NOT_FOUND; }
        return _getTestBedRender3().get(token, notFoundValue);
    };
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    TestBedRender3.createComponent = /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) {
        return _getTestBedRender3().createComponent(component);
    };
    /**
     * @return {?}
     */
    TestBedRender3.resetTestingModule = /**
     * @return {?}
     */
    function () {
        _getTestBedRender3().resetTestingModule();
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     *
     * @publicApi
     */
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     *
     * \@publicApi
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    TestBedRender3.prototype.initTestEnvironment = /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     *
     * \@publicApi
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    function (ngModule, platform, aotSummaries) {
        if (this.platform || this.ngModule) {
            throw new Error('Cannot set base providers because it has already been called');
        }
        this.platform = platform;
        this.ngModule = ngModule;
    };
    /**
     * Reset the providers for the test injector.
     *
     * @publicApi
     */
    /**
     * Reset the providers for the test injector.
     *
     * \@publicApi
     * @return {?}
     */
    TestBedRender3.prototype.resetTestEnvironment = /**
     * Reset the providers for the test injector.
     *
     * \@publicApi
     * @return {?}
     */
    function () {
        this.resetTestingModule();
        this.platform = /** @type {?} */ ((null));
        this.ngModule = /** @type {?} */ ((null));
    };
    /**
     * @return {?}
     */
    TestBedRender3.prototype.resetTestingModule = /**
     * @return {?}
     */
    function () {
        // reset metadata overrides
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._providerOverrides = [];
        this._rootProviderOverrides = [];
        // reset test module config
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
        this._moduleRef = /** @type {?} */ ((null));
        this._instantiated = false;
        this._activeFixtures.forEach(function (fixture) {
            try {
                fixture.destroy();
            }
            catch (e) {
                console.error('Error during cleanup of component', {
                    component: fixture.componentInstance,
                    stacktrace: e,
                });
            }
        });
        this._activeFixtures = [];
    };
    /**
     * @param {?} config
     * @return {?}
     */
    TestBedRender3.prototype.configureCompiler = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _a;
        if (config.useJit != null) {
            throw new Error('the Render3 compiler JiT mode is not configurable !');
        }
        if (config.providers) {
            (_a = this._providerOverrides).push.apply(_a, config.providers);
        }
    };
    /**
     * @param {?} moduleDef
     * @return {?}
     */
    TestBedRender3.prototype.configureTestingModule = /**
     * @param {?} moduleDef
     * @return {?}
     */
    function (moduleDef) {
        var _a, _b, _c, _d;
        this._assertNotInstantiated('R3TestBed.configureTestingModule', 'configure the test module');
        if (moduleDef.providers) {
            (_a = this._providers).push.apply(_a, moduleDef.providers);
        }
        if (moduleDef.declarations) {
            (_b = this._declarations).push.apply(_b, moduleDef.declarations);
        }
        if (moduleDef.imports) {
            (_c = this._imports).push.apply(_c, moduleDef.imports);
        }
        if (moduleDef.schemas) {
            (_d = this._schemas).push.apply(_d, moduleDef.schemas);
        }
    };
    /**
     * @return {?}
     */
    TestBedRender3.prototype.compileComponents = /**
     * @return {?}
     */
    function () {
        // assume for now that components don't use templateUrl / stylesUrl to unblock further testing
        // TODO(pk): plug into the ivy's resource fetching pipeline
        return Promise.resolve();
    };
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    TestBedRender3.prototype.get = /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = _angular_core.Injector.THROW_IF_NOT_FOUND; }
        this._initIfNeeded();
        if (token === TestBedRender3) {
            return this;
        }
        return this._moduleRef.injector.get(token, notFoundValue);
    };
    /**
     * @param {?} tokens
     * @param {?} fn
     * @param {?=} context
     * @return {?}
     */
    TestBedRender3.prototype.execute = /**
     * @param {?} tokens
     * @param {?} fn
     * @param {?=} context
     * @return {?}
     */
    function (tokens, fn, context) {
        var _this = this;
        this._initIfNeeded();
        /** @type {?} */
        var params = tokens.map(function (t) { return _this.get(t); });
        return fn.apply(context, params);
    };
    /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.prototype.overrideModule = /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    function (ngModule, override) {
        this._assertNotInstantiated('overrideModule', 'override module metadata');
        this._moduleOverrides.push([ngModule, override]);
    };
    /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.prototype.overrideComponent = /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    function (component, override) {
        this._assertNotInstantiated('overrideComponent', 'override component metadata');
        this._componentOverrides.push([component, override]);
    };
    /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.prototype.overrideDirective = /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    function (directive, override) {
        this._assertNotInstantiated('overrideDirective', 'override directive metadata');
        this._directiveOverrides.push([directive, override]);
    };
    /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.prototype.overridePipe = /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    function (pipe, override) {
        this._assertNotInstantiated('overridePipe', 'override pipe metadata');
        this._pipeOverrides.push([pipe, override]);
    };
    /**
     * Overwrites all providers for the given token with the given provider definition.
     */
    /**
     * Overwrites all providers for the given token with the given provider definition.
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedRender3.prototype.overrideProvider = /**
     * Overwrites all providers for the given token with the given provider definition.
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        /** @type {?} */
        var injectableDef;
        /** @type {?} */
        var isRoot = (typeof token !== 'string' && (injectableDef = _angular_core.ɵgetInjectableDef(token)) &&
            injectableDef.providedIn === 'root');
        /** @type {?} */
        var overrides = isRoot ? this._rootProviderOverrides : this._providerOverrides;
        if (provider.useFactory) {
            overrides.push({ provide: token, useFactory: provider.useFactory, deps: provider.deps || [] });
        }
        else {
            overrides.push({ provide: token, useValue: provider.useValue });
        }
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedRender3.prototype.deprecatedOverrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        throw new Error('No implemented in IVY');
    };
    /**
     * @template T
     * @param {?} type
     * @return {?}
     */
    TestBedRender3.prototype.createComponent = /**
     * @template T
     * @param {?} type
     * @return {?}
     */
    function (type) {
        var _this = this;
        this._initIfNeeded();
        /** @type {?} */
        var testComponentRenderer = this.get(TestComponentRenderer);
        /** @type {?} */
        var rootElId = "root" + _nextRootElementId$1++;
        testComponentRenderer.insertRootElement(rootElId);
        /** @nocollapse @type {?} */
        var componentDef = (/** @type {?} */ (type)).ngComponentDef;
        if (!componentDef) {
            throw new Error("It looks like '" + _angular_core.ɵstringify(type) + "' has not been IVY compiled - it has no 'ngComponentDef' field");
        }
        /** @type {?} */
        var noNgZone = this.get(ComponentFixtureNoNgZone, false);
        /** @type {?} */
        var autoDetect = this.get(ComponentFixtureAutoDetect, false);
        /** @type {?} */
        var ngZone = noNgZone ? null : this.get(_angular_core.NgZone, null);
        /** @type {?} */
        var componentFactory = new _angular_core.ɵRender3ComponentFactory(componentDef);
        /** @type {?} */
        var initComponent = function () {
            /** @type {?} */
            var componentRef = componentFactory.create(_angular_core.Injector.NULL, [], "#" + rootElId, _this._moduleRef);
            return new ComponentFixture(componentRef, ngZone, autoDetect);
        };
        /** @type {?} */
        var fixture = ngZone ? ngZone.run(initComponent) : initComponent();
        this._activeFixtures.push(fixture);
        return fixture;
    };
    /**
     * @return {?}
     */
    TestBedRender3.prototype._initIfNeeded = /**
     * @return {?}
     */
    function () {
        if (this._instantiated) {
            return;
        }
        /** @type {?} */
        var resolvers = this._getResolvers();
        /** @type {?} */
        var testModuleType = this._createTestModule();
        compileNgModule(testModuleType, resolvers);
        /** @type {?} */
        var parentInjector = this.platform.injector;
        this._moduleRef = new _angular_core.ɵRender3NgModuleRef(testModuleType, parentInjector);
        this._instantiated = true;
    };
    /**
     * @return {?}
     */
    TestBedRender3.prototype._getResolvers = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var module = new NgModuleResolver();
        module.setOverrides(this._moduleOverrides);
        /** @type {?} */
        var component = new ComponentResolver();
        component.setOverrides(this._componentOverrides);
        /** @type {?} */
        var directive = new DirectiveResolver();
        directive.setOverrides(this._directiveOverrides);
        /** @type {?} */
        var pipe = new PipeResolver();
        pipe.setOverrides(this._pipeOverrides);
        return { module: module, component: component, directive: directive, pipe: pipe };
    };
    /**
     * @param {?} methodName
     * @param {?} methodDescription
     * @return {?}
     */
    TestBedRender3.prototype._assertNotInstantiated = /**
     * @param {?} methodName
     * @param {?} methodDescription
     * @return {?}
     */
    function (methodName, methodDescription) {
        if (this._instantiated) {
            throw new Error("Cannot " + methodDescription + " when the test module has already been instantiated. " +
                ("Make sure you are not using `inject` before `" + methodName + "`."));
        }
    };
    /**
     * @return {?}
     */
    TestBedRender3.prototype._createTestModule = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var rootProviderOverrides = this._rootProviderOverrides;
        var RootScopeModule = /** @class */ (function () {
            function RootScopeModule() {
            }
            RootScopeModule.decorators = [
                { type: _angular_core.NgModule, args: [{
                            providers: rootProviderOverrides.slice(),
                            jit: true,
                        },] },
            ];
            return RootScopeModule;
        }());
        /** @type {?} */
        var ngZone = new _angular_core.NgZone({ enableLongStackTrace: true });
        /** @type {?} */
        var providers = [{ provide: _angular_core.NgZone, useValue: ngZone }].concat(this._providers, this._providerOverrides);
        /** @type {?} */
        var declarations = this._declarations;
        /** @type {?} */
        var imports = [RootScopeModule, this.ngModule, this._imports];
        /** @type {?} */
        var schemas = this._schemas;
        var DynamicTestModule = /** @class */ (function () {
            function DynamicTestModule() {
            }
            DynamicTestModule.decorators = [
                { type: _angular_core.NgModule, args: [{ providers: providers, declarations: declarations, imports: imports, schemas: schemas, jit: true },] },
            ];
            return DynamicTestModule;
        }());
        return DynamicTestModule;
    };
    return TestBedRender3;
}());
/** @type {?} */
var testBed$1;
/**
 * @return {?}
 */
function _getTestBedRender3() {
    return testBed$1 = testBed$1 || new TestBedRender3();
}
/** @type {?} */
var EMPTY_ARRAY = [];
/**
 * @param {?} moduleType
 * @param {?} resolvers
 * @return {?}
 */
function compileNgModule(moduleType, resolvers) {
    /** @type {?} */
    var ngModule = resolvers.module.resolve(moduleType);
    if (ngModule === null) {
        throw new Error(_angular_core.ɵstringify(moduleType) + " has not @NgModule annotation");
    }
    _angular_core.ɵcompileNgModuleDefs(moduleType, ngModule);
    /** @type {?} */
    var declarations = flatten(ngModule.declarations || EMPTY_ARRAY);
    /** @type {?} */
    var compiledComponents = [];
    // Compile the components, directives and pipes declared by this module
    declarations.forEach(function (declaration) {
        /** @type {?} */
        var component = resolvers.component.resolve(declaration);
        if (component) {
            _angular_core.ɵcompileComponent(declaration, component);
            compiledComponents.push(declaration);
            return;
        }
        /** @type {?} */
        var directive = resolvers.directive.resolve(declaration);
        if (directive) {
            _angular_core.ɵcompileDirective(declaration, directive);
            return;
        }
        /** @type {?} */
        var pipe = resolvers.pipe.resolve(declaration);
        if (pipe) {
            _angular_core.ɵcompilePipe(declaration, pipe);
            return;
        }
    });
    /** @type {?} */
    var transitiveScope = transitiveScopesFor(moduleType, resolvers);
    compiledComponents.forEach(function (cmp) { return _angular_core.ɵpatchComponentDefWithScope(cmp, transitiveScope); });
}
/**
 * Compute the pair of transitive scopes (compilation scope and exported scope) for a given module.
 *
 * This operation is memoized and the result is cached on the module's definition. It can be called
 * on modules with components that have not fully compiled yet, but the result should not be used
 * until they have.
 * @template T
 * @param {?} moduleType
 * @param {?} resolvers
 * @return {?}
 */
function transitiveScopesFor(moduleType, resolvers) {
    if (!isNgModule(moduleType)) {
        throw new Error(moduleType.name + " does not have an ngModuleDef");
    }
    /** @nocollapse @type {?} */
    var def = moduleType.ngModuleDef;
    if (def.transitiveCompileScopes !== null) {
        return def.transitiveCompileScopes;
    }
    /** @type {?} */
    var scopes = {
        compilation: {
            directives: new Set(),
            pipes: new Set(),
        },
        exported: {
            directives: new Set(),
            pipes: new Set(),
        },
    };
    def.declarations.forEach(function (declared) {
        /** @type {?} */
        var declaredWithDefs = /** @type {?} */ (declared);
        if (declaredWithDefs.ngPipeDef !== undefined) {
            scopes.compilation.pipes.add(declared);
        }
        else {
            scopes.compilation.directives.add(declared);
        }
    });
    def.imports.forEach(function (imported) {
        /** @type {?} */
        var ngModule = resolvers.module.resolve(imported);
        if (ngModule === null) {
            throw new Error("Importing " + imported.name + " which does not have an @ngModule");
        }
        else {
            compileNgModule(imported, resolvers);
        }
        /** @type {?} */
        var importedScope = transitiveScopesFor(imported, resolvers);
        importedScope.exported.directives.forEach(function (entry) { return scopes.compilation.directives.add(entry); });
        importedScope.exported.pipes.forEach(function (entry) { return scopes.compilation.pipes.add(entry); });
    });
    def.exports.forEach(function (exported) {
        /** @type {?} */
        var exportedTyped = /** @type {?} */ (exported);
        // Either the type is a module, a pipe, or a component/directive (which may not have an
        // ngComponentDef as it might be compiled asynchronously).
        if (isNgModule(exportedTyped)) {
            /** @type {?} */
            var exportedScope = transitiveScopesFor(exportedTyped, resolvers);
            exportedScope.exported.directives.forEach(function (entry) {
                scopes.compilation.directives.add(entry);
                scopes.exported.directives.add(entry);
            });
            exportedScope.exported.pipes.forEach(function (entry) {
                scopes.compilation.pipes.add(entry);
                scopes.exported.pipes.add(entry);
            });
        }
        else if (exportedTyped.ngPipeDef !== undefined) {
            scopes.exported.pipes.add(exportedTyped);
        }
        else {
            scopes.exported.directives.add(exportedTyped);
        }
    });
    def.transitiveCompileScopes = scopes;
    return scopes;
}
/**
 * @template T
 * @param {?} values
 * @return {?}
 */
function flatten(values) {
    /** @type {?} */
    var out = [];
    values.forEach(function (value) {
        if (Array.isArray(value)) {
            out.push.apply(out, flatten(value));
        }
        else {
            out.push(value);
        }
    });
    return out;
}
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function isNgModule(value) {
    return (/** @type {?} */ (value)).ngModuleDef !== undefined;
}

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
 * @return {?}
 */
function unimplemented() {
    throw Error('unimplemented');
}
/**
 * Special interface to the compiler only used by testing
 *
 * \@publicApi
 */
var TestingCompiler = /** @class */ (function (_super) {
    __extends(TestingCompiler, _super);
    function TestingCompiler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TestingCompiler.prototype, "injector", {
        get: /**
         * @return {?}
         */
        function () { throw unimplemented(); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} module
     * @param {?} overrides
     * @return {?}
     */
    TestingCompiler.prototype.overrideModule = /**
     * @param {?} module
     * @param {?} overrides
     * @return {?}
     */
    function (module, overrides) {
        throw unimplemented();
    };
    /**
     * @param {?} directive
     * @param {?} overrides
     * @return {?}
     */
    TestingCompiler.prototype.overrideDirective = /**
     * @param {?} directive
     * @param {?} overrides
     * @return {?}
     */
    function (directive, overrides) {
        throw unimplemented();
    };
    /**
     * @param {?} component
     * @param {?} overrides
     * @return {?}
     */
    TestingCompiler.prototype.overrideComponent = /**
     * @param {?} component
     * @param {?} overrides
     * @return {?}
     */
    function (component, overrides) {
        throw unimplemented();
    };
    /**
     * @param {?} directive
     * @param {?} overrides
     * @return {?}
     */
    TestingCompiler.prototype.overridePipe = /**
     * @param {?} directive
     * @param {?} overrides
     * @return {?}
     */
    function (directive, overrides) {
        throw unimplemented();
    };
    /**
     * Allows to pass the compile summary from AOT compilation to the JIT compiler,
     * so that it can use the code generated by AOT.
     */
    /**
     * Allows to pass the compile summary from AOT compilation to the JIT compiler,
     * so that it can use the code generated by AOT.
     * @param {?} summaries
     * @return {?}
     */
    TestingCompiler.prototype.loadAotSummaries = /**
     * Allows to pass the compile summary from AOT compilation to the JIT compiler,
     * so that it can use the code generated by AOT.
     * @param {?} summaries
     * @return {?}
     */
    function (summaries) { throw unimplemented(); };
    /**
     * Gets the component factory for the given component.
     * This assumes that the component has been compiled before calling this call using
     * `compileModuleAndAllComponents*`.
     */
    /**
     * Gets the component factory for the given component.
     * This assumes that the component has been compiled before calling this call using
     * `compileModuleAndAllComponents*`.
     * @template T
     * @param {?} component
     * @return {?}
     */
    TestingCompiler.prototype.getComponentFactory = /**
     * Gets the component factory for the given component.
     * This assumes that the component has been compiled before calling this call using
     * `compileModuleAndAllComponents*`.
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) { throw unimplemented(); };
    /**
     * Returns the component type that is stored in the given error.
     * This can be used for errors created by compileModule...
     */
    /**
     * Returns the component type that is stored in the given error.
     * This can be used for errors created by compileModule...
     * @param {?} error
     * @return {?}
     */
    TestingCompiler.prototype.getComponentFromError = /**
     * Returns the component type that is stored in the given error.
     * This can be used for errors created by compileModule...
     * @param {?} error
     * @return {?}
     */
    function (error) { throw unimplemented(); };
    TestingCompiler.decorators = [
        { type: _angular_core.Injectable },
    ];
    return TestingCompiler;
}(_angular_core.Compiler));
/**
 * A factory for creating a Compiler
 *
 * \@publicApi
 * @abstract
 */
var TestingCompilerFactory = /** @class */ (function () {
    function TestingCompilerFactory() {
    }
    return TestingCompilerFactory;
}());

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
var UNDEFINED = new Object();
/** @type {?} */
var _nextRootElementId = 0;
/**
 * \@description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
var TestBedViewEngine = /** @class */ (function () {
    function TestBedViewEngine() {
        this._instantiated = false;
        this._compiler = /** @type {?} */ ((null));
        this._moduleRef = /** @type {?} */ ((null));
        this._moduleFactory = /** @type {?} */ ((null));
        this._compilerOptions = [];
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
        this._activeFixtures = [];
        this._testEnvAotSummaries = function () { return []; };
        this._aotSummaries = [];
        this._templateOverrides = [];
        this._isRoot = true;
        this._rootProviderOverrides = [];
        this.platform = /** @type {?} */ ((null));
        this.ngModule = /** @type {?} */ ((null));
    }
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     */
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    TestBedViewEngine.initTestEnvironment = /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    function (ngModule, platform, aotSummaries) {
        /** @type {?} */
        var testBed = _getTestBedViewEngine();
        testBed.initTestEnvironment(ngModule, platform, aotSummaries);
        return testBed;
    };
    /**
     * Reset the providers for the test injector.
     */
    /**
     * Reset the providers for the test injector.
     * @return {?}
     */
    TestBedViewEngine.resetTestEnvironment = /**
     * Reset the providers for the test injector.
     * @return {?}
     */
    function () { _getTestBedViewEngine().resetTestEnvironment(); };
    /**
     * @return {?}
     */
    TestBedViewEngine.resetTestingModule = /**
     * @return {?}
     */
    function () {
        _getTestBedViewEngine().resetTestingModule();
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     */
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     * @param {?} config
     * @return {?}
     */
    TestBedViewEngine.configureCompiler = /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     * @param {?} config
     * @return {?}
     */
    function (config) {
        _getTestBedViewEngine().configureCompiler(config);
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     * @param {?} moduleDef
     * @return {?}
     */
    TestBedViewEngine.configureTestingModule = /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     * @param {?} moduleDef
     * @return {?}
     */
    function (moduleDef) {
        _getTestBedViewEngine().configureTestingModule(moduleDef);
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     * @return {?}
     */
    TestBedViewEngine.compileComponents = /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     * @return {?}
     */
    function () { return getTestBed().compileComponents(); };
    /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    TestBedViewEngine.overrideModule = /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    function (ngModule, override) {
        _getTestBedViewEngine().overrideModule(ngModule, override);
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    TestBedViewEngine.overrideComponent = /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    function (component, override) {
        _getTestBedViewEngine().overrideComponent(component, override);
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    TestBedViewEngine.overrideDirective = /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    function (directive, override) {
        _getTestBedViewEngine().overrideDirective(directive, override);
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    TestBedViewEngine.overridePipe = /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    function (pipe, override) {
        _getTestBedViewEngine().overridePipe(pipe, override);
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    TestBedViewEngine.overrideTemplate = /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    function (component, template) {
        _getTestBedViewEngine().overrideComponent(component, { set: { template: template, templateUrl: /** @type {?} */ ((null)) } });
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    TestBedViewEngine.overrideTemplateUsingTestingModule = /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    function (component, template) {
        _getTestBedViewEngine().overrideTemplateUsingTestingModule(component, template);
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedViewEngine.overrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        _getTestBedViewEngine().overrideProvider(token, /** @type {?} */ (provider));
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedViewEngine.deprecatedOverrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        _getTestBedViewEngine().deprecatedOverrideProvider(token, /** @type {?} */ (provider));
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    TestBedViewEngine.get = /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = _angular_core.Injector.THROW_IF_NOT_FOUND; }
        return _getTestBedViewEngine().get(token, notFoundValue);
    };
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    TestBedViewEngine.createComponent = /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) {
        return _getTestBedViewEngine().createComponent(component);
    };
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     */
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    TestBedViewEngine.prototype.initTestEnvironment = /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    function (ngModule, platform, aotSummaries) {
        if (this.platform || this.ngModule) {
            throw new Error('Cannot set base providers because it has already been called');
        }
        this.platform = platform;
        this.ngModule = ngModule;
        if (aotSummaries) {
            this._testEnvAotSummaries = aotSummaries;
        }
    };
    /**
     * Reset the providers for the test injector.
     */
    /**
     * Reset the providers for the test injector.
     * @return {?}
     */
    TestBedViewEngine.prototype.resetTestEnvironment = /**
     * Reset the providers for the test injector.
     * @return {?}
     */
    function () {
        this.resetTestingModule();
        this.platform = /** @type {?} */ ((null));
        this.ngModule = /** @type {?} */ ((null));
        this._testEnvAotSummaries = function () { return []; };
    };
    /**
     * @return {?}
     */
    TestBedViewEngine.prototype.resetTestingModule = /**
     * @return {?}
     */
    function () {
        _angular_core.ɵclearOverrides();
        this._aotSummaries = [];
        this._templateOverrides = [];
        this._compiler = /** @type {?} */ ((null));
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._isRoot = true;
        this._rootProviderOverrides = [];
        this._moduleRef = /** @type {?} */ ((null));
        this._moduleFactory = /** @type {?} */ ((null));
        this._compilerOptions = [];
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
        this._instantiated = false;
        this._activeFixtures.forEach(function (fixture) {
            try {
                fixture.destroy();
            }
            catch (e) {
                console.error('Error during cleanup of component', {
                    component: fixture.componentInstance,
                    stacktrace: e,
                });
            }
        });
        this._activeFixtures = [];
    };
    /**
     * @param {?} config
     * @return {?}
     */
    TestBedViewEngine.prototype.configureCompiler = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this._assertNotInstantiated('TestBed.configureCompiler', 'configure the compiler');
        this._compilerOptions.push(config);
    };
    /**
     * @param {?} moduleDef
     * @return {?}
     */
    TestBedViewEngine.prototype.configureTestingModule = /**
     * @param {?} moduleDef
     * @return {?}
     */
    function (moduleDef) {
        var _a, _b, _c, _d;
        this._assertNotInstantiated('TestBed.configureTestingModule', 'configure the test module');
        if (moduleDef.providers) {
            (_a = this._providers).push.apply(_a, moduleDef.providers);
        }
        if (moduleDef.declarations) {
            (_b = this._declarations).push.apply(_b, moduleDef.declarations);
        }
        if (moduleDef.imports) {
            (_c = this._imports).push.apply(_c, moduleDef.imports);
        }
        if (moduleDef.schemas) {
            (_d = this._schemas).push.apply(_d, moduleDef.schemas);
        }
        if (moduleDef.aotSummaries) {
            this._aotSummaries.push(moduleDef.aotSummaries);
        }
    };
    /**
     * @return {?}
     */
    TestBedViewEngine.prototype.compileComponents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._moduleFactory || this._instantiated) {
            return Promise.resolve(null);
        }
        /** @type {?} */
        var moduleType = this._createCompilerAndModule();
        return this._compiler.compileModuleAndAllComponentsAsync(moduleType)
            .then(function (moduleAndComponentFactories) {
            _this._moduleFactory = moduleAndComponentFactories.ngModuleFactory;
        });
    };
    /**
     * @return {?}
     */
    TestBedViewEngine.prototype._initIfNeeded = /**
     * @return {?}
     */
    function () {
        if (this._instantiated) {
            return;
        }
        if (!this._moduleFactory) {
            try {
                /** @type {?} */
                var moduleType = this._createCompilerAndModule();
                this._moduleFactory =
                    this._compiler.compileModuleAndAllComponentsSync(moduleType).ngModuleFactory;
            }
            catch (e) {
                /** @type {?} */
                var errorCompType = this._compiler.getComponentFromError(e);
                if (errorCompType) {
                    throw new Error("This test module uses the component " + _angular_core.ɵstringify(errorCompType) + " which is using a \"templateUrl\" or \"styleUrls\", but they were never compiled. " +
                        "Please call \"TestBed.compileComponents\" before your test.");
                }
                else {
                    throw e;
                }
            }
        }
        for (var _i = 0, _a = this._templateOverrides; _i < _a.length; _i++) {
            var _b = _a[_i], component = _b.component, templateOf = _b.templateOf;
            /** @type {?} */
            var compFactory = this._compiler.getComponentFactory(templateOf);
            _angular_core.ɵoverrideComponentView(component, compFactory);
        }
        /** @type {?} */
        var ngZone = new _angular_core.NgZone({ enableLongStackTrace: true });
        /** @type {?} */
        var providers = [{ provide: _angular_core.NgZone, useValue: ngZone }];
        /** @type {?} */
        var ngZoneInjector = _angular_core.Injector.create({
            providers: providers,
            parent: this.platform.injector,
            name: this._moduleFactory.moduleType.name
        });
        this._moduleRef = this._moduleFactory.create(ngZoneInjector);
        // ApplicationInitStatus.runInitializers() is marked @internal to core. So casting to any
        // before accessing it.
        (/** @type {?} */ (this._moduleRef.injector.get(_angular_core.ApplicationInitStatus))).runInitializers();
        this._instantiated = true;
    };
    /**
     * @return {?}
     */
    TestBedViewEngine.prototype._createCompilerAndModule = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var providers = this._providers.concat([{ provide: TestBed, useValue: this }]);
        /** @type {?} */
        var declarations = this._declarations.concat(this._templateOverrides.map(function (entry) { return entry.templateOf; }));
        /** @type {?} */
        var rootScopeImports = [];
        /** @type {?} */
        var rootProviderOverrides = this._rootProviderOverrides;
        if (this._isRoot) {
            var RootScopeModule = /** @class */ (function () {
                function RootScopeModule() {
                }
                RootScopeModule.decorators = [
                    { type: _angular_core.NgModule, args: [{
                                providers: rootProviderOverrides.slice(),
                                jit: true,
                            },] },
                ];
                return RootScopeModule;
            }());
            rootScopeImports.push(RootScopeModule);
        }
        providers.push({ provide: _angular_core.ɵAPP_ROOT, useValue: this._isRoot });
        /** @type {?} */
        var imports = [rootScopeImports, this.ngModule, this._imports];
        /** @type {?} */
        var schemas = this._schemas;
        var DynamicTestModule = /** @class */ (function () {
            function DynamicTestModule() {
            }
            DynamicTestModule.decorators = [
                { type: _angular_core.NgModule, args: [{ providers: providers, declarations: declarations, imports: imports, schemas: schemas, jit: true },] },
            ];
            return DynamicTestModule;
        }());
        /** @type {?} */
        var compilerFactory = this.platform.injector.get(TestingCompilerFactory);
        this._compiler = compilerFactory.createTestingCompiler(this._compilerOptions);
        for (var _i = 0, _a = [this._testEnvAotSummaries].concat(this._aotSummaries); _i < _a.length; _i++) {
            var summary = _a[_i];
            this._compiler.loadAotSummaries(summary);
        }
        this._moduleOverrides.forEach(function (entry) { return _this._compiler.overrideModule(entry[0], entry[1]); });
        this._componentOverrides.forEach(function (entry) { return _this._compiler.overrideComponent(entry[0], entry[1]); });
        this._directiveOverrides.forEach(function (entry) { return _this._compiler.overrideDirective(entry[0], entry[1]); });
        this._pipeOverrides.forEach(function (entry) { return _this._compiler.overridePipe(entry[0], entry[1]); });
        return DynamicTestModule;
    };
    /**
     * @param {?} methodName
     * @param {?} methodDescription
     * @return {?}
     */
    TestBedViewEngine.prototype._assertNotInstantiated = /**
     * @param {?} methodName
     * @param {?} methodDescription
     * @return {?}
     */
    function (methodName, methodDescription) {
        if (this._instantiated) {
            throw new Error("Cannot " + methodDescription + " when the test module has already been instantiated. " +
                ("Make sure you are not using `inject` before `" + methodName + "`."));
        }
    };
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    TestBedViewEngine.prototype.get = /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = _angular_core.Injector.THROW_IF_NOT_FOUND; }
        this._initIfNeeded();
        if (token === TestBed) {
            return this;
        }
        /** @type {?} */
        var result = this._moduleRef.injector.get(token, UNDEFINED);
        return result === UNDEFINED ? this._compiler.injector.get(token, notFoundValue) : result;
    };
    /**
     * @param {?} tokens
     * @param {?} fn
     * @param {?=} context
     * @return {?}
     */
    TestBedViewEngine.prototype.execute = /**
     * @param {?} tokens
     * @param {?} fn
     * @param {?=} context
     * @return {?}
     */
    function (tokens, fn, context) {
        var _this = this;
        this._initIfNeeded();
        /** @type {?} */
        var params = tokens.map(function (t) { return _this.get(t); });
        return fn.apply(context, params);
    };
    /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    TestBedViewEngine.prototype.overrideModule = /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    function (ngModule, override) {
        this._assertNotInstantiated('overrideModule', 'override module metadata');
        this._moduleOverrides.push([ngModule, override]);
    };
    /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    TestBedViewEngine.prototype.overrideComponent = /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    function (component, override) {
        this._assertNotInstantiated('overrideComponent', 'override component metadata');
        this._componentOverrides.push([component, override]);
    };
    /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    TestBedViewEngine.prototype.overrideDirective = /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    function (directive, override) {
        this._assertNotInstantiated('overrideDirective', 'override directive metadata');
        this._directiveOverrides.push([directive, override]);
    };
    /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    TestBedViewEngine.prototype.overridePipe = /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    function (pipe, override) {
        this._assertNotInstantiated('overridePipe', 'override pipe metadata');
        this._pipeOverrides.push([pipe, override]);
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedViewEngine.prototype.overrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        this.overrideProviderImpl(token, provider);
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedViewEngine.prototype.deprecatedOverrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        this.overrideProviderImpl(token, provider, /* deprecated */ /* deprecated */ true);
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @param {?=} deprecated
     * @return {?}
     */
    TestBedViewEngine.prototype.overrideProviderImpl = /**
     * @param {?} token
     * @param {?} provider
     * @param {?=} deprecated
     * @return {?}
     */
    function (token, provider, deprecated) {
        if (deprecated === void 0) { deprecated = false; }
        /** @type {?} */
        var def = null;
        if (typeof token !== 'string' && (def = _angular_core.ɵgetInjectableDef(token)) && def.providedIn === 'root') {
            if (provider.useFactory) {
                this._rootProviderOverrides.push({ provide: token, useFactory: provider.useFactory, deps: provider.deps || [] });
            }
            else {
                this._rootProviderOverrides.push({ provide: token, useValue: provider.useValue });
            }
        }
        /** @type {?} */
        var flags = 0;
        /** @type {?} */
        var value;
        if (provider.useFactory) {
            flags |= 1024 /* TypeFactoryProvider */;
            value = provider.useFactory;
        }
        else {
            flags |= 256 /* TypeValueProvider */;
            value = provider.useValue;
        }
        /** @type {?} */
        var deps = (provider.deps || []).map(function (dep) {
            /** @type {?} */
            var depFlags = 0;
            /** @type {?} */
            var depToken;
            if (Array.isArray(dep)) {
                dep.forEach(function (entry) {
                    if (entry instanceof _angular_core.Optional) {
                        depFlags |= 2 /* Optional */;
                    }
                    else if (entry instanceof _angular_core.SkipSelf) {
                        depFlags |= 1 /* SkipSelf */;
                    }
                    else {
                        depToken = entry;
                    }
                });
            }
            else {
                depToken = dep;
            }
            return [depFlags, depToken];
        });
        _angular_core.ɵoverrideProvider({ token: token, flags: flags, deps: deps, value: value, deprecatedBehavior: deprecated });
    };
    /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    TestBedViewEngine.prototype.overrideTemplateUsingTestingModule = /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    function (component, template) {
        this._assertNotInstantiated('overrideTemplateUsingTestingModule', 'override template');
        var OverrideComponent = /** @class */ (function () {
            function OverrideComponent() {
            }
            OverrideComponent.decorators = [
                { type: _angular_core.Component, args: [{ selector: 'empty', template: template, jit: true },] },
            ];
            return OverrideComponent;
        }());
        this._templateOverrides.push({ component: component, templateOf: OverrideComponent });
    };
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    TestBedViewEngine.prototype.createComponent = /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) {
        var _this = this;
        this._initIfNeeded();
        /** @type {?} */
        var componentFactory = this._compiler.getComponentFactory(component);
        if (!componentFactory) {
            throw new Error("Cannot create the component " + _angular_core.ɵstringify(component) + " as it was not imported into the testing module!");
        }
        /** @type {?} */
        var noNgZone = this.get(ComponentFixtureNoNgZone, false);
        /** @type {?} */
        var autoDetect = this.get(ComponentFixtureAutoDetect, false);
        /** @type {?} */
        var ngZone = noNgZone ? null : this.get(_angular_core.NgZone, null);
        /** @type {?} */
        var testComponentRenderer = this.get(TestComponentRenderer);
        /** @type {?} */
        var rootElId = "root" + _nextRootElementId++;
        testComponentRenderer.insertRootElement(rootElId);
        /** @type {?} */
        var initComponent = function () {
            /** @type {?} */
            var componentRef = componentFactory.create(_angular_core.Injector.NULL, [], "#" + rootElId, _this._moduleRef);
            return new ComponentFixture(componentRef, ngZone, autoDetect);
        };
        /** @type {?} */
        var fixture = !ngZone ? initComponent() : ngZone.run(initComponent);
        this._activeFixtures.push(fixture);
        return fixture;
    };
    return TestBedViewEngine;
}());
/** *
 * \@description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 *
 * \@publicApi
  @type {?} */
var TestBed = _angular_core.ɵivyEnabled ? /** @type {?} */ ((TestBedRender3)) : /** @type {?} */ ((TestBedViewEngine));
/** *
 * Returns a singleton of the applicable `TestBed`.
 *
 * It will be either an instance of `TestBedViewEngine` or `TestBedRender3`.
 *
 * \@publicApi
  @type {?} */
var getTestBed = _angular_core.ɵivyEnabled ? _getTestBedRender3 : _getTestBedViewEngine;
/** @type {?} */
var testBed;
/**
 * @return {?}
 */
function _getTestBedViewEngine() {
    return testBed = testBed || new TestBedViewEngine();
}
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething();
 *   expect(...);
 * })
 * ```
 *
 * Notes:
 * - inject is currently a function because of some Traceur limitation the syntax should
 * eventually
 *   becomes `it('...', \@Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * \@publicApi
 * @param {?} tokens
 * @param {?} fn
 * @return {?}
 */
function inject(tokens, fn) {
    /** @type {?} */
    var testBed = getTestBed();
    if (tokens.indexOf(AsyncTestCompleter) >= 0) {
        // Not using an arrow function to preserve context passed from call site
        return function () {
            var _this = this;
            // Return an async test method that returns a Promise if AsyncTestCompleter is one of
            // the injected tokens.
            return testBed.compileComponents().then(function () {
                /** @type {?} */
                var completer = testBed.get(AsyncTestCompleter);
                testBed.execute(tokens, fn, _this);
                return completer.promise;
            });
        };
    }
    else {
        // Not using an arrow function to preserve context passed from call site
        return function () { return testBed.execute(tokens, fn, this); };
    }
}
/**
 * \@publicApi
 */
var InjectSetupWrapper = /** @class */ (function () {
    function InjectSetupWrapper(_moduleDef) {
        this._moduleDef = _moduleDef;
    }
    /**
     * @return {?}
     */
    InjectSetupWrapper.prototype._addModule = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var moduleDef = this._moduleDef();
        if (moduleDef) {
            getTestBed().configureTestingModule(moduleDef);
        }
    };
    /**
     * @param {?} tokens
     * @param {?} fn
     * @return {?}
     */
    InjectSetupWrapper.prototype.inject = /**
     * @param {?} tokens
     * @param {?} fn
     * @return {?}
     */
    function (tokens, fn) {
        /** @type {?} */
        var self = this;
        // Not using an arrow function to preserve context passed from call site
        return function () {
            self._addModule();
            return inject(tokens, fn).call(this);
        };
    };
    return InjectSetupWrapper;
}());
/**
 * @param {?} moduleDef
 * @param {?=} fn
 * @return {?}
 */
function withModule(moduleDef, fn) {
    if (fn) {
        // Not using an arrow function to preserve context passed from call site
        return function () {
            /** @type {?} */
            var testBed = getTestBed();
            if (moduleDef) {
                testBed.configureTestingModule(moduleDef);
            }
            return fn.apply(this);
        };
    }
    return new InjectSetupWrapper(function () { return moduleDef; });
}

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
var _global$1 = /** @type {?} */ ((typeof window === 'undefined' ? global : window));
// Reset the test providers and the fake async zone before each test.
if (_global$1.beforeEach) {
    _global$1.beforeEach(function () {
        TestBed.resetTestingModule();
        resetFakeAsyncZone();
    });
}
/** @type {?} */
var __core_private_testing_placeholder__ = '';

exports.TestBed = TestBed;
exports.getTestBed = getTestBed;
exports.inject = inject;
exports.InjectSetupWrapper = InjectSetupWrapper;
exports.withModule = withModule;
exports.ɵMetadataOverrider = MetadataOverrider;
exports.async = async;
exports.ComponentFixture = ComponentFixture;
exports.resetFakeAsyncZone = resetFakeAsyncZone;
exports.fakeAsync = fakeAsync;
exports.tick = tick;
exports.flush = flush;
exports.discardPeriodicTasks = discardPeriodicTasks;
exports.flushMicrotasks = flushMicrotasks;
exports.TestComponentRenderer = TestComponentRenderer;
exports.ComponentFixtureAutoDetect = ComponentFixtureAutoDetect;
exports.ComponentFixtureNoNgZone = ComponentFixtureNoNgZone;
exports.__core_private_testing_placeholder__ = __core_private_testing_placeholder__;
exports.ɵTestingCompiler = TestingCompiler;
exports.ɵTestingCompilerFactory = TestingCompilerFactory;
exports.ɵb = TestBedRender3;
exports.ɵc = _getTestBedRender3;
exports.ɵa = TestBedViewEngine;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-testing.umd.js.map
