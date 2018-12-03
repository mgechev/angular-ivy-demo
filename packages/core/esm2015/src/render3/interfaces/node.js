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
var TNodeType = {
    Container: 0,
    Projection: 1,
    View: 2,
    Element: 3,
    ViewOrElement: 2,
    ElementContainer: 4,
    IcuContainer: 5,
};
export { TNodeType };
/** @enum {number} */
var TNodeFlags = {
    /** The number of directives on this node is encoded on the least significant bits */
    DirectiveCountMask: 4095,
    /** This bit is set if the node is a component */
    isComponent: 4096,
    /** This bit is set if the node has been projected */
    isProjected: 8192,
    /** This bit is set if the node has any content queries */
    hasContentQuery: 16384,
    /** This bit is set if the node has any directives that contain [class properties */
    hasClassInput: 32768,
    /** The index of the first directive on this node is encoded on the most significant bits  */
    DirectiveStartingIndexShift: 16,
};
export { TNodeFlags };
/** @enum {number} */
var TNodeProviderIndexes = {
    /** The index of the first provider on this node is encoded on the least significant bits */
    ProvidersStartIndexMask: 65535,
    /** The count of view providers from the component on this node is encoded on the 16 most
         significant bits */
    CptViewProvidersCountShift: 16,
    CptViewProvidersCountShifter: 65536,
};
export { TNodeProviderIndexes };
/** @enum {number} */
var AttributeMarker = {
    /**
       * Marker indicates that the following 3 values in the attributes array are:
       * namespaceUri, attributeName, attributeValue
       * in that order.
       */
    NamespaceURI: 0,
    /**
       * This marker indicates that the following attribute names were extracted from bindings (ex.:
       * [foo]="exp") and / or event handlers (ex. (bar)="doSth()").
       * Taking the above bindings and outputs as an example an attributes array could look as follows:
       * ['class', 'fade in', AttributeMarker.SelectOnly, 'foo', 'bar']
       */
    SelectOnly: 1,
};
export { AttributeMarker };
/** @typedef {?} */
var TAttributes;
export { TAttributes };
/**
 * Binding data (flyweight) for a particular node that is shared between all templates
 * of a specific type.
 *
 * If a property is:
 *    - PropertyAliases: that property's data was generated and this is it
 *    - Null: that property's data was already generated and nothing was found.
 *    - Undefined: that property's data has not yet been generated
 *
 * see: https://en.wikipedia.org/wiki/Flyweight_pattern for more on the Flyweight pattern
 * @record
 */
export function TNode() { }
/**
 * The type of the TNode. See TNodeType.
 * @type {?}
 */
TNode.prototype.type;
/**
 * Index of the TNode in TView.data and corresponding native element in LView.
 *
 * This is necessary to get from any TNode to its corresponding native element when
 * traversing the node tree.
 *
 * If index is -1, this is a dynamically created container node or embedded view node.
 * @type {?}
 */
TNode.prototype.index;
/**
 * The index of the closest injector in this node's LView.
 *
 * If the index === -1, there is no injector on this node or any ancestor node in this view.
 *
 * If the index !== -1, it is the index of this node's injector OR the index of a parent injector
 * in the same view. We pass the parent injector index down the node tree of a view so it's
 * possible to find the parent injector without walking a potentially deep node tree. Injector
 * indices are not set across view boundaries because there could be multiple component hosts.
 *
 * If tNode.injectorIndex === tNode.parent.injectorIndex, then the index belongs to a parent
 * injector.
 * @type {?}
 */
TNode.prototype.injectorIndex;
/**
 * This number stores two values using its bits:
 *
 * - the number of directives on that node (first 12 bits)
 * - the starting index of the node's directives in the directives array (last 20 bits).
 *
 * These two values are necessary so DI can effectively search the directives associated
 * with a node without searching the whole directives array.
 * @type {?}
 */
TNode.prototype.flags;
/**
 * This number stores two values using its bits:
 *
 * - the index of the first provider on that node (first 16 bits)
 * - the count of view providers from the component on this node (last 16 bits)
 * @type {?}
 */
TNode.prototype.providerIndexes;
/**
 * The tag name associated with this node.
 * @type {?}
 */
TNode.prototype.tagName;
/**
 * Attributes associated with an element. We need to store attributes to support various use-cases
 * (attribute injection, content projection with selectors, directives matching).
 * Attributes are stored statically because reading them from the DOM would be way too slow for
 * content projection and queries.
 *
 * Since attrs will always be calculated first, they will never need to be marked undefined by
 * other instructions.
 *
 * For regular attributes a name of an attribute and its value alternate in the array.
 * e.g. ['role', 'checkbox']
 * This array can contain flags that will indicate "special attributes" (attributes with
 * namespaces, attributes extracted from bindings and outputs).
 * @type {?}
 */
