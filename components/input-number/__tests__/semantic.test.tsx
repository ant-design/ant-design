import React from 'react';

import InputNumber from '..';
import { render } from '../../../tests/utils';

describe('semantic', () => {
  it('should support classNames and styles', () => {
    const testClassNames = {
      root: 'test-root',
      prefix: 'test-prefix',
      input: 'test-input',
      suffix: 'test-suffix',
      actions: 'test-handle',
    };
    const testStyles = {
      root: { color: 'black' },
      prefix: { color: 'red' },
      input: { backgroundColor: 'blue' },
      suffix: { color: 'green' },
      actions: { color: 'yellow' },
    };
    const { container } = render(
      <InputNumber
        prefix="suffix"
        className="my-class-name"
        suffix={<i>antd</i>}
        styles={testStyles}
        classNames={testClassNames}
      />,
    );
    const root = container.querySelector('.my-class-name')!;
    const input = container.querySelector('.ant-input-number')!;
    const prefix = container.querySelector('.ant-input-number-prefix')!;
    const suffix = container.querySelector('.ant-input-number-suffix')!;
    const actions = container.querySelector('.ant-input-number-handler-wrap')!;
    expect(root.className).toContain(testClassNames.root);
    expect(input.className).toContain(testClassNames.input);
    expect(prefix.className).toContain(testClassNames.prefix);
    expect(suffix.className).toContain(testClassNames.suffix);
    expect(actions.className).toContain(testClassNames.actions);
    expect(root).toHaveStyle(testStyles.root);
    expect(prefix).toHaveStyle(testStyles.prefix);
    expect(input).toHaveStyle(testStyles.input);
    expect(suffix).toHaveStyle(testStyles.suffix);
    expect(actions).toHaveStyle(testStyles.actions);
  });
});
