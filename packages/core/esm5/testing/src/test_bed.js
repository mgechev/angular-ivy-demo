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
import { ApplicationInitStatus, Component, Injector, NgModule, NgZone, Optional, SkipSelf, ɵAPP_ROOT as APP_ROOT, ɵclearOverrides as clearOverrides, ɵgetInjectableDef as getInjectableDef, ɵivyEnabled as ivyEnabled, ɵoverrideComponentView as overrideComponentView, ɵoverrideProvider as overrideProvider, ɵstringify as stringify } from '@angular/core';
import { AsyncTestCompleter } from './async_test_completer';
import { ComponentFixture } from './component_fixture';
import { TestBedRender3, _getTestBedRender3 } from './r3_test_bed';
import { ComponentFixtureAutoDetect, ComponentFixtureNoNgZone, TestComponentRenderer } from './test_bed_common';
import { TestingCompilerFactory } from './test_compiler';
/** @type {?} */
var UNDEFINED = new Object();
/** @type {?} */
var _nextRootElementId = 0;
/**
 * \@description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
var /**
 * \@description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
TestBedViewEngine = /** @class */ (function () {
    function TestBedViewEngine() {
        this._instantiated = false;
        this._compiler = /** @type {?} */ ((null));
        this._moduleRef = /** @type {?} */ ((null));
        this._moduleFactory = /** @type {?} */ ((null));
        this._compilerOptions = [];
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
        this._activeFixtures = [];
        this._testEnvAotSummaries = function () { return []; };
        this._aotSummaries = [];
        this._templateOverrides = [];
        this._isRoot = true;
        this._rootProviderOverrides = [];
        this.platform = /** @type {?} */ ((null));
        this.ngModule = /** @type {?} */ ((null));
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
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    TestBedViewEngine.initTestEnvironment = /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    function (ngModule, platform, aotSummaries) {
        /** @type {?} */
        var testBed = _getTestBedViewEngine();
        testBed.initTestEnvironment(ngModule, platform, aotSummaries);
        return testBed;
    };
    /**
     * Reset the providers for the test injector.
     */
    /**
     * Reset the providers for the test injector.
     * @return {?}
     */
    TestBedViewEngine.resetTestEnvironment = /**
     * Reset the providers for the test injector.
     * @return {?}
     */
    function () { _getTestBedViewEngine().resetTestEnvironment(); };
    /**
     * @return {?}
     */
    TestBedViewEngine.resetTestingModule = /**
     * @return {?}
     */
    function () {
        _getTestBedViewEngine().resetTestingModule();
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     */
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     * @param {?} config
     * @return {?}
     */
    TestBedViewEngine.configureCompiler = /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     * @param {?} config
     * @return {?}
     */
    function (config) {
        _getTestBedViewEngine().configureCompiler(config);
        return /** @type {?} */ ((TestBedViewEngine));
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
    TestBedViewEngine.configureTestingModule = /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     * @param {?} moduleDef
     * @return {?}
     */
    function (moduleDef) {
        _getTestBedViewEngine().configureTestingModule(moduleDef);
        return /** @type {?} */ ((TestBedViewEngine));
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
    TestBedViewEngine.compileComponents = /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     * @return {?}
     */
    function () { return getTestBed().compileComponents(); };
    /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    TestBedViewEngine.overrideModule = /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    function (ngModule, override) {
        _getTestBedViewEngine().overrideModule(ngModule, override);
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    TestBedViewEngine.overrideComponent = /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    function (component, override) {
        _getTestBedViewEngine().overrideComponent(component, override);
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    TestBedViewEngine.overrideDirective = /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    function (directive, override) {
        _getTestBedViewEngine().overrideDirective(directive, override);
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    TestBedViewEngine.overridePipe = /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    function (pipe, override) {
        _getTestBedViewEngine().overridePipe(pipe, override);
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    TestBedViewEngine.overrideTemplate = /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    function (component, template) {
        _getTestBedViewEngine().overrideComponent(component, { set: { template: template, templateUrl: /** @type {?} */ ((null)) } });
        return /** @type {?} */ ((TestBedViewEngine));
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
    TestBedViewEngine.overrideTemplateUsingTestingModule = /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    function (component, template) {
        _getTestBedViewEngine().overrideTemplateUsingTestingModule(component, template);
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedViewEngine.overrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        _getTestBedViewEngine().overrideProvider(token, /** @type {?} */ (provider));
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedViewEngine.deprecatedOverrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        _getTestBedViewEngine().deprecatedOverrideProvider(token, /** @type {?} */ (provider));
        return /** @type {?} */ ((TestBedViewEngine));
    };
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    TestBedViewEngine.get = /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
        return _getTestBedViewEngine().get(token, notFoundValue);
    };
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    TestBedViewEngine.createComponent = /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) {
        return _getTestBedViewEngine().createComponent(component);
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
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    TestBedViewEngine.prototype.initTestEnvironment = /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
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
        if (aotSummaries) {
            this._testEnvAotSummaries = aotSummaries;
        }
    };
    /**
     * Reset the providers for the test injector.
     */
    /**
     * Reset the providers for the test injector.
     * @return {?}
     */
    TestBedViewEngine.prototype.resetTestEnvironment = /**
     * Reset the providers for the test injector.
     * @return {?}
     */
    function () {
        this.resetTestingModule();
        this.platform = /** @type {?} */ ((null));
        this.ngModule = /** @type {?} */ ((null));
        this._testEnvAotSummaries = function () { return []; };
    };
    /**
     * @return {?}
     */
    TestBedViewEngine.prototype.resetTestingModule = /**
     * @return {?}
     */
    function () {
        clearOverrides();
        this._aotSummaries = [];
        this._templateOverrides = [];
        this._compiler = /** @type {?} */ ((null));
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._isRoot = true;
        this._rootProviderOverrides = [];
        this._moduleRef = /** @type {?} */ ((null));
        this._moduleFactory = /** @type {?} */ ((null));
        this._compilerOptions = [];
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
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
    TestBedViewEngine.prototype.configureCompiler = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this._assertNotInstantiated('TestBed.configureCompiler', 'configure the compiler');
        this._compilerOptions.push(config);
    };
    /**
     * @param {?} moduleDef
     * @return {?}
     */
    TestBedViewEngine.prototype.configureTestingModule = /**
     * @param {?} moduleDef
     * @return {?}
     */
    function (moduleDef) {
        var _a, _b, _c, _d;
        this._assertNotInstantiated('TestBed.configureTestingModule', 'configure the test module');
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
        if (moduleDef.aotSummaries) {
            this._aotSummaries.push(moduleDef.aotSummaries);
        }
    };
    /**
     * @return {?}
     */
    TestBedViewEngine.prototype.compileComponents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._moduleFactory || this._instantiated) {
            return Promise.resolve(null);
        }
        /** @type {?} */
        var moduleType = this._createCompilerAndModule();
        return this._compiler.compileModuleAndAllComponentsAsync(moduleType)
            .then(function (moduleAndComponentFactories) {
            _this._moduleFactory = moduleAndComponentFactories.ngModuleFactory;
        });
    };
    /**
     * @return {?}
     */
    TestBedViewEngine.prototype._initIfNeeded = /**
     * @return {?}
     */
    function () {
        if (this._instantiated) {
            return;
        }
        if (!this._moduleFactory) {
            try {
                /** @type {?} */
                var moduleType = this._createCompilerAndModule();
                this._moduleFactory =
                    this._compiler.compileModuleAndAllComponentsSync(moduleType).ngModuleFactory;
            }
            catch (e) {
                /** @type {?} */
                var errorCompType = this._compiler.getComponentFromError(e);
                if (errorCompType) {
                    throw new Error("This test module uses the component " + stringify(errorCompType) + " which is using a \"templateUrl\" or \"styleUrls\", but they were never compiled. " +
                        "Please call \"TestBed.compileComponents\" before your test.");
                }
                else {
                    throw e;
                }
            }
        }
        for (var _i = 0, _a = this._templateOverrides; _i < _a.length; _i++) {
            var _b = _a[_i], component = _b.component, templateOf = _b.templateOf;
            /** @type {?} */
            var compFactory = this._compiler.getComponentFactory(templateOf);
            overrideComponentView(component, compFactory);
        }
        /** @type {?} */
        var ngZone = new NgZone({ enableLongStackTrace: true });
        /** @type {?} */
        var providers = [{ provide: NgZone, useValue: ngZone }];
        /** @type {?} */
        var ngZoneInjector = Injector.create({
            providers: providers,
            parent: this.platform.injector,
            name: this._moduleFactory.moduleType.name
        });
        this._moduleRef = this._moduleFactory.create(ngZoneInjector);
        // ApplicationInitStatus.runInitializers() is marked @internal to core. So casting to any
        // before accessing it.
        (/** @type {?} */ (this._moduleRef.injector.get(ApplicationInitStatus))).runInitializers();
        this._instantiated = true;
    };
    /**
     * @return {?}
     */
    TestBedViewEngine.prototype._createCompilerAndModule = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var providers = this._providers.concat([{ provide: TestBed, useValue: this }]);
        /** @type {?} */
        var declarations = this._declarations.concat(this._templateOverrides.map(function (entry) { return entry.templateOf; }));
        /** @type {?} */
        var rootScopeImports = [];
        /** @type {?} */
        var rootProviderOverrides = this._rootProviderOverrides;
        if (this._isRoot) {
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
            rootScopeImports.push(RootScopeModule);
        }
        providers.push({ provide: APP_ROOT, useValue: this._isRoot });
        /** @type {?} */
        var imports = [rootScopeImports, this.ngModule, this._imports];
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
        /** @type {?} */
        var compilerFactory = this.platform.injector.get(TestingCompilerFactory);
        this._compiler = compilerFactory.createTestingCompiler(this._compilerOptions);
        for (var _i = 0, _a = [this._testEnvAotSummaries].concat(this._aotSummaries); _i < _a.length; _i++) {
            var summary = _a[_i];
            this._compiler.loadAotSummaries(summary);
        }
        this._moduleOverrides.forEach(function (entry) { return _this._compiler.overrideModule(entry[0], entry[1]); });
        this._componentOverrides.forEach(function (entry) { return _this._compiler.overrideComponent(entry[0], entry[1]); });
        this._directiveOverrides.forEach(function (entry) { return _this._compiler.overrideDirective(entry[0], entry[1]); });
        this._pipeOverrides.forEach(function (entry) { return _this._compiler.overridePipe(entry[0], entry[1]); });
        return DynamicTestModule;
    };
    /**
     * @param {?} methodName
     * @param {?} methodDescription
     * @return {?}
     */
    TestBedViewEngine.prototype._assertNotInstantiated = /**
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
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    TestBedViewEngine.prototype.get = /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
        this._initIfNeeded();
        if (token === TestBed) {
            return this;
        }
        /** @type {?} */
        var result = this._moduleRef.injector.get(token, UNDEFINED);
        return result === UNDEFINED ? this._compiler.injector.get(token, notFoundValue) : result;
    };
    /**
     * @param {?} tokens
     * @param {?} fn
     * @param {?=} context
     * @return {?}
     */
    TestBedViewEngine.prototype.execute = /**
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
    TestBedViewEngine.prototype.overrideModule = /**
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
    TestBedViewEngine.prototype.overrideComponent = /**
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
    TestBedViewEngine.prototype.overrideDirective = /**
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
    TestBedViewEngine.prototype.overridePipe = /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    function (pipe, override) {
        this._assertNotInstantiated('overridePipe', 'override pipe metadata');
        this._pipeOverrides.push([pipe, override]);
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedViewEngine.prototype.overrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        this.overrideProviderImpl(token, provider);
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    TestBedViewEngine.prototype.deprecatedOverrideProvider = /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    function (token, provider) {
        this.overrideProviderImpl(token, provider, /* deprecated */ /* deprecated */ true);
    };
    /**
     * @param {?} token
     * @param {?} provider
     * @param {?=} deprecated
     * @return {?}
     */
    TestBedViewEngine.prototype.overrideProviderImpl = /**
     * @param {?} token
     * @param {?} provider
     * @param {?=} deprecated
     * @return {?}
     */
    function (token, provider, deprecated) {
        if (deprecated === void 0) { deprecated = false; }
        /** @type {?} */
        var def = null;
        if (typeof token !== 'string' && (def = getInjectableDef(token)) && def.providedIn === 'root') {
            if (provider.useFactory) {
                this._rootProviderOverrides.push({ provide: token, useFactory: provider.useFactory, deps: provider.deps || [] });
            }
            else {
                this._rootProviderOverrides.push({ provide: token, useValue: provider.useValue });
            }
        }
        /** @type {?} */
        var flags = 0;
        /** @type {?} */
        var value;
        if (provider.useFactory) {
            flags |= 1024 /* TypeFactoryProvider */;
            value = provider.useFactory;
        }
        else {
            flags |= 256 /* TypeValueProvider */;
            value = provider.useValue;
        }
        /** @type {?} */
        var deps = (provider.deps || []).map(function (dep) {
            /** @type {?} */
            var depFlags = 0 /* None */;
            /** @type {?} */
            var depToken;
            if (Array.isArray(dep)) {
                dep.forEach(function (entry) {
                    if (entry instanceof Optional) {
                        depFlags |= 2 /* Optional */;
                    }
                    else if (entry instanceof SkipSelf) {
                        depFlags |= 1 /* SkipSelf */;
                    }
                    else {
                        depToken = entry;
                    }
                });
            }
            else {
                depToken = dep;
            }
            return [depFlags, depToken];
        });
        overrideProvider({ token: token, flags: flags, deps: deps, value: value, deprecatedBehavior: deprecated });
    };
    /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    TestBedViewEngine.prototype.overrideTemplateUsingTestingModule = /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    function (component, template) {
        this._assertNotInstantiated('overrideTemplateUsingTestingModule', 'override template');
        var OverrideComponent = /** @class */ (function () {
            function OverrideComponent() {
            }
            OverrideComponent.decorators = [
                { type: Component, args: [{ selector: 'empty', template: template, jit: true },] },
            ];
            return OverrideComponent;
        }());
        this._templateOverrides.push({ component: component, templateOf: OverrideComponent });
    };
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    TestBedViewEngine.prototype.createComponent = /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) {
        var _this = this;
        this._initIfNeeded();
        /** @type {?} */
        var componentFactory = this._compiler.getComponentFactory(component);
        if (!componentFactory) {
            throw new Error("Cannot create the component " + stringify(component) + " as it was not imported into the testing module!");
        }
        /** @type {?} */
        var noNgZone = this.get(ComponentFixtureNoNgZone, false);
        /** @type {?} */
        var autoDetect = this.get(ComponentFixtureAutoDetect, false);
        /** @type {?} */
        var ngZone = noNgZone ? null : this.get(NgZone, null);
        /** @type {?} */
        var testComponentRenderer = this.get(TestComponentRenderer);
        /** @type {?} */
        var rootElId = "root" + _nextRootElementId++;
        testComponentRenderer.insertRootElement(rootElId);
        /** @type {?} */
        var initComponent = function () {
            /** @type {?} */
            var componentRef = componentFactory.create(Injector.NULL, [], "#" + rootElId, _this._moduleRef);
            return new ComponentFixture(componentRef, ngZone, autoDetect);
        };
        /** @type {?} */
        var fixture = !ngZone ? initComponent() : ngZone.run(initComponent);
        this._activeFixtures.push(fixture);
        return fixture;
    };
    return TestBedViewEngine;
}());
/**
 * \@description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
export { TestBedViewEngine };
if (false) {
    /** @type {?} */
    TestBedViewEngine.prototype._instantiated;
    /** @type {?} */
    TestBedViewEngine.prototype._compiler;
    /** @type {?} */
    TestBedViewEngine.prototype._moduleRef;
    /** @type {?} */
    TestBedViewEngine.prototype._moduleFactory;
    /** @type {?} */
    TestBedViewEngine.prototype._compilerOptions;
    /** @type {?} */
    TestBedViewEngine.prototype._moduleOverrides;
    /** @type {?} */
    TestBedViewEngine.prototype._componentOverrides;
    /** @type {?} */
    TestBedViewEngine.prototype._directiveOverrides;
    /** @type {?} */
    TestBedViewEngine.prototype._pipeOverrides;
    /** @type {?} */
    TestBedViewEngine.prototype._providers;
    /** @type {?} */
    TestBedViewEngine.prototype._declarations;
    /** @type {?} */
    TestBedViewEngine.prototype._imports;
    /** @type {?} */
    TestBedViewEngine.prototype._schemas;
    /** @type {?} */
    TestBedViewEngine.prototype._activeFixtures;
    /** @type {?} */
    TestBedViewEngine.prototype._testEnvAotSummaries;
    /** @type {?} */
    TestBedViewEngine.prototype._aotSummaries;
    /** @type {?} */
    TestBedViewEngine.prototype._templateOverrides;
    /** @type {?} */
    TestBedViewEngine.prototype._isRoot;
    /** @type {?} */
    TestBedViewEngine.prototype._rootProviderOverrides;
    /** @type {?} */
    TestBedViewEngine.prototype.platform;
    /** @type {?} */
    TestBedViewEngine.prototype.ngModule;
}
/** *
 * \@description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 *
 * \@publicApi
  @type {?} */
