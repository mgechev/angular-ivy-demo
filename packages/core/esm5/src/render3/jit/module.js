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
import { Component } from '../../metadata/directives';
import { assertDefined } from '../assert';
import { getComponentDef, getDirectiveDef, getNgModuleDef, getPipeDef } from '../definition';
import { NG_COMPONENT_DEF, NG_DIRECTIVE_DEF, NG_INJECTOR_DEF, NG_MODULE_DEF, NG_PIPE_DEF } from '../fields';
import { stringify } from '../util';
import { getCompilerFacade } from './compiler_facade';
import { angularCoreEnv } from './environment';
import { getReflect, reflectDependencies } from './util';
/** @type {?} */
var EMPTY_ARRAY = [];
/**
 * Compiles a module in JIT mode.
 *
 * This function automatically gets called when a class has a `\@NgModule` decorator.
 * @param {?} moduleType
 * @param {?=} ngModule
 * @return {?}
 */
export function compileNgModule(moduleType, ngModule) {
    if (ngModule === void 0) { ngModule = {}; }
    compileNgModuleDefs(moduleType, ngModule);
    setScopeOnDeclaredComponents(moduleType, ngModule);
}
/**
 * Compiles and adds the `ngModuleDef` and `ngInjectorDef` properties to the module class.
 * @param {?} moduleType
 * @param {?} ngModule
 * @return {?}
 */
