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
import { EventEmitter } from '../event_emitter';
import { ElementRef as ViewEngine_ElementRef } from '../linker/element_ref';
import { TemplateRef as ViewEngine_TemplateRef } from '../linker/template_ref';
import { getSymbolIterator } from '../util';
import { assertDefined, assertEqual, assertPreviousIsParent } from './assert';
import { getNodeInjectable, locateDirectiveOrProvider } from './di';
import { NG_ELEMENT_ID } from './fields';
import { store, storeCleanupWithContext } from './instructions';
import { unusedValueExportToPlacateAjd as unused1 } from './interfaces/definition';
import { unusedValueExportToPlacateAjd as unused2 } from './interfaces/injector';
import { unusedValueExportToPlacateAjd as unused3 } from './interfaces/node';
import { unusedValueExportToPlacateAjd as unused4 } from './interfaces/query';
import { TVIEW } from './interfaces/view';
import { getIsParent, getLView, getOrCreateCurrentQueries } from './state';
import { flatten, isContentQueryHost } from './util';
import { createElementRef, createTemplateRef } from './view_engine_compatibility';
/** @type {?} */
var unusedValueToPlacateAjd = unused1 + unused2 + unused3 + unused4;
/**
 * A predicate which determines if a given element/directive should be included in the query
 * results.
 * @record
 * @template T
 */
export function QueryPredicate() { }
/**
 * If looking for directives then it contains the directive type.
 * @type {?}
 */
QueryPredicate.prototype.type;
/**
 * If selector then contains local names to query for.
 * @type {?}
 */
QueryPredicate.prototype.selector;
/**
 * Indicates which token should be read from DI for this query.
 * @type {?}
 */
QueryPredicate.prototype.read;
/**
 * An object representing a query, which is a combination of:
 * - query predicate to determines if a given element/directive should be included in the query
 * - values collected based on a predicate
 * - `QueryList` to which collected values should be reported
 * @record
 * @template T
 */
export function LQuery() { }
/**
 * Next query. Used when queries are stored as a linked list in `LQueries`.
 * @type {?}
 */
LQuery.prototype.next;
/**
 * Destination to which the value should be added.
 * @type {?}
 */
LQuery.prototype.list;
/**
 * A predicate which determines if a given element/directive should be included in the query
 * results.
 * @type {?}
 */
LQuery.prototype.predicate;
/**
 * Values which have been located.
 *
 * This is what builds up the `QueryList._valuesTree`.
 * @type {?}
 */
LQuery.prototype.values;
/**
 * A pointer to an array that stores collected values from views. This is necessary so we know a
 * container into which to insert nodes collected from views.
 * @type {?}
 */
LQuery.prototype.containerValues;
var LQueries_ = /** @class */ (function () {
    function LQueries_(parent, shallow, deep) {
        this.parent = parent;
        this.shallow = shallow;
        this.deep = deep;
    }
    /**
     * @template T
     * @param {?} queryList
     * @param {?} predicate
     * @param {?=} descend
     * @param {?=} read
     * @return {?}
     */
    LQueries_.prototype.track = /**
     * @template T
     * @param {?} queryList
     * @param {?} predicate
     * @param {?=} descend
     * @param {?=} read
     * @return {?}
     */
    function (queryList, predicate, descend, read) {
        if (descend) {
            this.deep = createQuery(this.deep, queryList, predicate, read != null ? read : null);
        }
        else {
            this.shallow = createQuery(this.shallow, queryList, predicate, read != null ? read : null);
        }
    };
    /**
     * @return {?}
     */
    LQueries_.prototype.clone = /**
     * @return {?}
     */
    function () { return new LQueries_(this, null, this.deep); };
    /**
     * @return {?}
     */
    LQueries_.prototype.container = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var shallowResults = copyQueriesToContainer(this.shallow);
        /** @type {?} */
        var deepResults = copyQueriesToContainer(this.deep);
        return shallowResults || deepResults ? new LQueries_(this, shallowResults, deepResults) : null;
    };
    /**
     * @return {?}
     */
    LQueries_.prototype.createView = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var shallowResults = copyQueriesToView(this.shallow);
        /** @type {?} */
        var deepResults = copyQueriesToView(this.deep);
        return shallowResults || deepResults ? new LQueries_(this, shallowResults, deepResults) : null;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    LQueries_.prototype.insertView = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        insertView(index, this.shallow);
        insertView(index, this.deep);
    };
    /**
     * @param {?} tNode
     * @return {?}
     */
    LQueries_.prototype.addNode = /**
     * @param {?} tNode
     * @return {?}
     */
    function (tNode) {
        add(this.deep, tNode);
        if (isContentQueryHost(tNode)) {
            add(this.shallow, tNode);
            if (tNode.parent && isContentQueryHost(tNode.parent)) {
                // if node has a content query and parent also has a content query
                // both queries need to check this node for shallow matches
                add(/** @type {?} */ ((this.parent)).shallow, tNode);
            }
            return this.parent;
        }
        isRootNodeOfQuery(tNode) && add(this.shallow, tNode);
        return this;
    };
    /**
     * @return {?}
     */
    LQueries_.prototype.removeView = /**
     * @return {?}
     */
    function () {
        removeView(this.shallow);
        removeView(this.deep);
    };
    return LQueries_;
}());
export { LQueries_ };
if (false) {
    /** @type {?} */
    LQueries_.prototype.parent;
    /** @type {?} */
    LQueries_.prototype.shallow;
    /** @type {?} */
    LQueries_.prototype.deep;
}
/**
 * @param {?} tNode
 * @return {?}
 */
