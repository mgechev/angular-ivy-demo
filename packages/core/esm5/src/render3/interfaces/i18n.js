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
/** @enum {number} */
var I18nMutateOpCode = {
    SHIFT_REF: 3,
    SHIFT_PARENT: 17,
    MASK_OPCODE: 7,
    MASK_REF: 136,
    Select: 0,
    AppendChild: 1,
    InsertBefore: 2,
    Remove: 3,
    Attr: 4,
    ElementEnd: 5,
    RemoveNestedIcu: 6,
};
export { I18nMutateOpCode };
/** *
 * Marks that the next string is for element.
 *
 * See `I18nMutateOpCodes` documentation.
  @type {?} */
export var ELEMENT_MARKER = {
    marker: 'element'
};
/** *
 * Marks that the next string is for comment.
 *
 * See `I18nMutateOpCodes` documentation.
  @type {?} */
export var COMMENT_MARKER = {
    marker: 'comment'
};
/**
 * Array storing OpCode for dynamically creating `i18n` blocks.
 *
 * Example:
 * ```
 * <I18nCreateOpCode>[
 *   // For adding text nodes
 *   // ---------------------
 *   // Equivalent to:
 *   //   const node = lView[index++] = document.createTextNode('abc');
 *   //   lView[1].insertBefore(node, lView[2]);
 *   'abc', 1 << SHIFT_PARENT | 2 << SHIFT_REF | InsertBefore,
 *
 *   // Equivalent to:
 *   //   const node = lView[index++] = document.createTextNode('xyz');
 *   //   lView[1].appendChild(node);
 *   'xyz', 1 << SHIFT_PARENT | AppendChild,
 *
 *   // For adding element nodes
 *   // ---------------------
 *   // Equivalent to:
 *   //   const node = lView[index++] = document.createElement('div');
 *   //   lView[1].insertBefore(node, lView[2]);
 *   ELEMENT_MARKER, 'div', 1 << SHIFT_PARENT | 2 << SHIFT_REF | InsertBefore,
 *
 *   // Equivalent to:
 *   //   const node = lView[index++] = document.createElement('div');
 *   //   lView[1].appendChild(node);
 *   ELEMENT_MARKER, 'div', 1 << SHIFT_PARENT | AppendChild,
 *
 *   // For adding comment nodes
 *   // ---------------------
 *   // Equivalent to:
 *   //   const node = lView[index++] = document.createComment('');
 *   //   lView[1].insertBefore(node, lView[2]);
 *   COMMENT_MARKER, '', 1 << SHIFT_PARENT | 2 << SHIFT_REF | InsertBefore,
 *
 *   // Equivalent to:
 *   //   const node = lView[index++] = document.createComment('');
 *   //   lView[1].appendChild(node);
 *   COMMENT_MARKER, '', 1 << SHIFT_PARENT | AppendChild,
 *
 *   // For moving existing nodes to a different location
 *   // --------------------------------------------------
 *   // Equivalent to:
 *   //   const node = lView[1];
 *   //   lView[2].insertBefore(node, lView[3]);
 *   1 << SHIFT_REF | Select, 2 << SHIFT_PARENT | 3 << SHIFT_REF | InsertBefore,
 *
 *   // Equivalent to:
 *   //   const node = lView[1];
 *   //   lView[2].appendChild(node);
 *   1 << SHIFT_REF | Select, 2 << SHIFT_PARENT | AppendChild,
 *
 *   // For removing existing nodes
 *   // --------------------------------------------------
 *   //   const node = lView[1];
 *   //   removeChild(tView.data(1), node, lView);
 *   1 << SHIFT_REF | Remove,
 *
 *   // For writing attributes
 *   // --------------------------------------------------
 *   //   const node = lView[1];
 *   //   node.setAttribute('attr', 'value');
 *   1 << SHIFT_REF | Select, 'attr', 'value'
 *            // NOTE: Select followed by two string (vs select followed by OpCode)
 * ];
 * ```
 * NOTE:
 *   - `index` is initial location where the extra nodes should be stored in the EXPANDO section of
 * `LVIewData`.
 *
 * See: `applyI18nCreateOpCodes`;
 * @record
 */
