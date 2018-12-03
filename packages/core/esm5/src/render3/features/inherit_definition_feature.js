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
    var def = /** @type {?} */ (definition);
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
    var superType = getSuperType(definition.type);
    var _loop_1 = function () {
        /** @type {?} */
        var superDef = undefined;
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
        var baseDef = (/** @type {?} */ (superType)).ngBaseDef;
        // Some fields in the definition may be empty, if there were no values to put in them that
        // would've justified object creation. Unwrap them if necessary.
        if (baseDef || superDef) {
            /** @type {?} */
            var writeableDef = /** @type {?} */ (definition);
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
            var prevHostBindings_1 = definition.hostBindings;
            /** @type {?} */
            var superHostBindings_1 = superDef.hostBindings;
            if (superHostBindings_1) {
                if (prevHostBindings_1) {
                    definition.hostBindings = function (rf, ctx, elementIndex) {
                        superHostBindings_1(rf, ctx, elementIndex);
                        prevHostBindings_1(rf, ctx, elementIndex);
                    };
                }
                else {
                    definition.hostBindings = superHostBindings_1;
                }
            }
            // Merge View Queries
            if (isComponentDef(definition) && isComponentDef(superDef)) {
                /** @type {?} */
                var prevViewQuery_1 = definition.viewQuery;
                /** @type {?} */
                var superViewQuery_1 = superDef.viewQuery;
                if (superViewQuery_1) {
                    if (prevViewQuery_1) {
                        definition.viewQuery = function (rf, ctx) {
                            superViewQuery_1(rf, ctx);
                            prevViewQuery_1(rf, ctx);
                        };
                    }
                    else {
                        definition.viewQuery = superViewQuery_1;
                    }
                }
            }
            /** @type {?} */
            var prevContentQueries_1 = definition.contentQueries;
            /** @type {?} */
            var superContentQueries_1 = superDef.contentQueries;
            if (superContentQueries_1) {
                if (prevContentQueries_1) {
                    definition.contentQueries = function (dirIndex) {
                        superContentQueries_1(dirIndex);
                        prevContentQueries_1(dirIndex);
                    };
                }
                else {
                    definition.contentQueries = superContentQueries_1;
                }
            }
            /** @type {?} */
            var prevContentQueriesRefresh_1 = definition.contentQueriesRefresh;
            /** @type {?} */
            var superContentQueriesRefresh_1 = superDef.contentQueriesRefresh;
            if (superContentQueriesRefresh_1) {
                if (prevContentQueriesRefresh_1) {
                    definition.contentQueriesRefresh = function (directiveIndex, queryIndex) {
                        superContentQueriesRefresh_1(directiveIndex, queryIndex);
                        prevContentQueriesRefresh_1(directiveIndex, queryIndex);
                    };
                }
                else {
                    definition.contentQueriesRefresh = superContentQueriesRefresh_1;
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
            var features = superDef.features;
            if (features) {
                for (var _i = 0, features_1 = features; _i < features_1.length; _i++) {
                    var feature = features_1[_i];
                    if (feature && feature.ngInherit) {
                        (/** @type {?} */ (feature))(definition);
                    }
                }
            }
            return "break";
        }
        else {
            /** @type {?} */
            var superPrototype = superType.prototype;
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
    };
    while (superType) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
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