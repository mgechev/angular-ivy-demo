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
import { EventEmitter } from '../event_emitter';
/**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {\@link #runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {\@link #run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * \@usageNotes
 * ### Example
 *
 * ```
 * import {Component, NgZone} from '\@angular/core';
 * import {NgIf} from '\@angular/common';
 *
 * \@Component({
 *   selector: 'ng-zone-demo',
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *         // reenter the Angular zone and display done
 *         this._ngZone.run(() => { console.log('Outside Done!'); });
 *       });
 *     });
 *   }
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback), 10);
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 *
 * \@publicApi
 */
var /**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {\@link #runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {\@link #run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * \@usageNotes
 * ### Example
 *
 * ```
 * import {Component, NgZone} from '\@angular/core';
 * import {NgIf} from '\@angular/common';
 *
 * \@Component({
 *   selector: 'ng-zone-demo',
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *         // reenter the Angular zone and display done
 *         this._ngZone.run(() => { console.log('Outside Done!'); });
 *       });
 *     });
 *   }
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback), 10);
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 *
 * \@publicApi
 */
NgZone = /** @class */ (function () {
    function NgZone(_a) {
        var _b = _a.enableLongStackTrace, enableLongStackTrace = _b === void 0 ? false : _b;
        this.hasPendingMicrotasks = false;
        this.hasPendingMacrotasks = false;
        /**
         * Whether there are no outstanding microtasks or macrotasks.
         */
        this.isStable = true;
        /**
         * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
         */
        this.onUnstable = new EventEmitter(false);
        /**
         * Notifies when there is no more microtasks enqueued in the current VM Turn.
         * This is a hint for Angular to do change detection, which may enqueue more microtasks.
         * For this reason this event can fire multiple times per VM Turn.
         */
        this.onMicrotaskEmpty = new EventEmitter(false);
        /**
         * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
         * implies we are about to relinquish VM turn.
         * This event gets called just once.
         */
        this.onStable = new EventEmitter(false);
        /**
         * Notifies that an error has been delivered.
         */
        this.onError = new EventEmitter(false);
        if (typeof Zone == 'undefined') {
            throw new Error("In this configuration Angular requires Zone.js");
        }
        Zone.assertZonePatched();
        /** @type {?} */
        var self = /** @type {?} */ ((this));
        self._nesting = 0;
        self._outer = self._inner = Zone.current;
        if ((/** @type {?} */ (Zone))['wtfZoneSpec']) {
            self._inner = self._inner.fork((/** @type {?} */ (Zone))['wtfZoneSpec']);
        }
        if ((/** @type {?} */ (Zone))['TaskTrackingZoneSpec']) {
            self._inner = self._inner.fork(new (/** @type {?} */ ((/** @type {?} */ (Zone))['TaskTrackingZoneSpec'])));
        }
        if (enableLongStackTrace && (/** @type {?} */ (Zone))['longStackTraceZoneSpec']) {
            self._inner = self._inner.fork((/** @type {?} */ (Zone))['longStackTraceZoneSpec']);
        }
        forkInnerZoneWithAngularBehavior(self);
    }
    /**
     * @return {?}
     */
    NgZone.isInAngularZone = /**
     * @return {?}
     */
    function () { return Zone.current.get('isAngularZone') === true; };
    /**
     * @return {?}
     */
    NgZone.assertInAngularZone = /**
     * @return {?}
     */
    function () {
        if (!NgZone.isInAngularZone()) {
            throw new Error('Expected to be in Angular Zone, but it is not!');
        }
    };
    /**
     * @return {?}
     */
    NgZone.assertNotInAngularZone = /**
     * @return {?}
     */
    function () {
        if (NgZone.isInAngularZone()) {
            throw new Error('Expected to not be in Angular Zone, but it is!');
        }
    };
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     */
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {\@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     * @template T
     * @param {?} fn
     * @param {?=} applyThis
     * @param {?=} applyArgs
     * @return {?}
     */
    NgZone.prototype.run = /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {\@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     * @template T
     * @param {?} fn
     * @param {?=} applyThis
     * @param {?=} applyArgs
     * @return {?}
     */
    function (fn, applyThis, applyArgs) {
        return /** @type {?} */ ((/** @type {?} */ ((this)))._inner.run(fn, applyThis, applyArgs));
    };
    /**
     * Executes the `fn` function synchronously within the Angular zone as a task and returns value
     * returned by the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     */
    /**
     * Executes the `fn` function synchronously within the Angular zone as a task and returns value
     * returned by the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {\@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     * @template T
     * @param {?} fn
     * @param {?=} applyThis
     * @param {?=} applyArgs
     * @param {?=} name
     * @return {?}
     */
    NgZone.prototype.runTask = /**
     * Executes the `fn` function synchronously within the Angular zone as a task and returns value
     * returned by the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {\@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     * @template T
     * @param {?} fn
     * @param {?=} applyThis
     * @param {?=} applyArgs
     * @param {?=} name
     * @return {?}
     */
    function (fn, applyThis, applyArgs, name) {
        /** @type {?} */
        var zone = (/** @type {?} */ ((this)))._inner;
        /** @type {?} */
        var task = zone.scheduleEventTask('NgZoneEvent: ' + name, fn, EMPTY_PAYLOAD, noop, noop);
        try {
            return /** @type {?} */ (zone.runTask(task, applyThis, applyArgs));
        }
        finally {
            zone.cancelTask(task);
        }
    };
    /**
     * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
     * rethrown.
     */
    /**
     * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
     * rethrown.
     * @template T
     * @param {?} fn
     * @param {?=} applyThis
     * @param {?=} applyArgs
     * @return {?}
     */
    NgZone.prototype.runGuarded = /**
     * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
     * rethrown.
     * @template T
     * @param {?} fn
     * @param {?=} applyThis
     * @param {?=} applyArgs
     * @return {?}
     */
    function (fn, applyThis, applyArgs) {
        return /** @type {?} */ ((/** @type {?} */ ((this)))._inner.runGuarded(fn, applyThis, applyArgs));
    };
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via {@link #runOutsideAngular} allows you to escape Angular's zone and do
     * work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
     */
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via {\@link #runOutsideAngular} allows you to escape Angular's zone and do
     * work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {\@link #run} to reenter the Angular zone and do work that updates the application model.
     * @template T
     * @param {?} fn
     * @return {?}
     */
    NgZone.prototype.runOutsideAngular = /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via {\@link #runOutsideAngular} allows you to escape Angular's zone and do
     * work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {\@link #run} to reenter the Angular zone and do work that updates the application model.
     * @template T
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return /** @type {?} */ ((/** @type {?} */ ((this)))._outer.run(fn));
    };
    return NgZone;
}());
/**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {\@link #runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {\@link #run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * \@usageNotes
 * ### Example
 *
 * ```
 * import {Component, NgZone} from '\@angular/core';
 * import {NgIf} from '\@angular/common';
 *
 * \@Component({
 *   selector: 'ng-zone-demo',
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *         // reenter the Angular zone and display done
 *         this._ngZone.run(() => { console.log('Outside Done!'); });
 *       });
 *     });
 *   }
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback), 10);
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 *
 * \@publicApi
 */
export { NgZone };
if (false) {
    /** @type {?} */
    NgZone.prototype.hasPendingMicrotasks;
    /** @type {?} */
    NgZone.prototype.hasPendingMacrotasks;
    /**
     * Whether there are no outstanding microtasks or macrotasks.
     * @type {?}
     */
    NgZone.prototype.isStable;
    /**
     * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
     * @type {?}
     */
    NgZone.prototype.onUnstable;
    /**
     * Notifies when there is no more microtasks enqueued in the current VM Turn.
     * This is a hint for Angular to do change detection, which may enqueue more microtasks.
     * For this reason this event can fire multiple times per VM Turn.
     * @type {?}
     */
    NgZone.prototype.onMicrotaskEmpty;
    /**
     * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
     * implies we are about to relinquish VM turn.
     * This event gets called just once.
     * @type {?}
     */
    NgZone.prototype.onStable;
    /**
     * Notifies that an error has been delivered.
     * @type {?}
     */
    NgZone.prototype.onError;
}
/**
 * @return {?}
 */
function noop() { }
/** @type {?} */
var EMPTY_PAYLOAD = {};
/**
 * @record
 */
function NgZonePrivate() { }
/** @type {?} */
NgZonePrivate.prototype._outer;
/** @type {?} */
NgZonePrivate.prototype._inner;
/** @type {?} */
NgZonePrivate.prototype._nesting;
/** @type {?} */
NgZonePrivate.prototype.hasPendingMicrotasks;
/** @type {?} */
NgZonePrivate.prototype.hasPendingMacrotasks;
/** @type {?} */
NgZonePrivate.prototype.isStable;
/**
 * @param {?} zone
 * @return {?}
 */
function checkStable(zone) {
    if (zone._nesting == 0 && !zone.hasPendingMicrotasks && !zone.isStable) {
        try {
            zone._nesting++;
            zone.onMicrotaskEmpty.emit(null);
        }
        finally {
            zone._nesting--;
            if (!zone.hasPendingMicrotasks) {
                try {
                    zone.runOutsideAngular(function () { return zone.onStable.emit(null); });
                }
                finally {
                    zone.isStable = true;
                }
            }
        }
    }
}
/**
 * @param {?} zone
 * @return {?}
 */
function forkInnerZoneWithAngularBehavior(zone) {
    zone._inner = zone._inner.fork({
        name: 'angular',
        properties: /** @type {?} */ ({ 'isAngularZone': true }),
        onInvokeTask: function (delegate, current, target, task, applyThis, applyArgs) {
            try {
                onEnter(zone);
                return delegate.invokeTask(target, task, applyThis, applyArgs);
            }
            finally {
                onLeave(zone);
            }
        },
        onInvoke: function (delegate, current, target, callback, applyThis, applyArgs, source) {
            try {
                onEnter(zone);
                return delegate.invoke(target, callback, applyThis, applyArgs, source);
            }
            finally {
                onLeave(zone);
            }
        },
        onHasTask: function (delegate, current, target, hasTaskState) {
            delegate.hasTask(target, hasTaskState);
            if (current === target) {
                // We are only interested in hasTask events which originate from our zone
                // (A child hasTask event is not interesting to us)
                if (hasTaskState.change == 'microTask') {
                    zone.hasPendingMicrotasks = hasTaskState.microTask;
                    checkStable(zone);
                }
                else if (hasTaskState.change == 'macroTask') {
                    zone.hasPendingMacrotasks = hasTaskState.macroTask;
                }
            }
        },
        onHandleError: function (delegate, current, target, error) {
            delegate.handleError(target, error);
            zone.runOutsideAngular(function () { return zone.onError.emit(error); });
            return false;
        }
    });
}
/**
 * @param {?} zone
 * @return {?}
 */
function onEnter(zone) {
    zone._nesting++;
    if (zone.isStable) {
        zone.isStable = false;
        zone.onUnstable.emit(null);
    }
}
/**
 * @param {?} zone
 * @return {?}
 */
function onLeave(zone) {
    zone._nesting--;
    checkStable(zone);
}
/**
 * Provides a noop implementation of `NgZone` which does nothing. This zone requires explicit calls
 * to framework to perform rendering.
 */
var /**
 * Provides a noop implementation of `NgZone` which does nothing. This zone requires explicit calls
 * to framework to perform rendering.
 */
NoopNgZone = /** @class */ (function () {
    function NoopNgZone() {
        this.hasPendingMicrotasks = false;
        this.hasPendingMacrotasks = false;
        this.isStable = true;
        this.onUnstable = new EventEmitter();
        this.onMicrotaskEmpty = new EventEmitter();
        this.onStable = new EventEmitter();
        this.onError = new EventEmitter();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    NoopNgZone.prototype.run = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { return fn(); };
    /**
     * @param {?} fn
     * @return {?}
     */
    NoopNgZone.prototype.runGuarded = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { return fn(); };
    /**
     * @param {?} fn
     * @return {?}
     */
    NoopNgZone.prototype.runOutsideAngular = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { return fn(); };
    /**
     * @template T
     * @param {?} fn
     * @return {?}
     */
    NoopNgZone.prototype.runTask = /**
     * @template T
     * @param {?} fn
     * @return {?}
     */
    function (fn) { return fn(); };
    return NoopNgZone;
}());
/**
 * Provides a noop implementation of `NgZone` which does nothing. This zone requires explicit calls
 * to framework to perform rendering.
 */
export { NoopNgZone };
if (false) {
    /** @type {?} */
    NoopNgZone.prototype.hasPendingMicrotasks;
    /** @type {?} */
    NoopNgZone.prototype.hasPendingMacrotasks;
    /** @type {?} */
    NoopNgZone.prototype.isStable;
    /** @type {?} */
    NoopNgZone.prototype.onUnstable;
    /** @type {?} */
    NoopNgZone.prototype.onMicrotaskEmpty;
    /** @type {?} */
    NoopNgZone.prototype.onStable;
    /** @type {?} */
    NoopNgZone.prototype.onError;
}
//# sourceMappingURL=ng_zone.js.map