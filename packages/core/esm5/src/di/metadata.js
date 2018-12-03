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
import { makeParamDecorator } from '../util/decorators';
/**
 * Type of the Inject decorator / constructor function.
 *
 * \@publicApi
 * @record
 */
export function InjectDecorator() { }
/** *
 * Inject decorator and metadata.
 *
 * \@Annotation
 * \@publicApi
  @type {?} */
export var Inject = makeParamDecorator('Inject', function (token) { return ({ token: token }); });
/**
 * Type of the Optional decorator / constructor function.
 *
 * \@publicApi
 * @record
 */
export function OptionalDecorator() { }
/** *
 * Optional decorator and metadata.
 *
 * \@Annotation
 * \@publicApi
  @type {?} */
export var Optional = makeParamDecorator('Optional');
/**
 * Type of the Self decorator / constructor function.
 *
 * \@publicApi
 * @record
 */
export function SelfDecorator() { }
/** *
 * Self decorator and metadata.
 *
 * \@Annotation
 * \@publicApi
  @type {?} */
export var Self = makeParamDecorator('Self');
/**
 * Type of the SkipSelf decorator / constructor function.
 *
 * \@publicApi
 * @record
 */
export function SkipSelfDecorator() { }
/** *
 * SkipSelf decorator and metadata.
 *
 * \@Annotation
 * \@publicApi
  @type {?} */
export var SkipSelf = makeParamDecorator('SkipSelf');
/**
 * Type of the Host decorator / constructor function.
 *
 * \@publicApi
 * @record
 */
export function HostDecorator() { }
/** *
 * Host decorator and metadata.
 *
 * \@Annotation
 * \@publicApi
  @type {?} */
export var Host = makeParamDecorator('Host');
//# sourceMappingURL=metadata.js.map