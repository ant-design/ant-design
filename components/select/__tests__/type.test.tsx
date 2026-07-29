import * as React from 'react';

import AutoComplete from '../../auto-complete';
import Cascader from '../../cascader';
import TreeSelect from '../../tree-select';
import Select from '..';

describe('autoAdjustOverflow types', () => {
  it('supports Select-like components', () => {
    const components = [
      <Select key="select" autoAdjustOverflow={false} />,
      <AutoComplete key="auto-complete" autoAdjustOverflow={{ adjustX: 0, adjustY: 1 }} />,
      <TreeSelect key="tree-select" autoAdjustOverflow={false} />,
      <Cascader key="cascader" autoAdjustOverflow={{ adjustX: 1, adjustY: 0 }} />,
    ];

    expect(components).toHaveLength(4);
  });
});
