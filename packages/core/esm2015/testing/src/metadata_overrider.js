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
import { ɵstringify as stringify } from '@angular/core';
/** @typedef {?} */
var StringMap;
/** @type {?} */
let _nextReferenceId = 0;
export class MetadataOverrider {
    constructor() {
        this._references = new Map();
    }
    /**
     * Creates a new instance for the given metadata class
     * based on an old instance and overrides.
     * @template C, T
     * @param {?} metadataClass
     * @param {?} oldMetadata
     * @param {?} override
     * @return {?}
     */
    overrideMetadata(metadataClass, oldMetadata, override) {
        /** @type {?} */
        const props = {};
        if (oldMetadata) {
            _valueProps(oldMetadata).forEach((prop) => props[prop] = (/** @type {?} */ (oldMetadata))[prop]);
        }
        if (override.set) {
            if (override.remove || override.add) {
                throw new Error(`Cannot set and add/remove ${stringify(metadataClass)} at the same time!`);
            }
            setMetadata(props, override.set);
        }
        if (override.remove) {
            removeMetadata(props, override.remove, this._references);
        }
        if (override.add) {
            addMetadata(props, override.add);
        }
        return new metadataClass(/** @type {?} */ (props));
    }
}
if (false) {
    /** @type {?} */
    MetadataOverrider.prototype._references;
}
/**
 * @param {?} metadata
 * @param {?} remove
 * @param {?} references
 * @return {?}
 */
function removeMetadata(metadata, remove, references) {
    /** @type {?} */
    const removeObjects = new Set();
    for (const prop in remove) {
        /** @type {?} */
        const removeValue = remove[prop];
        if (removeValue instanceof Array) {
            removeValue.forEach((value) => { removeObjects.add(_propHashKey(prop, value, references)); });
        }
        else {
            removeObjects.add(_propHashKey(prop, removeValue, references));
        }
    }
    for (const prop in metadata) {
        /** @type {?} */
        const propValue = metadata[prop];
        if (propValue instanceof Array) {
            metadata[prop] = propValue.filter((value) => !removeObjects.has(_propHashKey(prop, value, references)));
        }
        else {
            if (removeObjects.has(_propHashKey(prop, propValue, references))) {
                metadata[prop] = undefined;
            }
        }
    }
}
/**
 * @param {?} metadata
 * @param {?} add
 * @return {?}
 */
function addMetadata(metadata, add) {
    for (const prop in add) {
        /** @type {?} */
        const addValue = add[prop];
        /** @type {?} */
        const propValue = metadata[prop];
        if (propValue != null && propValue instanceof Array) {
            metadata[prop] = propValue.concat(addValue);
        }
        else {
            metadata[prop] = addValue;
        }
    }
}
/**
 * @param {?} metadata
 * @param {?} set
 * @return {?}
 */
function setMetadata(metadata, set) {
    for (const prop in set) {
        metadata[prop] = set[prop];
    }
}
/**
 * @param {?} propName
 * @param {?} propValue
 * @param {?} references
 * @return {?}
 */
function _propHashKey(propName, propValue, references) {
    /** @type {?} */
    const replacer = (key, value) => {
        if (typeof value === 'function') {
            value = _serializeReference(value, references);
        }
        return value;
    };
    return `${propName}:${JSON.stringify(propValue, replacer)}`;
}
/**
 * @param {?} ref
 * @param {?} references
 * @return {?}
 */
function _serializeReference(ref, references) {
    /** @type {?} */
    let id = references.get(ref);
    if (!id) {
        id = `${stringify(ref)}${_nextReferenceId++}`;
        references.set(ref, id);
    }
    return id;
}
/**
 * @param {?} obj
 * @return {?}
 */
function _valueProps(obj) {
    /** @type {?} */
    const props = [];
    // regular public props
    Object.keys(obj).forEach((prop) => {
        if (!prop.startsWith('_')) {
            props.push(prop);
        }
    });
    /** @type {?} */
    let proto = obj;
    while (proto = Object.getPrototypeOf(proto)) {
        Object.keys(proto).forEach((protoProp) => {
            /** @type {?} */
            const desc = Object.getOwnPropertyDescriptor(proto, protoProp);
            if (!protoProp.startsWith('_') && desc && 'get' in desc) {
                props.push(protoProp);
            }
        });
    }
    return props;
}
//# sourceMappingURL=metadata_overrider.js.map