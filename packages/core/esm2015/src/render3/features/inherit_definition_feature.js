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
import { fillProperties } from '../../util/property';
import { EMPTY, EMPTY_ARRAY } from '../definition';
/**
 * Determines if a definition is a {\@link ComponentDef} or a {\@link DirectiveDef}
 * @template T
 * @param {?} definition The definition to examine
 * @return {?}
 */
function isComponentDef(definition) {
    /** @type {?} */
    const def = /** @type {?} */ (definition);
    return typeof def.template === 'function';
}
/**
 * @param {?} type
 * @return {?}
 */
function getSuperType(type) {
    return Object.getPrototypeOf(type.prototype).constructor;
}
/**
 * Merges the definition from a super class to a sub class.
 * @param {?} definition The definition that is a SubClass of another directive of component
 * @return {?}
 */
export function InheritDefinitionFeature(definition) {
    /** @type {?} */
    let superType = getSuperType(definition.type);
    while (superType) {
        /** @type {?} */
        let superDef = undefined;
        if (isComponentDef(definition)) {
            // Don't use getComponentDef/getDirectiveDef. This logic relies on inheritance.
            superDef = superType.ngComponentDef || superType.ngDirectiveDef;
        }
        else {
            if (superType.ngComponentDef) {
                throw new Error('Directives cannot inherit Components');
            }
            // Don't use getComponentDef/getDirectiveDef. This logic relies on inheritance.
            superDef = superType.ngDirectiveDef;
        }
        /** @nocollapse @type {?} */
        const baseDef = (/** @type {?} */ (superType)).ngBaseDef;
        // Some fields in the definition may be empty, if there were no values to put in them that
        // would've justified object creation. Unwrap them if necessary.
        if (baseDef || superDef) {
            /** @type {?} */
            const writeableDef = /** @type {?} */ (definition);
            writeableDef.inputs = maybeUnwrapEmpty(definition.inputs);
            writeableDef.declaredInputs = maybeUnwrapEmpty(definition.declaredInputs);
            writeableDef.outputs = maybeUnwrapEmpty(definition.outputs);
        }
        if (baseDef) {
            // Merge inputs and outputs
            fillProperties(definition.inputs, baseDef.inputs);
            fillProperties(definition.declaredInputs, baseDef.declaredInputs);
            fillProperties(definition.outputs, baseDef.outputs);
        }
        if (superDef) {
            /** @type {?} */
            const prevHostBindings = definition.hostBindings;
            /** @type {?} */
            const superHostBindings = superDef.hostBindings;
            if (superHostBindings) {
                if (prevHostBindings) {
                    definition.hostBindings = (rf, ctx, elementIndex) => {
                        superHostBindings(rf, ctx, elementIndex);
                        prevHostBindings(rf, ctx, elementIndex);
                    };
                }
                else {
                    definition.hostBindings = superHostBindings;
                }
            }
            // Merge View Queries
            if (isComponentDef(definition) && isComponentDef(superDef)) {
                /** @type {?} */
                const prevViewQuery = definition.viewQuery;
                /** @type {?} */
                const superViewQuery = superDef.viewQuery;
                if (superViewQuery) {
                    if (prevViewQuery) {
                        definition.viewQuery = (rf, ctx) => {
                            superViewQuery(rf, ctx);
                            prevViewQuery(rf, ctx);
                        };
                    }
                    else {
                        definition.viewQuery = superViewQuery;
                    }
                }
            }
            /** @type {?} */
            const prevContentQueries = definition.contentQueries;
            /** @type {?} */
            const superContentQueries = superDef.contentQueries;
            if (superContentQueries) {
                if (prevContentQueries) {
                    definition.contentQueries = (dirIndex) => {
                        superContentQueries(dirIndex);
                        prevContentQueries(dirIndex);
                    };
                }
                else {
                    definition.contentQueries = superContentQueries;
                }
            }
            /** @type {?} */
            const prevContentQueriesRefresh = definition.contentQueriesRefresh;
            /** @type {?} */
            const superContentQueriesRefresh = superDef.contentQueriesRefresh;
            if (superContentQueriesRefresh) {
                if (prevContentQueriesRefresh) {
                    definition.contentQueriesRefresh = (directiveIndex, queryIndex) => {
                        superContentQueriesRefresh(directiveIndex, queryIndex);
                        prevContentQueriesRefresh(directiveIndex, queryIndex);
                    };
                }
                else {
                    definition.contentQueriesRefresh = superContentQueriesRefresh;
                }
            }
            // Merge inputs and outputs
            fillProperties(definition.inputs, superDef.inputs);
            fillProperties(definition.declaredInputs, superDef.declaredInputs);
            fillProperties(definition.outputs, superDef.outputs);
            // Inherit hooks
            // Assume super class inheritance feature has already run.
            definition.afterContentChecked =
                definition.afterContentChecked || superDef.afterContentChecked;
            definition.afterContentInit = definition.afterContentInit || superDef.afterContentInit;
            definition.afterViewChecked = definition.afterViewChecked || superDef.afterViewChecked;
            definition.afterViewInit = definition.afterViewInit || superDef.afterViewInit;
            definition.doCheck = definition.doCheck || superDef.doCheck;
            definition.onDestroy = definition.onDestroy || superDef.onDestroy;
            definition.onInit = definition.onInit || superDef.onInit;
            /** @type {?} */
            const features = superDef.features;
            if (features) {
                for (const feature of features) {
                    if (feature && feature.ngInherit) {
                        (/** @type {?} */ (feature))(definition);
                    }
                }
            }
            break;
        }
        else {
            /** @type {?} */
            const superPrototype = superType.prototype;
            if (superPrototype) {
                definition.afterContentChecked =
                    definition.afterContentChecked || superPrototype.afterContentChecked;
                definition.afterContentInit =
                    definition.afterContentInit || superPrototype.afterContentInit;
                definition.afterViewChecked =
                    definition.afterViewChecked || superPrototype.afterViewChecked;
                definition.afterViewInit = definition.afterViewInit || superPrototype.afterViewInit;
                definition.doCheck = definition.doCheck || superPrototype.doCheck;
                definition.onDestroy = definition.onDestroy || superPrototype.onDestroy;
                definition.onInit = definition.onInit || superPrototype.onInit;
            }
        }
        superType = Object.getPrototypeOf(superType);
    }
}
/**
 * @param {?} value
 * @return {?}
 */
function maybeUnwrapEmpty(value) {
    if (value === EMPTY) {
        return {};
    }
    else if (value === EMPTY_ARRAY) {
        return [];
    }
    else {
        return value;
    }
}
//# sourceMappingURL=inherit_definition_feature.js.map