import React from 'react';
import type { TriggerProps, TriggerRef } from '@rc-component/trigger';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import ConfigProvider from '..';
import { fireEvent, getByRole, render } from '../../../tests/utils';
import Cascader from '../../cascader';
import Popconfirm from '../../popconfirm';
import Popover from '../../popover';
import Select from '../../select';
import Tooltip from '../../tooltip';
import TreeSelect from '../../tree-select';

dayjs.extend(customParseFormat);

jest.mock('@rc-component/util/lib/Portal');

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
      <Select open options={Array.from({ length: 20 }, (_, i) => ({ value: i, label: i }))} />
      <TreeSelect open treeData={Array.from({ length: 20 }, (_, i) => ({ value: i, title: i }))} />
      <Cascader open options={Array.from({ length: 20 }, (_, i) => ({ value: i, label: i }))} />
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

  describe('config trigger', () => {
    it('Overlay components (Popover/Popconfirm/Tooltip) should support trigger config', () => {
      const { container, baseElement } = render(
        <ConfigProvider
          popover={{ trigger: ['contextMenu'] }}
          popconfirm={{ trigger: ['contextMenu'] }}
          tooltip={{ trigger: ['contextMenu'] }}
        >
          <Popover content="content">
            <button type="button">popover</button>
          </Popover>
          <Popconfirm title="title">
            <button type="button">popconfirm</button>
          </Popconfirm>
          <Tooltip title="title">
            <button type="button">tooltip</button>
          </Tooltip>
        </ConfigProvider>,
      );

      fireEvent.contextMenu(getByRole(container, 'button', { name: 'popover' }));
      expect(baseElement.querySelector('.ant-popover')).toBeTruthy();

      fireEvent.contextMenu(getByRole(container, 'button', { name: 'popconfirm' }));
      expect(baseElement.querySelector('.ant-popconfirm')).toBeTruthy();

      fireEvent.contextMenu(getByRole(container, 'button', { name: 'tooltip' }));
      expect(baseElement.querySelector('.ant-tooltip')).toBeTruthy();
    });
  });

  describe('config tooltip delay', () => {
    it('should support mouseEnterDelay and mouseLeaveDelay global config', () => {
      render(
        <ConfigProvider tooltip={{ mouseEnterDelay: 1.5, mouseLeaveDelay: 0.5 }}>
          <Tooltip title="title">
            <button type="button">tooltip</button>
          </Tooltip>
        </ConfigProvider>,
      );

      expect(triggerProps().mouseEnterDelay).toBe(1.5);
      expect(triggerProps().mouseLeaveDelay).toBe(0.5);
    });

    it('component props should override global config', () => {
      render(
        <ConfigProvider tooltip={{ mouseEnterDelay: 1.5, mouseLeaveDelay: 0.5 }}>
          <Tooltip title="title" mouseEnterDelay={2} mouseLeaveDelay={1}>
            <button type="button">tooltip</button>
          </Tooltip>
        </ConfigProvider>,
      );

      expect(triggerProps().mouseEnterDelay).toBe(2);
      expect(triggerProps().mouseLeaveDelay).toBe(1);
    });

    it('should use default value when no global config', () => {
      render(
        <ConfigProvider>
          <Tooltip title="title">
            <button type="button">tooltip</button>
          </Tooltip>
        </ConfigProvider>,
      );

      expect(triggerProps().mouseEnterDelay).toBe(0.1);
      expect(triggerProps().mouseLeaveDelay).toBe(0.1);
    });
  });

  describe('config popover delay', () => {
    it('should support mouseEnterDelay and mouseLeaveDelay global config', () => {
      render(
        <ConfigProvider popover={{ mouseEnterDelay: 1.5, mouseLeaveDelay: 0.5 }}>
          <Popover title="title" content="content">
            <button type="button">popover</button>
          </Popover>
        </ConfigProvider>,
      );

      expect(triggerProps().mouseEnterDelay).toBe(1.5);
      expect(triggerProps().mouseLeaveDelay).toBe(0.5);
    });

    it('component props should override global config', () => {
      render(
        <ConfigProvider popover={{ mouseEnterDelay: 1.5, mouseLeaveDelay: 0.5 }}>
          <Popover title="title" content="content" mouseEnterDelay={2} mouseLeaveDelay={1}>
            <button type="button">popover</button>
          </Popover>
        </ConfigProvider>,
      );

      expect(triggerProps().mouseEnterDelay).toBe(2);
      expect(triggerProps().mouseLeaveDelay).toBe(1);
    });

    it('should use default value when no global config', () => {
      render(
        <ConfigProvider>
          <Popover title="title" content="content">
            <button type="button">popover</button>
          </Popover>
        </ConfigProvider>,
      );

      expect(triggerProps().mouseEnterDelay).toBe(0.1);
      expect(triggerProps().mouseLeaveDelay).toBe(0.1);
    });
  });

  describe('config popconfirm delay', () => {
    it('should support mouseEnterDelay and mouseLeaveDelay global config', () => {
      render(
        <ConfigProvider popconfirm={{ mouseEnterDelay: 1.5, mouseLeaveDelay: 0.5 }}>
          <Popconfirm title="title">
            <button type="button">popconfirm</button>
          </Popconfirm>
        </ConfigProvider>,
      );

      expect(triggerProps().mouseEnterDelay).toBe(1.5);
      expect(triggerProps().mouseLeaveDelay).toBe(0.5);
    });

    it('component props should override global config', () => {
      render(
        <ConfigProvider popconfirm={{ mouseEnterDelay: 1.5, mouseLeaveDelay: 0.5 }}>
          <Popconfirm title="title" mouseEnterDelay={2} mouseLeaveDelay={1}>
            <button type="button">popconfirm</button>
          </Popconfirm>
        </ConfigProvider>,
      );

      expect(triggerProps().mouseEnterDelay).toBe(2);
      expect(triggerProps().mouseLeaveDelay).toBe(1);
    });

    it('should use default value when no global config', () => {
      render(
        <ConfigProvider>
          <Popconfirm title="title">
            <button type="button">popconfirm</button>
          </Popconfirm>
        </ConfigProvider>,
      );

      expect(triggerProps().mouseEnterDelay).toBe(0.1);
      expect(triggerProps().mouseLeaveDelay).toBe(0.1);
    });
  });
});
