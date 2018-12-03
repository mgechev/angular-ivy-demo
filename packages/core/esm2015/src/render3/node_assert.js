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
import { assertDefined, assertEqual } from './assert';
/**
 * @param {?} tNode
 * @param {?} type
 * @return {?}
 */
export function assertNodeType(tNode, type) {
    assertDefined(tNode, 'should be called with a TNode');
    assertEqual(tNode.type, type, `should be a ${typeName(type)}`);
}
/**
 * @param {?} tNode
 * @param {...?} types
 * @return {?}
 */
export function assertNodeOfPossibleTypes(tNode, ...types) {
    assertDefined(tNode, 'should be called with a TNode');
    /** @type {?} */
    const found = types.some(type => tNode.type === type);
    assertEqual(found, true, `Should be one of ${types.map(typeName).join(', ')} but got ${typeName(tNode.type)}`);
}
/**
 * @param {?} type
 * @return {?}
 */
function typeName(type) {
    if (type == 1 /* Projection */)
        return 'Projection';
    if (type == 0 /* Container */)
        return 'Container';
    if (type == 2 /* View */)
        return 'View';
    if (type == 3 /* Element */)
        return 'Element';
    if (type == 4 /* ElementContainer */)
        return 'ElementContainer';
    return '<unknown>';
}
//# sourceMappingURL=node_assert.js.map