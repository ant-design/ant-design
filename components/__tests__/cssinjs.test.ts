import * as cssinjs from '@ant-design/cssinjs';

import * as antd from '..';

describe('antd cssinjs re-export', () => {
  // `<StyleProvider layer>` works by writing to a React context which ConfigProvider compares by
  // identity. Re-exporting a wrapper (or a re-implemented component) instead of the exact reference
  // would silently disable `layer` without any error, so the identity has to be pinned down here.
  it('should expose the exact references from @ant-design/cssinjs', () => {
    expect(antd.StyleProvider).toBe(cssinjs.StyleProvider);
    expect(antd.createCache).toBe(cssinjs.createCache);
    expect(antd.extractStyle).toBe(cssinjs.extractStyle);
    expect(antd.autoPrefixTransformer).toBe(cssinjs.autoPrefixTransformer);
    expect(antd.legacyLogicalPropertiesTransformer).toBe(
      cssinjs.legacyLogicalPropertiesTransformer,
    );
    expect(antd.px2remTransformer).toBe(cssinjs.px2remTransformer);
  });
});
