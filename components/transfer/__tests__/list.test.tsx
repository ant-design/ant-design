import React from 'react';
import type { KeyWiseTransferItem } from '..';
import type { TransferListProps } from '../list';
import { render } from '../../../tests/utils';
import List from '../list';

const listCommonProps: TransferListProps<KeyWiseTransferItem> = {
  prefixCls: 'ant-transfer-list',
  dataSource: [
    { key: 'a', title: 'a' },
    { key: 'b', title: 'b' },
    { key: 'c', title: 'c', disabled: true },
  ],
  checkedKeys: ['a'],
  notFoundContent: 'Not Found',
} as TransferListProps<KeyWiseTransferItem>;

const listProps: TransferListProps<KeyWiseTransferItem> = {
  ...listCommonProps,
  dataSource: undefined as unknown as KeyWiseTransferItem[],
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
