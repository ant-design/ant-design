import React from 'react';
import { mount } from 'enzyme';
import Search from '../search';
import Transfer from '../index';

describe('Transfer.Search', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('should show cross icon when input value exists', () => {
    const wrapper = mount(<Search value="" />);

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ value: 'a' });

    expect(wrapper).toMatchSnapshot();
  });

  it('onSearch', () => {
    const dataSource = [
      {
        key: 'a',
        title: 'a',
        description: 'a',
      },
      {
        key: 'b',
        title: 'b',
        description: 'b',
      },
      {
        key: 'c',
        title: 'c',
        description: 'c',
      },
    ];

    const onSearch = jest.fn();
    const wrapper = mount(
      <Transfer
        dataSource={dataSource}
        selectedKeys={[]}
        targetKeys={[]}
        render={item => item.title}
        onSearch={onSearch}
        showSearch
      />,
    );

    wrapper
      .find('.ant-input')
      .at(0)
      .simulate('change', { target: { value: 'a' } });
    expect(onSearch).toHaveBeenCalledWith('left', 'a');

    onSearch.mockReset();

    wrapper
      .find('.ant-transfer-list-search-action')
      .at(0)
      .simulate('click');
    expect(onSearch).toHaveBeenCalledWith('left', '');
  });

  it('legacy onSearchChange', () => {
    const onSearchChange = jest.fn();

    const wrapper = mount(
      <Transfer render={item => item.title} onSearchChange={onSearchChange} showSearch />,
    );

    wrapper
      .find('.ant-input')
      .at(0)
      .simulate('change', { target: { value: 'a' } });

    expect(errorSpy.mock.calls[0][0]).toMatch(
      'Warning: [antd: Transfer] `onSearchChange` is deprecated. Please use `onSearch` instead.',
    );
    expect(onSearchChange.mock.calls[0][0]).toEqual('left');
    expect(onSearchChange.mock.calls[0][1].target.value).toEqual('a');
  });
});
