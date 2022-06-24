import { mount } from 'enzyme';
import MockDate from 'mockdate';
import Moment from 'moment';
import React from 'react';
import ConfigProvider from '../../components/config-provider';

// eslint-disable-next-line jest/no-export
export default function rtlTest(Component: React.ComponentType<any>, mockDate?: boolean) {
  describe(`rtl render`, () => {
    it(`component should be rendered correctly in RTL direction`, () => {
      if (mockDate) {
        MockDate.set(Moment('2000-09-28').valueOf());
      }
      const wrapper = mount(
        <ConfigProvider direction="rtl">
          <Component />
        </ConfigProvider>,
      );
      expect(wrapper.render()).toMatchSnapshot();
      if (mockDate) {
        MockDate.reset();
      }
    });
  });
}
