/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class CorePlayerHandler {
    constructor() {
        this._players = [];
    }
    /**
     * @return {?}
     */
    flushPlayers() {
        for (let i = 0; i < this._players.length; i++) {
            /** @type {?} */
            const player = this._players[i];
            if (!player.parent && player.state === 0 /* Pending */) {
                player.play();
            }
        }
        this._players.length = 0;
    }
    /**
     * @param {?} player
     * @return {?}
     */
    queuePlayer(player) { this._players.push(player); }
}
if (false) {
    /** @type {?} */
    CorePlayerHandler.prototype._players;
}
//# sourceMappingURL=core_player_handler.js.map