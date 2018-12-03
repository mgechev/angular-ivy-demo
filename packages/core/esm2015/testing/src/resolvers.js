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
import { Component, Directive, NgModule, Pipe, ɵReflectionCapabilities as ReflectionCapabilities } from '@angular/core';
import { MetadataOverrider } from './metadata_overrider';
/** @type {?} */
const reflection = new ReflectionCapabilities();
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
class OverrideResolver {
    constructor() {
        this.overrides = new Map();
        this.resolved = new Map();
    }
    /**
     * @param {?} overrides
     * @return {?}
     */
    setOverrides(overrides) {
        this.overrides.clear();
        overrides.forEach(([type, override]) => this.overrides.set(type, override));
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getAnnotation(type) {
        return reflection.annotations(type).find(a => a instanceof this.type) || null;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    resolve(type) {
        /** @type {?} */
        let resolved = this.resolved.get(type) || null;
        if (!resolved) {
            resolved = this.getAnnotation(type);
            if (resolved) {
                /** @type {?} */
                const override = this.overrides.get(type);
                if (override) {
                    /** @type {?} */
                    const overrider = new MetadataOverrider();
                    resolved = overrider.overrideMetadata(this.type, resolved, override);
                }
            }
            this.resolved.set(type, resolved);
        }
        return resolved;
    }
}
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
export class DirectiveResolver extends OverrideResolver {
    /**
     * @return {?}
     */
    get type() { return Directive; }
}
export class ComponentResolver extends OverrideResolver {
    /**
     * @return {?}
     */
    get type() { return Component; }
}
export class PipeResolver extends OverrideResolver {
    /**
     * @return {?}
     */
    get type() { return Pipe; }
}
export class NgModuleResolver extends OverrideResolver {
    /**
     * @return {?}
     */
    get type() { return NgModule; }
}
//# sourceMappingURL=resolvers.js.map