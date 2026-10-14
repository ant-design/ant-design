import React from 'react';
import userEvent from '@testing-library/user-event';

import { fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import Input from '../../input';
import InputNumber from '../../input-number';
import zhCN from '../../locale/zh_CN';
import Mentions from '../../mentions';
import type { AllowClear } from '../hooks';

describe.each([
  { name: 'Input', Component: Input, configKey: 'input' },
  { name: 'TextArea', Component: Input.TextArea, configKey: 'textArea' },
  { name: 'Mentions', Component: Mentions, configKey: 'mentions' },
] as const)('$name allowClear.tabIndex', ({ Component, configKey }) => {
  it('keeps the clear button keyboard accessible by default', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <Component defaultValue="value" allowClear={{ clearIcon: 'Clear' }} />,
    );

    await user.tab();
    expect(getByRole('textbox')).toHaveFocus();
    await user.tab();
    expect(getByRole('button', { name: 'Clear' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(getByRole('textbox')).toHaveValue('');
  });

  it('skips the clear button with tabIndex -1 and still allows clicking to clear', async () => {
    const user = userEvent.setup();
    const onClear = jest.fn();
    const { getByRole } = render(
      <>
        <Component
          aria-label="Value"
          defaultValue="value"
          allowClear={{ clearIcon: 'Clear', tabIndex: -1 }}
          onClear={onClear}
        />
        <input aria-label="Next" />
      </>,
    );

    await user.tab();
    expect(getByRole('textbox', { name: 'Value' })).toHaveFocus();
    await user.tab();
    expect(getByRole('textbox', { name: 'Next' })).toHaveFocus();
    await user.tab({ shift: true });
    expect(getByRole('textbox', { name: 'Value' })).toHaveFocus();
    await user.click(getByRole('button', { name: 'Clear' }));
    expect(getByRole('textbox', { name: 'Value' })).toHaveValue('');
    expect(getByRole('textbox', { name: 'Value' })).toHaveFocus();
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('inherits the global tabIndex and lets the component override it with 0', () => {
    const Demo = ({ allowClear }: { allowClear?: AllowClear }) => (
      <ConfigProvider {...{ [configKey]: { allowClear: { clearIcon: 'Clear', tabIndex: -1 } } }}>
        <Component defaultValue="value" allowClear={allowClear} />
      </ConfigProvider>
    );
    const { getByRole, queryByRole, rerender } = render(<Demo />);
    expect(getByRole('button', { name: 'Clear' })).toHaveAttribute('tabindex', '-1');

    rerender(<Demo allowClear />);
    expect(getByRole('button', { name: 'Clear' })).toHaveAttribute('tabindex', '-1');

    rerender(<Demo allowClear={{ tabIndex: 0 }} />);
    expect(getByRole('button', { name: 'Clear' })).toHaveAttribute('tabindex', '0');

    rerender(<Demo allowClear={false} />);
    expect(queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
  });
});

type ClearProps = { allowClear?: AllowClear; onClear?: () => void };
const clearCases = [
  {
    name: 'Input',
    configKey: 'input',
    render: (props: ClearProps) => <Input defaultValue="value" {...props} />,
  },
  {
    name: 'TextArea',
    configKey: 'textArea',
    render: (props: ClearProps) => <Input.TextArea defaultValue="value" {...props} />,
  },
  {
    name: 'Search',
    configKey: 'input',
    render: (props: ClearProps) => <Input.Search defaultValue="value" {...props} />,
  },
  {
    name: 'Password',
    configKey: 'input',
    render: (props: ClearProps) => <Input.Password defaultValue="value" {...props} />,
  },
  {
    name: 'Mentions',
    configKey: 'mentions',
    render: (props: ClearProps) => <Mentions defaultValue="value" {...props} />,
  },
  {
    name: 'InputNumber',
    configKey: 'inputNumber',
    render: (props: ClearProps) => <InputNumber defaultValue={0} {...props} />,
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
