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
var ChangeDetectionStrategy = {
    /**
       * Use the `CheckOnce` strategy, meaning that automatic change detection is deactivated
       * until reactivated by setting the strategy to `Default` (`CheckAlways`).
       * Change detection can still be explictly invoked.
       */
    OnPush: 0,
    /**
       * Use the default `CheckAlways` strategy, in which change detection is automatic until
       * explicitly deactivated.
       */
    Default: 1,
};
export { ChangeDetectionStrategy };
ChangeDetectionStrategy[ChangeDetectionStrategy.OnPush] = 'OnPush';
ChangeDetectionStrategy[ChangeDetectionStrategy.Default] = 'Default';
/** @enum {number} */
var ChangeDetectorStatus = {
    /**
       * A state in which, after calling `detectChanges()`, the change detector
       * state becomes `Checked`, and must be explicitly invoked or reactivated.
       */
    CheckOnce: 0,
    /**
       * A state in which change detection is skipped until the change detector mode
       * becomes `CheckOnce`.
       */
    Checked: 1,
    /**
       * A state in which change detection continues automatically until explictly
       * deactivated.
       */
    CheckAlways: 2,
    /**
       * A state in which a change detector sub tree is not a part of the main tree and
       * should be skipped.
       */
    Detached: 3,
    /**
       * Indicates that the change detector encountered an error checking a binding
       * or calling a directive lifecycle method and is now in an inconsistent state. Change
       * detectors in this state do not detect changes.
       */
    Errored: 4,
    /**
       * Indicates that the change detector has been destroyed.
       */
    Destroyed: 5,
};
export { ChangeDetectorStatus };
ChangeDetectorStatus[ChangeDetectorStatus.CheckOnce] = 'CheckOnce';
ChangeDetectorStatus[ChangeDetectorStatus.Checked] = 'Checked';
ChangeDetectorStatus[ChangeDetectorStatus.CheckAlways] = 'CheckAlways';
ChangeDetectorStatus[ChangeDetectorStatus.Detached] = 'Detached';
ChangeDetectorStatus[ChangeDetectorStatus.Errored] = 'Errored';
ChangeDetectorStatus[ChangeDetectorStatus.Destroyed] = 'Destroyed';
/**
 * Reports whether a given strategy is currently the default for change detection.
 * @see `ChangeDetectorStatus`
 * @see `ChangeDetectorRef`
 * @param {?} changeDetectionStrategy The strategy to check.
 * @return {?} True if the given strategy is the current default, false otherwise.
 */
export function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
    return changeDetectionStrategy == null ||
        changeDetectionStrategy === ChangeDetectionStrategy.Default;
}
//# sourceMappingURL=constants.js.map