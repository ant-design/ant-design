import React from 'react';
import userEvent from '@testing-library/user-event';

import type { InputNumberProps } from '..';
import InputNumber from '..';
import { act, fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { FormInstance } from '../../form';
import Form from '../../form';
import deDE from '../../locale/de_DE';
import zhCN from '../../locale/zh_CN';
import Space from '../../space';

describe('InputNumber allowClear', () => {
  it.each([123, 0])('clears the uncontrolled value %s and notifies once', (defaultValue) => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const { getByRole, container } = render(
      <InputNumber allowClear defaultValue={defaultValue} onChange={onChange} onClear={onClear} />,
    );
    const input = getByRole('spinbutton');
    const clear = getByRole('button', { name: 'Clear' });

    expect(clear.querySelector('.anticon-close-circle')).toBeInTheDocument();
    fireEvent.click(clear);

    expect(input).toHaveValue('');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(null);
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(clear).toBeDisabled();

    fireEvent.mouseDown(container.querySelector('.ant-input-number-action-up')!);
    fireEvent.mouseUp(container.querySelector('.ant-input-number-action-up')!);
    expect(input).toHaveValue('1');
  });

  it('clears raw intermediate input when the numeric value is already empty', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const { getByRole } = render(<InputNumber allowClear onChange={onChange} onClear={onClear} />);
    const input = getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '-' } });
    fireEvent.click(getByRole('button', { name: 'Clear' }));

    expect(input).toHaveValue('');
    expect(onChange).not.toHaveBeenCalled();
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('notifies without overriding a controlled value', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const { getByRole } = render(
      <InputNumber allowClear value={123} onChange={onChange} onClear={onClear} />,
    );

    fireEvent.click(getByRole('button', { name: 'Clear' }));

    expect(getByRole('spinbutton')).toHaveValue('123');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(null);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('clears when the controlled parent accepts null', () => {
    const Demo = () => {
      const [value, setValue] = React.useState<number | null>(123);
      return <InputNumber allowClear value={value} onChange={setValue} />;
    };
    const { getByRole } = render(<Demo />);

    fireEvent.click(getByRole('button', { name: 'Clear' }));

    expect(getByRole('spinbutton')).toHaveValue('');
  });

  it('preserves the null contract with stringMode and precision', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <InputNumber allowClear stringMode precision={2} defaultValue="1.23" onChange={onChange} />,
    );

    fireEvent.click(getByRole('button', { name: 'Clear' }));

    expect(getByRole('spinbutton')).toHaveValue('');
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it.each<InputNumberProps>([
    { disabled: true },
    { readOnly: true },
    { allowClear: { disabled: true } },
  ])('keeps the clear action disabled with %j', (props) => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const { getByRole } = render(
      <InputNumber
        allowClear
        defaultValue={1}
        styles={{ clear: { visibility: 'visible' } }}
        onChange={onChange}
        onClear={onClear}
        {...props}
      />,
    );
    const clear = getByRole('button', { name: 'Clear' });

    expect(clear).toBeDisabled();
    fireEvent.click(clear);
    expect(getByRole('spinbutton')).toHaveValue('1');
    expect(onChange).not.toHaveBeenCalled();
    expect(onClear).not.toHaveBeenCalled();
  });

  it('inherits the disabled state from ConfigProvider', () => {
    const { container } = render(
      <ConfigProvider componentDisabled>
        <InputNumber allowClear defaultValue={1} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-input-number-clear-icon')).toBeDisabled();
  });

  it('preserves the value when allowClear is toggled', () => {
    const { getByRole, queryByRole, rerender } = render(<InputNumber defaultValue={1} />);
    const input = getByRole('spinbutton');
    expect(queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: '7' } });

    rerender(<InputNumber allowClear defaultValue={1} />);
    expect(input).toHaveValue('7');
    rerender(<InputNumber allowClear={false} defaultValue={1} />);
    expect(input).toHaveValue('7');
    rerender(<InputNumber allowClear defaultValue={1} />);
    fireEvent.click(getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');
  });

  it('supports a custom icon and accessible label without clearing the suffix', () => {
    const { getByRole, getByText } = render(
      <ConfigProvider locale={zhCN}>
        <InputNumber
          allowClear={{
            clearIcon: <span aria-label="Icon label">custom</span>,
            label: 'Reset amount',
          }}
          defaultValue={1}
          suffix="kg"
        />
      </ConfigProvider>,
    );
    const clear = getByRole('button', { name: 'Reset amount' });
    expect(clear).toHaveTextContent('custom');

    fireEvent.click(clear);

    expect(getByText('kg')).toBeVisible();
    expect(getByRole('spinbutton')).toHaveValue('');
  });

  it.each([
    { locale: zhCN, label: zhCN.global!.clear! },
    { locale: deDE, label: 'Clear' },
  ])('uses the global clear label with locale $locale.locale', ({ locale, label }) => {
    const { getByRole } = render(
      <ConfigProvider locale={locale}>
        <InputNumber allowClear defaultValue={1} />
      </ConfigProvider>,
    );

    expect(getByRole('button', { name: label })).toBeInTheDocument();
  });

  it('merges ConfigProvider clear settings and supports an explicit opt-out', () => {
    const Demo = ({ allowClear }: Pick<InputNumberProps, 'allowClear'>) => (
      <ConfigProvider
        inputNumber={{
          allowClear: { clearIcon: 'context icon', label: 'Context clear', disabled: true },
        }}
      >
        <InputNumber defaultValue={1} allowClear={allowClear} />
      </ConfigProvider>
    );
    const { container, getByRole, rerender } = render(<Demo />);
    expect(container.querySelector('.ant-input-number-clear-icon')).toBeDisabled();

    rerender(<Demo allowClear={{ disabled: false }} />);
    expect(getByRole('button', { name: 'Context clear' })).toHaveTextContent('context icon');
    expect(getByRole('button', { name: 'Context clear' })).toBeEnabled();

    rerender(
      <Demo allowClear={{ disabled: false, clearIcon: 'local icon', label: 'Local clear' }} />,
    );
    expect(getByRole('button', { name: 'Local clear' })).toHaveTextContent('local icon');

    rerender(<Demo allowClear={false} />);
    expect(container.querySelector('.ant-input-number-clear-icon')).not.toBeInTheDocument();
    expect(getByRole('spinbutton')).toHaveValue('1');
  });

  it('keeps focus and remains clickable inside the suffix', async () => {
    const user = userEvent.setup();
    const onBlur = jest.fn();
    const { getByRole } = render(<InputNumber allowClear defaultValue={1} onBlur={onBlur} />);
    const input = getByRole('spinbutton');
    await user.click(input);
    await user.click(getByRole('button', { name: 'Clear' }));

    expect(input).toHaveFocus();
    expect(input).toHaveValue('');
    expect(onBlur).not.toHaveBeenCalled();
  });

  it.each(['{Enter}', '[Space]'])('clears with %s and returns focus to the input', async (keys) => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onPressEnter = jest.fn();
    const { getByRole } = render(
      <InputNumber allowClear defaultValue={1} onChange={onChange} onPressEnter={onPressEnter} />,
    );
    const input = getByRole('spinbutton');
    act(() => input.focus());
    await user.tab();
    expect(getByRole('button', { name: 'Clear' })).toHaveFocus();
    await user.keyboard(keys);

    expect(input).toHaveFocus();
    expect(input).toHaveValue('');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(null);
    expect(onPressEnter).not.toHaveBeenCalled();
  });

  it('lets Escape propagate without triggering a step or committing raw controlled input', () => {
    const onKeyDown = jest.fn();
    const onChange = jest.fn();
    const onStep = jest.fn();
    const { getByRole } = render(
      <div onKeyDown={onKeyDown}>
        <InputNumber allowClear value={1} onChange={onChange} onStep={onStep} />
      </div>,
    );
    const input = getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '2' } });
    onChange.mockClear();
    const clear = getByRole('button', { name: 'Clear' });
    act(() => clear.focus());

    fireEvent.keyDown(clear, { key: 'ArrowUp' });
    fireEvent.keyDown(clear, { key: 'Escape' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onStep).not.toHaveBeenCalled();

    fireEvent.click(clear);
    expect(onChange.mock.calls).toEqual([[null]]);
    expect(input).toHaveValue('1');
    expect(input).toHaveFocus();
  });

  it('updates the Form field to null and preserves validation feedback', async () => {
    const user = userEvent.setup();
    const formRef = React.createRef<FormInstance>();
    const { getByRole, container } = render(
      <Form ref={formRef} initialValues={{ amount: 1 }}>
        <Form.Item name="amount" label="Amount" hasFeedback validateStatus="success">
          <InputNumber allowClear />
        </Form.Item>
      </Form>,
    );

    await user.click(getByRole('button', { name: 'Clear' }));

    expect(formRef.current?.getFieldValue('amount')).toBeNull();
    expect(getByRole('spinbutton', { name: 'Amount' })).toHaveValue('');
    expect(container.querySelector('.ant-form-item-feedback-icon-success')).toBeVisible();
  });

  it('merges clear semantic classes and styles from ConfigProvider and props', () => {
    const { getByRole } = render(
      <ConfigProvider
        inputNumber={{
          allowClear: true,
          classNames: { clear: 'context-clear' },
          styles: { clear: { color: 'red', backgroundColor: 'yellow' } },
        }}
      >
        <InputNumber
          defaultValue={1}
          classNames={({ props }) => ({ clear: props.allowClear ? 'local-clear' : '' })}
          styles={{ clear: { color: 'blue' } }}
        />
      </ConfigProvider>,
    );
    const clear = getByRole('button', { name: 'Clear' });

    expect(clear).toHaveClass('context-clear', 'local-clear');
    expect(clear).toHaveStyle('color: rgb(0, 0, 255); background-color: rgb(255, 255, 0)');
  });

  it.each(['ltr', 'rtl'] as const)(
    'reserves end padding for the spinner clear button in %s',
    (direction) => {
      const { getByRole } = render(
        <ConfigProvider direction={direction}>
          <InputNumber allowClear mode="spinner" defaultValue={1} />
        </ConfigProvider>,
      );
      const clear = getByRole('button', { name: 'Clear' });

      expect(getComputedStyle(clear.parentElement!).marginInlineEnd).toBe(
        'var(--ant-input-number-input-padding-inline)',
      );
    },
  );

  it.each<InputNumberProps['variant']>(['outlined', 'filled', 'borderless', 'underlined'])(
    'supports %s with RTL, compact sizing and spinner mode',
    (variant) => {
      const { container, getByRole, getByText } = render(
        <ConfigProvider direction="rtl" componentSize="small">
          <Space.Compact>
            <InputNumber allowClear defaultValue={0} mode="spinner" suffix="kg" variant={variant} />
          </Space.Compact>
        </ConfigProvider>,
      );

      fireEvent.click(getByRole('button', { name: 'Clear' }));

      expect(getByRole('spinbutton')).toHaveValue('');
      expect(getByText('kg')).toBeVisible();
      expect(container.querySelector('.ant-input-number')).toHaveClass(
        `ant-input-number-${variant}`,
        'ant-input-number-rtl',
        'ant-input-number-sm',
        'ant-input-number-mode-spinner',
      );
    },
  );
});