function isRootNodeOfQuery(tNode) {
    return tNode.parent === null || isContentQueryHost(tNode.parent);
}
/**
 * @param {?} query
 * @return {?}
 */
function copyQueriesToContainer(query) {
    /** @type {?} */
    var result = null;
    while (query) {
        /** @type {?} */
        var containerValues = []; // prepare room for views
        query.values.push(containerValues);
        /** @type {?} */
        var clonedQuery = {
            next: result,
            list: query.list,
            predicate: query.predicate,
            values: containerValues,
            containerValues: null
        };
        result = clonedQuery;
        query = query.next;
    }
    return result;
}
/**
 * @param {?} query
 * @return {?}
 */
function copyQueriesToView(query) {
    /** @type {?} */
    var result = null;
    while (query) {
        /** @type {?} */
        var clonedQuery = {
            next: result,
            list: query.list,
            predicate: query.predicate,
            values: [],
            containerValues: query.values
        };
        result = clonedQuery;
        query = query.next;
    }
    return result;
}
/**
 * @param {?} index
 * @param {?} query
 * @return {?}
 */
function insertView(index, query) {
    while (query) {
        ngDevMode &&
            assertDefined(query.containerValues, 'View queries need to have a pointer to container values.'); /** @type {?} */
        ((query.containerValues)).splice(index, 0, query.values);
        query = query.next;
    }
}
/**
 * @param {?} query
 * @return {?}
 */
function removeView(query) {
    while (query) {
        ngDevMode &&
            assertDefined(query.containerValues, 'View queries need to have a pointer to container values.');
        /** @type {?} */
        var containerValues = /** @type {?} */ ((query.containerValues));
        /** @type {?} */
        var viewValuesIdx = containerValues.indexOf(query.values);
        /** @type {?} */
        var removed = containerValues.splice(viewValuesIdx, 1);
        // mark a query as dirty only when removed view had matching modes
        ngDevMode && assertEqual(removed.length, 1, 'removed.length');
        if (removed[0].length) {
            query.list.setDirty();
        }
        query = query.next;
    }
}
/**
 * Iterates over local names for a given node and returns directive index
 * (or -1 if a local name points to an element).
 *
 * @param {?} tNode static data of a node to check
 * @param {?} selector selector to match
 * @return {?} directive index, -1 or null if a selector didn't match any of the local names
 */
function getIdxOfMatchingSelector(tNode, selector) {
    /** @type {?} */
    var localNames = tNode.localNames;
    if (localNames) {
        for (var i = 0; i < localNames.length; i += 2) {
            if (localNames[i] === selector) {
                return /** @type {?} */ (localNames[i + 1]);
            }
        }
    }
    return null;
}
/**
 * @param {?} read
 * @param {?} tNode
 * @param {?} currentView
 * @return {?}
 */
function queryByReadToken(read, tNode, currentView) {
    /** @type {?} */
    var factoryFn = (/** @type {?} */ (read))[NG_ELEMENT_ID];
    if (typeof factoryFn === 'function') {
        return factoryFn();
    }
    else {
        /** @type {?} */
        var matchingIdx = locateDirectiveOrProvider(tNode, currentView, /** @type {?} */ (read), false);
        if (matchingIdx !== null) {
            return getNodeInjectable(currentView[TVIEW].data, currentView, matchingIdx, /** @type {?} */ (tNode));
        }
    }
    return null;
}
/**
 * @param {?} tNode
 * @param {?} currentView
 * @return {?}
 */
