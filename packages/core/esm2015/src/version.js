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
 * \@description Represents the version of Angular
 *
 * \@publicApi
 */
export class Version {
    /**
     * @param {?} full
     */
    constructor(full) {
        this.full = full;
        this.major = full.split('.')[0];
        this.minor = full.split('.')[1];
        this.patch = full.split('.').slice(2).join('.');
    }
}
if (false) {
    /** @type {?} */
    Version.prototype.major;
    /** @type {?} */
    Version.prototype.minor;
    /** @type {?} */
    Version.prototype.patch;
    /** @type {?} */
    Version.prototype.full;
}
/** *
 * \@publicApi
  @type {?} */
export const VERSION = new Version('7.1.0-ee8310445');
//# sourceMappingURL=version.js.map