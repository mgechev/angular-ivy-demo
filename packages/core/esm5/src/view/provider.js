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
import { ChangeDetectorRef, SimpleChange, WrappedValue } from '../change_detection/change_detection';
import { INJECTOR, Injector, resolveForwardRef } from '../di';
import { ElementRef } from '../linker/element_ref';
import { TemplateRef } from '../linker/template_ref';
import { ViewContainerRef } from '../linker/view_container_ref';
import { Renderer as RendererV1, Renderer2 } from '../render/api';
import { stringify } from '../util';
import { isObservable } from '../util/lang';
import { createChangeDetectorRef, createInjector, createRendererV1 } from './refs';
import { Services, asElementData, asProviderData, shouldCallLifecycleInitHook } from './types';
import { calcBindingFlags, checkBinding, dispatchEvent, isComponentView, splitDepsDsl, splitMatchedQueriesDsl, tokenKey, viewParentEl } from './util';
/** @type {?} */
var RendererV1TokenKey = tokenKey(RendererV1);
/** @type {?} */
var Renderer2TokenKey = tokenKey(Renderer2);
/** @type {?} */
var ElementRefTokenKey = tokenKey(ElementRef);
/** @type {?} */
var ViewContainerRefTokenKey = tokenKey(ViewContainerRef);
/** @type {?} */
var TemplateRefTokenKey = tokenKey(TemplateRef);
/** @type {?} */
var ChangeDetectorRefTokenKey = tokenKey(ChangeDetectorRef);
/** @type {?} */
var InjectorRefTokenKey = tokenKey(Injector);
/** @type {?} */
var INJECTORRefTokenKey = tokenKey(INJECTOR);
/**
 * @param {?} checkIndex
 * @param {?} flags
 * @param {?} matchedQueries
 * @param {?} childCount
 * @param {?} ctor
 * @param {?} deps
 * @param {?=} props
 * @param {?=} outputs
 * @return {?}
 */
export function directiveDef(checkIndex, flags, matchedQueries, childCount, ctor, deps, props, outputs) {
    /** @type {?} */
    var bindings = [];
    if (props) {
        for (var prop in props) {
            var _a = props[prop], bindingIndex = _a[0], nonMinifiedName = _a[1];
            bindings[bindingIndex] = {
                flags: 8 /* TypeProperty */,
                name: prop, nonMinifiedName: nonMinifiedName,
                ns: null,
                securityContext: null,
                suffix: null
            };
        }
    }
    /** @type {?} */
    var outputDefs = [];
    if (outputs) {
        for (var propName in outputs) {
            outputDefs.push({ type: 1 /* DirectiveOutput */, propName: propName, target: null, eventName: outputs[propName] });
        }
    }
    flags |= 16384 /* TypeDirective */;
    return _def(checkIndex, flags, matchedQueries, childCount, ctor, ctor, deps, bindings, outputDefs);
}
/**
 * @param {?} flags
 * @param {?} ctor
 * @param {?} deps
 * @return {?}
 */
export function pipeDef(flags, ctor, deps) {
    flags |= 16 /* TypePipe */;
    return _def(-1, flags, null, 0, ctor, ctor, deps);
}
/**
 * @param {?} flags
 * @param {?} matchedQueries
 * @param {?} token
 * @param {?} value
 * @param {?} deps
 * @return {?}
 */
export function providerDef(flags, matchedQueries, token, value, deps) {
    return _def(-1, flags, matchedQueries, 0, token, value, deps);
}
/**
 * @param {?} checkIndex
 * @param {?} flags
 * @param {?} matchedQueriesDsl
 * @param {?} childCount
 * @param {?} token
 * @param {?} value
 * @param {?} deps
 * @param {?=} bindings
 * @param {?=} outputs
 * @return {?}
 */
