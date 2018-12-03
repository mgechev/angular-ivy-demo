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
/** @type {?} */
const BRAND = '__SANITIZER_TRUSTED_BRAND__';
/** @enum {string} */
var BypassType = {
    Url: 'Url',
    Html: 'Html',
    ResourceUrl: 'ResourceUrl',
    Script: 'Script',
    Style: 'Style',
};
export { BypassType };
/**
 * A branded trusted string used with sanitization.
 *
 * See: {\@link TrustedHtmlString}, {\@link TrustedResourceUrlString}, {\@link TrustedScriptString},
 * {\@link TrustedStyleString}, {\@link TrustedUrlString}
 * @record
 */
export function TrustedString() { }
/**
 * A branded trusted string used with sanitization of `html` strings.
 *
 * See: {\@link bypassSanitizationTrustHtml} and {\@link htmlSanitizer}.
 * @record
 */
export function TrustedHtmlString() { }
/**
 * A branded trusted string used with sanitization of `style` strings.
 *
 * See: {\@link bypassSanitizationTrustStyle} and {\@link styleSanitizer}.
 * @record
 */
export function TrustedStyleString() { }
/**
 * A branded trusted string used with sanitization of `url` strings.
 *
 * See: {\@link bypassSanitizationTrustScript} and {\@link scriptSanitizer}.
 * @record
 */
export function TrustedScriptString() { }
/**
 * A branded trusted string used with sanitization of `url` strings.
 *
 * See: {\@link bypassSanitizationTrustUrl} and {\@link urlSanitizer}.
 * @record
 */
export function TrustedUrlString() { }
/**
 * A branded trusted string used with sanitization of `resourceUrl` strings.
 *
 * See: {\@link bypassSanitizationTrustResourceUrl} and {\@link resourceUrlSanitizer}.
 * @record
 */
export function TrustedResourceUrlString() { }
/**
 * @param {?} value
 * @param {?} type
 * @return {?}
 */
export function allowSanitizationBypass(value, type) {
    return (value instanceof String && (/** @type {?} */ (value))[BRAND] === type);
}
/**
 * Mark `html` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {\@link htmlSanitizer} to be trusted implicitly.
 *
 * @param {?} trustedHtml `html` string which needs to be implicitly trusted.
 * @return {?} a `html` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustHtml(trustedHtml) {
    return bypassSanitizationTrustString(trustedHtml, "Html" /* Html */);
}
/**
 * Mark `style` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {\@link styleSanitizer} to be trusted implicitly.
 *
 * @param {?} trustedStyle `style` string which needs to be implicitly trusted.
 * @return {?} a `style` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustStyle(trustedStyle) {
    return bypassSanitizationTrustString(trustedStyle, "Style" /* Style */);
}
/**
 * Mark `script` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {\@link scriptSanitizer} to be trusted implicitly.
 *
 * @param {?} trustedScript `script` string which needs to be implicitly trusted.
 * @return {?} a `script` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustScript(trustedScript) {
    return bypassSanitizationTrustString(trustedScript, "Script" /* Script */);
}
/**
 * Mark `url` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {\@link urlSanitizer} to be trusted implicitly.
 *
 * @param {?} trustedUrl `url` string which needs to be implicitly trusted.
 * @return {?} a `url` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustUrl(trustedUrl) {
    return bypassSanitizationTrustString(trustedUrl, "Url" /* Url */);
}
/**
 * Mark `url` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {\@link resourceUrlSanitizer} to be trusted implicitly.
 *
 * @param {?} trustedResourceUrl `url` string which needs to be implicitly trusted.
 * @return {?} a `url` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustResourceUrl(trustedResourceUrl) {
    return bypassSanitizationTrustString(trustedResourceUrl, "ResourceUrl" /* ResourceUrl */);
}
/**
 * @param {?} trustedString
 * @param {?} mode
 * @return {?}
 */
function bypassSanitizationTrustString(trustedString, mode) {
    /** @type {?} */
    const trusted = /** @type {?} */ (new String(trustedString));
    trusted[BRAND] = mode;
    return trusted;
}
//# sourceMappingURL=bypass.js.map