import React from 'react';
import { render, mount } from 'enzyme';
import Pagination from '..';
import ConfigProvider from '../../config-provider';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Pagination', () => {
  mountTest(Pagination);
  rtlTest(Pagination);

  it('should be rendered correctly in RTL', () => {
    const wrapper = mount(
      <ConfigProvider direction="rtl">
        <Pagination defaultCurrent={1} total={50} />
      </ConfigProvider>,
    );
    expect(render(wrapper)).toMatchSnapshot();
  });

  it('should pass disabled to prev and next buttons', () => {
    function itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return <button type="button">prev</button>;
      }
      if (type === 'next') {
        return <button type="button">next</button>;
      }
      return originalElement;
    }
    const wrapper = mount(<Pagination defaultCurrent={1} total={50} itemRender={itemRender} />);
    expect(wrapper.find('button').at(0).props().disabled).toBe(true);
  });

  it('should autometically be small when size is not specified', async () => {
    const wrapper = mount(<Pagination responsive />);
    expect(wrapper.find('ul').at(0).hasClass('mini')).toBe(true);
  });

  // https://github.com/ant-design/ant-design/issues/24913
  // https://github.com/ant-design/ant-design/issues/24501
  it('should onChange called when pageSize change', () => {
    const onChange = jest.fn();
    const onShowSizeChange = jest.fn();
    const wrapper = mount(
      <Pagination
        defaultCurrent={1}
        total={500}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />,
    );
    wrapper.find('.ant-select-selector').simulate('mousedown');
    expect(wrapper.find('.ant-select-item-option').length).toBe(4);
    wrapper.find('.ant-select-item-option').at(1).simulate('click');
    expect(onChange).toHaveBeenCalledWith(1, 20);
  });
});
