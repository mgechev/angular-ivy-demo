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
import { resolveForwardRef } from '../di/forward_ref';
import { isTypeProvider, providerToFactory } from '../di/r3_injector';
import { diPublicInInjector, getNodeInjectable, getOrCreateNodeInjectorForNode } from './di';
import { directiveInject } from './instructions';
import { NodeInjectorFactory } from './interfaces/injector';
import { TVIEW } from './interfaces/view';
import { getLView, getPreviousOrParentTNode } from './state';
import { isComponentDef } from './util';
/**
 * Resolves the providers which are defined in the DirectiveDef.
 *
 * When inserting the tokens and the factories in their respective arrays, we can assume that
 * this method is called first for the component (if any), and then for other directives on the same
 * node.
 * As a consequence,the providers are always processed in that order:
 * 1) The view providers of the component
 * 2) The providers of the component
 * 3) The providers of the other directives
 * This matches the structure of the injectables arrays of a view (for each node).
 * So the tokens and the factories can be pushed at the end of the arrays, except
 * in one case for multi providers.
 *
 * @template T
 * @param {?} def the directive definition
 * @param {?} providers
 * @param {?} viewProviders
 * @return {?}
 */
export function providersResolver(def, providers, viewProviders) {
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const tView = lView[TVIEW];
    if (tView.firstTemplatePass) {
        /** @type {?} */
        const isComponent = isComponentDef(def);
        // The list of view providers is processed first, and the flags are updated
        resolveProvider(viewProviders, tView.data, tView.blueprint, isComponent, true);
        // Then, the list of providers is processed, and the flags are updated
        resolveProvider(providers, tView.data, tView.blueprint, isComponent, false);
    }
}
/**
 * Resolves a provider and publishes it to the DI system.
 * @param {?} provider
 * @param {?} tInjectables
 * @param {?} lInjectablesBlueprint
 * @param {?} isComponent
 * @param {?} isViewProvider
 * @return {?}
 */
function resolveProvider(provider, tInjectables, lInjectablesBlueprint, isComponent, isViewProvider) {
    provider = resolveForwardRef(provider);
    if (Array.isArray(provider)) {
        // Recursively call `resolveProvider`
        // Recursion is OK in this case because this code will not be in hot-path once we implement
        // cloning of the initial state.
        for (let i = 0; i < provider.length; i++) {
            resolveProvider(provider[i], tInjectables, lInjectablesBlueprint, isComponent, isViewProvider);
        }
    }
    else {
        /** @type {?} */
        const lView = getLView();
        /** @type {?} */
        let token = isTypeProvider(provider) ? provider : resolveForwardRef(provider.provide);
        /** @type {?} */
        let providerFactory = providerToFactory(provider);
        /** @type {?} */
        const previousOrParentTNode = getPreviousOrParentTNode();
        /** @type {?} */
        const beginIndex = previousOrParentTNode.providerIndexes & 65535 /* ProvidersStartIndexMask */;
        /** @type {?} */
        const endIndex = previousOrParentTNode.flags >> 16 /* DirectiveStartingIndexShift */;
        /** @type {?} */
        const cptViewProvidersCount = previousOrParentTNode.providerIndexes >> 16 /* CptViewProvidersCountShift */;
        if (isTypeProvider(provider) || !provider.multi) {
            /** @type {?} */
            const factory = new NodeInjectorFactory(providerFactory, isViewProvider, directiveInject);
            /** @type {?} */
            const existingFactoryIndex = indexOf(token, tInjectables, isViewProvider ? beginIndex : beginIndex + cptViewProvidersCount, endIndex);
            if (existingFactoryIndex == -1) {
                diPublicInInjector(getOrCreateNodeInjectorForNode(/** @type {?} */ (previousOrParentTNode), lView), lView, token);
                tInjectables.push(token);
                previousOrParentTNode.flags += 1 << 16 /* DirectiveStartingIndexShift */;
                if (isViewProvider) {
                    previousOrParentTNode.providerIndexes +=
                        65536 /* CptViewProvidersCountShifter */;
                }
                lInjectablesBlueprint.push(factory);
                lView.push(factory);
            }
            else {
                lInjectablesBlueprint[existingFactoryIndex] = factory;
                lView[existingFactoryIndex] = factory;
            }
        }
        else {
            /** @type {?} */
            const existingProvidersFactoryIndex = indexOf(token, tInjectables, beginIndex + cptViewProvidersCount, endIndex);
            /** @type {?} */
            const existingViewProvidersFactoryIndex = indexOf(token, tInjectables, beginIndex, beginIndex + cptViewProvidersCount);
            /** @type {?} */
            const doesProvidersFactoryExist = existingProvidersFactoryIndex >= 0 &&
                lInjectablesBlueprint[existingProvidersFactoryIndex];
            /** @type {?} */
            const doesViewProvidersFactoryExist = existingViewProvidersFactoryIndex >= 0 &&
                lInjectablesBlueprint[existingViewProvidersFactoryIndex];
            if (isViewProvider && !doesViewProvidersFactoryExist ||
                !isViewProvider && !doesProvidersFactoryExist) {
                // Cases 1.a and 2.a
                diPublicInInjector(getOrCreateNodeInjectorForNode(/** @type {?} */ (previousOrParentTNode), lView), lView, token);
                /** @type {?} */
                const factory = multiFactory(isViewProvider ? multiViewProvidersFactoryResolver : multiProvidersFactoryResolver, lInjectablesBlueprint.length, isViewProvider, isComponent, providerFactory);
                if (!isViewProvider && doesViewProvidersFactoryExist) {
                    lInjectablesBlueprint[existingViewProvidersFactoryIndex].providerFactory = factory;
                }
                tInjectables.push(token);
                previousOrParentTNode.flags += 1 << 16 /* DirectiveStartingIndexShift */;
                if (isViewProvider) {
                    previousOrParentTNode.providerIndexes +=
                        65536 /* CptViewProvidersCountShifter */;
                }
                lInjectablesBlueprint.push(factory);
                lView.push(factory);
            }
            else {
                // Cases 1.b and 2.b
                multiFactoryAdd(/** @type {?} */ ((lInjectablesBlueprint))[isViewProvider ? existingViewProvidersFactoryIndex : existingProvidersFactoryIndex], providerFactory, !isViewProvider && isComponent);
            }
            if (!isViewProvider && isComponent && doesViewProvidersFactoryExist) {
                /** @type {?} */ ((lInjectablesBlueprint[existingViewProvidersFactoryIndex].componentProviders))++;
            }
        }
    }
}
/**
 * Add a factory in a multi factory.
 * @param {?} multiFactory
 * @param {?} factory
 * @param {?} isComponentProvider
 * @return {?}
 */
