import React from 'react';

import type { KeyWiseTransferItem } from '..';
import { fireEvent, render } from '../../../tests/utils';
import Section from '../Section';
import type { TransferListProps } from '../Section';

const baseProps = {
  prefixCls: 'ant-transfer',
  classNames: {},
  styles: {},
  direction: 'left',
} as TransferListProps<KeyWiseTransferItem>;

it.each([false, { pageSize: 10 }])(
  'reads selected keys a linear number of times (pagination=%j)',
  (pagination) => {
    const count = 600;
    const dataSource = Array.from({ length: count }, (_, i) => ({ key: `item-${i}` }));
    let reads = 0;
    const checkedKeys = new Proxy(
      dataSource.map((item) => item.key),
      {
        get(target, property, receiver) {
          if (typeof property === 'string' && /^\d+$/.test(property)) {
            reads += 1;
          }
          return Reflect.get(target, property, receiver);
        },
      },
    );
    const { container } = render(
      <Section
        {...baseProps}
        dataSource={dataSource}
        checkedKeys={checkedKeys}
        pagination={pagination}
      />,
    );
    expect(container.querySelectorAll('.ant-transfer-list-content-item')).toHaveLength(
      pagination ? 10 : count,
    );
    expect(container.querySelector('.ant-transfer-list-header-selected')).toHaveTextContent(
      '600/600',
    );
    // Allow StrictMode and bounded re-renders without relying on execution time.
    expect(reads).toBeLessThan(count * 20);
  },
);

it('updates checked items and click behavior when controlled keys change', () => {
  const onItemSelect = jest.fn();
  const dataSource = [{ key: 'a' }, { key: 1 }, { key: 'disabled', disabled: true }];
  const props = { ...baseProps, dataSource, onItemSelect };
  const { container, rerender } = render(
    <Section {...props} checkedKeys={['a', '1', 'disabled']} />,
  );
  const items = container.querySelectorAll('.ant-transfer-list-content-item');
  expect(items[0].querySelector('input')).toBeChecked();
  expect(items[1].querySelector('input')).not.toBeChecked();
  expect(container.querySelector('.ant-transfer-list-header-selected')).toHaveTextContent('1/3');
  fireEvent.click(items[0]);
  expect(onItemSelect).toHaveBeenLastCalledWith('a', false, expect.anything(), dataSource);

  rerender(<Section {...props} checkedKeys={[1, 'disabled']} />);
  expect(items[0].querySelector('input')).not.toBeChecked();
  expect(items[1].querySelector('input')).toBeChecked();
  fireEvent.click(items[1]);
  expect(onItemSelect).toHaveBeenLastCalledWith(1, false, expect.anything(), dataSource);
  fireEvent.click(items[0]);
  expect(onItemSelect).toHaveBeenLastCalledWith('a', true, expect.anything(), dataSource);
  expect(container.querySelector('.ant-transfer-list-header-selected')).toHaveTextContent('1/3');
});