export function compileNgModuleDefs(moduleType, ngModule) {
    ngDevMode && assertDefined(moduleType, 'Required value moduleType');
    ngDevMode && assertDefined(ngModule, 'Required value ngModule');
    /** @type {?} */
    var declarations = flatten(ngModule.declarations || EMPTY_ARRAY);
    /** @type {?} */
    /** @nocollapse */ var ngModuleDef = null;
    Object.defineProperty(moduleType, NG_MODULE_DEF, {
        configurable: true,
        get: function () {
            if (ngModuleDef === null) {
                ngModuleDef = getCompilerFacade().compileNgModule(angularCoreEnv, "ng://" + moduleType.name + "/ngModuleDef.js", {
                    type: moduleType,
                    bootstrap: flatten(ngModule.bootstrap || EMPTY_ARRAY),
                    declarations: declarations,
                    imports: flatten(ngModule.imports || EMPTY_ARRAY).map(expandModuleWithProviders),
                    exports: flatten(ngModule.exports || EMPTY_ARRAY).map(expandModuleWithProviders),
                    emitInline: true,
                });
            }
            return ngModuleDef;
        }
    });
    /** @type {?} */
    /** @nocollapse */ var ngInjectorDef = null;
    Object.defineProperty(moduleType, NG_INJECTOR_DEF, {
        get: function () {
            if (ngInjectorDef === null) {
                /** @type {?} */
                var meta = {
                    name: moduleType.name,
                    type: moduleType,
                    deps: reflectDependencies(moduleType),
                    providers: ngModule.providers || EMPTY_ARRAY,
                    imports: [
                        ngModule.imports || EMPTY_ARRAY,
                        ngModule.exports || EMPTY_ARRAY,
                    ],
                };
                ngInjectorDef = getCompilerFacade().compileInjector(angularCoreEnv, "ng://" + moduleType.name + "/ngInjectorDef.js", meta);
            }
            return ngInjectorDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
}
/**
 * Some declared components may be compiled asynchronously, and thus may not have their
 * ngComponentDef set yet. If this is the case, then a reference to the module is written into
 * the `ngSelectorScope` property of the declared type.
 * @param {?} moduleType
 * @param {?} ngModule
 * @return {?}
 */
function setScopeOnDeclaredComponents(moduleType, ngModule) {
    /** @type {?} */
    var declarations = flatten(ngModule.declarations || EMPTY_ARRAY);
    /** @type {?} */
    var transitiveScopes = transitiveScopesFor(moduleType);
    declarations.forEach(function (declaration) {
        if (declaration.hasOwnProperty(NG_COMPONENT_DEF)) {
            /** @type {?} */
            var component = /** @type {?} */ (declaration);
            patchComponentDefWithScope(component, transitiveScopes);
        }
        else if (!declaration.hasOwnProperty(NG_DIRECTIVE_DEF) && !declaration.hasOwnProperty(NG_PIPE_DEF)) {
            // Set `ngSelectorScope` for future reference when the component compilation finishes.
            (/** @type {?} */ (declaration)).ngSelectorScope = moduleType;
        }
    });
}
/**
 * Patch the definition of a component with directives and pipes from the compilation scope of
 * a given module.
 * @template C
 * @param {?} component
 * @param {?} transitiveScopes
 * @return {?}
 */
export function patchComponentDefWithScope(component, transitiveScopes) {
    /** @type {?} */
    var componentDef = /** @type {?} */ ((getComponentDef(component)));
    /** @type {?} */
    var meta = /** @type {?} */ (getReflect().annotations(component).filter(function (m) { return m instanceof Component; }).pop());
    if (!meta) {
        throw new Error(stringify(component) + " has no component metadata");
    }
    /** @type {?} */
    var directives = (meta.directives || []).concat(Array.from(transitiveScopes.compilation.directives));
    if (directives.length) {
        componentDef.directiveDefs = function () {
            return directives.map(function (dir) { return getDirectiveDef(dir) || /** @type {?} */ ((getComponentDef(dir))); }).filter(function (def) { return !!def; });
        };
    }
    /** @type {?} */
    var pipes = (meta.pipes || []).concat(Array.from(transitiveScopes.compilation.pipes));
    if (pipes.length) {
        componentDef.pipeDefs = function () { return pipes.map(function (pipe) { return ((getPipeDef(pipe))); }); };
    }
}
/**
 * Compute the pair of transitive scopes (compilation scope and exported scope) for a given module.
 *
 * This operation is memoized and the result is cached on the module's definition. It can be called
 * on modules with components that have not fully compiled yet, but the result should not be used
 * until they have.
 * @template T
 * @param {?} moduleType
 * @return {?}
 */
export function transitiveScopesFor(moduleType) {
    if (!isNgModule(moduleType)) {
        throw new Error(moduleType.name + " does not have an ngModuleDef");
    }
    /** @type {?} */
    var def = /** @type {?} */ ((getNgModuleDef(moduleType)));
    if (def.transitiveCompileScopes !== null) {
        return def.transitiveCompileScopes;
    }
    /** @type {?} */
    var scopes = {
        compilation: {
            directives: new Set(),
            pipes: new Set(),
        },
        exported: {
            directives: new Set(),
            pipes: new Set(),
        },
    };
    def.declarations.forEach(function (declared) {
        /** @type {?} */
        var declaredWithDefs = /** @type {?} */ (declared);
        if (getPipeDef(declaredWithDefs)) {
            scopes.compilation.pipes.add(declared);
        }
        else {
            // Either declared has an ngComponentDef or ngDirectiveDef, or it's a component which hasn't
            // had its template compiled yet. In either case, it gets added to the compilation's
            // directives.
            scopes.compilation.directives.add(declared);
        }
    });
    def.imports.forEach(function (imported) {
        /** @type {?} */
        var importedTyped = /** @type {?} */ (imported);
        if (!isNgModule(importedTyped)) {
            throw new Error("Importing " + importedTyped.name + " which does not have an ngModuleDef");
        }
        /** @type {?} */
        var importedScope = transitiveScopesFor(importedTyped);
        importedScope.exported.directives.forEach(function (entry) { return scopes.compilation.directives.add(entry); });
        importedScope.exported.pipes.forEach(function (entry) { return scopes.compilation.pipes.add(entry); });
    });
    def.exports.forEach(function (exported) {
        /** @type {?} */
        var exportedTyped = /** @type {?} */ (exported);
        // Either the type is a module, a pipe, or a component/directive (which may not have an
        // ngComponentDef as it might be compiled asynchronously).
        if (isNgModule(exportedTyped)) {
            /** @type {?} */
            var exportedScope = transitiveScopesFor(exportedTyped);
            exportedScope.exported.directives.forEach(function (entry) {
                scopes.compilation.directives.add(entry);
                scopes.exported.directives.add(entry);
            });
            exportedScope.exported.pipes.forEach(function (entry) {
                scopes.compilation.pipes.add(entry);
                scopes.exported.pipes.add(entry);
            });
        }
        else if (getNgModuleDef(exportedTyped)) {
            scopes.exported.pipes.add(exportedTyped);
        }
        else {
            scopes.exported.directives.add(exportedTyped);
        }
    });
    def.transitiveCompileScopes = scopes;
    return scopes;
}
/**
 * @template T
 * @param {?} values
 * @return {?}
 */
function flatten(values) {
    /** @type {?} */
    var out = [];
    values.forEach(function (value) {
        if (Array.isArray(value)) {
            out.push.apply(out, flatten(value));
        }
        else {
            out.push(value);
        }
    });
    return out;
}
/**
 * @param {?} value
 * @return {?}
 */
function expandModuleWithProviders(value) {
    if (isModuleWithProviders(value)) {
        return value.ngModule;
    }
    return value;
}
/**
 * @param {?} value
 * @return {?}
 */
function isModuleWithProviders(value) {
    return (/** @type {?} */ (value)).ngModule !== undefined;
}
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function isNgModule(value) {
    return !!getNgModuleDef(value);
}
//# sourceMappingURL=module.js.map