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
export const COMPONENT_FACTORY_RESOLVER = {
    provide: viewEngine_ComponentFactoryResolver,
    useFactory: () => new ComponentFactoryResolver(),
    deps: [],
};
/**
 * @template T
 */
export class NgModuleRef extends viewEngine_NgModuleRef {
    /**
     * @param {?} ngModuleType
     * @param {?} parentInjector
     */
    constructor(ngModuleType, parentInjector) {
        super();
        // tslint:disable-next-line:require-internal-with-underscore
        this._bootstrapComponents = [];
        this.destroyCbs = [];
        /** @type {?} */
        /** @nocollapse */ const ngModuleDef = getNgModuleDef(ngModuleType);
        ngDevMode && assertDefined(ngModuleDef, `NgModule '${stringify(ngModuleType)}' is not a subtype of 'NgModuleType'.`);
        this._bootstrapComponents = /** @type {?} */ ((ngModuleDef)).bootstrap;
        /** @type {?} */
        const additionalProviders = [
            COMPONENT_FACTORY_RESOLVER, {
                provide: viewEngine_NgModuleRef,
                useValue: this,
            }
        ];
        this.injector = createInjector(ngModuleType, parentInjector, additionalProviders);
        this.instance = this.injector.get(ngModuleType);
        this.componentFactoryResolver = new ComponentFactoryResolver();
    }
    /**
     * @return {?}
     */
    destroy() {
        ngDevMode && assertDefined(this.destroyCbs, 'NgModule already destroyed'); /** @type {?} */
        ((this.destroyCbs)).forEach(fn => fn());
        this.destroyCbs = null;
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) {
        ngDevMode && assertDefined(this.destroyCbs, 'NgModule already destroyed'); /** @type {?} */
        ((this.destroyCbs)).push(callback);
    }
}
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
export class NgModuleFactory extends viewEngine_NgModuleFactory {
    /**
     * @param {?} moduleType
     */
    constructor(moduleType) {
        super();
        this.moduleType = moduleType;
    }
    /**
     * @param {?} parentInjector
     * @return {?}
     */
    create(parentInjector) {
        return new NgModuleRef(this.moduleType, parentInjector);
    }
}
if (false) {
    /** @type {?} */
    NgModuleFactory.prototype.moduleType;
}
//# sourceMappingURL=ng_module_ref.js.map