export function _def(checkIndex, flags, matchedQueriesDsl, childCount, token, value, deps, bindings, outputs) {
    var _a = splitMatchedQueriesDsl(matchedQueriesDsl), matchedQueries = _a.matchedQueries, references = _a.references, matchedQueryIds = _a.matchedQueryIds;
    if (!outputs) {
        outputs = [];
    }
    if (!bindings) {
        bindings = [];
    }
    // Need to resolve forwardRefs as e.g. for `useValue` we
    // lowered the expression and then stopped evaluating it,
    // i.e. also didn't unwrap it.
    value = resolveForwardRef(value);
    /** @type {?} */
    var depDefs = splitDepsDsl(deps, stringify(token));
    return {
        // will bet set by the view definition
        nodeIndex: -1,
        parent: null,
        renderParent: null,
        bindingIndex: -1,
        outputIndex: -1,
        // regular values
        checkIndex: checkIndex,
        flags: flags,
        childFlags: 0,
        directChildFlags: 0,
        childMatchedQueries: 0, matchedQueries: matchedQueries, matchedQueryIds: matchedQueryIds, references: references,
        ngContentIndex: -1, childCount: childCount, bindings: bindings,
        bindingFlags: calcBindingFlags(bindings), outputs: outputs,
        element: null,
        provider: { token: token, value: value, deps: depDefs },
        text: null,
        query: null,
        ngContent: null
    };
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
export function createProviderInstance(view, def) {
    return _createProviderInstance(view, def);
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
export function createPipeInstance(view, def) {
    /** @type {?} */
    var compView = view;
    while (compView.parent && !isComponentView(compView)) {
        compView = compView.parent;
    }
    /** @type {?} */
    var allowPrivateServices = true;
    // pipes are always eager and classes!
    return createClass(/** @type {?} */ ((compView.parent)), /** @type {?} */ ((viewParentEl(compView))), allowPrivateServices, /** @type {?} */ ((def.provider)).value, /** @type {?} */ ((def.provider)).deps);
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
export function createDirectiveInstance(view, def) {
    /** @type {?} */
    var allowPrivateServices = (def.flags & 32768 /* Component */) > 0;
    /** @type {?} */
    var instance = createClass(view, /** @type {?} */ ((def.parent)), allowPrivateServices, /** @type {?} */ ((def.provider)).value, /** @type {?} */ ((def.provider)).deps);
    if (def.outputs.length) {
        for (var i = 0; i < def.outputs.length; i++) {
            /** @type {?} */
            var output = def.outputs[i];
            /** @type {?} */
            var outputObservable = instance[/** @type {?} */ ((output.propName))];
            if (isObservable(outputObservable)) {
                /** @type {?} */
                var subscription = outputObservable.subscribe(eventHandlerClosure(view, /** @type {?} */ ((def.parent)).nodeIndex, output.eventName)); /** @type {?} */
                ((view.disposables))[def.outputIndex + i] = subscription.unsubscribe.bind(subscription);
            }
            else {
                throw new Error("@Output " + output.propName + " not initialized in '" + instance.constructor.name + "'.");
            }
        }
    }
    return instance;
}
/**
 * @param {?} view
 * @param {?} index
 * @param {?} eventName
 * @return {?}
 */
function eventHandlerClosure(view, index, eventName) {
    return function (event) { return dispatchEvent(view, index, eventName, event); };
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} v0
 * @param {?} v1
 * @param {?} v2
 * @param {?} v3
 * @param {?} v4
 * @param {?} v5
 * @param {?} v6
 * @param {?} v7
 * @param {?} v8
 * @param {?} v9
 * @return {?}
 */
export function checkAndUpdateDirectiveInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    /** @type {?} */
    var providerData = asProviderData(view, def.nodeIndex);
    /** @type {?} */
    var directive = providerData.instance;
    /** @type {?} */
    var changed = false;
    /** @type {?} */
    var changes = /** @type {?} */ ((undefined));
    /** @type {?} */
    var bindLen = def.bindings.length;
    if (bindLen > 0 && checkBinding(view, def, 0, v0)) {
        changed = true;
        changes = updateProp(view, providerData, def, 0, v0, changes);
    }
    if (bindLen > 1 && checkBinding(view, def, 1, v1)) {
        changed = true;
        changes = updateProp(view, providerData, def, 1, v1, changes);
    }
    if (bindLen > 2 && checkBinding(view, def, 2, v2)) {
        changed = true;
        changes = updateProp(view, providerData, def, 2, v2, changes);
    }
    if (bindLen > 3 && checkBinding(view, def, 3, v3)) {
        changed = true;
        changes = updateProp(view, providerData, def, 3, v3, changes);
    }
    if (bindLen > 4 && checkBinding(view, def, 4, v4)) {
        changed = true;
        changes = updateProp(view, providerData, def, 4, v4, changes);
    }
    if (bindLen > 5 && checkBinding(view, def, 5, v5)) {
        changed = true;
        changes = updateProp(view, providerData, def, 5, v5, changes);
    }
    if (bindLen > 6 && checkBinding(view, def, 6, v6)) {
        changed = true;
        changes = updateProp(view, providerData, def, 6, v6, changes);
    }
    if (bindLen > 7 && checkBinding(view, def, 7, v7)) {
        changed = true;
        changes = updateProp(view, providerData, def, 7, v7, changes);
    }
    if (bindLen > 8 && checkBinding(view, def, 8, v8)) {
        changed = true;
        changes = updateProp(view, providerData, def, 8, v8, changes);
    }
    if (bindLen > 9 && checkBinding(view, def, 9, v9)) {
        changed = true;
        changes = updateProp(view, providerData, def, 9, v9, changes);
    }
    if (changes) {
        directive.ngOnChanges(changes);
    }
    if ((def.flags & 65536 /* OnInit */) &&
        shouldCallLifecycleInitHook(view, 256 /* InitState_CallingOnInit */, def.nodeIndex)) {
        directive.ngOnInit();
    }
    if (def.flags & 262144 /* DoCheck */) {
        directive.ngDoCheck();
    }
    return changed;
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} values
 * @return {?}
 */
export function checkAndUpdateDirectiveDynamic(view, def, values) {
    /** @type {?} */
    var providerData = asProviderData(view, def.nodeIndex);
    /** @type {?} */
    var directive = providerData.instance;
    /** @type {?} */
    var changed = false;
    /** @type {?} */
    var changes = /** @type {?} */ ((undefined));
    for (var i = 0; i < values.length; i++) {
        if (checkBinding(view, def, i, values[i])) {
            changed = true;
            changes = updateProp(view, providerData, def, i, values[i], changes);
        }
    }
    if (changes) {
        directive.ngOnChanges(changes);
    }
    if ((def.flags & 65536 /* OnInit */) &&
        shouldCallLifecycleInitHook(view, 256 /* InitState_CallingOnInit */, def.nodeIndex)) {
        directive.ngOnInit();
    }
    if (def.flags & 262144 /* DoCheck */) {
        directive.ngDoCheck();
    }
    return changed;
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
function _createProviderInstance(view, def) {
    /** @type {?} */
    var allowPrivateServices = (def.flags & 8192 /* PrivateProvider */) > 0;
    /** @type {?} */
    var providerDef = def.provider;
    switch (def.flags & 201347067 /* Types */) {
        case 512 /* TypeClassProvider */:
            return createClass(view, /** @type {?} */ ((def.parent)), allowPrivateServices, /** @type {?} */ ((providerDef)).value, /** @type {?} */ ((providerDef)).deps);
        case 1024 /* TypeFactoryProvider */:
            return callFactory(view, /** @type {?} */ ((def.parent)), allowPrivateServices, /** @type {?} */ ((providerDef)).value, /** @type {?} */ ((providerDef)).deps);
        case 2048 /* TypeUseExistingProvider */:
            return resolveDep(view, /** @type {?} */ ((def.parent)), allowPrivateServices, /** @type {?} */ ((providerDef)).deps[0]);
        case 256 /* TypeValueProvider */:
            return /** @type {?} */ ((providerDef)).value;
    }
}
/**
 * @param {?} view
 * @param {?} elDef
 * @param {?} allowPrivateServices
 * @param {?} ctor
 * @param {?} deps
 * @return {?}
 */
function createClass(view, elDef, allowPrivateServices, ctor, deps) {
    /** @type {?} */
    var len = deps.length;
    switch (len) {
        case 0:
            return new ctor();
        case 1:
            return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]));
        case 2:
            return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));
        case 3:
            return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));
        default:
            /** @type {?} */
            var depValues = new Array(len);
            for (var i = 0; i < len; i++) {
                depValues[i] = resolveDep(view, elDef, allowPrivateServices, deps[i]);
            }
            return new (ctor.bind.apply(ctor, [void 0].concat(depValues)))();
    }
}
/**
 * @param {?} view
 * @param {?} elDef
 * @param {?} allowPrivateServices
 * @param {?} factory
 * @param {?} deps
 * @return {?}
 */
