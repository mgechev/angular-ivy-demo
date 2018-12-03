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
import { Injectable } from './di';
export class Console {
    /**
     * @param {?} message
     * @return {?}
     */
    log(message) {
        // tslint:disable-next-line:no-console
        console.log(message);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    warn(message) {
        // tslint:disable-next-line:no-console
        console.warn(message);
    }
}
Console.decorators = [
    { type: Injectable },
];
//# sourceMappingURL=console.js.map