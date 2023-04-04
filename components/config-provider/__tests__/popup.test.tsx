import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';
import ConfigProvider from '..';
import Cascader from '../../cascader';
import Select from '../../select';
import TreeSelect from '../../tree-select';
// eslint-disable-next-line import/no-named-as-default
import { render } from '../../../tests/utils';

dayjs.extend(customParseFormat);
jest.mock('rc-util/lib/Portal');

describe('ConfigProvider.Popup', () => {
  it('disable virtual if is false', () => {
    const { container } = render(
      <ConfigProvider virtual={false}>
        <Select
          open
          options={new Array(20).fill(null).map((_, index) => ({ value: index, label: index }))}
        />
        <TreeSelect
          open
          treeData={new Array(20).fill(null).map((_, index) => ({ value: index, title: index }))}
        />
        <Cascader
          open
          options={new Array(20).fill(null).map((_, index) => ({ value: index, label: index }))}
        />
      </ConfigProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
