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
import { Component, Directive, NgModule, Pipe, ɵReflectionCapabilities as ReflectionCapabilities } from '@angular/core';
import { MetadataOverrider } from './metadata_overrider';
/** @type {?} */
var reflection = new ReflectionCapabilities();
/**
 * Base interface to resolve `\@Component`, `\@Directive`, `\@Pipe` and `\@NgModule`.
 * @record
 * @template T
 */
export function Resolver() { }
/** @type {?} */
Resolver.prototype.resolve;
/**
 * Allows to override ivy metadata for tests (via the `TestBed`).
 * @abstract
 * @template T
 */
var /**
 * Allows to override ivy metadata for tests (via the `TestBed`).
 * @abstract
 * @template T
 */
OverrideResolver = /** @class */ (function () {
    function OverrideResolver() {
        this.overrides = new Map();
        this.resolved = new Map();
    }
    /**
     * @param {?} overrides
     * @return {?}
     */
    OverrideResolver.prototype.setOverrides = /**
     * @param {?} overrides
     * @return {?}
     */
    function (overrides) {
        var _this = this;
        this.overrides.clear();
        overrides.forEach(function (_a) {
            var type = _a[0], override = _a[1];
            return _this.overrides.set(type, override);
        });
    };
    /**
     * @param {?} type
     * @return {?}
     */
    OverrideResolver.prototype.getAnnotation = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        var _this = this;
        return reflection.annotations(type).find(function (a) { return a instanceof _this.type; }) || null;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    OverrideResolver.prototype.resolve = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var resolved = this.resolved.get(type) || null;
        if (!resolved) {
            resolved = this.getAnnotation(type);
            if (resolved) {
                /** @type {?} */
                var override = this.overrides.get(type);
                if (override) {
                    /** @type {?} */
                    var overrider = new MetadataOverrider();
                    resolved = overrider.overrideMetadata(this.type, resolved, override);
                }
            }
            this.resolved.set(type, resolved);
        }
        return resolved;
    };
    return OverrideResolver;
}());
if (false) {
    /** @type {?} */
    OverrideResolver.prototype.overrides;
    /** @type {?} */
    OverrideResolver.prototype.resolved;
    /**
     * @abstract
     * @return {?}
     */
    OverrideResolver.prototype.type = function () { };
}
var DirectiveResolver = /** @class */ (function (_super) {
    tslib_1.__extends(DirectiveResolver, _super);
    function DirectiveResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DirectiveResolver.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () { return Directive; },
        enumerable: true,
        configurable: true
    });
    return DirectiveResolver;
}(OverrideResolver));
export { DirectiveResolver };
var ComponentResolver = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentResolver, _super);
    function ComponentResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ComponentResolver.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () { return Component; },
        enumerable: true,
        configurable: true
    });
    return ComponentResolver;
}(OverrideResolver));
export { ComponentResolver };
var PipeResolver = /** @class */ (function (_super) {
    tslib_1.__extends(PipeResolver, _super);
    function PipeResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PipeResolver.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () { return Pipe; },
        enumerable: true,
        configurable: true
    });
    return PipeResolver;
}(OverrideResolver));
export { PipeResolver };
var NgModuleResolver = /** @class */ (function (_super) {
    tslib_1.__extends(NgModuleResolver, _super);
    function NgModuleResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NgModuleResolver.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () { return NgModule; },
        enumerable: true,
        configurable: true
    });
    return NgModuleResolver;
}(OverrideResolver));
export { NgModuleResolver };
//# sourceMappingURL=resolvers.js.map