export function I18nMutateOpCodes() { }
/** @enum {number} */
var I18nUpdateOpCode = {
    SHIFT_REF: 2,
    SHIFT_ICU: 17,
    MASK_OPCODE: 3,
    MASK_REF: 68,
    Text: 0,
    Attr: 1,
    IcuSwitch: 2,
    IcuUpdate: 3,
};
export { I18nUpdateOpCode };
/**
 * Stores DOM operations which need to be applied to update DOM render tree due to changes in
 * expressions.
 *
 * The basic idea is that `i18nExp` OpCodes capture expression changes and update a change
 * mask bit. (Bit 1 for expression 1, bit 2 for expression 2 etc..., bit 32 for expression 32 and
 * higher.) The OpCodes then compare its own change mask against the expression change mask to
 * determine if the OpCodes should execute.
 *
 * These OpCodes can be used by both the i18n block as well as ICU sub-block.
 *
 * ## Example
 *
 * Assume
 * ```
 *   if (rf & RenderFlags.Update) {
 *    i18nExp(bind(ctx.exp1)); // If changed set mask bit 1
 *    i18nExp(bind(ctx.exp2)); // If changed set mask bit 2
 *    i18nExp(bind(ctx.exp3)); // If changed set mask bit 3
 *    i18nExp(bind(ctx.exp4)); // If changed set mask bit 4
 *    i18nApply(0);            // Apply all changes by executing the OpCodes.
 *  }
 * ```
 * We can assume that each call to `i18nExp` sets an internal `changeMask` bit depending on the
 * index of `i18nExp`.
 *
 * OpCodes
 * ```
 * <I18nUpdateOpCodes>[
 *   // The following OpCodes represent: `<div i18n-title="pre{{exp1}}in{{exp2}}post">`
 *   // If `changeMask & 0b11`
 *   //        has changed then execute update OpCodes.
 *   //        has NOT changed then skip `7` values and start processing next OpCodes.
 *   0b11, 7,
 *   // Concatenate `newValue = 'pre'+lView[bindIndex-4]+'in'+lView[bindIndex-3]+'post';`.
 *   'pre', -4, 'in', -3, 'post',
 *   // Update attribute: `elementAttribute(1, 'title', sanitizerFn(newValue));`
 *   1 << SHIFT_REF | Attr, 'title', sanitizerFn,
 *
 *   // The following OpCodes represent: `<div i18n>Hello {{exp3}}!">`
 *   // If `changeMask & 0b100`
 *   //        has changed then execute update OpCodes.
 *   //        has NOT changed then skip `4` values and start processing next OpCodes.
 *   0b100, 4,
 *   // Concatenate `newValue = 'Hello ' + lView[bindIndex -2] + '!';`.
 *   'Hello ', -2, '!',
 *   // Update text: `lView[1].textContent = newValue;`
 *   1 << SHIFT_REF | Text,
 *
 *   // The following OpCodes represent: `<div i18n>{exp4, plural, ... }">`
 *   // If `changeMask & 0b1000`
 *   //        has changed then execute update OpCodes.
 *   //        has NOT changed then skip `4` values and start processing next OpCodes.
 *   0b1000, 4,
 *   // Concatenate `newValue = lView[bindIndex -1];`.
 *   -1,
 *   // Switch ICU: `icuSwitchCase(lView[1], 0, newValue);`
 *   0 << SHIFT_ICU | 1 << SHIFT_REF | IcuSwitch,
 *
 *   // Note `changeMask & -1` is always true, so the IcuUpdate will always execute.
 *   -1, 1,
 *   // Update ICU: `icuUpdateCase(lView[1], 0);`
 *   0 << SHIFT_ICU | 1 << SHIFT_REF | IcuUpdate,
 *
 * ];
 * ```
 *
 * @record
 */
