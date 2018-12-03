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
 * A set of interfaces which are shared between `@angular/core` and `@angular/compiler` to allow
 * for late binding of `@angular/compiler` for JIT purposes.
 *
 * This file has two copies. Please ensure that they are in sync:
 *  - packages/compiler/src/compiler_facade_interface.ts             (master)
 *  - packages/core/src/render3/jit/compiler_facade_interface.ts     (copy)
 *
 * Please ensure that the two files are in sync using this command:
 * ```
 * cp packages/compiler/src/compiler_facade_interface.ts \
 *    packages/core/src/render3/jit/compiler_facade_interface.ts
 * ```
 */
/**
 * @record
 */
export function ExportedCompilerFacade() { }
/** @type {?} */
ExportedCompilerFacade.prototype.ɵcompilerFacade;
/**
 * @record
 */
export function CompilerFacade() { }
/** @type {?} */
CompilerFacade.prototype.compilePipe;
/** @type {?} */
CompilerFacade.prototype.compileInjectable;
/** @type {?} */
CompilerFacade.prototype.compileInjector;
/** @type {?} */
CompilerFacade.prototype.compileNgModule;
/** @type {?} */
CompilerFacade.prototype.compileDirective;
/** @type {?} */
CompilerFacade.prototype.compileComponent;
/** @type {?} */
CompilerFacade.prototype.R3ResolvedDependencyType;
/**
 * @record
 */
export function CoreEnvironment() { }
/** @typedef {?} */
var StringMap;
export { StringMap };
/** @typedef {?} */
var StringMapWithRename;
export { StringMapWithRename };
/** @typedef {?} */
var Provider;
export { Provider };
/** @enum {number} */
var R3ResolvedDependencyType = {
    Token: 0,
    Attribute: 1,
};
export { R3ResolvedDependencyType };
R3ResolvedDependencyType[R3ResolvedDependencyType.Token] = 'Token';
R3ResolvedDependencyType[R3ResolvedDependencyType.Attribute] = 'Attribute';
/**
 * @record
 */
export function R3DependencyMetadataFacade() { }
/** @type {?} */
R3DependencyMetadataFacade.prototype.token;
/** @type {?} */
R3DependencyMetadataFacade.prototype.resolved;
/** @type {?} */
R3DependencyMetadataFacade.prototype.host;
/** @type {?} */
R3DependencyMetadataFacade.prototype.optional;
/** @type {?} */
R3DependencyMetadataFacade.prototype.self;
/** @type {?} */
R3DependencyMetadataFacade.prototype.skipSelf;
/**
 * @record
 */
export function R3PipeMetadataFacade() { }
/** @type {?} */
R3PipeMetadataFacade.prototype.name;
/** @type {?} */
R3PipeMetadataFacade.prototype.type;
/** @type {?} */
R3PipeMetadataFacade.prototype.pipeName;
/** @type {?} */
R3PipeMetadataFacade.prototype.deps;
/** @type {?} */
R3PipeMetadataFacade.prototype.pure;
/**
 * @record
 */
export function R3InjectableMetadataFacade() { }
/** @type {?} */
R3InjectableMetadataFacade.prototype.name;
/** @type {?} */
R3InjectableMetadataFacade.prototype.type;
/** @type {?} */
R3InjectableMetadataFacade.prototype.ctorDeps;
/** @type {?} */
R3InjectableMetadataFacade.prototype.providedIn;
/** @type {?|undefined} */
R3InjectableMetadataFacade.prototype.useClass;
/** @type {?|undefined} */
R3InjectableMetadataFacade.prototype.useFactory;
/** @type {?|undefined} */
R3InjectableMetadataFacade.prototype.useExisting;
/** @type {?|undefined} */
R3InjectableMetadataFacade.prototype.useValue;
/** @type {?|undefined} */
R3InjectableMetadataFacade.prototype.userDeps;
/**
 * @record
 */
export function R3NgModuleMetadataFacade() { }
/** @type {?} */
R3NgModuleMetadataFacade.prototype.type;
/** @type {?} */
R3NgModuleMetadataFacade.prototype.bootstrap;
/** @type {?} */
R3NgModuleMetadataFacade.prototype.declarations;
/** @type {?} */
R3NgModuleMetadataFacade.prototype.imports;
/** @type {?} */
R3NgModuleMetadataFacade.prototype.exports;
/** @type {?} */
R3NgModuleMetadataFacade.prototype.emitInline;
/**
 * @record
 */
export function R3InjectorMetadataFacade() { }
/** @type {?} */
R3InjectorMetadataFacade.prototype.name;
/** @type {?} */
R3InjectorMetadataFacade.prototype.type;
/** @type {?} */
R3InjectorMetadataFacade.prototype.deps;
/** @type {?} */
R3InjectorMetadataFacade.prototype.providers;
/** @type {?} */
R3InjectorMetadataFacade.prototype.imports;
/**
 * @record
 */
export function R3DirectiveMetadataFacade() { }
/** @type {?} */
R3DirectiveMetadataFacade.prototype.name;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.type;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.typeArgumentCount;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.typeSourceSpan;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.deps;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.selector;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.queries;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.host;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.propMetadata;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.lifecycle;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.inputs;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.outputs;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.usesInheritance;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.exportAs;
/** @type {?} */
R3DirectiveMetadataFacade.prototype.providers;
/**
 * @record
 */
export function R3ComponentMetadataFacade() { }
/** @type {?} */
R3ComponentMetadataFacade.prototype.template;
/** @type {?} */
R3ComponentMetadataFacade.prototype.preserveWhitespaces;
/** @type {?} */
R3ComponentMetadataFacade.prototype.animations;
/** @type {?} */
R3ComponentMetadataFacade.prototype.viewQueries;
/** @type {?} */
R3ComponentMetadataFacade.prototype.pipes;
/** @type {?} */
R3ComponentMetadataFacade.prototype.directives;
/** @type {?} */
R3ComponentMetadataFacade.prototype.styles;
/** @type {?} */
R3ComponentMetadataFacade.prototype.encapsulation;
/** @type {?} */
R3ComponentMetadataFacade.prototype.viewProviders;
/** @typedef {?} */
var ViewEncapsulation;
export { ViewEncapsulation };
/**
 * @record
 */
export function R3QueryMetadataFacade() { }
/** @type {?} */
R3QueryMetadataFacade.prototype.propertyName;
/** @type {?} */
R3QueryMetadataFacade.prototype.first;
/** @type {?} */
R3QueryMetadataFacade.prototype.predicate;
/** @type {?} */
R3QueryMetadataFacade.prototype.descendants;
/** @type {?} */
R3QueryMetadataFacade.prototype.read;
//# sourceMappingURL=compiler_facade_interface.js.map