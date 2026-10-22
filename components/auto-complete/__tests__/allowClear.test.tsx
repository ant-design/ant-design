import React from 'react';

import type { AutoCompleteProps } from '..';
import AutoComplete from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import Select from '../../select';

type AllowClear = AutoCompleteProps['allowClear'];

describe('AutoComplete allowClear with ConfigProvider', () => {
  it('lets component props override a globally disabled clear button', () => {
    const Demo = ({ allowClear }: { allowClear?: AllowClear }) => (
      <ConfigProvider autoComplete={{ allowClear: false }}>
        <AutoComplete defaultValue="value" allowClear={allowClear} />
      </ConfigProvider>
    );
    const { getByRole, queryByRole, rerender } = render(<Demo />);
    expect(queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();

    rerender(<Demo allowClear />);
    expect(getByRole('button', { name: 'Clear' })).toBeInTheDocument();

    rerender(<Demo allowClear={false} />);
    expect(queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
  });

  it('inherits parent configuration and responds to nested provider updates', () => {
    const Demo = ({ innerAllowClear }: { innerAllowClear?: AllowClear }) => (
      <ConfigProvider autoComplete={{ allowClear: { tabIndex: -1, label: 'Outer clear' } }}>
        <ConfigProvider
          autoComplete={innerAllowClear === undefined ? undefined : { allowClear: innerAllowClear }}
        >
          <AutoComplete defaultValue="value" />
        </ConfigProvider>
      </ConfigProvider>
    );
    const { getByRole, queryByRole, rerender } = render(<Demo />);
    expect(getByRole('button', { name: 'Outer clear' })).toHaveAttribute('tabindex', '-1');

    rerender(<Demo innerAllowClear={{ label: 'Inner clear', tabIndex: 0 }} />);
    expect(getByRole('button', { name: 'Inner clear' })).toHaveAttribute('tabindex', '0');

    rerender(<Demo innerAllowClear={false} />);
    expect(queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();

    rerender(<Demo />);
    expect(getByRole('button', { name: 'Outer clear' })).toHaveAttribute('tabindex', '-1');
  });
});

it('keeps Select and AutoComplete global clear options independent', () => {
  const { getByRole } = render(
    <ConfigProvider
      autoComplete={{ allowClear: { label: 'Clear autocomplete', tabIndex: -1 } }}
      select={{ allowClear: { label: 'Clear select', tabIndex: 0 } }}
    >
      <AutoComplete defaultValue="value" />
      <Select defaultValue="value" options={[{ value: 'value' }]} />
    </ConfigProvider>,
  );
  expect(getByRole('button', { name: 'Clear autocomplete' })).toHaveAttribute('tabindex', '-1');
  expect(getByRole('button', { name: 'Clear select' })).toHaveAttribute('tabindex', '0');
});
