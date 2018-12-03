/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { providersResolver } from '../di_setup';
/**
 * This feature resolves the providers of a directive (or component),
 * and publish them into the DI system, making it visible to others for injection.
 *
 * For example:
 * class ComponentWithProviders {
 *   constructor(private greeter: GreeterDE) {}
 *
 *   static ngComponentDef = defineComponent({
 *     type: ComponentWithProviders,
 *     selectors: [['component-with-providers']],
 *    factory: () => new ComponentWithProviders(directiveInject(GreeterDE as any)),
 *    consts: 1,
 *    vars: 1,
 *    template: function(fs: RenderFlags, ctx: ComponentWithProviders) {
 *      if (fs & RenderFlags.Create) {
 *        text(0);
 *      }
 *      if (fs & RenderFlags.Update) {
 *        textBinding(0, bind(ctx.greeter.greet()));
 *      }
 *    },
 *    features: [ProvidersFeature([GreeterDE])]
 *  });
 * }
 *
 * @template T
 * @param {?} providers
 * @param {?=} viewProviders
 * @return {?}
 */
export function ProvidersFeature(providers, viewProviders) {
    if (viewProviders === void 0) { viewProviders = []; }
    return function (definition) {
        definition.providersResolver = function (def) {
            return providersResolver(def, providers, viewProviders);
        };
    };
}
//# sourceMappingURL=providers_feature.js.map