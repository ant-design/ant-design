import React from 'react';

import { fireEvent, render } from '../../../tests/utils';
import AutoComplete from '../../auto-complete';
import Cascader from '../../cascader';
import ConfigProvider from '../../config-provider';
import zhCN from '../../locale/zh_CN';
import Select from '../../select';
import TreeSelect from '../../tree-select';
import type { AllowClear } from '../hooks';

type ClearProps = { allowClear?: AllowClear; onClear?: () => void };
const clearCases = [
  {
    name: 'Select',
    configKey: 'select',
    render: (props: ClearProps) => (
      <Select defaultValue="value" options={[{ value: 'value' }]} {...props} />
    ),
  },
  {
    name: 'AutoComplete',
    configKey: undefined,
    render: (props: ClearProps) => <AutoComplete defaultValue="value" {...props} />,
  },
  {
    name: 'TreeSelect',
    configKey: 'treeSelect',
    render: (props: ClearProps) => (
      <TreeSelect defaultValue="value" treeData={[{ value: 'value', title: 'Value' }]} {...props} />
    ),
  },
  {
    name: 'Cascader',
    configKey: undefined,
    render: (props: ClearProps) => (
      <Cascader
        defaultValue={['value']}
        options={[{ value: 'value', label: 'Value' }]}
        {...props}
      />
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

it.each([true, {}, { tabIndex: 0 }])(
  'keeps AutoComplete outside select.allowClear configuration (%j)',
  (allowClear) => {
    const { getByRole, queryByTestId } = render(
      <ConfigProvider
        select={{
          allowClear: {
            clearIcon: <span data-testid="select-clear" />,
            disabled: true,
            tabIndex: -1,
            label: 'Select clear',
          },
        }}
      >
        <AutoComplete defaultValue="value" allowClear={allowClear} />
      </ConfigProvider>,
    );
    expect(getByRole('button', { name: 'Clear' })).not.toHaveAttribute('tabindex', '-1');
    expect(queryByTestId('select-clear')).not.toBeInTheDocument();
  },
);
