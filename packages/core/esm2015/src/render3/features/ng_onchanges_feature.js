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
const PRIVATE_PREFIX = '__ngOnChanges_';
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
    const declaredToMinifiedInputs = definition.declaredInputs;
    /** @type {?} */
    const proto = definition.type.prototype;
    for (const declaredName in declaredToMinifiedInputs) {
        if (declaredToMinifiedInputs.hasOwnProperty(declaredName)) {
            /** @type {?} */
            const minifiedKey = declaredToMinifiedInputs[declaredName];
            /** @type {?} */
            const privateMinKey = PRIVATE_PREFIX + minifiedKey;
            /** @type {?} */
            let originalProperty = undefined;
            /** @type {?} */
            let checkProto = proto;
            while (!originalProperty && checkProto &&
                Object.getPrototypeOf(checkProto) !== Object.getPrototypeOf(Object.prototype)) {
                originalProperty = Object.getOwnPropertyDescriptor(checkProto, minifiedKey);
                checkProto = Object.getPrototypeOf(checkProto);
            }
            /** @type {?} */
            const getter = originalProperty && originalProperty.get;
            /** @type {?} */
            const setter = originalProperty && originalProperty.set;
            // create a getter and setter for property
            Object.defineProperty(proto, minifiedKey, {
                get: getter ||
                    (setter ? undefined : function () { return this[privateMinKey]; }),
                /**
                 * @template T
                 * @this {?}
                 * @param {?} value
                 * @return {?}
                 */
                set(value) {
                    /** @type {?} */
                    let simpleChanges = this[PRIVATE_PREFIX];
                    if (!simpleChanges) {
                        simpleChanges = {};
                        // Place where we will store SimpleChanges if there is a change
                        Object.defineProperty(this, PRIVATE_PREFIX, { value: simpleChanges, writable: true });
                    }
                    /** @type {?} */
                    const isFirstChange = !this.hasOwnProperty(privateMinKey);
                    /** @type {?} */
                    const currentChange = simpleChanges[declaredName];
                    if (currentChange) {
                        currentChange.currentValue = value;
                    }
                    else {
                        simpleChanges[declaredName] =
                            new SimpleChange(this[privateMinKey], value, isFirstChange);
                    }
                    if (isFirstChange) {
                        // Create a place where the actual value will be stored and make it non-enumerable
                        Object.defineProperty(this, privateMinKey, { value, writable: true });
                    }
                    else {
                        this[privateMinKey] = value;
                    }
                    if (setter)
                        setter.call(this, value);
                },
                // Make the property configurable in dev mode to allow overriding in tests
                configurable: !!ngDevMode
            });
        }
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
        const simpleChanges = this[PRIVATE_PREFIX];
        if (simpleChanges != null) {
            this.ngOnChanges(simpleChanges);
            this[PRIVATE_PREFIX] = null;
        }
        if (delegateHook)
            delegateHook.apply(this);
    };
}
//# sourceMappingURL=ng_onchanges_feature.js.map