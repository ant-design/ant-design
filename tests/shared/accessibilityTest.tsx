import React from 'react';
import { mount } from 'enzyme';
import { axe } from 'jest-axe';

// eslint-disable-next-line jest/no-export
export default function accessibilityTest(Component: React.ComponentType) {
  describe(`accessibility`, () => {
    it(`component does not have any violations`, async () => {
      jest.useRealTimers();
      const wrapper = mount(<Component />);
      const results = await axe(wrapper.getDOMNode());
      expect(results).toHaveNoViolations();
    });
  });
}
