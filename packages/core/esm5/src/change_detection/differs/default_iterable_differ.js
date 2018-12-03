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
import { isListLikeIterable, iterateListLike } from '../change_detection_util';
var DefaultIterableDifferFactory = /** @class */ (function () {
    function DefaultIterableDifferFactory() {
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    DefaultIterableDifferFactory.prototype.supports = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) { return isListLikeIterable(obj); };
    /**
     * @template V
     * @param {?=} trackByFn
     * @return {?}
     */
    DefaultIterableDifferFactory.prototype.create = /**
     * @template V
     * @param {?=} trackByFn
     * @return {?}
     */
    function (trackByFn) {
        return new DefaultIterableDiffer(trackByFn);
    };
    return DefaultIterableDifferFactory;
}());
export { DefaultIterableDifferFactory };
/** @type {?} */
var trackByIdentity = function (index, item) { return item; };
var ɵ0 = trackByIdentity;
/**
 * @deprecated v4.0.0 - Should not be part of public API.
 * \@publicApi
 * @template V
 */
var /**
 * @deprecated v4.0.0 - Should not be part of public API.
 * \@publicApi
 * @template V
 */
DefaultIterableDiffer = /** @class */ (function () {
    function DefaultIterableDiffer(trackByFn) {
        this.length = 0;
        this._linkedRecords = null;
        this._unlinkedRecords = null;
        this._previousItHead = null;
        this._itHead = null;
        this._itTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._movesHead = null;
        this._movesTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
        this._identityChangesHead = null;
        this._identityChangesTail = null;
        this._trackByFn = trackByFn || trackByIdentity;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachItem = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        /** @type {?} */
        var record;
        for (record = this._itHead; record !== null; record = record._next) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachOperation = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        /** @type {?} */
        var nextIt = this._itHead;
        /** @type {?} */
        var nextRemove = this._removalsHead;
        /** @type {?} */
        var addRemoveOffset = 0;
        /** @type {?} */
        var moveOffsets = null;
        while (nextIt || nextRemove) {
            /** @type {?} */
            var record = !nextRemove ||
                nextIt && /** @type {?} */ ((nextIt.currentIndex)) < getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ? /** @type {?} */
                ((nextIt)) :
                nextRemove;
            /** @type {?} */
            var adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets);
            /** @type {?} */
            var currentIndex = record.currentIndex;
            // consume the item, and adjust the addRemoveOffset and update moveDistance if necessary
            if (record === nextRemove) {
                addRemoveOffset--;
                nextRemove = nextRemove._nextRemoved;
            }
            else {
                nextIt = /** @type {?} */ ((nextIt))._next;
                if (record.previousIndex == null) {
                    addRemoveOffset++;
                }
                else {
                    // INVARIANT:  currentIndex < previousIndex
                    if (!moveOffsets)
                        moveOffsets = [];
                    /** @type {?} */
                    var localMovePreviousIndex = adjPreviousIndex - addRemoveOffset;
                    /** @type {?} */
                    var localCurrentIndex = /** @type {?} */ ((currentIndex)) - addRemoveOffset;
                    if (localMovePreviousIndex != localCurrentIndex) {
                        for (var i = 0; i < localMovePreviousIndex; i++) {
                            /** @type {?} */
                            var offset = i < moveOffsets.length ? moveOffsets[i] : (moveOffsets[i] = 0);
                            /** @type {?} */
                            var index = offset + i;
                            if (localCurrentIndex <= index && index < localMovePreviousIndex) {
                                moveOffsets[i] = offset + 1;
                            }
                        }
                        /** @type {?} */
                        var previousIndex = record.previousIndex;
                        moveOffsets[previousIndex] = localCurrentIndex - localMovePreviousIndex;
                    }
                }
            }
            if (adjPreviousIndex !== currentIndex) {
                fn(record, adjPreviousIndex, currentIndex);
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachPreviousItem = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        /** @type {?} */
        var record;
        for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachAddedItem = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        /** @type {?} */
        var record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachMovedItem = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        /** @type {?} */
        var record;
        for (record = this._movesHead; record !== null; record = record._nextMoved) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachRemovedItem = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        /** @type {?} */
        var record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultIterableDiffer.prototype.forEachIdentityChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        /** @type {?} */
        var record;
        for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
            fn(record);
        }
    };
    /**
     * @param {?} collection
     * @return {?}
     */
    DefaultIterableDiffer.prototype.diff = /**
     * @param {?} collection
     * @return {?}
     */
    function (collection) {
        if (collection == null)
            collection = [];
        if (!isListLikeIterable(collection)) {
            throw new Error("Error trying to diff '" + stringify(collection) + "'. Only arrays and iterables are allowed");
        }
        if (this.check(collection)) {
            return this;
        }
        else {
            return null;
        }
    };
    /**
     * @return {?}
     */
    DefaultIterableDiffer.prototype.onDestroy = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} collection
     * @return {?}
     */
    DefaultIterableDiffer.prototype.check = /**
     * @param {?} collection
     * @return {?}
     */
    function (collection) {
        var _this = this;
        this._reset();
        /** @type {?} */
        var record = this._itHead;
        /** @type {?} */
        var mayBeDirty = false;
        /** @type {?} */
        var index;
        /** @type {?} */
        var item;
        /** @type {?} */
        var itemTrackBy;
        if (Array.isArray(collection)) {
            (/** @type {?} */ (this)).length = collection.length;
            for (var index_1 = 0; index_1 < this.length; index_1++) {
                item = collection[index_1];
                itemTrackBy = this._trackByFn(index_1, item);
                if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
                    record = this._mismatch(record, item, itemTrackBy, index_1);
                    mayBeDirty = true;
                }
                else {
                    if (mayBeDirty) {
                        // TODO(misko): can we limit this to duplicates only?
                        record = this._verifyReinsertion(record, item, itemTrackBy, index_1);
                    }
                    if (!looseIdentical(record.item, item))
                        this._addIdentityChange(record, item);
                }
                record = record._next;
            }
        }
        else {
            index = 0;
            iterateListLike(collection, function (item) {
                itemTrackBy = _this._trackByFn(index, item);
                if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
                    record = _this._mismatch(record, item, itemTrackBy, index);
                    mayBeDirty = true;
                }
                else {
                    if (mayBeDirty) {
                        // TODO(misko): can we limit this to duplicates only?
                        record = _this._verifyReinsertion(record, item, itemTrackBy, index);
                    }
                    if (!looseIdentical(record.item, item))
                        _this._addIdentityChange(record, item);
                }
                record = record._next;
                index++;
            });
            (/** @type {?} */ (this)).length = index;
        }
        this._truncate(record);
        (/** @type {?} */ (this)).collection = collection;
        return this.isDirty;
    };
    Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
        /* CollectionChanges is considered dirty if it has any additions, moves, removals, or identity
         * changes.
         */
        get: /**
         * @return {?}
         */
        function () {
            return this._additionsHead !== null || this._movesHead !== null ||
                this._removalsHead !== null || this._identityChangesHead !== null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reset the state of the change objects to show no changes. This means set previousKey to
     * currentKey, and clear all of the queues (additions, moves, removals).
     * Set the previousIndexes of moved and added items to their currentIndexes
     * Reset the list of additions, moves and removals
     *
     * @internal
     */
    /**
     * Reset the state of the change objects to show no changes. This means set previousKey to
     * currentKey, and clear all of the queues (additions, moves, removals).
     * Set the previousIndexes of moved and added items to their currentIndexes
     * Reset the list of additions, moves and removals
     *
     * \@internal
     * @return {?}
     */
    DefaultIterableDiffer.prototype._reset = /**
     * Reset the state of the change objects to show no changes. This means set previousKey to
     * currentKey, and clear all of the queues (additions, moves, removals).
     * Set the previousIndexes of moved and added items to their currentIndexes
     * Reset the list of additions, moves and removals
     *
     * \@internal
     * @return {?}
     */
    function () {
        if (this.isDirty) {
            /** @type {?} */
            var record = void 0;
            /** @type {?} */
            var nextRecord = void 0;
            for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                record.previousIndex = record.currentIndex;
            }
            this._additionsHead = this._additionsTail = null;
            for (record = this._movesHead; record !== null; record = nextRecord) {
                record.previousIndex = record.currentIndex;
                nextRecord = record._nextMoved;
            }
            this._movesHead = this._movesTail = null;
            this._removalsHead = this._removalsTail = null;
            this._identityChangesHead = this._identityChangesTail = null;
            // TODO(vicb): when assert gets supported
            // assert(!this.isDirty);
        }
    };
    /**
     * This is the core function which handles differences between collections.
     *
     * - `record` is the record which we saw at this position last time. If null then it is a new
     *   item.
     * - `item` is the current item in the collection
     * - `index` is the position of the item in the collection
     *
     * @internal
     */
    /**
     * This is the core function which handles differences between collections.
     *
     * - `record` is the record which we saw at this position last time. If null then it is a new
     *   item.
     * - `item` is the current item in the collection
     * - `index` is the position of the item in the collection
     *
     * \@internal
     * @param {?} record
     * @param {?} item
     * @param {?} itemTrackBy
     * @param {?} index
     * @return {?}
     */
    DefaultIterableDiffer.prototype._mismatch = /**
     * This is the core function which handles differences between collections.
     *
     * - `record` is the record which we saw at this position last time. If null then it is a new
     *   item.
     * - `item` is the current item in the collection
     * - `index` is the position of the item in the collection
     *
     * \@internal
     * @param {?} record
     * @param {?} item
     * @param {?} itemTrackBy
     * @param {?} index
     * @return {?}
     */
    function (record, item, itemTrackBy, index) {
        /** @type {?} */
        var previousRecord;
        if (record === null) {
            previousRecord = this._itTail;
        }
        else {
            previousRecord = record._prev;
            // Remove the record from the collection since we know it does not match the item.
            this._remove(record);
        }
        // Attempt to see if we have seen the item before.
        record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
        if (record !== null) {
            // We have seen this before, we need to move it forward in the collection.
            // But first we need to check if identity changed, so we can update in view if necessary
            if (!looseIdentical(record.item, item))
                this._addIdentityChange(record, item);
            this._moveAfter(record, previousRecord, index);
        }
        else {
            // Never seen it, check evicted list.
            record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
            if (record !== null) {
                // It is an item which we have evicted earlier: reinsert it back into the list.
                // But first we need to check if identity changed, so we can update in view if necessary
                if (!looseIdentical(record.item, item))
                    this._addIdentityChange(record, item);
                this._reinsertAfter(record, previousRecord, index);
            }
            else {
                // It is a new item: add it.
                record =
                    this._addAfter(new IterableChangeRecord_(item, itemTrackBy), previousRecord, index);
            }
        }
        return record;
    };
    /**
     * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
     *
     * Use case: `[a, a]` => `[b, a, a]`
     *
     * If we did not have this check then the insertion of `b` would:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) leave `a` at index `1` as is. <-- this is wrong!
     *   3) reinsert `a` at index 2. <-- this is wrong!
     *
     * The correct behavior is:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) reinsert `a` at index 1.
     *   3) move `a` at from `1` to `2`.
     *
     *
     * Double check that we have not evicted a duplicate item. We need to check if the item type may
     * have already been removed:
     * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
     * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
     * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
     * at the end.
     *
     * @internal
     */
    /**
     * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
     *
     * Use case: `[a, a]` => `[b, a, a]`
     *
     * If we did not have this check then the insertion of `b` would:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) leave `a` at index `1` as is. <-- this is wrong!
     *   3) reinsert `a` at index 2. <-- this is wrong!
     *
     * The correct behavior is:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) reinsert `a` at index 1.
     *   3) move `a` at from `1` to `2`.
     *
     *
     * Double check that we have not evicted a duplicate item. We need to check if the item type may
     * have already been removed:
     * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
     * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
     * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
     * at the end.
     *
     * \@internal
     * @param {?} record
     * @param {?} item
     * @param {?} itemTrackBy
     * @param {?} index
     * @return {?}
     */
    DefaultIterableDiffer.prototype._verifyReinsertion = /**
     * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
     *
     * Use case: `[a, a]` => `[b, a, a]`
     *
     * If we did not have this check then the insertion of `b` would:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) leave `a` at index `1` as is. <-- this is wrong!
     *   3) reinsert `a` at index 2. <-- this is wrong!
     *
     * The correct behavior is:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) reinsert `a` at index 1.
     *   3) move `a` at from `1` to `2`.
     *
     *
     * Double check that we have not evicted a duplicate item. We need to check if the item type may
     * have already been removed:
     * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
     * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
     * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
     * at the end.
     *
     * \@internal
     * @param {?} record
     * @param {?} item
     * @param {?} itemTrackBy
     * @param {?} index
     * @return {?}
     */
    function (record, item, itemTrackBy, index) {
        /** @type {?} */
        var reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
        if (reinsertRecord !== null) {
            record = this._reinsertAfter(reinsertRecord, /** @type {?} */ ((record._prev)), index);
        }
        else if (record.currentIndex != index) {
            record.currentIndex = index;
            this._addToMoves(record, index);
        }
        return record;
    };
    /**
     * Get rid of any excess {@link IterableChangeRecord_}s from the previous collection
     *
     * - `record` The first excess {@link IterableChangeRecord_}.
     *
     * @internal
     */
    /**
     * Get rid of any excess {\@link IterableChangeRecord_}s from the previous collection
     *
     * - `record` The first excess {\@link IterableChangeRecord_}.
     *
     * \@internal
     * @param {?} record
     * @return {?}
     */
    DefaultIterableDiffer.prototype._truncate = /**
     * Get rid of any excess {\@link IterableChangeRecord_}s from the previous collection
     *
     * - `record` The first excess {\@link IterableChangeRecord_}.
     *
     * \@internal
     * @param {?} record
     * @return {?}
     */
    function (record) {
        // Anything after that needs to be removed;
        while (record !== null) {
            /** @type {?} */
            var nextRecord = record._next;
            this._addToRemovals(this._unlink(record));
            record = nextRecord;
        }
        if (this._unlinkedRecords !== null) {
            this._unlinkedRecords.clear();
        }
        if (this._additionsTail !== null) {
            this._additionsTail._nextAdded = null;
        }
        if (this._movesTail !== null) {
            this._movesTail._nextMoved = null;
        }
        if (this._itTail !== null) {
            this._itTail._next = null;
        }
        if (this._removalsTail !== null) {
            this._removalsTail._nextRemoved = null;
        }
        if (this._identityChangesTail !== null) {
            this._identityChangesTail._nextIdentityChange = null;
        }
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    DefaultIterableDiffer.prototype._reinsertAfter = /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    function (record, prevRecord, index) {
        if (this._unlinkedRecords !== null) {
            this._unlinkedRecords.remove(record);
        }
        /** @type {?} */
        var prev = record._prevRemoved;
        /** @type {?} */
        var next = record._nextRemoved;
        if (prev === null) {
            this._removalsHead = next;
        }
        else {
            prev._nextRemoved = next;
        }
        if (next === null) {
            this._removalsTail = prev;
        }
        else {
            next._prevRemoved = prev;
        }
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    DefaultIterableDiffer.prototype._moveAfter = /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    function (record, prevRecord, index) {
        this._unlink(record);
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    DefaultIterableDiffer.prototype._addAfter = /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    function (record, prevRecord, index) {
        this._insertAfter(record, prevRecord, index);
        if (this._additionsTail === null) {
            // TODO(vicb):
            // assert(this._additionsHead === null);
            this._additionsTail = this._additionsHead = record;
        }
        else {
            // TODO(vicb):
            // assert(_additionsTail._nextAdded === null);
            // assert(record._nextAdded === null);
            this._additionsTail = this._additionsTail._nextAdded = record;
        }
        return record;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    DefaultIterableDiffer.prototype._insertAfter = /**
     * \@internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    function (record, prevRecord, index) {
        /** @type {?} */
        var next = prevRecord === null ? this._itHead : prevRecord._next;
        // TODO(vicb):
        // assert(next != record);
        // assert(prevRecord != record);
        record._next = next;
        record._prev = prevRecord;
        if (next === null) {
            this._itTail = record;
        }
        else {
            next._prev = record;
        }
        if (prevRecord === null) {
            this._itHead = record;
        }
        else {
            prevRecord._next = record;
        }
        if (this._linkedRecords === null) {
            this._linkedRecords = new _DuplicateMap();
        }
        this._linkedRecords.put(record);
        record.currentIndex = index;
        return record;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    DefaultIterableDiffer.prototype._remove = /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    function (record) {
        return this._addToRemovals(this._unlink(record));
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    DefaultIterableDiffer.prototype._unlink = /**
     * \@internal
     * @param {?} record
     * @return {?}
     */
    function (record) {
        if (this._linkedRecords !== null) {
            this._linkedRecords.remove(record);
        }
        /** @type {?} */
        var prev = record._prev;
        /** @type {?} */
        var next = record._next;
        // TODO(vicb):
        // assert((record._prev = null) === null);
        // assert((record._next = null) === null);
        if (prev === null) {
            this._itHead = next;
        }
        else {
            prev._next = next;
        }
        if (next === null) {
            this._itTail = prev;
        }
        else {
            next._prev = prev;
        }
        return record;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} record
     * @param {?} toIndex
     * @return {?}
     */
    DefaultIterableDiffer.prototype._addToMoves = /**
     * \@internal
     * @param {?} record
     * @param {?} toIndex
     * @return {?}
     */
    function (record, toIndex) {
        // TODO(vicb):
        // assert(record._nextMoved === null);
        if (record.previousIndex === toIndex) {
            return record;
        }
        if (this._movesTail === null) {
            // TODO(vicb):
            // assert(_movesHead === null);
            this._movesTail = this._movesHead = record;
        }
        else {
            // TODO(vicb):
            // assert(_movesTail._nextMoved === null);
            this._movesTail = this._movesTail._nextMoved = record;
        }
        return record;
    };
    /**
     * @param {?} record
     * @return {?}
     */
    DefaultIterableDiffer.prototype._addToRemovals = /**
     * @param {?} record
     * @return {?}
     */
    function (record) {
        if (this._unlinkedRecords === null) {
            this._unlinkedRecords = new _DuplicateMap();
        }
        this._unlinkedRecords.put(record);
        record.currentIndex = null;
        record._nextRemoved = null;
        if (this._removalsTail === null) {
            // TODO(vicb):
            // assert(_removalsHead === null);
            this._removalsTail = this._removalsHead = record;
            record._prevRemoved = null;
        }
        else {
            // TODO(vicb):
            // assert(_removalsTail._nextRemoved === null);
            // assert(record._nextRemoved === null);
            record._prevRemoved = this._removalsTail;
            this._removalsTail = this._removalsTail._nextRemoved = record;
        }
        return record;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} record
     * @param {?} item
     * @return {?}
     */
    DefaultIterableDiffer.prototype._addIdentityChange = /**
     * \@internal
     * @param {?} record
     * @param {?} item
     * @return {?}
     */
    function (record, item) {
        record.item = item;
        if (this._identityChangesTail === null) {
            this._identityChangesTail = this._identityChangesHead = record;
        }
        else {
            this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
        }
        return record;
    };
    return DefaultIterableDiffer;
}());
/**
 * @deprecated v4.0.0 - Should not be part of public API.
 * \@publicApi
 * @template V
 */
export { DefaultIterableDiffer };
if (false) {
    /** @type {?} */
    DefaultIterableDiffer.prototype.length;
    /** @type {?} */
    DefaultIterableDiffer.prototype.collection;
    /** @type {?} */
    DefaultIterableDiffer.prototype._linkedRecords;
    /** @type {?} */
    DefaultIterableDiffer.prototype._unlinkedRecords;
    /** @type {?} */
    DefaultIterableDiffer.prototype._previousItHead;
    /** @type {?} */
    DefaultIterableDiffer.prototype._itHead;
    /** @type {?} */
    DefaultIterableDiffer.prototype._itTail;
    /** @type {?} */
    DefaultIterableDiffer.prototype._additionsHead;
    /** @type {?} */
    DefaultIterableDiffer.prototype._additionsTail;
    /** @type {?} */
    DefaultIterableDiffer.prototype._movesHead;
    /** @type {?} */
    DefaultIterableDiffer.prototype._movesTail;
    /** @type {?} */
    DefaultIterableDiffer.prototype._removalsHead;
    /** @type {?} */
    DefaultIterableDiffer.prototype._removalsTail;
    /** @type {?} */
    DefaultIterableDiffer.prototype._identityChangesHead;
    /** @type {?} */
    DefaultIterableDiffer.prototype._identityChangesTail;
    /** @type {?} */
    DefaultIterableDiffer.prototype._trackByFn;
}
/**
 * @template V
 */
var /**
 * @template V
 */
IterableChangeRecord_ = /** @class */ (function () {
    function IterableChangeRecord_(item, trackById) {
        this.item = item;
        this.trackById = trackById;
        this.currentIndex = null;
        this.previousIndex = null;
        /**
         * \@internal
         */
        this._nextPrevious = null;
        /**
         * \@internal
         */
        this._prev = null;
        /**
         * \@internal
         */
        this._next = null;
        /**
         * \@internal
         */
        this._prevDup = null;
        /**
         * \@internal
         */
        this._nextDup = null;
        /**
         * \@internal
         */
        this._prevRemoved = null;
        /**
         * \@internal
         */
        this._nextRemoved = null;
        /**
         * \@internal
         */
        this._nextAdded = null;
        /**
         * \@internal
         */
        this._nextMoved = null;
        /**
         * \@internal
         */
        this._nextIdentityChange = null;
    }
    return IterableChangeRecord_;
}());
/**
 * @template V
 */
export { IterableChangeRecord_ };
if (false) {
    /** @type {?} */
    IterableChangeRecord_.prototype.currentIndex;
    /** @type {?} */
    IterableChangeRecord_.prototype.previousIndex;
    /**
     * \@internal
     * @type {?}
     */
    IterableChangeRecord_.prototype._nextPrevious;
    /**
     * \@internal
     * @type {?}
     */
    IterableChangeRecord_.prototype._prev;
    /**
     * \@internal
     * @type {?}
     */
    IterableChangeRecord_.prototype._next;
    /**
     * \@internal
     * @type {?}
     */
    IterableChangeRecord_.prototype._prevDup;
    /**
     * \@internal
     * @type {?}
     */
    IterableChangeRecord_.prototype._nextDup;
    /**
     * \@internal
     * @type {?}
     */
    IterableChangeRecord_.prototype._prevRemoved;
    /**
     * \@internal
     * @type {?}
     */
    IterableChangeRecord_.prototype._nextRemoved;
    /**
     * \@internal
     * @type {?}
     */
    IterableChangeRecord_.prototype._nextAdded;
    /**
     * \@internal
     * @type {?}
     */
    IterableChangeRecord_.prototype._nextMoved;
    /**
     * \@internal
     * @type {?}
     */
    IterableChangeRecord_.prototype._nextIdentityChange;
    /** @type {?} */
    IterableChangeRecord_.prototype.item;
    /** @type {?} */
    IterableChangeRecord_.prototype.trackById;
}
/**
 * @template V
 */
var /**
 * @template V
 */
_DuplicateItemRecordList = /** @class */ (function () {
    function _DuplicateItemRecordList() {
        /**
         * \@internal
         */
        this._head = null;
        /**
         * \@internal
         */
        this._tail = null;
    }
    /**
     * Append the record to the list of duplicates.
     *
     * Note: by design all records in the list of duplicates hold the same value in record.item.
     */
    /**
     * Append the record to the list of duplicates.
     *
     * Note: by design all records in the list of duplicates hold the same value in record.item.
     * @param {?} record
     * @return {?}
     */
    _DuplicateItemRecordList.prototype.add = /**
     * Append the record to the list of duplicates.
     *
     * Note: by design all records in the list of duplicates hold the same value in record.item.
     * @param {?} record
     * @return {?}
     */
    function (record) {
        if (this._head === null) {
            this._head = this._tail = record;
            record._nextDup = null;
            record._prevDup = null;
        }
        else {
            /** @type {?} */ ((
            // TODO(vicb):
            // assert(record.item ==  _head.item ||
            //       record.item is num && record.item.isNaN && _head.item is num && _head.item.isNaN);
            this._tail))._nextDup = record;
            record._prevDup = this._tail;
            record._nextDup = null;
            this._tail = record;
        }
    };
    // Returns a IterableChangeRecord_ having IterableChangeRecord_.trackById == trackById and
    // IterableChangeRecord_.currentIndex >= atOrAfterIndex
    /**
     * @param {?} trackById
     * @param {?} atOrAfterIndex
     * @return {?}
     */
    _DuplicateItemRecordList.prototype.get = /**
     * @param {?} trackById
     * @param {?} atOrAfterIndex
     * @return {?}
     */
    function (trackById, atOrAfterIndex) {
        /** @type {?} */
        var record;
        for (record = this._head; record !== null; record = record._nextDup) {
            if ((atOrAfterIndex === null || atOrAfterIndex <= /** @type {?} */ ((record.currentIndex))) &&
                looseIdentical(record.trackById, trackById)) {
                return record;
            }
        }
        return null;
    };
    /**
     * Remove one {@link IterableChangeRecord_} from the list of duplicates.
     *
     * Returns whether the list of duplicates is empty.
     */
    /**
     * Remove one {\@link IterableChangeRecord_} from the list of duplicates.
     *
     * Returns whether the list of duplicates is empty.
     * @param {?} record
     * @return {?}
     */
    _DuplicateItemRecordList.prototype.remove = /**
     * Remove one {\@link IterableChangeRecord_} from the list of duplicates.
     *
     * Returns whether the list of duplicates is empty.
     * @param {?} record
     * @return {?}
     */
    function (record) {
        /** @type {?} */
        var prev = record._prevDup;
        /** @type {?} */
        var next = record._nextDup;
        if (prev === null) {
            this._head = next;
        }
        else {
            prev._nextDup = next;
        }
        if (next === null) {
            this._tail = prev;
        }
        else {
            next._prevDup = prev;
        }
        return this._head === null;
    };
    return _DuplicateItemRecordList;
}());
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    _DuplicateItemRecordList.prototype._head;
    /**
     * \@internal
     * @type {?}
     */
    _DuplicateItemRecordList.prototype._tail;
}
/**
 * @template V
 */
var /**
 * @template V
 */
_DuplicateMap = /** @class */ (function () {
    function _DuplicateMap() {
        this.map = new Map();
    }
    /**
     * @param {?} record
     * @return {?}
     */
    _DuplicateMap.prototype.put = /**
     * @param {?} record
     * @return {?}
     */
    function (record) {
        /** @type {?} */
        var key = record.trackById;
        /** @type {?} */
        var duplicates = this.map.get(key);
        if (!duplicates) {
            duplicates = new _DuplicateItemRecordList();
            this.map.set(key, duplicates);
        }
        duplicates.add(record);
    };
    /**
     * Retrieve the `value` using key. Because the IterableChangeRecord_ value may be one which we
     * have already iterated over, we use the `atOrAfterIndex` to pretend it is not there.
     *
     * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
     * have any more `a`s needs to return the second `a`.
     */
    /**
     * Retrieve the `value` using key. Because the IterableChangeRecord_ value may be one which we
     * have already iterated over, we use the `atOrAfterIndex` to pretend it is not there.
     *
     * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
     * have any more `a`s needs to return the second `a`.
     * @param {?} trackById
     * @param {?} atOrAfterIndex
     * @return {?}
     */
    _DuplicateMap.prototype.get = /**
     * Retrieve the `value` using key. Because the IterableChangeRecord_ value may be one which we
     * have already iterated over, we use the `atOrAfterIndex` to pretend it is not there.
     *
     * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
     * have any more `a`s needs to return the second `a`.
     * @param {?} trackById
     * @param {?} atOrAfterIndex
     * @return {?}
     */
    function (trackById, atOrAfterIndex) {
        /** @type {?} */
        var key = trackById;
        /** @type {?} */
        var recordList = this.map.get(key);
        return recordList ? recordList.get(trackById, atOrAfterIndex) : null;
    };
    /**
     * Removes a {@link IterableChangeRecord_} from the list of duplicates.
     *
     * The list of duplicates also is removed from the map if it gets empty.
     */
    /**
     * Removes a {\@link IterableChangeRecord_} from the list of duplicates.
     *
     * The list of duplicates also is removed from the map if it gets empty.
     * @param {?} record
     * @return {?}
     */
    _DuplicateMap.prototype.remove = /**
     * Removes a {\@link IterableChangeRecord_} from the list of duplicates.
     *
     * The list of duplicates also is removed from the map if it gets empty.
     * @param {?} record
     * @return {?}
     */
    function (record) {
        /** @type {?} */
        var key = record.trackById;
        /** @type {?} */
        var recordList = /** @type {?} */ ((this.map.get(key)));
        // Remove the list of duplicates when it gets empty
        if (recordList.remove(record)) {
            this.map.delete(key);
        }
        return record;
    };
    Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
        get: /**
         * @return {?}
         */
        function () { return this.map.size === 0; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    _DuplicateMap.prototype.clear = /**
     * @return {?}
     */
    function () { this.map.clear(); };
    return _DuplicateMap;
}());
if (false) {
    /** @type {?} */
    _DuplicateMap.prototype.map;
}
/**
 * @param {?} item
 * @param {?} addRemoveOffset
 * @param {?} moveOffsets
 * @return {?}
 */
function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
    /** @type {?} */
    var previousIndex = item.previousIndex;
    if (previousIndex === null)
        return previousIndex;
    /** @type {?} */
    var moveOffset = 0;
    if (moveOffsets && previousIndex < moveOffsets.length) {
        moveOffset = moveOffsets[previousIndex];
    }
    return previousIndex + addRemoveOffset + moveOffset;
}
export { ɵ0 };
//# sourceMappingURL=default_iterable_differ.js.map