export function I18nUpdateOpCodes() { }
/**
 * Store information for the i18n translation block.
 * @record
 */
export function TI18n() { }
/**
 * Number of slots to allocate in expando.
 *
 * This is the max number of DOM elements which will be created by this i18n + ICU blocks. When
 * the DOM elements are being created they are stored in the EXPANDO, so that update OpCodes can
 * write into them.
 * @type {?}
 */
TI18n.prototype.vars;
/**
 * Index in EXPANDO where the i18n stores its DOM nodes.
 *
 * When the bindings are processed by the `i18nEnd` instruction it is necessary to know where the
 * newly created DOM nodes will be inserted.
 * @type {?}
 */
TI18n.prototype.expandoStartIndex;
/**
 * A set of OpCodes which will create the Text Nodes and ICU anchors for the translation blocks.
 *
 * NOTE: The ICU anchors are filled in with ICU Update OpCode.
 * @type {?}
 */
TI18n.prototype.create;
/**
 * A set of OpCodes which will be executed on each change detection to determine if any changes to
 * DOM are required.
 * @type {?}
 */
TI18n.prototype.update;
/**
 * A list of ICUs in a translation block (or `null` if block has no ICUs).
 *
 * Example:
 * Given: `<div i18n>You have {count, plural, ...} and {state, switch, ...}</div>`
 * There would be 2 ICUs in this array.
 *   1. `{count, plural, ...}`
 *   2. `{state, switch, ...}`
 * @type {?}
 */
TI18n.prototype.icus;
/** @enum {number} */
var IcuType = {
    select: 0,
    plural: 1,
};
export { IcuType };
/**
 * @record
 */
export function TIcu() { }
/**
 * Defines the ICU type of `select` or `plural`
 * @type {?}
 */
TIcu.prototype.type;
/**
 * Number of slots to allocate in expando for each case.
 *
 * This is the max number of DOM elements which will be created by this i18n + ICU blocks. When
 * the DOM elements are being created they are stored in the EXPANDO, so that update OpCodes can
 * write into them.
 * @type {?}
 */
TIcu.prototype.vars;
/**
 * An optional array of child/sub ICUs.
 *
 * In case of nested ICUs such as:
 * ```
 * {�0�, plural,
 *   =0 {zero}
 *   other {�0� {�1�, select,
 *                     cat {cats}
 *                     dog {dogs}
 *                     other {animals}
 *                   }!
 *   }
 * }
 * ```
 * When the parent ICU is changing it must clean up child ICUs as well. For this reason it needs
 * to know which child ICUs to run clean up for as well.
 *
 * In the above example this would be:
 * ```
 * [
 *   [],   // `=0` has no sub ICUs
 *   [1],  // `other` has one subICU at `1`st index.
 * ]
 * ```
 *
 * The reason why it is Array of Arrays is because first array represents the case, and second
 * represents the child ICUs to clean up. There may be more than one child ICUs per case.
 * @type {?}
 */
TIcu.prototype.childIcus;
/**
 * Index in EXPANDO where the i18n stores its DOM nodes.
 *
 * When the bindings are processed by the `i18nEnd` instruction it is necessary to know where the
 * newly created DOM nodes will be inserted.
 * @type {?}
 */
TIcu.prototype.expandoStartIndex;
/**
 * A list of case values which the current ICU will try to match.
 *
 * The last value is `other`
 * @type {?}
 */
TIcu.prototype.cases;
/**
 * A set of OpCodes to apply in order to build up the DOM render tree for the ICU
 * @type {?}
 */
TIcu.prototype.create;
/**
 * A set of OpCodes to apply in order to destroy the DOM render tree for the ICU.
 * @type {?}
 */
TIcu.prototype.remove;
/**
 * A set of OpCodes to apply in order to update the DOM render tree for the ICU bindings.
 * @type {?}
 */
TIcu.prototype.update;
/** @type {?} */
export var unusedValueExportToPlacateAjd = 1;
//# sourceMappingURL=i18n.js.map