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
/**
 * A shared interface which contains an animation player
 * @record
 */
export function Player() { }
/** @type {?|undefined} */
Player.prototype.parent;
/** @type {?} */
Player.prototype.state;
/** @type {?} */
Player.prototype.play;
/** @type {?} */
Player.prototype.pause;
/** @type {?} */
Player.prototype.finish;
/** @type {?} */
Player.prototype.destroy;
/** @type {?} */
Player.prototype.addEventListener;
/** @enum {number} */
var BindingType = {
    Unset: 0,
    Class: 1,
    Style: 2,
};
export { BindingType };
/**
 * @record
 */
export function BindingStore() { }
/** @type {?} */
BindingStore.prototype.setValue;
/**
 * Defines the shape which produces the Player.
 *
 * Used to produce a player that will be placed on an element that contains
 * styling bindings that make use of the player. This function is designed
 * to be used with `PlayerFactory`.
 * @record
 */
export function PlayerFactoryBuildFn() { }
/**
 * Used as a reference to build a player from a styling template binding
 * (`[style]` and `[class]`).
 *
 * The `fn` function will be called once any styling-related changes are
 * evaluated on an element and is expected to return a player that will
 * be then run on the element.
 *
 * `[style]`, `[style.prop]`, `[class]` and `[class.name]` template bindings
 * all accept a `PlayerFactory` as input and this player factories.
 * @record
 */
export function PlayerFactory() { }
/** @type {?} */
PlayerFactory.prototype.__brand__;
/**
 * @record
 */
export function PlayerBuilder() { }
/** @type {?} */
PlayerBuilder.prototype.buildPlayer;
/** @enum {number} */
var PlayState = {
    Pending: 0, Running: 1, Paused: 2, Finished: 100, Destroyed: 200,
};
export { PlayState };
/**
 * The context that stores all the active players and queued player factories present on an element.
 * @record
 */
export function PlayerContext() { }
/**
 * Designed to be used as an injection service to capture all animation players.
 *
 * When present all animation players will be passed into the flush method below.
 * This feature is designed to service application-wide animation testing, live
 * debugging as well as custom animation choreographing tools.
 * @record
 */
export function PlayerHandler() { }
/**
 * Designed to kick off the player at the end of change detection
 * @type {?}
 */
PlayerHandler.prototype.flushPlayers;
/**
 * \@param player The player that has been scheduled to run within the application.
 * \@param context The context as to where the player was bound to
 * @type {?}
 */
PlayerHandler.prototype.queuePlayer;
/** @enum {number} */
var PlayerIndex = {
    // The position where the index that reveals where players start in the PlayerContext
    NonBuilderPlayersStart: 0,
    // The position where the player builder lives (which handles {key:value} map expression) for
    // classes
    ClassMapPlayerBuilderPosition: 1,
    // The position where the last player assigned to the class player builder is stored
    ClassMapPlayerPosition: 2,
    // The position where the player builder lives (which handles {key:value} map expression) for
    // styles
    StyleMapPlayerBuilderPosition: 3,
    // The position where the last player assigned to the style player builder is stored
    StyleMapPlayerPosition: 4,
    // The position where any player builders start in the PlayerContext
    PlayerBuildersStartPosition: 1,
    // The position where non map-based player builders start in the PlayerContext
    SinglePlayerBuildersStartPosition: 5,
    // For each player builder there is a player in the player context (therefore size = 2)
    PlayerAndPlayerBuildersTupleSize: 2,
    // The player exists next to the player builder in the list
    PlayerOffsetPosition: 1,
};
export { PlayerIndex };
//# sourceMappingURL=player.js.map