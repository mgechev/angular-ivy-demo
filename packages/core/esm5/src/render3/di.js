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
import { getInjectableDef, getInjectorDef } from '../di/defs';
import { InjectFlags, injectRootLimpMode, setInjectImplementation } from '../di/injector_compatibility';
import { assertDefined, assertEqual } from './assert';
import { getComponentDef, getDirectiveDef, getPipeDef } from './definition';
import { NG_ELEMENT_ID } from './fields';
import { NO_PARENT_INJECTOR, PARENT_INJECTOR, TNODE, isFactory } from './interfaces/injector';
import { DECLARATION_VIEW, HOST_NODE, INJECTOR, TVIEW } from './interfaces/view';
import { assertNodeOfPossibleTypes } from './node_assert';
import { getLView, getPreviousOrParentTNode, setTNodeAndViewData } from './state';
import { getParentInjectorIndex, getParentInjectorView, hasParentInjector, isComponent, stringify } from './util';
/** *
 * Defines if the call to `inject` should include `viewProviders` in its resolution.
 *
 * This is set to true when we try to instantiate a component. This value is reset in
 * `getNodeInjectable` to a value which matches the declaration location of the token about to be
 * instantiated. This is done so that if we are injecting a token which was declared outside of
 * `viewProviders` we don't accidentally pull `viewProviders` in.
 *
 * Example:
 *
 * ```
 * \@Injectable()
 * class MyService {
 *   constructor(public value: String) {}
 * }
 *
 * \@Component({
 *   providers: [
 *     MyService,
 *     {provide: String, value: 'providers' }
 *   ]
 *   viewProviders: [
 *     {provide: String, value: 'viewProviders'}
 *   ]
 * })
 * class MyComponent {
 *   constructor(myService: MyService, value: String) {
 *     // We expect that Component can see into `viewProviders`.
 *     expect(value).toEqual('viewProviders');
 *     // `MyService` was not declared in `viewProviders` hence it can't see it.
 *     expect(myService.value).toEqual('providers');
 *   }
 * }
 *
 * ```
  @type {?} */
var includeViewProviders = false;
/**
 * @param {?} v
 * @return {?}
 */
function setIncludeViewProviders(v) {
    /** @type {?} */
    var oldValue = includeViewProviders;
    includeViewProviders = v;
    return oldValue;
}
/** *
 * The number of slots in each bloom filter (used by DI). The larger this number, the fewer
 * directives that will share slots, and thus, the fewer false positives when checking for
 * the existence of a directive.
  @type {?} */
var BLOOM_SIZE = 256;
/** @type {?} */
var BLOOM_MASK = BLOOM_SIZE - 1;
/** *
 * Counter used to generate unique IDs for directives.
  @type {?} */
var nextNgElementId = 0;
/**
 * Registers this directive as present in its node's injector by flipping the directive's
 * corresponding bit in the injector's bloom filter.
 *
 * @param {?} injectorIndex The index of the node injector where this token should be registered
 * @param {?} tView The TView for the injector's bloom filters
 * @param {?} type The directive token to register
 * @return {?}
 */
export function bloomAdd(injectorIndex, tView, type) {
    ngDevMode && assertEqual(tView.firstTemplatePass, true, 'expected firstTemplatePass to be true');
    /** @type {?} */
    var id = typeof type !== 'string' ? (/** @type {?} */ (type))[NG_ELEMENT_ID] : type.charCodeAt(0) || 0;
    // Set a unique ID on the directive type, so if something tries to inject the directive,
    // we can easily retrieve the ID and hash it into the bloom bit that should be checked.
    if (id == null) {
        id = (/** @type {?} */ (type))[NG_ELEMENT_ID] = nextNgElementId++;
    }
    /** @type {?} */
    var bloomBit = id & BLOOM_MASK;
    /** @type {?} */
    var mask = 1 << bloomBit;
    /** @type {?} */
    var b7 = bloomBit & 0x80;
    /** @type {?} */
    var b6 = bloomBit & 0x40;
    /** @type {?} */
    var b5 = bloomBit & 0x20;
    /** @type {?} */
    var tData = /** @type {?} */ (tView.data);
    if (b7) {
        b6 ? (b5 ? (tData[injectorIndex + 7] |= mask) : (tData[injectorIndex + 6] |= mask)) :
            (b5 ? (tData[injectorIndex + 5] |= mask) : (tData[injectorIndex + 4] |= mask));
    }
    else {
        b6 ? (b5 ? (tData[injectorIndex + 3] |= mask) : (tData[injectorIndex + 2] |= mask)) :
            (b5 ? (tData[injectorIndex + 1] |= mask) : (tData[injectorIndex] |= mask));
    }
}
/**
 * Creates (or gets an existing) injector for a given element or container.
 *
 * @param {?} tNode for which an injector should be retrieved / created.
 * @param {?} hostView View where the node is stored
 * @return {?} Node injector
 */
