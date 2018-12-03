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
/**
 * An interface implemented by all Angular type decorators, which allows them to be used as ES7
 * decorators as well as
 * Angular DSL syntax.
 *
 * ES7 syntax:
 *
 * ```
 * \@ng.Component({...})
 * class MyClass {...}
 * ```
 *
 * \@publicApi
 * @record
 */
export function TypeDecorator() { }
/** @type {?} */
export const ANNOTATIONS = '__annotations__';
/** @type {?} */
export const PARAMETERS = '__parameters__';
/** @type {?} */
export const PROP_METADATA = '__prop__metadata__';
/**
 * @suppress {globalThis}
 * @template T
 * @param {?} name
 * @param {?=} props
 * @param {?=} parentClass
 * @param {?=} additionalProcessing
 * @param {?=} typeFn
 * @return {?}
 */
export function makeDecorator(name, props, parentClass, additionalProcessing, typeFn) {
    /** @type {?} */
    const metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function DecoratorFactory(...args) {
        if (this instanceof DecoratorFactory) {
            metaCtor.call(this, ...args);
            return this;
        }
        /** @type {?} */
        const annotationInstance = new (/** @type {?} */ (DecoratorFactory))(...args);
        return function TypeDecorator(cls) {
            if (typeFn)
                typeFn(cls, ...args);
            /** @type {?} */
            const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
                (/** @type {?} */ (cls))[ANNOTATIONS] :
                Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
            annotations.push(annotationInstance);
            if (additionalProcessing)
                additionalProcessing(cls);
            return cls;
        };
    }
    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    DecoratorFactory.prototype.ngMetadataName = name;
    (/** @type {?} */ (DecoratorFactory)).annotationCls = DecoratorFactory;
    return /** @type {?} */ (DecoratorFactory);
}
/**
 * @param {?=} props
 * @return {?}
 */
function makeMetadataCtor(props) {
    return function ctor(...args) {
        if (props) {
            /** @type {?} */
            const values = props(...args);
            for (const propName in values) {
                this[propName] = values[propName];
            }
        }
    };
}
/**
 * @param {?} name
 * @param {?=} props
 * @param {?=} parentClass
 * @return {?}
 */
export function makeParamDecorator(name, props, parentClass) {
    /** @type {?} */
    const metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function ParamDecoratorFactory(...args) {
        if (this instanceof ParamDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        /** @type {?} */
        const annotationInstance = new (/** @type {?} */ (ParamDecoratorFactory))(...args);
        (/** @type {?} */ (ParamDecorator)).annotation = annotationInstance;
        return ParamDecorator;
        /**
         * @param {?} cls
         * @param {?} unusedKey
         * @param {?} index
         * @return {?}
         */
        function ParamDecorator(cls, unusedKey, index) {
            /** @type {?} */
            const parameters = cls.hasOwnProperty(PARAMETERS) ?
                (/** @type {?} */ (cls))[PARAMETERS] :
                Object.defineProperty(cls, PARAMETERS, { value: [] })[PARAMETERS];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            (parameters[index] = parameters[index] || []).push(annotationInstance);
            return cls;
        }
    }
    if (parentClass) {
        ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    ParamDecoratorFactory.prototype.ngMetadataName = name;
    (/** @type {?} */ (ParamDecoratorFactory)).annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
}
/**
 * @param {?} name
 * @param {?=} props
 * @param {?=} parentClass
 * @param {?=} additionalProcessing
 * @return {?}
 */
export function makePropDecorator(name, props, parentClass, additionalProcessing) {
    /** @type {?} */
    const metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function PropDecoratorFactory(...args) {
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        /** @type {?} */
        const decoratorInstance = new (/** @type {?} */ (PropDecoratorFactory))(...args);
        /**
         * @param {?} target
         * @param {?} name
         * @return {?}
         */
        function PropDecorator(target, name) {
            /** @type {?} */
            const constructor = target.constructor;
            /** @type {?} */
            const meta = constructor.hasOwnProperty(PROP_METADATA) ?
                (/** @type {?} */ (constructor))[PROP_METADATA] :
                Object.defineProperty(constructor, PROP_METADATA, { value: {} })[PROP_METADATA];
            meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
            meta[name].unshift(decoratorInstance);
            if (additionalProcessing)
                additionalProcessing(target, name, ...args);
        }
        return PropDecorator;
    }
    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    PropDecoratorFactory.prototype.ngMetadataName = name;
    (/** @type {?} */ (PropDecoratorFactory)).annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}
//# sourceMappingURL=decorators.js.map