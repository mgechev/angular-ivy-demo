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
export var TVIEW = 0;
/** @type {?} */
export var FLAGS = 1;
/** @type {?} */
export var PARENT = 2;
/** @type {?} */
export var NEXT = 3;
/** @type {?} */
export var QUERIES = 4;
/** @type {?} */
export var HOST = 5;
/** @type {?} */
export var HOST_NODE = 6;
/** @type {?} */
export var BINDING_INDEX = 7;
/** @type {?} */
export var CLEANUP = 8;
/** @type {?} */
export var CONTEXT = 9;
/** @type {?} */
export var INJECTOR = 10;
/** @type {?} */
export var RENDERER_FACTORY = 11;
/** @type {?} */
export var RENDERER = 12;
/** @type {?} */
export var SANITIZER = 13;
/** @type {?} */
export var TAIL = 14;
/** @type {?} */
export var CONTAINER_INDEX = 15;
/** @type {?} */
export var CONTENT_QUERIES = 16;
/** @type {?} */
export var DECLARATION_VIEW = 17;
/** *
 * Size of LView's header. Necessary to adjust for it when setting slots.
  @type {?} */
export var HEADER_OFFSET = 18;
/**
 * @record
 */
export function OpaqueViewState() { }
/** @type {?} */
OpaqueViewState.prototype.__brand__;
/**
 * `LView` stores all of the information needed to process the instructions as
 * they are invoked from the template. Each embedded view and component view has its
 * own `LView`. When processing a particular view, we set the `viewData` to that
 * `LView`. When that view is done processing, the `viewData` is set back to
 * whatever the original `viewData` was before (the parent `LView`).
 *
 * Keeping separate state for each view facilities view insertion / deletion, so we
 * don't have to edit the data array based on which views are present.
 * @record
 */
export function LView() { }
/** @enum {number} */
var LViewFlags = {
    /**
       * Whether or not the view is in creationMode.
       *
       * This must be stored in the view rather than using `data` as a marker so that
       * we can properly support embedded views. Otherwise, when exiting a child view
       * back into the parent view, `data` will be defined and `creationMode` will be
       * improperly reported as false.
       */
    CreationMode: 1,
    /** Whether this view has default change detection strategy (checks always) or onPush */
    CheckAlways: 2,
    /** Whether or not this view is currently dirty (needing check) */
    Dirty: 4,
    /** Whether or not this view is currently attached to change detection tree. */
    Attached: 8,
    /**
       *  Whether or not the init hooks have run.
       *
       * If on, the init hooks haven't yet been run and should be executed by the first component that
       * runs OR the first cR() instruction that runs (so inits are run for the top level view before
       * any embedded views).
       */
    RunInit: 16,
    /** Whether or not this view is destroyed. */
    Destroyed: 32,
    /** Whether or not this view is the root view */
    IsRoot: 64,
};
export { LViewFlags };
/**
 * The static data for an LView (shared between all templates of a
 * given type).
 *
 * Stored on the template function as ngPrivateData.
 * @record
 */
export function TView() { }
/**
 * ID for inline views to determine whether a view is the same as the previous view
 * in a certain position. If it's not, we know the new view needs to be inserted
 * and the one that exists needs to be removed (e.g. if/else statements)
 *
 * If this is -1, then this is a component view or a dynamically created view.
 * @type {?}
 */
TView.prototype.id;
/**
 * This is a blueprint used to generate LView instances for this TView. Copying this
 * blueprint is faster than creating a new LView from scratch.
 * @type {?}
 */
TView.prototype.blueprint;
/**
 * The template function used to refresh the view of dynamically created views
 * and components. Will be null for inline views.
 * @type {?}
 */
TView.prototype.template;
/**
 * A function containing query-related instructions.
 * @type {?}
 */
TView.prototype.viewQuery;
/**
 * Pointer to the `TNode` that represents the root of the view.
 *
 * If this is a `TNode` for an `LViewNode`, this is an embedded view of a container.
 * We need this pointer to be able to efficiently find this node when inserting the view
 * into an anchor.
 *
 * If this is a `TElementNode`, this is the view of a root component. It has exactly one
 * root TNode.
 *
 * If this is null, this is the view of a component that is not at root. We do not store
 * the host TNodes for child component views because they can potentially have several
 * different host TNodes, depending on where the component is being used. These host
 * TNodes cannot be shared (due to different indices, etc).
 * @type {?}
 */
TView.prototype.node;
/**
 * Whether or not this template has been processed.
 * @type {?}
 */
TView.prototype.firstTemplatePass;
/**
 * Static data equivalent of LView.data[]. Contains TNodes, PipeDefInternal or TI18n.
 * @type {?}
 */
TView.prototype.data;
/**
 * The binding start index is the index at which the data array
 * starts to store bindings only. Saving this value ensures that we
 * will begin reading bindings at the correct point in the array when
 * we are in update mode.
 * @type {?}
 */
TView.prototype.bindingStartIndex;
/**
 * The index where the "expando" section of `LView` begins. The expando
 * section contains injectors, directive instances, and host binding values.
 * Unlike the "consts" and "vars" sections of `LView`, the length of this
 * section cannot be calculated at compile-time because directives are matched
 * at runtime to preserve locality.
 *
 * We store this start index so we know where to start checking host bindings
 * in `setHostBindings`.
 * @type {?}
 */
