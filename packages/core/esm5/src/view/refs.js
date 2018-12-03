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
import { Injector } from '../di/injector';
import { InjectFlags } from '../di/injector_compatibility';
import { ComponentFactory, ComponentRef } from '../linker/component_factory';
import { ComponentFactoryBoundToModule, ComponentFactoryResolver } from '../linker/component_factory_resolver';
import { ElementRef } from '../linker/element_ref';
import { NgModuleRef } from '../linker/ng_module_factory';
import { TemplateRef } from '../linker/template_ref';
import { stringify } from '../util';
import { VERSION } from '../version';
import { callNgModuleLifecycle, initNgModule, resolveNgModuleDep } from './ng_module';
import { Services, asElementData, asProviderData, asTextData } from './types';
import { markParentViewsForCheck, resolveDefinition, rootRenderNodes, splitNamespace, tokenKey, viewParentEl } from './util';
import { attachEmbeddedView, detachEmbeddedView, moveEmbeddedView, renderDetachView } from './view_attach';
/** @type {?} */
var EMPTY_CONTEXT = new Object();
/**
 * @param {?} selector
 * @param {?} componentType
 * @param {?} viewDefFactory
 * @param {?} inputs
 * @param {?} outputs
 * @param {?} ngContentSelectors
 * @return {?}
 */
export function createComponentFactory(selector, componentType, viewDefFactory, inputs, outputs, ngContentSelectors) {
    return new ComponentFactory_(selector, componentType, viewDefFactory, inputs, outputs, ngContentSelectors);
}
/**
 * @param {?} componentFactory
 * @return {?}
 */
