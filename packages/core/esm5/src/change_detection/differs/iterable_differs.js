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
import { defineInjectable } from '../../di/defs';
import { Optional, SkipSelf } from '../../di/metadata';
import { DefaultIterableDifferFactory } from '../differs/default_iterable_differ';
/** @typedef {?} */
var NgIterable;
export { NgIterable };
/**
 * A strategy for tracking changes over time to an iterable. Used by {\@link NgForOf} to
 * respond to changes in an iterable by effecting equivalent changes in the DOM.
 *
 * \@publicApi
 * @record
 * @template V
 */
export function IterableDiffer() { }
/**
 * Compute a difference between the previous state and the new `object` state.
 *
 * \@param object containing the new value.
 * \@return an object describing the difference. The return value is only valid until the next
 * `diff()` invocation.
 * @type {?}
 */
IterableDiffer.prototype.diff;
/**
 * An object describing the changes in the `Iterable` collection since last time
 * `IterableDiffer#diff()` was invoked.
 *
 * \@publicApi
 * @record
 * @template V
 */
export function IterableChanges() { }
/**
 * Iterate over all changes. `IterableChangeRecord` will contain information about changes
 * to each item.
 * @type {?}
 */
IterableChanges.prototype.forEachItem;
/**
 * Iterate over a set of operations which when applied to the original `Iterable` will produce the
 * new `Iterable`.
 *
 * NOTE: These are not necessarily the actual operations which were applied to the original
 * `Iterable`, rather these are a set of computed operations which may not be the same as the
 * ones applied.
 *
 * \@param record A change which needs to be applied
 * \@param previousIndex The `IterableChangeRecord#previousIndex` of the `record` refers to the
 *        original `Iterable` location, where as `previousIndex` refers to the transient location
 *        of the item, after applying the operations up to this point.
 * \@param currentIndex The `IterableChangeRecord#currentIndex` of the `record` refers to the
 *        original `Iterable` location, where as `currentIndex` refers to the transient location
 *        of the item, after applying the operations up to this point.
 * @type {?}
 */
IterableChanges.prototype.forEachOperation;
/**
 * Iterate over changes in the order of original `Iterable` showing where the original items
 * have moved.
 * @type {?}
 */
IterableChanges.prototype.forEachPreviousItem;
/**
 * Iterate over all added items.
 * @type {?}
 */
IterableChanges.prototype.forEachAddedItem;
/**
 * Iterate over all moved items.
 * @type {?}
 */
IterableChanges.prototype.forEachMovedItem;
/**
 * Iterate over all removed items.
 * @type {?}
 */
IterableChanges.prototype.forEachRemovedItem;
/**
 * Iterate over all items which had their identity (as computed by the `TrackByFunction`)
 * changed.
 * @type {?}
 */
IterableChanges.prototype.forEachIdentityChange;
/**
 * Record representing the item change information.
 *
 * \@publicApi
 * @record
 * @template V
 */
export function IterableChangeRecord() { }
/**
 * Current index of the item in `Iterable` or null if removed.
 * @type {?}
 */
IterableChangeRecord.prototype.currentIndex;
/**
 * Previous index of the item in `Iterable` or null if added.
 * @type {?}
 */
IterableChangeRecord.prototype.previousIndex;
/**
 * The item.
 * @type {?}
 */
IterableChangeRecord.prototype.item;
/**
 * Track by identity as computed by the `TrackByFunction`.
 * @type {?}
 */
IterableChangeRecord.prototype.trackById;
/**
 * @deprecated v4.0.0 - Use IterableChangeRecord instead.
 * \@publicApi
 * @record
 * @template V
 */
export function CollectionChangeRecord() { }
/**
 * An optional function passed into {\@link NgForOf} that defines how to track
 * items in an iterable (e.g. fby index or id)
 *
 * \@publicApi
 * @record
 * @template T
 */
export function TrackByFunction() { }
/**
 * Provides a factory for {\@link IterableDiffer}.
 *
 * \@publicApi
 * @record
 */
export function IterableDifferFactory() { }
/** @type {?} */
IterableDifferFactory.prototype.supports;
/** @type {?} */
IterableDifferFactory.prototype.create;
/**
 * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
 *
 * \@publicApi
 */
var IterableDiffers = /** @class */ (function () {
    function IterableDiffers(factories) {
        this.factories = factories;
    }
    /**
     * @param {?} factories
     * @param {?=} parent
     * @return {?}
     */
    IterableDiffers.create = /**
     * @param {?} factories
     * @param {?=} parent
     * @return {?}
     */
    function (factories, parent) {
        if (parent != null) {
            /** @type {?} */
            var copied = parent.factories.slice();
            factories = factories.concat(copied);
        }
        return new IterableDiffers(factories);
    };
    /**
     * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {@link IterableDiffers} instance with the provided factories and return a new
     * {@link IterableDiffers} instance.
     *
     * @usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {@link IterableDiffer} available.
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     */
    /**
     * Takes an array of {\@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {\@link IterableDiffers} instance with the provided factories and return a new
     * {\@link IterableDiffers} instance.
     *
     * \@usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {\@link IterableDiffer} available.
     *
     * ```
     * \@Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     * @param {?} factories
     * @return {?}
     */
    IterableDiffers.extend = /**
     * Takes an array of {\@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {\@link IterableDiffers} instance with the provided factories and return a new
     * {\@link IterableDiffers} instance.
     *
     * \@usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {\@link IterableDiffer} available.
     *
     * ```
     * \@Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     * @param {?} factories
     * @return {?}
     */
    function (factories) {
        return {
            provide: IterableDiffers,
            useFactory: function (parent) {
                if (!parent) {
                    // Typically would occur when calling IterableDiffers.extend inside of dependencies passed
                    // to
                    // bootstrap(), which would override default pipes instead of extending them.
                    throw new Error('Cannot extend IterableDiffers without a parent injector');
                }
                return IterableDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[IterableDiffers, new SkipSelf(), new Optional()]]
        };
    };
    /**
     * @param {?} iterable
     * @return {?}
     */
    IterableDiffers.prototype.find = /**
     * @param {?} iterable
     * @return {?}
     */
    function (iterable) {
        /** @type {?} */
        var factory = this.factories.find(function (f) { return f.supports(iterable); });
        if (factory != null) {
            return factory;
        }
        else {
            throw new Error("Cannot find a differ supporting object '" + iterable + "' of type '" + getTypeNameForDebugging(iterable) + "'");
        }
    };
    /** @nocollapse */
    /** @nocollapse */ IterableDiffers.ngInjectableDef = defineInjectable({
        providedIn: 'root',
        factory: function () { return new IterableDiffers([new DefaultIterableDifferFactory()]); }
    });
    return IterableDiffers;
}());
export { IterableDiffers };
if (false) {
    /**
     * @nocollapse
     * @type {?}
     */
    IterableDiffers.ngInjectableDef;
    /**
     * @deprecated v4.0.0 - Should be private
     * @type {?}
     */
    IterableDiffers.prototype.factories;
}
/**
 * @param {?} type
 * @return {?}
 */
export function getTypeNameForDebugging(type) {
    return type['name'] || typeof type;
}
//# sourceMappingURL=iterable_differs.js.map