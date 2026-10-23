import * as cssinjs from '@ant-design/cssinjs';

import * as antdCssinjs from '../cssinjs';

describe('antd/cssinjs re-export', () => {
  // `<StyleProvider layer>` works by writing to a React context which ConfigProvider compares by
  // identity. Re-exporting a wrapper (or a re-implemented component) instead of the exact reference
  // would silently disable `layer` without any error, so the identity has to be pinned down here.
  it('should expose the exact references from @ant-design/cssinjs', () => {
    expect(antdCssinjs.StyleProvider).toBe(cssinjs.StyleProvider);
    expect(antdCssinjs.createCache).toBe(cssinjs.createCache);
    expect(antdCssinjs.extractStyle).toBe(cssinjs.extractStyle);
    expect(antdCssinjs.autoPrefixTransformer).toBe(cssinjs.autoPrefixTransformer);
    expect(antdCssinjs.legacyLogicalPropertiesTransformer).toBe(
      cssinjs.legacyLogicalPropertiesTransformer,
    );
    expect(antdCssinjs.px2remTransformer).toBe(cssinjs.px2remTransformer);
  });
});
