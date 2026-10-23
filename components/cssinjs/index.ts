import type { createCache } from '@ant-design/cssinjs';

// Re-export the CSS-in-JS runtime, so that apps enabling `layer` (or extracting styles for SSR)
// never need to install `@ant-design/cssinjs` themselves. Declaring it separately is error prone:
// a version mismatch yields a second copy of the module, whose `StyleContext` antd can not read,
// which silently disables `<StyleProvider layer>`.
export {
  autoPrefixTransformer,
  createCache,
  extractStyle,
  legacyLogicalPropertiesTransformer,
  px2remTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';
export type { StyleProviderProps } from '@ant-design/cssinjs';
/**
 * Cache entity produced by `createCache()` and consumed by `StyleProvider` / `extractStyle`.
 * Derived from the return type because `@ant-design/cssinjs` does not export it from its root.
 */
export type Cache = ReturnType<typeof createCache>;
