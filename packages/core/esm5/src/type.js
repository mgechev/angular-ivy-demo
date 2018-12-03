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
 * \@description
 *
 * Represents a type that a Component or other object is instances of.
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 *
 * \@publicApi
  @type {?} */
export var Type = Function;
/**
 * @param {?} v
 * @return {?}
 */
export function isType(v) {
    return typeof v === 'function';
}
/** @typedef {?} */
var Mutable;
export { Mutable };
//# sourceMappingURL=type.js.map