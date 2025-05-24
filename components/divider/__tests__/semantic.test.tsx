import * as React from 'react';

import Divider from '..';
import mountTest from '../../../tests/shared/mountTest';
import { render } from '../../../tests/utils';

describe('Divider', () => {
  mountTest(Divider);

  it('not show children when vertical', () => {
    const testClassNames = {
      root: 'test-root',
      rail: 'test-rail',
      content: 'test-content',
    };
    const testStyles = {
      root: { color: 'red' },
      rail: { color: 'blue' },
      content: { color: 'green' },
    };
    const { container } = render(
      <Divider classNames={testClassNames} styles={testStyles}>
        Text
      </Divider>,
    );
    const root = container.querySelector('.ant-divider');
    const rail = container.querySelector('.ant-divider-rail');
    const content = container.querySelector('.ant-divider-inner-text');
    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(rail).toHaveClass(testClassNames.rail);
    expect(rail).toHaveStyle(testStyles.rail);
    expect(content).toHaveClass(testClassNames.content);
    expect(content).toHaveStyle(testStyles.content);
  });
});
