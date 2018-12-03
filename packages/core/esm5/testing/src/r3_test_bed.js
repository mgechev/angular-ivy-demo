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
import { Injector, NgModule, NgZone, ɵRender3ComponentFactory as ComponentFactory, ɵRender3NgModuleRef as NgModuleRef, ɵcompileComponent as compileComponent, ɵcompileDirective as compileDirective, ɵcompileNgModuleDefs as compileNgModuleDefs, ɵcompilePipe as compilePipe, ɵgetInjectableDef as getInjectableDef, ɵpatchComponentDefWithScope as patchComponentDefWithScope, ɵstringify as stringify } from '@angular/core';
import { ComponentFixture } from './component_fixture';
import { ComponentResolver, DirectiveResolver, NgModuleResolver, PipeResolver } from './resolvers';
import { ComponentFixtureAutoDetect, ComponentFixtureNoNgZone, TestComponentRenderer } from './test_bed_common';
/** @type {?} */
var _nextRootElementId = 0;
/**
 * \@description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
var /**
 * \@description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
TestBedRender3 = /** @class */ (function () {
    function TestBedRender3() {
        // Properties
        this.platform = /** @type {?} */ ((null));
        this.ngModule = /** @type {?} */ ((null));
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._providerOverrides = [];
        this._rootProviderOverrides = [];
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
        this._activeFixtures = [];
        this._moduleRef = /** @type {?} */ ((null));
        this._instantiated = false;
    }
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     *
     * @publicApi
     */
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     *
     * \@publicApi
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    TestBedRender3.initTestEnvironment = /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     *
     * \@publicApi
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    function (ngModule, platform, aotSummaries) {
        /** @type {?} */
        var testBed = _getTestBedRender3();
        testBed.initTestEnvironment(ngModule, platform, aotSummaries);
        return testBed;
    };
    /**
     * Reset the providers for the test injector.
     *
     * @publicApi
     */
    /**
     * Reset the providers for the test injector.
     *
     * \@publicApi
     * @return {?}
     */
    TestBedRender3.resetTestEnvironment = /**
     * Reset the providers for the test injector.
     *
     * \@publicApi
     * @return {?}
     */
    function () { _getTestBedRender3().resetTestEnvironment(); };
    /**
     * @param {?} config
     * @return {?}
     */
    TestBedRender3.configureCompiler = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        _getTestBedRender3().configureCompiler(config);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     * @param {?} moduleDef
     * @return {?}
     */
    TestBedRender3.configureTestingModule = /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     * @param {?} moduleDef
     * @return {?}
     */
    function (moduleDef) {
        _getTestBedRender3().configureTestingModule(moduleDef);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     * @return {?}
     */
    TestBedRender3.compileComponents = /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     * @return {?}
     */
    function () { return _getTestBedRender3().compileComponents(); };
    /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.overrideModule = /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    function (ngModule, override) {
        _getTestBedRender3().overrideModule(ngModule, override);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.overrideComponent = /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    function (component, override) {
        _getTestBedRender3().overrideComponent(component, override);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.overrideDirective = /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    function (directive, override) {
        _getTestBedRender3().overrideDirective(directive, override);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.overridePipe = /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    function (pipe, override) {
        _getTestBedRender3().overridePipe(pipe, override);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    TestBedRender3.overrideTemplate = /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    function (component, template) {
        _getTestBedRender3().overrideComponent(component, { set: { template: template, templateUrl: /** @type {?} */ ((null)) } });
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    TestBedRender3.overrideTemplateUsingTestingModule = /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    function (component, template) {
        _getTestBedRender3().overrideTemplateUsingTestingModule(component, template);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    TestBedRender3.prototype.overrideTemplateUsingTestingModule = /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    function (component, template) {
        throw new Error('Render3TestBed.overrideTemplateUsingTestingModule is not implemented yet');
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedRender3.overrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        _getTestBedRender3().overrideProvider(token, provider);
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedRender3.deprecatedOverrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        throw new Error('Render3TestBed.deprecatedOverrideProvider is not implemented');
    };
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    TestBedRender3.get = /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
        return _getTestBedRender3().get(token, notFoundValue);
    };
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    TestBedRender3.createComponent = /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) {
        return _getTestBedRender3().createComponent(component);
    };
    /**
     * @return {?}
     */
    TestBedRender3.resetTestingModule = /**
     * @return {?}
     */
    function () {
        _getTestBedRender3().resetTestingModule();
        return /** @type {?} */ ((TestBedRender3));
    };
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     *
     * @publicApi
     */
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     *
     * \@publicApi
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    TestBedRender3.prototype.initTestEnvironment = /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     *
     * \@publicApi
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    function (ngModule, platform, aotSummaries) {
        if (this.platform || this.ngModule) {
            throw new Error('Cannot set base providers because it has already been called');
        }
        this.platform = platform;
        this.ngModule = ngModule;
    };
    /**
     * Reset the providers for the test injector.
     *
     * @publicApi
     */
    /**
     * Reset the providers for the test injector.
     *
     * \@publicApi
     * @return {?}
     */
    TestBedRender3.prototype.resetTestEnvironment = /**
     * Reset the providers for the test injector.
     *
     * \@publicApi
     * @return {?}
     */
    function () {
        this.resetTestingModule();
        this.platform = /** @type {?} */ ((null));
        this.ngModule = /** @type {?} */ ((null));
    };
    /**
     * @return {?}
     */
    TestBedRender3.prototype.resetTestingModule = /**
     * @return {?}
     */
    function () {
        // reset metadata overrides
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._providerOverrides = [];
        this._rootProviderOverrides = [];
        // reset test module config
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
        this._moduleRef = /** @type {?} */ ((null));
        this._instantiated = false;
        this._activeFixtures.forEach(function (fixture) {
            try {
                fixture.destroy();
            }
            catch (e) {
                console.error('Error during cleanup of component', {
                    component: fixture.componentInstance,
                    stacktrace: e,
                });
            }
        });
        this._activeFixtures = [];
    };
    /**
     * @param {?} config
     * @return {?}
     */
    TestBedRender3.prototype.configureCompiler = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _a;
        if (config.useJit != null) {
            throw new Error('the Render3 compiler JiT mode is not configurable !');
        }
        if (config.providers) {
            (_a = this._providerOverrides).push.apply(_a, config.providers);
        }
    };
    /**
     * @param {?} moduleDef
     * @return {?}
     */
    TestBedRender3.prototype.configureTestingModule = /**
     * @param {?} moduleDef
     * @return {?}
     */
    function (moduleDef) {
        var _a, _b, _c, _d;
        this._assertNotInstantiated('R3TestBed.configureTestingModule', 'configure the test module');
        if (moduleDef.providers) {
            (_a = this._providers).push.apply(_a, moduleDef.providers);
        }
        if (moduleDef.declarations) {
            (_b = this._declarations).push.apply(_b, moduleDef.declarations);
        }
        if (moduleDef.imports) {
            (_c = this._imports).push.apply(_c, moduleDef.imports);
        }
        if (moduleDef.schemas) {
            (_d = this._schemas).push.apply(_d, moduleDef.schemas);
        }
    };
    /**
     * @return {?}
     */
    TestBedRender3.prototype.compileComponents = /**
     * @return {?}
     */
    function () {
        // assume for now that components don't use templateUrl / stylesUrl to unblock further testing
        // TODO(pk): plug into the ivy's resource fetching pipeline
        return Promise.resolve();
    };
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    TestBedRender3.prototype.get = /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
        this._initIfNeeded();
        if (token === TestBedRender3) {
            return this;
        }
        return this._moduleRef.injector.get(token, notFoundValue);
    };
    /**
     * @param {?} tokens
     * @param {?} fn
     * @param {?=} context
     * @return {?}
     */
    TestBedRender3.prototype.execute = /**
     * @param {?} tokens
     * @param {?} fn
     * @param {?=} context
     * @return {?}
     */
    function (tokens, fn, context) {
        var _this = this;
        this._initIfNeeded();
        /** @type {?} */
        var params = tokens.map(function (t) { return _this.get(t); });
        return fn.apply(context, params);
    };
    /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.prototype.overrideModule = /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    function (ngModule, override) {
        this._assertNotInstantiated('overrideModule', 'override module metadata');
        this._moduleOverrides.push([ngModule, override]);
    };
    /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.prototype.overrideComponent = /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    function (component, override) {
        this._assertNotInstantiated('overrideComponent', 'override component metadata');
        this._componentOverrides.push([component, override]);
    };
    /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.prototype.overrideDirective = /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    function (directive, override) {
        this._assertNotInstantiated('overrideDirective', 'override directive metadata');
        this._directiveOverrides.push([directive, override]);
    };
    /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    TestBedRender3.prototype.overridePipe = /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    function (pipe, override) {
        this._assertNotInstantiated('overridePipe', 'override pipe metadata');
        this._pipeOverrides.push([pipe, override]);
    };
    /**
     * Overwrites all providers for the given token with the given provider definition.
     */
    /**
     * Overwrites all providers for the given token with the given provider definition.
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedRender3.prototype.overrideProvider = /**
     * Overwrites all providers for the given token with the given provider definition.
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        /** @type {?} */
        var injectableDef;
        /** @type {?} */
        var isRoot = (typeof token !== 'string' && (injectableDef = getInjectableDef(token)) &&
            injectableDef.providedIn === 'root');
        /** @type {?} */
        var overrides = isRoot ? this._rootProviderOverrides : this._providerOverrides;
        if (provider.useFactory) {
            overrides.push({ provide: token, useFactory: provider.useFactory, deps: provider.deps || [] });
        }
        else {
            overrides.push({ provide: token, useValue: provider.useValue });
        }
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedRender3.prototype.deprecatedOverrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        throw new Error('No implemented in IVY');
    };
    /**
     * @template T
     * @param {?} type
     * @return {?}
     */
    TestBedRender3.prototype.createComponent = /**
     * @template T
     * @param {?} type
     * @return {?}
     */
    function (type) {
        var _this = this;
        this._initIfNeeded();
        /** @type {?} */
        var testComponentRenderer = this.get(TestComponentRenderer);
        /** @type {?} */
        var rootElId = "root" + _nextRootElementId++;
        testComponentRenderer.insertRootElement(rootElId);
        /** @nocollapse @type {?} */
        var componentDef = (/** @type {?} */ (type)).ngComponentDef;
        if (!componentDef) {
            throw new Error("It looks like '" + stringify(type) + "' has not been IVY compiled - it has no 'ngComponentDef' field");
        }
        /** @type {?} */
        var noNgZone = this.get(ComponentFixtureNoNgZone, false);
        /** @type {?} */
        var autoDetect = this.get(ComponentFixtureAutoDetect, false);
        /** @type {?} */
        var ngZone = noNgZone ? null : this.get(NgZone, null);
        /** @type {?} */
        var componentFactory = new ComponentFactory(componentDef);
        /** @type {?} */
        var initComponent = function () {
            /** @type {?} */
            var componentRef = componentFactory.create(Injector.NULL, [], "#" + rootElId, _this._moduleRef);
            return new ComponentFixture(componentRef, ngZone, autoDetect);
        };
        /** @type {?} */
        var fixture = ngZone ? ngZone.run(initComponent) : initComponent();
        this._activeFixtures.push(fixture);
        return fixture;
    };
    /**
     * @return {?}
     */
    TestBedRender3.prototype._initIfNeeded = /**
     * @return {?}
     */
    function () {
        if (this._instantiated) {
            return;
        }
        /** @type {?} */
        var resolvers = this._getResolvers();
        /** @type {?} */
        var testModuleType = this._createTestModule();
        compileNgModule(testModuleType, resolvers);
        /** @type {?} */
        var parentInjector = this.platform.injector;
        this._moduleRef = new NgModuleRef(testModuleType, parentInjector);
        this._instantiated = true;
    };
    /**
     * @return {?}
     */
    TestBedRender3.prototype._getResolvers = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var module = new NgModuleResolver();
        module.setOverrides(this._moduleOverrides);
        /** @type {?} */
        var component = new ComponentResolver();
        component.setOverrides(this._componentOverrides);
        /** @type {?} */
        var directive = new DirectiveResolver();
        directive.setOverrides(this._directiveOverrides);
        /** @type {?} */
        var pipe = new PipeResolver();
        pipe.setOverrides(this._pipeOverrides);
        return { module: module, component: component, directive: directive, pipe: pipe };
    };
    /**
     * @param {?} methodName
     * @param {?} methodDescription
     * @return {?}
     */
    TestBedRender3.prototype._assertNotInstantiated = /**
     * @param {?} methodName
     * @param {?} methodDescription
     * @return {?}
     */
    function (methodName, methodDescription) {
        if (this._instantiated) {
            throw new Error("Cannot " + methodDescription + " when the test module has already been instantiated. " +
                ("Make sure you are not using `inject` before `" + methodName + "`."));
        }
    };
    /**
     * @return {?}
     */
    TestBedRender3.prototype._createTestModule = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var rootProviderOverrides = this._rootProviderOverrides;
        var RootScopeModule = /** @class */ (function () {
            function RootScopeModule() {
            }
            RootScopeModule.decorators = [
                { type: NgModule, args: [{
                            providers: rootProviderOverrides.slice(),
                            jit: true,
                        },] },
            ];
            return RootScopeModule;
        }());
        /** @type {?} */
        var ngZone = new NgZone({ enableLongStackTrace: true });
        /** @type {?} */
        var providers = [{ provide: NgZone, useValue: ngZone }].concat(this._providers, this._providerOverrides);
        /** @type {?} */
        var declarations = this._declarations;
        /** @type {?} */
        var imports = [RootScopeModule, this.ngModule, this._imports];
        /** @type {?} */
        var schemas = this._schemas;
        var DynamicTestModule = /** @class */ (function () {
            function DynamicTestModule() {
            }
            DynamicTestModule.decorators = [
                { type: NgModule, args: [{ providers: providers, declarations: declarations, imports: imports, schemas: schemas, jit: true },] },
            ];
            return DynamicTestModule;
        }());
        return DynamicTestModule;
    };
    return TestBedRender3;
}());
/**
 * \@description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
export { TestBedRender3 };
if (false) {
    /** @type {?} */
    TestBedRender3.prototype.platform;
    /** @type {?} */
    TestBedRender3.prototype.ngModule;
    /** @type {?} */
    TestBedRender3.prototype._moduleOverrides;
    /** @type {?} */
    TestBedRender3.prototype._componentOverrides;
    /** @type {?} */
    TestBedRender3.prototype._directiveOverrides;
    /** @type {?} */
    TestBedRender3.prototype._pipeOverrides;
    /** @type {?} */
    TestBedRender3.prototype._providerOverrides;
    /** @type {?} */
    TestBedRender3.prototype._rootProviderOverrides;
    /** @type {?} */
    TestBedRender3.prototype._providers;
    /** @type {?} */
    TestBedRender3.prototype._declarations;
    /** @type {?} */
    TestBedRender3.prototype._imports;
    /** @type {?} */
    TestBedRender3.prototype._schemas;
    /** @type {?} */
    TestBedRender3.prototype._activeFixtures;
    /** @type {?} */
    TestBedRender3.prototype._moduleRef;
    /** @type {?} */
    TestBedRender3.prototype._instantiated;
}
/** @type {?} */
var testBed;
/**
 * @return {?}
 */