TView.prototype.expandoStartIndex;
/**
 * Index of the host node of the first LView or LContainer beneath this LView in
 * the hierarchy.
 *
 * Necessary to store this so views can traverse through their nested views
 * to remove listeners and call onDestroy callbacks.
 *
 * For embedded views, we store the index of an LContainer's host rather than the first
 * LView to avoid managing splicing when views are added/removed.
 * @type {?}
 */
TView.prototype.childIndex;
/**
 * A reference to the first child node located in the view.
 * @type {?}
 */
TView.prototype.firstChild;
/**
 * Set of instructions used to process host bindings efficiently.
 *
 * See VIEW_DATA.md for more information.
 * @type {?}
 */
TView.prototype.expandoInstructions;
/**
 * Full registry of directives and components that may be found in this view.
 *
 * It's necessary to keep a copy of the full def list on the TView so it's possible
 * to render template functions without a host component.
 * @type {?}
 */
TView.prototype.directiveRegistry;
/**
 * Full registry of pipes that may be found in this view.
 *
 * The property is either an array of `PipeDefs`s or a function which returns the array of
 * `PipeDefs`s. The function is necessary to be able to support forward declarations.
 *
 * It's necessary to keep a copy of the full def list on the TView so it's possible
 * to render template functions without a host component.
 * @type {?}
 */
TView.prototype.pipeRegistry;
/**
 * Array of ngOnInit and ngDoCheck hooks that should be executed for this view in
 * creation mode.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.initHooks;
/**
 * Array of ngDoCheck hooks that should be executed for this view in update mode.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.checkHooks;
/**
 * Array of ngAfterContentInit and ngAfterContentChecked hooks that should be executed
 * for this view in creation mode.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.contentHooks;
/**
 * Array of ngAfterContentChecked hooks that should be executed for this view in update
 * mode.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.contentCheckHooks;
/**
 * Array of ngAfterViewInit and ngAfterViewChecked hooks that should be executed for
 * this view in creation mode.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.viewHooks;
/**
 * Array of ngAfterViewChecked hooks that should be executed for this view in
 * update mode.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.viewCheckHooks;
/**
 * Array of ngOnDestroy hooks that should be executed when this view is destroyed.
 *
 * Even indices: Directive index
 * Odd indices: Hook function
 * @type {?}
 */
TView.prototype.destroyHooks;
/**
 * Array of pipe ngOnDestroy hooks that should be executed when this view is destroyed.
 *
 * Even indices: Index of pipe in data
 * Odd indices: Hook function
 *
 * These must be stored separately from directive destroy hooks because their contexts
 * are stored in data.
 * @type {?}
 */
TView.prototype.pipeDestroyHooks;
/**
 * When a view is destroyed, listeners need to be released and outputs need to be
 * unsubscribed. This cleanup array stores both listener data (in chunks of 4)
 * and output data (in chunks of 2) for a particular view. Combining the arrays
 * saves on memory (70 bytes per array) and on a few bytes of code size (for two
 * separate for loops).
 *
 * If it's a native DOM listener being stored:
 * 1st index is: event name to remove
 * 2nd index is: index of native element in LView.data[]
 * 3rd index is: index of wrapped listener function in LView.cleanupInstances[]
 * 4th index is: useCapture boolean
 *
 * If it's a renderer2 style listener or ViewRef destroy hook being stored:
 * 1st index is: index of the cleanup function in LView.cleanupInstances[]
 * 2nd index is: null
 *
 * If it's an output subscription or query list destroy hook:
 * 1st index is: output unsubscribe function / query list destroy function
 * 2nd index is: index of function context in LView.cleanupInstances[]
 * @type {?}
 */
TView.prototype.cleanup;
/**
 * A list of element indices for child components that will need to be
 * refreshed when the current view has finished its check. These indices have
 * already been adjusted for the HEADER_OFFSET.
 *
 * @type {?}
 */
TView.prototype.components;
/**
 * A list of indices for child directives that have content queries.
 *
 * Even indices: Directive indices
 * Odd indices: Starting index of content queries (stored in CONTENT_QUERIES) for this directive
 * @type {?}
 */
TView.prototype.contentQueries;
/** @enum {number} */
var RootContextFlags = {
    Empty: 0, DetectChanges: 1, FlushPlayers: 2,
};
export { RootContextFlags };
/**
 * RootContext contains information which is shared for all components which
 * were bootstrapped with {\@link renderComponent}.
 * @record
 */
export function RootContext() { }
/**
 * A function used for scheduling change detection in the future. Usually
 * this is `requestAnimationFrame`.
 * @type {?}
 */
RootContext.prototype.scheduler;
/**
 * A promise which is resolved when all components are considered clean (not dirty).
 *
 * This promise is overwritten every time a first call to {\@link markDirty} is invoked.
 * @type {?}
 */
RootContext.prototype.clean;
/**
 * RootComponents - The components that were instantiated by the call to
 * {\@link renderComponent}.
 * @type {?}
 */
RootContext.prototype.components;
/**
 * The player flushing handler to kick off all animations
 * @type {?}
 */
RootContext.prototype.playerHandler;
/**
 * What render-related operations to run once a scheduler has been set
 * @type {?}
 */
RootContext.prototype.flags;
/** @typedef {?} */
var HookData;
export { HookData };
/** @typedef {?} */
var TData;
export { TData };
/** @type {?} */
export var unusedValueExportToPlacateAjd = 1;
//# sourceMappingURL=view.js.map