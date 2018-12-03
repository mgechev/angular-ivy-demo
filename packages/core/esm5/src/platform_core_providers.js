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
import { PlatformRef, createPlatformFactory } from './application_ref';
import { PLATFORM_ID } from './application_tokens';
import { Console } from './console';
import { Injector } from './di';
import { TestabilityRegistry } from './testability/testability';
/** @type {?} */
var _CORE_PLATFORM_PROVIDERS = [
    // Set a default platform name for platforms that don't set it explicitly.
    { provide: PLATFORM_ID, useValue: 'unknown' },
    { provide: PlatformRef, deps: [Injector] },
    { provide: TestabilityRegistry, deps: [] },
    { provide: Console, deps: [] },
];
/** *
 * This platform has to be included in any other platform
 *
 * \@publicApi
  @type {?} */
export var platformCore = createPlatformFactory(null, 'core', _CORE_PLATFORM_PROVIDERS);
//# sourceMappingURL=platform_core_providers.js.map