export function getOrCreateNodeInjectorForNode(tNode, hostView) {
    /** @type {?} */
    var existingInjectorIndex = getInjectorIndex(tNode, hostView);
    if (existingInjectorIndex !== -1) {
        return existingInjectorIndex;
    }
    /** @type {?} */
    var tView = hostView[TVIEW];
    if (tView.firstTemplatePass) {
        tNode.injectorIndex = hostView.length;
        insertBloom(tView.data, tNode); // foundation for node bloom
        insertBloom(hostView, null); // foundation for cumulative bloom
        insertBloom(tView.blueprint, null);
        ngDevMode && assertEqual(tNode.flags === 0 || tNode.flags === 4096 /* isComponent */, true, 'expected tNode.flags to not be initialized');
    }
    /** @type {?} */
    var parentLoc = getParentInjectorLocation(tNode, hostView);
    /** @type {?} */
    var parentIndex = getParentInjectorIndex(parentLoc);
    /** @type {?} */
    var parentLView = getParentInjectorView(parentLoc, hostView);
    /** @type {?} */
    var injectorIndex = tNode.injectorIndex;
    // If a parent injector can't be found, its location is set to -1.
    // In that case, we don't need to set up a cumulative bloom
    if (hasParentInjector(parentLoc)) {
        /** @type {?} */
        var parentData = /** @type {?} */ (parentLView[TVIEW].data);
        // Creates a cumulative bloom filter that merges the parent's bloom filter
        // and its own cumulative bloom (which contains tokens for all ancestors)
        for (var i = 0; i < 8; i++) {
            hostView[injectorIndex + i] = parentLView[parentIndex + i] | parentData[parentIndex + i];
        }
    }
    hostView[injectorIndex + PARENT_INJECTOR] = parentLoc;
    return injectorIndex;
}
/**
 * @param {?} arr
 * @param {?} footer
 * @return {?}
 */
function insertBloom(arr, footer) {
    arr.push(0, 0, 0, 0, 0, 0, 0, 0, footer);
}
/**
 * @param {?} tNode
 * @param {?} hostView
 * @return {?}
 */
export function getInjectorIndex(tNode, hostView) {
    if (tNode.injectorIndex === -1 ||
        // If the injector index is the same as its parent's injector index, then the index has been
        // copied down from the parent node. No injector has been created yet on this node.
        (tNode.parent && tNode.parent.injectorIndex === tNode.injectorIndex) ||
        // After the first template pass, the injector index might exist but the parent values
        // might not have been calculated yet for this instance
        hostView[tNode.injectorIndex + PARENT_INJECTOR] == null) {
        return -1;
    }
    else {
        return tNode.injectorIndex;
    }
}
/**
 * Finds the index of the parent injector, with a view offset if applicable. Used to set the
 * parent injector initially.
 *
 * Returns a combination of number of `ViewData` we have to go up and index in that `Viewdata`
 * @param {?} tNode
 * @param {?} view
 * @return {?}
 */
