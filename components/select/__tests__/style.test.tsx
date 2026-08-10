import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import Select from '..';
import { render } from '../../../tests/utils';

describe('Select.Style', () => {
  it('should reset clear button background', () => {
    const cache = createCache();

    render(
      <StyleProvider cache={cache}>
        <Select allowClear defaultValue="value" options={[{ value: 'value' }]} />
      </StyleProvider>,
    );

    expect(extractStyle(cache)).toMatch(/\.ant-select-clear\{[^}]*background:transparent/);
  });
});