export function _getTestBedRender3() {
    return testBed = testBed || new TestBedRender3();
}
/** @type {?} */
var EMPTY_ARRAY = [];
/** @typedef {?} */
var Resolvers;
/**
 * @param {?} moduleType
 * @param {?} resolvers
 * @return {?}
 */
function compileNgModule(moduleType, resolvers) {
    /** @type {?} */
    var ngModule = resolvers.module.resolve(moduleType);
    if (ngModule === null) {
        throw new Error(stringify(moduleType) + " has not @NgModule annotation");
    }
    compileNgModuleDefs(moduleType, ngModule);
    /** @type {?} */
    var declarations = flatten(ngModule.declarations || EMPTY_ARRAY);
    /** @type {?} */
    var compiledComponents = [];
    // Compile the components, directives and pipes declared by this module
    declarations.forEach(function (declaration) {
        /** @type {?} */
        var component = resolvers.component.resolve(declaration);
        if (component) {
            compileComponent(declaration, component);
            compiledComponents.push(declaration);
            return;
        }
        /** @type {?} */
        var directive = resolvers.directive.resolve(declaration);
        if (directive) {
            compileDirective(declaration, directive);
            return;
        }
        /** @type {?} */
        var pipe = resolvers.pipe.resolve(declaration);
        if (pipe) {
            compilePipe(declaration, pipe);
            return;
        }
    });
    /** @type {?} */
    var transitiveScope = transitiveScopesFor(moduleType, resolvers);
    compiledComponents.forEach(function (cmp) { return patchComponentDefWithScope(cmp, transitiveScope); });
}
/**
 * Compute the pair of transitive scopes (compilation scope and exported scope) for a given module.
 *
 * This operation is memoized and the result is cached on the module's definition. It can be called
 * on modules with components that have not fully compiled yet, but the result should not be used
 * until they have.
 * @template T
 * @param {?} moduleType
 * @param {?} resolvers
 * @return {?}
 */
