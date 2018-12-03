/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Called when directives inject each other (creating a circular dependency)
 * @param {?} token
 * @return {?}
 */
export function throwCyclicDependencyError(token) {
    throw new Error(`Cannot instantiate cyclic dependency! ${token}`);
}
/**
 * Called when there are multiple component selectors that match a given node
 * @param {?} tNode
 * @return {?}
 */
export function throwMultipleComponentError(tNode) {
    throw new Error(`Multiple components match node with tagname ${tNode.tagName}`);
}
/**
 * Throws an ExpressionChangedAfterChecked error if checkNoChanges mode is on.
 * @param {?} creationMode
 * @param {?} oldValue
 * @param {?} currValue
 * @return {?}
 */
export function throwErrorIfNoChangesMode(creationMode, oldValue, currValue) {
    /** @type {?} */
    let msg = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${oldValue}'. Current value: '${currValue}'.`;
    if (creationMode) {
        msg +=
            ` It seems like the view has been created after its parent and its children have been dirty checked.` +
                ` Has it been created in a change detection hook ?`;
    }
    // TODO: include debug context
    throw new Error(msg);
}
//# sourceMappingURL=errors.js.map