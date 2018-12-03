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
import { HOST, NEXT, PARENT, QUERIES } from './view';
/** *
 * Below are constants for LContainer indices to help us look up LContainer members
 * without having to remember the specific indices.
 * Uglify will inline these when minifying so there shouldn't be a cost.
  @type {?} */
export var ACTIVE_INDEX = 0;
/** @type {?} */
export var VIEWS = 1;
/** @type {?} */
export var NATIVE = 6;
/** @type {?} */
export var RENDER_PARENT = 7;
/**
 * The state associated with a container.
 *
 * This is an array so that its structure is closer to LView. This helps
 * when traversing the view tree (which is a mix of containers and component
 * views), so we can jump to viewOrContainer[NEXT] in the same way regardless
 * of type.
 * @record
 */
export function LContainer() { }
/** @type {?} */
export var unusedValueExportToPlacateAjd = 1;
//# sourceMappingURL=container.js.map