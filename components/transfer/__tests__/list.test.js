import React from 'react';
import { mount } from 'enzyme';
import List from '../list';
import Checkbox from '../../checkbox';

const listCommonProps = {
  prefixCls: 'ant-transfer-list',
  dataSource: [
    {
      key: 'a',
      title: 'a',
    },
    {
      key: 'b',
      title: 'b',
    },
    {
      key: 'c',
      title: 'c',
      disabled: true,
    },
  ],
  checkedKeys: ['a'],
  notFoundContent: 'Not Found',
  lazy: false,
};

describe('Transfer.List', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    const wrapper = mount(<List {...listCommonProps} />);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('ListBody').state().mounted).toBeTruthy();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should check top Checkbox while all available items are checked', () => {
    const wrapper = mount(<List {...listCommonProps} checkedKeys={['a', 'b']} />);
    expect(
      wrapper
        .find('.ant-transfer-list-header')
        .find(Checkbox)
        .prop('checked'),
    ).toBeTruthy();
  });

  it('when component has been unmounted, componentWillUnmount should be called', () => {
    const wrapper = mount(<List {...listCommonProps} />);
    const willUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.unmount();
    expect(willUnmount).toHaveBeenCalled();
  });

  it('when value is not exists, handleFilter should return', () => {
    const handleFilter = jest.fn();
    const wrapper = mount(<List {...listCommonProps} handleFilter={handleFilter} />);
    expect(wrapper.instance().handleFilter({ target: 'test' })).toBe(undefined);
    expect(handleFilter).toHaveBeenCalled();
  });
});
