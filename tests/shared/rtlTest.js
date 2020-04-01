import React from 'react';
import Moment from 'moment';
import MockDate from 'mockdate';
import { render, mount } from 'enzyme';
import ConfigProvider from '../../components/config-provider';

// eslint-disable-next-line jest/no-export
export default function rtlTest(Component, mockDate) {
  describe(`rtl render`, () => {
    it(`component should be rendered correctly in RTL direction`, () => {
      if (mockDate) {
        MockDate.set(Moment('2000-09-28'));
      }
      const wrapper = mount(
        <ConfigProvider direction="rtl">
          <Component />
        </ConfigProvider>,
      );
      expect(render(wrapper)).toMatchSnapshot();
      if (mockDate) {
        MockDate.reset();
      }
    });
  });
}
