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
      actions: 'test-actions',
      action: 'test-action',
    };
    const testStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      prefix: { color: 'rgb(58, 32, 32)' },
      input: { backgroundColor: 'rgb(0, 0, 255)' },
      suffix: { color: 'rgb(0, 255, 0)' },
      actions: { color: 'rgb(255, 255, 0)' },
      action: { color: 'rgb(255, 0, 255)' },
    };
    const { container } = render(
      <InputNumber
        prefix="prefix"
        className="my-class-name"
        suffix={<i>antd</i>}
        styles={testStyles}
        classNames={testClassNames}
      />,
    );
    const root = container.querySelector('.my-class-name')!;
    const input = container.querySelector('.ant-input-number-input')!;
    const prefix = container.querySelector('.ant-input-number-prefix')!;
    const suffix = container.querySelector('.ant-input-number-suffix')!;
    const actions = container.querySelector('.ant-input-number-actions')!;
    const action = container.querySelector('.ant-input-number-action')!;
    expect(root.className).toContain(testClassNames.root);
    expect(input.className).toContain(testClassNames.input);
    expect(prefix.className).toContain(testClassNames.prefix);
    expect(suffix.className).toContain(testClassNames.suffix);
    expect(actions.className).toContain(testClassNames.actions);
    expect(action.className).toContain(testClassNames.action);
    expect(root).toHaveStyle(testStyles.root);
    expect(prefix).toHaveStyle(testStyles.prefix);
    expect(input).toHaveStyle(testStyles.input);
    expect(suffix).toHaveStyle(testStyles.suffix);
    expect(actions).toHaveStyle(testStyles.actions);
    expect(action).toHaveStyle(testStyles.action);
  });
});