function callFactory(view, elDef, allowPrivateServices, factory, deps) {
    /** @type {?} */
    var len = deps.length;
    switch (len) {
        case 0:
            return factory();
        case 1:
            return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]));
        case 2:
            return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));
        case 3:
            return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));
        default:
            /** @type {?} */
            var depValues = Array(len);
            for (var i = 0; i < len; i++) {
                depValues[i] = resolveDep(view, elDef, allowPrivateServices, deps[i]);
            }
            return factory.apply(void 0, depValues);
    }
}
/** @type {?} */
export var NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {};
/**
 * @param {?} view
 * @param {?} elDef
 * @param {?} allowPrivateServices
 * @param {?} depDef
 * @param {?=} notFoundValue
 * @return {?}
 */
export function resolveDep(view, elDef, allowPrivateServices, depDef, notFoundValue) {
    if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
    if (depDef.flags & 8 /* Value */) {
        return depDef.token;
    }
    /** @type {?} */
    var startView = view;
    if (depDef.flags & 2 /* Optional */) {
        notFoundValue = null;
    }
    /** @type {?} */
    var tokenKey = depDef.tokenKey;
    if (tokenKey === ChangeDetectorRefTokenKey) {
        // directives on the same element as a component should be able to control the change detector
        // of that component as well.
        allowPrivateServices = !!(elDef && /** @type {?} */ ((elDef.element)).componentView);
    }
    if (elDef && (depDef.flags & 1 /* SkipSelf */)) {
        allowPrivateServices = false;
        elDef = /** @type {?} */ ((elDef.parent));
    }
    /** @type {?} */
    var searchView = view;
    while (searchView) {
        if (elDef) {
            switch (tokenKey) {
                case RendererV1TokenKey: {
                    /** @type {?} */
                    var compView = findCompView(searchView, elDef, allowPrivateServices);
                    return createRendererV1(compView);
                }
                case Renderer2TokenKey: {
                    /** @type {?} */
                    var compView = findCompView(searchView, elDef, allowPrivateServices);
                    return compView.renderer;
                }
                case ElementRefTokenKey:
                    return new ElementRef(asElementData(searchView, elDef.nodeIndex).renderElement);
                case ViewContainerRefTokenKey:
                    return asElementData(searchView, elDef.nodeIndex).viewContainer;
                case TemplateRefTokenKey: {
                    if (/** @type {?} */ ((elDef.element)).template) {
                        return asElementData(searchView, elDef.nodeIndex).template;
                    }
                    break;
                }
                case ChangeDetectorRefTokenKey: {
                    /** @type {?} */
                    var cdView = findCompView(searchView, elDef, allowPrivateServices);
                    return createChangeDetectorRef(cdView);
                }
                case InjectorRefTokenKey:
                case INJECTORRefTokenKey:
                    return createInjector(searchView, elDef);
                default:
                    /** @type {?} */
                    var providerDef_1 = /** @type {?} */ (((allowPrivateServices ? /** @type {?} */ ((elDef.element)).allProviders : /** @type {?} */ ((elDef.element)).publicProviders)))[tokenKey];
                    if (providerDef_1) {
                        /** @type {?} */
                        var providerData = asProviderData(searchView, providerDef_1.nodeIndex);
                        if (!providerData) {
                            providerData = { instance: _createProviderInstance(searchView, providerDef_1) };
                            searchView.nodes[providerDef_1.nodeIndex] = /** @type {?} */ (providerData);
                        }
                        return providerData.instance;
                    }
            }
        }
        allowPrivateServices = isComponentView(searchView);
        elDef = /** @type {?} */ ((viewParentEl(searchView)));
        searchView = /** @type {?} */ ((searchView.parent));
        if (depDef.flags & 4 /* Self */) {
            searchView = null;
        }
    }
    /** @type {?} */
    var value = startView.root.injector.get(depDef.token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR);
    if (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ||
        notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) {
        // Return the value from the root element injector when
        // - it provides it
        //   (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
        // - the module injector should not be checked
        //   (notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
        return value;
    }
    return startView.root.ngModule.injector.get(depDef.token, notFoundValue);
}
/**
 * @param {?} view
 * @param {?} elDef
 * @param {?} allowPrivateServices
 * @return {?}
 */
