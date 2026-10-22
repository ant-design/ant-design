import React from 'react';

import type { TreeSelectProps } from '..';
import TreeSelect from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

type AllowClear = TreeSelectProps['allowClear'];

describe('TreeSelect allowClear with ConfigProvider', () => {
  it('lets component props override a globally disabled clear button', () => {
    const Demo = ({ allowClear }: { allowClear?: AllowClear }) => (
      <ConfigProvider treeSelect={{ allowClear: false }}>
        <TreeSelect
          defaultValue="value"
          treeData={[{ value: 'value', title: 'Value' }]}
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
      <ConfigProvider treeSelect={{ allowClear: { tabIndex: -1, label: 'Outer clear' } }}>
        <ConfigProvider
          treeSelect={innerAllowClear === undefined ? undefined : { allowClear: innerAllowClear }}
        >
          <TreeSelect defaultValue="value" treeData={[{ value: 'value', title: 'Value' }]} />
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
