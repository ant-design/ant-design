import React from 'react';
import { render } from '../../../tests/utils';
import InputNumber from '../index';
import type { InputNumberProps } from '../index';

describe('InputNumber useMergeSemantic', () => {
  it('should merge classNames and styles correctly', () => {
    const { container } = render(
      <InputNumber
        className="my-class-name"
        classNames={{
          root: 'test-root',
        }}
        styles={{
          root: { color: 'rgb(255, 0, 0)' },
        }}
        defaultValue={42}
      />,
    );

    const root = container.querySelector('.my-class-name')!;
    expect(root.className).toContain('test-root');
    expect(root).toHaveStyle('color: rgb(255, 0, 0)');
  });

  it('should work with context classNames and styles', () => {
    const { container } = render(
      <InputNumber defaultValue={42} className="additional-class" style={{ margin: '10px' }} />,
    );

    const root = container.querySelector('.additional-class')!;
    expect(root).toHaveClass('ant-input-number');
    expect(root).toHaveStyle('margin: 10px');
  });

  it('should support function for styles based on size', () => {
    const stylesFn = (info: { props: InputNumberProps }) => ({
      root: {
        backgroundColor: info.props.size === 'large' ? '#1677FF' : '#fffbe6',
      },
    });

    const { container, rerender } = render(<InputNumber styles={stylesFn} size="large" />);

    const root = container.querySelector('.ant-input-number')!;
    expect(root).toHaveStyle('background-color: #1677FF');

    rerender(<InputNumber styles={stylesFn} size="middle" />);
    expect(root).toHaveStyle('background-color: #fffbe6');
  });
});
