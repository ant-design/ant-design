/* eslint-disable @typescript-eslint/no-shadow */
import classNames from 'classnames';
import * as React from 'react';
import type { KeyWiseTransferItem } from '.';
import Pagination from '../pagination';
import type { PaginationType } from './interface';
import type { RenderedItem, TransferListProps } from './list';
import ListItem from './ListItem';

export const OmitProps = ['handleFilter', 'handleClear', 'checkedKeys'] as const;
export type OmitProp = typeof OmitProps[number];
type PartialTransferListProps<RecordType> = Omit<TransferListProps<RecordType>, OmitProp>;

export interface TransferListBodyProps<RecordType> extends PartialTransferListProps<RecordType> {
  filteredItems: RecordType[];
  filteredRenderItems: RenderedItem<RecordType>[];
  selectedKeys: string[];
}

const parsePagination = (pagination?: PaginationType) => {
  if (!pagination) {
    return null;
  }

  const defaultPagination = {
    pageSize: 10,
    simple: true,
    showSizeChanger: false,
    showLessItems: false,
  };

  if (typeof pagination === 'object') {
    return {
      ...defaultPagination,
      ...pagination,
    };
  }

  return defaultPagination;
};

const ListBody: React.ForwardRefRenderFunction<
  { getItems?: RenderedItem<any>[] },
  TransferListBodyProps<KeyWiseTransferItem>
> = <RecordType extends KeyWiseTransferItem>(
  props: TransferListBodyProps<RecordType>,
  ref: React.Ref<{ getItems?: RenderedItem<RecordType>[] }>,
) => {
  const {
    prefixCls,
    filteredRenderItems,
    selectedKeys,
    disabled: globalDisabled,
    showRemove,
    pagination,
    onScroll,
    onItemSelect,
    onItemRemove,
  } = props;

  const [current, setCurrent] = React.useState<number>(() => {
    const mergedPagination = parsePagination(pagination);
    if (mergedPagination) {
      return Math.min(1, Math.ceil(filteredRenderItems.length / mergedPagination.pageSize));
    }
    return 1;
  });

  const handleItemSelect = (item: RecordType) => {
    onItemSelect?.(item.key, !selectedKeys.includes(item.key));
  };

  const handleItemRemove = (item: RecordType) => {
    onItemRemove?.([item.key]);
  };

  const onPageChange = (current: number) => {
    setCurrent(current);
  };

  const getItems = React.useMemo<RenderedItem<RecordType>[]>(() => {
    const mergedPagination = parsePagination(pagination);
    const displayItems = mergedPagination
      ? filteredRenderItems.slice(
          (current - 1) * mergedPagination.pageSize,
          current * mergedPagination.pageSize,
        )
      : filteredRenderItems;
    return displayItems;
  }, [current]);

  React.useImperativeHandle(ref, () => ({ getItems }));

  const mergedPagination = parsePagination(pagination);

  const paginationNode: React.ReactNode = mergedPagination ? (
    <Pagination
      simple={mergedPagination.simple}
      showSizeChanger={mergedPagination.showSizeChanger}
      showLessItems={mergedPagination.showLessItems}
      size="small"
      disabled={globalDisabled}
      className={`${prefixCls}-pagination`}
      total={filteredRenderItems.length}
      pageSize={mergedPagination.pageSize}
      current={current}
      onChange={onPageChange}
    />
  ) : null;

  return (
    <>
      <ul
        onScroll={onScroll}
        className={classNames(`${prefixCls}-content`, {
          [`${prefixCls}-content-show-remove`]: showRemove,
        })}
      >
        {(getItems || []).map(({ renderedEl, renderedText, item }: RenderedItem<RecordType>) => {
          const { disabled } = item;
          const checked = selectedKeys.includes(item.key);
          return (
            <ListItem
              disabled={globalDisabled || disabled}
              key={item.key}
              item={item}
              renderedText={renderedText}
              renderedEl={renderedEl}
              checked={checked}
              prefixCls={prefixCls}
              showRemove={showRemove}
              onClick={handleItemSelect}
              onRemove={handleItemRemove}
            />
          );
        })}
      </ul>
      {paginationNode}
    </>
  );
};

export default React.forwardRef(ListBody);
