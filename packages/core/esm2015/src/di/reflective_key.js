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
import { stringify } from '../util';
import { resolveForwardRef } from './forward_ref';
/**
 * A unique object used for retrieving items from the {\@link ReflectiveInjector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`.
 *
 * `Key` is used internally by {\@link ReflectiveInjector} because its system-wide unique `id` allows
 * the
 * injector to store created objects in a more efficient way.
 *
 * `Key` should not be created directly. {\@link ReflectiveInjector} creates keys automatically when
 * resolving
 * providers.
 *
 * @deprecated No replacement
 * \@publicApi
 */
export class ReflectiveKey {
    /**
     * Private
     * @param {?} token
     * @param {?} id
     */
    constructor(token, id) {
        this.token = token;
        this.id = id;
        if (!token) {
            throw new Error('Token must be defined!');
        }
        this.displayName = stringify(this.token);
    }
    /**
     * Retrieves a `Key` for a token.
     * @param {?} token
     * @return {?}
     */
    static get(token) {
        return _globalKeyRegistry.get(resolveForwardRef(token));
    }
    /**
     * @return {?} the number of keys registered in the system.
     */
    static get numberOfKeys() { return _globalKeyRegistry.numberOfKeys; }
}
if (false) {
    /** @type {?} */
    ReflectiveKey.prototype.displayName;
    /** @type {?} */
    ReflectiveKey.prototype.token;
    /** @type {?} */
    ReflectiveKey.prototype.id;
}
export class KeyRegistry {
    constructor() {
        this._allKeys = new Map();
    }
    /**
     * @param {?} token
     * @return {?}
     */
    get(token) {
        if (token instanceof ReflectiveKey)
            return token;
        if (this._allKeys.has(token)) {
            return /** @type {?} */ ((this._allKeys.get(token)));
        }
        /** @type {?} */
        const newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
        this._allKeys.set(token, newKey);
        return newKey;
    }
    /**
     * @return {?}
     */
    get numberOfKeys() { return this._allKeys.size; }
}
if (false) {
    /** @type {?} */
    KeyRegistry.prototype._allKeys;
}
/** @type {?} */
const _globalKeyRegistry = new KeyRegistry();
//# sourceMappingURL=reflective_key.js.map