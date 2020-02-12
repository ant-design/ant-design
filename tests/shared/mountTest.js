import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from '../../components/style/themes/varnish';

// eslint-disable-next-line jest/no-export
export default function mountTest(Component) {
  describe(`mount and unmount`, () => {
    // https://github.com/ant-design/ant-design/pull/18441
    it(`component could be updated and unmounted without errors`, () => {
      const wrapper = mount(
        <ThemeProvider>
          <Component />
        </ThemeProvider>,
      );
      expect(() => {
        wrapper.setProps({});
        wrapper.unmount();
      }).not.toThrow();
    });
  });
}
