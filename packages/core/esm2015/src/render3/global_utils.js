/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { global } from '../util';
import { assertDefined } from './assert';
import { getComponent, getDirectives, getHostElement, getInjector, getPlayers, getRootComponents, getViewComponent, markDirty } from './global_utils_api';
/** *
 * This value reflects the property on the window where the dev
 * tools are patched (window.ng).
 *
  @type {?} */
export const GLOBAL_PUBLISH_EXPANDO_KEY = 'ng';
/** @type {?} */
let _published = false;
/**
 * @return {?}
 */
export function publishDefaultGlobalUtils() {
    if (!_published) {
        _published = true;
        publishGlobalUtil('getComponent', getComponent);
        publishGlobalUtil('getViewComponent', getViewComponent);
        publishGlobalUtil('getHostElement', getHostElement);
        publishGlobalUtil('getInjector', getInjector);
        publishGlobalUtil('getRootComponents', getRootComponents);
        publishGlobalUtil('getDirectives', getDirectives);
        publishGlobalUtil('getPlayers', getPlayers);
        publishGlobalUtil('markDirty', markDirty);
    }
}
/**
 * Publishes the given function to `window.ngDevMode` so that it can be
 * used from the browser console when an application is not in production.
 * @param {?} name
 * @param {?} fn
 * @return {?}
 */
export function publishGlobalUtil(name, fn) {
    /** @type {?} */
    const w = /** @type {?} */ ((global));
    ngDevMode && assertDefined(fn, 'function not defined');
    if (w) {
        /** @type {?} */
        let container = w[GLOBAL_PUBLISH_EXPANDO_KEY];
        if (!container) {
            container = w[GLOBAL_PUBLISH_EXPANDO_KEY] = {};
        }
        container[name] = fn;
    }
}
//# sourceMappingURL=global_utils.js.map