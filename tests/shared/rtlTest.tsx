import React from 'react';
import Moment from 'moment';
import MockDate from 'mockdate';
import { mount } from 'enzyme';
import ConfigProvider from '../../components/config-provider';
import Theming from '../../components/varnish';

const { ThemeProvider } = Theming;

// eslint-disable-next-line jest/no-export
export default function rtlTest(Component: React.ComponentType, mockDate?: boolean) {
  describe(`rtl render`, () => {
    it(`component should be rendered correctly in RTL direction`, () => {
      if (mockDate) {
        MockDate.set(Moment('2000-09-28').toDate());
      }
      const wrapper = mount(
        <ThemeProvider>
          <ConfigProvider direction="rtl">
            <Component />
          </ConfigProvider>
        </ThemeProvider>,
      );
      expect(wrapper).toMatchRenderedSnapshot();
      if (mockDate) {
        MockDate.reset();
      }
    });
  });
}
