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
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
export class Reflector {
    /**
     * @param {?} reflectionCapabilities
     */
    constructor(reflectionCapabilities) {
        this.reflectionCapabilities = reflectionCapabilities;
    }
    /**
     * @param {?} caps
     * @return {?}
     */
    updateCapabilities(caps) { this.reflectionCapabilities = caps; }
    /**
     * @param {?} type
     * @return {?}
     */
    factory(type) { return this.reflectionCapabilities.factory(type); }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    parameters(typeOrFunc) {
        return this.reflectionCapabilities.parameters(typeOrFunc);
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    annotations(typeOrFunc) {
        return this.reflectionCapabilities.annotations(typeOrFunc);
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    propMetadata(typeOrFunc) {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
    }
    /**
     * @param {?} type
     * @param {?} lcProperty
     * @return {?}
     */
    hasLifecycleHook(type, lcProperty) {
        return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getter(name) { return this.reflectionCapabilities.getter(name); }
    /**
     * @param {?} name
     * @return {?}
     */
    setter(name) { return this.reflectionCapabilities.setter(name); }
    /**
     * @param {?} name
     * @return {?}
     */
    method(name) { return this.reflectionCapabilities.method(name); }
    /**
     * @param {?} type
     * @return {?}
     */
    importUri(type) { return this.reflectionCapabilities.importUri(type); }
    /**
     * @param {?} type
     * @return {?}
     */
    resourceUri(type) { return this.reflectionCapabilities.resourceUri(type); }
    /**
     * @param {?} name
     * @param {?} moduleUrl
     * @param {?} members
     * @param {?} runtime
     * @return {?}
     */
    resolveIdentifier(name, moduleUrl, members, runtime) {
        return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, members, runtime);
    }
    /**
     * @param {?} identifier
     * @param {?} name
     * @return {?}
     */
    resolveEnum(identifier, name) {
        return this.reflectionCapabilities.resolveEnum(identifier, name);
    }
}
if (false) {
    /** @type {?} */
    Reflector.prototype.reflectionCapabilities;
}
//# sourceMappingURL=reflector.js.map