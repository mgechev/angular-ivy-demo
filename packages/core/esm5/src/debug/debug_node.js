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
import { assertDomNode } from '../render3/assert';
import { getComponent, getInjector, getLocalRefs, loadContext } from '../render3/discovery_utils';
import { TVIEW } from '../render3/interfaces/view';
var EventListener = /** @class */ (function () {
    function EventListener(name, callback) {
        this.name = name;
        this.callback = callback;
    }
    return EventListener;
}());
export { EventListener };
if (false) {
    /** @type {?} */
    EventListener.prototype.name;
    /** @type {?} */
    EventListener.prototype.callback;
}
var DebugNode__PRE_R3__ = /** @class */ (function () {
    function DebugNode__PRE_R3__(nativeNode, parent, _debugContext) {
        this.listeners = [];
        this.parent = null;
        this._debugContext = _debugContext;
        this.nativeNode = nativeNode;
        if (parent && parent instanceof DebugElement__PRE_R3__) {
            parent.addChild(this);
        }
    }
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "injector", {
        get: /**
         * @return {?}
         */
        function () { return this._debugContext.injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "componentInstance", {
        get: /**
         * @return {?}
         */
        function () { return this._debugContext.component; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "context", {
        get: /**
         * @return {?}
         */
        function () { return this._debugContext.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "references", {
        get: /**
         * @return {?}
         */
        function () { return this._debugContext.references; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "providerTokens", {
        get: /**
         * @return {?}
         */
        function () { return this._debugContext.providerTokens; },
        enumerable: true,
        configurable: true
    });
    return DebugNode__PRE_R3__;
}());
export { DebugNode__PRE_R3__ };
if (false) {
    /** @type {?} */
    DebugNode__PRE_R3__.prototype.listeners;
    /** @type {?} */
    DebugNode__PRE_R3__.prototype.parent;
    /** @type {?} */
    DebugNode__PRE_R3__.prototype.nativeNode;
    /** @type {?} */
    DebugNode__PRE_R3__.prototype._debugContext;
}
var DebugElement__PRE_R3__ = /** @class */ (function (_super) {
    tslib_1.__extends(DebugElement__PRE_R3__, _super);
    function DebugElement__PRE_R3__(nativeNode, parent, _debugContext) {
        var _this = _super.call(this, nativeNode, parent, _debugContext) || this;
        _this.properties = {};
        _this.attributes = {};
        _this.classes = {};
        _this.styles = {};
        _this.childNodes = [];
        _this.nativeElement = nativeNode;
        return _this;
    }
    /**
     * @param {?} child
     * @return {?}
     */
    DebugElement__PRE_R3__.prototype.addChild = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        if (child) {
            this.childNodes.push(child);
            (/** @type {?} */ (child)).parent = this;
        }
    };
    /**
     * @param {?} child
     * @return {?}
     */
    DebugElement__PRE_R3__.prototype.removeChild = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        /** @type {?} */
        var childIndex = this.childNodes.indexOf(child);
        if (childIndex !== -1) {
            (/** @type {?} */ (child)).parent = null;
            this.childNodes.splice(childIndex, 1);
        }
    };
    /**
     * @param {?} child
     * @param {?} newChildren
     * @return {?}
     */
    DebugElement__PRE_R3__.prototype.insertChildrenAfter = /**
     * @param {?} child
     * @param {?} newChildren
     * @return {?}
     */
    function (child, newChildren) {
        var _this = this;
        var _a;
        /** @type {?} */
        var siblingIndex = this.childNodes.indexOf(child);
        if (siblingIndex !== -1) {
            (_a = this.childNodes).splice.apply(_a, [siblingIndex + 1, 0].concat(newChildren));
            newChildren.forEach(function (c) {
                if (c.parent) {
                    (/** @type {?} */ (c.parent)).removeChild(c);
                }
                (/** @type {?} */ (child)).parent = _this;
            });
        }
    };
    /**
     * @param {?} refChild
     * @param {?} newChild
     * @return {?}
     */
    DebugElement__PRE_R3__.prototype.insertBefore = /**
     * @param {?} refChild
     * @param {?} newChild
     * @return {?}
     */
    function (refChild, newChild) {
        /** @type {?} */
        var refIndex = this.childNodes.indexOf(refChild);
        if (refIndex === -1) {
            this.addChild(newChild);
        }
        else {
            if (newChild.parent) {
                (/** @type {?} */ (newChild.parent)).removeChild(newChild);
            }
            (/** @type {?} */ (newChild)).parent = this;
            this.childNodes.splice(refIndex, 0, newChild);
        }
    };
    /**
     * @param {?} predicate
     * @return {?}
     */
    DebugElement__PRE_R3__.prototype.query = /**
     * @param {?} predicate
     * @return {?}
     */
    function (predicate) {
        /** @type {?} */
        var results = this.queryAll(predicate);
        return results[0] || null;
    };
    /**
     * @param {?} predicate
     * @return {?}
     */
    DebugElement__PRE_R3__.prototype.queryAll = /**
     * @param {?} predicate
     * @return {?}
     */
    function (predicate) {
        /** @type {?} */
        var matches = [];
        _queryElementChildren(this, predicate, matches);
        return matches;
    };
    /**
     * @param {?} predicate
     * @return {?}
     */
    DebugElement__PRE_R3__.prototype.queryAllNodes = /**
     * @param {?} predicate
     * @return {?}
     */
    function (predicate) {
        /** @type {?} */
        var matches = [];
        _queryNodeChildren(this, predicate, matches);
        return matches;
    };
    Object.defineProperty(DebugElement__PRE_R3__.prototype, "children", {
        get: /**
         * @return {?}
         */
        function () {
            return /** @type {?} */ (this
                .childNodes //
                .filter(function (node) { return node instanceof DebugElement__PRE_R3__; }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} eventName
     * @param {?} eventObj
     * @return {?}
     */
    DebugElement__PRE_R3__.prototype.triggerEventHandler = /**
     * @param {?} eventName
     * @param {?} eventObj
     * @return {?}
     */
    function (eventName, eventObj) {
        this.listeners.forEach(function (listener) {
            if (listener.name == eventName) {
                listener.callback(eventObj);
            }
        });
    };
    return DebugElement__PRE_R3__;
}(DebugNode__PRE_R3__));
export { DebugElement__PRE_R3__ };
if (false) {
    /** @type {?} */
    DebugElement__PRE_R3__.prototype.name;
    /** @type {?} */
    DebugElement__PRE_R3__.prototype.properties;
    /** @type {?} */
    DebugElement__PRE_R3__.prototype.attributes;
    /** @type {?} */
    DebugElement__PRE_R3__.prototype.classes;
    /** @type {?} */
    DebugElement__PRE_R3__.prototype.styles;
    /** @type {?} */
    DebugElement__PRE_R3__.prototype.childNodes;
    /** @type {?} */
    DebugElement__PRE_R3__.prototype.nativeElement;
}
/**
 * \@publicApi
 * @param {?} debugEls
 * @return {?}
 */
export function asNativeElements(debugEls) {
    return debugEls.map(function (el) { return el.nativeElement; });
}
/**
 * @param {?} element
 * @param {?} predicate
 * @param {?} matches
 * @return {?}
 */
function _queryElementChildren(element, predicate, matches) {
    element.childNodes.forEach(function (node) {
        if (node instanceof DebugElement__PRE_R3__) {
            if (predicate(node)) {
                matches.push(node);
            }
            _queryElementChildren(node, predicate, matches);
        }
    });
}
/**
 * @param {?} parentNode
 * @param {?} predicate
 * @param {?} matches
 * @return {?}
 */
function _queryNodeChildren(parentNode, predicate, matches) {
    if (parentNode instanceof DebugElement__PRE_R3__) {
        parentNode.childNodes.forEach(function (node) {
            if (predicate(node)) {
                matches.push(node);
            }
            if (node instanceof DebugElement__PRE_R3__) {
                _queryNodeChildren(node, predicate, matches);
            }
        });
    }
}
/**
 * @return {?}
 */
function notImplemented() {
    throw new Error('Missing proper ivy implementation.');
}
var DebugNode__POST_R3__ = /** @class */ (function () {
    function DebugNode__POST_R3__(nativeNode) {
        this.nativeNode = nativeNode;
    }
    Object.defineProperty(DebugNode__POST_R3__.prototype, "parent", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var parent = /** @type {?} */ (this.nativeNode.parentNode);
            return parent ? new DebugElement__POST_R3__(parent) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "injector", {
        get: /**
         * @return {?}
         */
        function () { return getInjector(this.nativeNode); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "componentInstance", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var nativeElement = this.nativeNode;
            return nativeElement && getComponent(/** @type {?} */ (nativeElement));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "context", {
        get: /**
         * @return {?}
         */
        function () {
            // https://angular-team.atlassian.net/browse/FW-719
            throw notImplemented();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "listeners", {
        get: /**
         * @return {?}
         */
        function () {
            // TODO: add real implementation;
            // https://angular-team.atlassian.net/browse/FW-719
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "references", {
        get: /**
         * @return {?}
         */
        function () { return getLocalRefs(this.nativeNode); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "providerTokens", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var context = /** @type {?} */ ((loadContext(/** @type {?} */ (this.nativeNode), false)));
            if (!context)
                return [];
            /** @type {?} */
            var lView = context.lView;
            /** @type {?} */
            var tView = lView[TVIEW];
            /** @type {?} */
            var tNode = /** @type {?} */ (tView.data[context.nodeIndex]);
            /** @type {?} */
            var providerTokens = [];
            /** @type {?} */
            var nodeFlags = tNode.flags;
            /** @type {?} */
            var startIndex = nodeFlags >> 16 /* DirectiveStartingIndexShift */;
            /** @type {?} */
            var directiveCount = nodeFlags & 4095 /* DirectiveCountMask */;
            /** @type {?} */
            var endIndex = startIndex + directiveCount;
            for (var i = startIndex; i < endIndex; i++) {
                /** @type {?} */
                var value = tView.data[i];
                if (isDirectiveDefHack(value)) {
                    // The fact that we sometimes store Type and sometimes DirectiveDef in this location is a
                    // design flaw.  We should always store same type so that we can be monomorphic. The issue
                    // is that for Components/Directives we store the def instead the type. The correct behavior
                    // is that we should always be storing injectable type in this location.
                    value = value.type;
                }
                providerTokens.push(value);
            }
            return providerTokens;
        },
        enumerable: true,
        configurable: true
    });
    return DebugNode__POST_R3__;
}());
if (false) {
    /** @type {?} */
    DebugNode__POST_R3__.prototype.nativeNode;
}
var DebugElement__POST_R3__ = /** @class */ (function (_super) {
    tslib_1.__extends(DebugElement__POST_R3__, _super);
    function DebugElement__POST_R3__(nativeNode) {
        var _this = this;
        ngDevMode && assertDomNode(nativeNode);
        _this = _super.call(this, nativeNode) || this;
        return _this;
    }
    Object.defineProperty(DebugElement__POST_R3__.prototype, "nativeElement", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nativeNode.nodeType == Node.ELEMENT_NODE ? /** @type {?} */ (this.nativeNode) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this.nativeElement)).nodeName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "properties", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var context = /** @type {?} */ ((loadContext(this.nativeNode)));
            /** @type {?} */
            var lView = context.lView;
            /** @type {?} */
            var tView = lView[TVIEW];
            /** @type {?} */
            var tNode = /** @type {?} */ (tView.data[context.nodeIndex]);
            /** @type {?} */
            var properties = {};
            // TODO: https://angular-team.atlassian.net/browse/FW-681
            // Missing implementation here...
            return properties;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "attributes", {
        get: /**
         * @return {?}
         */
        function () {
            // https://angular-team.atlassian.net/browse/FW-719
            throw notImplemented();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "classes", {
        get: /**
         * @return {?}
         */
        function () {
            // https://angular-team.atlassian.net/browse/FW-719
            throw notImplemented();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "styles", {
        get: /**
         * @return {?}
         */
        function () {
            // https://angular-team.atlassian.net/browse/FW-719
            throw notImplemented();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "childNodes", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var childNodes = this.nativeNode.childNodes;
            /** @type {?} */
            var children = [];
            for (var i = 0; i < childNodes.length; i++) {
                /** @type {?} */
                var element = childNodes[i];
                children.push(getDebugNode__POST_R3__(element));
            }
            return children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "children", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var nativeElement = this.nativeElement;
            if (!nativeElement)
                return [];
            /** @type {?} */
            var childNodes = nativeElement.children;
            /** @type {?} */
            var children = [];
            for (var i = 0; i < childNodes.length; i++) {
                /** @type {?} */
                var element = childNodes[i];
                children.push(getDebugNode__POST_R3__(element));
            }
            return children;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} predicate
     * @return {?}
     */
    DebugElement__POST_R3__.prototype.query = /**
     * @param {?} predicate
     * @return {?}
     */
    function (predicate) {
        /** @type {?} */
        var results = this.queryAll(predicate);
        return results[0] || null;
    };
    /**
     * @param {?} predicate
     * @return {?}
     */
    DebugElement__POST_R3__.prototype.queryAll = /**
     * @param {?} predicate
     * @return {?}
     */
    function (predicate) {
        /** @type {?} */
        var matches = [];
        _queryNodeChildrenR3(this, predicate, matches, true);
        return matches;
    };
    /**
     * @param {?} predicate
     * @return {?}
     */
    DebugElement__POST_R3__.prototype.queryAllNodes = /**
     * @param {?} predicate
     * @return {?}
     */
    function (predicate) {
        /** @type {?} */
        var matches = [];
        _queryNodeChildrenR3(this, predicate, matches, false);
        return matches;
    };
    /**
     * @param {?} eventName
     * @param {?} eventObj
     * @return {?}
     */
    DebugElement__POST_R3__.prototype.triggerEventHandler = /**
     * @param {?} eventName
     * @param {?} eventObj
     * @return {?}
     */
    function (eventName, eventObj) {
        /** @type {?} */
        var event = document.createEvent('MouseEvent');
        event.initEvent(eventName, true, true);
        (/** @type {?} */ (this.nativeElement)).dispatchEvent(event);
    };
    return DebugElement__POST_R3__;
}(DebugNode__POST_R3__));
/**
 * This function should not exist because it is megamorphic and only mostly correct.
 *
 * See call site for more info.
 * @param {?} obj
 * @return {?}
 */
function isDirectiveDefHack(obj) {
    return obj.type !== undefined && obj.template !== undefined && obj.declaredInputs !== undefined;
}
/**
 * @param {?} parentNode
 * @param {?} predicate
 * @param {?} matches
 * @param {?} elementsOnly
 * @return {?}
 */
function _queryNodeChildrenR3(parentNode, predicate, matches, elementsOnly) {
    if (parentNode instanceof DebugElement__POST_R3__) {
        parentNode.childNodes.forEach(function (node) {
            if (predicate(node)) {
                matches.push(node);
            }
            if (node instanceof DebugElement__POST_R3__) {
                if (elementsOnly ? node.nativeElement : true) {
                    _queryNodeChildrenR3(node, predicate, matches, elementsOnly);
                }
            }
        });
    }
}
/** @type {?} */
var _nativeNodeToDebugNode = new Map();
/**
 * @param {?} nativeNode
 * @return {?}
 */
function getDebugNode__PRE_R3__(nativeNode) {
    return _nativeNodeToDebugNode.get(nativeNode) || null;
}
/**
 * @param {?} nativeNode
 * @return {?}
 */
export function getDebugNode__POST_R3__(nativeNode) {
    if (nativeNode instanceof Node) {
        return nativeNode.nodeType == Node.ELEMENT_NODE ?
            new DebugElement__POST_R3__(/** @type {?} */ (nativeNode)) :
            new DebugNode__POST_R3__(nativeNode);
    }
    return null;
}
/** *
 * \@publicApi
  @type {?} */
export var getDebugNode = getDebugNode__PRE_R3__;
/**
 * @return {?}
 */
export function getAllDebugNodes() {
    return Array.from(_nativeNodeToDebugNode.values());
}
/**
 * @param {?} node
 * @return {?}
 */
export function indexDebugNode(node) {
    _nativeNodeToDebugNode.set(node.nativeNode, node);
}
/**
 * @param {?} node
 * @return {?}
 */
export function removeDebugNodeFromIndex(node) {
    _nativeNodeToDebugNode.delete(node.nativeNode);
}
/**
 * A boolean-valued function over a value, possibly including context information
 * regarding that value's position in an array.
 *
 * \@publicApi
 * @record
 * @template T
 */
export function Predicate() { }
/** *
 * \@publicApi
  @type {?} */
export var DebugNode = /** @type {?} */ (DebugNode__PRE_R3__);
/** *
 * \@publicApi
  @type {?} */
export var DebugElement = /** @type {?} */ (DebugElement__PRE_R3__);
//# sourceMappingURL=debug_node.js.map