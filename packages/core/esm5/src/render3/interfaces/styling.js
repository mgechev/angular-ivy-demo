/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * The styling context acts as a styling manifest (shaped as an array) for determining which
 * styling properties have been assigned via the provided `updateStylingMap`, `updateStyleProp`
 * and `updateClassProp` functions. There are also two initialization functions
 * `allocStylingContext` and `createStylingContextTemplate` which are used to initialize
 * and/or clone the context.
 *
 * The context is an array where the first two cells are used for static data (initial styling)
 * and dirty flags / index offsets). The remaining set of cells is used for multi (map) and single
 * (prop) style values.
 *
 * each value from here onwards is mapped as so:
 * [i] = mutation/type flag for the style/class value
 * [i + 1] = prop string (or null incase it has been removed)
 * [i + 2] = value string (or null incase it has been removed)
 *
 * There are three types of styling types stored in this context:
 *   initial: any styles that are passed in once the context is created
 *            (these are stored in the first cell of the array and the first
 *             value of this array is always `null` even if no initial styling exists.
 *             the `null` value is there so that any new styles have a parent to point
 *             to. This way we can always assume that there is a parent.)
 *
 *   single: any styles that are updated using `updateStyleProp` or `updateClassProp` (fixed set)
 *
 *   multi: any styles that are updated using `updateStylingMap` (dynamic set)
 *
 * Note that context is only used to collect style information. Only when `renderStyling`
 * is called is when the styling payload will be rendered (or built as a key/value map).
 *
 * When the context is created, depending on what initial styling values are passed in, the
 * context itself will be pre-filled with slots based on the initial style properties. Say
 * for example we have a series of initial styles that look like so:
 *
 *   style="width:100px; height:200px;"
 *   class="foo"
 *
 * Then the initial state of the context (once initialized) will look like so:
 *
 * ```
 * context = [
 *   element,
 *   playerContext | null,
 *   styleSanitizer | null,
 *   [null, '100px', '200px', true],  // property names are not needed since they have already been
 * written to DOM.
 *
 *   configMasterVal,
 *   1, // this instructs how many `style` values there are so that class index values can be
 * offsetted
 *   { classOne: true, classTwo: false } | 'classOne classTwo' | null // last class value provided
 * into updateStylingMap
 *   { styleOne: '100px', styleTwo: 0 } | null // last style value provided into updateStylingMap
 *
 *   // 8
 *   'width',
 *   pointers(1, 15);  // Point to static `width`: `100px` and multi `width`.
 *   null,
 *
 *   // 11
 *   'height',
 *   pointers(2, 18); // Point to static `height`: `200px` and multi `height`.
 *   null,
 *
 *   // 14
 *   'foo',
 *   pointers(1, 21);  // Point to static `foo`: `true` and multi `foo`.
 *   null,
 *
 *   // 17
 *   'width',
 *   pointers(1, 6);  // Point to static `width`: `100px` and single `width`.
 *   null,
 *
 *   // 21
 *   'height',
 *   pointers(2, 9);  // Point to static `height`: `200px` and single `height`.
 *   null,
 *
 *   // 24
 *   'foo',
 *   pointers(3, 12);  // Point to static `foo`: `true` and single `foo`.
 *   null,
 * ]
 *
 * function pointers(staticIndex: number, dynamicIndex: number) {
 *   // combine the two indices into a single word.
 *   return (staticIndex << StylingFlags.BitCountSize) |
 *     (dynamicIndex << (StylingIndex.BitCountSize + StylingFlags.BitCountSize));
 * }
 * ```
 *
 * The values are duplicated so that space is set aside for both multi ([style] and [class])
 * and single ([style.prop] or [class.named]) values. The respective config values
 * (configValA, configValB, etc...) are a combination of the StylingFlags with two index
 * values: the `initialIndex` (which points to the index location of the style value in
 * the initial styles array in slot 0) and the `dynamicIndex` (which points to the
 * matching single/multi index position in the context array for the same prop).
 *
 * This means that every time `updateStyleProp` or `updateClassProp` are called then they
 * must be called using an index value (not a property string) which references the index
 * value of the initial style prop/class when the context was created. This also means that
 * `updateStyleProp` or `updateClassProp` cannot be called with a new property (only
 * `updateStylingMap` can include new CSS properties that will be added to the context).
 * @record
 */
export function StylingContext() { }
/**
 * The initial styles is populated whether or not there are any initial styles passed into
 * the context during allocation. The 0th value must be null so that index values of `0` within
 * the context flags can always point to a null value safely when nothing is set.
 *
 * All other entries in this array are of `string` value and correspond to the values that
 * were extracted from the `style=""` attribute in the HTML code for the provided template.
 * @record
 */
export function InitialStyles() { }
/** @enum {number} */
var StylingFlags = {
    // Implies no configurations
    None: 0,
    // Whether or not the entry or context itself is dirty
    Dirty: 1,
    // Whether or not this is a class-based assignment
    Class: 2,
    // Whether or not a sanitizer was applied to this property
    Sanitize: 4,
    // Whether or not any player builders within need to produce new players
    PlayerBuildersDirty: 8,
    // If NgClass is present (or some other class handler) then it will handle the map expressions and
    // initial classes
    OnlyProcessSingleClasses: 16,
    // The max amount of bits used to represent these configuration values
    BitCountSize: 5,
    // There are only five bits here
    BitMask: 31,
};
export { StylingFlags };
/** @enum {number} */
var StylingIndex = {
    // Position of where the initial styles are stored in the styling context
    PlayerContext: 0,
    // Position of where the style sanitizer is stored within the styling context
    StyleSanitizerPosition: 1,
    // Position of where the initial styles are stored in the styling context
    InitialStylesPosition: 2,
    // Index of location where the start of single properties are stored. (`updateStyleProp`)
    MasterFlagPosition: 3,
    // Index of location where the class index offset value is located
    ClassOffsetPosition: 4,
    // Position of where the initial styles are stored in the styling context
    // This index must align with HOST, see interfaces/view.ts
    ElementPosition: 5,
    // Position of where the last string-based CSS class value was stored (or a cached version of the
    // initial styles when a [class] directive is present)
    PreviousOrCachedMultiClassValue: 6,
    // Position of where the last string-based CSS class value was stored
    PreviousMultiStyleValue: 7,
    // Location of single (prop) value entries are stored within the context
    SingleStylesStartPosition: 8,
    // Multi and single entries are stored in `StylingContext` as: Flag; PropertyName;  PropertyValue
    FlagsOffset: 0,
    PropertyOffset: 1,
    ValueOffset: 2,
    PlayerBuilderIndexOffset: 3,
    // Size of each multi or single entry (flag + prop + value + playerBuilderIndex)
    Size: 4,
    // Each flag has a binary digit length of this value
    BitCountSize: 14,
    // (32 - 4) / 2 = ~14
    // The binary digit value as a mask
    BitMask: 16383,
};
export { StylingIndex };
//# sourceMappingURL=styling.js.map