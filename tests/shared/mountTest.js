import React from 'react';
import { mount } from 'enzyme';

export default function mountTest(Component) {
  describe(`mount and unmount`, () => {
    // https://github.com/ant-design/ant-design/pull/18441
    it(`component could be updated and unmounted without errors`, () => {
      const wrapper = mount(<Component />);
      expect(() => {
        wrapper.setProps({});
        wrapper.unmount();
      }).not.toThrow();
    });
  });
}
