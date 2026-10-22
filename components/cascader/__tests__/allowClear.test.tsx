import React from 'react';

import type { CascaderProps } from '..';
import Cascader from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

type AllowClear = CascaderProps['allowClear'];

describe('Cascader allowClear with ConfigProvider', () => {
  it('lets component props override a globally disabled clear button', () => {
    const Demo = ({ allowClear }: { allowClear?: AllowClear }) => (
      <ConfigProvider cascader={{ allowClear: false }}>
        <Cascader
          defaultValue={['value']}
          options={[{ value: 'value', label: 'Value' }]}
          allowClear={allowClear}
        />
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
      <ConfigProvider cascader={{ allowClear: { tabIndex: -1, label: 'Outer clear' } }}>
        <ConfigProvider
          cascader={innerAllowClear === undefined ? undefined : { allowClear: innerAllowClear }}
        >
          <Cascader defaultValue={['value']} options={[{ value: 'value', label: 'Value' }]} />
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