TNode.prototype.attrs;
/**
 * A set of local names under which a given element is exported in a template and
 * visible to queries. An entry in this array can be created for different reasons:
 * - an element itself is referenced, ex.: `<div #foo>`
 * - a component is referenced, ex.: `<my-cmpt #foo>`
 * - a directive is referenced, ex.: `<my-cmpt #foo="directiveExportAs">`.
 *
 * A given element might have different local names and those names can be associated
 * with a directive. We store local names at even indexes while odd indexes are reserved
 * for directive index in a view (or `-1` if there is no associated directive).
 *
 * Some examples:
 * - `<div #foo>` => `["foo", -1]`
 * - `<my-cmpt #foo>` => `["foo", myCmptIdx]`
 * - `<my-cmpt #foo #bar="directiveExportAs">` => `["foo", myCmptIdx, "bar", directiveIdx]`
 * - `<div #foo #bar="directiveExportAs">` => `["foo", -1, "bar", directiveIdx]`
 * @type {?}
 */
TNode.prototype.localNames;
/**
 * Information about input properties that need to be set once from attribute data.
 * @type {?}
 */
TNode.prototype.initialInputs;
/**
 * Input data for all directives on this node.
 *
 * - `undefined` means that the prop has not been initialized yet,
 * - `null` means that the prop has been initialized but no inputs have been found.
 * @type {?}
 */
TNode.prototype.inputs;
/**
 * Output data for all directives on this node.
 *
 * - `undefined` means that the prop has not been initialized yet,
 * - `null` means that the prop has been initialized but no outputs have been found.
 * @type {?}
 */
TNode.prototype.outputs;
/**
 * The TView or TViews attached to this node.
 *
 * If this TNode corresponds to an LContainer with inline views, the container will
 * need to store separate static data for each of its view blocks (TView[]). Otherwise,
 * nodes in inline views with the same index as nodes in their parent views will overwrite
 * each other, as they are in the same template.
 *
 * Each index in this array corresponds to the static data for a certain
 * view. So if you had V(0) and V(1) in a container, you might have:
 *
 * [
 *   [{tagName: 'div', attrs: ...}, null],     // V(0) TView
 *   [{tagName: 'button', attrs ...}, null]    // V(1) TView
 *
 * If this TNode corresponds to an LContainer with a template (e.g. structural
 * directive), the template's TView will be stored here.
 *
 * If this TNode corresponds to an element, tViews will be null .
 * @type {?}
 */
TNode.prototype.tViews;
/**
 * The next sibling node. Necessary so we can propagate through the root nodes of a view
 * to insert them or remove them from the DOM.
 * @type {?}
 */
TNode.prototype.next;
/**
 * First child of the current node.
 *
 * For component nodes, the child will always be a ContentChild (in same view).
 * For embedded view nodes, the child will be in their child view.
 * @type {?}
 */
TNode.prototype.child;
/**
 * Parent node (in the same view only).
 *
 * We need a reference to a node's parent so we can append the node to its parent's native
 * element at the appropriate time.
 *
 * If the parent would be in a different view (e.g. component host), this property will be null.
 * It's important that we don't try to cross component boundaries when retrieving the parent
 * because the parent will change (e.g. index, attrs) depending on where the component was
 * used (and thus shouldn't be stored on TNode). In these cases, we retrieve the parent through
 * LView.node instead (which will be instance-specific).
 *
 * If this is an inline view node (V), the parent will be its container.
 * @type {?}
 */
TNode.prototype.parent;
/**
 * If this node is part of an i18n block, it indicates whether this node is part of the DOM.
 * If this node is not part of an i18n block, this field is null.
 * @type {?}
 */
TNode.prototype.detached;
/** @type {?} */
TNode.prototype.stylingTemplate;
/**
 * List of projected TNodes for a given component host element OR index into the said nodes.
 *
 * For easier discussion assume this example:
 * `<parent>`'s view definition:
 * ```
 * <child id="c1">content1</child>
 * <child id="c2"><span>content2</span></child>
 * ```
 * `<child>`'s view definition:
 * ```
 * <ng-content id="cont1"></ng-content>
 * ```
 *
 * If `Array.isArray(projection)` then `TNode` is a host element:
 * - `projection` stores the content nodes which are to be projected.
 *    - The nodes represent categories defined by the selector: For example:
 *      `<ng-content/><ng-content select="abc"/>` would represent the heads for `<ng-content/>`
 *      and `<ng-content select="abc"/>` respectively.
 *    - The nodes we store in `projection` are heads only, we used `.next` to get their
 *      siblings.
 *    - The nodes `.next` is sorted/rewritten as part of the projection setup.
 *    - `projection` size is equal to the number of projections `<ng-content>`. The size of
 *      `c1` will be `1` because `<child>` has only one `<ng-content>`.
 * - we store `projection` with the host (`c1`, `c2`) rather than the `<ng-content>` (`cont1`)
 *   because the same component (`<child>`) can be used in multiple locations (`c1`, `c2`) and as
 *   a result have different set of nodes to project.
 * - without `projection` it would be difficult to efficiently traverse nodes to be projected.
 *
 * If `typeof projection == 'number'` then `TNode` is a `<ng-content>` element:
 * - `projection` is an index of the host's `projection`Nodes.
 *   - This would return the first head node to project:
 *     `getHost(currentTNode).projection[currentTNode.projection]`.
 * - When projecting nodes the parent node retrieved may be a `<ng-content>` node, in which case
 *   the process is recursive in nature (not implementation).
 * @type {?}
 */