export function getParentInjectorLocation(tNode, view) {
    if (tNode.parent && tNode.parent.injectorIndex !== -1) {
        return /** @type {?} */ (tNode.parent.injectorIndex); // ViewOffset is 0, AcrossHostBoundary is 0
    }
    /** @type {?} */
    var hostTNode = view[HOST_NODE];
    /** @type {?} */
    var viewOffset = 1;
    while (hostTNode && hostTNode.injectorIndex === -1) {
        view = /** @type {?} */ ((view[DECLARATION_VIEW]));
        hostTNode = /** @type {?} */ ((view[HOST_NODE]));
        viewOffset++;
    }
    /** @type {?} */
    var acrossHostBoundary = hostTNode && hostTNode.type === 3 /* Element */ ?
        32768 /* AcrossHostBoundary */ :
        0;
    return hostTNode ?
        hostTNode.injectorIndex | (viewOffset << 16 /* ViewOffsetShift */) |
            acrossHostBoundary : /** @type {?} */ (-1);
}
/**
 * Makes a type or an injection token public to the DI system by adding it to an
 * injector's bloom filter.
 *
 * @param {?} injectorIndex
 * @param {?} view
 * @param {?} token The type or the injection token to be made public
 * @return {?}
 */
export function diPublicInInjector(injectorIndex, view, token) {
    bloomAdd(injectorIndex, view[TVIEW], token);
}
/**
 * Inject static attribute value into directive constructor.
 *
 * This method is used with `factory` functions which are generated as part of
 * `defineDirective` or `defineComponent`. The method retrieves the static value
 * of an attribute. (Dynamic attributes are not supported since they are not resolved
 *  at the time of injection and can change over time.)
 *
 * # Example
 * Given:
 * ```
 * \@Component(...)
 * class MyComponent {
 *   constructor(\@Attribute('title') title: string) { ... }
 * }
 * ```
 * When instantiated with
 * ```
 * <my-component title="Hello"></my-component>
 * ```
 *
 * Then factory method generated is:
 * ```
 * MyComponent.ngComponentDef = defineComponent({
 *   factory: () => new MyComponent(injectAttribute('title'))
 *   ...
 * })
 * ```
 *
 * \@publicApi
 * @param {?} tNode
 * @param {?} attrNameToInject
 * @return {?}
 */
export function injectAttributeImpl(tNode, attrNameToInject) {
    ngDevMode && assertNodeOfPossibleTypes(tNode, 0 /* Container */, 3 /* Element */, 4 /* ElementContainer */);
    ngDevMode && assertDefined(tNode, 'expecting tNode');
    /** @type {?} */
    var attrs = tNode.attrs;
    if (attrs) {
        for (var i = 0; i < attrs.length; i = i + 2) {
            /** @type {?} */
            var attrName = attrs[i];
            if (attrName === 1 /* SelectOnly */)
                break;
            if (attrName == attrNameToInject) {
                return /** @type {?} */ (attrs[i + 1]);
            }
        }
    }
    return null;
}
/**
 * Returns the value associated to the given token from the NodeInjectors => ModuleInjector.
 *
 * Look for the injector providing the token by walking up the node injector tree and then
 * the module injector tree.
 *
 * @template T
 * @param {?} tNode
 * @param {?} lView
 * @param {?} token The token to look for
 * @param {?=} flags Injection flags
 * @param {?=} notFoundValue
 * @return {?} the value from the injector or `null` when not found
 */
