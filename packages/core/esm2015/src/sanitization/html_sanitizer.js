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
import { isDevMode } from '../is_dev_mode';
import { InertBodyHelper } from './inert_body';
import { _sanitizeUrl, sanitizeSrcset } from './url_sanitizer';
/**
 * @param {?} tags
 * @return {?}
 */
function tagSet(tags) {
    /** @type {?} */
    const res = {};
    for (const t of tags.split(','))
        res[t] = true;
    return res;
}
/**
 * @param {...?} sets
 * @return {?}
 */
function merge(...sets) {
    /** @type {?} */
    const res = {};
    for (const s of sets) {
        for (const v in s) {
            if (s.hasOwnProperty(v))
                res[v] = true;
        }
    }
    return res;
}
/** @type {?} */
const VOID_ELEMENTS = tagSet('area,br,col,hr,img,wbr');
/** @type {?} */
const OPTIONAL_END_TAG_BLOCK_ELEMENTS = tagSet('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr');
/** @type {?} */
const OPTIONAL_END_TAG_INLINE_ELEMENTS = tagSet('rp,rt');
/** @type {?} */
const OPTIONAL_END_TAG_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, OPTIONAL_END_TAG_BLOCK_ELEMENTS);
/** @type {?} */
const BLOCK_ELEMENTS = merge(OPTIONAL_END_TAG_BLOCK_ELEMENTS, tagSet('address,article,' +
    'aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,' +
    'h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'));
/** @type {?} */
const INLINE_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, tagSet('a,abbr,acronym,audio,b,' +
    'bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,' +
    'samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'));
/** @type {?} */
export const VALID_ELEMENTS = merge(VOID_ELEMENTS, BLOCK_ELEMENTS, INLINE_ELEMENTS, OPTIONAL_END_TAG_ELEMENTS);
/** @type {?} */
export const URI_ATTRS = tagSet('background,cite,href,itemtype,longdesc,poster,src,xlink:href');
/** @type {?} */
export const SRCSET_ATTRS = tagSet('srcset');
/** @type {?} */
const HTML_ATTRS = tagSet('abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,' +
    'compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,' +
    'ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,' +
    'scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,' +
    'valign,value,vspace,width');
/** @type {?} */
export const VALID_ATTRS = merge(URI_ATTRS, SRCSET_ATTRS, HTML_ATTRS);
/**
 * SanitizingHtmlSerializer serializes a DOM fragment, stripping out any unsafe elements and unsafe
 * attributes.
 */
