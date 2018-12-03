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
import { SimpleChange } from '../../change_detection/change_detection_util';
/** @type {?} */
var PRIVATE_PREFIX = '__ngOnChanges_';
/** @typedef {?} */
var OnChangesExpando;
/**
 * The NgOnChangesFeature decorates a component with support for the ngOnChanges
 * lifecycle hook, so it should be included in any component that implements
 * that hook.
 *
 * If the component or directive uses inheritance, the NgOnChangesFeature MUST
 * be included as a feature AFTER {\@link InheritDefinitionFeature}, otherwise
 * inherited properties will not be propagated to the ngOnChanges lifecycle
 * hook.
 *
 * Example usage:
 *
 * ```
 * static ngComponentDef = defineComponent({
 *   ...
 *   inputs: {name: 'publicName'},
 *   features: [NgOnChangesFeature]
 * });
 * ```
 * @template T
 * @param {?} definition
 * @return {?}
 */
export function NgOnChangesFeature(definition) {
    /** @type {?} */
    var declaredToMinifiedInputs = definition.declaredInputs;
    /** @type {?} */
    var proto = definition.type.prototype;
    var _loop_1 = function (declaredName) {
        if (declaredToMinifiedInputs.hasOwnProperty(declaredName)) {
            /** @type {?} */
            var minifiedKey = declaredToMinifiedInputs[declaredName];
            /** @type {?} */
            var privateMinKey_1 = PRIVATE_PREFIX + minifiedKey;
            /** @type {?} */
            var originalProperty = undefined;
            /** @type {?} */
            var checkProto = proto;
            while (!originalProperty && checkProto &&
                Object.getPrototypeOf(checkProto) !== Object.getPrototypeOf(Object.prototype)) {
                originalProperty = Object.getOwnPropertyDescriptor(checkProto, minifiedKey);
                checkProto = Object.getPrototypeOf(checkProto);
            }
            /** @type {?} */
            var getter = originalProperty && originalProperty.get;
            /** @type {?} */
            var setter_1 = originalProperty && originalProperty.set;
            // create a getter and setter for property
            Object.defineProperty(proto, minifiedKey, {
                get: getter ||
                    (setter_1 ? undefined : function () { return this[privateMinKey_1]; }),
                set: /**
                 * @template T
                 * @this {?}
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    /** @type {?} */
                    var simpleChanges = this[PRIVATE_PREFIX];
                    if (!simpleChanges) {
                        simpleChanges = {};
                        // Place where we will store SimpleChanges if there is a change
                        Object.defineProperty(this, PRIVATE_PREFIX, { value: simpleChanges, writable: true });
                    }
                    /** @type {?} */
                    var isFirstChange = !this.hasOwnProperty(privateMinKey_1);
                    /** @type {?} */
                    var currentChange = simpleChanges[declaredName];
                    if (currentChange) {
                        currentChange.currentValue = value;
                    }
                    else {
                        simpleChanges[declaredName] =
                            new SimpleChange(this[privateMinKey_1], value, isFirstChange);
                    }
                    if (isFirstChange) {
                        // Create a place where the actual value will be stored and make it non-enumerable
                        Object.defineProperty(this, privateMinKey_1, { value: value, writable: true });
                    }
                    else {
                        this[privateMinKey_1] = value;
                    }
                    if (setter_1)
                        setter_1.call(this, value);
                },
                // Make the property configurable in dev mode to allow overriding in tests
                configurable: !!ngDevMode
            });
        }
    };
    for (var declaredName in declaredToMinifiedInputs) {
        _loop_1(declaredName);
    }
    // If an onInit hook is defined, it will need to wrap the ngOnChanges call
    // so the call order is changes-init-check in creation mode. In subsequent
    // change detection runs, only the check wrapper will be called.
    if (definition.onInit != null) {
        definition.onInit = onChangesWrapper(definition.onInit);
    }
    definition.doCheck = onChangesWrapper(definition.doCheck);
}
// This option ensures that the ngOnChanges lifecycle hook will be inherited
// from superclasses (in InheritDefinitionFeature).
(/** @type {?} */ (NgOnChangesFeature)).ngInherit = true;
/**
 * @param {?} delegateHook
 * @return {?}
 */
function onChangesWrapper(delegateHook) {
    return function () {
        /** @type {?} */
        var simpleChanges = this[PRIVATE_PREFIX];
        if (simpleChanges != null) {
            this.ngOnChanges(simpleChanges);
            this[PRIVATE_PREFIX] = null;
        }
        if (delegateHook)
            delegateHook.apply(this);
    };
}
//# sourceMappingURL=ng_onchanges_feature.js.map