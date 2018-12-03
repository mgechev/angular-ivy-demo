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
import { injectViewContainerRef as render3InjectViewContainerRef } from '../render3/view_engine_compatibility';
import { noop } from '../util/noop';
import { ElementRef } from './element_ref';
/**
 * Represents a container where one or more views can be attached to a component.
 *
 * Can contain *host views* (created by instantiating a
 * component with the `createComponent()` method), and *embedded views*
 * (created by instantiating a `TemplateRef` with the `createEmbeddedView()` method).
 *
 * A view container instance can contain other view containers,
 * creating a [view hierarchy](guide/glossary#view-tree).
 *
 * @see `ComponentRef`
 * @see `EmbeddedViewRef`
 *
 * \@publicApi
 * @abstract
 */
export class ViewContainerRef {
}
/**
 * \@internal
 */
ViewContainerRef.__NG_ELEMENT_ID__ = () => SWITCH_VIEW_CONTAINER_REF_FACTORY(ViewContainerRef, ElementRef);
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    ViewContainerRef.__NG_ELEMENT_ID__;
    /**
     * Anchor element that specifies the location of this container in the containing view.
     * Each view container can have only one anchor element, and each anchor element
     * can have only a single view container.
     *
     * Root elements of views attached to this container become siblings of the anchor element in
     * the rendered view.
     *
     * Access the `ViewContainerRef` of an element by placing a `Directive` injected
     * with `ViewContainerRef` on the element, or use a `ViewChild` query.
     *
     * <!-- TODO: rename to anchorElement -->
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.element = function () { };
    /**
     * The [dependency injector](guide/glossary#injector) for this view container.
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.injector = function () { };
    /**
     * @deprecated No replacement
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.parentInjector = function () { };
    /**
     * Destroys all views in this container.
     * @abstract
     * @return {?}
     */
    ViewContainerRef.prototype.clear = function () { };
    /**
     * Retrieves a view from this container.
     * @abstract
     * @param {?} index The 0-based index of the view to retrieve.
     * @return {?} The `ViewRef` instance, or null if the index is out of range.
     */
    ViewContainerRef.prototype.get = function (index) { };
    /**
     * Reports how many views are currently attached to this container.
     * @abstract
     * @return {?} The number of views.
     */
    ViewContainerRef.prototype.length = function () { };
    /**
     * Instantiates an embedded view and inserts it
     * into this container.
     * @abstract
     * @template C
     * @param {?} templateRef The HTML template that defines the view.
     * @param {?=} context
     * @param {?=} index The 0-based index at which to insert the new view into this container.
     * If not specified, appends the new view as the last entry.
     *
     * @return {?} The `ViewRef` instance for the newly created view.
     */
    ViewContainerRef.prototype.createEmbeddedView = function (templateRef, context, index) { };
    /**
     * Instantiates a single component and inserts its host view into this container.
     *
     * @abstract
     * @template C
     * @param {?} componentFactory The factory to use.
     * @param {?=} index The index at which to insert the new component's host view into this container.
     * If not specified, appends the new view as the last entry.
     * @param {?=} injector The injector to use as the parent for the new component.
     * @param {?=} projectableNodes
     * @param {?=} ngModule
     *
     * @return {?} The new component instance, containing the host view.
     *
     */
    ViewContainerRef.prototype.createComponent = function (componentFactory, index, injector, projectableNodes, ngModule) { };
    /**
     * Inserts a view into this container.
     * @abstract
     * @param {?} viewRef The view to insert.
     * @param {?=} index The 0-based index at which to insert the view.
     * If not specified, appends the new view as the last entry.
     * @return {?} The inserted `ViewRef` instance.
     *
     */
    ViewContainerRef.prototype.insert = function (viewRef, index) { };
    /**
     * Moves a view to a new location in this container.
     * @abstract
     * @param {?} viewRef The view to move.
     * @param {?} currentIndex
     * @return {?} The moved `ViewRef` instance.
     */
    ViewContainerRef.prototype.move = function (viewRef, currentIndex) { };
    /**
     * Returns the index of a view within the current container.
     * @abstract
     * @param {?} viewRef The view to query.
     * @return {?} The 0-based index of the view's position in this container,
     * or `-1` if this container doesn't contain the view.
     */
    ViewContainerRef.prototype.indexOf = function (viewRef) { };
    /**
     * Destroys a view attached to this container
     * @abstract
     * @param {?=} index The 0-based index of the view to destroy.
     * If not specified, the last view in the container is removed.
     * @return {?}
     */
    ViewContainerRef.prototype.remove = function (index) { };
    /**
     * Detaches a view from this container without destroying it.
     * Use along with `insert()` to move a view within the current container.
     * @abstract
     * @param {?=} index The 0-based index of the view to detach.
     * If not specified, the last view in the container is detached.
     * @return {?}
     */
    ViewContainerRef.prototype.detach = function (index) { };
}
/** @type {?} */
export const SWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ = render3InjectViewContainerRef;
/** @type {?} */
const SWITCH_VIEW_CONTAINER_REF_FACTORY__PRE_R3__ = noop;
/** @type {?} */
const SWITCH_VIEW_CONTAINER_REF_FACTORY = SWITCH_VIEW_CONTAINER_REF_FACTORY__PRE_R3__;
//# sourceMappingURL=view_container_ref.js.map