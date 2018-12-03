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
import { resetFakeAsyncZone } from './fake_async';
import { TestBed } from './test_bed';
/** @type {?} */
const _global = /** @type {?} */ ((typeof window === 'undefined' ? global : window));
// Reset the test providers and the fake async zone before each test.
if (_global.beforeEach) {
    _global.beforeEach(() => {
        TestBed.resetTestingModule();
        resetFakeAsyncZone();
    });
}
/** @type {?} */
export const __core_private_testing_placeholder__ = '';
//# sourceMappingURL=before_each.js.map