import React from 'react';
import { render, mount } from 'enzyme';
import ConfigProvider from '../../components/config-provider';

// eslint-disable-next-line jest/no-export
export default function rtlTest(Component) {
  describe(`rtl render`, () => {
    it(`component should be rendered correctly in RTL direction`, () => {
      const wrapper = mount(
        <ConfigProvider direction="rtl">
          <Component />
        </ConfigProvider>,
      );
      expect(render(wrapper)).toMatchSnapshot();
    });
  });
}
