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
import { createInjector } from '../di/r3_injector';
import { ComponentFactoryResolver as viewEngine_ComponentFactoryResolver } from '../linker/component_factory_resolver';
import { NgModuleFactory as viewEngine_NgModuleFactory, NgModuleRef as viewEngine_NgModuleRef } from '../linker/ng_module_factory';
import { stringify } from '../util';
import { assertDefined } from './assert';
import { ComponentFactoryResolver } from './component_ref';
import { getNgModuleDef } from './definition';
/**
 * @record
 */
export function NgModuleType() { }
/** @type {?} */
NgModuleType.prototype.ngModuleDef;
/** @type {?} */
export var COMPONENT_FACTORY_RESOLVER = {
    provide: viewEngine_ComponentFactoryResolver,
    useFactory: function () { return new ComponentFactoryResolver(); },
    deps: [],
};
/**
 * @template T
 */
var /**
 * @template T
 */
NgModuleRef = /** @class */ (function (_super) {
    tslib_1.__extends(NgModuleRef, _super);
    function NgModuleRef(ngModuleType, parentInjector) {
        var _this = _super.call(this) || this;
        // tslint:disable-next-line:require-internal-with-underscore
        _this._bootstrapComponents = [];
        _this.destroyCbs = [];
        /** @type {?} */
        /** @nocollapse */ var ngModuleDef = getNgModuleDef(ngModuleType);
        ngDevMode && assertDefined(ngModuleDef, "NgModule '" + stringify(ngModuleType) + "' is not a subtype of 'NgModuleType'.");
        _this._bootstrapComponents = /** @type {?} */ ((ngModuleDef)).bootstrap;
        /** @type {?} */
        var additionalProviders = [
            COMPONENT_FACTORY_RESOLVER, {
                provide: viewEngine_NgModuleRef,
                useValue: _this,
            }
        ];
        _this.injector = createInjector(ngModuleType, parentInjector, additionalProviders);
        _this.instance = _this.injector.get(ngModuleType);
        _this.componentFactoryResolver = new ComponentFactoryResolver();
        return _this;
    }
    /**
     * @return {?}
     */
    NgModuleRef.prototype.destroy = /**
     * @return {?}
     */
    function () {
        ngDevMode && assertDefined(this.destroyCbs, 'NgModule already destroyed'); /** @type {?} */
        ((this.destroyCbs)).forEach(function (fn) { return fn(); });
        this.destroyCbs = null;
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    NgModuleRef.prototype.onDestroy = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        ngDevMode && assertDefined(this.destroyCbs, 'NgModule already destroyed'); /** @type {?} */
        ((this.destroyCbs)).push(callback);
    };
    return NgModuleRef;
}(viewEngine_NgModuleRef));
/**
 * @template T
 */
export { NgModuleRef };
if (false) {
    /** @type {?} */
    NgModuleRef.prototype._bootstrapComponents;
    /** @type {?} */
    NgModuleRef.prototype.injector;
    /** @type {?} */
    NgModuleRef.prototype.componentFactoryResolver;
    /** @type {?} */
    NgModuleRef.prototype.instance;
    /** @type {?} */
    NgModuleRef.prototype.destroyCbs;
}
/**
 * @template T
 */
var /**
 * @template T
 */
NgModuleFactory = /** @class */ (function (_super) {
    tslib_1.__extends(NgModuleFactory, _super);
    function NgModuleFactory(moduleType) {
        var _this = _super.call(this) || this;
        _this.moduleType = moduleType;
        return _this;
    }
    /**
     * @param {?} parentInjector
     * @return {?}
     */
    NgModuleFactory.prototype.create = /**
     * @param {?} parentInjector
     * @return {?}
     */
    function (parentInjector) {
        return new NgModuleRef(this.moduleType, parentInjector);
    };
    return NgModuleFactory;
}(viewEngine_NgModuleFactory));
/**
 * @template T
 */
export { NgModuleFactory };
if (false) {
    /** @type {?} */
    NgModuleFactory.prototype.moduleType;
}
//# sourceMappingURL=ng_module_ref.js.map