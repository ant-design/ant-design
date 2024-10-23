import React from 'react';
import { render } from '@testing-library/react';
import { globSync } from 'glob';
import { axe } from 'jest-axe';

// eslint-disable-next-line jest/no-export
export default function accessibilityTest(Component: React.ComponentType) {
  describe(`accessibility`, () => {
    it(`component does not have any violations`, async () => {
      jest.useRealTimers();
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
}

type Options = {
  skip?: boolean | string[];
};

// eslint-disable-next-line jest/no-export
export function accessibilityDemoTest(component: string, options: Options = {}) {
  // If skip is true, return immediately without executing any tests
  if (options.skip === true) {
    describe.skip(`${component} demo a11y`, () => {
      it('skipped', () => {});
    });
    return;
  }

  describe(`${component} demo a11y`, () => {
    const files = globSync(`./components/${component}/demo/*.tsx`).filter(
      (file) => !file.includes('_semantic') && !file.includes('-debug'),
    );

    files.forEach((file) => {
      const shouldSkip = Array.isArray(options.skip) && options.skip.some((c) => file.endsWith(c));
      const testMethod = shouldSkip ? describe.skip : describe;

      testMethod(`Test ${file} accessibility`, () => {
        const Demo = require(`../../${file}`).default;
        accessibilityTest(Demo);
      });
    });
  });
}
