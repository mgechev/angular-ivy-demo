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
/** @typedef {?} */
var ComponentTemplate;
export { ComponentTemplate };
/** @typedef {?} */
var ComponentQuery;
export { ComponentQuery };
/** @enum {number} */
var RenderFlags = {
    /* Whether to run the creation block (e.g. create elements and directives) */
    Create: 1,
    /* Whether to run the update block (e.g. refresh bindings) */
    Update: 2,
};
export { RenderFlags };
/**
 * A subclass of `Type` which has a static `ngComponentDef`:`ComponentDef` field making it
 * consumable for rendering.
 * @record
 * @template T
 */
export function ComponentType() { }
/** @type {?} */
ComponentType.prototype.ngComponentDef;
/**
 * A subclass of `Type` which has a static `ngDirectiveDef`:`DirectiveDef` field making it
 * consumable for rendering.
 * @record
 * @template T
 */
export function DirectiveType() { }
/** @type {?} */
DirectiveType.prototype.ngDirectiveDef;
/** @enum {number} */
var DirectiveDefFlags = {
    ContentQuery: 2,
};
export { DirectiveDefFlags };
/**
 * A subclass of `Type` which has a static `ngPipeDef`:`PipeDef` field making it
 * consumable for rendering.
 * @record
 * @template T
 */
export function PipeType() { }
/** @type {?} */
PipeType.prototype.ngPipeDef;
/** @typedef {?} */
var DirectiveDefWithMeta;
export { DirectiveDefWithMeta };
/**
 * Runtime information for classes that are inherited by components or directives
 * that aren't defined as components or directives.
 *
 * This is an internal data structure used by the render to determine what inputs
 * and outputs should be inherited.
 *
 * See: {\@link defineBase}
 * @record
 * @template T
 */
export function BaseDef() { }
/**
 * A dictionary mapping the inputs' minified property names to their public API names, which
 * are their aliases if any, or their original unminified property names
 * (as in `\@Input('alias') propertyName: any;`).
 * @type {?}
 */
BaseDef.prototype.inputs;
/**
 * @deprecated This is only here because `NgOnChanges` incorrectly uses declared name instead of
 * public or minified name.
 * @type {?}
 */
BaseDef.prototype.declaredInputs;
/**
 * A dictionary mapping the outputs' minified property names to their public API names, which
 * are their aliases if any, or their original unminified property names
 * (as in `\@Output('alias') propertyName: any;`).
 * @type {?}
 */
BaseDef.prototype.outputs;
/**
 * Runtime link information for Directives.
 *
 * This is internal data structure used by the render to link
 * directives into templates.
 *
 * NOTE: Always use `defineDirective` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 *
 * @param Selector type metadata specifying the selector of the directive or component
 *
 * See: {\@link defineDirective}
 * @record
 * @template T
 */
export function DirectiveDef() { }
/**
 * Token representing the directive. Used by DI.
 * @type {?}
 */
DirectiveDef.prototype.type;
/**
 * Function that resolves providers and publishes them into the DI system.
 * @type {?}
 */
DirectiveDef.prototype.providersResolver;
/**
 * The selectors that will be used to match nodes to this directive.
 * @type {?}
 */
DirectiveDef.prototype.selectors;
/**
 * Name under which the directive is exported (for use with local references in template)
 * @type {?}
 */
DirectiveDef.prototype.exportAs;
/**
 * Factory function used to create a new directive instance.
 * @type {?}
 */
DirectiveDef.prototype.factory;
/**
 * Function to create instances of content queries associated with a given directive.
 * @type {?}
 */
DirectiveDef.prototype.contentQueries;
/**
 * Refreshes content queries associated with directives in a given view
 * @type {?}
 */
DirectiveDef.prototype.contentQueriesRefresh;
/**
 * Refreshes host bindings on the associated directive.
 * @type {?}
 */
DirectiveDef.prototype.hostBindings;
/**
 * Static attributes to set on host element.
 *
 * Even indices: attribute name
 * Odd indices: attribute value
 * @type {?}
 */
DirectiveDef.prototype.attributes;
/** @type {?} */
DirectiveDef.prototype.onInit;
/** @type {?} */
DirectiveDef.prototype.doCheck;
/** @type {?} */
DirectiveDef.prototype.afterContentInit;
/** @type {?} */
DirectiveDef.prototype.afterContentChecked;
/** @type {?} */
DirectiveDef.prototype.afterViewInit;
/** @type {?} */
DirectiveDef.prototype.afterViewChecked;
/** @type {?} */
DirectiveDef.prototype.onDestroy;
/**
 * The features applied to this directive
 * @type {?}
 */
DirectiveDef.prototype.features;
/** @typedef {?} */
var ComponentDefWithMeta;
export { ComponentDefWithMeta };
/**
 * Runtime link information for Components.
 *
 * This is internal data structure used by the render to link
 * components into templates.
 *
 * NOTE: Always use `defineComponent` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 *
 * See: {\@link defineComponent}
 * @record
 * @template T
 */
