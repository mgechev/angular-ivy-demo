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
import { Injectable, Optional } from '../di';
import { Compiler } from './compiler';
/** @type {?} */
var _SEPARATOR = '#';
/** @type {?} */
var FACTORY_CLASS_SUFFIX = 'NgFactory';
/**
 * Configuration for SystemJsNgModuleLoader.
 * token.
 *
 * \@publicApi
 * @abstract
 */
var /**
 * Configuration for SystemJsNgModuleLoader.
 * token.
 *
 * \@publicApi
 * @abstract
 */
SystemJsNgModuleLoaderConfig = /** @class */ (function () {
    function SystemJsNgModuleLoaderConfig() {
    }
    return SystemJsNgModuleLoaderConfig;
}());
/**
 * Configuration for SystemJsNgModuleLoader.
 * token.
 *
 * \@publicApi
 * @abstract
 */
export { SystemJsNgModuleLoaderConfig };
if (false) {
    /**
     * Prefix to add when computing the name of the factory module for a given module name.
     * @type {?}
     */
    SystemJsNgModuleLoaderConfig.prototype.factoryPathPrefix;
    /**
     * Suffix to add when computing the name of the factory module for a given module name.
     * @type {?}
     */
    SystemJsNgModuleLoaderConfig.prototype.factoryPathSuffix;
}
/** @type {?} */
var DEFAULT_CONFIG = {
    factoryPathPrefix: '',
    factoryPathSuffix: '.ngfactory',
};
/**
 * NgModuleFactoryLoader that uses SystemJS to load NgModuleFactory
 * \@publicApi
 */
var SystemJsNgModuleLoader = /** @class */ (function () {
    function SystemJsNgModuleLoader(_compiler, config) {
        this._compiler = _compiler;
        this._config = config || DEFAULT_CONFIG;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    SystemJsNgModuleLoader.prototype.load = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        /** @type {?} */
        var offlineMode = this._compiler instanceof Compiler;
        return offlineMode ? this.loadFactory(path) : this.loadAndCompile(path);
    };
    /**
     * @param {?} path
     * @return {?}
     */
    SystemJsNgModuleLoader.prototype.loadAndCompile = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        var _this = this;
        var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
        if (exportName === undefined) {
            exportName = 'default';
        }
        return System.import(module)
            .then(function (module) { return module[exportName]; })
            .then(function (type) { return checkNotEmpty(type, module, exportName); })
            .then(function (type) { return _this._compiler.compileModuleAsync(type); });
    };
    /**
     * @param {?} path
     * @return {?}
     */
    SystemJsNgModuleLoader.prototype.loadFactory = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
        /** @type {?} */
        var factoryClassSuffix = FACTORY_CLASS_SUFFIX;
        if (exportName === undefined) {
            exportName = 'default';
            factoryClassSuffix = '';
        }
        return System.import(this._config.factoryPathPrefix + module + this._config.factoryPathSuffix)
            .then(function (module) { return module[exportName + factoryClassSuffix]; })
            .then(function (factory) { return checkNotEmpty(factory, module, exportName); });
    };
    SystemJsNgModuleLoader.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SystemJsNgModuleLoader.ctorParameters = function () { return [
        { type: Compiler },
        { type: SystemJsNgModuleLoaderConfig, decorators: [{ type: Optional }] }
    ]; };
    return SystemJsNgModuleLoader;
}());
export { SystemJsNgModuleLoader };
if (false) {
    /** @type {?} */
    SystemJsNgModuleLoader.prototype._config;
    /** @type {?} */
    SystemJsNgModuleLoader.prototype._compiler;
}
/**
 * @param {?} value
 * @param {?} modulePath
 * @param {?} exportName
 * @return {?}
 */
function checkNotEmpty(value, modulePath, exportName) {
    if (!value) {
        throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
    }
    return value;
}
//# sourceMappingURL=system_js_ng_module_factory_loader.js.map