import type { TriggerProps, TriggerRef } from '@rc-component/trigger';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';
import ConfigProvider from '..';
import { render } from '../../../tests/utils';
import Cascader from '../../cascader';
import Select from '../../select';
import TreeSelect from '../../tree-select';

dayjs.extend(customParseFormat);
jest.mock('rc-util/lib/Portal');

function triggerProps(): TriggerProps {
  return (global as any).triggerProps;
}

jest.mock('@rc-component/trigger', () => {
  const R: typeof React = jest.requireActual('react');
  const Trigger = jest.requireActual('@rc-component/trigger').default;
  return R.forwardRef<TriggerRef, TriggerProps>((props, ref) => {
    (global as any).triggerProps = props;
    return <Trigger {...props} ref={ref} />;
  });
});

describe('ConfigProvider.Popup', () => {
  beforeEach(() => {
    (global as any).triggerProps = null;
  });

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

  describe('config popupOverflow', () => {
    it('Select', () => {
      render(
        <ConfigProvider popupOverflow="scroll">
          <Select open />
        </ConfigProvider>,
      );

      expect(triggerProps().builtinPlacements!.topLeft!.htmlRegion).toBe('scroll');
    });

    it('TreeSelect', () => {
      render(
        <ConfigProvider popupOverflow="scroll">
          <TreeSelect open />
        </ConfigProvider>,
      );

      expect(triggerProps().builtinPlacements!.topLeft!.htmlRegion).toBe('scroll');
    });

    it('Cascader', () => {
      render(
        <ConfigProvider popupOverflow="scroll">
          <Cascader open />
        </ConfigProvider>,
      );

      expect(triggerProps().builtinPlacements!.topLeft!.htmlRegion).toBe('scroll');
    });
  });
});
