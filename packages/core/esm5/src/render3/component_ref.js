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
import * as tslib_1 from "tslib";
import { InjectionToken } from '../di/injection_token';
import { inject } from '../di/injector_compatibility';
import { ComponentFactory as viewEngine_ComponentFactory, ComponentRef as viewEngine_ComponentRef } from '../linker/component_factory';
import { ComponentFactoryResolver as viewEngine_ComponentFactoryResolver } from '../linker/component_factory_resolver';
import { ElementRef as viewEngine_ElementRef } from '../linker/element_ref';
import { RendererFactory2 } from '../render/api';
import { Sanitizer } from '../sanitization/security';
import { VERSION } from '../version';
import { assertComponentType, assertDefined } from './assert';
import { LifecycleHooksFeature, createRootComponent, createRootComponentView, createRootContext } from './component';
import { getComponentDef } from './definition';
import { NodeInjector } from './di';
import { createLView, createNodeAtIndex, createTView, createViewNode, elementCreate, locateHostElement, refreshDescendantViews } from './instructions';
import { domRendererFactory3, isProceduralRenderer } from './interfaces/renderer';
import { HEADER_OFFSET, TVIEW } from './interfaces/view';
import { enterView, leaveView } from './state';
import { defaultScheduler, getTNode } from './util';
import { createElementRef } from './view_engine_compatibility';
import { RootViewRef } from './view_ref';
var ComponentFactoryResolver = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentFactoryResolver, _super);
    function ComponentFactoryResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    ComponentFactoryResolver.prototype.resolveComponentFactory = /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) {
        ngDevMode && assertComponentType(component);
        /** @type {?} */
        var componentDef = /** @type {?} */ ((getComponentDef(component)));
        return new ComponentFactory(componentDef);
    };
    return ComponentFactoryResolver;
}(viewEngine_ComponentFactoryResolver));
export { ComponentFactoryResolver };
/**
 * @param {?} map
 * @return {?}
 */
function toRefArray(map) {
    /** @type {?} */
    var array = [];
    for (var nonMinified in map) {
        if (map.hasOwnProperty(nonMinified)) {
            /** @type {?} */
            var minified = map[nonMinified];
            array.push({ propName: minified, templateName: nonMinified });
        }
    }
    return array;
}
/** *
 * Default {\@link RootContext} for all components rendered with {\@link renderComponent}.
  @type {?} */
export var ROOT_CONTEXT = new InjectionToken('ROOT_CONTEXT_TOKEN', { providedIn: 'root', factory: function () { return createRootContext(inject(SCHEDULER)); } });
/** *
 * A change detection scheduler token for {\@link RootContext}. This token is the default value used
 * for the default `RootContext` found in the {\@link ROOT_CONTEXT} token.
  @type {?} */
export var SCHEDULER = new InjectionToken('SCHEDULER_TOKEN', {
    providedIn: 'root',
    factory: function () { return defaultScheduler; },
});
/** @type {?} */
var NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {};
/**
 * @param {?} rootViewInjector
 * @param {?} moduleInjector
 * @return {?}
 */
function createChainedInjector(rootViewInjector, moduleInjector) {
    return {
        get: function (token, notFoundValue) {
            /** @type {?} */
            var value = rootViewInjector.get(token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR);
            if (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) {
                // Return the value from the root element injector when
                // - it provides it
                //   (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
                return value;
            }
            return moduleInjector.get(token, notFoundValue);
        }
    };
}
/**
 * Render3 implementation of {\@link viewEngine_ComponentFactory}.
 * @template T
 */
var /**
 * Render3 implementation of {\@link viewEngine_ComponentFactory}.
 * @template T
 */
