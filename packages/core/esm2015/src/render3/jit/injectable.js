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
import { getClosureSafeProperty } from '../../util/property';
import { NG_INJECTABLE_DEF } from '../fields';
import { getCompilerFacade } from './compiler_facade';
import { angularCoreEnv } from './environment';
import { convertDependencies, reflectDependencies } from './util';
/**
 * Compile an Angular injectable according to its `Injectable` metadata, and patch the resulting
 * `ngInjectableDef` onto the injectable type.
 * @param {?} type
 * @param {?=} srcMeta
 * @return {?}
 */
export function compileInjectable(type, srcMeta) {
    /** @type {?} */
    const meta = srcMeta || { providedIn: null };
    /** @type {?} */
    let def = null;
    // if NG_INJECTABLE_DEF is already defined on this class then don't overwrite it
    if (type.hasOwnProperty(NG_INJECTABLE_DEF))
        return;
    Object.defineProperty(type, NG_INJECTABLE_DEF, {
        get: () => {
            if (def === null) {
                /** @type {?} */
                const meta = srcMeta || { providedIn: null };
                /** @type {?} */
                const hasAProvider = isUseClassProvider(meta) || isUseFactoryProvider(meta) ||
                    isUseValueProvider(meta) || isUseExistingProvider(meta);
                /** @type {?} */
                const compilerMeta = {
                    name: type.name,
                    type: type,
                    providedIn: meta.providedIn,
                    ctorDeps: reflectDependencies(type),
                    userDeps: undefined
                };
                if ((isUseClassProvider(meta) || isUseFactoryProvider(meta)) && meta.deps !== undefined) {
                    compilerMeta.userDeps = convertDependencies(meta.deps);
                }
                if (!hasAProvider) {
                    // In the case the user specifies a type provider, treat it as {provide: X, useClass: X}.
                    // The deps will have been reflected above, causing the factory to create the class by
                    // calling
                    // its constructor with injected deps.
                    compilerMeta.useClass = type;
                }
                else if (isUseClassProvider(meta)) {
                    // The user explicitly specified useClass, and may or may not have provided deps.
                    compilerMeta.useClass = meta.useClass;
                }
                else if (isUseValueProvider(meta)) {
                    // The user explicitly specified useValue.
                    compilerMeta.useValue = meta.useValue;
                }
                else if (isUseFactoryProvider(meta)) {
                    // The user explicitly specified useFactory.
                    compilerMeta.useFactory = meta.useFactory;
                }
                else if (isUseExistingProvider(meta)) {
                    // The user explicitly specified useExisting.
                    compilerMeta.useExisting = meta.useExisting;
                }
                else {
                    // Can't happen - either hasAProvider will be false, or one of the providers will be set.
                    throw new Error(`Unreachable state.`);
                }
                def = getCompilerFacade().compileInjectable(angularCoreEnv, `ng://${type.name}/ngInjectableDef.js`, compilerMeta);
            }
            return def;
        },
    });
}
/** @typedef {?} */
var UseClassProvider;
const ɵ0 = getClosureSafeProperty;
/** @type {?} */
const USE_VALUE = getClosureSafeProperty({ provide: String, useValue: ɵ0 });
/**
 * @param {?} meta
 * @return {?}
 */
function isUseClassProvider(meta) {
    return (/** @type {?} */ (meta)).useClass !== undefined;
}
/**
 * @param {?} meta
 * @return {?}
 */
function isUseValueProvider(meta) {
    return USE_VALUE in meta;
}
/**
 * @param {?} meta
 * @return {?}
 */
function isUseFactoryProvider(meta) {
    return (/** @type {?} */ (meta)).useFactory !== undefined;
}
/**
 * @param {?} meta
 * @return {?}
 */
function isUseExistingProvider(meta) {
    return (/** @type {?} */ (meta)).useExisting !== undefined;
}
export { ɵ0 };
//# sourceMappingURL=injectable.js.map