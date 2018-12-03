/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CorePlayerHandler = /** @class */ (function () {
    function CorePlayerHandler() {
        this._players = [];
    }
    /**
     * @return {?}
     */
    CorePlayerHandler.prototype.flushPlayers = /**
     * @return {?}
     */
    function () {
        for (var i = 0; i < this._players.length; i++) {
            /** @type {?} */
            var player = this._players[i];
            if (!player.parent && player.state === 0 /* Pending */) {
                player.play();
            }
        }
        this._players.length = 0;
    };
    /**
     * @param {?} player
     * @return {?}
     */
    CorePlayerHandler.prototype.queuePlayer = /**
     * @param {?} player
     * @return {?}
     */
    function (player) { this._players.push(player); };
    return CorePlayerHandler;
}());
export { CorePlayerHandler };
if (false) {
    /** @type {?} */
    CorePlayerHandler.prototype._players;
}
//# sourceMappingURL=core_player_handler.js.map