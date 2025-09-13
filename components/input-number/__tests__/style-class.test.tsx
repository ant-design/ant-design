import React from 'react';
import { render } from '../../../tests/utils';
import InputNumber, { InputNumberProps } from '../index';

describe('InputNumber useMergeSemantic', () => {
  it('should merge classNames and styles correctly', () => {
    const { container } = render(
      <InputNumber
        prefix="$"
        suffix="USD"
        className="my-class-name"
        classNames={{
          root: 'test-root',
          input: 'test-input',
          prefix: 'test-prefix',
          suffix: 'test-suffix',
          actions: 'test-handle',
        }}
        styles={{
          root: { color: 'rgb(255, 0, 0)' },
          input: { backgroundColor: 'rgb(0, 0, 255)' },
          prefix: { color: 'rgb(58, 32, 32)' },
          suffix: { color: 'rgb(0, 255, 0)' },
          actions: { color: 'rgb(255, 255, 0)' },
        }}
        defaultValue={42}
      />,
    );

    const root = container.querySelector('.my-class-name')!;
    const input = container.querySelector('.ant-input-number')!;
    const prefix = container.querySelector('.ant-input-number-prefix')!;
    const suffix = container.querySelector('.ant-input-number-suffix')!;
    const actions = container.querySelector('.ant-input-number-handler-wrap')!;

    expect(root.className).toContain('test-root');
    expect(input.className).toContain('test-input');
    expect(prefix.className).toContain('test-prefix');
    expect(suffix.className).toContain('test-suffix');
    expect(actions.className).toContain('test-handle');
    expect(root).toHaveStyle('color: rgb(255, 0, 0)');
    expect(prefix).toHaveStyle('color: rgb(58, 32, 32)');
    expect(input).toHaveStyle('background-color: rgb(0, 0, 255)');
    expect(suffix).toHaveStyle('color: rgb(0, 255, 0)');
    expect(actions).toHaveStyle('color: rgb(255, 255, 0)');
  });

  it('should work with context classNames and styles', () => {
    const { container } = render(
      <InputNumber defaultValue={42} className="additional-class" style={{ margin: '10px' }} />,
    );

    const root = container.querySelector('.additional-class')!;
    expect(root).toHaveClass('ant-input-number');
    expect(root).toHaveStyle('margin: 10px');
  });

  it('should match snapshot with classNames and styles', () => {
    const { container } = render(
      <InputNumber
        prefix="$"
        suffix="USD"
        className="snapshot-test-class"
        classNames={{
          root: 'snapshot-root',
          input: 'snapshot-input',
          prefix: 'snapshot-prefix',
          suffix: 'snapshot-suffix',
          actions: 'snapshot-actions',
        }}
        styles={{
          root: { color: 'rgb(255, 0, 0)', fontSize: '16px' },
          input: { backgroundColor: 'rgb(0, 0, 255)', padding: '8px' },
          prefix: { color: 'rgb(58, 32, 32)', fontWeight: 'bold' },
          suffix: { color: 'rgb(0, 255, 0)', fontSize: '14px' },
          actions: { color: 'rgb(255, 255, 0)', border: '1px solid red' },
        }}
        defaultValue={123.45}
        size="large"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot with minimal props', () => {
    const { container } = render(<InputNumber defaultValue={0} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot with different sizes', () => {
    const { container } = render(
      <div>
        <InputNumber size="small" defaultValue={1} />
        <InputNumber size="middle" defaultValue={2} />
        <InputNumber size="large" defaultValue={3} />
      </div>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should support function for classNames and styles', () => {
    const classNamesFn = (info: { props: InputNumberProps }) => ({
      root: info.props.disabled ? 'test-disabled' : 'test-enabled',
    });

    const stylesFn = (info: { props: InputNumberProps }) => ({
      root: {
        borderColor: info.props.size === 'large' ? 'red' : 'blue',
      },
    });

    const { container, rerender } = render(
      <InputNumber classNames={classNamesFn} styles={stylesFn} />,
    );

    const root = container.querySelector('.ant-input-number')!;
    expect(root).toHaveClass('test-enabled');
    expect(root).toHaveStyle('border-color: blue');

    rerender(<InputNumber classNames={classNamesFn} styles={stylesFn} disabled />);
    expect(root).toHaveClass('test-disabled');

    rerender(<InputNumber classNames={classNamesFn} styles={stylesFn} size="large" />);
    expect(root).toHaveStyle('border-color: red');
  });
});
