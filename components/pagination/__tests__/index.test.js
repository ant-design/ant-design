import React from 'react';
import { render, mount } from 'enzyme';
import Pagination from '..';
import ConfigProvider from '../../config-provider';
import mountTest from '../../../tests/shared/mountTest';

describe('Pagination', () => {
  mountTest(Pagination);

  it('should be rendered correctly in RTL', () => {
    const wrapper = mount(
      <ConfigProvider direction="rtl">
        <Pagination defaultCurrent={1} total={50} />
      </ConfigProvider>,
    );
    expect(render(wrapper)).toMatchSnapshot();
  });
});
