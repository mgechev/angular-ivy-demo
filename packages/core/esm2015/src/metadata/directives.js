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
import { ChangeDetectionStrategy } from '../change_detection/constants';
import { NG_BASE_DEF } from '../render3/fields';
import { compileComponent as render3CompileComponent, compileDirective as render3CompileDirective } from '../render3/jit/directive';
import { compilePipe as render3CompilePipe } from '../render3/jit/pipe';
import { makeDecorator, makePropDecorator } from '../util/decorators';
import { fillProperties } from '../util/property';
/**
 * Type of the Directive decorator / constructor function.
 * \@publicApi
 * @record
 */
export function DirectiveDecorator() { }
/** *
 * Type of the Directive metadata.
 *
 * \@publicApi
  @type {?} */
export const Directive = makeDecorator('Directive', (dir = {}) => dir, undefined, undefined, (type, meta) => SWITCH_COMPILE_DIRECTIVE(type, meta));
/**
 * Component decorator interface
 *
 * \@publicApi
 * @record
 */
export function ComponentDecorator() { }
/** *
 * Component decorator and metadata.
 *
 * \@Annotation
 * \@publicApi
  @type {?} */
export const Component = makeDecorator('Component', (c = {}) => (Object.assign({ changeDetection: ChangeDetectionStrategy.Default }, c)), Directive, undefined, (type, meta) => SWITCH_COMPILE_COMPONENT(type, meta));
/**
 * Type of the Pipe decorator / constructor function.
 *
 * \@publicApi
 * @record
 */
export function PipeDecorator() { }
/** *
 * \@Annotation
 * \@publicApi
  @type {?} */
export const Pipe = makeDecorator('Pipe', (p) => (Object.assign({ pure: true }, p)), undefined, undefined, (type, meta) => SWITCH_COMPILE_PIPE(type, meta));
/**
 * \@publicApi
 * @record
 */
export function InputDecorator() { }
/** @type {?} */
const initializeBaseDef = (target) => {
    /** @type {?} */
    const constructor = target.constructor;
    /** @nocollapse @type {?} */
    const inheritedBaseDef = constructor.ngBaseDef;
    /** @type {?} */
    const baseDef = constructor.ngBaseDef = {
        inputs: {},
        outputs: {},
        declaredInputs: {},
    };
    if (inheritedBaseDef) {
        fillProperties(baseDef.inputs, inheritedBaseDef.inputs);
        fillProperties(baseDef.outputs, inheritedBaseDef.outputs);
        fillProperties(baseDef.declaredInputs, inheritedBaseDef.declaredInputs);
    }
};
const ɵ0 = initializeBaseDef;
/** *
 * Does the work of creating the `ngBaseDef` property for the \@Input and \@Output decorators.
 * \@param key "inputs" or "outputs"
  @type {?} */
const updateBaseDefFromIOProp = (getProp) => (target, name, ...args) => {
    /** @type {?} */
    const constructor = target.constructor;
    if (!constructor.hasOwnProperty(NG_BASE_DEF)) {
        initializeBaseDef(target);
    }
    /** @nocollapse @type {?} */
    const baseDef = constructor.ngBaseDef;
    /** @type {?} */
    const defProp = getProp(baseDef);
    defProp[name] = args[0];
};
const ɵ1 = updateBaseDefFromIOProp;
/** *
 * \@Annotation
 * \@publicApi
  @type {?} */
export const Input = makePropDecorator('Input', (bindingPropertyName) => ({ bindingPropertyName }), undefined, updateBaseDefFromIOProp(baseDef => baseDef.inputs || {}));
/**
 * Type of the Output decorator / constructor function.
 *
 * \@publicApi
 * @record
 */
export function OutputDecorator() { }
/** *
 * \@Annotation
 * \@publicApi
  @type {?} */
export const Output = makePropDecorator('Output', (bindingPropertyName) => ({ bindingPropertyName }), undefined, updateBaseDefFromIOProp(baseDef => baseDef.outputs || {}));
/**
 * Type of the HostBinding decorator / constructor function.
 *
 * \@publicApi
 * @record
 */
export function HostBindingDecorator() { }
/** *
 * \@Annotation
 * \@publicApi
  @type {?} */
export const HostBinding = makePropDecorator('HostBinding', (hostPropertyName) => ({ hostPropertyName }));
/**
 * Type of the HostListener decorator / constructor function.
 *
 * \@publicApi
 * @record
 */
export function HostListenerDecorator() { }
/** *
 * Binds a CSS event to a host listener and supplies configuration metadata.
 * Angular invokes the supplied handler method when the host element emits the specified event,
 * and updates the bound element with the result.
 * If the handler method returns false, applies `preventDefault` on the bound element.
 *
 * \@usageNotes
 *
 * The following example declares a directive
 * that attaches a click listener to a button and counts clicks.
 *
 * ```
 * \@Directive({selector: 'button[counting]'})
 * class CountClicks {
 *   numberOfClicks = 0;
 *
 * \@HostListener('click', ['$event.target'])
 *   onClick(btn) {
 *     console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
 *  }
 * }
 *
 * \@Component({
 *   selector: 'app',
 *   template: '<button counting>Increment</button>',
 * })
 * class App {}
 * ```
 *
 * \@Annotation
 * \@publicApi
  @type {?} */
export const HostListener = makePropDecorator('HostListener', (eventName, args) => ({ eventName, args }));
/** @type {?} */
export const SWITCH_COMPILE_COMPONENT__POST_R3__ = render3CompileComponent;
/** @type {?} */
export const SWITCH_COMPILE_DIRECTIVE__POST_R3__ = render3CompileDirective;
/** @type {?} */
export const SWITCH_COMPILE_PIPE__POST_R3__ = render3CompilePipe;
/** @type {?} */
const SWITCH_COMPILE_COMPONENT = SWITCH_COMPILE_COMPONENT__POST_R3__;
/** @type {?} */
const SWITCH_COMPILE_DIRECTIVE = SWITCH_COMPILE_DIRECTIVE__POST_R3__;
/** @type {?} */
const SWITCH_COMPILE_PIPE = SWITCH_COMPILE_PIPE__POST_R3__;
export { ɵ0, ɵ1 };
//# sourceMappingURL=directives.js.map