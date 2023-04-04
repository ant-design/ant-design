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
  const selectLikeNodes = (
    <>
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
    </>
  );

  it('disable virtual if is false', () => {
    const { container } = render(
      <ConfigProvider virtual={false}>{selectLikeNodes}</ConfigProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('disable virtual if dropdownMatchSelectWidth is false', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <ConfigProvider dropdownMatchSelectWidth={false}>{selectLikeNodes}</ConfigProvider>,
    );

    expect(container).toMatchSnapshot();

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: ConfigProvider] `dropdownMatchSelectWidth` is deprecated. Please use `popupMatchSelectWidth` instead.',
    );
    errSpy.mockRestore();
  });

  it('disable virtual if popupMatchSelectWidth is false', () => {
    const { container } = render(
      <ConfigProvider popupMatchSelectWidth={false}>{selectLikeNodes}</ConfigProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
