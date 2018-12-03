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
 * Used to resolve resource URLs on `\@Component` when used with JIT compilation.
 *
 * Example:
 * ```
 * \@Component({
 *   selector: 'my-comp',
 *   templateUrl: 'my-comp.html', // This requires asynchronous resolution
 * })
 * class MyComponnent{
 * }
 *
 * // Calling `renderComponent` will fail because `MyComponent`'s `\@Compenent.templateUrl`
 * // needs to be resolved because `renderComponent` is synchronous process.
 * // renderComponent(MyComponent);
 *
 * // Calling `resolveComponentResources` will resolve `\@Compenent.templateUrl` into
 * // `\@Compenent.template`, which would allow `renderComponent` to proceed in synchronous manner.
 * // Use browser's `fetch` function as the default resource resolution strategy.
 * resolveComponentResources(fetch).then(() => {
 *   // After resolution all URLs have been converted into strings.
 *   renderComponent(MyComponent);
 * });
 *
 * ```
 *
 * NOTE: In AOT the resolution happens during compilation, and so there should be no need
 * to call this method outside JIT mode.
 *
 * @param {?} resourceResolver a function which is responsible to returning a `Promise` of the resolved
 * URL. Browser's `fetch` method is a good default implementation.
 * @return {?}
 */
export function resolveComponentResources(resourceResolver) {
    /** @type {?} */
    const urlFetches = [];
    /** @type {?} */
    const urlMap = new Map();
    /**
     * @param {?} url
     * @return {?}
     */
    function cachedResourceResolve(url) {
        /** @type {?} */
        let promise = urlMap.get(url);
        if (!promise) {
            /** @type {?} */
            const resp = resourceResolver(url);
            urlMap.set(url, promise = resp.then(unwrapResponse));
            urlFetches.push(promise);
        }
        return promise;
    }
    componentResourceResolutionQueue.forEach((component) => {
        if (component.templateUrl) {
            cachedResourceResolve(component.templateUrl).then((template) => {
                component.template = template;
                component.templateUrl = undefined;
            });
        }
        /** @type {?} */
        const styleUrls = component.styleUrls;
        /** @type {?} */
        const styles = component.styles || (component.styles = []);
        /** @type {?} */
        const styleOffset = component.styles.length;
        styleUrls && styleUrls.forEach((styleUrl, index) => {
            styles.push(''); // pre-allocate array.
            cachedResourceResolve(styleUrl).then((style) => {
                styles[styleOffset + index] = style;
                styleUrls.splice(styleUrls.indexOf(styleUrl), 1);
                if (styleUrls.length == 0) {
                    component.styleUrls = undefined;
                }
            });
        });
    });
    componentResourceResolutionQueue.clear();
    return Promise.all(urlFetches).then(() => null);
}
/** @type {?} */
const componentResourceResolutionQueue = new Set();
/**
 * @param {?} metadata
 * @return {?}
 */
export function maybeQueueResolutionOfComponentResources(metadata) {
    if (componentNeedsResolution(metadata)) {
        componentResourceResolutionQueue.add(metadata);
    }
}
/**
 * @param {?} component
 * @return {?}
 */
export function componentNeedsResolution(component) {
    return component.templateUrl || component.styleUrls && component.styleUrls.length;
}
/**
 * @return {?}
 */
export function clearResolutionOfComponentResourcesQueue() {
    componentResourceResolutionQueue.clear();
}
/**
 * @param {?} response
 * @return {?}
 */
function unwrapResponse(response) {
    return typeof response == 'string' ? response : response.text();
}
//# sourceMappingURL=resource_loading.js.map