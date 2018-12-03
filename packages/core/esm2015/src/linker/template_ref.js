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
import { injectTemplateRef as render3InjectTemplateRef } from '../render3/view_engine_compatibility';
import { noop } from '../util/noop';
import { ElementRef } from './element_ref';
/**
 * Represents an embedded template that can be used to instantiate embedded views.
 * To instantiate embedded views based on a template, use the `ViewContainerRef`
 * method `createEmbeddedView()`.
 *
 * Access a `TemplateRef` instance by placing a directive on an `<ng-template>`
 * element (or directive prefixed with `*`). The `TemplateRef` for the embedded view
 * is injected into the constructor of the directive,
 * using the `TemplateRef` token.
 *
 * You can also use a `Query` to find a `TemplateRef` associated with
 * a component or a directive.
 *
 * @see `ViewContainerRef`
 * @see [Navigate the Component Tree with DI](guide/dependency-injection-navtree)
 *
 * \@publicApi
 * @abstract
 * @template C
 */
export class TemplateRef {
}
/**
 * \@internal
 */
TemplateRef.__NG_ELEMENT_ID__ = () => SWITCH_TEMPLATE_REF_FACTORY(TemplateRef, ElementRef);
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    TemplateRef.__NG_ELEMENT_ID__;
    /**
     * The anchor element in the parent view for this embedded view.
     *
     * The data-binding and injection contexts of embedded views created from this `TemplateRef`
     * inherit from the contexts of this location.
     *
     * Typically new embedded views are attached to the view container of this location, but in
     * advanced use-cases, the view can be attached to a different container while keeping the
     * data-binding and injection context from the original location.
     *
     * @abstract
     * @return {?}
     */
    TemplateRef.prototype.elementRef = function () { };
    /**
     * Creates a view object and attaches it to the view container of the parent view.
     * @abstract
     * @param {?} context The context for the new view, inherited from the anchor element.
     * @return {?} The new view object.
     */
    TemplateRef.prototype.createEmbeddedView = function (context) { };
}
/** @type {?} */
export const SWITCH_TEMPLATE_REF_FACTORY__POST_R3__ = render3InjectTemplateRef;
/** @type {?} */
const SWITCH_TEMPLATE_REF_FACTORY__PRE_R3__ = noop;
/** @type {?} */
const SWITCH_TEMPLATE_REF_FACTORY = SWITCH_TEMPLATE_REF_FACTORY__PRE_R3__;
//# sourceMappingURL=template_ref.js.map