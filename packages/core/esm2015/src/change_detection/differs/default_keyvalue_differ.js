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
import { looseIdentical, stringify } from '../../util';
import { isJsObject } from '../change_detection_util';
/**
 * @template K, V
 */
export class DefaultKeyValueDifferFactory {
    constructor() { }
    /**
     * @param {?} obj
     * @return {?}
     */
    supports(obj) { return obj instanceof Map || isJsObject(obj); }
    /**
     * @template K, V
     * @return {?}
     */
    create() { return new DefaultKeyValueDiffer(); }
}
/**
 * @template K, V
 */
export class DefaultKeyValueDiffer {
    constructor() {
        this._records = new Map();
        this._mapHead = null;
        this._appendAfter = null;
        this._previousMapHead = null;
        this._changesHead = null;
        this._changesTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
    }
    /**
     * @return {?}
     */
    get isDirty() {
        return this._additionsHead !== null || this._changesHead !== null ||
            this._removalsHead !== null;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachItem(fn) {
        /** @type {?} */
        let record;
        for (record = this._mapHead; record !== null; record = record._next) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachPreviousItem(fn) {
        /** @type {?} */
        let record;
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachChangedItem(fn) {
        /** @type {?} */
        let record;
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachAddedItem(fn) {
        /** @type {?} */
        let record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachRemovedItem(fn) {
        /** @type {?} */
        let record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    }
    /**
     * @param {?=} map
     * @return {?}
     */
    diff(map) {
        if (!map) {
            map = new Map();
        }
        else if (!(map instanceof Map || isJsObject(map))) {
            throw new Error(`Error trying to diff '${stringify(map)}'. Only maps and objects are allowed`);
        }
        return this.check(map) ? this : null;
    }
    /**
     * @return {?}
     */
    onDestroy() { }
    /**
     * Check the current state of the map vs the previous.
     * The algorithm is optimised for when the keys do no change.
     * @param {?} map
     * @return {?}
     */
    check(map) {
        this._reset();
        /** @type {?} */
        let insertBefore = this._mapHead;
        this._appendAfter = null;
        this._forEach(map, (value, key) => {
            if (insertBefore && insertBefore.key === key) {
                this._maybeAddToChanges(insertBefore, value);
                this._appendAfter = insertBefore;
                insertBefore = insertBefore._next;
            }
            else {
                /** @type {?} */
                const record = this._getOrCreateRecordForKey(key, value);
                insertBefore = this._insertBeforeOrAppend(insertBefore, record);
            }
        });
        // Items remaining at the end of the list have been deleted
        if (insertBefore) {
            if (insertBefore._prev) {
                insertBefore._prev._next = null;
            }
            this._removalsHead = insertBefore;
            for (let record = insertBefore; record !== null; record = record._nextRemoved) {
                if (record === this._mapHead) {
                    this._mapHead = null;
                }
                this._records.delete(record.key);
                record._nextRemoved = record._next;
                record.previousValue = record.currentValue;
                record.currentValue = null;
                record._prev = null;
                record._next = null;
            }
        }
        // Make sure tails have no next records from previous runs
        if (this._changesTail)
            this._changesTail._nextChanged = null;
        if (this._additionsTail)
            this._additionsTail._nextAdded = null;
        return this.isDirty;
    }
    /**
     * Inserts a record before `before` or append at the end of the list when `before` is null.
     *
     * Notes:
     * - This method appends at `this._appendAfter`,
     * - This method updates `this._appendAfter`,
     * - The return value is the new value for the insertion pointer.
     * @param {?} before
     * @param {?} record
     * @return {?}
     */
    _insertBeforeOrAppend(before, record) {
        if (before) {
            /** @type {?} */
            const prev = before._prev;
            record._next = before;
            record._prev = prev;
            before._prev = record;
            if (prev) {
                prev._next = record;
            }
            if (before === this._mapHead) {
                this._mapHead = record;
            }
            this._appendAfter = before;
            return before;
        }
        if (this._appendAfter) {
            this._appendAfter._next = record;
            record._prev = this._appendAfter;
        }
        else {
            this._mapHead = record;
        }
        this._appendAfter = record;
        return null;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    _getOrCreateRecordForKey(key, value) {
        if (this._records.has(key)) {
            /** @type {?} */
            const record = /** @type {?} */ ((this._records.get(key)));
            this._maybeAddToChanges(record, value);
            /** @type {?} */
            const prev = record._prev;
            /** @type {?} */
            const next = record._next;
            if (prev) {
                prev._next = next;
            }
            if (next) {
                next._prev = prev;
            }
            record._next = null;
            record._prev = null;
            return record;
        }
        /** @type {?} */
        const record = new KeyValueChangeRecord_(key);
        this._records.set(key, record);
        record.currentValue = value;
        this._addToAdditions(record);
        return record;
    }
    /**
     * \@internal
     * @return {?}
     */
    _reset() {
        if (this.isDirty) {
            /** @type {?} */
            let record;
            // let `_previousMapHead` contain the state of the map before the changes
            this._previousMapHead = this._mapHead;
            for (record = this._previousMapHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            // Update `record.previousValue` with the value of the item before the changes
            // We need to update all changed items (that's those which have been added and changed)
            for (record = this._changesHead; record !== null; record = record._nextChanged) {
                record.previousValue = record.currentValue;
            }
            for (record = this._additionsHead; record != null; record = record._nextAdded) {
                record.previousValue = record.currentValue;
            }
            this._changesHead = this._changesTail = null;
            this._additionsHead = this._additionsTail = null;
            this._removalsHead = null;
        }
    }
    /**
     * @param {?} record
     * @param {?} newValue
     * @return {?}
     */
    _maybeAddToChanges(record, newValue) {
        if (!looseIdentical(newValue, record.currentValue)) {
            record.previousValue = record.currentValue;
            record.currentValue = newValue;
            this._addToChanges(record);
        }
    }
    /**
     * @param {?} record
     * @return {?}
     */
    _addToAdditions(record) {
        if (this._additionsHead === null) {
            this._additionsHead = this._additionsTail = record;
        }
        else {
            /** @type {?} */ ((this._additionsTail))._nextAdded = record;
            this._additionsTail = record;
        }
    }
    /**
     * @param {?} record
     * @return {?}
     */
    _addToChanges(record) {
        if (this._changesHead === null) {
            this._changesHead = this._changesTail = record;
        }
        else {
            /** @type {?} */ ((this._changesTail))._nextChanged = record;
            this._changesTail = record;
        }
    }
    /**
     * \@internal
     * @template K, V
     * @param {?} obj
     * @param {?} fn
     * @return {?}
     */
    _forEach(obj, fn) {
        if (obj instanceof Map) {
            obj.forEach(fn);
        }
        else {
            Object.keys(obj).forEach(k => fn(obj[k], k));
        }
    }
}
if (false) {
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._records;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._mapHead;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._appendAfter;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._previousMapHead;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._changesHead;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._changesTail;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._additionsHead;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._additionsTail;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._removalsHead;
    /** @type {?} */
    DefaultKeyValueDiffer.prototype._removalsTail;
}
/**
 * @template K, V
 */
class KeyValueChangeRecord_ {
    /**
     * @param {?} key
     */
    constructor(key) {
        this.key = key;
        this.previousValue = null;
        this.currentValue = null;
        /**
         * \@internal
         */
        this._nextPrevious = null;
        /**
         * \@internal
         */
        this._next = null;
        /**
         * \@internal
         */
        this._prev = null;
        /**
         * \@internal
         */
        this._nextAdded = null;
        /**
         * \@internal
         */
        this._nextRemoved = null;
        /**
         * \@internal
         */
        this._nextChanged = null;
    }
}
if (false) {
    /** @type {?} */
    KeyValueChangeRecord_.prototype.previousValue;
    /** @type {?} */
    KeyValueChangeRecord_.prototype.currentValue;
    /**
     * \@internal
     * @type {?}
     */
    KeyValueChangeRecord_.prototype._nextPrevious;
    /**
     * \@internal
     * @type {?}
     */
    KeyValueChangeRecord_.prototype._next;
    /**
     * \@internal
     * @type {?}
     */
    KeyValueChangeRecord_.prototype._prev;
    /**
     * \@internal
     * @type {?}
     */
    KeyValueChangeRecord_.prototype._nextAdded;
    /**
     * \@internal
     * @type {?}
     */
    KeyValueChangeRecord_.prototype._nextRemoved;
    /**
     * \@internal
     * @type {?}
     */
    KeyValueChangeRecord_.prototype._nextChanged;
    /** @type {?} */
    KeyValueChangeRecord_.prototype.key;
}
//# sourceMappingURL=default_keyvalue_differ.js.map