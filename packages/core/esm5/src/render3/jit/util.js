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
import { Host, Inject, Optional, Self, SkipSelf } from '../../di/metadata';
import { Attribute } from '../../metadata/di';
import { ReflectionCapabilities } from '../../reflection/reflection_capabilities';
import { getCompilerFacade } from './compiler_facade';
/** @type {?} */
var _reflect = null;
/**
 * @return {?}
 */
export function getReflect() {
    return (_reflect = _reflect || new ReflectionCapabilities());
}
/**
 * @param {?} type
 * @return {?}
 */
export function reflectDependencies(type) {
    return convertDependencies(getReflect().parameters(type));
}
/**
 * @param {?} deps
 * @return {?}
 */
export function convertDependencies(deps) {
    /** @type {?} */
    var compiler = getCompilerFacade();
    return deps.map(function (dep) { return reflectDependency(compiler, dep); });
}
/**
 * @param {?} compiler
 * @param {?} dep
 * @return {?}
 */
function reflectDependency(compiler, dep) {
    /** @type {?} */
    var meta = {
        token: null,
        host: false,
        optional: false,
        resolved: compiler.R3ResolvedDependencyType.Token,
        self: false,
        skipSelf: false,
    };
    /**
     * @param {?} token
     * @return {?}
     */
    function setTokenAndResolvedType(token) {
        meta.resolved = compiler.R3ResolvedDependencyType.Token;
        meta.token = token;
    }
    if (Array.isArray(dep)) {
        if (dep.length === 0) {
            throw new Error('Dependency array must have arguments.');
        }
        for (var j = 0; j < dep.length; j++) {
            /** @type {?} */
            var param = dep[j];
            if (param === undefined) {
                // param may be undefined if type of dep is not set by ngtsc
                continue;
            }
            else if (param instanceof Optional || param.__proto__.ngMetadataName === 'Optional') {
                meta.optional = true;
            }
            else if (param instanceof SkipSelf || param.__proto__.ngMetadataName === 'SkipSelf') {
                meta.skipSelf = true;
            }
            else if (param instanceof Self || param.__proto__.ngMetadataName === 'Self') {
                meta.self = true;
            }
            else if (param instanceof Host || param.__proto__.ngMetadataName === 'Host') {
                meta.host = true;
            }
            else if (param instanceof Inject) {
                meta.token = param.token;
            }
            else if (param instanceof Attribute) {
                if (param.attributeName === undefined) {
                    throw new Error("Attribute name must be defined.");
                }
                meta.token = param.attributeName;
                meta.resolved = compiler.R3ResolvedDependencyType.Attribute;
            }
            else {
                setTokenAndResolvedType(param);
            }
        }
    }
    else {
        setTokenAndResolvedType(dep);
    }
    return meta;
}
//# sourceMappingURL=util.js.map