function findCompView(view, elDef, allowPrivateServices) {
    /** @type {?} */
    var compView;
    if (allowPrivateServices) {
        compView = asElementData(view, elDef.nodeIndex).componentView;
    }
    else {
        compView = view;
        while (compView.parent && !isComponentView(compView)) {
            compView = compView.parent;
        }
    }
    return compView;
}
/**
 * @param {?} view
 * @param {?} providerData
 * @param {?} def
 * @param {?} bindingIdx
 * @param {?} value
 * @param {?} changes
 * @return {?}
 */
function updateProp(view, providerData, def, bindingIdx, value, changes) {
    if (def.flags & 32768 /* Component */) {
        /** @type {?} */
        var compView = asElementData(view, /** @type {?} */ ((def.parent)).nodeIndex).componentView;
        if (compView.def.flags & 2 /* OnPush */) {
            compView.state |= 8 /* ChecksEnabled */;
        }
    }
    /** @type {?} */
    var binding = def.bindings[bindingIdx];
    /** @type {?} */
    var propName = /** @type {?} */ ((binding.name));
    // Note: This is still safe with Closure Compiler as
    // the user passed in the property name as an object has to `providerDef`,
    // so Closure Compiler will have renamed the property correctly already.
    providerData.instance[propName] = value;
    if (def.flags & 524288 /* OnChanges */) {
        changes = changes || {};
        /** @type {?} */
        var oldValue = WrappedValue.unwrap(view.oldValues[def.bindingIndex + bindingIdx]);
        /** @type {?} */
        var binding_1 = def.bindings[bindingIdx];
        changes[/** @type {?} */ ((binding_1.nonMinifiedName))] =
            new SimpleChange(oldValue, value, (view.state & 2 /* FirstCheck */) !== 0);
    }
    view.oldValues[def.bindingIndex + bindingIdx] = value;
    return changes;
}
/**
 * @param {?} view
 * @param {?} lifecycles
 * @return {?}
 */
