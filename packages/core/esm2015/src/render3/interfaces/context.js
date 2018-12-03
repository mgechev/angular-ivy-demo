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
 * This property will be monkey-patched on elements, components and directives
  @type {?} */
export const MONKEY_PATCH_KEY_NAME = '__ngContext__';
/**
 * The internal view context which is specific to a given DOM element, directive or
 * component instance. Each value in here (besides the LView and element node details)
 * can be present, null or undefined. If undefined then it implies the value has not been
 * looked up yet, otherwise, if null, then a lookup was executed and nothing was found.
 *
 * Each value will get filled when the respective value is examined within the getContext
 * function. The component, element and each directive instance will share the same instance
 * of the context.
 * @record
 */
export function LContext() { }
/**
 * The component's parent view data.
 * @type {?}
 */
LContext.prototype.lView;
/**
 * The index instance of the node.
 * @type {?}
 */
LContext.prototype.nodeIndex;
/**
 * The instance of the DOM node that is attached to the lNode.
 * @type {?}
 */
LContext.prototype.native;
/**
 * The instance of the Component node.
 * @type {?}
 */
LContext.prototype.component;
/**
 * The list of active directives that exist on this element.
 * @type {?}
 */
LContext.prototype.directives;
/**
 * The map of local references (local reference name => element or directive instance) that exist
 * on this element.
 * @type {?}
 */
LContext.prototype.localRefs;
//# sourceMappingURL=context.js.map