function queryByTNodeType(tNode, currentView) {
    if (tNode.type === 3 /* Element */ || tNode.type === 4 /* ElementContainer */) {
        return createElementRef(ViewEngine_ElementRef, tNode, currentView);
    }
    if (tNode.type === 0 /* Container */) {
        return createTemplateRef(ViewEngine_TemplateRef, ViewEngine_ElementRef, tNode, currentView);
    }
    return null;
}
/**
 * @param {?} templateRefToken
 * @param {?} tNode
 * @param {?} currentView
 * @param {?} read
 * @return {?}
 */
function queryByTemplateRef(templateRefToken, tNode, currentView, read) {
    /** @type {?} */
    var templateRefResult = (/** @type {?} */ (templateRefToken))[NG_ELEMENT_ID]();
    if (read) {
        return templateRefResult ? queryByReadToken(read, tNode, currentView) : null;
    }
    return templateRefResult;
}
/**
 * @param {?} tNode
 * @param {?} currentView
 * @param {?} read
 * @param {?} matchingIdx
 * @return {?}
 */
function queryRead(tNode, currentView, read, matchingIdx) {
    if (read) {
        return queryByReadToken(read, tNode, currentView);
    }
    if (matchingIdx > -1) {
        return getNodeInjectable(currentView[TVIEW].data, currentView, matchingIdx, /** @type {?} */ (tNode));
    }
    // if read token and / or strategy is not specified,
    // detect it using appropriate tNode type
    return queryByTNodeType(tNode, currentView);
}
/**
 * @param {?} query
 * @param {?} tNode
 * @return {?}
 */
function add(query, tNode) {
    /** @type {?} */
    var currentView = getLView();
    while (query) {
        /** @type {?} */
        var predicate = query.predicate;
        /** @type {?} */
        var type = /** @type {?} */ (predicate.type);
        if (type) {
            /** @type {?} */
            var result = null;
            if (type === ViewEngine_TemplateRef) {
                result = queryByTemplateRef(type, tNode, currentView, predicate.read);
            }
            else {
                /** @type {?} */
                var matchingIdx = locateDirectiveOrProvider(tNode, currentView, type, false);
                if (matchingIdx !== null) {
                    result = queryRead(tNode, currentView, predicate.read, matchingIdx);
                }
            }
            if (result !== null) {
                addMatch(query, result);
            }
        }
        else {
            /** @type {?} */
            var selector = /** @type {?} */ ((predicate.selector));
            for (var i = 0; i < selector.length; i++) {
                /** @type {?} */
                var matchingIdx = getIdxOfMatchingSelector(tNode, selector[i]);
                if (matchingIdx !== null) {
                    /** @type {?} */
                    var result = queryRead(tNode, currentView, predicate.read, matchingIdx);
                    if (result !== null) {
                        addMatch(query, result);
                    }
                }
            }
        }
        query = query.next;
    }
}
/**
 * @param {?} query
 * @param {?} matchingValue
 * @return {?}
 */
function addMatch(query, matchingValue) {
    query.values.push(matchingValue);
    query.list.setDirty();
}
/**
 * @template T
 * @param {?} predicate
 * @param {?} read
 * @return {?}
 */
function createPredicate(predicate, read) {
    /** @type {?} */
    var isArray = Array.isArray(predicate);
    return {
        type: isArray ? null : /** @type {?} */ (predicate),
        selector: isArray ? /** @type {?} */ (predicate) : null,
        read: read
    };
}
/**
 * @template T
 * @param {?} previous
 * @param {?} queryList
 * @param {?} predicate
 * @param {?} read
 * @return {?}
 */
function createQuery(previous, queryList, predicate, read) {
    return {
        next: previous,
        list: queryList,
        predicate: createPredicate(predicate, read),
        values: (/** @type {?} */ ((queryList)))._valuesTree,
        containerValues: null
    };
}
/**
 * @template T
 */
var /**
 * @template T
 */