function multiFactoryAdd(multiFactory, factory, isComponentProvider) {
    /** @type {?} */ ((multiFactory.multi)).push(factory);
    if (isComponentProvider) {
        /** @type {?} */ ((multiFactory.componentProviders))++;
    }
}
/**
 * Returns the index of item in the array, but only in the begin to end range.
 * @param {?} item
 * @param {?} arr
 * @param {?} begin
 * @param {?} end
 * @return {?}
 */
function indexOf(item, arr, begin, end) {
    for (let i = begin; i < end; i++) {
        if (arr[i] === item)
            return i;
    }
    return -1;
}
/**
 * Use this with `multi` `providers`.
 * @this {?}
 * @param {?} _
 * @param {?} tData
 * @param {?} lData
 * @param {?} tNode
 * @return {?}
 */
function multiProvidersFactoryResolver(_, tData, lData, tNode) {
    return multiResolve(/** @type {?} */ ((this.multi)), []);
}
/**
 * Use this with `multi` `viewProviders`.
 *
 * This factory knows how to concatenate itself with the existing `multi` `providers`.
 * @this {?}
 * @param {?} _
 * @param {?} tData
 * @param {?} lData
 * @param {?} tNode
 * @return {?}
 */
function multiViewProvidersFactoryResolver(_, tData, lData, tNode) {
    /** @type {?} */
    const factories = /** @type {?} */ ((this.multi));
    /** @type {?} */
    let result;
    if (this.providerFactory) {
        /** @type {?} */
        const componentCount = /** @type {?} */ ((this.providerFactory.componentProviders));
        /** @type {?} */
        const multiProviders = getNodeInjectable(tData, lData, /** @type {?} */ ((/** @type {?} */ ((this.providerFactory)).index)), tNode);
        // Copy the section of the array which contains `multi` `providers` from the component
        result = multiProviders.slice(0, componentCount);
        // Insert the `viewProvider` instances.
        multiResolve(factories, result);
        // Copy the section of the array which contains `multi` `providers` from other directives
        for (let i = componentCount; i < multiProviders.length; i++) {
            result.push(multiProviders[i]);
        }
    }
    else {
        result = [];
        // Insert the `viewProvider` instances.
        multiResolve(factories, result);
    }
    return result;
}
/**
 * Maps an array of factories into an array of values.
 * @param {?} factories
 * @param {?} result
 * @return {?}
 */
function multiResolve(factories, result) {
    for (let i = 0; i < factories.length; i++) {
        /** @type {?} */
        const factory = /** @type {?} */ (((factories[i])));
        result.push(factory());
    }
    return result;
}
/**
 * Creates a multi factory.
 * @param {?} factoryFn
 * @param {?} index
 * @param {?} isViewProvider
 * @param {?} isComponent
 * @param {?} f
 * @return {?}
 */
function multiFactory(factoryFn, index, isViewProvider, isComponent, f) {
    /** @type {?} */
    const factory = new NodeInjectorFactory(factoryFn, isViewProvider, directiveInject);
    factory.multi = [];
    factory.index = index;
    factory.componentProviders = 0;
    multiFactoryAdd(factory, f, isComponent && !isViewProvider);
    return factory;
}
//# sourceMappingURL=di_setup.js.map