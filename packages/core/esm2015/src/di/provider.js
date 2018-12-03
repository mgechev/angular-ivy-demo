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
 * Configures the `Injector` to return a value for a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ValueSansProvider'}
 *
 * \@publicApi
 * @record
 */
export function ValueSansProvider() { }
/**
 * The value to inject.
 * @type {?}
 */
ValueSansProvider.prototype.useValue;
/**
 * Configures the `Injector` to return a value for a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ValueProvider'}
 *
 * ### Multi-value example
 *
 * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * \@publicApi
 * @record
 */
export function ValueProvider() { }
/**
 * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
 * @type {?}
 */
ValueProvider.prototype.provide;
/**
 * If true, then injector returns an array of instances. This is useful to allow multiple
 * providers spread across many files to provide configuration information to a common token.
 * @type {?|undefined}
 */
ValueProvider.prototype.multi;
/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='StaticClassSansProvider'}
 *
 * \@publicApi
 * @record
 */
export function StaticClassSansProvider() { }
/**
 * An optional class to instantiate for the `token`. (If not provided `provide` is assumed to be a
 * class to instantiate)
 * @type {?}
 */
StaticClassSansProvider.prototype.useClass;
/**
 * A list of `token`s which need to be resolved by the injector. The list of values is then
 * used as arguments to the `useClass` constructor.
 * @type {?}
 */
StaticClassSansProvider.prototype.deps;
/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='StaticClassProvider'}
 *
 * Note that following two providers are not equal:
 *
 * {\@example core/di/ts/provider_spec.ts region='StaticClassProviderDifference'}
 *
 * ### Multi-value example
 *
 * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 * @record
 */
export function StaticClassProvider() { }
/**
 * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
 * @type {?}
 */
StaticClassProvider.prototype.provide;
/**
 * If true, then injector returns an array of instances. This is useful to allow multiple
 * providers spread across many files to provide configuration information to a common token.
 * @type {?|undefined}
 */
StaticClassProvider.prototype.multi;
/**
 * Configures the `Injector` to return an instance of a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * ```
 * \@Injectable(SomeModule, {deps: []})
 * class MyService {}
 * ```
 *
 * \@publicApi
 * @record
 */
export function ConstructorSansProvider() { }
/**
 * A list of `token`s which need to be resolved by the injector. The list of values is then
 * used as arguments to the `useClass` constructor.
 * @type {?|undefined}
 */
ConstructorSansProvider.prototype.deps;
/**
 * Configures the `Injector` to return an instance of a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
 *
 * ### Multi-value example
 *
 * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 * @record
 */
export function ConstructorProvider() { }
/**
 * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
 * @type {?}
 */
ConstructorProvider.prototype.provide;
/**
 * If true, then injector returns an array of instances. This is useful to allow multiple
 * providers spread across many files to provide configuration information to a common token.
 * @type {?|undefined}
 */
ConstructorProvider.prototype.multi;
/**
 * Configures the `Injector` to return a value of another `useExisting` token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ExistingSansProvider'}
 * @record
 */
export function ExistingSansProvider() { }
/**
 * Existing `token` to return. (equivalent to `injector.get(useExisting)`)
 * @type {?}
 */
ExistingSansProvider.prototype.useExisting;
/**
 * Configures the `Injector` to return a value of another `useExisting` token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ExistingProvider'}
 *
 * ### Multi-value example
 *
 * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * \@publicApi
 * @record
 */
export function ExistingProvider() { }
/**
 * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
 * @type {?}
 */
ExistingProvider.prototype.provide;
/**
 * If true, then injector returns an array of instances. This is useful to allow multiple
 * providers spread across many files to provide configuration information to a common token.
 * @type {?|undefined}
 */
ExistingProvider.prototype.multi;
/**
 * Configures the `Injector` to return a value by invoking a `useFactory` function.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='FactorySansProvider'}
 *
 * \@publicApi
 * @record
 */
export function FactorySansProvider() { }
/**
 * A function to invoke to create a value for this `token`. The function is invoked with
 * resolved values of `token`s in the `deps` field.
 * @type {?}
 */
FactorySansProvider.prototype.useFactory;
/**
 * A list of `token`s which need to be resolved by the injector. The list of values is then
 * used as arguments to the `useFactory` function.
 * @type {?|undefined}
 */
FactorySansProvider.prototype.deps;
/**
 * Configures the `Injector` to return a value by invoking a `useFactory` function.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='FactoryProvider'}
 *
 * Dependencies can also be marked as optional:
 *
 * {\@example core/di/ts/provider_spec.ts region='FactoryProviderOptionalDeps'}
 *
 * ### Multi-value example
 *
 * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * \@publicApi
 * @record
 */
export function FactoryProvider() { }
/**
 * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
 * @type {?}
 */
FactoryProvider.prototype.provide;
/**
 * If true, then injector returns an array of instances. This is useful to allow multiple
 * providers spread across many files to provide configuration information to a common token.
 * @type {?|undefined}
 */
FactoryProvider.prototype.multi;
/** @typedef {?} */
var StaticProvider;
export { StaticProvider };
/**
 * Configures the `Injector` to return an instance of `Type` when `Type' is used as the token.
 *
 * Create an instance by invoking the `new` operator and supplying additional arguments.
 * This form is a short form of `TypeProvider`;
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='TypeProvider'}
 *
 * \@publicApi
 * @record
 */
export function TypeProvider() { }
/**
 * Configures the `Injector` to return a value by invoking a `useClass` function.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ClassSansProvider'}
 *
 * \@publicApi
 * @record
 */
export function ClassSansProvider() { }
/**
 * Class to instantiate for the `token`.
 * @type {?}
 */
ClassSansProvider.prototype.useClass;
/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ClassProvider'}
 *
 * Note that following two providers are not equal:
 *
 * {\@example core/di/ts/provider_spec.ts region='ClassProviderDifference'}
 *
 * ### Multi-value example
 *
 * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * \@publicApi
 * @record
 */
export function ClassProvider() { }
/**
 * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
 * @type {?}
 */
ClassProvider.prototype.provide;
/**
 * If true, then injector returns an array of instances. This is useful to allow multiple
 * providers spread across many files to provide configuration information to a common token.
 * @type {?|undefined}
 */
ClassProvider.prototype.multi;
/** @typedef {?} */
var Provider;
export { Provider };
//# sourceMappingURL=provider.js.map