QueryList_ = /** @class */ (function () {
    function QueryList_() {
        this.dirty = true;
        this.changes = new EventEmitter();
        this._values = [];
        /**
         * \@internal
         */
        this._valuesTree = [];
    }
    Object.defineProperty(QueryList_.prototype, "length", {
        get: /**
         * @return {?}
         */
        function () { return this._values.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryList_.prototype, "first", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var values = this._values;
            return values.length ? values[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryList_.prototype, "last", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var values = this._values;
            return values.length ? values[values.length - 1] : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     */
    /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     * @template U
     * @param {?} fn
     * @return {?}
     */
    QueryList_.prototype.map = /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     * @template U
     * @param {?} fn
     * @return {?}
     */
    function (fn) { return this._values.map(fn); };
    /**
     * See
     * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
     */
    /**
     * See
     * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
     * @param {?} fn
     * @return {?}
     */
    QueryList_.prototype.filter = /**
     * See
     * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return this._values.filter(fn);
    };
    /**
     * See
     * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     */
    /**
     * See
     * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     * @param {?} fn
     * @return {?}
     */
    QueryList_.prototype.find = /**
     * See
     * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return this._values.find(fn);
    };
    /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     */
    /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     * @template U
     * @param {?} fn
     * @param {?} init
     * @return {?}
     */
    QueryList_.prototype.reduce = /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     * @template U
     * @param {?} fn
     * @param {?} init
     * @return {?}
     */
    function (fn, init) {
        return this._values.reduce(fn, init);
    };
    /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     */
    /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     * @param {?} fn
     * @return {?}
     */
    QueryList_.prototype.forEach = /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._values.forEach(fn); };
    /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     */
    /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     * @param {?} fn
     * @return {?}
     */
    QueryList_.prototype.some = /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return this._values.some(fn);
    };
    /**
     * @return {?}
     */
    QueryList_.prototype.toArray = /**
     * @return {?}
     */
    function () { return this._values.slice(0); };
    /**
     * @return {?}
     */
    QueryList_.prototype[getSymbolIterator()] = /**
     * @return {?}
     */
    function () { return (/** @type {?} */ (this._values))[getSymbolIterator()](); };
    /**
     * @return {?}
     */
    QueryList_.prototype.toString = /**
     * @return {?}
     */
    function () { return this._values.toString(); };
    /**
     * @param {?} res
     * @return {?}
     */
    QueryList_.prototype.reset = /**
     * @param {?} res
     * @return {?}
     */
    function (res) {
        this._values = flatten(res);
        (/** @type {?} */ (this)).dirty = false;
    };
    /**
     * @return {?}
     */
    QueryList_.prototype.notifyOnChanges = /**
     * @return {?}
     */
    function () { (/** @type {?} */ (this.changes)).emit(this); };
    /**
     * @return {?}
     */
    QueryList_.prototype.setDirty = /**
     * @return {?}
     */
    function () { (/** @type {?} */ (this)).dirty = true; };
    /**
     * @return {?}
     */
    QueryList_.prototype.destroy = /**
     * @return {?}
     */
    function () {
        (/** @type {?} */ (this.changes)).complete();
        (/** @type {?} */ (this.changes)).unsubscribe();
    };
    return QueryList_;
}());
if (false) {
    /** @type {?} */
    QueryList_.prototype.dirty;
    /** @type {?} */
    QueryList_.prototype.changes;
    /** @type {?} */
    QueryList_.prototype._values;
    /**
     * \@internal
     * @type {?}
     */
    QueryList_.prototype._valuesTree;
}
/** @type {?} */
export var QueryList = /** @type {?} */ (QueryList_);
/**
 * Creates and returns a QueryList.
 *
 * @template T
 * @param {?} memoryIndex The index in memory where the QueryList should be saved. If null,
 * this is is a content query and the QueryList will be saved later through directiveCreate.
 * @param {?} predicate The type for which the query will search
 * @param {?=} descend Whether or not to descend into children
 * @param {?=} read What to save in the query
 * @return {?} QueryList<T>
 */
export function query(memoryIndex, predicate, descend, 
// TODO: "read" should be an AbstractType (FW-486)
read) {
    ngDevMode && assertPreviousIsParent(getIsParent());
    /** @type {?} */
    var queryList = new QueryList();
    /** @type {?} */
    var queries = getOrCreateCurrentQueries(LQueries_);
    queries.track(queryList, predicate, descend, read);
    storeCleanupWithContext(getLView(), queryList, queryList.destroy);
    if (memoryIndex != null) {
        store(memoryIndex, queryList);
    }
    return queryList;
}
/**
 * Refreshes a query by combining matches from all active views and removing matches from deleted
 * views.
 * Returns true if a query got dirty during change detection, false otherwise.
 * @param {?} queryList
 * @return {?}
 */
export function queryRefresh(queryList) {
    /** @type {?} */
    var queryListImpl = (/** @type {?} */ ((queryList)));
    if (queryList.dirty) {
        queryList.reset(queryListImpl._valuesTree);
        queryList.notifyOnChanges();
        return true;
    }
    return false;
}
//# sourceMappingURL=query.js.map