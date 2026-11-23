import React from 'react';
import dayjs from 'dayjs';

import { fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import DatePicker from '../../date-picker';
import zhCN from '../../locale/zh_CN';
import TimePicker from '../../time-picker';
import type { AllowClear } from '../hooks';

const date = dayjs('2026-10-13');
type ClearProps = { allowClear?: AllowClear; onClear?: () => void };
const clearCases = [
  {
    name: 'DatePicker',
    configKey: 'datePicker',
    render: (props: ClearProps) => <DatePicker defaultValue={date} {...props} />,
  },
  {
    name: 'RangePicker',
    configKey: 'datePicker',
    render: (props: ClearProps) => (
      <DatePicker.RangePicker defaultValue={[date, date]} {...props} />
    ),
  },
  {
    name: 'TimePicker',
    configKey: 'timePicker',
    render: (props: ClearProps) => <TimePicker defaultValue={date} {...props} />,
  },
  {
    name: 'TimeRangePicker',
    configKey: 'timePicker',
    render: (props: ClearProps) => (
      <TimePicker.RangePicker defaultValue={[date, date]} {...props} />
    ),
  },
] as const;

describe.each(clearCases)('$name unified allowClear', ({ configKey, render: renderComponent }) => {
  it('removes the clear entry when disabled and restores its configuration when enabled', () => {
    const onClear = jest.fn();
    const config = {
      clearIcon: <span data-testid="clear-icon">Custom</span>,
      label: 'Remove value',
      tabIndex: -1,
    };
    const { getByRole, queryByRole, queryByTestId, rerender } = render(
      renderComponent({ allowClear: config, onClear }),
    );
    expect(getByRole('button', { name: 'Remove value' })).toHaveAttribute('tabindex', '-1');
    rerender(renderComponent({ allowClear: { ...config, disabled: true }, onClear }));
    expect(queryByRole('button', { name: 'Remove value', hidden: true })).not.toBeInTheDocument();
    expect(queryByTestId('clear-icon')).not.toBeInTheDocument();
    expect(onClear).not.toHaveBeenCalled();
    rerender(renderComponent({ allowClear: { ...config, disabled: false }, onClear }));
    expect(getByRole('button', { name: 'Remove value' })).toHaveAttribute('tabindex', '-1');
    expect(queryByTestId('clear-icon')).toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: 'Remove value' }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('updates the localized label and preserves an explicit label', () => {
    const Demo = ({
      chinese,
      allowClear = true,
    }: {
      chinese?: boolean;
      allowClear?: AllowClear;
    }) => (
      <ConfigProvider locale={chinese ? zhCN : undefined}>
        {renderComponent({ allowClear })}
      </ConfigProvider>
    );
    const { getByRole, rerender } = render(<Demo />);
    expect(getByRole('button', { name: 'Clear' })).toBeInTheDocument();
    rerender(<Demo chinese />);
    expect(getByRole('button', { name: '清除' })).toBeInTheDocument();
    rerender(<Demo chinese allowClear={{ label: 'Remove value' }} />);
    expect(getByRole('button', { name: 'Remove value' })).toBeInTheDocument();
  });

  if (configKey) {
    it('merges fields before normalization and preserves explicit false and zero overrides', () => {
      const contextAllowClear = {
        clearIcon: <span data-testid="global-clear">Custom</span>,
        disabled: true,
        tabIndex: -1,
        label: 'Global clear',
      };
      const Demo = ({ allowClear }: ClearProps) => (
        <ConfigProvider {...{ [configKey]: { allowClear: contextAllowClear } }}>
          {renderComponent({ allowClear })}
        </ConfigProvider>
      );
      const { getByRole, queryByTestId, rerender } = render(<Demo />);
      expect(queryByTestId('global-clear')).not.toBeInTheDocument();
      rerender(<Demo allowClear />);
      expect(queryByTestId('global-clear')).not.toBeInTheDocument();
      rerender(<Demo allowClear={{ tabIndex: 0 }} />);
      expect(queryByTestId('global-clear')).not.toBeInTheDocument();
      rerender(<Demo allowClear={{ disabled: false }} />);
      expect(getByRole('button', { name: 'Global clear' })).toHaveAttribute('tabindex', '-1');
      expect(queryByTestId('global-clear')).toBeInTheDocument();
      rerender(<Demo allowClear={{ disabled: false, tabIndex: 0, label: 'Local clear' }} />);
      expect(getByRole('button', { name: 'Local clear' })).toHaveAttribute('tabindex', '0');
      expect(queryByTestId('global-clear')).toBeInTheDocument();
      rerender(<Demo allowClear={false} />);
      expect(queryByTestId('global-clear')).not.toBeInTheDocument();
    });
  }
});

it('uses the picker locale as the default clear label', () => {
  const locale = { ...zhCN.DatePicker!, lang: { ...zhCN.DatePicker!.lang, clear: 'Clear date' } };
  const { getByRole, rerender } = render(<DatePicker defaultValue={date} locale={locale} />);
  expect(getByRole('button', { name: 'Clear date' })).toBeInTheDocument();
  rerender(<DatePicker.RangePicker defaultValue={[date, date]} locale={locale} />);
  expect(getByRole('button', { name: 'Clear date' })).toBeInTheDocument();
});