class SanitizingHtmlSerializer {
    constructor() {
        this.sanitizedSomething = false;
        this.buf = [];
    }
    /**
     * @param {?} el
     * @return {?}
     */
    sanitizeChildren(el) {
        /** @type {?} */
        let current = /** @type {?} */ ((el.firstChild));
        /** @type {?} */
        let elementValid = true;
        while (current) {
            if (current.nodeType === Node.ELEMENT_NODE) {
                elementValid = this.startElement(/** @type {?} */ (current));
            }
            else if (current.nodeType === Node.TEXT_NODE) {
                this.chars(/** @type {?} */ ((current.nodeValue)));
            }
            else {
                // Strip non-element, non-text nodes.
                this.sanitizedSomething = true;
            }
            if (elementValid && current.firstChild) {
                current = /** @type {?} */ ((current.firstChild));
                continue;
            }
            while (current) {
                // Leaving the element. Walk up and to the right, closing tags as we go.
                if (current.nodeType === Node.ELEMENT_NODE) {
                    this.endElement(/** @type {?} */ (current));
                }
                /** @type {?} */
                let next = this.checkClobberedElement(current, /** @type {?} */ ((current.nextSibling)));
                if (next) {
                    current = next;
                    break;
                }
                current = this.checkClobberedElement(current, /** @type {?} */ ((current.parentNode)));
            }
        }
        return this.buf.join('');
    }
    /**
     * Outputs only valid Elements.
     *
     * Invalid elements are skipped.
     *
     * @param {?} element element to sanitize
     * Returns true if the element is valid.
     * @return {?}
     */
    startElement(element) {
        /** @type {?} */
        const tagName = element.nodeName.toLowerCase();
        if (!VALID_ELEMENTS.hasOwnProperty(tagName)) {
            this.sanitizedSomething = true;
            return false;
        }
        this.buf.push('<');
        this.buf.push(tagName);
        /** @type {?} */
        const elAttrs = element.attributes;
        for (let i = 0; i < elAttrs.length; i++) {
            /** @type {?} */
            const elAttr = elAttrs.item(i);
            /** @type {?} */
            const attrName = /** @type {?} */ ((elAttr)).name;
            /** @type {?} */
            const lower = attrName.toLowerCase();
            if (!VALID_ATTRS.hasOwnProperty(lower)) {
                this.sanitizedSomething = true;
                continue;
            }
            /** @type {?} */
            let value = /** @type {?} */ ((elAttr)).value;
            // TODO(martinprobst): Special case image URIs for data:image/...
            if (URI_ATTRS[lower])
                value = _sanitizeUrl(value);
            if (SRCSET_ATTRS[lower])
                value = sanitizeSrcset(value);
            this.buf.push(' ', attrName, '="', encodeEntities(value), '"');
        }
        this.buf.push('>');
        return true;
    }
    /**
     * @param {?} current
     * @return {?}
     */
    endElement(current) {
        /** @type {?} */
        const tagName = current.nodeName.toLowerCase();
        if (VALID_ELEMENTS.hasOwnProperty(tagName) && !VOID_ELEMENTS.hasOwnProperty(tagName)) {
            this.buf.push('</');
            this.buf.push(tagName);
            this.buf.push('>');
        }
    }
    /**
     * @param {?} chars
     * @return {?}
     */
    chars(chars) { this.buf.push(encodeEntities(chars)); }
    /**
     * @param {?} node
     * @param {?} nextNode
     * @return {?}
     */
    checkClobberedElement(node, nextNode) {
        if (nextNode &&
            (node.compareDocumentPosition(nextNode) &
                Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY) {
            throw new Error(`Failed to sanitize html because the element is clobbered: ${((/** @type {?} */ (node))).outerHTML}`);
        }
        return nextNode;
    }
}
if (false) {
    /** @type {?} */
    SanitizingHtmlSerializer.prototype.sanitizedSomething;
    /** @type {?} */
    SanitizingHtmlSerializer.prototype.buf;
}
/** @type {?} */
const SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
/** @type {?} */
const NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;
/**
 * Escapes all potentially dangerous characters, so that the
 * resulting string can be safely inserted into attribute or
 * element text.
 * @param {?} value
 * @return {?}
 */
function encodeEntities(value) {
    return value.replace(/&/g, '&amp;')
        .replace(SURROGATE_PAIR_REGEXP, function (match) {
        /** @type {?} */
        const hi = match.charCodeAt(0);
        /** @type {?} */
        const low = match.charCodeAt(1);
        return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
    })
        .replace(NON_ALPHANUMERIC_REGEXP, function (match) { return '&#' + match.charCodeAt(0) + ';'; })
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
/** @type {?} */
let inertBodyHelper;
/**
 * Sanitizes the given unsafe, untrusted HTML fragment, and returns HTML text that is safe to add to
 * the DOM in a browser environment.
 * @param {?} defaultDoc
 * @param {?} unsafeHtmlInput
 * @return {?}
 */
export function _sanitizeHtml(defaultDoc, unsafeHtmlInput) {
    /** @type {?} */
    let inertBodyElement = null;
    try {
        inertBodyHelper = inertBodyHelper || new InertBodyHelper(defaultDoc);
        /** @type {?} */
        let unsafeHtml = unsafeHtmlInput ? String(unsafeHtmlInput) : '';
        inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml);
        /** @type {?} */
        let mXSSAttempts = 5;
        /** @type {?} */
        let parsedHtml = unsafeHtml;
        do {
            if (mXSSAttempts === 0) {
                throw new Error('Failed to sanitize html because the input is unstable');
            }
            mXSSAttempts--;
            unsafeHtml = parsedHtml;
            parsedHtml = /** @type {?} */ ((inertBodyElement)).innerHTML;
            inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml);
        } while (unsafeHtml !== parsedHtml);
        /** @type {?} */
        const sanitizer = new SanitizingHtmlSerializer();
        /** @type {?} */
        const safeHtml = sanitizer.sanitizeChildren(/** @type {?} */ (getTemplateContent(/** @type {?} */ ((inertBodyElement)))) || inertBodyElement);
        if (isDevMode() && sanitizer.sanitizedSomething) {
            console.warn('WARNING: sanitizing HTML stripped some content (see http://g.co/ng/security#xss).');
        }
        return safeHtml;
    }
    finally {
        // In case anything goes wrong, clear out inertElement to reset the entire DOM structure.
        if (inertBodyElement) {
            /** @type {?} */
            const parent = getTemplateContent(inertBodyElement) || inertBodyElement;
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }
}
/**
 * @param {?} el
 * @return {?}
 */
export function getTemplateContent(el) {
    return 'content' in (/** @type {?} */ (el /** Microsoft/TypeScript#21517 */) /** Microsoft/TypeScript#21517 */) && isTemplateElement(el) ?
        el.content :
        null;
}
/**
 * @param {?} el
 * @return {?}
 */
function isTemplateElement(el) {
    return el.nodeType === Node.ELEMENT_NODE && el.nodeName === 'TEMPLATE';
}
//# sourceMappingURL=html_sanitizer.js.map