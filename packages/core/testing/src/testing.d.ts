/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the core/testing package.
 */
export * from './async';
export * from './component_fixture';
export * from './fake_async';
export { TestBed, getTestBed, inject, InjectSetupWrapper, withModule } from './test_bed';
export * from './test_bed_common';
export * from './before_each';
export * from './metadata_override';
export { MetadataOverrider as ɵMetadataOverrider } from './metadata_overrider';
export * from './private_export_testing';
