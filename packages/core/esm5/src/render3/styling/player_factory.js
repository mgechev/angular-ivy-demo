/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Combines the binding value and a factory for an animation player.
 *
 * Used to bind a player to an element template binding (currently only
 * `[style]`, `[style.prop]`, `[class]` and `[class.name]` bindings
 * supported). The provided `factoryFn` function will be run once all
 * the associated bindings have been evaluated on the element and is
 * designed to return a player which will then be placed on the element.
 *
 * @template T
 * @param {?} factoryFn The function that is used to create a player
 *   once all the rendering-related (styling values) have been
 *   processed for the element binding.
 * @param {?} value The raw value that will be exposed to the binding
 *   so that the binding can update its internal values when
 *   any changes are evaluated.
 * @return {?}
 */
export function bindPlayerFactory(factoryFn, value) {
    return /** @type {?} */ (new BoundPlayerFactory(factoryFn, value));
}
/**
 * @template T
 */
var /**
 * @template T
 */
BoundPlayerFactory = /** @class */ (function () {
    function BoundPlayerFactory(fn, value) {
        this.fn = fn;
        this.value = value;
    }
    return BoundPlayerFactory;
}());
/**
 * @template T
 */
export { BoundPlayerFactory };
if (false) {
    /** @type {?} */
    BoundPlayerFactory.prototype.__brand__;
    /** @type {?} */
    BoundPlayerFactory.prototype.fn;
    /** @type {?} */
    BoundPlayerFactory.prototype.value;
}
//# sourceMappingURL=player_factory.js.map