export function getOrCreateInjectable(tNode, lView, token, flags, notFoundValue) {
    if (flags === void 0) { flags = InjectFlags.Default; }
    /** @type {?} */
    var bloomHash = bloomHashBitOrFactory(token);
    // If the ID stored here is a function, this is a special object like ElementRef or TemplateRef
    // so just call the factory function to create it.
    if (typeof bloomHash === 'function') {
        /** @type {?} */
        var savePreviousOrParentTNode = getPreviousOrParentTNode();
        /** @type {?} */
        var saveLView = getLView();
        setTNodeAndViewData(tNode, lView);
        try {
            /** @type {?} */
            var value = bloomHash();
            if (value == null && !(flags & InjectFlags.Optional)) {
                throw new Error("No provider for " + stringify(token));
            }
            else {
                return value;
            }
        }
        finally {
            setTNodeAndViewData(savePreviousOrParentTNode, saveLView);
        }
    }
    else if (typeof bloomHash == 'number') {
        /** @type {?} */
        var previousTView = null;
        /** @type {?} */
        var injectorIndex = getInjectorIndex(tNode, lView);
        /** @type {?} */
        var parentLocation = NO_PARENT_INJECTOR;
        // If we should skip this injector, or if there is no injector on this node, start by searching
        // the parent injector.
        if (injectorIndex === -1 || flags & InjectFlags.SkipSelf) {
            parentLocation = injectorIndex === -1 ? getParentInjectorLocation(tNode, lView) :
                lView[injectorIndex + PARENT_INJECTOR];
            if (!shouldSearchParent(flags, parentLocation)) {
                injectorIndex = -1;
            }
            else {
                previousTView = lView[TVIEW];
                injectorIndex = getParentInjectorIndex(parentLocation);
                lView = getParentInjectorView(parentLocation, lView);
            }
        }
        // Traverse up the injector tree until we find a potential match or until we know there
        // *isn't* a match.
        while (injectorIndex !== -1) {
            parentLocation = lView[injectorIndex + PARENT_INJECTOR];
            /** @type {?} */
            var tView = lView[TVIEW];
            if (bloomHasToken(bloomHash, injectorIndex, tView.data)) {
                /** @type {?} */
                var instance = searchTokensOnInjector(injectorIndex, lView, token, previousTView);
                if (instance !== NOT_FOUND) {
                    return instance;
                }
            }
            if (shouldSearchParent(flags, parentLocation) &&
                bloomHasToken(bloomHash, injectorIndex, lView)) {
                // The def wasn't found anywhere on this node, so it was a false positive.
                // Traverse up the tree and continue searching.
                previousTView = tView;
                injectorIndex = getParentInjectorIndex(parentLocation);
                lView = getParentInjectorView(parentLocation, lView);
            }
            else {
                // If we should not search parent OR If the ancestor bloom filter value does not have the
                // bit corresponding to the directive we can give up on traversing up to find the specific
                // injector.
                injectorIndex = -1;
            }
        }
    }
    if (flags & InjectFlags.Optional && notFoundValue === undefined) {
        // This must be set or the NullInjector will throw for optional deps
        notFoundValue = null;
    }
    if ((flags & (InjectFlags.Self | InjectFlags.Host)) === 0) {
        /** @type {?} */
        var moduleInjector = lView[INJECTOR];
        if (moduleInjector) {
            return moduleInjector.get(token, notFoundValue, flags & InjectFlags.Optional);
        }
        else {
            return injectRootLimpMode(token, notFoundValue, flags & InjectFlags.Optional);
        }
    }
    if (flags & InjectFlags.Optional) {
        return notFoundValue;
    }
    else {
        throw new Error("NodeInjector: NOT_FOUND [" + stringify(token) + "]");
    }
}
/** @type {?} */
var NOT_FOUND = {};
/**
 * @template T
 * @param {?} injectorIndex
 * @param {?} injectorView
 * @param {?} token
 * @param {?} previousTView
 * @return {?}
 */
function searchTokensOnInjector(injectorIndex, injectorView, token, previousTView) {
    /** @type {?} */
    var currentTView = injectorView[TVIEW];
    /** @type {?} */
    var tNode = /** @type {?} */ (currentTView.data[injectorIndex + TNODE]);
    /** @type {?} */
    var canAccessViewProviders = false;
    // We need to determine if view providers can be accessed by the starting element.
    // It happens in 2 cases:
    // 1) On the initial element injector , if we are instantiating a token which can see the
    // viewProviders of the component of that element. Such token are:
    // - the component itself (but not other directives)
    // - viewProviders tokens of the component (but not providers tokens)
    // 2) Upper in the element injector tree, if the starting element is actually in the view of
    // the current element. To determine this, we track the transition of view during the climb,
    // and check the host node of the current view to identify component views.
    if (previousTView == null && isComponent(tNode) && includeViewProviders ||
        previousTView != null && previousTView != currentTView &&
            (currentTView.node == null || currentTView.node.type === 3 /* Element */)) {
        canAccessViewProviders = true;
    }
    /** @type {?} */
    var injectableIdx = locateDirectiveOrProvider(tNode, injectorView, token, canAccessViewProviders);
    if (injectableIdx !== null) {
        return getNodeInjectable(currentTView.data, injectorView, injectableIdx, /** @type {?} */ (tNode));
    }
    else {
        return NOT_FOUND;
    }
}
/**
 * Searches for the given token among the node's directives and providers.
 *
 * @template T
 * @param {?} tNode TNode on which directives are present.
 * @param {?} lView The view we are currently processing
 * @param {?} token Provider token or type of a directive to look for.
 * @param {?} canAccessViewProviders Whether view providers should be considered.
 * @return {?} Index of a found directive or provider, or null when none found.
 */