export function getComponentViewDefinitionFactory(componentFactory) {
    return (/** @type {?} */ (componentFactory)).viewDefFactory;
}
var ComponentFactory_ = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentFactory_, _super);
    function ComponentFactory_(selector, componentType, viewDefFactory, _inputs, _outputs, ngContentSelectors) {
        var _this = 
        // Attention: this ctor is called as top level function.
        // Putting any logic in here will destroy closure tree shaking!
        _super.call(this) || this;
        _this.selector = selector;
        _this.componentType = componentType;
        _this._inputs = _inputs;
        _this._outputs = _outputs;
        _this.ngContentSelectors = ngContentSelectors;
        _this.viewDefFactory = viewDefFactory;
        return _this;
    }
    Object.defineProperty(ComponentFactory_.prototype, "inputs", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var inputsArr = [];
            /** @type {?} */
            var inputs = /** @type {?} */ ((this._inputs));
            for (var propName in inputs) {
                /** @type {?} */
                var templateName = inputs[propName];
                inputsArr.push({ propName: propName, templateName: templateName });
            }
            return inputsArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentFactory_.prototype, "outputs", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var outputsArr = [];
            for (var propName in this._outputs) {
                /** @type {?} */
                var templateName = this._outputs[propName];
                outputsArr.push({ propName: propName, templateName: templateName });
            }
            return outputsArr;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new component.
     */
    /**
     * Creates a new component.
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @param {?=} ngModule
     * @return {?}
     */
    ComponentFactory_.prototype.create = /**
     * Creates a new component.
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @param {?=} ngModule
     * @return {?}
     */
    function (injector, projectableNodes, rootSelectorOrNode, ngModule) {
        if (!ngModule) {
            throw new Error('ngModule should be provided');
        }
        /** @type {?} */
        var viewDef = resolveDefinition(this.viewDefFactory);
        /** @type {?} */
        var componentNodeIndex = /** @type {?} */ ((/** @type {?} */ ((viewDef.nodes[0].element)).componentProvider)).nodeIndex;
        /** @type {?} */
        var view = Services.createRootView(injector, projectableNodes || [], rootSelectorOrNode, viewDef, ngModule, EMPTY_CONTEXT);
        /** @type {?} */
        var component = asProviderData(view, componentNodeIndex).instance;
        if (rootSelectorOrNode) {
            view.renderer.setAttribute(asElementData(view, 0).renderElement, 'ng-version', VERSION.full);
        }
        return new ComponentRef_(view, new ViewRef_(view), component);
    };
    return ComponentFactory_;
}(ComponentFactory));
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    ComponentFactory_.prototype.viewDefFactory;
    /** @type {?} */
    ComponentFactory_.prototype.selector;
    /** @type {?} */
    ComponentFactory_.prototype.componentType;
    /** @type {?} */
    ComponentFactory_.prototype._inputs;
    /** @type {?} */
    ComponentFactory_.prototype._outputs;
    /** @type {?} */
    ComponentFactory_.prototype.ngContentSelectors;
}
var ComponentRef_ = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentRef_, _super);
    function ComponentRef_(_view, _viewRef, _component) {
        var _this = _super.call(this) || this;
        _this._view = _view;
        _this._viewRef = _viewRef;
        _this._component = _component;
        _this._elDef = _this._view.def.nodes[0];
        _this.hostView = _viewRef;
        _this.changeDetectorRef = _viewRef;
        _this.instance = _component;
        return _this;
    }
    Object.defineProperty(ComponentRef_.prototype, "location", {
        get: /**
         * @return {?}
         */
        function () {
            return new ElementRef(asElementData(this._view, this._elDef.nodeIndex).renderElement);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "injector", {
        get: /**
         * @return {?}
         */
        function () { return new Injector_(this._view, this._elDef); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "componentType", {
        get: /**
         * @return {?}
         */
        function () { return /** @type {?} */ (this._component.constructor); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ComponentRef_.prototype.destroy = /**
     * @return {?}
     */
    function () { this._viewRef.destroy(); };
    /**
     * @param {?} callback
     * @return {?}
     */
    ComponentRef_.prototype.onDestroy = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) { this._viewRef.onDestroy(callback); };
    return ComponentRef_;
}(ComponentRef));
if (false) {
    /** @type {?} */
    ComponentRef_.prototype.hostView;
    /** @type {?} */
    ComponentRef_.prototype.instance;
    /** @type {?} */
    ComponentRef_.prototype.changeDetectorRef;
    /** @type {?} */
    ComponentRef_.prototype._elDef;
    /** @type {?} */
    ComponentRef_.prototype._view;
    /** @type {?} */
    ComponentRef_.prototype._viewRef;
    /** @type {?} */
    ComponentRef_.prototype._component;
}
/**
 * @param {?} view
 * @param {?} elDef
 * @param {?} elData
 * @return {?}
 */
export function createViewContainerData(view, elDef, elData) {
    return new ViewContainerRef_(view, elDef, elData);
}
var ViewContainerRef_ = /** @class */ (function () {
    function ViewContainerRef_(_view, _elDef, _data) {
        this._view = _view;
        this._elDef = _elDef;
        this._data = _data;
        /**
         * \@internal
         */
        this._embeddedViews = [];
    }
    Object.defineProperty(ViewContainerRef_.prototype, "element", {
        get: /**
         * @return {?}
         */
        function () { return new ElementRef(this._data.renderElement); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "injector", {
        get: /**
         * @return {?}
         */
        function () { return new Injector_(this._view, this._elDef); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
        /** @deprecated No replacement */
        get: /**
         * @deprecated No replacement
         * @return {?}
         */
        function () {
            /** @type {?} */
            var view = this._view;
            /** @type {?} */
            var elDef = this._elDef.parent;
            while (!elDef && view) {
                elDef = viewParentEl(view);
                view = /** @type {?} */ ((view.parent));
            }
            return view ? new Injector_(view, elDef) : new Injector_(this._view, null);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ViewContainerRef_.prototype.clear = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var len = this._embeddedViews.length;
        for (var i = len - 1; i >= 0; i--) {
            /** @type {?} */
            var view = /** @type {?} */ ((detachEmbeddedView(this._data, i)));
            Services.destroyView(view);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ViewContainerRef_.prototype.get = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var view = this._embeddedViews[index];
        if (view) {
            /** @type {?} */
            var ref = new ViewRef_(view);
            ref.attachToViewContainerRef(this);
            return ref;
        }
        return null;
    };
    Object.defineProperty(ViewContainerRef_.prototype, "length", {
        get: /**
         * @return {?}
         */
        function () { return this._embeddedViews.length; },
        enumerable: true,
        configurable: true
    });
    /**
     * @template C
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef_.prototype.createEmbeddedView = /**
     * @template C
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    function (templateRef, context, index) {
        /** @type {?} */
        var viewRef = templateRef.createEmbeddedView(context || /** @type {?} */ ({}));
        this.insert(viewRef, index);
        return viewRef;
    };
    /**
     * @template C
     * @param {?} componentFactory
     * @param {?=} index
     * @param {?=} injector
     * @param {?=} projectableNodes
     * @param {?=} ngModuleRef
     * @return {?}
     */
    ViewContainerRef_.prototype.createComponent = /**
     * @template C
     * @param {?} componentFactory
     * @param {?=} index
     * @param {?=} injector
     * @param {?=} projectableNodes
     * @param {?=} ngModuleRef
     * @return {?}
     */
    function (componentFactory, index, injector, projectableNodes, ngModuleRef) {
        /** @type {?} */
        var contextInjector = injector || this.parentInjector;
        if (!ngModuleRef && !(componentFactory instanceof ComponentFactoryBoundToModule)) {
            ngModuleRef = contextInjector.get(NgModuleRef);
        }
        /** @type {?} */
        var componentRef = componentFactory.create(contextInjector, projectableNodes, undefined, ngModuleRef);
        this.insert(componentRef.hostView, index);
        return componentRef;
    };
    /**
     * @param {?} viewRef
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef_.prototype.insert = /**
     * @param {?} viewRef
     * @param {?=} index
     * @return {?}
     */
    function (viewRef, index) {
        if (viewRef.destroyed) {
            throw new Error('Cannot insert a destroyed View in a ViewContainer!');
        }
        /** @type {?} */
        var viewRef_ = /** @type {?} */ (viewRef);
        /** @type {?} */
        var viewData = viewRef_._view;
        attachEmbeddedView(this._view, this._data, index, viewData);
        viewRef_.attachToViewContainerRef(this);
        return viewRef;
    };
    /**
     * @param {?} viewRef
     * @param {?} currentIndex
     * @return {?}
     */
    ViewContainerRef_.prototype.move = /**
     * @param {?} viewRef
     * @param {?} currentIndex
     * @return {?}
     */
    function (viewRef, currentIndex) {
        if (viewRef.destroyed) {
            throw new Error('Cannot move a destroyed View in a ViewContainer!');
        }
        /** @type {?} */
        var previousIndex = this._embeddedViews.indexOf(viewRef._view);
        moveEmbeddedView(this._data, previousIndex, currentIndex);
        return viewRef;
    };
    /**
     * @param {?} viewRef
     * @return {?}
     */
    ViewContainerRef_.prototype.indexOf = /**
     * @param {?} viewRef
     * @return {?}
     */
    function (viewRef) {
        return this._embeddedViews.indexOf((/** @type {?} */ (viewRef))._view);
    };
    /**
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef_.prototype.remove = /**
     * @param {?=} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var viewData = detachEmbeddedView(this._data, index);
        if (viewData) {
            Services.destroyView(viewData);
        }
    };
    /**
     * @param {?=} index
     * @return {?}
     */
    ViewContainerRef_.prototype.detach = /**
     * @param {?=} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var view = detachEmbeddedView(this._data, index);
        return view ? new ViewRef_(view) : null;
    };
    return ViewContainerRef_;
}());
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    ViewContainerRef_.prototype._embeddedViews;
    /** @type {?} */
    ViewContainerRef_.prototype._view;
    /** @type {?} */
    ViewContainerRef_.prototype._elDef;
    /** @type {?} */
    ViewContainerRef_.prototype._data;
}
/**
 * @param {?} view
 * @return {?}
 */
export function createChangeDetectorRef(view) {
    return new ViewRef_(view);
}
var ViewRef_ = /** @class */ (function () {
    function ViewRef_(_view) {
        this._view = _view;
        this._viewContainerRef = null;
        this._appRef = null;
    }
    Object.defineProperty(ViewRef_.prototype, "rootNodes", {
        get: /**
         * @return {?}
         */
        function () { return rootRenderNodes(this._view); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "context", {
        get: /**
         * @return {?}
         */
        function () { return this._view.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "destroyed", {
        get: /**
         * @return {?}
         */
        function () { return (this._view.state & 128 /* Destroyed */) !== 0; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ViewRef_.prototype.markForCheck = /**
     * @return {?}
     */
    function () { markParentViewsForCheck(this._view); };
    /**
     * @return {?}
     */
    ViewRef_.prototype.detach = /**
     * @return {?}
     */
    function () { this._view.state &= ~4 /* Attached */; };
    /**
     * @return {?}
     */
    ViewRef_.prototype.detectChanges = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var fs = this._view.root.rendererFactory;
        if (fs.begin) {
            fs.begin();
        }
        try {
            Services.checkAndUpdateView(this._view);
        }
        finally {
            if (fs.end) {
                fs.end();
            }
        }
    };
    /**
     * @return {?}
     */
    ViewRef_.prototype.checkNoChanges = /**
     * @return {?}
     */
    function () { Services.checkNoChangesView(this._view); };
    /**
     * @return {?}
     */
    ViewRef_.prototype.reattach = /**
     * @return {?}
     */
    function () { this._view.state |= 4 /* Attached */; };
    /**
     * @param {?} callback
     * @return {?}
     */
    ViewRef_.prototype.onDestroy = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        if (!this._view.disposables) {
            this._view.disposables = [];
        }
        this._view.disposables.push(/** @type {?} */ (callback));
    };
    /**
     * @return {?}
     */
    ViewRef_.prototype.destroy = /**
     * @return {?}
     */
    function () {
        if (this._appRef) {
            this._appRef.detachView(this);
        }
        else if (this._viewContainerRef) {
            this._viewContainerRef.detach(this._viewContainerRef.indexOf(this));
        }
        Services.destroyView(this._view);
    };
    /**
     * @return {?}
     */
    ViewRef_.prototype.detachFromAppRef = /**
     * @return {?}
     */
    function () {
        this._appRef = null;
        renderDetachView(this._view);
        Services.dirtyParentQueries(this._view);
    };
    /**
     * @param {?} appRef
     * @return {?}
     */
    ViewRef_.prototype.attachToAppRef = /**
     * @param {?} appRef
     * @return {?}
     */
    function (appRef) {
        if (this._viewContainerRef) {
            throw new Error('This view is already attached to a ViewContainer!');
        }
        this._appRef = appRef;
    };
    /**
     * @param {?} vcRef
     * @return {?}
     */
    ViewRef_.prototype.attachToViewContainerRef = /**
     * @param {?} vcRef
     * @return {?}
     */
    function (vcRef) {
        if (this._appRef) {
            throw new Error('This view is already attached directly to the ApplicationRef!');
        }
        this._viewContainerRef = vcRef;
    };
    return ViewRef_;
}());
export { ViewRef_ };
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    ViewRef_.prototype._view;
    /** @type {?} */
    ViewRef_.prototype._viewContainerRef;
    /** @type {?} */
    ViewRef_.prototype._appRef;
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
export function createTemplateData(view, def) {
    return new TemplateRef_(view, def);
}
var TemplateRef_ = /** @class */ (function (_super) {
    tslib_1.__extends(TemplateRef_, _super);
    function TemplateRef_(_parentView, _def) {
        var _this = _super.call(this) || this;
        _this._parentView = _parentView;
        _this._def = _def;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    TemplateRef_.prototype.createEmbeddedView = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return new ViewRef_(Services.createEmbeddedView(this._parentView, this._def, /** @type {?} */ ((/** @type {?} */ ((this._def.element)).template)), context));
    };
    Object.defineProperty(TemplateRef_.prototype, "elementRef", {
        get: /**
         * @return {?}
         */
        function () {
            return new ElementRef(asElementData(this._parentView, this._def.nodeIndex).renderElement);
        },
        enumerable: true,
        configurable: true
    });
    return TemplateRef_;
}(TemplateRef));
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    TemplateRef_.prototype._projectedViews;
    /** @type {?} */
    TemplateRef_.prototype._parentView;
    /** @type {?} */
    TemplateRef_.prototype._def;
}
/**
 * @param {?} view
 * @param {?} elDef
 * @return {?}
 */
export function createInjector(view, elDef) {
    return new Injector_(view, elDef);
}
var Injector_ = /** @class */ (function () {
    function Injector_(view, elDef) {
        this.view = view;
        this.elDef = elDef;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    Injector_.prototype.get = /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
        /** @type {?} */
        var allowPrivateServices = this.elDef ? (this.elDef.flags & 33554432 /* ComponentView */) !== 0 : false;
        return Services.resolveDep(this.view, this.elDef, allowPrivateServices, { flags: 0 /* None */, token: token, tokenKey: tokenKey(token) }, notFoundValue);
    };
    return Injector_;
}());
if (false) {
    /** @type {?} */
    Injector_.prototype.view;
    /** @type {?} */
    Injector_.prototype.elDef;
}
/**
 * @param {?} view
 * @param {?} index
 * @return {?}
 */
export function nodeValue(view, index) {
    /** @type {?} */
    var def = view.def.nodes[index];
    if (def.flags & 1 /* TypeElement */) {
        /** @type {?} */
        var elData = asElementData(view, def.nodeIndex);
        return /** @type {?} */ ((def.element)).template ? elData.template : elData.renderElement;
    }
    else if (def.flags & 2 /* TypeText */) {
        return asTextData(view, def.nodeIndex).renderText;
    }
    else if (def.flags & (20224 /* CatProvider */ | 16 /* TypePipe */)) {
        return asProviderData(view, def.nodeIndex).instance;
    }
    throw new Error("Illegal state: read nodeValue for node index " + index);
}
/**
 * @param {?} view
 * @return {?}
 */
export function createRendererV1(view) {
    return new RendererAdapter(view.renderer);
}
var RendererAdapter = /** @class */ (function () {
    function RendererAdapter(delegate) {
        this.delegate = delegate;
    }
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    RendererAdapter.prototype.selectRootElement = /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    function (selectorOrNode) {
        return this.delegate.selectRootElement(selectorOrNode);
    };
    /**
     * @param {?} parent
     * @param {?} namespaceAndName
     * @return {?}
     */
    RendererAdapter.prototype.createElement = /**
     * @param {?} parent
     * @param {?} namespaceAndName
     * @return {?}
     */
    function (parent, namespaceAndName) {
        var _a = splitNamespace(namespaceAndName), ns = _a[0], name = _a[1];
        /** @type {?} */
        var el = this.delegate.createElement(name, ns);
        if (parent) {
            this.delegate.appendChild(parent, el);
        }
        return el;
    };
    /**
     * @param {?} hostElement
     * @return {?}
     */
    RendererAdapter.prototype.createViewRoot = /**
     * @param {?} hostElement
     * @return {?}
     */
    function (hostElement) { return hostElement; };
    /**
     * @param {?} parentElement
     * @return {?}
     */
    RendererAdapter.prototype.createTemplateAnchor = /**
     * @param {?} parentElement
     * @return {?}
     */
    function (parentElement) {
        /** @type {?} */
        var comment = this.delegate.createComment('');
        if (parentElement) {
            this.delegate.appendChild(parentElement, comment);
        }
        return comment;
    };
    /**
     * @param {?} parentElement
     * @param {?} value
     * @return {?}
     */
    RendererAdapter.prototype.createText = /**
     * @param {?} parentElement
     * @param {?} value
     * @return {?}
     */
    function (parentElement, value) {
        /** @type {?} */
        var node = this.delegate.createText(value);
        if (parentElement) {
            this.delegate.appendChild(parentElement, node);
        }
        return node;
    };
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    RendererAdapter.prototype.projectNodes = /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    function (parentElement, nodes) {
        for (var i = 0; i < nodes.length; i++) {
            this.delegate.appendChild(parentElement, nodes[i]);
        }
    };
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    RendererAdapter.prototype.attachViewAfter = /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    function (node, viewRootNodes) {
        /** @type {?} */
        var parentElement = this.delegate.parentNode(node);
        /** @type {?} */
        var nextSibling = this.delegate.nextSibling(node);
        for (var i = 0; i < viewRootNodes.length; i++) {
            this.delegate.insertBefore(parentElement, viewRootNodes[i], nextSibling);
        }
    };
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    RendererAdapter.prototype.detachView = /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    function (viewRootNodes) {
        for (var i = 0; i < viewRootNodes.length; i++) {
            /** @type {?} */
            var node = viewRootNodes[i];
            /** @type {?} */
            var parentElement = this.delegate.parentNode(node);
            this.delegate.removeChild(parentElement, node);
        }
    };
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    RendererAdapter.prototype.destroyView = /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    function (hostElement, viewAllNodes) {
        for (var i = 0; i < viewAllNodes.length; i++) {
            /** @type {?} */ ((this.delegate.destroyNode))(viewAllNodes[i]);
        }
    };
    /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    RendererAdapter.prototype.listen = /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    function (renderElement, name, callback) {
        return this.delegate.listen(renderElement, name, /** @type {?} */ (callback));
    };
    /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    RendererAdapter.prototype.listenGlobal = /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    function (target, name, callback) {
        return this.delegate.listen(target, name, /** @type {?} */ (callback));
    };
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    RendererAdapter.prototype.setElementProperty = /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    function (renderElement, propertyName, propertyValue) {
        this.delegate.setProperty(renderElement, propertyName, propertyValue);
    };
    /**
     * @param {?} renderElement
     * @param {?} namespaceAndName
     * @param {?=} attributeValue
     * @return {?}
     */
    RendererAdapter.prototype.setElementAttribute = /**
     * @param {?} renderElement
     * @param {?} namespaceAndName
     * @param {?=} attributeValue
     * @return {?}
     */
    function (renderElement, namespaceAndName, attributeValue) {
        var _a = splitNamespace(namespaceAndName), ns = _a[0], name = _a[1];
        if (attributeValue != null) {
            this.delegate.setAttribute(renderElement, name, attributeValue, ns);
        }
        else {
            this.delegate.removeAttribute(renderElement, name, ns);
        }
    };
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    RendererAdapter.prototype.setBindingDebugInfo = /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    function (renderElement, propertyName, propertyValue) { };
    /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    RendererAdapter.prototype.setElementClass = /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    function (renderElement, className, isAdd) {
        if (isAdd) {
            this.delegate.addClass(renderElement, className);
        }
        else {
            this.delegate.removeClass(renderElement, className);
        }
    };
    /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    RendererAdapter.prototype.setElementStyle = /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    function (renderElement, styleName, styleValue) {
        if (styleValue != null) {
            this.delegate.setStyle(renderElement, styleName, styleValue);
        }
        else {
            this.delegate.removeStyle(renderElement, styleName);
        }
    };
    /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    RendererAdapter.prototype.invokeElementMethod = /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    function (renderElement, methodName, args) {
        (/** @type {?} */ (renderElement))[methodName].apply(renderElement, args);
    };
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    RendererAdapter.prototype.setText = /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    function (renderNode, text) { this.delegate.setValue(renderNode, text); };
    /**
     * @return {?}
     */
    RendererAdapter.prototype.animate = /**
     * @return {?}
     */
    function () { throw new Error('Renderer.animate is no longer supported!'); };
    return RendererAdapter;
}());
if (false) {
    /** @type {?} */
    RendererAdapter.prototype.delegate;
}
/**
 * @param {?} moduleType
 * @param {?} parent
 * @param {?} bootstrapComponents
 * @param {?} def
 * @return {?}
 */
export function createNgModuleRef(moduleType, parent, bootstrapComponents, def) {
    return new NgModuleRef_(moduleType, parent, bootstrapComponents, def);
}
var NgModuleRef_ = /** @class */ (function () {
    function NgModuleRef_(_moduleType, _parent, _bootstrapComponents, _def) {
        this._moduleType = _moduleType;
        this._parent = _parent;
        this._bootstrapComponents = _bootstrapComponents;
        this._def = _def;
        this._destroyListeners = [];
        this._destroyed = false;
        this.injector = this;
        initNgModule(this);
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} injectFlags
     * @return {?}
     */
    NgModuleRef_.prototype.get = /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} injectFlags
     * @return {?}
     */
    function (token, notFoundValue, injectFlags) {
        if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
        if (injectFlags === void 0) { injectFlags = InjectFlags.Default; }
        /** @type {?} */
        var flags = 0 /* None */;
        if (injectFlags & InjectFlags.SkipSelf) {
            flags |= 1 /* SkipSelf */;
        }
        else if (injectFlags & InjectFlags.Self) {
            flags |= 4 /* Self */;
        }
        return resolveNgModuleDep(this, { token: token, tokenKey: tokenKey(token), flags: flags }, notFoundValue);
    };
    Object.defineProperty(NgModuleRef_.prototype, "instance", {
        get: /**
         * @return {?}
         */
        function () { return this.get(this._moduleType); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModuleRef_.prototype, "componentFactoryResolver", {
        get: /**
         * @return {?}
         */
        function () { return this.get(ComponentFactoryResolver); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgModuleRef_.prototype.destroy = /**
     * @return {?}
     */
    function () {
        if (this._destroyed) {
            throw new Error("The ng module " + stringify(this.instance.constructor) + " has already been destroyed.");
        }
        this._destroyed = true;
        callNgModuleLifecycle(this, 131072 /* OnDestroy */);
        this._destroyListeners.forEach(function (listener) { return listener(); });
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    NgModuleRef_.prototype.onDestroy = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) { this._destroyListeners.push(callback); };
    return NgModuleRef_;
}());
if (false) {
    /** @type {?} */
    NgModuleRef_.prototype._destroyListeners;
    /** @type {?} */
    NgModuleRef_.prototype._destroyed;
    /**
     * \@internal
     * @type {?}
     */
    NgModuleRef_.prototype._providers;
    /**
     * \@internal
     * @type {?}
     */
    NgModuleRef_.prototype._modules;
    /** @type {?} */
    NgModuleRef_.prototype.injector;
    /** @type {?} */
    NgModuleRef_.prototype._moduleType;
    /** @type {?} */
    NgModuleRef_.prototype._parent;
    /** @type {?} */
    NgModuleRef_.prototype._bootstrapComponents;
    /** @type {?} */
    NgModuleRef_.prototype._def;
}
//# sourceMappingURL=refs.js.map