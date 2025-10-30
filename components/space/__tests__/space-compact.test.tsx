import React from 'react';

import Space from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';
import AutoComplete from '../../auto-complete';
import Button from '../../button';
import Cascader from '../../cascader';
import ConfigProvider from '../../config-provider';
import DatePicker from '../../date-picker';
import Drawer from '../../drawer';
import Dropdown from '../../dropdown';
import Input from '../../input';
import InputNumber from '../../input-number';
import Modal from '../../modal';
import Select from '../../select';
import TimePicker from '../../time-picker';
import Tooltip from '../../tooltip';
import TreeSelect from '../../tree-select';

describe('Space.Compact', () => {
  mountTest(Space.Compact);
  mountTest(() => (
    <Space.Compact>
      <Button type="primary">Submit</Button>
    </Space.Compact>
  ));

  rtlTest(Space.Compact);
  rtlTest(() => (
    <Space.Compact>
      <Button type="primary">Submit</Button>
    </Space.Compact>
  ));

  it('should render width empty children', () => {
    const { container } = render(<Space.Compact />);

    expect(container.children.length).toBe(0);
  });

  it('block className', () => {
    const { container } = render(
      <Space.Compact block>
        <Input defaultValue="https://ant.design" />
        <Button type="primary">Submit</Button>
      </Space.Compact>,
    );
    expect(container.querySelector('.ant-space-compact')).toHaveClass('ant-space-compact-block');
  });

  it('compact-item className', () => {
    const { container } = render(
      <Space.Compact>
        <Input className="test-input" />
        <Input.Search className="test-input-search" />
        <Button className="test-button">Submit</Button>
      </Space.Compact>,
    );
    expect(container.querySelector('.test-input')).toHaveClass('ant-input-compact-first-item');
    expect(container.querySelector('.test-input-search')).toHaveClass('ant-space-compact');
    expect(container.querySelector('.test-input-search input')).toHaveClass(
      'ant-input-compact-item',
    );
    expect(container.querySelector('.test-button')).toHaveClass('ant-btn-compact-last-item');
  });

  [
    {
      name: 'Button',
      component: Button,
      targetCls: 'ant-btn',
      expectClsPrefix: 'ant-btn',
    },
    {
      name: 'AutoComplete',
      component: AutoComplete,
      targetCls: 'ant-select',
      expectClsPrefix: 'ant-select',
    },
    {
      name: 'Cascader',
      component: Cascader,
      targetCls: 'ant-cascader',
      expectClsPrefix: 'ant-select',
    },
    {
      name: 'DatePicker',
      component: DatePicker,
      targetCls: 'ant-picker',
      expectClsPrefix: 'ant-picker',
    },
    {
      name: 'Input',
      component: Input,
      targetCls: 'ant-input',
      expectClsPrefix: 'ant-input',
    },
    {
      name: 'Select',
      component: Select,
      targetCls: 'ant-select',
      expectClsPrefix: 'ant-select',
    },
    {
      name: 'TimePicker',
      component: TimePicker,
      targetCls: 'ant-picker',
      expectClsPrefix: 'ant-picker',
    },
    {
      name: 'TreeSelect',
      component: TreeSelect,
      targetCls: 'ant-select',
      expectClsPrefix: 'ant-select',
    },
  ].forEach(({ component, name, targetCls, expectClsPrefix }) => {
    it(`compact-item for ${name}`, () => {
      const { container } = render(
        <Space.Compact>{React.createElement(component as any)}</Space.Compact>,
      );
      expect(container.querySelectorAll(`.${targetCls}`).length).toBe(1);
      ['compact-item', 'compact-first-item', 'compact-last-item'].forEach((suffix) => {
        if (name === 'Input.Search' && suffix === 'compact-last-item') {
          return;
        }
        expect(container.querySelector(`.${targetCls}`)).toHaveClass(
          [expectClsPrefix, suffix].join('-'),
        );
      });
    });
  });
  it('compact-item for Input.Search', () => {
    const { container } = render(
      <Space.Compact>
        <Input.Search />
      </Space.Compact>,
    );
    expect(container.querySelector('.ant-input-search')).toBeTruthy();
    expect(container.querySelector(`.ant-input-search`)).toHaveClass('ant-space-compact');
  });

  it('size', () => {
    const { container } = render(
      <Space.Compact size="small">
        <Input defaultValue="https://ant.design" />
        <Button type="primary">Submit</Button>
      </Space.Compact>,
    );
    expect(container.querySelector('.ant-input')).toHaveClass('ant-input-sm');
    expect(container.querySelector('.ant-btn')).toHaveClass('ant-btn-sm');
  });

  it('component size has a higher priority than Compact', () => {
    const { container } = render(
      <Space.Compact size="middle">
        <Input size="small" />
        <Select size="small" />
        <Button size="small">Submit</Button>
        <InputNumber size="small" />
        <DatePicker size="small" />
        <DatePicker.RangePicker size="small" />
        <Cascader size="small" />
        <TreeSelect size="small" />
        <Input.Search size="small" />
      </Space.Compact>,
    );
    expect(container.querySelector('.ant-input')).toHaveClass('ant-input-sm');
    expect(container.querySelector('.ant-select')).toHaveClass('ant-select-sm');
    expect(container.querySelector('.ant-btn')).toHaveClass('ant-btn-sm');
    expect(container.querySelector('.ant-input-number')).toHaveClass('ant-input-number-sm');
    expect(container.querySelector('.ant-picker')).toHaveClass('ant-picker-small');
    expect(container.querySelector('.ant-picker-range')).toHaveClass('ant-picker-small');
    expect(container.querySelector('.ant-cascader')).toHaveClass('ant-select-sm');
    expect(container.querySelector('.ant-tree-select')).toHaveClass('ant-select-sm');
    expect(container.querySelector('.ant-input-search')).toHaveClass('ant-input-search-small');
  });

  it('direction=vertical', () => {
    const { container } = render(
      <Space.Compact size="small" direction="vertical">
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
        <Button type="primary">Button 3</Button>
        <Button type="primary">Button 4</Button>
      </Space.Compact>,
    );
    expect(container.querySelector('.ant-space-compact')).toHaveClass('ant-space-compact-vertical');
    expect(container.querySelector('.ant-btn')).toHaveClass('ant-btn-compact-vertical-item');
    expect(container.querySelectorAll('.ant-btn')[0]).toHaveClass(
      'ant-btn-compact-vertical-first-item',
    );
    expect(container.querySelectorAll('.ant-btn')[3]).toHaveClass(
      'ant-btn-compact-vertical-last-item',
    );
  });

  it('context for Modal', () => {
    render(
      <Space.Compact size="small">
        <Modal title="Basic Modal" open>
          <Button>normal button A</Button>
          <Input />
        </Modal>
      </Space.Compact>,
    );
    expect(
      document.body
        .querySelectorAll<HTMLElement>('.ant-modal')[0]
        .querySelector<HTMLElement>('.ant-btn'),
    ).not.toHaveClass('ant-btn-compact-item');
    expect(
      document.body
        .querySelectorAll<HTMLElement>('.ant-modal')[0]
        .querySelector<HTMLElement>('.ant-input'),
    ).not.toHaveClass('ant-input-compact-item');
  });

  it('context for Dropdown', () => {
    render(
      <Space.Compact size="small">
        <Dropdown.Button open menu={{ items: [{ key: '1', label: <Button>menu button</Button> }] }}>
          debug Dropdown.Button context
        </Dropdown.Button>
      </Space.Compact>,
    );
    expect(document.body.querySelector('.ant-dropdown .ant-btn')).not.toHaveClass(
      'ant-btn-compact-item',
    );
  });

  it('context for Drawer', () => {
    render(
      <Space.Compact size="small">
        <Drawer title="Basic Drawer" open>
          <Button>normal button A</Button>
        </Drawer>
      </Space.Compact>,
    );
    expect(document.body.querySelector('.ant-drawer .ant-btn')).not.toHaveClass(
      'ant-btn-compact-item',
    );
  });

  it('context for Tooltip', () => {
    render(
      <Space.Compact>
        <Input placeholder="Debug Popover context" />
        <Tooltip
          open
          overlay={
            <>
              <Input placeholder="Left Border" />
              <DatePicker />
            </>
          }
          trigger={['click']}
          placement="bottom"
        >
          <Button>Settings</Button>
        </Tooltip>
      </Space.Compact>,
    );
    expect(document.body.querySelector('.ant-tooltip .ant-input')).not.toHaveClass(
      'ant-input-compact-item',
    );
    expect(document.body.querySelector('.ant-tooltip .ant-picker')).not.toHaveClass(
      'ant-picker-compact-item',
    );
  });

  it('Tooltip content supports function', () => {
    render(
      <Space.Compact>
        <Input placeholder="Debug Popover context" />
        <Tooltip
          open
          overlay={() => (
            <>
              <Input placeholder="Left Border" />
              <DatePicker />
            </>
          )}
        >
          <span>Tooltip will show on mouse enter.</span>
        </Tooltip>
      </Space.Compact>,
    );
    expect(document.body.querySelector('.ant-tooltip .ant-input')).not.toHaveClass(
      'ant-input-compact-item',
    );
    expect(document.body.querySelector('.ant-tooltip .ant-picker')).not.toHaveClass(
      'ant-picker-compact-item',
    );
  });

  // https://github.com/ant-design/ant-design/issues/41876
  it('Space.Compact should inherit the size from ConfigProvider if the componentSize is set', () => {
    const { container } = render(
      <ConfigProvider componentSize="large">
        <Space.Compact>
          <Select placeholder="Select" />
        </Space.Compact>
      </ConfigProvider>,
    );

    expect(container.querySelectorAll('.ant-select-lg')).toHaveLength(1);
  });

  it('The size property of Space.Compact should have an higher priority over the componentSize property of ConfigProvider', () => {
    const { container } = render(
      <ConfigProvider componentSize="large">
        <Space.Compact size="small">
          <Select placeholder="Select" />
        </Space.Compact>
      </ConfigProvider>,
    );

    expect(container.querySelectorAll('.ant-select-sm')).toHaveLength(1);
  });
});
