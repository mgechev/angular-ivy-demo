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
import { compileInjectable as render3CompileInjectable } from '../render3/jit/injectable';
import { makeDecorator } from '../util/decorators';
import { defineInjectable, getInjectableDef } from './defs';
import { convertInjectableProviderToFactory } from './util';
/** @typedef {?} */
var InjectableProvider;
export { InjectableProvider };
/**
 * Type of the Injectable decorator / constructor function.
 *
 * \@publicApi
 * @record
 */
export function InjectableDecorator() { }
/** *
 * Injectable decorator and metadata.
 *
 * \@Annotation
 * \@publicApi
  @type {?} */
export const Injectable = makeDecorator('Injectable', undefined, undefined, undefined, (type, meta) => SWITCH_COMPILE_INJECTABLE(/** @type {?} */ (type), meta));
/**
 * Type representing injectable service.
 *
 * \@publicApi
 * @record
 * @template T
 */
export function InjectableType() { }
/** @type {?} */
InjectableType.prototype.ngInjectableDef;
/**
 * Supports \@Injectable() in JIT mode for Render2.
 * @param {?} injectableType
 * @param {?} options
 * @return {?}
 */
function render2CompileInjectable(injectableType, options) {
    if (options && options.providedIn !== undefined && !getInjectableDef(injectableType)) {
        /** @nocollapse */ injectableType.ngInjectableDef = defineInjectable({
            providedIn: options.providedIn,
            factory: convertInjectableProviderToFactory(injectableType, options),
        });
    }
}
/** @type {?} */
export const SWITCH_COMPILE_INJECTABLE__POST_R3__ = render3CompileInjectable;
/** @type {?} */
const SWITCH_COMPILE_INJECTABLE__PRE_R3__ = render2CompileInjectable;
/** @type {?} */
const SWITCH_COMPILE_INJECTABLE = SWITCH_COMPILE_INJECTABLE__PRE_R3__;
//# sourceMappingURL=injectable.js.map