function transitiveScopesFor(moduleType, resolvers) {
    if (!isNgModule(moduleType)) {
        throw new Error(moduleType.name + " does not have an ngModuleDef");
    }
    /** @nocollapse @type {?} */
    var def = moduleType.ngModuleDef;
    if (def.transitiveCompileScopes !== null) {
        return def.transitiveCompileScopes;
    }
    /** @type {?} */
    var scopes = {
        compilation: {
            directives: new Set(),
            pipes: new Set(),
        },
        exported: {
            directives: new Set(),
            pipes: new Set(),
        },
    };
    def.declarations.forEach(function (declared) {
        /** @type {?} */
        var declaredWithDefs = /** @type {?} */ (declared);
        if (declaredWithDefs.ngPipeDef !== undefined) {
            scopes.compilation.pipes.add(declared);
        }
        else {
            scopes.compilation.directives.add(declared);
        }
    });
    def.imports.forEach(function (imported) {
        /** @type {?} */
        var ngModule = resolvers.module.resolve(imported);
        if (ngModule === null) {
            throw new Error("Importing " + imported.name + " which does not have an @ngModule");
        }
        else {
            compileNgModule(imported, resolvers);
        }
        /** @type {?} */
        var importedScope = transitiveScopesFor(imported, resolvers);
        importedScope.exported.directives.forEach(function (entry) { return scopes.compilation.directives.add(entry); });
        importedScope.exported.pipes.forEach(function (entry) { return scopes.compilation.pipes.add(entry); });
    });
    def.exports.forEach(function (exported) {
        /** @type {?} */
        var exportedTyped = /** @type {?} */ (exported);
        // Either the type is a module, a pipe, or a component/directive (which may not have an
        // ngComponentDef as it might be compiled asynchronously).
        if (isNgModule(exportedTyped)) {
            /** @type {?} */
            var exportedScope = transitiveScopesFor(exportedTyped, resolvers);
            exportedScope.exported.directives.forEach(function (entry) {
                scopes.compilation.directives.add(entry);
                scopes.exported.directives.add(entry);
            });
            exportedScope.exported.pipes.forEach(function (entry) {
                scopes.compilation.pipes.add(entry);
                scopes.exported.pipes.add(entry);
            });
        }
        else if (exportedTyped.ngPipeDef !== undefined) {
            scopes.exported.pipes.add(exportedTyped);
        }
        else {
            scopes.exported.directives.add(exportedTyped);
        }
    });
    def.transitiveCompileScopes = scopes;
    return scopes;
}
/**
 * @template T
 * @param {?} values
 * @return {?}
 */
function flatten(values) {
    /** @type {?} */
    var out = [];
    values.forEach(function (value) {
        if (Array.isArray(value)) {
            out.push.apply(out, flatten(value));
        }
        else {
            out.push(value);
        }
    });
    return out;
}
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function isNgModule(value) {
    return (/** @type {?} */ (value)).ngModuleDef !== undefined;
}
//# sourceMappingURL=r3_test_bed.js.map