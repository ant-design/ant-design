/* eslint no-use-before-define: "off" */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Transfer from '..';

const listProps = {
  dataSource: [
    {
      key: 'a',
      title: 'a',
      disabled: true,
    },
    {
      key: 'b',
      title: 'b',
    },
    {
      key: 'c',
      title: 'c',
    },
    {
      key: 'd',
      title: 'd',
    },
    {
      key: 'e',
      title: 'e',
    },
  ],
  selectedKeys: ['b'],
  targetKeys: [],
  pagination: { pageSize: 4 },
};

describe('Transfer.Dropdown', () => {
  function clickItem(wrapper, index) {
    wrapper.find('li.ant-dropdown-menu-item').at(index).simulate('click');
  }

  it('select all', () => {
    jest.useFakeTimers();

    const onSelectChange = jest.fn();
    const wrapper = mount(<Transfer {...listProps} onSelectChange={onSelectChange} />);
    wrapper.find('.ant-transfer-list-header-dropdown').first().simulate('mouseenter');
    act(() => {
      jest.runAllTimers();
    });
    wrapper.update();

    clickItem(wrapper.find('.ant-dropdown-menu').first(), 0);
    expect(onSelectChange).toHaveBeenCalledWith(['b', 'c', 'd', 'e'], []);

    jest.useRealTimers();
  });

  it('select current page', () => {
    jest.useFakeTimers();

    const onSelectChange = jest.fn();
    const wrapper = mount(<Transfer {...listProps} onSelectChange={onSelectChange} />);
    wrapper.find('.ant-transfer-list-header-dropdown').first().simulate('mouseenter');
    act(() => {
      jest.runAllTimers();
    });
    wrapper.update();

    clickItem(wrapper.find('.ant-dropdown-menu').first(), 1);
    expect(onSelectChange).toHaveBeenCalledWith(['b', 'c', 'd'], []);

    jest.useRealTimers();
  });

  it('select invert', () => {
    jest.useFakeTimers();

    const onSelectChange = jest.fn();
    const wrapper = mount(<Transfer {...listProps} onSelectChange={onSelectChange} />);
    wrapper.find('.ant-transfer-list-header-dropdown').first().simulate('mouseenter');
    act(() => {
      jest.runAllTimers();
    });
    wrapper.update();

    clickItem(wrapper.find('.ant-dropdown-menu').first(), 2);
    expect(onSelectChange).toHaveBeenCalledWith(['c', 'd'], []);

    jest.useRealTimers();
  });

  it('oneWay to remove', () => {
    jest.useFakeTimers();

    const onChange = jest.fn();
    const wrapper = mount(
      <Transfer {...listProps} targetKeys={['b', 'c']} oneWay onChange={onChange} />,
    );
    wrapper.find('.ant-transfer-list-header-dropdown').last().simulate('mouseenter');
    act(() => {
      jest.runAllTimers();
    });
    wrapper.update();

    clickItem(wrapper.find('.ant-dropdown-menu').first(), 0);
    expect(onChange).toHaveBeenCalledWith([], 'left', ['b', 'c']);

    jest.useRealTimers();
  });
});
