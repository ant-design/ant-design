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
    expect(
      wrapper
        .find('button')
        .at(0)
        .props().disabled,
    ).toBe(true);
  });
});
