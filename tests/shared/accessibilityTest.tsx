import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

export default function accessibilityTest(Component: React.ComponentType) {
  describe(`accessibility`, () => {
    it(`component does not have any violations`, async () => {
      vi.useRealTimers();
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
}