TNode.prototype.projection;
/**
 * Static data for an element
 * @record
 */
export function TElementNode() { }
/**
 * Index in the data[] array
 * @type {?}
 */
TElementNode.prototype.index;
/** @type {?} */
TElementNode.prototype.child;
/**
 * Element nodes will have parents unless they are the first node of a component or
 * embedded view (which means their parent is in a different view and must be
 * retrieved using viewData[HOST_NODE]).
 * @type {?}
 */
TElementNode.prototype.parent;
/** @type {?} */
TElementNode.prototype.tViews;
/**
 * If this is a component TNode with projection, this will be an array of projected
 * TNodes (see TNode.projection for more info). If it's a regular element node or a
 * component without projection, it will be null.
 * @type {?}
 */
TElementNode.prototype.projection;
/**
 * Static data for a text node
 * @record
 */
export function TTextNode() { }
/**
 * Index in the data[] array
 * @type {?}
 */
TTextNode.prototype.index;
/** @type {?} */
TTextNode.prototype.child;
/**
 * Text nodes will have parents unless they are the first node of a component or
 * embedded view (which means their parent is in a different view and must be
 * retrieved using LView.node).
 * @type {?}
 */
TTextNode.prototype.parent;
/** @type {?} */
TTextNode.prototype.tViews;
/** @type {?} */
TTextNode.prototype.projection;
/**
 * Static data for an LContainer
 * @record
 */
export function TContainerNode() { }
/**
 * Index in the data[] array.
 *
 * If it's -1, this is a dynamically created container node that isn't stored in
 * data[] (e.g. when you inject ViewContainerRef) .
 * @type {?}
 */
TContainerNode.prototype.index;
/** @type {?} */
TContainerNode.prototype.child;
/**
 * Container nodes will have parents unless:
 *
 * - They are the first node of a component or embedded view
 * - They are dynamically created
 * @type {?}
 */
TContainerNode.prototype.parent;
/** @type {?} */
TContainerNode.prototype.tViews;
/** @type {?} */
TContainerNode.prototype.projection;
/**
 * Static data for an <ng-container>
 * @record
 */
export function TElementContainerNode() { }
/**
 * Index in the LView[] array.
 * @type {?}
 */
TElementContainerNode.prototype.index;
/** @type {?} */
TElementContainerNode.prototype.child;
/** @type {?} */
TElementContainerNode.prototype.parent;
/** @type {?} */
TElementContainerNode.prototype.tViews;
/** @type {?} */
TElementContainerNode.prototype.projection;
/**
 * Static data for an ICU expression
 * @record
 */
export function TIcuContainerNode() { }
/**
 * Index in the LView[] array.
 * @type {?}
 */
TIcuContainerNode.prototype.index;
/** @type {?} */
TIcuContainerNode.prototype.child;
/** @type {?} */
TIcuContainerNode.prototype.parent;
/** @type {?} */
TIcuContainerNode.prototype.tViews;
/** @type {?} */
TIcuContainerNode.prototype.projection;
/**
 * Indicates the current active case for an ICU expression.
 * It is null when there is no active case.
 * @type {?}
 */
TIcuContainerNode.prototype.activeCaseIndex;
/**
 * Static data for a view
 * @record
 */
export function TViewNode() { }
/**
 * If -1, it's a dynamically created view. Otherwise, it is the view block ID.
 * @type {?}
 */
TViewNode.prototype.index;
/** @type {?} */
TViewNode.prototype.child;
/** @type {?} */
TViewNode.prototype.parent;
/** @type {?} */
TViewNode.prototype.tViews;
/** @type {?} */
TViewNode.prototype.projection;
/**
 * Static data for an LProjectionNode
 * @record
 */
export function TProjectionNode() { }
/**
 * Index in the data[] array
 * @type {?}
 */
TProjectionNode.prototype.child;
/**
 * Projection nodes will have parents unless they are the first node of a component
 * or embedded view (which means their parent is in a different view and must be
 * retrieved using LView.node).
 * @type {?}
 */
TProjectionNode.prototype.parent;
/** @type {?} */
TProjectionNode.prototype.tViews;
/**
 * Index of the projection node. (See TNode.projection for more info.)
 * @type {?}
 */
TProjectionNode.prototype.projection;
/** @typedef {?} */
var PropertyAliases;
export { PropertyAliases };
/** @typedef {?} */
var PropertyAliasValue;
export { PropertyAliasValue };
/** @typedef {?} */
var InitialInputData;
export { InitialInputData };
/** @typedef {?} */
var InitialInputs;
export { InitialInputs };
/** @type {?} */
export const unusedValueExportToPlacateAjd = 1;
/** @typedef {?} */
var TNodeWithLocalRefs;
export { TNodeWithLocalRefs };
/** @typedef {?} */
var LocalRefExtractor;
export { LocalRefExtractor };
//# sourceMappingURL=node.js.map