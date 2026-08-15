import React from 'react';

import InputNumber from '..';
import { fireEvent, render } from '../../../tests/utils';

describe('InputNumber allowClear', () => {
  it('clears an uncontrolled value and emits both callbacks', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const { container } = render(
      <InputNumber allowClear defaultValue={123} onChange={onChange} onClear={onClear} />,
      { container: document.body },
    );
    const input = container.querySelector('input')!;
    const clearButton = container.querySelector<HTMLButtonElement>('.ant-input-number-clear-icon')!;

    fireEvent.click(clearButton);

    expect(input).toHaveValue('');
    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(clearButton).toHaveClass('ant-input-number-clear-icon-hidden');
    expect(input).toHaveFocus();
  });

  it('clears a value entered into an uncontrolled input', () => {
    const onChange = jest.fn();
    const { container } = render(<InputNumber allowClear onChange={onChange} />);
    const input = container.querySelector('input')!;
    const clearButton = container.querySelector<HTMLButtonElement>('.ant-input-number-clear-icon')!;

    expect(clearButton).toHaveClass('ant-input-number-clear-icon-hidden');

    fireEvent.change(input, { target: { value: '42' } });
    expect(input).toHaveValue('42');
    expect(clearButton).not.toHaveClass('ant-input-number-clear-icon-hidden');

    fireEvent.click(clearButton);
    expect(input).toHaveValue('');
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('keeps a controlled value when the owner does not update it', () => {
    const onChange = jest.fn();
    const { container } = render(<InputNumber allowClear value={7} onChange={onChange} />);
    const input = container.querySelector('input')!;
    const clearButton = container.querySelector<HTMLButtonElement>('.ant-input-number-clear-icon')!;

    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith(null);
    expect(input).toHaveValue('7');
    expect(clearButton).not.toHaveClass('ant-input-number-clear-icon-hidden');
  });

  it('clears a controlled value when the owner updates it', () => {
    const App: React.FC = () => {
      const [value, setValue] = React.useState<number | null>(7);
      return <InputNumber allowClear value={value} onChange={setValue} />;
    };
    const { container } = render(<App />);
    const input = container.querySelector('input')!;
    const clearButton = container.querySelector<HTMLButtonElement>('.ant-input-number-clear-icon')!;

    fireEvent.click(clearButton);

    expect(input).toHaveValue('');
    expect(clearButton).toHaveClass('ant-input-number-clear-icon-hidden');
  });

  it('allows zero to be cleared', () => {
    const onChange = jest.fn();
    const { container } = render(<InputNumber allowClear defaultValue={0} onChange={onChange} />);
    const clearButton = container.querySelector<HTMLButtonElement>('.ant-input-number-clear-icon')!;

    expect(clearButton).not.toHaveClass('ant-input-number-clear-icon-hidden');
    fireEvent.click(clearButton);

    expect(container.querySelector('input')).toHaveValue('');
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('clears stringMode values with null', () => {
    const onChange = jest.fn();
    const { container } = render(
      <InputNumber stringMode allowClear defaultValue="12345678901234567890" onChange={onChange} />,
    );

    fireEvent.click(container.querySelector('.ant-input-number-clear-icon')!);

    expect(container.querySelector('input')).toHaveValue('');
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it.each([
    ['disabled', { disabled: true }],
    ['readOnly', { readOnly: true }],
    ['allowClear.disabled', { allowClear: { disabled: true } }],
  ])('hides the clear button when %s', (_name, extraProps) => {
    const { container } = render(<InputNumber allowClear defaultValue={123} {...extraProps} />);

    expect(container.querySelector('.ant-input-number-clear-icon')).toHaveClass(
      'ant-input-number-clear-icon-hidden',
    );
  });

  it('supports a custom clear icon alongside a suffix', () => {
    const { container } = render(
      <InputNumber
        allowClear={{ clearIcon: <span data-testid="custom-clear">clear</span> }}
        defaultValue={123}
        suffix="USD"
      />,
    );

    expect(container.querySelector('[data-testid="custom-clear"]')).toBeInTheDocument();
    expect(container.querySelector('.ant-input-number-suffix')).toHaveTextContent('clearUSD');
    expect(container.querySelector('.ant-input-number-clear-icon')).toHaveClass(
      'ant-input-number-clear-icon-has-suffix',
    );
  });

  it('does not blur the input on clear button mouse down', () => {
    const onBlur = jest.fn();
    const { container } = render(<InputNumber allowClear defaultValue={123} onBlur={onBlur} />, {
      container: document.body,
    });
    const input = container.querySelector('input')!;
    const clearButton = container.querySelector('.ant-input-number-clear-icon')!;

    input.focus();
    fireEvent.mouseDown(clearButton);
    fireEvent.click(clearButton);

    expect(onBlur).not.toHaveBeenCalled();
    expect(input).toHaveFocus();
  });
});
