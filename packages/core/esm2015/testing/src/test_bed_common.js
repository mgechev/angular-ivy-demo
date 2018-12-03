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
import { InjectionToken } from '@angular/core';
/**
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * \@publicApi
 */
export class TestComponentRenderer {
    /**
     * @param {?} rootElementId
     * @return {?}
     */
    insertRootElement(rootElementId) { }
}
/** *
 * \@publicApi
  @type {?} */
export const ComponentFixtureAutoDetect = new InjectionToken('ComponentFixtureAutoDetect');
/** *
 * \@publicApi
  @type {?} */
export const ComponentFixtureNoNgZone = new InjectionToken('ComponentFixtureNoNgZone');
/** @typedef {?} */
var TestModuleMetadata;
export { TestModuleMetadata };
/**
 * Static methods implemented by the `TestBedViewEngine` and `TestBedRender3`
 *
 * \@publicApi
 * @record
 */
export function TestBedStatic() { }
/* TODO: handle strange member:
new (...args: any[]): TestBed;
*/
/** @type {?} */
TestBedStatic.prototype.initTestEnvironment;
/**
 * Reset the providers for the test injector.
 * @type {?}
 */
TestBedStatic.prototype.resetTestEnvironment;
/** @type {?} */
TestBedStatic.prototype.resetTestingModule;
/**
 * Allows overriding default compiler providers and settings
 * which are defined in test_injector.js
 * @type {?}
 */
TestBedStatic.prototype.configureCompiler;
/**
 * Allows overriding default providers, directives, pipes, modules of the test injector,
 * which are defined in test_injector.js
 * @type {?}
 */
TestBedStatic.prototype.configureTestingModule;
/**
 * Compile components with a `templateUrl` for the test's NgModule.
 * It is necessary to call this function
 * as fetching urls is asynchronous.
 * @type {?}
 */
TestBedStatic.prototype.compileComponents;
/** @type {?} */
TestBedStatic.prototype.overrideModule;
/** @type {?} */
TestBedStatic.prototype.overrideComponent;
/** @type {?} */
TestBedStatic.prototype.overrideDirective;
/** @type {?} */
TestBedStatic.prototype.overridePipe;
/** @type {?} */
TestBedStatic.prototype.overrideTemplate;
/**
 * Overrides the template of the given component, compiling the template
 * in the context of the TestingModule.
 *
 * Note: This works for JIT and AOTed components as well.
 * @type {?}
 */
TestBedStatic.prototype.overrideTemplateUsingTestingModule;
/**
 * Overwrites all providers for the given token with the given provider definition.
 *
 * Note: This works for JIT and AOTed components as well.
 * @type {?}
 */
TestBedStatic.prototype.overrideProvider;
/** @type {?} */
TestBedStatic.prototype.overrideProvider;
/** @type {?} */
TestBedStatic.prototype.overrideProvider;
/**
 * Overwrites all providers for the given token with the given provider definition.
 *
 * @deprecated as it makes all NgModules lazy. Introduced only for migrating off of it.
 * @type {?}
 */
TestBedStatic.prototype.deprecatedOverrideProvider;
/** @type {?} */
TestBedStatic.prototype.deprecatedOverrideProvider;
/** @type {?} */
TestBedStatic.prototype.deprecatedOverrideProvider;
/** @type {?} */
TestBedStatic.prototype.get;
/** @type {?} */
TestBedStatic.prototype.createComponent;
//# sourceMappingURL=test_bed_common.js.map