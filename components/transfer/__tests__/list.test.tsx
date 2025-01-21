import React from 'react';

import type { KeyWiseTransferItem } from '..';
import { fireEvent, render } from '../../../tests/utils';
import type { TransferListProps } from '../list';
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

const emptyListProps: TransferListProps<KeyWiseTransferItem> = {
  ...listCommonProps,
  dataSource: [],
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

  it('Checkbox should disabled when dataSource is empty', () => {
    const { container } = render(<List {...emptyListProps} />);
    expect(container.querySelector<HTMLLabelElement>('label.ant-checkbox-wrapper')).toHaveClass(
      'ant-checkbox-wrapper-disabled',
    );
    expect(container.querySelector<HTMLSpanElement>('span.ant-checkbox')).toHaveClass(
      'ant-checkbox-disabled',
    );
  });

  it('Checkbox should not disabled when dataSource not is empty', () => {
    const { container } = render(<List {...listCommonProps} />);
    expect(container.querySelector<HTMLLabelElement>('label.ant-checkbox-wrapper')).not.toHaveClass(
      'ant-checkbox-wrapper-disabled',
    );
    expect(container.querySelector<HTMLSpanElement>('span.ant-checkbox')).not.toHaveClass(
      'ant-checkbox-disabled',
    );
  });

  it('should disabled all select checkbox when each item of dataSource is disabled', () => {
    const allDisabledListProps: TransferListProps<KeyWiseTransferItem> = {
      ...listCommonProps,
      dataSource: listCommonProps.dataSource.map((d) => ({
        ...d,
        disabled: true,
      })),
    };
    const { container } = render(<List {...allDisabledListProps} />);
    expect(container.querySelector<HTMLLabelElement>('label.ant-checkbox-wrapper')).toHaveClass(
      'ant-checkbox-wrapper-disabled',
    );
    expect(container.querySelector<HTMLSpanElement>('span.ant-checkbox')).toHaveClass(
      'ant-checkbox-disabled',
    );
  });

  it('support custom dropdown Icon', () => {
    const { container } = render(
      <List
        {...listCommonProps}
        selectionsIcon={<span className="test-dropdown-icon">test</span>}
      />,
    );
    expect(
      container?.querySelector<HTMLSpanElement>(
        '.ant-transfer-list .ant-transfer-list-header .test-dropdown-icon',
      ),
    ).toBeTruthy();
  });

  it('onItemSelect should be called correctly', () => {
    const onItemSelect = jest.fn();
    const { container } = render(
      <List
        {...listCommonProps}
        onItemSelect={onItemSelect}
        renderList={(props) => (
          <div
            className="custom-list-body"
            onClick={(e) => {
              props.onItemSelect('a', false, e);
            }}
          >
            custom list body
          </div>
        )}
      />,
    );
    fireEvent.click(container.querySelector('.custom-list-body')!);
    expect(onItemSelect).toHaveBeenCalledWith('a', false);
  });
});
