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
import { Optional, SkipSelf, defineInjectable } from '../../di';
import { DefaultKeyValueDifferFactory } from './default_keyvalue_differ';
/**
 * A differ that tracks changes made to an object over time.
 *
 * \@publicApi
 * @record
 * @template K, V
 */
export function KeyValueDiffer() { }
/**
 * Compute a difference between the previous state and the new `object` state.
 *
 * \@param object containing the new value.
 * \@return an object describing the difference. The return value is only valid until the next
 * `diff()` invocation.
 * @type {?}
 */
KeyValueDiffer.prototype.diff;
/**
 * Compute a difference between the previous state and the new `object` state.
 *
 * \@param object containing the new value.
 * \@return an object describing the difference. The return value is only valid until the next
 * `diff()` invocation.
 * @type {?}
 */
KeyValueDiffer.prototype.diff;
/**
 * An object describing the changes in the `Map` or `{[k:string]: string}` since last time
 * `KeyValueDiffer#diff()` was invoked.
 *
 * \@publicApi
 * @record
 * @template K, V
 */
export function KeyValueChanges() { }
/**
 * Iterate over all changes. `KeyValueChangeRecord` will contain information about changes
 * to each item.
 * @type {?}
 */
KeyValueChanges.prototype.forEachItem;
/**
 * Iterate over changes in the order of original Map showing where the original items
 * have moved.
 * @type {?}
 */
KeyValueChanges.prototype.forEachPreviousItem;
/**
 * Iterate over all keys for which values have changed.
 * @type {?}
 */
KeyValueChanges.prototype.forEachChangedItem;
/**
 * Iterate over all added items.
 * @type {?}
 */
KeyValueChanges.prototype.forEachAddedItem;
/**
 * Iterate over all removed items.
 * @type {?}
 */
KeyValueChanges.prototype.forEachRemovedItem;
/**
 * Record representing the item change information.
 *
 * \@publicApi
 * @record
 * @template K, V
 */
export function KeyValueChangeRecord() { }
/**
 * Current key in the Map.
 * @type {?}
 */
KeyValueChangeRecord.prototype.key;
/**
 * Current value for the key or `null` if removed.
 * @type {?}
 */
KeyValueChangeRecord.prototype.currentValue;
/**
 * Previous value for the key or `null` if added.
 * @type {?}
 */
KeyValueChangeRecord.prototype.previousValue;
/**
 * Provides a factory for {\@link KeyValueDiffer}.
 *
 * \@publicApi
 * @record
 */
export function KeyValueDifferFactory() { }
/**
 * Test to see if the differ knows how to diff this kind of object.
 * @type {?}
 */
KeyValueDifferFactory.prototype.supports;
/**
 * Create a `KeyValueDiffer`.
 * @type {?}
 */
KeyValueDifferFactory.prototype.create;
/**
 * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
 *
 * \@publicApi
 */
var KeyValueDiffers = /** @class */ (function () {
    function KeyValueDiffers(factories) {
        this.factories = factories;
    }
    /**
     * @template S
     * @param {?} factories
     * @param {?=} parent
     * @return {?}
     */
    KeyValueDiffers.create = /**
     * @template S
     * @param {?} factories
     * @param {?=} parent
     * @return {?}
     */
    function (factories, parent) {
        if (parent) {
            /** @type {?} */
            var copied = parent.factories.slice();
            factories = factories.concat(copied);
        }
        return new KeyValueDiffers(factories);
    };
    /**
     * Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
     * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
     * {@link KeyValueDiffers} instance.
     *
     * @usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {@link KeyValueDiffer} available.
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
     *   ]
     * })
     * ```
     */
    /**
     * Takes an array of {\@link KeyValueDifferFactory} and returns a provider used to extend the
     * inherited {\@link KeyValueDiffers} instance with the provided factories and return a new
     * {\@link KeyValueDiffers} instance.
     *
     * \@usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {\@link KeyValueDiffer} available.
     *
     * ```
     * \@Component({
     *   viewProviders: [
     *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
     *   ]
     * })
     * ```
     * @template S
     * @param {?} factories
     * @return {?}
     */
    KeyValueDiffers.extend = /**
     * Takes an array of {\@link KeyValueDifferFactory} and returns a provider used to extend the
     * inherited {\@link KeyValueDiffers} instance with the provided factories and return a new
     * {\@link KeyValueDiffers} instance.
     *
     * \@usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {\@link KeyValueDiffer} available.
     *
     * ```
     * \@Component({
     *   viewProviders: [
     *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
     *   ]
     * })
     * ```
     * @template S
     * @param {?} factories
     * @return {?}
     */
    function (factories) {
        return {
            provide: KeyValueDiffers,
            useFactory: function (parent) {
                if (!parent) {
                    // Typically would occur when calling KeyValueDiffers.extend inside of dependencies passed
                    // to bootstrap(), which would override default pipes instead of extending them.
                    throw new Error('Cannot extend KeyValueDiffers without a parent injector');
                }
                return KeyValueDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[KeyValueDiffers, new SkipSelf(), new Optional()]]
        };
    };
    /**
     * @param {?} kv
     * @return {?}
     */
    KeyValueDiffers.prototype.find = /**
     * @param {?} kv
     * @return {?}
     */
    function (kv) {
        /** @type {?} */
        var factory = this.factories.find(function (f) { return f.supports(kv); });
        if (factory) {
            return factory;
        }
        throw new Error("Cannot find a differ supporting object '" + kv + "'");
    };
    /** @nocollapse */
    /** @nocollapse */ KeyValueDiffers.ngInjectableDef = defineInjectable({
        providedIn: 'root',
        factory: function () { return new KeyValueDiffers([new DefaultKeyValueDifferFactory()]); }
    });
    return KeyValueDiffers;
}());
export { KeyValueDiffers };
if (false) {
    /**
     * @nocollapse
     * @type {?}
     */
    KeyValueDiffers.ngInjectableDef;
    /**
     * @deprecated v4.0.0 - Should be private.
     * @type {?}
     */
    KeyValueDiffers.prototype.factories;
}
//# sourceMappingURL=keyvalue_differs.js.map