export function ComponentDef() { }
/**
 * Runtime unique component ID.
 * @type {?}
 */
ComponentDef.prototype.id;
/**
 * The View template of the component.
 * @type {?}
 */
ComponentDef.prototype.template;
/**
 * A set of styles that the component needs to be present for component to render correctly.
 * @type {?}
 */
ComponentDef.prototype.styles;
/**
 * The number of nodes, local refs, and pipes in this component template.
 *
 * Used to calculate the length of the component's LView array, so we
 * can pre-fill the array and set the binding start index.
 * @type {?}
 */
ComponentDef.prototype.consts;
/**
 * The number of bindings in this component template (including pure fn bindings).
 *
 * Used to calculate the length of the component's LView array, so we
 * can pre-fill the array and set the host binding start index.
 * @type {?}
 */
ComponentDef.prototype.vars;
/**
 * Query-related instructions for a component.
 * @type {?}
 */
ComponentDef.prototype.viewQuery;
/**
 * The view encapsulation type, which determines how styles are applied to
 * DOM elements. One of
 * - `Emulated` (default): Emulate native scoping of styles.
 * - `Native`: Use the native encapsulation mechanism of the renderer.
 * - `ShadowDom`: Use modern [ShadowDOM](https://w3c.github.io/webcomponents/spec/shadow/) and
 *   create a ShadowRoot for component's host element.
 * - `None`: Do not provide any template or style encapsulation.
 * @type {?}
 */
ComponentDef.prototype.encapsulation;
/**
 * Defines arbitrary developer-defined data to be stored on a renderer instance.
 * This is useful for renderers that delegate to other renderers.
 * @type {?}
 */
ComponentDef.prototype.data;
/**
 * Whether or not this component's ChangeDetectionStrategy is OnPush
 * @type {?}
 */
ComponentDef.prototype.onPush;
/**
 * Registry of directives and components that may be found in this view.
 *
 * The property is either an array of `DirectiveDef`s or a function which returns the array of
 * `DirectiveDef`s. The function is necessary to be able to support forward declarations.
 * @type {?}
 */
ComponentDef.prototype.directiveDefs;
/**
 * Registry of pipes that may be found in this view.
 *
 * The property is either an array of `PipeDefs`s or a function which returns the array of
 * `PipeDefs`s. The function is necessary to be able to support forward declarations.
 * @type {?}
 */
ComponentDef.prototype.pipeDefs;
/**
 * Used to store the result of `noSideEffects` function so that it is not removed by closure
 * compiler. The property should never be read.
 * @type {?|undefined}
 */
ComponentDef.prototype._;
/**
 * Runtime link information for Pipes.
 *
 * This is internal data structure used by the renderer to link
 * pipes into templates.
 *
 * NOTE: Always use `definePipe` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 *
 * See: {\@link definePipe}
 * @record
 * @template T
 */
export function PipeDef() { }
/**
 * Pipe name.
 *
 * Used to resolve pipe in templates.
 * @type {?}
 */
PipeDef.prototype.name;
/**
 * Factory function used to create a new pipe instance.
 * @type {?}
 */
PipeDef.prototype.factory;
/**
 * Whether or not the pipe is pure.
 *
 * Pure pipes result only depends on the pipe input and not on internal
 * state of the pipe.
 * @type {?}
 */
PipeDef.prototype.pure;
/** @type {?} */
PipeDef.prototype.onDestroy;
/** @typedef {?} */
var PipeDefWithMeta;
export { PipeDefWithMeta };
/**
 * @record
 */
export function DirectiveDefFeature() { }
/* TODO: handle strange member:
<T>(directiveDef: DirectiveDef<T>): void;
*/
/** @type {?|undefined} */
DirectiveDefFeature.prototype.ngInherit;
/**
 * @record
 */
export function ComponentDefFeature() { }
/* TODO: handle strange member:
<T>(componentDef: ComponentDef<T>): void;
*/
/** @type {?|undefined} */
ComponentDefFeature.prototype.ngInherit;
/** @typedef {?} */
var DirectiveDefListOrFactory;
export { DirectiveDefListOrFactory };
/** @typedef {?} */
var DirectiveDefList;
export { DirectiveDefList };
/** @typedef {?} */
var DirectiveTypesOrFactory;
export { DirectiveTypesOrFactory };
/** @typedef {?} */
var DirectiveTypeList;
export { DirectiveTypeList };
/** @typedef {?} */
var HostBindingsFunction;
export { HostBindingsFunction };
/** @typedef {?} */
var PipeDefListOrFactory;
export { PipeDefListOrFactory };
/** @typedef {?} */
var PipeDefList;
export { PipeDefList };
/** @typedef {?} */
var PipeTypesOrFactory;
export { PipeTypesOrFactory };
/** @typedef {?} */
var PipeTypeList;
export { PipeTypeList };
/** @type {?} */
export const unusedValueExportToPlacateAjd = 1;
/** @enum {number} */
var InitialStylingFlags = {
    VALUES_MODE: 1,
};
export { InitialStylingFlags };
//# sourceMappingURL=definition.js.map