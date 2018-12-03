/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { global } from '../../util';
export { R3ResolvedDependencyType } from './compiler_facade_interface';
/**
 * @return {?}
 */
export function getCompilerFacade() {
    /** @type {?} */
    const globalNg = global["ng"];
    if (!globalNg || !globalNg.ɵcompilerFacade) {
        throw new Error(`Angular JIT compilation failed: '@angular/compiler' not loaded!\n` +
            `  - JIT compilation is discouraged for production use-cases! Consider AOT mode instead.\n` +
            `  - Did you bootstrap using '@angular/platform-browser-dynamic' or '@angular/platform-server'?\n` +
            `  - Alternatively provide the compiler with 'import "@angular/compiler";' before bootstrapping.`);
    }
    return globalNg.ɵcompilerFacade;
}
//# sourceMappingURL=compiler_facade.js.map