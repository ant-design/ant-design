import React from 'react';
import { mount } from 'enzyme';
import Search from '../search';
import Transfer from '../index';

describe('Search', () => {
  it('should show cross icon when input value exists', () => {
    const wrapper = mount(<Search value="" />);

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ value: 'a' });

    expect(wrapper).toMatchSnapshot();
  });

  it('onSearch', () => {
    const dataSource = [{
      key: 'a',
      title: 'a',
      description: 'a',
    }, {
      key: 'b',
      title: 'b',
      description: 'b',
    }, {
      key: 'c',
      title: 'c',
      description: 'c',
    }];

    const onSearch = jest.fn();
    const wrapper = mount(
      <Transfer
        dataSource={dataSource}
        selectedKeys={[]}
        targetKeys={[]}
        render={item => item.title}
        onSearch={onSearch}
        showSearch
      />
    );

    wrapper.find('.ant-input').at(0).simulate('change', { target: { value: 'a' } });
    expect(onSearch).toBeCalledWith('left', 'a');

    onSearch.mockReset();

    wrapper.find('.ant-transfer-list-search-action').at(0).simulate('click');
    expect(onSearch).toBeCalledWith('left', '');
  });
});