ComponentFactory = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentFactory, _super);
    function ComponentFactory(componentDef) {
        var _this = _super.call(this) || this;
        _this.componentDef = componentDef;
        _this.componentType = componentDef.type;
        _this.selector = /** @type {?} */ (componentDef.selectors[0][0]);
        _this.ngContentSelectors = [];
        return _this;
    }
    Object.defineProperty(ComponentFactory.prototype, "inputs", {
        get: /**
         * @return {?}
         */
        function () {
            return toRefArray(this.componentDef.inputs);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentFactory.prototype, "outputs", {
        get: /**
         * @return {?}
         */
        function () {
            return toRefArray(this.componentDef.outputs);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @param {?=} ngModule
     * @return {?}
     */
    ComponentFactory.prototype.create = /**
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @param {?=} ngModule
     * @return {?}
     */
    function (injector, projectableNodes, rootSelectorOrNode, ngModule) {
        /** @type {?} */
        var isInternalRootView = rootSelectorOrNode === undefined;
        /** @type {?} */
        var rendererFactory;
        /** @type {?} */
        var sanitizer = null;
        if (ngModule) {
            rendererFactory = /** @type {?} */ (ngModule.injector.get(RendererFactory2));
            sanitizer = ngModule.injector.get(Sanitizer, null);
        }
        else {
            rendererFactory = domRendererFactory3;
        }
        /** @type {?} */
        var hostRNode = isInternalRootView ?
            elementCreate(this.selector, rendererFactory.createRenderer(null, this.componentDef)) :
            locateHostElement(rendererFactory, rootSelectorOrNode);
        /** @type {?} */
        var rootFlags = this.componentDef.onPush ? 4 /* Dirty */ | 64 /* IsRoot */ :
            2 /* CheckAlways */ | 64 /* IsRoot */;
        /** @type {?} */
        var rootContext = ngModule && !isInternalRootView ? ngModule.injector.get(ROOT_CONTEXT) : createRootContext();
        /** @type {?} */
        var renderer = rendererFactory.createRenderer(hostRNode, this.componentDef);
        /** @type {?} */
        var rootViewInjector = ngModule ? createChainedInjector(injector, ngModule.injector) : injector;
        if (rootSelectorOrNode && hostRNode) {
            ngDevMode && ngDevMode.rendererSetAttribute++;
            isProceduralRenderer(renderer) ?
                renderer.setAttribute(hostRNode, 'ng-version', VERSION.full) :
                hostRNode.setAttribute('ng-version', VERSION.full);
        }
        /** @type {?} */
        var rootLView = createLView(null, createTView(-1, null, 1, 0, null, null, null), rootContext, rootFlags, rendererFactory, renderer, sanitizer, rootViewInjector);
        /** @type {?} */
        var oldLView = enterView(rootLView, null);
        /** @type {?} */
        var component;
        /** @type {?} */
        var tElementNode;
        try {
            if (rendererFactory.begin)
                rendererFactory.begin();
            /** @type {?} */
            var componentView = createRootComponentView(hostRNode, this.componentDef, rootLView, rendererFactory, renderer);
            tElementNode = /** @type {?} */ (getTNode(0, rootLView));
            // Transform the arrays of native nodes into a structure that can be consumed by the
            // projection instruction. This is needed to support the reprojection of these nodes.
            if (projectableNodes) {
                /** @type {?} */
                var index = 0;
                /** @type {?} */
                var tView = rootLView[TVIEW];
                /** @type {?} */
                var projection = tElementNode.projection = [];
                for (var i = 0; i < projectableNodes.length; i++) {
                    /** @type {?} */
                    var nodeList = projectableNodes[i];
                    /** @type {?} */
                    var firstTNode = null;
                    /** @type {?} */
                    var previousTNode = null;
                    for (var j = 0; j < nodeList.length; j++) {
                        if (tView.firstTemplatePass) {
                            // For dynamically created components such as ComponentRef, we create a new TView for
                            // each insert. This is not ideal since we should be sharing the TViews.
                            // Also the logic here should be shared with `component.ts`'s `renderComponent`
                            // method.
                            tView.expandoStartIndex++;
                            tView.blueprint.splice(++index + HEADER_OFFSET, 0, null);
                            tView.data.splice(index + HEADER_OFFSET, 0, null);
                            rootLView.splice(index + HEADER_OFFSET, 0, null);
                        }
                        /** @type {?} */
                        var tNode = createNodeAtIndex(index, 3 /* Element */, /** @type {?} */ (nodeList[j]), null, null);
                        previousTNode ? (previousTNode.next = tNode) : (firstTNode = tNode);
                        previousTNode = tNode;
                    }
                    projection.push(/** @type {?} */ ((firstTNode)));
                }
            }
            // TODO: should LifecycleHooksFeature and other host features be generated by the compiler and
            // executed here?
            // Angular 5 reference: https://stackblitz.com/edit/lifecycle-hooks-vcref
            component = createRootComponent(componentView, this.componentDef, rootLView, rootContext, [LifecycleHooksFeature]);
            refreshDescendantViews(rootLView, 1 /* Create */);
        }
        finally {
            leaveView(oldLView, true);
            if (rendererFactory.end)
                rendererFactory.end();
        }
        /** @type {?} */
        var componentRef = new ComponentRef(this.componentType, component, createElementRef(viewEngine_ElementRef, tElementNode, rootLView), rootLView, tElementNode);
        if (isInternalRootView) {
            /** @type {?} */ ((
            // The host element of the internal root view is attached to the component's host view node
            componentRef.hostView._tViewNode)).child = tElementNode;
        }
        return componentRef;
    };
    return ComponentFactory;
}(viewEngine_ComponentFactory));
/**
 * Render3 implementation of {\@link viewEngine_ComponentFactory}.
 * @template T
 */
export { ComponentFactory };
if (false) {
    /** @type {?} */
    ComponentFactory.prototype.selector;
    /** @type {?} */
    ComponentFactory.prototype.componentType;
    /** @type {?} */
    ComponentFactory.prototype.ngContentSelectors;
    /** @type {?} */
    ComponentFactory.prototype.componentDef;
}
/** @type {?} */
var componentFactoryResolver = new ComponentFactoryResolver();
/**
 * Creates a ComponentFactoryResolver and stores it on the injector. Or, if the
 * ComponentFactoryResolver
 * already exists, retrieves the existing ComponentFactoryResolver.
 *
 * @return {?} The ComponentFactoryResolver instance to use
 */
export function injectComponentFactoryResolver() {
    return componentFactoryResolver;
}
/**
 * Represents an instance of a Component created via a {\@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {\@link #destroy}
 * method.
 *
 * @template T
 */
var /**
 * Represents an instance of a Component created via a {\@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {\@link #destroy}
 * method.
 *
 * @template T
 */
ComponentRef = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentRef, _super);
    function ComponentRef(componentType, instance, location, _rootLView, _tNode) {
        var _this = _super.call(this) || this;
        _this.location = location;
        _this._rootLView = _rootLView;
        _this._tNode = _tNode;
        _this.destroyCbs = [];
        _this.instance = instance;
        _this.hostView = _this.changeDetectorRef = new RootViewRef(_rootLView);
        _this.hostView._tViewNode = createViewNode(-1, _rootLView);
        _this.componentType = componentType;
        return _this;
    }
    Object.defineProperty(ComponentRef.prototype, "injector", {
        get: /**
         * @return {?}
         */
        function () { return new NodeInjector(this._tNode, this._rootLView); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ComponentRef.prototype.destroy = /**
     * @return {?}
     */
    function () {
        ngDevMode && assertDefined(this.destroyCbs, 'NgModule already destroyed'); /** @type {?} */
        ((this.destroyCbs)).forEach(function (fn) { return fn(); });
        this.destroyCbs = null;
        this.hostView.destroy();
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    ComponentRef.prototype.onDestroy = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        ngDevMode && assertDefined(this.destroyCbs, 'NgModule already destroyed'); /** @type {?} */
        ((this.destroyCbs)).push(callback);
    };
    return ComponentRef;
}(viewEngine_ComponentRef));
/**
 * Represents an instance of a Component created via a {\@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {\@link #destroy}
 * method.
 *
 * @template T
 */
export { ComponentRef };
if (false) {
    /** @type {?} */
    ComponentRef.prototype.destroyCbs;
    /** @type {?} */
    ComponentRef.prototype.instance;
    /** @type {?} */
    ComponentRef.prototype.hostView;
    /** @type {?} */
    ComponentRef.prototype.changeDetectorRef;
    /** @type {?} */
    ComponentRef.prototype.componentType;
    /** @type {?} */
    ComponentRef.prototype.location;
    /** @type {?} */
    ComponentRef.prototype._rootLView;
    /** @type {?} */
    ComponentRef.prototype._tNode;
}
//# sourceMappingURL=component_ref.js.map