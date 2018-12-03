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
import { stringify } from '../util';
import { ComponentFactory } from './component_factory';
/**
 * @param {?} component
 * @return {?}
 */
export function noComponentFactoryError(component) {
    /** @type {?} */
    var error = Error("No component factory found for " + stringify(component) + ". Did you add it to @NgModule.entryComponents?");
    (/** @type {?} */ (error))[ERROR_COMPONENT] = component;
    return error;
}
/** @type {?} */
var ERROR_COMPONENT = 'ngComponent';
/**
 * @param {?} error
 * @return {?}
 */
export function getComponent(error) {
    return (/** @type {?} */ (error))[ERROR_COMPONENT];
}
var _NullComponentFactoryResolver = /** @class */ (function () {
    function _NullComponentFactoryResolver() {
    }
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    _NullComponentFactoryResolver.prototype.resolveComponentFactory = /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) {
        throw noComponentFactoryError(component);
    };
    return _NullComponentFactoryResolver;
}());
/**
 * \@publicApi
 * @abstract
 */
var ComponentFactoryResolver = /** @class */ (function () {
    function ComponentFactoryResolver() {
    }
    ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver();
    return ComponentFactoryResolver;
}());
export { ComponentFactoryResolver };
if (false) {
    /** @type {?} */
    ComponentFactoryResolver.NULL;
    /**
     * @abstract
     * @template T
     * @param {?} component
     * @return {?}
     */
    ComponentFactoryResolver.prototype.resolveComponentFactory = function (component) { };
}
var CodegenComponentFactoryResolver = /** @class */ (function () {
    function CodegenComponentFactoryResolver(factories, _parent, _ngModule) {
        this._parent = _parent;
        this._ngModule = _ngModule;
        this._factories = new Map();
        for (var i = 0; i < factories.length; i++) {
            /** @type {?} */
            var factory = factories[i];
            this._factories.set(factory.componentType, factory);
        }
    }
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    CodegenComponentFactoryResolver.prototype.resolveComponentFactory = /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) {
        /** @type {?} */
        var factory = this._factories.get(component);
        if (!factory && this._parent) {
            factory = this._parent.resolveComponentFactory(component);
        }
        if (!factory) {
            throw noComponentFactoryError(component);
        }
        return new ComponentFactoryBoundToModule(factory, this._ngModule);
    };
    return CodegenComponentFactoryResolver;
}());
export { CodegenComponentFactoryResolver };
if (false) {
    /** @type {?} */
    CodegenComponentFactoryResolver.prototype._factories;
    /** @type {?} */
    CodegenComponentFactoryResolver.prototype._parent;
    /** @type {?} */
    CodegenComponentFactoryResolver.prototype._ngModule;
}
/**
 * @template C
 */
var /**
 * @template C
 */
ComponentFactoryBoundToModule = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentFactoryBoundToModule, _super);
    function ComponentFactoryBoundToModule(factory, ngModule) {
        var _this = _super.call(this) || this;
        _this.factory = factory;
        _this.ngModule = ngModule;
        _this.selector = factory.selector;
        _this.componentType = factory.componentType;
        _this.ngContentSelectors = factory.ngContentSelectors;
        _this.inputs = factory.inputs;
        _this.outputs = factory.outputs;
        return _this;
    }
    /**
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @param {?=} ngModule
     * @return {?}
     */
    ComponentFactoryBoundToModule.prototype.create = /**
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @param {?=} ngModule
     * @return {?}
     */
    function (injector, projectableNodes, rootSelectorOrNode, ngModule) {
        return this.factory.create(injector, projectableNodes, rootSelectorOrNode, ngModule || this.ngModule);
    };
    return ComponentFactoryBoundToModule;
}(ComponentFactory));
/**
 * @template C
 */
export { ComponentFactoryBoundToModule };
if (false) {
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.selector;
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.componentType;
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.ngContentSelectors;
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.inputs;
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.outputs;
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.factory;
    /** @type {?} */
    ComponentFactoryBoundToModule.prototype.ngModule;
}
//# sourceMappingURL=component_factory_resolver.js.map