export function locateDirectiveOrProvider(tNode, lView, token, canAccessViewProviders) {
    /** @type {?} */
    var tView = lView[TVIEW];
    /** @type {?} */
    var nodeFlags = tNode.flags;
    /** @type {?} */
    var nodeProviderIndexes = tNode.providerIndexes;
    /** @type {?} */
    var tInjectables = tView.data;
    /** @type {?} */
    var startInjectables = nodeProviderIndexes & 65535 /* ProvidersStartIndexMask */;
    /** @type {?} */
    var startDirectives = nodeFlags >> 16 /* DirectiveStartingIndexShift */;
    /** @type {?} */
    var cptViewProvidersCount = nodeProviderIndexes >> 16 /* CptViewProvidersCountShift */;
    /** @type {?} */
    var startingIndex = canAccessViewProviders ? startInjectables : startInjectables + cptViewProvidersCount;
    /** @type {?} */
    var directiveCount = nodeFlags & 4095 /* DirectiveCountMask */;
    for (var i = startingIndex; i < startDirectives + directiveCount; i++) {
        /** @type {?} */
        var providerTokenOrDef = /** @type {?} */ (tInjectables[i]);
        if (i < startDirectives && token === providerTokenOrDef ||
            i >= startDirectives && (/** @type {?} */ (providerTokenOrDef)).type === token) {
            return i;
        }
    }
    return null;
}
/**
 * Retrieve or instantiate the injectable from the `lData` at particular `index`.
 *
 * This function checks to see if the value has already been instantiated and if so returns the
 * cached `injectable`. Otherwise if it detects that the value is still a factory it
 * instantiates the `injectable` and caches the value.
 * @param {?} tData
 * @param {?} lData
 * @param {?} index
 * @param {?} tNode
 * @return {?}
 */
export function getNodeInjectable(tData, lData, index, tNode) {
    /** @type {?} */
    var value = lData[index];
    if (isFactory(value)) {
        /** @type {?} */
        var factory = value;
        if (factory.resolving) {
            throw new Error("Circular dep for " + stringify(tData[index]));
        }
        /** @type {?} */
        var previousIncludeViewProviders = setIncludeViewProviders(factory.canSeeViewProviders);
        factory.resolving = true;
        /** @type {?} */
        var previousInjectImplementation = void 0;
        if (factory.injectImpl) {
            previousInjectImplementation = setInjectImplementation(factory.injectImpl);
        }
        /** @type {?} */
        var savePreviousOrParentTNode = getPreviousOrParentTNode();
        /** @type {?} */
        var saveLView = getLView();
        setTNodeAndViewData(tNode, lData);
        try {
            value = lData[index] = factory.factory(null, tData, lData, tNode);
        }
        finally {
            if (factory.injectImpl)
                setInjectImplementation(previousInjectImplementation);
            setIncludeViewProviders(previousIncludeViewProviders);
            factory.resolving = false;
            setTNodeAndViewData(savePreviousOrParentTNode, saveLView);
        }
    }
    return value;
}
/**
 * Returns the bit in an injector's bloom filter that should be used to determine whether or not
 * the directive might be provided by the injector.
 *
 * When a directive is public, it is added to the bloom filter and given a unique ID that can be
 * retrieved on the Type. When the directive isn't public or the token is not a directive `null`
 * is returned as the node injector can not possibly provide that token.
 *
 * @param {?} token the injection token
 * @return {?} the matching bit to check in the bloom filter or `null` if the token is not known.
 */
