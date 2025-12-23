import React from 'react';

import Form from '..';
import { render } from '../../../tests/utils';
import Input from '../../input';

describe('Form.Semantic', () => {
  it('support classNames and styles', () => {
    const customClassNames = {
      root: 'test-root',
      label: 'test-label',
      content: 'test-content',
    };
    const customStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      label: { color: 'rgb(0, 255, 0)' },
      content: { color: 'rgb(0, 0, 255)' },
    };
    const { container } = render(
      <Form classNames={customClassNames} styles={customStyles}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
      </Form>,
    );
    const root = container.querySelector('.ant-form');
    const label = container.querySelector('.ant-form-item-required');
    const content = container.querySelector('.ant-form-item-control-input-content');
    expect(root).toHaveClass(customClassNames.root);
    expect(label).toHaveClass(customClassNames.label);
    expect(content).toHaveClass(customClassNames.content);
    expect(root).toHaveStyle(customStyles.root);
    expect(label).toHaveStyle(customStyles.label);
    expect(content).toHaveStyle(customStyles.content);
  });

  it('should support useMergeSemantic with mergedProps', () => {
    const semanticClassNames = {
      root: 'semantic-form-root',
      label: 'semantic-form-label',
      content: 'semantic-form-content',
    };

    const semanticStyles = {
      root: { backgroundColor: '#f0f0f0' },
      label: { color: '#333333', fontWeight: 600 },
      content: { padding: '16px' },
    };

    const { container } = render(
      <Form
        layout="vertical"
        size="large"
        disabled={false}
        classNames={semanticClassNames}
        styles={semanticStyles}
      >
        <Form.Item label="Username" name="username" required>
          <Input />
        </Form.Item>
      </Form>,
    );

    const root = container.querySelector('.ant-form');
    const label = container.querySelector('.ant-form-item-label label');
    const content = container.querySelector('.ant-form-item-control-input-content');

    // Check semantic class names
    expect(root).toHaveClass('semantic-form-root');
    expect(label).toHaveClass('semantic-form-label');
    expect(content).toHaveClass('semantic-form-content');

    // Check semantic styles
    expect(root).toHaveStyle('background-color: rgb(240, 240, 240)');
    expect(label).toHaveStyle('color: rgb(51, 51, 51)');
    expect(label).toHaveStyle('font-weight: 600');
    expect(content).toHaveStyle('padding: 16px');
  });

  it('should support function-based semantic classNames and styles', () => {
    const dynamicClassNames = () => ({
      root: 'dynamic-form-root',
      label: 'dynamic-form-label',
    });

    const dynamicStyles = () => ({
      root: { borderRadius: '8px' },
      label: { fontSize: '14px' },
    });

    const { container } = render(
      <Form classNames={dynamicClassNames} styles={dynamicStyles}>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
      </Form>,
    );

    const root = container.querySelector('.ant-form');
    const label = container.querySelector('.ant-form-item-label label');

    expect(root).toHaveClass('dynamic-form-root');
    expect(label).toHaveClass('dynamic-form-label');
    expect(root).toHaveStyle('border-radius: 8px');
    expect(label).toHaveStyle('font-size: 14px');
  });
});
