import React from 'react';
import { render } from '../../../tests/utils';
import type { TransferListProps } from '../list';
import List from '../list';

const listCommonProps: TransferListProps<any> = {
  prefixCls: 'ant-transfer-list',
  dataSource: [
    { key: 'a', title: 'a' },
    { key: 'b', title: 'b' },
    { key: 'c', title: 'c', disabled: true },
  ],
  checkedKeys: ['a'],
  notFoundContent: 'Not Found',
} as TransferListProps<any>;

const listProps: TransferListProps<any> = {
  ...listCommonProps,
  dataSource: undefined as unknown as any[],
};

describe('Transfer.List', () => {
  it('should render correctly', () => {
    const { container } = render(<List {...listCommonProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should check top Checkbox while all available items are checked', () => {
    const { container } = render(<List {...listCommonProps} checkedKeys={['a', 'b']} />);
    expect(
      container.querySelector<HTMLInputElement>('.ant-transfer-list-header input[type="checkbox"]')
        ?.checked,
    ).toBeTruthy();
  });

  it('should render correctly when dataSource is not exists', () => {
    expect(() => {
      render(<List {...listProps} />);
    }).not.toThrow();
  });
});