export var TestBed = ivyEnabled ? /** @type {?} */ ((TestBedRender3)) : /** @type {?} */ ((TestBedViewEngine));
/** *
 * Returns a singleton of the applicable `TestBed`.
 *
 * It will be either an instance of `TestBedViewEngine` or `TestBedRender3`.
 *
 * \@publicApi
  @type {?} */
export var getTestBed = ivyEnabled ? _getTestBedRender3 : _getTestBedViewEngine;
/** @type {?} */
var testBed;
/**
 * @return {?}
 */
function _getTestBedViewEngine() {
    return testBed = testBed || new TestBedViewEngine();
}
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething();
 *   expect(...);
 * })
 * ```
 *
 * Notes:
 * - inject is currently a function because of some Traceur limitation the syntax should
 * eventually
 *   becomes `it('...', \@Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * \@publicApi
 * @param {?} tokens
 * @param {?} fn
 * @return {?}
 */
export function inject(tokens, fn) {
    /** @type {?} */
    var testBed = getTestBed();
    if (tokens.indexOf(AsyncTestCompleter) >= 0) {
        // Not using an arrow function to preserve context passed from call site
        return function () {
            var _this = this;
            // Return an async test method that returns a Promise if AsyncTestCompleter is one of
            // the injected tokens.
            return testBed.compileComponents().then(function () {
                /** @type {?} */
                var completer = testBed.get(AsyncTestCompleter);
                testBed.execute(tokens, fn, _this);
                return completer.promise;
            });
        };
    }
    else {
        // Not using an arrow function to preserve context passed from call site
        return function () { return testBed.execute(tokens, fn, this); };
    }
}
/**
 * \@publicApi
 */
var /**
 * \@publicApi
 */
InjectSetupWrapper = /** @class */ (function () {
    function InjectSetupWrapper(_moduleDef) {
        this._moduleDef = _moduleDef;
    }
    /**
     * @return {?}
     */
    InjectSetupWrapper.prototype._addModule = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var moduleDef = this._moduleDef();
        if (moduleDef) {
            getTestBed().configureTestingModule(moduleDef);
        }
    };
    /**
     * @param {?} tokens
     * @param {?} fn
     * @return {?}
     */
    InjectSetupWrapper.prototype.inject = /**
     * @param {?} tokens
     * @param {?} fn
     * @return {?}
     */
    function (tokens, fn) {
        /** @type {?} */
        var self = this;
        // Not using an arrow function to preserve context passed from call site
        return function () {
            self._addModule();
            return inject(tokens, fn).call(this);
        };
    };
    return InjectSetupWrapper;
}());
/**
 * \@publicApi
 */
export { InjectSetupWrapper };
if (false) {
    /** @type {?} */
    InjectSetupWrapper.prototype._moduleDef;
}
/**
 * @param {?} moduleDef
 * @param {?=} fn
 * @return {?}
 */
export function withModule(moduleDef, fn) {
    if (fn) {
        // Not using an arrow function to preserve context passed from call site
        return function () {
            /** @type {?} */
            var testBed = getTestBed();
            if (moduleDef) {
                testBed.configureTestingModule(moduleDef);
            }
            return fn.apply(this);
        };
    }
    return new InjectSetupWrapper(function () { return moduleDef; });
}
//# sourceMappingURL=test_bed.js.map