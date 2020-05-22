import React from 'react';
import { mount } from 'enzyme';
import Theming from '../../components/varnish';

const { ThemeProvider } = Theming;

// eslint-disable-next-line jest/no-export
export default function mountTest(Component: React.ComponentType) {
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