export function bloomHashBitOrFactory(token) {
    ngDevMode && assertDefined(token, 'token must be defined');
    if (typeof token === 'string') {
        return token.charCodeAt(0) || 0;
    }
    /** @type {?} */
    var tokenId = (/** @type {?} */ (token))[NG_ELEMENT_ID];
    return typeof tokenId === 'number' ? tokenId & BLOOM_MASK : tokenId;
}
/**
 * @param {?} bloomHash
 * @param {?} injectorIndex
 * @param {?} injectorView
 * @return {?}
 */
export function bloomHasToken(bloomHash, injectorIndex, injectorView) {
    /** @type {?} */
    var mask = 1 << bloomHash;
    /** @type {?} */
    var b7 = bloomHash & 0x80;
    /** @type {?} */
    var b6 = bloomHash & 0x40;
    /** @type {?} */
    var b5 = bloomHash & 0x20;
    /** @type {?} */
    var value;
    if (b7) {
        value = b6 ? (b5 ? injectorView[injectorIndex + 7] : injectorView[injectorIndex + 6]) :
            (b5 ? injectorView[injectorIndex + 5] : injectorView[injectorIndex + 4]);
    }
    else {
        value = b6 ? (b5 ? injectorView[injectorIndex + 3] : injectorView[injectorIndex + 2]) :
            (b5 ? injectorView[injectorIndex + 1] : injectorView[injectorIndex]);
    }
    // If the bloom filter value has the bit corresponding to the directive's bloomBit flipped on,
    // this injector is a potential match.
    return !!(value & mask);
}
/**
 * Returns true if flags prevent parent injector from being searched for tokens
 * @param {?} flags
 * @param {?} parentLocation
 * @return {?}
 */
function shouldSearchParent(flags, parentLocation) {
    return !(flags & InjectFlags.Self ||
        (flags & InjectFlags.Host &&
            ((/** @type {?} */ ((parentLocation))) & 32768 /* AcrossHostBoundary */)));
}
/**
 * @return {?}
 */
export function injectInjector() {
    /** @type {?} */
    var tNode = /** @type {?} */ (getPreviousOrParentTNode());
    return new NodeInjector(tNode, getLView());
}
var NodeInjector = /** @class */ (function () {
    function NodeInjector(_tNode, _lView) {
        this._tNode = _tNode;
        this._lView = _lView;
        this._injectorIndex = getOrCreateNodeInjectorForNode(_tNode, _lView);
    }
    /**
     * @param {?} token
     * @return {?}
     */
    NodeInjector.prototype.get = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        /** @type {?} */
        var previousTNode = getPreviousOrParentTNode();
        /** @type {?} */
        var previousLView = getLView();
        setTNodeAndViewData(this._tNode, this._lView);
        try {
            return getOrCreateInjectable(this._tNode, this._lView, token);
        }
        finally {
            setTNodeAndViewData(previousTNode, previousLView);
        }
    };
    return NodeInjector;
}());
export { NodeInjector };
if (false) {
    /** @type {?} */
    NodeInjector.prototype._injectorIndex;
    /** @type {?} */
    NodeInjector.prototype._tNode;
    /** @type {?} */
    NodeInjector.prototype._lView;
}
/**
 * @template T
 * @param {?} type
 * @return {?}
 */
export function getFactoryOf(type) {
    /** @type {?} */
    var typeAny = /** @type {?} */ (type);
    /** @type {?} */
    var def = getComponentDef(typeAny) || getDirectiveDef(typeAny) ||
        getPipeDef(typeAny) || getInjectableDef(typeAny) || getInjectorDef(typeAny);
    if (!def || def.factory === undefined) {
        return null;
    }
    return def.factory;
}
/**
 * @template T
 * @param {?} type
 * @return {?}
 */
export function getInheritedFactory(type) {
    /** @type {?} */
    var proto = /** @type {?} */ (Object.getPrototypeOf(type.prototype).constructor);
    /** @type {?} */
    var factory = getFactoryOf(proto);
    if (factory !== null) {
        return factory;
    }
    else {
        // There is no factory defined. Either this was improper usage of inheritance
        // (no Angular decorator on the superclass) or there is no constructor at all
        // in the inheritance chain. Since the two cases cannot be distinguished, the
        // latter has to be assumed.
        return function (t) { return new t(); };
    }
}
//# sourceMappingURL=di.js.map