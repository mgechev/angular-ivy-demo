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
import { ReflectionCapabilities } from '../reflection/reflection_capabilities';
import { getClosureSafeProperty } from '../util/property';
import { inject, injectArgs } from './injector_compatibility';
var ɵ0 = getClosureSafeProperty;
/** @type {?} */
var USE_VALUE = getClosureSafeProperty({ provide: String, useValue: ɵ0 });
/** @type {?} */
var EMPTY_ARRAY = [];
/**
 * @param {?} type
 * @param {?=} provider
 * @return {?}
 */
export function convertInjectableProviderToFactory(type, provider) {
    if (!provider) {
        /** @type {?} */
        var reflectionCapabilities = new ReflectionCapabilities();
        /** @type {?} */
        var deps_1 = reflectionCapabilities.parameters(type);
        // TODO - convert to flags.
        return function () { return new (type.bind.apply(type, [void 0].concat(injectArgs(/** @type {?} */ (deps_1)))))(); };
    }
    if (USE_VALUE in provider) {
        /** @type {?} */
        var valueProvider_1 = (/** @type {?} */ (provider));
        return function () { return valueProvider_1.useValue; };
    }
    else if ((/** @type {?} */ (provider)).useExisting) {
        /** @type {?} */
        var existingProvider_1 = (/** @type {?} */ (provider));
        return function () { return inject(existingProvider_1.useExisting); };
    }
    else if ((/** @type {?} */ (provider)).useFactory) {
        /** @type {?} */
        var factoryProvider_1 = (/** @type {?} */ (provider));
        return function () { return factoryProvider_1.useFactory.apply(factoryProvider_1, injectArgs(factoryProvider_1.deps || EMPTY_ARRAY)); };
    }
    else if ((/** @type {?} */ (provider)).useClass) {
        /** @type {?} */
        var classProvider_1 = (/** @type {?} */ (provider));
        /** @type {?} */
        var deps_2 = (/** @type {?} */ (provider)).deps;
        if (!deps_2) {
            /** @type {?} */
            var reflectionCapabilities = new ReflectionCapabilities();
            deps_2 = reflectionCapabilities.parameters(type);
        }
        return function () {
            var _a;
            return new ((_a = classProvider_1.useClass).bind.apply(_a, [void 0].concat(injectArgs(deps_2))))();
        };
    }
    else {
        /** @type {?} */
        var deps_3 = (/** @type {?} */ (provider)).deps;
        if (!deps_3) {
            /** @type {?} */
            var reflectionCapabilities = new ReflectionCapabilities();
            deps_3 = reflectionCapabilities.parameters(type);
        }
        return function () { return new (type.bind.apply(type, [void 0].concat(injectArgs(/** @type {?} */ ((deps_3))))))(); };
    }
}
export { ɵ0 };
//# sourceMappingURL=util.js.map