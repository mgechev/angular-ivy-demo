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
 * @record
 */
function TypeWithMetadata() { }
/** @type {?|undefined} */
TypeWithMetadata.prototype.decorators;
/** @type {?|undefined} */
TypeWithMetadata.prototype.ctorParameters;
/** @type {?|undefined} */
TypeWithMetadata.prototype.propDecorators;
/**
 * Adds decorator, constructor, and property metadata to a given type via static metadata fields
 * on the type.
 *
 * These metadata fields can later be read with Angular's `ReflectionCapabilities` API.
 *
 * Calls to `setClassMetadata` can be marked as pure, resulting in the metadata assignments being
 * tree-shaken away during production builds.
 * @param {?} type
 * @param {?} decorators
 * @param {?} ctorParameters
 * @param {?} propDecorators
 * @return {?}
 */
export function setClassMetadata(type, decorators, ctorParameters, propDecorators) {
    /** @type {?} */
    const clazz = /** @type {?} */ (type);
    if (decorators !== null) {
        if (clazz.decorators !== undefined) {
            clazz.decorators.push(...decorators);
        }
        else {
            clazz.decorators = decorators;
        }
    }
    if (ctorParameters !== null) {
        // Rather than merging, clobber the existing parameters. If other projects exist which use
        // tsickle-style annotations and reflect over them in the same way, this could cause issues,
        // but that is vanishingly unlikely.
        clazz.ctorParameters = ctorParameters;
    }
    if (propDecorators !== null) {
        // The property decorator objects are merged as it is possible different fields have different
        // decorator types. Decorators on individual fields are not merged, as it's also incredibly
        // unlikely that a field will be decorated both with an Angular decorator and a non-Angular
        // decorator that's also been downleveled.
        if (clazz.propDecorators !== undefined) {
            clazz.propDecorators = Object.assign({}, clazz.propDecorators, propDecorators);
        }
        else {
            clazz.propDecorators = propDecorators;
        }
    }
}
//# sourceMappingURL=metadata.js.map