export function callLifecycleHooksChildrenFirst(view, lifecycles) {
    if (!(view.def.nodeFlags & lifecycles)) {
        return;
    }
    /** @type {?} */
    var nodes = view.def.nodes;
    /** @type {?} */
    var initIndex = 0;
    for (var i = 0; i < nodes.length; i++) {
        /** @type {?} */
        var nodeDef = nodes[i];
        /** @type {?} */
        var parent_1 = nodeDef.parent;
        if (!parent_1 && nodeDef.flags & lifecycles) {
            // matching root node (e.g. a pipe)
            callProviderLifecycles(view, i, nodeDef.flags & lifecycles, initIndex++);
        }
        if ((nodeDef.childFlags & lifecycles) === 0) {
            // no child matches one of the lifecycles
            i += nodeDef.childCount;
        }
        while (parent_1 && (parent_1.flags & 1 /* TypeElement */) &&
            i === parent_1.nodeIndex + parent_1.childCount) {
            // last child of an element
            if (parent_1.directChildFlags & lifecycles) {
                initIndex = callElementProvidersLifecycles(view, parent_1, lifecycles, initIndex);
            }
            parent_1 = parent_1.parent;
        }
    }
}
/**
 * @param {?} view
 * @param {?} elDef
 * @param {?} lifecycles
 * @param {?} initIndex
 * @return {?}
 */
function callElementProvidersLifecycles(view, elDef, lifecycles, initIndex) {
    for (var i = elDef.nodeIndex + 1; i <= elDef.nodeIndex + elDef.childCount; i++) {
        /** @type {?} */
        var nodeDef = view.def.nodes[i];
        if (nodeDef.flags & lifecycles) {
            callProviderLifecycles(view, i, nodeDef.flags & lifecycles, initIndex++);
        }
        // only visit direct children
        i += nodeDef.childCount;
    }
    return initIndex;
}
/**
 * @param {?} view
 * @param {?} index
 * @param {?} lifecycles
 * @param {?} initIndex
 * @return {?}
 */
function callProviderLifecycles(view, index, lifecycles, initIndex) {
    /** @type {?} */
    var providerData = asProviderData(view, index);
    if (!providerData) {
        return;
    }
    /** @type {?} */
    var provider = providerData.instance;
    if (!provider) {
        return;
    }
    Services.setCurrentNode(view, index);
    if (lifecycles & 1048576 /* AfterContentInit */ &&
        shouldCallLifecycleInitHook(view, 512 /* InitState_CallingAfterContentInit */, initIndex)) {
        provider.ngAfterContentInit();
    }
    if (lifecycles & 2097152 /* AfterContentChecked */) {
        provider.ngAfterContentChecked();
    }
    if (lifecycles & 4194304 /* AfterViewInit */ &&
        shouldCallLifecycleInitHook(view, 768 /* InitState_CallingAfterViewInit */, initIndex)) {
        provider.ngAfterViewInit();
    }
    if (lifecycles & 8388608 /* AfterViewChecked */) {
        provider.ngAfterViewChecked();
    }
    if (lifecycles & 131072 /* OnDestroy */) {
        provider.ngOnDestroy();
    }
}
//# sourceMappingURL=provider.js.map