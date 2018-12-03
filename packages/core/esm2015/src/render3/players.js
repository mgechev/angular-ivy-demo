/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import './ng_dev_mode';
import { getContext } from './context_discovery';
import { getRootContext } from './discovery_utils';
import { scheduleTick } from './instructions';
import { HEADER_OFFSET } from './interfaces/view';
import { addPlayerInternal, getOrCreatePlayerContext, getPlayerContext, getPlayersInternal, getStylingContext, throwInvalidRefError } from './styling/util';
/**
 * Adds a player to an element, directive or component instance that will later be
 * animated once change detection has passed.
 *
 * When a player is added to a reference it will stay active until `player.destroy()`
 * is called. Once called then the player will be removed from the active players
 * present on the associated ref instance.
 *
 * To get a list of all the active players on an element see [getPlayers].
 *
 * @param {?} ref The element, directive or component that the player will be placed on.
 * @param {?} player The player that will be triggered to play once change detection has run.
 * @return {?}
 */
export function addPlayer(ref, player) {
    /** @type {?} */
    const context = getContext(ref);
    if (!context) {
        ngDevMode && throwInvalidRefError();
        return;
    }
    /** @type {?} */
    const element = /** @type {?} */ (context.native);
    /** @type {?} */
    const lView = context.lView;
    /** @type {?} */
    const playerContext = /** @type {?} */ ((getOrCreatePlayerContext(element, context)));
    /** @type {?} */
    const rootContext = getRootContext(lView);
    addPlayerInternal(playerContext, rootContext, element, player, 0, ref);
    scheduleTick(rootContext, 2 /* FlushPlayers */);
}
/**
 * Returns a list of all the active players present on the provided ref instance (which can
 * be an instance of a directive, component or element).
 *
 * This function will only return players that have been added to the ref instance using
 * `addPlayer` or any players that are active through any template styling bindings
 * (`[style]`, `[style.prop]`, `[class]` and `[class.name]`).
 *
 * \@publicApi
 * @param {?} ref
 * @return {?}
 */
export function getPlayers(ref) {
    /** @type {?} */
    const context = getContext(ref);
    if (!context) {
        ngDevMode && throwInvalidRefError();
        return [];
    }
    /** @type {?} */
    const stylingContext = getStylingContext(context.nodeIndex - HEADER_OFFSET, context.lView);
    /** @type {?} */
    const playerContext = stylingContext ? getPlayerContext(stylingContext) : null;
    return playerContext ? getPlayersInternal(playerContext) : [];
}
//# sourceMappingURL=players.js.map