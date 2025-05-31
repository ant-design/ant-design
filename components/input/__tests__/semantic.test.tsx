import React from 'react';
import { render } from '@testing-library/react';

import Input from '..';

const testClassNames = {
  root: 'custom-root',
  prefix: 'custom-prefix',
  input: 'custom-input',
  textarea: 'custom-textarea',
  suffix: 'custom-suffix',
  count: 'custom-count',
  separator: 'custom-separator',
  button: {
    root: 'custom-button-root',
    icon: 'custom-button-icon',
    content: 'custom-button-content',
  },
};

const testStyles = {
  root: { color: 'red' },
  input: { color: 'blue' },
  textarea: { color: 'green' },
  prefix: { color: 'yellow' },
  suffix: { color: 'purple' },
  count: { color: 'orange' },
  separator: { color: 'pink' },
  button: {
    root: { color: 'cyan' },
    icon: { color: 'magenta' },
    content: { color: 'lime' },
  },
};

describe('semantic dom', () => {
  it('input should support classNames and styles', () => {
    const { container } = render(
      <Input
        value="123"
        showCount
        prefix="prefix"
        suffix="suffix"
        classNames={testClassNames}
        styles={testStyles}
      />,
    );

    const root = container.querySelector('.ant-input-affix-wrapper');
    const input = container.querySelector('.ant-input');
    const prefix = container.querySelector('.ant-input-prefix');
    const suffix = container.querySelector('.ant-input-suffix');
    const count = container.querySelector('.ant-input-show-count-suffix');

    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(input).toHaveClass(testClassNames.input);
    expect(input).toHaveStyle(testStyles.input);
    expect(prefix).toHaveClass(testClassNames.prefix);
    expect(prefix).toHaveStyle(testStyles.prefix);
    expect(suffix).toHaveClass(testClassNames.suffix);
    expect(suffix).toHaveStyle(testStyles.suffix);
    expect(count).toHaveClass(testClassNames.count);
    expect(count).toHaveStyle(testStyles.count);
  });

  it('textarea should support classNames and styles', () => {
    const { container } = render(
      <Input.TextArea classNames={testClassNames} styles={testStyles} showCount />,
    );

    const root = container.querySelector('.ant-input-textarea-affix-wrapper');
    const textarea = container.querySelector('textarea');
    const count = container.querySelector('.ant-input-data-count');

    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(textarea).toHaveClass(testClassNames.textarea);
    expect(textarea).toHaveStyle(testStyles.textarea);
    expect(count).toHaveClass(testClassNames.count);
    expect(count).toHaveStyle(testStyles.count);
  });

  it('search should support classNames and styles', () => {
    const { container, getByText } = render(
      <Input.Search
        loading
        enterButton="button text"
        classNames={testClassNames}
        styles={testStyles}
        showCount
        prefix="prefix"
        suffix="suffix"
      />,
    );

    const root = container.querySelector('.ant-input-search');
    const input = container.querySelector('.ant-input');
    const prefix = container.querySelector('.ant-input-prefix');
    const suffix = container.querySelector('.ant-input-suffix');
    const button = container.querySelector('.ant-btn');
    const buttonIcon = container.querySelector('.ant-btn-icon');
    const buttonContent = getByText('button text');
    const count = container.querySelector('.ant-input-show-count-suffix');

    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(input).toHaveClass(testClassNames.input);
    expect(input).toHaveStyle(testStyles.input);
    expect(prefix).toHaveClass(testClassNames.prefix);
    expect(prefix).toHaveStyle(testStyles.prefix);
    expect(suffix).toHaveClass(testClassNames.suffix);
    expect(suffix).toHaveStyle(testStyles.suffix);
    expect(button).toHaveClass(testClassNames.button.root);
    expect(button).toHaveStyle(testStyles.button.root);
    expect(buttonIcon).toHaveClass(testClassNames.button.icon);
    expect(buttonIcon).toHaveStyle(testStyles.button.icon);
    expect(buttonContent).toHaveClass(testClassNames.button.content);
    expect(buttonContent).toHaveStyle(testStyles.button.content);
    expect(count).toHaveClass(testClassNames.count);
    expect(count).toHaveStyle(testStyles.count);
  });

  it('password should support classNames and styles', () => {
    const { container } = render(
      <Input.Password
        classNames={testClassNames}
        styles={testStyles}
        showCount
        prefix="prefix"
        suffix="suffix"
      />,
    );
    const root = container.querySelector('.ant-input-affix-wrapper');
    const input = container.querySelector('.ant-input');
    const prefix = container.querySelector('.ant-input-prefix');
    const suffix = container.querySelector('.ant-input-suffix');
    const count = container.querySelector('.ant-input-show-count-suffix');

    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(input).toHaveClass(testClassNames.input);
    expect(input).toHaveStyle(testStyles.input);
    expect(prefix).toHaveClass(testClassNames.prefix);
    expect(prefix).toHaveStyle(testStyles.prefix);
    expect(suffix).toHaveClass(testClassNames.suffix);
    expect(suffix).toHaveStyle(testStyles.suffix);
    expect(count).toHaveClass(testClassNames.count);
    expect(count).toHaveStyle(testStyles.count);
  });

  it('otp should support classNames and styles', () => {
    const { container } = render(
      <Input.OTP separator="-" classNames={testClassNames} styles={testStyles} />,
    );
    const root = container.querySelector('.ant-otp');
    const input = container.querySelector('.ant-input');
    const separator = container.querySelector('.ant-otp-separator');
    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(input).toHaveClass(testClassNames.input);
    expect(input).toHaveStyle(testStyles.input);
    expect(separator).toHaveClass(testClassNames.separator);
    expect(separator).toHaveStyle(testStyles.separator);
  });
});
