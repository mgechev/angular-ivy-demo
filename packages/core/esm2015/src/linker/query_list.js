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
import { getSymbolIterator } from '../util';
/**
 * An unmodifiable list of items that Angular keeps up to date when the state
 * of the application changes.
 *
 * The type of object that {\@link ViewChildren}, {\@link ContentChildren}, and {\@link QueryList}
 * provide.
 *
 * Implements an iterable interface, therefore it can be used in both ES6
 * javascript `for (var i of items)` loops as well as in Angular templates with
 * `*ngFor="let i of myList"`.
 *
 * Changes can be observed by subscribing to the changes `Observable`.
 *
 * NOTE: In the future this class will implement an `Observable` interface.
 *
 * \@usageNotes
 * ### Example
 * ```typescript
 * \@Component({...})
 * class Container {
 * \@ViewChildren(Item) items:QueryList<Item>;
 * }
 * ```
 *
 * \@publicApi
 * @template T
 */
export class QueryList {
    constructor() {
        this.dirty = true;
        this._results = [];
        this.changes = new EventEmitter();
        this.length = 0;
    }
    /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     * @template U
     * @param {?} fn
     * @return {?}
     */
    map(fn) { return this._results.map(fn); }
    /**
     * See
     * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
     * @param {?} fn
     * @return {?}
     */
    filter(fn) {
        return this._results.filter(fn);
    }
    /**
     * See
     * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     * @param {?} fn
     * @return {?}
     */
    find(fn) {
        return this._results.find(fn);
    }
    /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     * @template U
     * @param {?} fn
     * @param {?} init
     * @return {?}
     */
    reduce(fn, init) {
        return this._results.reduce(fn, init);
    }
    /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     * @param {?} fn
     * @return {?}
     */
    forEach(fn) { this._results.forEach(fn); }
    /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     * @param {?} fn
     * @return {?}
     */
    some(fn) {
        return this._results.some(fn);
    }
    /**
     * @return {?}
     */
    toArray() { return this._results.slice(); }
    /**
     * @return {?}
     */
    [getSymbolIterator()]() { return (/** @type {?} */ (this._results))[getSymbolIterator()](); }
    /**
     * @return {?}
     */
    toString() { return this._results.toString(); }
    /**
     * @param {?} res
     * @return {?}
     */
    reset(res) {
        this._results = flatten(res);
        (/** @type {?} */ (this)).dirty = false;
        (/** @type {?} */ (this)).length = this._results.length;
        (/** @type {?} */ (this)).last = this._results[this.length - 1];
        (/** @type {?} */ (this)).first = this._results[0];
    }
    /**
     * @return {?}
     */
    notifyOnChanges() { (/** @type {?} */ (this.changes)).emit(this); }
    /**
     * internal
     * @return {?}
     */
    setDirty() { (/** @type {?} */ (this)).dirty = true; }
    /**
     * internal
     * @return {?}
     */
    destroy() {
        (/** @type {?} */ (this.changes)).complete();
        (/** @type {?} */ (this.changes)).unsubscribe();
    }
}
if (false) {
    /** @type {?} */
    QueryList.prototype.dirty;
    /** @type {?} */
    QueryList.prototype._results;
    /** @type {?} */
    QueryList.prototype.changes;
    /** @type {?} */
    QueryList.prototype.length;
    /** @type {?} */
    QueryList.prototype.first;
    /** @type {?} */
    QueryList.prototype.last;
}
/**
 * @template T
 * @param {?} list
 * @return {?}
 */
function flatten(list) {
    return list.reduce((flat, item) => {
        /** @type {?} */
        const flatItem = Array.isArray(item) ? flatten(item) : item;
        return (/** @type {?} */ (flat)).concat(flatItem);
    }, []);
}
//# sourceMappingURL=query_list.js.map