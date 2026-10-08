import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import type { KeyWiseTransferItem } from '..';
import ListBody from '../ListBody';
import type { TransferListBodyProps } from '../ListBody';
import type { RenderedItem } from '../Section';

const items: RenderedItem<KeyWiseTransferItem>[] = [
  {
    item: { key: 'a', title: 'a' },
    renderedEl: <span>a</span>,
    renderedText: 'a',
  },
  {
    item: { key: 'b', title: 'b' },
    renderedEl: <span>b</span>,
    renderedText: 'b',
  },
];

const baseProps = {
  prefixCls: 'ant-transfer-list',
  classNames: { list: undefined },
  styles: { list: undefined },
  filteredItems: items.map(({ item }) => item),
  selectedKeys: [],
  pagination: { pageSize: 1 },
  onScroll: jest.fn(),
  onItemSelect: jest.fn(),
  onItemRemove: jest.fn(),
  remove: 'Remove',
  showRemove: false,
  disabled: false,
} as unknown as TransferListBodyProps<KeyWiseTransferItem>;

describe('TransferListBody', () => {
  it('should reset current page when filtered items become empty and are restored', async () => {
    const { container, getByTitle, rerender } = render(
      <ListBody {...baseProps} filteredRenderItems={items} />,
    );

    await waitFor(() => getByTitle('1/2'));
    fireEvent.click(container.querySelector('.ant-pagination-next .ant-pagination-item-link')!);
    await waitFor(() => getByTitle('2/2'));

    rerender(<ListBody {...baseProps} filteredRenderItems={[]} />);
    await waitFor(() =>
      expect(container.querySelectorAll('.ant-transfer-list-content-item')).toHaveLength(0),
    );

    rerender(<ListBody {...baseProps} filteredRenderItems={items} />);
    await waitFor(() => {
      expect(container.querySelectorAll('.ant-transfer-list-content-item')).toHaveLength(1);
      expect(getByTitle('1/2')).toBeTruthy();
    });
  });
});
